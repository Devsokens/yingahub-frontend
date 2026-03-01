import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const monthlySignups = [
  { month: "Sep", value: 18 }, { month: "Oct", value: 32 }, { month: "Nov", value: 45 },
  { month: "Déc", value: 38 }, { month: "Jan", value: 56 }, { month: "Fév", value: 72 },
];

const revenueData = [
  { month: "Sep", value: 1.2 }, { month: "Oct", value: 1.8 }, { month: "Nov", value: 2.5 },
  { month: "Déc", value: 2.1 }, { month: "Jan", value: 3.4 }, { month: "Fév", value: 4.2 },
];

const conversionRates = [
  { stage: "Inscription → Onboarding", rate: 80 },
  { stage: "Onboarding → Test IA", rate: 79 },
  { stage: "Test IA → Documents", rate: 77 },
  { stage: "Documents → Candidature", rate: 74 },
  { stage: "Candidature → Acceptation", rate: 47 },
];

const topCountries = [
  { country: "Cameroun", students: 85, revenue: "1.8M" },
  { country: "Sénégal", students: 45, revenue: "1.1M" },
  { country: "Côte d'Ivoire", students: 38, revenue: "0.9M" },
  { country: "Congo", students: 32, revenue: "0.7M" },
  { country: "Gabon", students: 25, revenue: "0.6M" },
];

export default function AdminStats() {
  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Statistiques
        </h1>
        <p className="text-muted-foreground mt-1">Analyse détaillée des performances de la plateforme.</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Taux de conversion", value: "47%", icon: TrendingUp, color: "text-green-500" },
          { label: "Utilisateurs actifs", value: "189", icon: Users, color: "text-blue-500" },
          { label: "Revenu total", value: "14.2M", icon: DollarSign, color: "text-primary" },
          { label: "Moy. par étudiant", value: "168K", icon: DollarSign, color: "text-amber-500" },
        ].map((s, i) => (
          <motion.div key={s.label} {...fadeIn(0.1 + i * 0.05)}>
            <Card>
              <CardContent className="pt-6 text-center">
                <s.icon className={`w-8 h-8 mx-auto ${s.color}`} />
                <p className="text-2xl font-bold text-foreground mt-2">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly signups */}
        <motion.div {...fadeIn(0.3)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Inscriptions mensuelles</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlySignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue */}
        <motion.div {...fadeIn(0.35)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Revenu mensuel (M FCFA)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion rates */}
        <motion.div {...fadeIn(0.4)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Taux de conversion par étape</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {conversionRates.map((c) => (
                <div key={c.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{c.stage}</span>
                    <span className="text-sm font-bold text-foreground">{c.rate}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.rate}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top countries */}
        <motion.div {...fadeIn(0.45)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Top pays</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">Pays</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Étudiants</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Revenu</th>
                  </tr>
                </thead>
                <tbody>
                  {topCountries.map((c) => (
                    <tr key={c.country} className="border-b border-border/50">
                      <td className="py-2.5 font-medium text-foreground">{c.country}</td>
                      <td className="py-2.5 text-right text-foreground">{c.students}</td>
                      <td className="py-2.5 text-right text-primary font-medium">{c.revenue} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
