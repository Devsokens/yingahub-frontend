import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero_bg.png')" }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2340]/85 via-[#1E3A5F]/75 to-[#0F2340]/80" />
      {/* Orange accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 text-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] max-w-5xl mx-auto tracking-tight"
        >
          More Than Access.{" "}
          <span className="text-gradient-yinga">The Right Match.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 text-xl md:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Simplify your university enrollment in China. We guide you step by step, from orientation to final admission.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link to="/onboarding">
            <Button size="lg" className="bg-gradient-yinga text-white border-none shadow-2xl shadow-primary/30 hover:scale-105 transition-transform text-lg px-10 gap-3 group">
              Start My Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Button variant="outline" size="lg" className="text-lg px-10 border-2 border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
              See How It Works
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 0 960 80 720 40C480 0 240 80 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
