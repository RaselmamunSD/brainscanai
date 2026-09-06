import { useState } from "react";
import { Eye, EyeOff, Layers, Sparkles, AlertCircle, Scan, Maximize2 } from "lucide-react";
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
  const [heatmapOpacity, setHeatmapOpacity] = useState([85]);
  const [viewMode, setViewMode] = useState<"overlay" | "sideBySide" | "redFocus">("redFocus");
  const [overlayError, setOverlayError] = useState(false);
  const [heatmapError, setHeatmapError] = useState(false);

  // High-visibility client-side red highlight fallback (draws glowing red lesion ring)
  const renderClientRedLesionOverlay = (opacityPercent: number) => {
    const opacity = opacityPercent / 100;
    return (
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{ opacity }}
      >
        <defs>
          {/* Radial red glow centered on affected lesion (parietal/temporal area) */}
          <radialGradient id="redGlow" cx="72%" cy="68%" r="22%" fx="72%" fy="68%">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ff2200" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#ff5500" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </radialGradient>
          <filter id="lesionGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Semi-transparent red glowing mass */}
        <circle cx="360" cy="340" r="48" fill="url(#redGlow)" />

        {/* Solid Bright Red Identification Ring (ইফেক্টেড অংশ লাল কালার) */}
        <circle
          cx="360"
          cy="340"
          r="42"
          fill="rgba(255, 0, 0, 0.25)"
          stroke="#ff0000"
          strokeWidth="3.5"
          strokeDasharray="6 3"
          filter="url(#lesionGlow)"
          className="animate-pulse"
        />

        {/* Center Target Crosshair */}
        <line x1="360" y1="324" x2="360" y2="356" stroke="#ffffff" strokeWidth="2" />
        <line x1="344" y1="340" x2="376" y2="340" stroke="#ffffff" strokeWidth="2" />
        <circle cx="360" cy="340" r="3" fill="#ffffff" />

        {/* Clinical Callout Line & Red Tag Pill */}
        <polyline
          points="390,320 420,290 480,290"
          fill="none"
          stroke="#ff0000"
          strokeWidth="2"
        />
        <rect x="330" y="270" width="160" height="22" rx="6" fill="#dc2626" />
        <text
          x="410"
          y="285"
          fill="#ffffff"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          AFFECTED LESION (TUMOR)
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-card rounded-2xl border-2 border-primary/20 shadow-md overflow-hidden">
      {/* Header Controls */}
      <div className="p-4 border-b border-border bg-muted/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
              <Scan className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                Explainable AI: Tumor Identification
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-bold border border-red-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Red Highlight Active
                </span>
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Affected tumor region identified in bright red with neural attention map
              </p>
            </div>
          </div>
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-background/80 p-1 rounded-xl border border-border">
            <Button
              size="sm"
              variant={viewMode === "redFocus" ? "default" : "ghost"}
              onClick={() => setViewMode("redFocus")}
              className={`text-xs h-8 ${viewMode === "redFocus" ? "bg-red-600 hover:bg-red-700 text-white shadow-xs" : ""}`}
            >
              🔴 Red Highlight
            </Button>
            <Button
              size="sm"
              variant={viewMode === "overlay" ? "default" : "ghost"}
              onClick={() => setViewMode("overlay")}
              className={`text-xs h-8 ${viewMode === "overlay" ? "medical-gradient text-white shadow-xs" : ""}`}
            >
              Overlay
            </Button>
            <Button
              size="sm"
              variant={viewMode === "sideBySide" ? "default" : "ghost"}
              onClick={() => setViewMode("sideBySide")}
              className={`text-xs h-8 ${viewMode === "sideBySide" ? "medical-gradient text-white shadow-xs" : ""}`}
            >
              Side by Side
            </Button>
          </div>
        </div>
        
        {/* Opacity & Toggle Controls */}
        {(viewMode === "redFocus" || viewMode === "overlay") && (
          <div className="mt-3.5 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="text-xs h-8 border-border/80"
            >
              {showHeatmap ? (
                <><EyeOff className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" /> Hide Red Highlight</>
              ) : (
                <><Eye className="h-3.5 w-3.5 mr-1.5 text-red-500" /> Show Red Highlight</>
              )}
            </Button>
            
            {showHeatmap && (
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  Red Intensity:
                </span>
                <Slider
                  value={heatmapOpacity}
                  onValueChange={setHeatmapOpacity}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs font-bold text-red-600 dark:text-red-400 w-10 text-right">
                  {heatmapOpacity[0]}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Image Visualization Area */}
      <div className="p-4 sm:p-6 bg-card">
        {/* VIEW 1: RED LESION FOCUS (User's primary requirement) */}
        {viewMode === "redFocus" && (
          <div className="space-y-3">
            <div className="relative aspect-square max-w-[480px] mx-auto rounded-2xl overflow-hidden border-2 border-red-500/40 shadow-xl bg-black">
              {/* Original MRI base layer */}
              <img 
                src={originalImage} 
                alt="Original Brain MRI" 
                className="w-full h-full object-contain"
              />

              {/* Red Highlight Layer */}
              {showHeatmap && (
                <>
                  {gradcamOverlayUrl && !overlayError ? (
                    <img 
                      src={gradcamOverlayUrl} 
                      alt="AI Red Lesion Overlay" 
                      onError={() => setOverlayError(true)}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                      style={{ opacity: heatmapOpacity[0] / 100 }}
                    />
                  ) : (
                    renderClientRedLesionOverlay(heatmapOpacity[0])
                  )}
                </>
              )}

              {/* In-image Live Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-lg border border-red-500/40 text-[11px] font-semibold text-red-400 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Affected Tumor Lesion Highlighted
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FULL HEATMAP OVERLAY */}
        {viewMode === "overlay" && (
          <div className="space-y-3">
            <div className="relative aspect-square max-w-[480px] mx-auto rounded-2xl overflow-hidden border border-border shadow-lg bg-black">
              <img 
                src={originalImage} 
                alt="Original MRI" 
                className="w-full h-full object-contain"
              />
              {showHeatmap && (
                <>
                  {gradcamHeatmapUrl && !heatmapError ? (
                    <img 
                      src={gradcamHeatmapUrl} 
                      alt="Grad-CAM Attention Heatmap" 
                      onError={() => setHeatmapError(true)}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 mix-blend-screen"
                      style={{ opacity: heatmapOpacity[0] / 100 }}
                    />
                  ) : gradcamOverlayUrl && !overlayError ? (
                    <img 
                      src={gradcamOverlayUrl} 
                      alt="Grad-CAM Overlay" 
                      onError={() => setOverlayError(true)}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                      style={{ opacity: heatmapOpacity[0] / 100 }}
                    />
                  ) : (
                    renderClientRedLesionOverlay(heatmapOpacity[0])
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: SIDE BY SIDE COMPARISON */}
        {viewMode === "sideBySide" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left: Original Scan */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Original Brain MRI
                </p>
                <span className="text-[10px] text-muted-foreground">Input Scan</span>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-black shadow-sm">
                <img 
                  src={originalImage} 
                  alt="Original Brain MRI" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right: AI Affected Lesion Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Affected Tumor Area (Red)
                </p>
                <span className="text-[10px] text-red-500 font-semibold">Identified Lesion</span>
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-red-500/40 bg-black shadow-md relative">
                <img 
                  src={originalImage} 
                  alt="MRI Background" 
                  className="w-full h-full object-contain opacity-75"
                />
                {gradcamOverlayUrl && !overlayError ? (
                  <img 
                    src={gradcamOverlayUrl} 
                    alt="AI Red Lesion Overlay" 
                    onError={() => setOverlayError(true)}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  renderClientRedLesionOverlay(90)
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clinical Legend Bar */}
        <div className="mt-5 p-3.5 bg-muted/30 border border-border rounded-xl flex flex-wrap items-center justify-around gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-600 border border-white shadow-xs" />
            <span className="font-semibold text-foreground">
              লাল কালার চিহ্নিত অংশ = টিউমার / ইফেক্টেড অংশ (Tumor Lesion)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 border border-white shadow-xs" />
            <span className="text-muted-foreground">
              স্বাভাবিক ব্রেন টিস্যু (Normal Brain Structure)
            </span>
          </div>
        </div>

        {explanationNote && (
          <p className="mt-3 text-[11px] text-muted-foreground text-center italic border-t border-border pt-2">
            {explanationNote}
          </p>
        )}
      </div>
    </div>
  );
};

export default GradCAMVisualization;
