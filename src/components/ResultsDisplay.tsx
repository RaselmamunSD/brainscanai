import { AlertTriangle, CheckCircle, TrendingUp, Clock, Brain, ShieldAlert } from "lucide-react";
import { AnalysisResult, TumorType } from "@/hooks/useAnalysis";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ResultsDisplayProps {
  result: AnalysisResult;
  imagePreview: string | null;
}

const tumorColors: Record<TumorType, string> = {
  Glioma: "text-destructive",
  Meningioma: "text-warning",
  Pituitary: "text-accent",
  "No Tumor": "text-success",
};

const tumorBgColors: Record<TumorType, string> = {
  Glioma: "bg-destructive/10 border-destructive/20",
  Meningioma: "bg-warning/10 border-warning/20",
  Pituitary: "bg-accent/10 border-accent/20",
  "No Tumor": "bg-success/10 border-success/20",
};

const ResultsDisplay = ({ result, imagePreview }: ResultsDisplayProps) => {
  const isTumor = result.tumorType !== "No Tumor";

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={cn(
        "p-6 rounded-2xl border-2",
        tumorBgColors[result.tumorType]
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-xl",
            isTumor ? "bg-destructive/20" : "bg-success/20"
          )}>
            {isTumor ? (
              <AlertTriangle className={cn("h-8 w-8", tumorColors[result.tumorType])} />
            ) : (
              <CheckCircle className="h-8 w-8 text-success" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Screening Classification
            </h3>
            <p className={cn("text-2xl font-bold", tumorColors[result.tumorType])}>
              {result.screeningLabel || result.tumorType}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.grade && (
                <span className={cn(
                  "inline-block px-3 py-0.5 rounded-full text-xs font-medium",
                  result.grade === "High Grade" 
                    ? "bg-destructive/20 text-destructive" 
                    : "bg-warning/20 text-warning"
                )}>
                  {result.grade}
                </span>
              )}
              {result.modelVersion && (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  Model v{result.modelVersion}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confidence & Processing Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Confidence</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">
              {result.confidence.toFixed(1)}
            </span>
            <span className="text-lg text-muted-foreground mb-1">%</span>
          </div>
          <Progress value={result.confidence} className="mt-2 h-2" />
        </div>
        
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Inference Time</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">
              {result.processingTime.toFixed(2)}
            </span>
            <span className="text-lg text-muted-foreground mb-1">s</span>
          </div>
        </div>
      </div>

      {/* Probability Distribution */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Classification Probabilities</h4>
        </div>
        
        <div className="space-y-3">
          {(Object.entries(result.probabilities) as [TumorType, number][])
            .sort(([, a], [, b]) => b - a)
            .map(([type, prob]) => (
              <div key={type}>
                <div className="flex justify-between items-center mb-1">
                  <span className={cn(
                    "text-sm font-medium",
                    type === result.tumorType ? tumorColors[type] : "text-muted-foreground"
                  )}>
                    {type}
                  </span>
                  <span className={cn(
                    "text-sm font-semibold",
                    type === result.tumorType ? tumorColors[type] : "text-foreground"
                  )}>
                    {prob.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      type === result.tumorType ? "medical-gradient" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${Math.min(prob, 100)}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Regulatory & Clinical Disclaimer */}
      {result.disclaimer && (
        <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-xs text-muted-foreground flex items-start gap-2.5">
          <ShieldAlert className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <p>{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
