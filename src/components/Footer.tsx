import { Video, Twitter, Github, Linkedin, Facebook, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden pt-20 pb-10">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description (Col Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Revolutionizing the hiring process with AI-driven insights, collaborative coding environments, and seamless video interviews. Build your dream team faster.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/60">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/60">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/60">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/60">
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-foreground tracking-wide">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>AI Simulator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Pricing Plans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Integrations</a></li>
            </ul>
          </div>

          {/* Resources (Col Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-foreground tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Blog & Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary mr-2 transition-all"></span>Community</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact (Col Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-bold text-foreground tracking-wide">Stay Updated</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to our newsletter for the latest AI interview trends and platform updates.
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-accent/30 border border-border/80 rounded-lg py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button className="bg-primary text-white hover:bg-primary/90 shadow-glow px-4">
                Subscribe
              </Button>
            </div>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>100 AI Boulevard, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TalentForge AI. All rights reserved. Built with premium aesthetics.
          </p>
          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
