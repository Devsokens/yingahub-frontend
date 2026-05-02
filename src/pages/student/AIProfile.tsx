import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, MapPin, GraduationCap, TrendingUp, AlertTriangle, Star, Sparkles, CheckCircle2, ShieldCheck, Target, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const scores = [
  { dimension: "Autonomy", score: 4.2, max: 5, color: "bg-violet-500", icon: Brain },
  { dimension: "Leadership", score: 3.5, max: 5, color: "bg-rose-500", icon: Target },
  { dimension: "Independence", score: 3.8, max: 5, color: "bg-emerald-500", icon: ShieldCheck },
  { dimension: "Adaptability", score: 4.5, max: 5, color: "bg-blue-500", icon: Sparkles },
  { dimension: "Stress Management", score: 3.2, max: 5, color: "bg-amber-500", icon: Lightbulb },
];

const globalScore = scores.reduce((s, d) => s + d.score, 0);

const universities = [
  { name: "Tsinghua University", city: "Beijing", match: 92, scholarship: true, category: "Tier 1" },
  { name: "Zhejiang University", city: "Hangzhou", match: 87, scholarship: true, category: "Tier 1" },
  { name: "Fudan University", city: "Shanghai", match: 84, scholarship: false, category: "Tier 1" },
  { name: "Wuhan University", city: "Wuhan", match: 79, scholarship: true, category: "Tier 2" },
];

const cities = [
  { name: "Beijing", score: 88, reason: "Academic hub with rich cultural heritage." },
  { name: "Shanghai", score: 85, reason: "Dynamic international environment & networking." },
  { name: "Hangzhou", score: 82, reason: "Innovation center with high quality of life." },
];

const strengths = [
  "Exceptional ability to navigate unfamiliar cultural contexts.",
  "High self-motivation and autonomous problem-solving skills.",
  "Strong emotional resilience when separated from primary support networks.",
];

const improvements = [
  "Cognitive reframing techniques for high-pressure academic scenarios.",
  "Proactive engagement in collaborative leadership opportunities.",
];

export default function AIProfile() {
  const navigate = useNavigate();
  const level = globalScore >= 20 ? "Exceptional" : globalScore >= 15 ? "High Potential" : "Developing";
  const levelColor = globalScore >= 20 ? "text-violet-600" : globalScore >= 15 ? "text-blue-600" : "text-amber-600";

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-xl shadow-primary/20">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground">AI Academic Profile</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-primary/10 text-primary border-none font-black uppercase tracking-widest text-[10px]">Verified Analysis</Badge>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Last updated: May 2, 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-border/50">Export Report</Button>
          <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/20">Share Profile <Sparkles className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Global Insights */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Brain className="w-32 h-32 rotate-12 translate-x-8 -translate-y-8" />
              </div>
              <CardContent className="pt-10 pb-10 text-center relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 mb-4">Compatibility Index</p>
                <div className="relative inline-block">
                  <p className="text-7xl font-black tracking-tighter mb-2">{globalScore.toFixed(1)}</p>
                  <span className="absolute top-0 -right-8 text-xl font-bold opacity-40">/25</span>
                </div>
                <div className={`text-lg font-black uppercase tracking-widest mt-2 ${levelColor}`}>{level}</div>
                <div className="h-1.5 w-32 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(globalScore/25)*100}%` }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary" 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card className="border-border/50 shadow-soft rounded-[32px]">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Core Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{s}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/50 shadow-soft rounded-[32px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-tight">Psychological Mapping</CardTitle>
                <CardDescription className="font-medium">Multi-dimensional analysis of study-abroad readiness.</CardDescription>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-violet-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              {scores.map((s, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${s.color}/10 flex items-center justify-center`}>
                        <s.icon className={`w-5 h-5 ${s.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-foreground">{s.dimension}</p>
                        <p className="text-[10px] text-muted-foreground font-bold">Evaluation based on Orientation Test</p>
                      </div>
                    </div>
                    <span className="text-xl font-black text-foreground">{s.score}<span className="text-xs text-muted-foreground ml-1">/ {s.max}</span></span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
                    <motion.div
                      className={`h-full rounded-full ${s.color} shadow-sm shadow-black/10`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.score / s.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border/50 shadow-soft rounded-[32px]">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> University Matches
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {universities.map((u, i) => (
                  <div key={i} className="group p-4 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-foreground truncate max-w-[150px]">{u.name}</h4>
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-black text-primary">{u.match}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold">
                        <MapPin className="w-2.5 h-2.5" /> {u.city}
                      </p>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-border/50">
                        {u.category}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full mt-2 font-black uppercase tracking-widest text-[10px] gap-2 rounded-xl" onClick={() => navigate('/student/catalogue')}>
                  View Full Match List <ArrowRight className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-soft rounded-[32px]">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Strategic Cities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cities.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-border/50">
                      <span className="text-lg font-black text-primary">{c.score}</span>
                    </div>
                    <div>
                      <p className="font-black text-xs text-foreground uppercase tracking-tight">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">{c.reason}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

