import { Brain, Menu, X, Sparkles, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solution", label: "Solution & Tech" },
  { href: "/upload", label: "Analyze MRI" },
  { href: "/analytics", label: "Model Analytics" },
  { href: "/team", label: "Research Team" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2.5 rounded-xl medical-gradient shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
              <Brain className="h-6 w-6 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-foreground tracking-tight">
                  BrainScan<span className="text-primary">AI</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                Multimodal MRI Decision Support
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/60 p-1.5 rounded-2xl border border-border/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-card text-primary shadow-sm border border-border/80 font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">AI Ready</span>
            </div>

            <Link to="/upload">
              <Button className="medical-gradient font-semibold shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all">
                Analyze MRI <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-muted/70 text-foreground border border-border"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border/80 bg-card/95 backdrop-blur-xl rounded-b-2xl animate-fade-in space-y-1 px-2 mb-2 shadow-xl">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
            <div className="pt-2 px-2">
              <Link to="/upload" onClick={() => setIsOpen(false)}>
                <Button className="w-full medical-gradient font-bold h-12">
                  Start MRI Analysis Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
