import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Users,
    Files,
    Clock,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    MessageSquare,
    PlusCircle,
    Bell,
    AlertCircle,
    Calendar,
    Search,
    Filter
} from "lucide-react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Total Applications", value: "1,284", icon: Files, color: "text-blue-600", bg: "bg-blue-500/10", trend: "+12%", colorVar: "blue" },
    { label: "Active Students", value: "456", icon: Users, color: "text-green-600", bg: "bg-green-500/10", trend: "+5%", colorVar: "green" },
    { label: "Pending Review", value: "28", icon: Clock, color: "text-amber-600", bg: "bg-amber-500/10", trend: "-2%", colorVar: "amber" },
    { label: "Admitted (2026)", value: "189", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", trend: "+18%", colorVar: "primary" },
];

const chartData = [
    { month: "Jan", apps: 45, admitted: 20 },
    { month: "Feb", apps: 52, admitted: 25 },
    { month: "Mar", apps: 85, admitted: 40 },
    { month: "Apr", apps: 120, admitted: 65 },
    { month: "May", apps: 98, admitted: 55 },
    { month: "Jun", apps: 145, admitted: 90 },
];

export default function UniversityDashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header section with welcome and quick search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-1"
                >
                    <h1 className="text-3xl font-black text-foreground tracking-tighter italic uppercase">University Hub</h1>
                    <p className="text-muted-foreground font-medium italic">Welcome back to the admission portal. You have <span className="text-primary font-bold">12 new</span> actions required today.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Find application ID..."
                            className="pl-10 pr-4 h-11 bg-white border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64 shadow-sm"
                        />
                    </div>
                    <Button className="h-11 rounded-xl bg-gradient-yinga text-white font-black shadow-lg shadow-primary/20 gap-2">
                        <PlusCircle className="w-4 h-4" /> New Program
                    </Button>
                </motion.div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Review Apps", icon: Files, color: "bg-blue-50 text-blue-600" },
                    { label: "Post News", icon: Bell, color: "bg-orange-50 text-orange-600" },
                    { label: "Direct Chat", icon: MessageSquare, color: "bg-purple-50 text-purple-600" },
                    { label: "Filter Data", icon: Filter, color: "bg-slate-50 text-slate-600" },
                ].map((action, i) => (
                    <motion.button
                        key={action.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border/40 hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", action.color)}>
                            <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-tighter text-foreground italic">{action.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[24px] overflow-hidden group">
                            <CardContent className="p-6 relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <s.icon size={80} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", s.bg)}>
                                        <s.icon className={cn("w-6 h-6", s.color)} />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 italic">
                                        <TrendingUp className="w-3 h-3" />
                                        {s.trend}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">{s.label}</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <p className="text-3xl font-black text-foreground italic tracking-tighter">{s.value}</p>
                                        <span className="text-[10px] font-bold text-muted-foreground">unit.</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area */}
                <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-slate-50">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-black italic uppercase tracking-tight">Acquisition Performance</CardTitle>
                            <CardDescription className="text-xs font-medium">Comparison of applications vs successful admissions.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold uppercase">Apps</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary/20" />
                                <span className="text-[10px] font-bold uppercase">Admit</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: "#94A3B8" }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: "#94A3B8" }}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: '#2563EB', strokeWidth: 2, strokeDasharray: '3 3' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#fff' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: '800', fontStyle: 'italic' }}
                                    />
                                    <Area type="monotone" dataKey="apps" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                                    <Area type="monotone" dataKey="admitted" stroke="#F1F5F9" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Important Alerts & Deadlines */}
                <div className="space-y-6">
                    {/* Severe Alerts */}
                    <Card className="border-l-4 border-l-orange-500 border-none shadow-xl shadow-slate-200/50 rounded-[24px]">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2 text-orange-600">
                                <AlertCircle className="w-5 h-5 animate-pulse" />
                                <CardTitle className="text-sm font-black uppercase tracking-tighter italic">Critical Alerts</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { title: "Missing Bank Statements", count: "14", deadline: "48h left" },
                                { title: "Visa Docs Verification", count: "05", deadline: "Today" },
                            ].map((alert, i) => (
                                <div key={i} className="p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between gap-3 group cursor-pointer hover:bg-orange-100/50 transition-colors">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-black text-orange-950 italic">{alert.title}</p>
                                        <p className="text-[10px] text-orange-700 font-bold uppercase">{alert.deadline}</p>
                                    </div>
                                    <Badge className="bg-orange-600 text-white font-black rounded-lg">{alert.count}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Upcoming intake events */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[24px]">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Calendar className="w-5 h-5" />
                                <CardTitle className="text-sm font-black uppercase tracking-tighter italic">Key Calendar</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { date: "Sep 15", event: "Autumn Semester Start", type: "Event" },
                                { date: "Aug 01", event: "Admission Deadline", type: "Deadline" },
                                { date: "Jul 20", event: "Scholarship Results", type: "Result" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                        <span className="text-[9px] font-black text-slate-400 uppercase leading-none">{item.date.split(' ')[0]}</span>
                                        <span className="text-sm font-black text-foreground leading-none mt-1 italic">{item.date.split(' ')[1]}</span>
                                    </div>
                                    <div className="space-y-0.5 pt-1">
                                        <p className="text-xs font-black text-foreground group-hover:text-primary transition-colors">{item.event}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.type}</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full text-xs font-black italic uppercase text-muted-foreground hover:text-primary transition-colors h-8">
                                Expand Calendar <ArrowUpRight className="w-3 h-3 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Section: Recent Applications Table/List */}
            <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-slate-50">
                    <div>
                        <CardTitle className="text-xl font-black italic uppercase tracking-tight">Latest Applications</CardTitle>
                        <CardDescription className="text-xs font-medium italic">Pending processing or recently updated profiles.</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-xl font-black h-9 text-xs italic px-4">Export CSV</Button>
                        <Button variant="ghost" size="sm" className="text-primary font-black h-9 text-xs italic uppercase underline underline-offset-4">View All Portal</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Student</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Program</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Applied</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Compatibility</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Zhang Wei", program: "MSc Computer Science", date: "2h ago", match: 94, status: "New" },
                                    { name: "Li Na", program: "Civil Engineering", date: "5h ago", match: 88, status: "Pending" },
                                    { name: "Wang James", program: "Business Admin", date: "1d ago", match: 72, status: "Review" },
                                    { name: "Chen Sofia", program: "Architecture", date: "2d ago", match: 91, status: "Pending" },
                                ].map((app, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/30 transition-colors border-b border-slate-50 last:border-0">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-sm italic">
                                                    {app.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-foreground italic group-hover:underline underline-offset-2 decoration-2">{app.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter italic">ID: #YH-{202600 + i}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-0.5">
                                                <p className="text-[13px] font-bold text-foreground italic">{app.program}</p>
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Fall 2026</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-black text-slate-400 italic">{app.date}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-all duration-1000"
                                                        style={{ width: `${app.match}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black italic">{app.match}% Hub Match</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <Badge className={cn(
                                                "font-black text-[9px] px-2 py-0.5 rounded-md italic uppercase tracking-widest",
                                                app.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                    app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-purple-100 text-purple-700'
                                            )}>
                                                {app.status}
                                            </Badge>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-md transition-all">
                                                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
