import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, FileText, GraduationCap, Star, TrendingUp, Shield, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const aiScores = [
  { label: "Autonomie", score: 18, max: 25, icon: Zap, color: "text-blue-500" },
  { label: "Adaptabilité", score: 21, max: 25, icon: TrendingUp, color: "text-green-500" },
  { label: "Gestion du stress", score: 15, max: 25, icon: Shield, color: "text-amber-500" },
  { label: "Sociabilité", score: 20, max: 25, icon: Users, color: "text-purple-500" },
  { label: "Leadership", score: 17, max: 25, icon: Star, color: "text-primary" },
];

const documents = [
  { name: "Passeport", status: "validated", date: "15 Jan 2026" },
  { name: "Relevé de notes", status: "pending", date: "18 Jan 2026" },
  { name: "Diplôme Baccalauréat", status: "validated", date: "10 Jan 2026" },
  { name: "Photo d'identité", status: "validated", date: "10 Jan 2026" },
  { name: "Lettre de motivation", status: "missing", date: "-" },
  { name: "Certificat médical", status: "missing", date: "-" },
];

const applications = [
  { university: "Tsinghua University", program: "Computer Science", status: "submitted", city: "Beijing" },
  { university: "Zhejiang University", program: "Software Engineering", status: "draft", city: "Hangzhou" },
];

const statusColors: Record<string, string> = {
  validated: "bg-green-500/10 text-green-600 border-green-200",
  pending: "bg-amber-500/10 text-amber-600 border-amber-200",
  missing: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  submitted: "bg-blue-500/10 text-blue-600 border-blue-200",
  draft: "bg-muted text-muted-foreground border-border",
  accepted: "bg-green-500/10 text-green-600 border-green-200",
};

const statusLabels: Record<string, string> = {
  validated: "Validé", pending: "En attente", missing: "Manquant",
  rejected: "Rejeté", submitted: "Soumise", draft: "Brouillon", accepted: "Acceptée",
};

export default function ChildTracking() {
  return (
    <div className="space-y-6 max-w-6xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl font-bold text-foreground">Suivi de Jean Dupont</h1>
        <p className="text-muted-foreground mt-1">Profil IA, documents et candidatures de votre enfant.</p>
      </motion.div>

      <Tabs defaultValue="ai-profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-profile" className="flex items-center gap-2">
            <Brain className="w-4 h-4" /> Profil IA
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" /> Documents
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Candidatures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-profile" className="space-y-6">
          <motion.div {...fadeIn(0.1)}>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Score global : 91/125
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Jean présente un excellent profil d'adaptabilité avec de bonnes capacités sociales.
                  Il est recommandé pour les grandes villes avec un environnement international.
                </p>
                <div className="space-y-4">
                  {aiScores.map((s) => (
                    <div key={s.label} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <s.icon className={`w-4 h-4 ${s.color}`} />
                          {s.label}
                        </span>
                        <span className="text-sm font-bold text-foreground">{s.score}/{s.max}</span>
                      </div>
                      <Progress value={(s.score / s.max) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div {...fadeIn(0.2)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Universités recommandées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Tsinghua University – Beijing", "Zhejiang University – Hangzhou", "Fudan University – Shanghai"].map((u) => (
                  <div key={u} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <Star className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-foreground">{u}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {documents.map((doc, i) => (
            <motion.div key={doc.name} {...fadeIn(i * 0.05)}>
              <Card>
                <CardContent className="pt-4 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={statusColors[doc.status]}>
                    {statusLabels[doc.status]}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {applications.map((app, i) => (
            <motion.div key={app.university} {...fadeIn(i * 0.05)}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{app.university}</h3>
                      <p className="text-sm text-muted-foreground">{app.program} · {app.city}</p>
                    </div>
                    <Badge variant="outline" className={statusColors[app.status]}>
                      {statusLabels[app.status]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
