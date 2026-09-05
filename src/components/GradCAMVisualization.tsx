import { useState } from "react";
import { Eye, EyeOff, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface GradCAMVisualizationProps {
  originalImage: string;
  gradcamOverlayUrl?: string;
  gradcamHeatmapUrl?: string;
  explanationNote?: string;
}

const GradCAMVisualization = ({
  originalImage,
  gradcamOverlayUrl,
  gradcamHeatmapUrl,
  explanationNote,
}: GradCAMVisualizationProps) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState([70]);
  const [viewMode, setViewMode] = useState<"overlay" | "sideBySide">("overlay");

  const effectiveOverlayUrl = gradcamOverlayUrl || originalImage;
  const effectiveHeatmapUrl = gradcamHeatmapUrl || originalImage;

  // Fallback gradient if backend Grad-CAM image is not yet rendered
  const generateHeatmapFallbackStyle = () => ({
    background: `
      radial-gradient(ellipse 40% 35% at 55% 45%, 
        rgba(255, 0, 0, ${heatmapOpacity[0] / 100}) 0%, 
        rgba(255, 165, 0, ${heatmapOpacity[0] / 150}) 30%, 
        rgba(255, 255, 0, ${heatmapOpacity[0] / 200}) 60%, 
        transparent 100%
      )
    `,
  });

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Controls */}
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground flex items-center gap-1.5">
              Explainable AI (Grad-CAM)
              {gradcamOverlayUrl && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> PyTorch Live
                </span>
              )}
            </h4>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={viewMode === "overlay" ? "default" : "outline"}
              onClick={() => setViewMode("overlay")}
              className={viewMode === "overlay" ? "medical-gradient" : ""}
            >
              Overlay
            </Button>
            <Button
              size="sm"
              variant={viewMode === "sideBySide" ? "default" : "outline"}
              onClick={() => setViewMode("sideBySide")}
              className={viewMode === "sideBySide" ? "medical-gradient" : ""}
            >
              Side by Side
            </Button>
          </div>
        </div>
        
        {viewMode === "overlay" && (
          <div className="mt-4 flex items-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="shrink-0"
            >
              {showHeatmap ? (
                <><EyeOff className="h-4 w-4 mr-2" /> Hide Attention</>
              ) : (
                <><Eye className="h-4 w-4 mr-2" /> Show Attention</>
              )}
            </Button>
            
            {showHeatmap && (
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Opacity</span>
                <Slider
                  value={heatmapOpacity}
                  onValueChange={setHeatmapOpacity}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-12">
                  {heatmapOpacity[0]}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="p-4">
        {viewMode === "overlay" ? (
          <div className="relative aspect-square max-w-md mx-auto rounded-xl overflow-hidden border border-border">
            {/* Base Image */}
            <img 
              src={originalImage} 
              alt="Original MRI" 
              className="w-full h-full object-cover"
            />
            {/* Heatmap Layer */}
            {showHeatmap && (
              gradcamOverlayUrl ? (
                <img 
                  src={gradcamOverlayUrl} 
                  alt="Grad-CAM Overlay" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: heatmapOpacity[0] / 100 }}
                />
              ) : (
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={generateHeatmapFallbackStyle()}
                />
              )
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground text-center">Original MRI</p>
              <div className="aspect-square rounded-xl overflow-hidden border border-border">
                <img 
                  src={originalImage} 
                  alt="Original MRI" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground text-center">AI Attention Heatmap</p>
              <div className="aspect-square rounded-xl overflow-hidden border border-border relative">
                <img 
                  src={gradcamHeatmapUrl || gradcamOverlayUrl || originalImage} 
                  alt="MRI with Heatmap" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-orange-500" />
            <span className="text-sm text-muted-foreground">High Attention (Tumor Focus)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-blue-500" />
            <span className="text-sm text-muted-foreground">Low / Background</span>
          </div>
        </div>

        {explanationNote && (
          <p className="mt-3 text-xs text-muted-foreground text-center italic border-t border-border pt-2">
            {explanationNote}
          </p>
        )}
      </div>
    </div>
  );
};

export default GradCAMVisualization;
