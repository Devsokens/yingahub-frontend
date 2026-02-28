import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, MapPin, GraduationCap, TrendingUp, AlertTriangle, Star } from "lucide-react";
import { motion } from "framer-motion";

const scores = [
  { dimension: "Autonomie", score: 4.2, max: 5, color: "bg-blue-500" },
  { dimension: "Autorité", score: 3.5, max: 5, color: "bg-purple-500" },
  { dimension: "Tolérance à la solitude", score: 3.8, max: 5, color: "bg-emerald-500" },
  { dimension: "Adaptabilité", score: 4.5, max: 5, color: "bg-amber-500" },
  { dimension: "Gestion du stress", score: 3.2, max: 5, color: "bg-rose-500" },
];

const globalScore = scores.reduce((s, d) => s + d.score, 0);

const universities = [
  { name: "Tsinghua University", city: "Beijing", match: 92, scholarship: true },
  { name: "Zhejiang University", city: "Hangzhou", match: 87, scholarship: true },
  { name: "Fudan University", city: "Shanghai", match: 84, scholarship: false },
  { name: "Wuhan University", city: "Wuhan", match: 79, scholarship: true },
];

const cities = [
  { name: "Beijing", score: 88, reason: "Vie culturelle riche, nombreuses universités" },
  { name: "Shanghai", score: 85, reason: "Cosmopolite, opportunités professionnelles" },
  { name: "Hangzhou", score: 82, reason: "Cadre de vie agréable, coût modéré" },
];

const strengths = [
  "Grande capacité d'adaptation aux nouveaux environnements",
  "Forte autonomie dans le travail et la prise de décision",
  "Bonne tolérance à l'éloignement familial",
];

const improvements = [
  "Renforcer la gestion du stress face aux examens",
  "Développer le leadership en contexte multiculturel",
];

export default function AIProfile() {
  const level = globalScore >= 20 ? "Excellent" : globalScore >= 15 ? "Bon" : "À améliorer";
  const levelColor = globalScore >= 20 ? "text-green-600" : globalScore >= 15 ? "text-amber-600" : "text-red-600";

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mon Profil IA</h1>
            <p className="text-muted-foreground">Résultats de votre test d'orientation psychologique</p>
          </div>
        </div>
      </motion.div>

      {/* Global Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-primary/20">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Score global</p>
            <p className="text-5xl font-black text-foreground">{globalScore.toFixed(1)}<span className="text-xl text-muted-foreground">/25</span></p>
            <p className={`text-lg font-semibold mt-1 ${levelColor}`}>{level}</p>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Votre profil montre une forte adaptabilité et autonomie, ce qui est idéal pour des études en Chine. Quelques axes d'amélioration en gestion du stress.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dimensions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg">Scores par dimension</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {scores.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{s.dimension}</span>
                  <span className="text-muted-foreground">{s.score}/{s.max}</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${s.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.score / s.max) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" /> Points forts</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Improvements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Axes d'amélioration</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {improvements.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* University recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Universités recommandées</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {universities.map((u, i) => (
                <div key={i} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{u.name}</h4>
                    <Badge variant="secondary" className="text-xs">{u.match}% match</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {u.city}
                  </p>
                  {u.scholarship && (
                    <Badge variant="outline" className="text-xs mt-2 text-green-600 border-green-200">
                      Bourse disponible
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* City recommendations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Villes recommandées</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {cities.map((c, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{c.score}</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.reason}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
