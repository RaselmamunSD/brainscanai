import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "neuroscanai@research.edu",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+880 1XXX-XXXXXX",
    description: "Mon-Fri from 9am to 6pm"
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Dhaka, Bangladesh",
    description: "University Research Lab"
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "9:00 AM - 6:00 PM",
    description: "Saturday - Thursday"
  }
];

const faqs = [
  {
    question: "Is this system approved for clinical use?",
    answer: "No, this system is for research and educational purposes only. It should not be used for clinical diagnosis without proper medical consultation."
  },
  {
    question: "What MRI formats are supported?",
    answer: "We support T1, T2, FLAIR, and T1ce MRI formats in common image formats like JPEG, PNG, and DICOM."
  },
  {
    question: "How accurate is the detection?",
    answer: "Our model achieves over 95% accuracy on test datasets. However, results should always be verified by qualified medical professionals."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, all uploaded images are processed securely and are not stored permanently. We prioritize data privacy and security."
  },
  {
    question: "Can I use this for my research?",
    answer: "Yes, this platform is designed for research and educational purposes. Please cite our work if you use it in your research."
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
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
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">Get In Touch</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Have questions about our brain tumor detection system? Want to collaborate on research? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-6 sm:py-8 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl medical-gradient flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-xs sm:text-sm text-primary font-medium mb-1">{info.details}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg medical-gradient flex items-center justify-center">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Send a Message</h2>
                  <p className="text-muted-foreground text-xs sm:text-sm">Fill out the form and we'll respond soon</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full medical-gradient h-11 sm:h-12 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-6 sm:space-y-8">
              {/* About Section */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-muted/50 border border-border">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">About Our Research</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  NeuroScanAI is a research project developed by a dedicated team of students and 
                  faculty members. Our goal is to leverage artificial intelligence to assist in 
                  early detection of brain tumors, potentially improving patient outcomes through 
                  faster diagnosis.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This project is part of our ongoing research in medical image analysis and 
                  deep learning applications in healthcare.
                </p>
              </div>

              {/* Collaboration */}
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">Research Collaboration</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                  We welcome collaboration opportunities with researchers, medical institutions, 
                  and organizations interested in advancing AI-assisted medical diagnosis.
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    Joint research projects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    Dataset contributions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    Technical consultations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    Academic partnerships
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Find answers to common questions about our system
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border"
              >
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{faq.answer}</p>
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