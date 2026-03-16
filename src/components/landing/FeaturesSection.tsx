import { Search, GraduationCap, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Strategic Orientation",
    description: "In-depth analysis of your profile to identify the programs best suited to your ambitions and career goals.",
  },
  {
    icon: GraduationCap,
    title: "Elite Universities",
    description: "Privileged access to China's finest institutions with optimized acceptance rates for your profile.",
  },
  {
    icon: FileText,
    title: "100% Digital Application",
    description: "Centralized and secure management of all your administrative and academic documents.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "A dedicated team to guide you every step of the way, from enrollment to obtaining your visa.",
  },
];

// Major Chinese university logos (text-based styled cards)
const universities = [
  { name: "Peking University", abbr: "PKU", color: "#880000" },
  { name: "Tsinghua University", abbr: "THU", color: "#660874" },
  { name: "Fudan University", abbr: "FDU", color: "#003399" },
  { name: "Zhejiang University", abbr: "ZJU", color: "#003087" },
  { name: "Shanghai Jiao Tong", abbr: "SJTU", color: "#8B0000" },
  { name: "Nanjing University", abbr: "NJU", color: "#003366" },
  { name: "Wuhan University", abbr: "WHU", color: "#C8102E" },
  { name: "Sun Yat-sen Univ.", abbr: "SYSU", color: "#006400" },
  { name: "Tongji University", abbr: "TJU", color: "#00539C" },
  { name: "Renmin University", abbr: "RUC", color: "#8B0000" },
  { name: "USTC", abbr: "USTC", color: "#003087" },
  { name: "Xiamen University", abbr: "XMU", color: "#003399" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-bold text-sm uppercase tracking-widest mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
          >
            Why choose <span className="text-gradient-yinga">Yinga Hub?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-muted-foreground text-xl max-w-2xl mx-auto font-medium"
          >
            Expertise at the service of your international academic success.
          </motion.p>
        </div>

        {/* University Logos Carousel - Now as Primary Focus */}
        <div className="relative mt-8">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-12">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 shrink-0"
            >
              {[...universities, ...universities, ...universities].map((uni, i) => (
                <div
                  key={i}
                  className="shrink-0 flex flex-col items-center justify-center gap-4 bg-white border border-border/50 rounded-3xl px-8 py-8 shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 w-56 group"
                >
                  {/* University crest / monogram */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundColor: uni.color,
                      boxShadow: `0 10px 20px -5px ${uni.color}44`
                    }}
                  >
                    {uni.abbr}
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-black text-foreground leading-tight group-hover:text-primary transition-colors">{uni.name}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Top Institution</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Supporting Features (Smaller/Refined) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4 text-primary">
                <f.icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold mb-1">{f.title}</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
