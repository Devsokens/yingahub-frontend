import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, GraduationCap, DollarSign, TrendingUp, AlertCircle, Clock, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const kpis = [
  { label: "Enrolled Students", value: "247", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Active Applications", value: "89", change: "+8%", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Pending Documents", value: "34", change: "-5%", icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Monthly Revenue", value: "4.2M", change: "+15%", icon: DollarSign, color: "text-primary", bg: "bg-primary/10" },
];



const monthlySignups = [
  { month: "Sep", value: 18 }, { month: "Oct", value: 32 }, { month: "Nov", value: 45 },
  { month: "Dec", value: 38 }, { month: "Jan", value: 56 }, { month: "Feb", value: 72 },
];

const revenueData = [
  { month: "Sep", value: 1.2 }, { month: "Oct", value: 1.8 }, { month: "Nov", value: 2.5 },
  { month: "Dec", value: 2.1 }, { month: "Jan", value: 3.4 }, { month: "Feb", value: 4.2 },
];



const urgentAlerts = [
  { text: "12 pending documents for +48h", icon: AlertCircle, color: "text-destructive" },
  { text: "3 applications require validation", icon: Clock, color: "text-amber-500" },
  { text: "5 new unread messages", icon: AlertCircle, color: "text-blue-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div {...fadeIn(0)}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of the Yinga Hub platform.</p>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeIn(0.25)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Monthly Signups</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlySignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(22, 83%, 51%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(0.3)}>
          <Card>
            <CardHeader><CardTitle className="text-lg">Monthly Revenue (M FCFA)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 46%)", fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="hsl(22, 83%, 51%)" fill="hsl(22, 83%, 51%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Area - Urgent Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div {...fadeIn(0.55)} className="md:col-span-1">
          <Card className="border-destructive/20 shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Urgent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              {urgentAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <alert.icon className={`w-4 h-4 mt-0.5 shrink-0 ${alert.color}`} />
                  <p className="text-sm text-foreground leading-tight">{alert.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
