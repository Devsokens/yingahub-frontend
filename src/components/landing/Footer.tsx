import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 bg-background border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">Yinga Hub</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2025 Yinga Hub. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
