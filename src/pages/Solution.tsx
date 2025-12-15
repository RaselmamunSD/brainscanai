import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, Scan, LineChart, Shield, Zap, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Model",
    description: "Our deep learning model is trained on thousands of MRI scans to accurately detect and classify brain tumors with high precision."
  },
  {
    icon: Scan,
    title: "Multi-Format Support",
    description: "Supports T1, T2, FLAIR, and T1ce MRI formats for comprehensive analysis across different imaging protocols."
  },
  {
    icon: LineChart,
    title: "Explainable AI",
    description: "Grad-CAM visualization highlights the regions that influenced the AI's decision, making results interpretable for medical professionals."
  },
  {
    icon: Shield,
    title: "Secure Processing",
    description: "All uploads are processed securely with end-to-end encryption. Your medical data remains private and protected."
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Get instant results within seconds. Our optimized pipeline ensures fast processing without compromising accuracy."
  },
  {
    icon: Target,
    title: "High Accuracy",
    description: "Achieves over 95% accuracy in tumor classification across glioma, meningioma, pituitary tumors, and healthy brain detection."
  }
];

const tumorTypes = [
  {
    name: "Glioma",
    description: "Tumors that originate from glial cells. Our model identifies various grades and subtypes of gliomas.",
    accuracy: "96.2%"
  },
  {
    name: "Meningioma",
    description: "Tumors arising from the meninges. Typically benign but require monitoring and potential treatment.",
    accuracy: "94.8%"
  },
  {
    name: "Pituitary Tumor",
    description: "Abnormal growths in the pituitary gland. Can affect hormone production and vision.",
    accuracy: "97.1%"
  },
  {
    name: "No Tumor",
    description: "Healthy brain tissue classification. Helps reduce false positives in screening.",
    accuracy: "98.3%"
  }
];

const workflow = [
  {
    step: "01",
    title: "Upload MRI Scan",
    description: "Simply drag and drop or select your brain MRI image in supported formats."
  },
  {
    step: "02",
    title: "AI Processing",
    description: "Our advanced neural network analyzes the image using state-of-the-art deep learning techniques."
  },
  {
    step: "03",
    title: "Generate Heatmap",
    description: "Grad-CAM visualization creates an interpretable heatmap highlighting areas of interest."
  },
  {
    step: "04",
    title: "View Results",
    description: "Receive detailed classification results with confidence scores and visual explanations."
  }
];

const Solution = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Solution</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Advanced Brain Tumor <br />
            <span className="text-primary">Detection Technology</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Our cutting-edge AI solution combines deep learning with explainable AI to provide 
            accurate, fast, and interpretable brain tumor detection from MRI scans.
          </p>
          <Link to="/upload">
            <Button size="lg" className="medical-gradient">
              Try It Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes our brain tumor detection system stand out
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl medical-gradient flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tumor Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tumor Classification
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our model can accurately classify the following tumor types
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tumorTypes.map((tumor, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{tumor.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tumor.description}</p>
                <div className="text-2xl font-bold text-primary">{tumor.accuracy}</div>
                <p className="text-xs text-muted-foreground">Accuracy Rate</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to get your results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="rounded-3xl medical-gradient p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Try Our Solution?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Upload your MRI scan now and experience the power of AI-assisted brain tumor detection.
            </p>
            <Link to="/upload">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solution;