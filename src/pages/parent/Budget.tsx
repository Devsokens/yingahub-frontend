import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Home, BookOpen, Utensils, Plane } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const budgetCategories = [
  {
    category: "Frais de scolarité",
    icon: BookOpen,
    economy: "1 200 000",
    standard: "2 500 000",
    premium: "5 000 000",
  },
  {
    category: "Logement (annuel)",
    icon: Home,
    economy: "400 000",
    standard: "1 200 000",
    premium: "3 000 000",
  },
  {
    category: "Alimentation (annuel)",
    icon: Utensils,
    economy: "600 000",
    standard: "1 000 000",
    premium: "1 800 000",
  },
  {
    category: "Transport & Visa",
    icon: Plane,
    economy: "800 000",
    standard: "1 000 000",
    premium: "1 500 000",
  },
  {
    category: "Assurance & Divers",
    icon: TrendingUp,
    economy: "200 000",
    standard: "400 000",
    premium: "800 000",
  },
];

const totals = {
  economy: "3 200 000",
  standard: "6 100 000",
  premium: "12 100 000",
};

export default function Budget() {
  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Estimation budgétaire
        </h1>
        <p className="text-muted-foreground mt-1">
          Budget annuel estimé pour les études de Jean en Chine (en FCFA).
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Économique", value: totals.economy, variant: "outline" as const },
          { label: "Standard", value: totals.standard, variant: "outline" as const },
          { label: "Premium", value: totals.premium, variant: "outline" as const },
        ].map((plan, i) => (
          <motion.div key={plan.label} {...fadeIn(0.1 + i * 0.05)}>
            <Card className={i === 1 ? "border-primary/30 bg-primary/5" : ""}>
              <CardContent className="pt-6 text-center">
                <Badge variant={i === 1 ? "default" : "outline"} className="mb-2">
                  {plan.label}
                </Badge>
                <p className="text-2xl font-bold text-foreground">{plan.value}</p>
                <p className="text-xs text-muted-foreground">FCFA / an</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed breakdown */}
      <motion.div {...fadeIn(0.25)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détail par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Catégorie</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Économique</th>
                    <th className="text-right py-3 px-2 font-medium text-primary">Standard</th>
                    <th className="text-right py-3 px-2 font-medium text-muted-foreground">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetCategories.map((item) => (
                    <tr key={item.category} className="border-b border-border/50">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{item.category}</span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-2 text-muted-foreground">{item.economy}</td>
                      <td className="text-right py-3 px-2 font-medium text-foreground">{item.standard}</td>
                      <td className="text-right py-3 px-2 text-muted-foreground">{item.premium}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="py-3 px-2 text-foreground">Total annuel</td>
                    <td className="text-right py-3 px-2 text-muted-foreground">{totals.economy}</td>
                    <td className="text-right py-3 px-2 text-primary">{totals.standard}</td>
                    <td className="text-right py-3 px-2 text-muted-foreground">{totals.premium}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeIn(0.35)}>
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <p className="text-sm text-foreground">
              <strong>💡 Conseil :</strong> En fonction de votre profil financier, nous recommandons le plan 
              <strong className="text-primary"> Standard</strong>. Des bourses CSC (Chinese Government Scholarship) 
              peuvent couvrir jusqu'à 100% des frais de scolarité et du logement.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
