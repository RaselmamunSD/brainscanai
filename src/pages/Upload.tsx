import { useState } from "react";
import { ArrowLeft, Brain, RefreshCw, Download, Sparkles, Activity, ShieldCheck, FileCheck, Layers, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadZone from "@/components/UploadZone";
import ResultsDisplay from "@/components/ResultsDisplay";
import GradCAMVisualization from "@/components/GradCAMVisualization";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAnalysis, MRIModality } from "@/hooks/useAnalysis";
import { cn } from "@/lib/utils";

const modalities: { value: MRIModality; label: string; description: string; detail: string }[] = [
  { value: "T1", label: "T1", description: "T1-Weighted", detail: "Anatomical structure & gray-white matter" },
  { value: "T2", label: "T2", description: "T2-Weighted", detail: "Edema, fluid & pathological lesions" },
  { value: "FLAIR", label: "FLAIR", description: "Fluid Inversion", detail: "Periventricular hyperintensities" },
  { value: "T1ce", label: "T1ce", description: "Contrast T1", detail: "Vascular breakdown & tumor margins" },
];

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModality, setSelectedModality] = useState<MRIModality>("T1");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { isAnalyzing, progress, result, error, analyzeImage, reset } = useAnalysis();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview(null);
    reset();
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeImage(selectedFile, selectedModality);
    }
  };

  const handleNewAnalysis = () => {
    handleClear();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Header Bar */}
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-foreground">
                MRI Clinical Screening Console
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Upload brain MRI scans for multimodal neural network classification & Grad-CAM visual interpretability
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column (5 Cols) - Upload & Sequence Selection */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Upload Card */}
              <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Step 1: Input Brain MRI Scan
                </h3>
                
                <UploadZone
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onClear={handleClear}
                  disabled={isAnalyzing}
                />
              </div>

              {/* Modality Selection */}
              {selectedFile && !result && (
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-sm animate-fade-in space-y-3">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    Step 2: Select MRI Acquisition Sequence
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    {modalities.map((modality) => (
                      <button
                        key={modality.value}
                        onClick={() => setSelectedModality(modality.value)}
                        disabled={isAnalyzing}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all text-left flex flex-col justify-between",
                          selectedModality === modality.value
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "text-sm font-bold",
                            selectedModality === modality.value ? "text-primary" : "text-foreground"
                          )}>
                            {modality.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">{modality.description}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                          {modality.detail}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="bg-card p-5 sm:p-6 rounded-2xl border border-primary/40 shadow-lg shadow-primary/10 animate-fade-in space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl medical-gradient text-primary-foreground animate-spin">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">AI Neural Network Running</h4>
                        <p className="text-xs text-muted-foreground">
                          {progress < 30 && "Preprocessing & Hounsfield normalisation..."}
                          {progress >= 30 && progress < 70 && "Extracting deep features & classification..."}
                          {progress >= 70 && "Generating Grad-CAM attention heatmap..."}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-primary">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Action Buttons */}
              {selectedFile && !isAnalyzing && !result && (
                <Button 
                  size="lg" 
                  className="w-full medical-gradient h-13 sm:h-14 text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                  onClick={handleAnalyze}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Execute AI Screening Pipeline
                </Button>
              )}

              {result && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 h-12 text-sm font-semibold"
                    onClick={handleNewAnalysis}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Scan Analysis
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 medical-gradient h-12 text-sm font-semibold shadow-md"
                    onClick={() => window.print()}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Screening Report
                  </Button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4 text-xs sm:text-sm text-destructive flex items-start gap-3 shadow-sm animate-fade-in">
                  <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-destructive">Image Verification Alert</h4>
                    <p className="leading-relaxed">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (7 Cols) - Results & Grad-CAM Visualizer */}
            <div className="lg:col-span-7 space-y-6">
              {result ? (
                <>
                  <ResultsDisplay result={result} imagePreview={imagePreview} />
                  {imagePreview && (
                    <GradCAMVisualization 
                      originalImage={imagePreview}
                      gradcamOverlayUrl={result.overlayUrl}
                      gradcamHeatmapUrl={result.gradcamUrl}
                    />
                  )}
                </>
              ) : (
                <div className="bg-card p-8 sm:p-14 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm">
                    <Brain className="h-10 w-10 sm:h-12 sm:w-12 animate-pulse" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                    Awaiting MRI Input Scan
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
                    Upload an MRI slice on the left panel and click <strong>"Execute AI Screening"</strong> to view real-time tumor predictions and Grad-CAM interpretability heatmaps.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Clinical Disclaimer Bottom Pill */}
          <div className="mt-10 p-3.5 bg-warning/5 border border-warning/20 rounded-xl text-center">
            <p className="text-xs text-muted-foreground">
              <strong className="text-warning font-semibold">Regulatory Notice:</strong> TumorMultiNetAI is an AI-assisted screening decision-support tool. It does not replace diagnostic assessment by a certified radiologist or qualified medical specialist.
            </p>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
