import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, GraduationCap, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const kpis = [
  { label: "Étudiants inscrits", value: "247", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Candidatures actives", value: "89", change: "+8%", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Documents en attente", value: "34", change: "-5%", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Revenu mensuel", value: "4.2M", change: "+15%", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
];

const conversionData = [
  { name: "Inscrits", value: 247 },
  { name: "Onboarding", value: 198 },
  { name: "Test IA", value: 156 },
  { name: "Documents", value: 120 },
  { name: "Candidature", value: 89 },
  { name: "Acceptés", value: 42 },
];

const geoData = [
  { name: "Cameroun", value: 85 },
  { name: "Sénégal", value: 45 },
  { name: "Côte d'Ivoire", value: 38 },
  { name: "Congo", value: 32 },
  { name: "Gabon", value: 25 },
  { name: "Autres", value: 22 },
];

const COLORS = ["hsl(0, 72%, 51%)", "hsl(220, 30%, 15%)", "hsl(25, 95%, 55%)", "hsl(200, 70%, 50%)", "hsl(150, 60%, 45%)", "hsl(280, 50%, 55%)"];

const urgentAlerts = [
  { text: "12 documents en attente depuis +48h", icon: AlertCircle, color: "text-destructive" },
  { text: "3 candidatures nécessitent une validation", icon: Clock, color: "text-amber-500" },
  { text: "5 nouveaux messages non lus", icon: AlertCircle, color: "text-blue-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de la plateforme Yinga Hub.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} {...fadeIn(0.1 + i * 0.05)}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <TrendingUp className="w-3 h-3 mr-1" />{kpi.change}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion funnel */}
        <motion.div {...fadeIn(0.3)} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Entonnoir de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis type="number" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(0, 72%, 51%)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div {...fadeIn(0.35)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alertes urgentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {urgentAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <alert.icon className={`w-5 h-5 mt-0.5 shrink-0 ${alert.color}`} />
                  <p className="text-sm text-foreground">{alert.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Geography */}
      <motion.div {...fadeIn(0.4)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Répartition géographique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={250} className="max-w-xs">
                <PieChart>
                  <Pie data={geoData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {geoData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 grid grid-cols-2 gap-3">
                {geoData.map((g, i) => (
                  <div key={g.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm text-foreground">{g.name}</span>
                    <span className="text-sm font-bold text-foreground ml-auto">{g.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
