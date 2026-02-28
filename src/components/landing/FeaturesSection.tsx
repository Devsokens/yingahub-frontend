import { Brain, GraduationCap, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Test IA d'orientation",
    description: "Questionnaire psychologique intelligent pour découvrir votre profil et vos forces.",
  },
  {
    icon: GraduationCap,
    title: "50+ universités partenaires",
    description: "Accédez aux meilleures universités chinoises avec des taux d'acceptation élevés.",
  },
  {
    icon: FileText,
    title: "Gestion complète du dossier",
    description: "Upload, suivi et validation de tous vos documents en un seul endroit.",
  },
  {
    icon: Users,
    title: "Accompagnement personnalisé",
    description: "Notre équipe vous guide à chaque étape de votre parcours vers la Chine.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tout ce qu'il vous faut, en un seul endroit
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Une plateforme complète pour simplifier votre parcours vers les universités chinoises.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
