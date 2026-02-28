import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Étudiants accompagnés" },
  { value: "50+", label: "Universités partenaires" },
  { value: "95%", label: "Taux de satisfaction" },
  { value: "15+", label: "Pays représentés" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-black text-secondary-foreground">{stat.value}</div>
              <div className="mt-2 text-sm md:text-base text-secondary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
