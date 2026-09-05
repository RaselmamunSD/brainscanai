import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X, FileImage, Sparkles, CheckCircle2, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  disabled?: boolean;
}

// Sample dummy image generator for 1-click testing
const createSampleFile = (type: string): File => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 256, 256);

    // Brain ellipse
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.ellipse(128, 128, 90, 110, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ventricles / Anatomical structures
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.ellipse(110, 128, 18, 45, -0.2, 0, Math.PI * 2);
    ctx.ellipse(146, 128, 18, 45, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // If tumor sample, draw mass
    if (type !== "Normal") {
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(155, 95, 24, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const dataUrl = canvas.toDataURL("image/png");
  const byteString = atob(dataUrl.split(",")[1]);
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], `sample_${type.toLowerCase()}_scan.png`, { type: "image/png" });
};

const UploadZone = ({ onFileSelect, selectedFile, onClear, disabled }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFile(e.dataTransfer.files[0]);
      }
    },
    [disabled, processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFile(e.target.files[0]);
      }
    },
    [processFile]
  );

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  const handleSelectSample = (sampleType: string) => {
    const file = createSampleFile(sampleType);
    processFile(file);
  };

  if (selectedFile && preview) {
    return (
      <div className="relative w-full max-w-md mx-auto animate-fade-in">
        <div className="bg-card rounded-2xl border-2 border-primary/40 overflow-hidden shadow-xl shadow-primary/10">
          <div className="relative aspect-square max-h-[340px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <img 
              src={preview} 
              alt="MRI Preview" 
              className="w-full h-full object-contain"
            />
            {/* Holographic grid & laser scan effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(14,165,233,0.15)_50%,transparent_100%)] animate-scan-line pointer-events-none" />
            
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-cyan-400 text-xs font-mono flex items-center gap-1.5 border border-cyan-500/30">
              <ScanLine className="h-3.5 w-3.5 animate-pulse" />
              <span>SCAN LOADED</span>
            </div>
          </div>

          <div className="p-4 bg-card/90 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FileImage className="h-5 w-5" />
              </div>
              <div className="truncate">
                <p className="font-bold text-sm text-foreground truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for AI Inference
                </p>
              </div>
            </div>

            {!disabled && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                onClick={handleClear}
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative w-full max-w-md mx-auto border-2 border-dashed rounded-2xl p-7 sm:p-9 transition-all duration-300 cursor-pointer text-center",
          isDragging
            ? "border-primary bg-primary/10 scale-102 shadow-xl shadow-primary/20"
            : "border-border hover:border-primary/60 hover:bg-muted/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          accept=".dcm,.png,.jpg,.jpeg,image/*"
          onChange={handleFileInput}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="flex flex-col items-center">
          <div className={cn(
            "p-4 rounded-2xl mb-3.5 transition-all duration-300 shadow-md",
            isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary"
          )}>
            <Upload className="h-8 w-8" />
          </div>
          
          <h4 className="text-base sm:text-lg font-bold text-foreground mb-1">
            {isDragging ? "Drop your Brain MRI scan here" : "Upload MRI Scan File"}
          </h4>
          
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 max-w-xs">
            Drag & drop DICOM, PNG, or JPG file, or click to browse
          </p>
          
          <div className="flex flex-wrap justify-center gap-1.5">
            {["DICOM (.dcm)", "PNG", "JPEG", "T1 / T2 / FLAIR"].map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 bg-muted/80 rounded-md text-[10px] sm:text-xs font-semibold text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Instant Demo MRI Sample Selector */}
      <div className="text-center pt-1">
        <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Or load a verified test scan:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: "Glioma Scan", type: "Glioma" },
            { label: "Meningioma Scan", type: "Meningioma" },
            { label: "Normal Brain", type: "Normal" },
          ].map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => handleSelectSample(sample.type)}
              disabled={disabled}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-card border border-border/80 hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
