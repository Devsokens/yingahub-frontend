import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      {/* Warm gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl translate-x-1/3" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-accent text-accent-foreground text-sm font-medium border border-primary/10"
        >
          <Zap className="w-3.5 h-3.5" />
          Première plateforme africaine d'orientation vers la Chine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight max-w-4xl mx-auto"
        >
          Votre avenir en Chine{" "}
          <br />
          commence ici.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Yinga Hub utilise l'intelligence artificielle pour vous orienter vers les meilleures
          universités chinoises, gérer votre dossier et accompagner votre candidature de A à Z.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/onboarding">
            <Button variant="hero" size="lg" className="text-base px-8 gap-2">
              Commencer gratuitement <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="heroOutline" size="lg" className="text-base px-8">
              Découvrir le processus
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
