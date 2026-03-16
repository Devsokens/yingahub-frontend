import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    description: "Sign up and complete your academic profile in just a few minutes.",
  },
  {
    num: "02",
    title: "Personalized Orientation",
    description: "We analyze your profile to recommend the best university options matching your goals.",
  },
  {
    num: "03",
    title: "File & Validation",
    description: "Upload your documents and benefit from expert real-time verification.",
  },
  {
    num: "04",
    title: "Admission & Departure",
    description: "Apply to selected universities and serenely prepare for your new adventure.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-4"
          >
            Your Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
          >
            Your path to <span className="text-gradient-yinga">success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-muted-foreground text-xl max-w-2xl mx-auto font-medium"
          >
            4 simple steps to turn your ambition into reality.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-500">
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
