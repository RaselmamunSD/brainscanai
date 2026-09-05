import React, { useState, useEffect } from "react";
import { Brain, Sparkles, Activity, ShieldCheck, Zap, Eye, Play, Pause, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ScanCard {
  id: string;
  name: string;
  modality: string;
  badge: string;
  badgeColor: string;
  tumorClass: string;
  confidence: string;
  imageGradient: string;
  svgPathType: "brain" | "tumor" | "heatmap" | "normal";
}

const scanCards: ScanCard[] = [
  {
    id: "scan-t1",
    name: "T1 Anatomical",
    modality: "T1-Weighted",
    badge: "Baseline Slice",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    tumorClass: "Tissue Boundary",
    confidence: "98.7%",
    imageGradient: "from-slate-900 via-cyan-950 to-slate-900",
    svgPathType: "normal",
  },
  {
    id: "scan-t2",
    name: "T2 Edema Focus",
    modality: "T2-Weighted",
    badge: "Edema Mapping",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    tumorClass: "Fluid Attenuation",
    confidence: "96.4%",
    imageGradient: "from-slate-900 via-amber-950 to-slate-900",
    svgPathType: "tumor",
  },
  {
    id: "scan-flair",
    name: "FLAIR Suppressed",
    modality: "FLAIR-MRI",
    badge: "Glioma Suspect",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    tumorClass: "Abnormal Lesion",
    confidence: "99.1%",
    imageGradient: "from-slate-900 via-rose-950 to-slate-900",
    svgPathType: "tumor",
  },
  {
    id: "scan-xai",
    name: "Grad-CAM XAI",
    modality: "Attention Map",
    badge: "AI Explainability",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tumorClass: "Attention Focus",
    confidence: "97.8%",
    imageGradient: "from-slate-900 via-emerald-950 to-slate-900",
    svgPathType: "heatmap",
  },
];

export const RotatingBrainHero: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedScan, setSelectedScan] = useState<ScanCard>(scanCards[0]);
  const [activePulse, setActivePulse] = useState(0);

  // Smooth orbital rotation loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Neural pulse ticker
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 4);
    }, 1800);
    return () => clearInterval(pulseInterval);
  }, []);

  const orbitRadius = 180; // Distance in pixels from the center

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[480px] sm:h-[560px] flex items-center justify-center select-none overflow-visible">
      {/* Background Soft Glow Orbs */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/10 blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-cyan-400/10 blur-2xl -z-10 animate-float" />

      {/* ----------------- OUTER ORBITAL RING ----------------- */}
      <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-sky-300/40 border-dashed animate-spin-slow pointer-events-none" />
      
      {/* ----------------- MIDDLE LASER RING ----------------- */}
      <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border-2 border-primary/20 border-dotted animate-spin-reverse-slow pointer-events-none" />

      {/* ----------------- INNER SCANNING RADAR ----------------- */}
      <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-primary/25 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Rotating Radar Scanner Needle */}
        <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(14,165,233,0.15)_360deg)] animate-radar-sweep" />
      </div>

      {/* ----------------- CENTRAL HOLOGRAPHIC BRAIN CORE ----------------- */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="relative p-5 sm:p-7 rounded-full bg-white border-2 border-primary/50 shadow-[0_10px_35px_rgba(14,165,233,0.25)] transition-all duration-500 hover:scale-110 group cursor-pointer">
          {/* Animated Energy Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-25" />
          
          {/* Central Brain Icon */}
          <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-primary drop-shadow-[0_4px_12px_rgba(14,165,233,0.4)] transition-transform duration-700 group-hover:rotate-12" />

          {/* Floating Live AI Indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold shadow-md flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-spin" /> AI CORE
          </div>
        </div>

        {/* Selected Scan Info Below Core */}
        <div className="mt-3 text-center px-3 py-1 rounded-full bg-white border border-border shadow-sm animate-fade-in">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Inspecting: <strong className="text-slate-900">{selectedScan.name}</strong>
          </span>
        </div>
      </div>

      {/* ----------------- 4 REVOLVING BRAIN MRI SLICES / NODES ----------------- */}
      {scanCards.map((scan, index) => {
        // Calculate 3D orbital position (each card separated by 90 degrees)
        const cardAngle = (rotationAngle + index * 90) * (Math.PI / 180);
        const x = Math.cos(cardAngle) * orbitRadius;
        const y = Math.sin(cardAngle) * (orbitRadius * 0.55); // Isometric elliptical 3D perspective
        const scale = 0.85 + ((Math.sin(cardAngle) + 1) / 2) * 0.3; // Closer cards look bigger (depth effect)
        const zIndex = Math.sin(cardAngle) > 0 ? 30 : 10;

        const isSelected = selectedScan.id === scan.id;

        return (
          <div
            key={scan.id}
            onClick={() => setSelectedScan(scan)}
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              zIndex,
            }}
            className={cn(
              "absolute transition-transform duration-75 cursor-pointer",
              "w-36 sm:w-44 p-2.5 sm:p-3 rounded-2xl border shadow-lg bg-white",
              isSelected
                ? "border-primary ring-2 ring-primary/30 shadow-[0_10px_25px_rgba(14,165,233,0.3)]"
                : "border-slate-200/90 hover:border-primary/60 hover:shadow-xl hover:scale-105"
            )}
          >
            {/* Scan Image Preview Graphic */}
            <div
              className={cn(
                "relative w-full h-16 sm:h-20 rounded-xl overflow-hidden border border-slate-700/40 flex items-center justify-center bg-gradient-to-br",
                scan.imageGradient
              )}
            >
              {/* Abstract Brain Slice Visual */}
              <svg className="w-12 h-12 text-cyan-400 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 4.58 2.5 2.5 0 0 0 2.92 2.92 2.5 2.5 0 0 0 4-1.28 2.5 2.5 0 0 0 4 1.28 2.5 2.5 0 0 0 2.92-2.92 3 3 0 0 0 .34-4.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5Z" />
                <path d="m15.7 10.4-.9.4" />
                <path d="m9.2 13.2-.9.4" />
                <path d="m12 8v8" />
              </svg>

              {/* Heatmap overlay spot for XAI scan */}
              {scan.svgPathType === "heatmap" && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(239,68,68,0.7)_0%,rgba(245,158,11,0.5)_35%,transparent_70%)] animate-pulse" />
              )}
              {scan.svgPathType === "tumor" && (
                <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-rose-500 border border-rose-200 animate-ping" />
              )}

              {/* Badge */}
              <span className={cn("absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded border", scan.badgeColor)}>
                {scan.modality}
              </span>

              {/* Confidence */}
              <span className="absolute bottom-1 right-1.5 text-[9px] font-semibold text-emerald-300 bg-black/70 px-1 rounded">
                {scan.confidence}
              </span>
            </div>

            {/* Title & Classification */}
            <div className="mt-2 flex items-center justify-between">
              <div className="truncate">
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">{scan.name}</p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">{scan.tumorClass}</p>
              </div>
              <Activity className={cn("h-3.5 w-3.5 shrink-0", isSelected ? "text-primary animate-pulse" : "text-slate-400")} />
            </div>
          </div>
        );
      })}

      {/* ----------------- FLOATING HUD TELEMETRY BADGES ----------------- */}
      <div className="hidden sm:flex absolute -bottom-4 left-2 items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-md">
        <Zap className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-slate-500 font-medium">Inference Latency:</span>
        <strong className="text-slate-900 font-bold">42ms (PyTorch)</strong>
      </div>

      <div className="hidden sm:flex absolute -top-4 right-2 items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-md">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-slate-500 font-medium">Grad-CAM XAI:</span>
        <strong className="text-emerald-600 font-bold">Online</strong>
      </div>

      {/* ----------------- INTERACTIVE ROTATION CONTROLS ----------------- */}
      <div className="absolute bottom-1 right-2 z-40 flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm text-xs">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-primary transition-colors"
          title={isPaused ? "Resume rotation" : "Pause rotation"}
        >
          {isPaused ? <Play className="h-3 w-3 text-primary" /> : <Pause className="h-3 w-3 text-primary" />}
          {isPaused ? "Play" : "Pause"}
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
          className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold hover:text-primary transition-colors"
          title="Rotate forward"
        >
          <RotateCw className="h-3 w-3" /> Step
        </button>
      </div>
    </div>
  );
};

export default RotatingBrainHero;
