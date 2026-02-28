import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, GraduationCap, Brain, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const stats = [
  { label: "Documents", value: "3/6", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Candidatures", value: "1", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Test IA", value: "Complété", icon: Brain, color: "text-primary", bg: "bg-primary/10" },
];

const recentActivity = [
  { text: "Passeport validé par l'équipe", time: "Il y a 2h", icon: CheckCircle2, color: "text-green-500" },
  { text: "Candidature en cours de révision", time: "Il y a 5h", icon: Clock, color: "text-amber-500" },
  { text: "Relevé de notes en attente", time: "Il y a 1j", icon: AlertCircle, color: "text-orange-500" },
];

const quickActions = [
  { label: "Compléter les documents", href: "/student/documents", icon: FileText },
  { label: "Passer le test IA", href: "/student/ai-test", icon: Brain },
  { label: "Nouvelle candidature", href: "/student/applications", icon: GraduationCap },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome */}
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bienvenue, Jean 👋</h1>
        <p className="text-muted-foreground mt-1">Voici un aperçu de votre dossier d'inscription.</p>
      </motion.div>

      {/* Progress */}
      <motion.div {...fadeIn(0.1)}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Progression du dossier</span>
              <span className="text-sm font-bold text-primary">65%</span>
            </div>
            <Progress value={65} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-2">Complétez votre profil et vos documents pour avancer.</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...fadeIn(0.15 + i * 0.05)}>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <motion.div {...fadeIn(0.3)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((a, i) => (
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
        <motion.div {...fadeIn(0.35)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((a, i) => (
                <Link key={i} to={a.href}>
                  <Button variant="outline" className="w-full justify-between h-12 text-left">
                    <span className="flex items-center gap-3">
                      <a.icon className="w-4 h-4 text-primary" />
                      {a.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
