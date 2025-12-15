import { useState } from "react";
import { ArrowLeft, Brain, RefreshCw, Download } from "lucide-react";
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

const modalities: { value: MRIModality; label: string; description: string }[] = [
  { value: "T1", label: "T1", description: "T1-weighted" },
  { value: "T2", label: "T2", description: "T2-weighted" },
  { value: "FLAIR", label: "FLAIR", description: "Fluid-attenuated" },
  { value: "T1ce", label: "T1ce", description: "T1 contrast-enhanced" },
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              MRI Analysis
            </h1>
            <p className="text-muted-foreground">
              Upload your brain MRI scan for AI-powered tumor detection and classification
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Controls */}
            <div className="space-y-6">
              {/* Upload Zone */}
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Upload MRI Image
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
                <div className="bg-card p-6 rounded-2xl border border-border animate-fade-in">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Select MRI Modality
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {modalities.map((modality) => (
                      <button
                        key={modality.value}
                        onClick={() => setSelectedModality(modality.value)}
                        disabled={isAnalyzing}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-center",
                          selectedModality === modality.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted"
                        )}
                      >
                        <div className={cn(
                          "text-lg font-bold mb-1",
                          selectedModality === modality.value ? "text-primary" : "text-foreground"
                        )}>
                          {modality.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {modality.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="bg-card p-6 rounded-2xl border border-border animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg medical-gradient animate-pulse">
                      <Brain className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Analyzing MRI...</h3>
                      <p className="text-sm text-muted-foreground">
                        {progress < 30 && "Preprocessing image..."}
                        {progress >= 30 && progress < 70 && "Running AI inference..."}
                        {progress >= 70 && "Generating results..."}
                      </p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2 text-right">
                    {progress.toFixed(0)}%
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {selectedFile && !isAnalyzing && !result && (
                <Button 
                  size="lg" 
                  className="w-full medical-gradient h-14 text-lg"
                  onClick={handleAnalyze}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Start AI Analysis
                </Button>
              )}

              {result && (
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 h-14"
                    onClick={handleNewAnalysis}
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    New Analysis
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 medical-gradient h-14"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Report
                  </Button>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {result ? (
                <>
                  <ResultsDisplay result={result} imagePreview={imagePreview} />
                  {imagePreview && <GradCAMVisualization originalImage={imagePreview} />}
                </>
              ) : (
                <div className="bg-card p-12 rounded-2xl border border-border border-dashed flex flex-col items-center justify-center min-h-[400px]">
                  <div className="p-4 rounded-2xl bg-muted mb-4">
                    <Brain className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Results Will Appear Here
                  </h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Upload an MRI image and click "Start AI Analysis" to see detailed tumor detection results
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-warning/5 border border-warning/20 rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-warning">⚠️ Important:</strong> This AI analysis is for research and educational purposes only. 
              Always consult with qualified medical professionals for actual diagnosis and treatment decisions.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
