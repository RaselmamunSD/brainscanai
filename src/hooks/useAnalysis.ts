import { useState, useCallback } from "react";

export type TumorType = "Glioma" | "Meningioma" | "Pituitary" | "No Tumor";
export type TumorGrade = "Low Grade" | "High Grade" | null;
export type MRIModality = "T1" | "T2" | "FLAIR" | "T1ce";

export interface AnalysisResult {
  tumorType: TumorType;
  confidence: number;
  grade: TumorGrade;
  probabilities: Record<TumorType, number>;
  processingTime: number;
}

interface UseAnalysisReturn {
  isAnalyzing: boolean;
  progress: number;
  result: AnalysisResult | null;
  error: string | null;
  analyzeImage: (file: File, modality: MRIModality) => Promise<void>;
  reset: () => void;
}

const generateMockResult = (): AnalysisResult => {
  const tumorTypes: TumorType[] = ["Glioma", "Meningioma", "Pituitary", "No Tumor"];
  const randomIndex = Math.floor(Math.random() * tumorTypes.length);
  const primaryType = tumorTypes[randomIndex];
  
  // Generate realistic probabilities
  const baseConfidence = 0.75 + Math.random() * 0.2; // 75-95%
  const remaining = 1 - baseConfidence;
  
  const probabilities: Record<TumorType, number> = {
    Glioma: 0,
    Meningioma: 0,
    Pituitary: 0,
    "No Tumor": 0,
  };
  
  probabilities[primaryType] = baseConfidence;
  
  const otherTypes = tumorTypes.filter(t => t !== primaryType);
  let remainingProb = remaining;
  
  otherTypes.forEach((type, index) => {
    if (index === otherTypes.length - 1) {
      probabilities[type] = remainingProb;
    } else {
      const prob = Math.random() * remainingProb * 0.6;
      probabilities[type] = prob;
      remainingProb -= prob;
    }
  });
  
  const grade: TumorGrade = primaryType === "No Tumor" 
    ? null 
    : Math.random() > 0.5 ? "High Grade" : "Low Grade";
  
  return {
    tumorType: primaryType,
    confidence: baseConfidence * 100,
    grade,
    probabilities: Object.fromEntries(
      Object.entries(probabilities).map(([k, v]) => [k, v * 100])
    ) as Record<TumorType, number>,
    processingTime: 1.5 + Math.random() * 1.5,
  };
};

export const useAnalysis = (): UseAnalysisReturn => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(async (file: File, modality: MRIModality) => {
    setIsAnalyzing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      // Simulate preprocessing
      await simulateProgress(0, 30, 800);
      
      // Simulate model inference
      await simulateProgress(30, 70, 1200);
      
      // Simulate post-processing
      await simulateProgress(70, 100, 600);
      
      // Generate mock result
      const mockResult = generateMockResult();
      setResult(mockResult);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const simulateProgress = (start: number, end: number, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      const steps = 10;
      const stepDuration = duration / steps;
      const stepSize = (end - start) / steps;
      let current = start;

      const interval = setInterval(() => {
        current += stepSize;
        setProgress(Math.min(current, end));
        
        if (current >= end) {
          clearInterval(interval);
          resolve();
        }
      }, stepDuration);
    });
  };

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return { isAnalyzing, progress, result, error, analyzeImage, reset };
};
