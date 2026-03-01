import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, GraduationCap, Brain, CheckCircle2, Clock, AlertCircle, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const childStats = [
  { label: "Progression dossier", value: "65%", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Candidatures", value: "1 active", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Test IA", value: "Complété", icon: Brain, color: "text-primary", bg: "bg-primary/10" },
  { label: "Profil financier", value: "À compléter", icon: Wallet, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const childActivity = [
  { text: "Passeport validé par l'équipe", time: "Il y a 2h", icon: CheckCircle2, color: "text-green-500" },
  { text: "Candidature soumise - Tsinghua University", time: "Il y a 1j", icon: Clock, color: "text-amber-500" },
  { text: "Relevé de notes en attente de validation", time: "Il y a 2j", icon: AlertCircle, color: "text-orange-500" },
];

export default function ParentDashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bonjour, Marie 👋</h1>
        <p className="text-muted-foreground mt-1">Suivez le parcours de votre enfant Jean vers la Chine.</p>
      </motion.div>

      {/* Child info card */}
      <motion.div {...fadeIn(0.1)}>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                JD
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">Jean Dupont</h2>
                <p className="text-sm text-muted-foreground">Licence en Informatique · Cameroun</p>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">En cours</Badge>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progression globale</span>
                <span className="text-sm font-bold text-primary">65%</span>
              </div>
              <Progress value={65} className="h-2.5" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {childStats.map((s, i) => (
          <motion.div key={s.label} {...fadeIn(0.15 + i * 0.05)}>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <motion.div {...fadeIn(0.35)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité récente de Jean</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {childActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <a.icon className={`w-5 h-5 mt-0.5 shrink-0 ${a.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div {...fadeIn(0.4)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/parent/financial">
                <Button variant="outline" className="w-full justify-between h-12 text-left">
                  <span className="flex items-center gap-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    Compléter le profil financier
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </Link>
              <Link to="/parent/child-tracking">
                <Button variant="outline" className="w-full justify-between h-12 text-left mt-3">
                  <span className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-primary" />
                    Voir le profil IA de Jean
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </Link>
              <Link to="/parent/documents">
                <Button variant="outline" className="w-full justify-between h-12 text-left mt-3">
                  <span className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    Voir les documents
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
