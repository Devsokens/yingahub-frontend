import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Building2,
  Calendar,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const kpis = [
  { label: "Applications", value: "3", sub: "2 active", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Valid Documents", value: "8/10", sub: "80% complete", icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Active Universities", value: "12", sub: "Matches found", icon: Building2, color: "text-primary", bg: "bg-primary/10" },
  { label: "Messages", value: "5", sub: "2 unread", icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const applicationTrend = [
  { name: "Jan", value: 4 },
  { name: "Feb", value: 7 },
  { name: "Mar", value: 5 },
  { name: "Apr", value: 12 },
];

const documentStatus = [
  { name: "Validated", value: 8, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: 1, color: "hsl(35, 92%, 50%)" },
  { name: "Missing", value: 1, color: "hsl(0, 84%, 60%)" },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Welcome Header */}
      <motion.div {...fadeIn(0)}>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Hello, {user?.full_name?.split(' ')[0] || 'Student'} 👋</h1>
        <p className="text-muted-foreground mt-1 font-medium">Your journey to academic excellence starts here.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} {...fadeIn(0.1 + i * 0.05)}>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter bg-muted/50">
                    Overview
                  </Badge>
                </div>
                <div>
                  <p className="text-3xl font-black text-foreground">{kpi.value}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{kpi.label}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5 font-medium">{kpi.sub}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Application Statistics */}
        <motion.div {...fadeIn(0.3)} className="lg:col-span-8">
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Application Statistics</CardTitle>
                <p className="text-xs text-muted-foreground">Monthly progression of submitted dossiers</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest gap-2">
                <Calendar className="w-4 h-4" /> 2026
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents Status Pie */}
        <motion.div {...fadeIn(0.35)} className="lg:col-span-4">
          <Card className="border-border/50 shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Document Status</CardTitle>
              <p className="text-xs text-muted-foreground">Compliance distribution overview</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center pb-8">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentStatus}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {documentStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {documentStatus.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Actions or Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div {...fadeIn(0.45)}>
          <Card className="border-none bg-primary/5 shadow-none overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Ready for a new step?</h3>
                  <p className="text-sm text-muted-foreground mt-1">Discover the universities most compatible with your profile.</p>
                  <Button className="mt-6 rounded-xl font-bold gap-2">
                    Explore catalogue <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="hidden sm:block opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-24 h-24 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(0.5)}>
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Alerts & Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">Missing academic transcript</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Please upload your transcript from the last semester.</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground font-medium">Updated 2h ago</span>
                <Button variant="link" className="text-xs p-0 h-auto font-black uppercase tracking-widest">View all</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


