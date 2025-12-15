import { Brain, Upload, BarChart3, Users, Zap, Shield, Eye, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  { value: "96.8%", label: "Accuracy" },
  { value: "4", label: "Tumor Types" },
  { value: "<3s", label: "Analysis Time" },
  { value: "1000+", label: "MRI Analyzed" },
];

const features = [
  {
    icon: Brain,
    title: "Multimodal MRI Analysis",
    description: "Support for T1, T2, FLAIR, and T1ce MRI modalities with intelligent fusion.",
  },
  {
    icon: Zap,
    title: "Near Real-Time Results",
    description: "Get accurate predictions within seconds using optimized deep learning models.",
  },
  {
    icon: Eye,
    title: "Explainable AI",
    description: "Grad-CAM visualizations highlight tumor regions for transparent predictions.",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Trained on extensive datasets with 96.8% accuracy for tumor classification.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload MRI Scan",
    description: "Drag and drop or select your brain MRI image (T1, T2, FLAIR, or T1ce).",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our deep learning model processes and analyzes the MRI for tumor detection.",
  },
  {
    step: "03",
    title: "View Results",
    description: "Get detailed predictions with tumor type, confidence score, and heatmap visualization.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
              <Brain className="h-4 w-4" />
              AI-Powered Medical Imaging
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Brain Cancer Detection Using{" "}
              <span className="text-gradient">Multimodal MRI & AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Advanced deep learning platform for accurate brain tumor detection and classification. 
              Upload MRI scans and get instant AI-powered analysis with explainable visualizations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/upload">
                <Button size="lg" className="medical-gradient text-lg px-8 h-14 w-full sm:w-auto">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Analysis
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 w-full sm:w-auto">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Model Performance
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 glass-effect rounded-2xl hover-lift animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process to get AI-powered brain tumor analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-card p-8 rounded-2xl border border-border hover-lift h-full">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art AI technology for accurate and explainable brain tumor detection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="bg-card p-6 rounded-2xl border border-border hover-lift group"
              >
                <div className="p-3 rounded-xl medical-gradient w-fit mb-4 group-hover:animate-pulse-glow">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Supported Tumor Types */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Tumor Classification
              </h2>
              <p className="text-muted-foreground">
                Our model accurately classifies the following brain tumor types
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { type: "Glioma", desc: "Most common malignant brain tumor arising from glial cells" },
                { type: "Meningioma", desc: "Typically benign tumor originating in the meninges" },
                { type: "Pituitary Tumor", desc: "Abnormal growths in the pituitary gland" },
                { type: "No Tumor", desc: "Normal brain scan without tumor presence" },
              ].map((tumor) => (
                <div key={tumor.type} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">{tumor.type}</div>
                    <div className="text-sm text-muted-foreground">{tumor.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-12 rounded-3xl border border-border">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Analyze Your MRI?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Upload your brain MRI scan and get instant AI-powered analysis with detailed tumor classification and visualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button size="lg" className="medical-gradient text-lg px-8 h-14">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload MRI Now
                </Button>
              </Link>
              <Link to="/team">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  <Users className="mr-2 h-5 w-5" />
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="py-8 bg-warning/5 border-y border-warning/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <Shield className="h-5 w-5 text-warning shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-warning">Disclaimer:</strong> This system is intended for research and educational purposes only. 
              It should not be used for clinical diagnosis or medical decision-making.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
