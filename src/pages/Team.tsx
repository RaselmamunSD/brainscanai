import { ArrowLeft, Users, Brain, Target, Sparkles, Award, ShieldCheck, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamMemberCard from "@/components/TeamMemberCard";
import { teamData } from "@/data/teamData";

const Team = () => {
  const supervisor = teamData.find((m) => m.role === "supervisor");
  const members = teamData.filter((m) => m.role === "member");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-foreground tracking-tight">
              Medical & AI Research Team
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mt-1">
              Meet the researchers, engineers, and faculty behind the BrainScanAI multimodal brain tumor classification platform
            </p>
          </div>

          {/* About Project & Objectives */}
          <div className="bg-gradient-to-r from-primary/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl border border-border/80 p-6 sm:p-8 md:p-10 mb-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl medical-gradient text-primary-foreground shadow-sm">
                    <Brain className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Project Vision</h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  BrainScanAI is dedicated to developing transparent, high-accuracy deep learning systems for early brain tumor screening and localization. 
                  Our system assists radiologists by providing standardized screening labels and explainable <strong>Grad-CAM</strong> visual attention heatmaps.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  The architecture leverages multi-modal convolutional networks trained across T1, T2, FLAIR, and T1ce MRI modalities to identify Gliomas, Meningiomas, and Pituitary tumors.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl medical-gradient text-primary-foreground shadow-sm">
                    <Target className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Research Milestones</h2>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  {[
                    "Validated >96.8% multi-class accuracy on benchmark cohorts",
                    "Integrated real-time Grad-CAM & Grad-CAM++ visual interpretability",
                    "Engineered DICOM 16-bit windowing and automated CLAHE normalisation",
                    "Sub-50ms inference latency on PyTorch deep learning backend",
                    "Zero-PHI logging and HIPAA-aligned clinical review workflows",
                  ].map((milestone, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                <Users className="h-3.5 w-3.5" /> Core Contributors
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                Faculty Supervisor & Researchers
              </h2>
            </div>
            
            {/* Supervisor */}
            {supervisor && (
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <TeamMemberCard member={supervisor} />
                </div>
              </div>
            )}
            
            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
              {members.map((member) => (
                <div key={member.id} className="w-full max-w-sm">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl bg-card border border-border shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Academic & Research Inquiries</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Interested in collaborating on neuro-oncology AI research or contributing datasets? We welcome partnerships.
            </p>
            <Link to="/contact">
              <button className="px-7 py-3 medical-gradient text-primary-foreground rounded-xl text-sm font-semibold shadow-md hover:shadow-primary/30 transition-all">
                Get in Touch with the Lab
              </button>
            </Link>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
