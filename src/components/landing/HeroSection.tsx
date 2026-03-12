import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,29,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_50%)]" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-6 py-2 mb-8 bg-primary/5 text-primary text-sm font-bold border border-primary/10 backdrop-blur-sm"
        >
          <Globe className="w-4 h-4 animate-pulse" />
          Votre passerelle vers les meilleures universités de Chine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] max-w-5xl mx-auto tracking-tight"
        >
          L'excellence chinoise à votre{" "}
          <span className="text-gradient-yinga">portée.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Simplifiez votre inscription universitaire en Chine. Nous vous accompagnons pas à pas, de l'orientation à l'admission finale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex flex-col sm:row gap-6 justify-center"
        >
          <Link to="/onboarding">
            <Button size="xl" className="bg-gradient-yinga text-white border-none shadow-xl shadow-primary/20 hover:scale-105 transition-transform text-lg px-10 gap-3 group">
              Démarrer mon projet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="xl" className="text-lg px-10 border-2 hover:bg-secondary/5 transition-colors">
              Découvrir le parcours
            </Button>
          </a>
        </motion.div>

        {/* Floating cards decoration */}
        <div className="hidden lg:block">
           <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-12 p-4 bg-white rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm"
           >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
               <div className="text-left">
                 <p className="text-xs font-bold text-muted-foreground">Admission</p>
                 <p className="text-sm font-black">100% Garantie</p>
               </div>
             </div>
           </motion.div>

           <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -right-12 p-4 bg-white rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm"
           >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">★</div>
               <div className="text-left">
                 <p className="text-xs font-bold text-muted-foreground">Bourses</p>
                 <p className="text-sm font-black">Disponibles</p>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
