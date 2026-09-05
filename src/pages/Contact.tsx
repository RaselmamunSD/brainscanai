import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Research Inquiries",
    details: "contact@tumormultinet.ai",
    description: "Email our laboratory directly"
  },
  {
    icon: Phone,
    title: "Department Phone",
    details: "+880 1XXX-XXXXXX",
    description: "Monday - Friday, 9:00 AM - 6:00 PM"
  },
  {
    icon: MapPin,
    title: "Laboratory Location",
    details: "Dhaka, Bangladesh",
    description: "Medical AI & Computer Vision Lab"
  },
  {
    icon: Clock,
    title: "Operating Hours",
    details: "9:00 AM - 6:00 PM",
    description: "Sunday - Thursday"
  }
];

const faqs = [
  {
    question: "Is TumorMultiNetAI approved as an autonomous medical diagnostic device?",
    answer: "No. TumorMultiNetAI is strictly an AI-assisted screening and clinical decision-support tool. It is engineered to assist qualified healthcare professionals and radiologists, not replace them."
  },
  {
    question: "What medical imaging sequences and file formats are accepted?",
    answer: "We support DICOM (.dcm), PNG, JPG, and JPEG files across standard brain MRI sequences: T1-Weighted, T2-Weighted, FLAIR, and T1-Contrast Enhanced (T1ce)."
  },
  {
    question: "How does the Grad-CAM Explainable AI work?",
    answer: "Grad-CAM computes the gradient of the predicted tumor score with respect to feature activation maps in the final convolutional layer, rendering a visual heatmap showing which brain regions influenced the prediction."
  },
  {
    question: "How is patient medical privacy protected?",
    answer: "Our system enforces zero-PHI logging. Medical images are assigned randomized UUIDs, encrypted in storage, and metadata is scrubbed during ingestion."
  },
  {
    question: "Can academic institutions integrate the TumorMultiNetAI REST API?",
    answer: "Yes. The backend provides comprehensive OpenAPI / Swagger documented REST endpoints with JWT authentication and RBAC for hospital and university research integrations."
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    toast({
      title: "Inquiry Dispatched Successfully",
      description: "Thank you for reaching out. Our research team will respond within 24-48 hours.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Institutional & Clinical Consultation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            Get in Touch with <span className="text-gradient">BrainScanAI</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions about clinical screening capabilities, REST API integration, or academic research collaboration? 
            Our team is here to assist you.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-card border border-border text-center hover-lift shadow-sm space-y-2"
              >
                <div className="w-11 h-11 rounded-xl medical-gradient flex items-center justify-center text-primary-foreground mx-auto shadow-sm">
                  <info.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{info.title}</h3>
                <p className="text-xs font-semibold text-primary">{info.details}</p>
                <p className="text-[11px] text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & About Split */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Form (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl medical-gradient text-primary-foreground shadow-sm">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Send an Inquiry</h2>
                  <p className="text-xs text-muted-foreground">Fill out the details below and we will get back to you shortly</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. Jane Doe"
                      required
                      className="bg-background h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">Work / Institutional Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="doctor@hospital.org"
                      required
                      className="bg-background h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Inquiry Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Research Collaboration / API Access / General"
                    required
                    className="bg-background h-11"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Message / Details</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your research inquiry or institutional requirements..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full medical-gradient h-12 text-sm font-semibold shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Dispatching Message..." : "Send Consultation Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Side Information (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-3">
                <div className="flex items-center gap-2.5 text-primary">
                  <Building className="h-5 w-5" />
                  <h3 className="font-bold text-base text-foreground">Medical AI Research Lab</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  BrainScanAI is developed by an academic and clinical research consortium exploring multimodal neural networks, 
                  DICOM preprocessing pipelines, and gradient-weighted class activation mapping (Grad-CAM).
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-3">
                <div className="flex items-center gap-2.5 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-bold text-base text-foreground">Collaboration Opportunities</h3>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    Multicenter MRI dataset validation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    Clinical decision-support pilot testing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    PACS / DICOM server integration consulting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    Academic joint publication & benchmarking
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 sm:py-20 px-4 bg-muted/40 border-t border-border/70">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Essential answers regarding AI screening, safety, and imaging protocols
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-1.5"
              >
                <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;