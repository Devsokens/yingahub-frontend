import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Créez votre profil",
    description: "Inscrivez-vous et complétez votre profil académique en quelques minutes.",
  },
  {
    num: "02",
    title: "Passez le test IA",
    description: "Notre intelligence artificielle analyse votre profil et vous recommande les meilleures options.",
  },
  {
    num: "03",
    title: "Préparez votre dossier",
    description: "Uploadez vos documents et suivez leur validation en temps réel.",
  },
  {
    num: "04",
    title: "Postulez et partez !",
    description: "Candidatez aux universités recommandées et préparez votre départ.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Comment ça marche ?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            4 étapes simples pour réaliser votre rêve d'études en Chine.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-black text-primary/20 mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
