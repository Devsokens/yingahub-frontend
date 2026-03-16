import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Building2,
    GraduationCap,
    FileText,
    Download,
    ExternalLink,
    Clock,
    CheckCircle2,
    AlertCircle,
    User,
    Eye,
    MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

const timelineEvents = [
    { status: "Draft Created", date: "Jan 5, 2026", description: "You started your application.", completed: true },
    { status: "Submitted", date: "Jan 10, 2026", description: "Application sent to the university.", completed: true },
    { status: "Documents Verified", date: "Jan 15, 2026", description: "All required documents were approved.", completed: true },
    { status: "Under Review", date: "Jan 20, 2026", description: "Admission team is currently reviewing your file.", completed: true, current: true },
    { status: "Decision", date: "Pending", description: "Final admission result.", completed: false },
];

const documents = [
    { name: "Passport Scan.pdf", size: "1.2 MB", type: "ID", date: "Jan 10, 2026", status: "Approved" },
    { name: "Academic Transcripts.pdf", size: "3.5 MB", type: "Academic", date: "Jan 10, 2026", status: "Approved" },
    { name: "Medical Certificate.pdf", size: "2.1 MB", type: "Medical", date: "Jan 10, 2026", status: "Approved" },
];

export default function ApplicationDetail() {
    const { id } = useParams();

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            {/* Header section with back navigation and quick stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link to="/student/applications" className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to My Applications
                    </Link>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                Application <span className="text-primary">#{id?.toUpperCase() || "12345"}</span>
                            </h1>
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1 font-semibold text-[10px] tracking-wide">
                                Under Review
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground font-medium text-sm">
                            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-primary" /> Tsinghua University</span>
                            <span className="opacity-30">|</span>
                            <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-primary" /> Master in CS</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 font-semibold gap-2 border-border/50 hover:bg-muted/50 rounded-xl transition-all">
                        <Download className="w-4 h-4 text-primary" /> Export PDF
                    </Button>
                    <Button className="h-11 px-6 font-semibold gap-2 shadow-lg shadow-primary/20 rounded-xl">
                        <MessageSquare className="w-4 h-4" /> Contact Univ
                    </Button>
                </div>
            </div>

            {/* Main Content with Tabs */}
            <Tabs defaultValue="info" className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-1">
                    <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start">
                        <TabsTrigger
                            value="info"
                            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-4 h-auto text-muted-foreground data-[state=active]:text-foreground font-semibold text-sm transition-all"
                        >
                            Informations
                        </TabsTrigger>
                        <TabsTrigger
                            value="documents"
                            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-4 h-auto text-muted-foreground data-[state=active]:text-foreground font-semibold text-sm transition-all"
                        >
                            Documents
                        </TabsTrigger>
                        <TabsTrigger
                            value="timeline"
                            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-4 h-auto text-muted-foreground data-[state=active]:text-foreground font-semibold text-sm transition-all"
                        >
                            Timeline & Tracking
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Global Progress</span>
                            <div className="w-24 px-1">
                                <Progress value={75} className="h-1.5 bg-background border border-border/20 shadow-inner" />
                            </div>
                            <span className="text-xs font-bold text-primary">75%</span>
                        </div>
                    </div>
                </div>

                <TabsContent value="info" className="mt-0 outline-none space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-border shadow-soft rounded-[24px] overflow-hidden group">
                            <CardHeader className="bg-muted/30 border-b border-border/50 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg font-bold">Academic Target</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">University</p>
                                        <p className="font-semibold text-foreground">Tsinghua University</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <MapPin className="w-3 h-3 text-primary" /> Beijing, China
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Program</p>
                                        <p className="font-semibold text-foreground">Master in CS</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Winter Intake 2026</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Faculty</p>
                                        <p className="font-semibold text-foreground">Computer Science & Tech</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Duration</p>
                                        <p className="font-semibold text-foreground">2 Years / Full Time</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border shadow-soft rounded-[24px] overflow-hidden group">
                            <CardHeader className="bg-muted/30 border-b border-border/50 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg font-bold">Personal Info</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Full Name</p>
                                        <p className="font-semibold text-foreground">Jean Dupont</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Contact</p>
                                        <p className="font-semibold text-foreground">jean.d@example.com</p>
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Statement of Purpose</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                            My goal is to specialize in Artificial Intelligence and contribute to innovative research in Beijing's tech ecosystem. Tsinghua's CS program matches my academic ambitions...
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-0 outline-none">
                    <Card className="border-border shadow-soft rounded-[24px] overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/50 py-6 px-8 flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold">Verified Documents</CardTitle>
                                <CardDescription className="text-sm">All sensitive files are encrypted and secure.</CardDescription>
                            </div>
                            <Button variant="outline" className="h-10 px-5 font-bold text-xs gap-2 rounded-xl">
                                <Download className="w-3 h-3" /> Download ZIP
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {documents.map((doc, idx) => (
                                    <div key={idx} className="group p-5 rounded-2xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                                <FileText className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-foreground truncate">{doc.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-bold text-muted-foreground tracking-widest">{doc.type}</span>
                                                    <span className="w-1 h-1 rounded-full bg-border" />
                                                    <span className="text-[9px] font-bold text-muted-foreground">{doc.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                <span className="text-[10px] font-black italic text-green-600 uppercase tracking-tighter">{doc.status}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-0 outline-none">
                    <Card className="border-border shadow-soft rounded-[24px] overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/50 py-6 px-8">
                            <CardTitle className="text-xl font-bold">Application Roadmap</CardTitle>
                            <CardDescription className="text-sm">Track your admission process milestone by milestone.</CardDescription>
                        </CardHeader>
                        <CardContent className="py-12 px-8 flex items-center justify-center">
                            <div className="max-w-2xl w-full space-y-12">
                                {timelineEvents.map((event, idx) => {
                                    const isLast = idx === timelineEvents.length - 1;
                                    return (
                                        <div key={idx} className="relative flex gap-8">
                                            {/* Connector line */}
                                            {!isLast && (
                                                <div className="absolute top-10 left-[19px] bottom-[-48px] w-0.5 bg-border">
                                                    {event.completed && (
                                                        <div className="absolute inset-0 bg-primary/40 h-full" />
                                                    )}
                                                </div>
                                            )}

                                            {/* Step point */}
                                            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${event.current ? "bg-amber-500 ring-8 ring-amber-500/10 shadow-lg shadow-amber-500/20" :
                                                event.completed ? "bg-primary shadow-lg shadow-primary/20" :
                                                    "bg-muted border border-border"
                                                }`}>
                                                {event.completed ? (
                                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                                ) : event.current ? (
                                                    <Clock className="w-5 h-5 text-white animate-pulse" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-1 pt-1">
                                                <div className="flex items-center justify-between w-full">
                                                    <h4 className={`text-lg font-bold leading-none ${event.current ? "text-amber-600" :
                                                        event.completed ? "text-foreground" :
                                                            "text-muted-foreground opacity-50"
                                                        }`}>
                                                        {event.status}
                                                    </h4>
                                                    <Badge variant="outline" className={`ml-4 text-[9px] font-bold uppercase tracking-wider ${event.current ? "border-amber-500 text-amber-600" :
                                                        event.completed ? "border-primary text-primary" :
                                                            "border-border text-muted-foreground/50"
                                                        }`}>
                                                        {event.date}
                                                    </Badge>
                                                </div>
                                                <p className={`text-sm tracking-tight font-medium max-w-lg mt-1 ${event.completed || event.current ? "text-muted-foreground" : "text-muted-foreground/40"
                                                    }`}>
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
