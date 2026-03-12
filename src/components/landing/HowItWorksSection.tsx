import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Créez votre profil",
    description: "Inscrivez-vous et complétez votre profil académique en quelques minutes.",
  },
  {
    num: "02",
    title: "Orientation Personnalisée",
    description: "Nous analysons votre profil pour vous recommander les meilleures options universitaires.",
  },
  {
    num: "03",
    title: "Dossier & Validation",
    description: "Uploadez vos documents et bénéficiez d'une vérification experte en temps réel.",
  },
  {
    num: "04",
    title: "Admission & Départ",
    description: "Candidatez aux universités sélectionnées et préparez sereinement votre envol.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
          >
            Votre parcours vers la <span className="text-primary">réussite</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-muted-foreground text-xl max-w-2xl mx-auto font-medium"
          >
            4 étapes simples pour transformer votre ambition en réalité.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-primary/10 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:border-primary transition-colors duration-500">
                <span className="text-3xl font-black text-primary">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
