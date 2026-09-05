import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, Scan, LineChart, Shield, Zap, Target, CheckCircle, ArrowRight, Layers, Sparkles, Database, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "PyTorch Deep Learning Core",
    description: "Deep convolutional architecture fine-tuned on clinical brain MRI scans for accurate feature extraction."
  },
  {
    icon: Scan,
    title: "Multimodal MRI Ingestion",
    description: "Native support for T1, T2, FLAIR, and T1ce sequences in DICOM (.dcm), PNG, and JPEG formats."
  },
  {
    icon: Eye,
    title: "Explainable AI (Grad-CAM)",
    description: "Computes gradient activation maps highlighting discriminative tumor regions to ensure decision transparency."
  },
  {
    icon: Lock,
    title: "Medical Data Privacy",
    description: "Zero patient-identifiable data in application logs, encrypted storage abstraction, and HIPAA-aligned audit trails."
  },
  {
    icon: Zap,
    title: "Sub-50ms Inference Latency",
    description: "Optimized model pipeline with Redis caching and Celery worker queue for high-throughput batch processing."
  },
  {
    icon: Database,
    title: "Role-Based Clinical Workflow",
    description: "Dedicated review queues for licensed doctors and radiologists to record official clinical findings."
  }
];

const tumorTypes = [
  {
    name: "Glioma",
    type: "Malignant Soft-Tissue",
    description: "Arises from glial cells. High accuracy detection for glioblastomas, astrocytomas, and oligodendrogliomas.",
    accuracy: "96.2%"
  },
  {
    name: "Meningioma",
    type: "Meningeal Layers",
    description: "Typically benign or atypical tumors originating in the protective membranes surrounding the brain.",
    accuracy: "94.8%"
  },
  {
    name: "Pituitary Tumor",
    type: "Sellar Region",
    description: "Neoplasms occurring in the pituitary gland influencing hormonal and optic nerve pathways.",
    accuracy: "97.1%"
  },
  {
    name: "No Tumor / Healthy",
    type: "Clean Scan",
    description: "Anatomically normal brain MRI slices to minimize false-positive rates in clinical screening.",
    accuracy: "98.3%"
  }
];

const workflow = [
  {
    step: "01",
    title: "DICOM / Image Upload",
    description: "Upload MRI scans through the secure frontend or integrate PACS via standard REST APIs."
  },
  {
    step: "02",
    title: "Hounsfield Normalization",
    description: "CLAHE enhancement, windowing, and spatial standardisation to 224x224 tensor representations."
  },
  {
    step: "03",
    title: "Neural Network Inference",
    description: "Forward pass through the PyTorch classifier calculating multi-class probability distributions."
  },
  {
    step: "04",
    title: "Grad-CAM & Doctor Review",
    description: "Visual heatmaps generated and presented to radiologists for verified clinical sign-off."
  }
];

const Solution = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-14 px-4 relative overflow-hidden">
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Architecture & Decision-Support Technology</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
            Next-Generation AI for <br />
            <span className="text-gradient">Brain MRI Image Analysis</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Combining deep convolutional neural networks with <strong>Grad-CAM</strong> visual attention heatmaps 
            to accelerate screening, reduce diagnostic delays, and provide clinicians with transparent insights.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="medical-gradient text-base font-semibold px-8 h-12 sm:h-13 shadow-md">
                Launch Diagnostic Console <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="text-base font-semibold px-6 h-12 sm:h-13">
                View Model Benchmarks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-14 sm:py-20 px-4 bg-muted/40 border-y border-border/70">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Platform Architecture Pillars
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Engineered with modern cloud standards, medical privacy, and PyTorch deep learning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover-lift shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-xl medical-gradient flex items-center justify-center text-primary-foreground shadow-md">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tumor Classification Breakdown */}
      <section className="py-14 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Screening & Classification Coverage
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Validated on diverse neuro-oncology benchmark datasets
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {tumorTypes.map((tumor, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between hover-lift text-center"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{tumor.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium inline-block mb-2">
                    {tumor.type}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tumor.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <div className="text-2xl font-black text-gradient">{tumor.accuracy}</div>
                  <p className="text-[10px] text-muted-foreground font-semibold">Test Sensitivity</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-14 sm:py-20 px-4 bg-muted/40 border-y border-border/70">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Clinical Decision-Support Workflow
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              From raw DICOM acquisition to explainable AI output in 4 streamlined steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {workflow.map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between hover-lift">
                <div>
                  <div className="text-3xl font-black text-primary/30 mb-3 font-mono">{item.step}</div>
                  <h3 className="font-bold text-base text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary/15 via-cyan-500/15 to-indigo-500/15 p-8 sm:p-12 md:p-16 text-center border border-border/80 shadow-lg">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Integrate AI Screening into Your Workflow
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Experience the power of neural decision-support. Upload scans or consult with our research team today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/upload">
                <Button size="lg" className="medical-gradient text-base font-semibold px-8 h-12 sm:h-13 shadow-md">
                  Upload MRI Scan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-base font-semibold px-6 h-12 sm:h-13">
                  Contact Research Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solution;