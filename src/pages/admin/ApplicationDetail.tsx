import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Search, Building2, BookOpen, User, Calendar, MessageSquare, FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

// Mock data (in a real app, this would be fetched using react-query and the ID from useParams)
const mockApplications = [
    {
        id: 1, student: "Jean Dupont", studentEmail: "jean@email.com", studentCountry: "Gabon",
        university: "Tsinghua University", program: "Computer Science", status: "submitted",
        date: "20 Jan 2026", notes: "", gpa: "3.8", level: "Bachelor",
        timeline: [
            { label: "Application Submitted", date: "20 Jan 2026", done: true },
            { label: "Under Review", date: "—", done: false },
            { label: "Final Decision", date: "—", done: false },
        ],
    },
    {
        id: 2, student: "Aïcha Bamba", studentEmail: "aicha@email.com", studentCountry: "Gabon",
        university: "Peking University", program: "International Business", status: "under_review",
        date: "18 Jan 2026", notes: "Complete file", gpa: "3.5", level: "Master",
        timeline: [
            { label: "Application Submitted", date: "18 Jan 2026", done: true },
            { label: "Under Review", date: "25 Jan 2026", done: true },
            { label: "Final Decision", date: "—", done: false },
        ],
    },
    // ... autres mock data si nécessaire
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    draft: { label: "Draft", color: "bg-muted text-muted-foreground border-border", icon: FileText },
    submitted: { label: "Submitted", color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: Clock },
    under_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Search },
    accepted: { label: "Accepted", color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export default function AdminApplicationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState<typeof mockApplications[0] | null>(null);

    useEffect(() => {
        // Simulate fetching application data by ID
        const found = mockApplications.find(a => a.id === Number(id)) || mockApplications[0]; // fallback to first if not found in mock
        setApp(found);
    }, [id]);

    if (!app) return null;

    const StatusIcon = statusConfig[app.status]?.icon || FileText;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header & Back Button */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/admin/applications")} className="shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        Application #{app.id}
                    </h1>
                    <p className="text-muted-foreground mt-1">Application details and analysis for {app.student}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Main Info Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                            {app.student.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <p className="font-bold text-foreground text-xl">{app.student}</p>
                            <p className="text-sm text-muted-foreground">{app.studentEmail} · {app.studentCountry}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className={`${statusConfig[app.status].color} px-3 py-1 text-sm flex items-center gap-1.5`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[app.status].label}
                    </Badge>
                </div>

                {/* Details Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Requested University</p>
                                <p className="text-base font-medium text-foreground">{app.university}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Program</p>
                                <p className="text-base font-medium text-foreground">{app.program}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Study Level</p>
                                <p className="text-base font-medium text-foreground">{app.level}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">GPA</p>
                                <p className="text-base font-medium text-foreground">{app.gpa} / 4.0</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Submission Date</p>
                                <p className="text-base font-medium text-foreground">{app.date}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Layout for Timeline & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Timeline */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Application Tracking</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pl-2">
                            <div className="relative border-l-2 border-border ml-3 space-y-8">
                                {app.timeline.map((t, i) => (
                                    <div key={i} className="relative pl-6">
                                        <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center ${t.done ? "bg-primary text-white ring-4 ring-background" : "bg-background border-2 border-border ring-4 ring-background"}`}>
                                            {t.done && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                        <div>
                                            <p className={`text-base font-medium ${t.done ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</p>
                                            <p className="text-sm text-muted-foreground mt-0.5">{t.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes & Actions */}
                    <div className="space-y-6">
                        {app.notes && (
                            <Card className="bg-amber-50/50 border-amber-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-amber-800 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Admin Note
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-amber-900 leading-relaxed">{app.notes}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Required Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {app.status === 'under_review' ? (
                                    <>
                                        <Button className="w-full gap-2" onClick={() => navigate(`/admin/applications/${app.id}/review`)}>
                                            <Search className="w-4 h-4" /> Review Application
                                        </Button>
                                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border mt-2">
                                            <Button size="sm" className="w-full gap-1.5 bg-green-600 hover:bg-green-700 text-white">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Accept
                                            </Button>
                                            <Button size="sm" variant="outline" className="w-full gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10">
                                                <XCircle className="w-3.5 h-3.5" /> Reject
                                            </Button>
                                        </div>
                                    </>
                                ) : app.status === 'submitted' ? (
                                    <Button className="w-full gap-2" onClick={() => navigate(`/admin/applications/${app.id}/review`)}>
                                        <Search className="w-4 h-4" /> Review Application
                                    </Button>
                                ) : (
                                    <div className="text-center py-3 bg-muted/50 rounded-lg border border-border">
                                        <p className="text-sm text-muted-foreground">No action required</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
