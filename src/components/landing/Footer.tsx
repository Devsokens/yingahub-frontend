import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Logo imageClassName="h-20 md:h-24" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              Yinga Hub est la solution de référence pour les étudiants africains souhaitant poursuivre leurs études supérieures en Chine.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-background/5 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/5 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/5 text-secondary-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6">Plateforme</h4>
            <ul className="space-y-4">
              <li><Link to="/onboarding" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">S'inscrire</Link></li>
              <li><Link to="/login" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Se connecter</Link></li>
              <li><a href="#features" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Nos Solutions</a></li>
              <li><a href="#how-it-works" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Votre Parcours</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6">Légal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-secondary-foreground/70 hover:text-primary text-sm transition-colors">CGU</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-secondary-foreground font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                contact@yingahub.com
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +237 600 000 000
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Douala, Cameroun
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/40">
            © 2026 Yinga Hub. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-xs text-secondary-foreground/40">
            <span>Propulsé par SOKENS DIGITAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
