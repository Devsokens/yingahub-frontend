import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "Admission Rate" },
  { value: "50+", label: "Academic Partners" },
  { value: "24/7", label: "Student Support" },
  { value: "15+", label: "Chinese Cities" },
];

const StatsSection = () => {
  return (
    <section id="stats" className="bg-secondary py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl md:text-6xl font-black text-secondary-foreground mb-4 tabular-nums"
              >
                {stat.value}
              </motion.div>
              <div className="h-1 w-12 bg-primary mx-auto mb-4 group-hover:w-20 transition-all duration-300" />
              <div className="text-xs md:text-sm font-black text-secondary-foreground/60 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
