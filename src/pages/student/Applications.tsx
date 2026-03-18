import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, GraduationCap, MapPin, Calendar, ChevronRight, Lock, Rocket, Star, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionnaireModal } from "@/components/student/QuestionnaireModal";
import { Clock } from "lucide-react";

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
    program: "Master in Computer Science",
    city: "Beijing",
    status: "under_review",
    progress: 60,
    date: "Jan 10, 2026",
    statusHistory: [
      { status: "Draft created", date: "Jan 5, 2026" },
      { status: "Submitted", date: "Jan 10, 2026" },
      { status: "Under review", date: "Jan 15, 2026" },
    ],
  },
  {
    id: "2",
    university: "Zhejiang University",
    program: "Bachelor in Medicine",
    city: "Hangzhou",
    status: "draft",
    progress: 30,
    date: "Jan 22, 2026",
    statusHistory: [
      { status: "Draft created", date: "Jan 22, 2026" },
    ],
  },
];

const statusConfig: Record<AppStatus, { label: string; color: string }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700" },
  under_review: { label: "Under Review", color: "bg-amber-100 text-amber-700" },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
};

export default function Applications() {
  const navigate = useNavigate();
  const { user, submitQuestionnaire } = useAuth();
  const isSubscribed = user?.subscription_status !== 'none';
  const hasSubmitted = user?.questionnaire_submitted || false;
  const matchingStatus = user?.matching_status || 'none';
  const [apps] = useState(mockApps);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  return (
    <div className="relative min-h-[60vh]">
      <QuestionnaireModal 
        isOpen={!hasSubmitted} 
        onClose={() => navigate('/student/dashboard')}
        onSubmit={(data) => submitQuestionnaire(data)}
      />

      <div className={`space-y-6 max-w-4xl transition-all duration-500 ${(!isSubscribed || !hasSubmitted || matchingStatus === 'pending') ? 'blur-md grayscale opacity-40 pointer-events-none select-none scale-[0.98]' : ''}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
            <p className="text-muted-foreground mt-1">{apps.length} active application(s)</p>
          </div>
          <Link to="/student/applications/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> New application
            </Button>
          </Link>
        </motion.div>

        <div className="space-y-4">
          {apps.map((app, i) => {
            const config = statusConfig[app.status];

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => navigate(`/student/applications/${app.id}`)}
                >
                  <CardContent className="py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
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
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-1.5" />
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {hasSubmitted && matchingStatus === 'pending' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/20 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl flex flex-col items-center justify-center py-10 md:py-16 px-6 md:px-8 text-center bg-white/80 backdrop-blur-2xl border border-primary/10 rounded-[32px] md:rounded-[40px] shadow-2xl shadow-primary/10"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[28px] bg-primary/10 flex items-center justify-center mb-6 animate-pulse border border-primary/20">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground uppercase">Profile Under Review</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto font-medium text-sm md:text-base leading-relaxed">
              Our team is currently analyzing your profile. This module will be fully accessible once your personalized university matching is ready.
            </p>
            <Button 
                variant="secondary" 
                className="mt-6 md:mt-8 font-black uppercase tracking-widest text-[10px] md:text-xs h-10 md:h-12 px-6 md:px-8 rounded-xl shadow-lg border-border/50"
                onClick={() => navigate('/student/dashboard')}
            >
              Return to Dashboard
            </Button>
          </motion.div>
        </div>
      )}

      {hasSubmitted && matchingStatus !== 'pending' && !isSubscribed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/20 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-2xl">
              <div className="bg-gradient-yinga h-3 w-full" />
              <CardHeader className="text-center pt-8 pb-4">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary/5">
                  <Lock className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl font-black tracking-tighter text-foreground uppercase">Access Restricted</CardTitle>
                <CardDescription className="text-base font-medium mt-2 leading-relaxed px-4 text-muted-foreground">
                  The application module is reserved for students with an active service plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="space-y-3 bg-muted/40 p-5 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Rocket className="w-3 h-3 text-green-600" />
                    </div>
                    100+ Top Chinese Universities
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Star className="w-3 h-3 text-green-600" />
                    </div>
                    Personalized Matching Analysis
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full h-12 md:h-14 bg-primary hover:bg-primary/90 text-sm md:text-lg font-black tracking-tight gap-2 shadow-xl shadow-primary/20 rounded-2xl uppercase"
                    onClick={() => navigate('/student/settings?tab=subscription')}
                  >
                    Choose My Plan <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full h-10 md:h-12 font-black text-muted-foreground hover:text-foreground rounded-xl uppercase text-[10px] md:text-xs tracking-widest"
                    onClick={() => navigate('/student/dashboard')}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
