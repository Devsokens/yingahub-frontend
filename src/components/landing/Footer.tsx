import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Logo imageClassName="h-20 md:h-24" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              Yinga Hub is the leading platform for African students seeking higher education in China. More than access — the right match.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 text-secondary-foreground/60 hover:text-primary hover:bg-white/10 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-secondary-foreground/60 hover:text-primary hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 text-secondary-foreground/60 hover:text-primary hover:bg-white/10 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6 uppercase tracking-wider text-sm">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/onboarding" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Sign In</Link></li>
              <li><a href="#features" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Our Solutions</a></li>
              <li><a href="#how-it-works" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Legal Notice</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                contact@yingahub.com
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +241 77 000 000
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Libreville, Gabon
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/40">
            © 2026 Yinga Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-secondary-foreground/40">
            <span>Powered by SOKENS DIGITAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
