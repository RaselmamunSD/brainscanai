import { useState, useCallback } from "react";
import api, { ApiPredictionResponse, ApiExplainabilityResponse } from "@/services/api";

export type TumorType = "Glioma" | "Meningioma" | "Pituitary" | "No Tumor";
export type TumorGrade = "Low Grade" | "High Grade" | null;
export type MRIModality = "T1" | "T2" | "FLAIR" | "T1ce";

export interface AnalysisResult {
  analysisId?: string;
  tumorType: TumorType;
  confidence: number;
  grade: TumorGrade;
  probabilities: Record<TumorType, number>;
  processingTime: number;
  screeningLabel?: string;
  disclaimer?: string;
  modelVersion?: string;
  gradcamUrl?: string;
  overlayUrl?: string;
}

interface UseAnalysisReturn {
  isAnalyzing: boolean;
  progress: number;
  result: AnalysisResult | null;
  error: string | null;
  gradcamData: ApiExplainabilityResponse | null;
  analyzeImage: (file: File, modality: MRIModality) => Promise<void>;
  generateGradCAM: () => Promise<void>;
  reset: () => void;
}

const mapBackendClassToTumorType = (predictedClass: string): TumorType => {
  const normalized = predictedClass.toLowerCase();
  if (normalized.includes("no_tumor") || normalized.includes("normal")) return "No Tumor";
  if (normalized.includes("glioma")) return "Glioma";
  if (normalized.includes("meningioma")) return "Meningioma";
  if (normalized.includes("pituitary")) return "Pituitary";
  return "No Tumor";
};

const mapBackendProbabilities = (
  rawProbs?: Record<string, number>
): Record<TumorType, number> => {
  if (!rawProbs) {
    return {
      Glioma: 0,
      Meningioma: 0,
      Pituitary: 0,
      "No Tumor": 100,
    };
  }

  return {
    "No Tumor": (rawProbs["no_tumor"] || rawProbs["normal"] || 0) * 100,
    Glioma: (rawProbs["glioma"] || 0) * 100,
    Meningioma: (rawProbs["meningioma"] || 0) * 100,
    Pituitary: (rawProbs["pituitary"] || 0) * 100,
  };
};

export const useAnalysis = (): UseAnalysisReturn => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gradcamData, setGradcamData] = useState<ApiExplainabilityResponse | null>(null);

  const analyzeImage = useCallback(async (file: File, modality: MRIModality) => {
    setIsAnalyzing(true);
    setProgress(10);
    setError(null);
    setResult(null);
    setGradcamData(null);

    const startTime = performance.now();

    try {
      // Step 1: Preprocessing animation
      setProgress(25);

      // Step 2: Call FastAPI Deep Learning Backend
      const uploadPromise = api.uploadMRI(file, false);

      // Simulate smooth progress while network/PyTorch model runs
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) return prev + 15;
          return prev;
        });
      }, 300);

      const response = await uploadPromise;
      clearInterval(progressTimer);
      setProgress(90);

      const elapsedSec = (performance.now() - startTime) / 1000;
      const apiData = response.data;
      const pred = apiData.prediction;

      if (!pred) {
        throw new Error("No prediction was returned by the AI engine.");
      }

      const tumorType = mapBackendClassToTumorType(pred.predicted_class);
      const grade: TumorGrade =
        tumorType === "No Tumor"
          ? null
          : pred.confidence > 0.8
          ? "High Grade"
          : "Low Grade";

      const analysisResult: AnalysisResult = {
        analysisId: apiData.analysis_id,
        tumorType,
        confidence: pred.confidence * 100,
        grade,
        probabilities: mapBackendProbabilities(apiData.probabilities),
        processingTime: apiData.processing_time_ms
          ? apiData.processing_time_ms / 1000
          : elapsedSec,
        screeningLabel: pred.screening_label,
        disclaimer: apiData.disclaimer,
        modelVersion: apiData.model_version || "1.0.0",
      };

      setProgress(100);
      setResult(analysisResult);

      // Automatically generate Grad-CAM explainability in background
      if (apiData.analysis_id) {
        try {
          const xaiRes = await api.explainAnalysis(apiData.analysis_id);
          if (xaiRes.data) {
            setGradcamData(xaiRes.data);
            setResult((prev) =>
              prev
                ? {
                    ...prev,
                    gradcamUrl: api.getFileUrl(xaiRes.data.gradcam_url),
                    overlayUrl: api.getFileUrl(xaiRes.data.overlay_url),
                  }
                : null
            );
          }
        } catch (xaiErr) {
          console.warn("Grad-CAM generation notice:", xaiErr);
        }
      }
    } catch (err: any) {
      console.error("Analysis execution error:", err);
      setError(
        err?.message ||
          "Failed to connect to AI analysis backend. Please ensure the backend server is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const generateGradCAM = useCallback(async () => {
    if (!result?.analysisId) return;
    try {
      const xaiRes = await api.explainAnalysis(result.analysisId);
      if (xaiRes.data) {
        setGradcamData(xaiRes.data);
        setResult((prev) =>
          prev
            ? {
                ...prev,
                gradcamUrl: api.getFileUrl(xaiRes.data.gradcam_url),
                overlayUrl: api.getFileUrl(xaiRes.data.overlay_url),
              }
            : null
        );
      }
    } catch (err: any) {
      console.error("Grad-CAM request error:", err);
    }
  }, [result]);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setProgress(0);
    setResult(null);
    setError(null);
    setGradcamData(null);
  }, []);

  return {
    isAnalyzing,
    progress,
    result,
    error,
    gradcamData,
    analyzeImage,
    generateGradCAM,
    reset,
  };
};
