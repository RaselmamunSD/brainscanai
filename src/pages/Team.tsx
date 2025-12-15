import { ArrowLeft, Users, Brain, Target } from "lucide-react";
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
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Our Research Team
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Meet the dedicated researchers and developers behind the NeuroScanAI brain cancer detection platform
            </p>
          </div>

          {/* About Project */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-border p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg medical-gradient">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">About the Project</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  This project focuses on developing an AI-powered brain tumor detection and classification system 
                  using multimodal MRI analysis. Our goal is to assist medical professionals with accurate, 
                  explainable predictions while advancing research in medical imaging AI.
                </p>
                <p className="text-muted-foreground">
                  The system leverages deep learning techniques including convolutional neural networks 
                  and attention mechanisms to analyze brain MRI scans across multiple modalities (T1, T2, FLAIR, T1ce).
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg medical-gradient">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Research Objectives</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "Develop accurate brain tumor classification with >95% accuracy",
                    "Implement explainable AI using Grad-CAM visualizations",
                    "Create user-friendly interface for clinical research use",
                    "Enable multimodal MRI fusion for improved predictions",
                    "Provide real-time analysis with sub-3 second inference",
                  ].map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-display font-bold text-foreground">Our Team</h2>
            </div>
            
            {/* Row 1: Supervisor (centered) */}
            {supervisor && (
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <TeamMemberCard member={supervisor} />
                </div>
              </div>
            )}
            
            {/* Row 2: First 2 members */}
            <div className="flex justify-center gap-6">
              {members.slice(0, 2).map((member) => (
                <div key={member.id} className="w-full max-w-sm">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
            
            {/* Row 3: Last 3 members */}
            <div className="flex justify-center gap-6 flex-wrap">
              {members.slice(2, 5).map((member) => (
                <div key={member.id} className="w-full max-w-xs">
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Interested in our research or have questions about the project? 
              Feel free to reach out to any of our team members via email.
            </p>
            <Link to="/upload">
              <button className="px-8 py-3 medical-gradient text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
                Try NeuroScanAI Now
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
