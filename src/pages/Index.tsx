import { Brain, Upload, BarChart3, Users, Zap, Shield, Eye, ArrowRight, CheckCircle, Sparkles, Activity, FileCheck, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RotatingBrainHero from "@/components/RotatingBrainHero";

const stats = [
  { value: "96.8%", label: "Accuracy Score" },
  { value: "4 Types", label: "Tumor Screening Classes" },
  { value: "<45ms", label: "PyTorch GPU Latency" },
  { value: "100%", label: "DICOM & XAI Ready" },
];

const features = [
  {
    icon: Brain,
    title: "Multimodal MRI Analysis",
    description: "Support for T1, T2, FLAIR, and T1ce MRI modalities with intelligent feature enhancement.",
  },
  {
    icon: Zap,
    title: "Real-Time AI Inference",
    description: "Instant predictions with calibrated confidence scores powered by PyTorch Deep Learning.",
  },
  {
    icon: Eye,
    title: "Explainable AI (Grad-CAM)",
    description: "Visual attention heatmaps highlighting discriminative tumor regions for transparent clinical review.",
  },
  {
    icon: Shield,
    title: "Medical Grade Security",
    description: "Zero-PHI logging, HIPAA-aligned audit trails, and strict role-based doctor access control.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload MRI Scan",
    description: "Drag and drop or select your brain MRI image in DICOM (.dcm), PNG, or JPEG format.",
  },
  {
    step: "02",
    title: "AI Inference & Screening",
    description: "Our neural network extracts deep features and classifies abnormalities into standard screening categories.",
  },
  {
    step: "03",
    title: "Grad-CAM & Review",
    description: "Inspect visual attention overlays and submit doctor clinical notes with decision-support recommendations.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* ----------------- UNIQUE 3D ROTATING HERO SECTION ----------------- */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        {/* Ambient Background Gradient Lights */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & Call To Actions */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold animate-fade-in shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                Next-Gen Deep Learning • Multimodal MRI
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground tracking-tight leading-[1.15]">
                Brain Tumor Detection with{" "}
                <span className="text-gradient drop-shadow-sm">Explainable AI</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Empowering radiologists and clinical researchers with fast, transparent MRI screening. 
                Upload scans to generate deep learning predictions, class probabilities, and interactive <strong>Grad-CAM</strong> attention heatmaps.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2">
                <Link to="/upload" className="w-full sm:w-auto">
                  <Button size="lg" className="medical-gradient text-base font-semibold px-7 h-12 sm:h-14 w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Start Free MRI Screening
                  </Button>
                </Link>
                <Link to="/analytics" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="text-base font-semibold px-6 h-12 sm:h-14 w-full sm:w-auto hover:bg-muted/80">
                    <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Model Benchmark
                  </Button>
                </Link>
              </div>

              {/* Status Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-foreground">AI Inference Online</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="h-3.5 w-3.5 text-primary" />
                  <span>DICOM & 16-bit Windowing</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Grad-CAM++ Visuals</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Rotating Brain AI Visualizer */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <RotatingBrainHero />
            </div>

          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-14 sm:mt-20 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-4 sm:p-6 bg-card/70 border border-border/80 backdrop-blur-md rounded-2xl hover-lift shadow-sm transition-all"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- HOW IT WORKS ----------------- */}
      <section className="py-14 sm:py-20 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              How BrainScanAI Works
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              A clinical workflow engineered for simplicity, high speed, and decision transparency
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border hover-lift h-full shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-primary/30 mb-3 font-mono">{item.step}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-7 w-7 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CORE FEATURES ----------------- */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Key Platform Capabilities
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art AI architecture built for clinical research and screening assistance
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-card p-5 sm:p-6 rounded-2xl border border-border hover-lift group shadow-sm transition-all"
              >
                <div className="p-3 rounded-xl medical-gradient w-fit mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- TUMOR CLASSIFICATION MATRIX ----------------- */}
      <section className="py-14 sm:py-20 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Supported Brain Tumor Classes
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Trained and benchmarked on verified medical brain MRI datasets
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { type: "Glioma", desc: "Malignant primary brain tumor originating from glial soft-tissue cells.", badge: "Malignant" },
                { type: "Meningioma", desc: "Typically slow-growing tumor originating in the protective meninges layer.", badge: "Benign / Atypical" },
                { type: "Pituitary Tumor", desc: "Abnormal neoplastic growth localized to the pituitary gland.", badge: "Endocrine" },
                { type: "No Tumor / Normal", desc: "Clean anatomical brain MRI slice with no detectable neoplastic mass.", badge: "Healthy" },
              ].map((tumor) => (
                <div key={tumor.type} className="flex items-start gap-3.5 bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm sm:text-base text-foreground">{tumor.type}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">{tumor.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tumor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION ----------------- */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-cyan-500/10 to-indigo-500/10 p-8 sm:p-12 md:p-16 rounded-3xl border border-border/80 shadow-lg">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-foreground mb-4">
              Experience the Future of AI Radiology
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Upload your brain MRI scan now to receive multi-class screening predictions and interactive Grad-CAM attention visualizations in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="medical-gradient text-base font-semibold px-8 h-12 sm:h-14 w-full sm:w-auto shadow-md">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload MRI Scan
                </Button>
              </Link>
              <Link to="/team" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base font-semibold px-7 h-12 sm:h-14 w-full sm:w-auto">
                  <Users className="mr-2 h-5 w-5" />
                  Meet the Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- MEDICAL SAFETY DISCLAIMER ----------------- */}
      <section className="py-6 bg-warning/5 border-y border-warning/20">
        <div className="container mx-auto px-4">
          <div className="flex items-start sm:items-center justify-center gap-3 text-center">
            <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-warning">Important Medical Disclaimer:</strong> BrainScanAI is an AI-assisted screening and decision-support tool. It does not provide autonomous medical diagnoses. All outputs must be evaluated and confirmed by a licensed medical doctor or certified radiologist.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
