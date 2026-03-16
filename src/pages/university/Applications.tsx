import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    MapPin,
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    BookOpen,
    GraduationCap,
    FileText,
    ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const mockApplications = [
    {
        id: "APP-001",
        student: {
            name: "Jean Dupont",
            email: "jean@email.com",
            phone: "+241 77 111 111",
            country: "Gabon",
            city: "Libreville",
            level: "Bachelor",
            field: "Computer Science",
            gpa: "3.8",
            dob: "15/03/2001",
            nationality: "Gabonese"
        },
        program: "MSc Computer Science",
        date: "Jan 10, 2026",
        status: "pending",
        documents: [
            { name: "Passport", status: "validated", date: "10 Jan 2026" },
            { name: "Transcript", status: "validated", date: "10 Jan 2026" },
            { name: "High School Diploma", status: "pending", date: "12 Jan 2026" },
        ],
        timeline: [
            { status: "Submitted", date: "Jan 10, 2026", done: true },
            { status: "Under Review", date: "Jan 12, 2026", done: true },
            { status: "University Response", date: "Pending", done: false },
            { status: "Final Decission", date: "Pending", done: false },
        ]
    },
    {
        id: "APP-002",
        student: {
            name: "Aya Tanaka",
            email: "aya@email.com",
            phone: "+81 90 1234 5678",
            country: "Japan",
            city: "Tokyo",
            level: "Master",
            field: "Engineering",
            gpa: "3.9",
            dob: "20/07/1999",
            nationality: "Japanese"
        },
        program: "Engineering Management",
        date: "Jan 12, 2026",
        status: "review",
        documents: [],
        timeline: []
    },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: "Pending", color: "bg-blue-100 text-blue-700", icon: Clock },
    review: { label: "Under Review", color: "bg-amber-100 text-amber-700", icon: Eye },
    accepted: { label: "Accepted", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function UniversityApplications() {
    const navigate = useNavigate();

    const handleSelectApp = (appId: string) => {
        navigate(`/university/applications/${appId}`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Applications Management</h1>
                        <p className="text-muted-foreground mt-1">Review and process student applications for your university.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" /> Export CSV
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="pb-0 border-b border-border/50">
                        <div className="flex flex-col md:flex-row justify-between pb-6 gap-4">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="w-full pl-10 pr-4 h-10 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Filter className="w-4 h-4" /> Filter
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-muted/30 border-b border-border">
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID & Student</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Program</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Origin</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {mockApplications.map((app) => {
                                        const config = statusConfig[app.status];
                                        return (
                                            <tr
                                                key={app.id}
                                                className="hover:bg-muted/20 transition-colors group cursor-pointer"
                                                onClick={() => handleSelectApp(app.id)}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                            {app.student.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-foreground group-hover:text-primary">{app.student.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">{app.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-foreground font-medium">{app.program}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {app.student.country}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">{app.date}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={cn("border-none text-[10px] font-bold px-2 py-0.5", config.color)}>
                                                        {config.label}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
