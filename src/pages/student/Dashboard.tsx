import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, GraduationCap, Brain, CheckCircle2, Clock, AlertCircle, ArrowRight, Search, MessageSquare, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuth } from "@/contexts/AuthContext";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const stats = [
  { label: "Documents", value: "3/6", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Applications", value: "1", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "AI Test", value: "Completed", icon: Brain, color: "text-primary", bg: "bg-primary/10" },
];

const recentActivity = [
  { text: "Passport validated by the team", time: "2h ago", icon: CheckCircle2, color: "text-green-500" },
  { text: "Application under review", time: "5h ago", icon: Clock, color: "text-amber-500" },
  { text: "Transcript missing", time: "1d ago", icon: AlertCircle, color: "text-orange-500" },
];

const quickActions = [
  { label: "Browse Universities", href: "/student/catalogue", icon: Search },
  { label: "Submit New Application", href: "/student/applications/new", icon: GraduationCap },
  { label: "View Messages", href: "/student/messages", icon: MessageSquare },
];

export default function Dashboard() {
  const { user } = useAuth();
  const isSubscribed = user?.subscription_status !== 'none';
  const isProfileComplete = user?.profile_completed;

  return (
    <div className="space-y-6 max-w-6xl pb-10">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div {...fadeIn(0)}>
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Welcome, {user?.full_name || 'Student'} 👋</h1>
          <p className="text-muted-foreground mt-1 font-medium text-base">Here is an overview of your application journey.</p>
        </motion.div>

        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 max-w-sm"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Mission: Discovery</p>
              <p className="text-xs text-muted-foreground mt-0.5">Choose a service plan to unlock the catalogue.</p>
            </div>
            <Link to="/student/settings">
              <Button size="sm" className="h-8 font-bold px-3">
                Unlock <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {!isProfileComplete && (
        <motion.div {...fadeIn(0.05)}>
          <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <GraduationCap className="w-24 h-24" />
            </div>
            <CardContent className="p-6 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-primary" />
                    Complete Your Profile
                  </h3>
                  <p className="text-muted-foreground font-medium max-w-xl">
                    To provide the best university matches, we need a few more details about your academic background and preferences.
                  </p>
                </div>
                <Link to="/student/settings">
                  <Button size="lg" className="h-12 px-8 font-black gap-2 shadow-lg shadow-primary/20">
                    Finish Profile <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}


      {/* Progress */}
      <motion.div {...fadeIn(0.1)}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Application Progress</span>
              <span className="text-sm font-bold text-primary">65%</span>
            </div>
            <Progress value={65} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-2">Complete your profile and documents to move forward.</p>
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
              <CardTitle className="text-lg">Recent Activity</CardTitle>
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
              <CardTitle className="text-lg">Quick Actions</CardTitle>
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
