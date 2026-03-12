import { Search, GraduationCap, FileText, Users, MapPin, BadgeCheck, Globe, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Orientation Stratégique",
    description: "Analyse approfondie de votre profil pour identifier les programmes les plus adaptés à vos ambitions.",
  },
  {
    icon: GraduationCap,
    title: "Universités d'Élite",
    description: "Accès privilégié aux meilleures institutions chinoises avec des taux d'acceptation optimisés.",
  },
  {
    icon: FileText,
    title: "Dossier Numérique 100%",
    description: "Gestion centralisée et sécurisée de tous vos documents administratifs et académiques.",
  },
  {
    icon: Users,
    title: "Accompagnement Expert",
    description: "Une équipe dédiée pour vous guider pas à pas, de l'inscription à l'obtention de votre visa.",
  },
];

const cards = [
  { icon: MapPin, text: "Villes de Rêve", desc: "Shanghai, Beijing, Hangzhou..." },
  { icon: BadgeCheck, text: "Admission Garantie", desc: "Accompagnement certifié" },
  { icon: Globe, text: "Réseau Mondial", desc: "Étudiants de 20+ pays" },
  { icon: Star, text: "Bourses d'Études", desc: "Aide au financement" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
          >
            Pourquoi choisir <span className="text-primary">Yinga Hub ?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-muted-foreground text-xl max-w-2xl mx-auto font-medium"
          >
            L'expertise au service de votre réussite académique internationale.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform" />
              
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{f.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Auto-scrolling cards slider */}
        <div className="relative mt-20">
          <div className="flex overflow-hidden space-x-8 py-10">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex space-x-8 whitespace-nowrap"
            >
              {[...cards, ...cards, ...cards].map((card, i) => (
                <div 
                  key={i} 
                  className="inline-flex items-center gap-4 bg-secondary/50 backdrop-blur-md border border-border/50 px-8 py-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-foreground">{card.text}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
