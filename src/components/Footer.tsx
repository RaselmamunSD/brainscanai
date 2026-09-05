import { Brain, Heart, Shield, Activity, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/80 pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl medical-gradient text-primary-foreground shadow-sm">
                <Brain className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-foreground">
                TumorMultiNet<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              Clinical decision-support platform engineered for multimodal brain MRI analysis, 
              automated tumor screening, and transparent <strong>Grad-CAM</strong> visual interpretability.
            </p>
          </div>

          {/* Col 3: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground tracking-tight">Platform</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link to="/upload" className="hover:text-primary transition-colors flex items-center gap-1">
                  Upload & Analyze MRI <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-primary transition-colors">
                  Model Analytics & Metrics
                </Link>
              </li>
              <li>
                <Link to="/solution" className="hover:text-primary transition-colors">
                  AI Architecture & Fusion
                </Link>
              </li>
              <li>
                <a href="/docs" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  Swagger OpenAPI Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Research & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground tracking-tight">Research & Team</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link to="/team" className="hover:text-primary transition-colors">
                  Our Research Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Institutional Consultation
                </Link>
              </li>
              <li>
                <Link to="/solution" className="hover:text-primary transition-colors">
                  Tumor Classification Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Safety & Regulatory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground tracking-tight">Compliance</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed according to international AI medical research standards. Zero-PHI telemetry and encrypted storage.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <Shield className="h-4 w-4 text-primary" />
              <span>HIPAA & GDPR Aligned</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TumorMultiNetAI Research Group. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Developed for AI-Assisted Medical Screening & Clinical Decision Support.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
