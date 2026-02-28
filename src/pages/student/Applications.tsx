import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, GraduationCap, MapPin, Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type AppStatus = "draft" | "submitted" | "under_review" | "accepted" | "rejected";

interface Application {
  id: string;
  university: string;
  program: string;
  city: string;
  status: AppStatus;
  progress: number;
  date: string;
  statusHistory: { status: string; date: string }[];
}

const mockApps: Application[] = [
  {
    id: "1",
    university: "Tsinghua University",
    program: "Master en Informatique",
    city: "Beijing",
    status: "under_review",
    progress: 60,
    date: "10 Jan 2026",
    statusHistory: [
      { status: "Brouillon créé", date: "5 Jan 2026" },
      { status: "Soumise", date: "10 Jan 2026" },
      { status: "En cours de révision", date: "15 Jan 2026" },
    ],
  },
  {
    id: "2",
    university: "Zhejiang University",
    program: "Licence en Médecine",
    city: "Hangzhou",
    status: "draft",
    progress: 30,
    date: "22 Jan 2026",
    statusHistory: [
      { status: "Brouillon créé", date: "22 Jan 2026" },
    ],
  },
];

const statusConfig: Record<AppStatus, { label: string; color: string }> = {
  draft: { label: "Brouillon", color: "bg-muted text-muted-foreground" },
  submitted: { label: "Soumise", color: "bg-blue-100 text-blue-700" },
  under_review: { label: "En révision", color: "bg-amber-100 text-amber-700" },
  accepted: { label: "Acceptée", color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejetée", color: "bg-red-100 text-red-700" },
};

export default function Applications() {
  const [apps] = useState(mockApps);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes Candidatures</h1>
          <p className="text-muted-foreground mt-1">{apps.length} candidature(s) en cours</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Nouvelle candidature
        </Button>
      </motion.div>

      <div className="space-y-4">
        {apps.map((app, i) => {
          const config = statusConfig[app.status];
          const isExpanded = selectedApp === app.id;

          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedApp(isExpanded ? null : app.id)}>
                <CardContent className="py-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground">{app.university}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{app.program}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.city}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {app.date}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium text-foreground">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-1.5" />
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <p className="text-sm font-medium text-foreground mb-3">Historique des statuts</p>
                      <div className="space-y-3">
                        {app.statusHistory.map((h, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-sm text-foreground">{h.status}</span>
                              <span className="text-xs text-muted-foreground">{h.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
