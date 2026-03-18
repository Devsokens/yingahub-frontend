import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, XCircle, Users, FileText, GraduationCap, Mail, Phone, MapPin, Calendar, BookOpen, ExternalLink, Building2, Eye, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const mockStudents = [
    {
        id: 1, name: "Jean Dupont", email: "jean@email.com", phone: "+241 77 111 111", country: "Gabon", city: "Libreville",
        level: "Bachelor", field: "Computer Science", gpa: "3.8", dob: "15/03/2001", nationality: "Gabonese",
        status: "approved", date: "15 Jan 2026",
        questionnaire_submitted: true,
        matching_status: 'completed',
        assigned_universities: ['tsinghua', 'peking'],
        questionnaire_responses: {
            fullName: "Jean Dupont",
            dob: "2001-03-15",
            currentLevel: "Bachelor",
            chinaField: "Computer Science",
            englishLevel: "Good",
            cultureReaction: "Highly adaptable, enjoys learning new cultures.",
            goals: "Work in AI research in China."
        },
        documents: [
            { name: "Passport", status: "validated", date: "10 Jan 2026" },
            { name: "Transcript", status: "validated", date: "10 Jan 2026" },
            { name: "High School Diploma", status: "pending", date: "12 Jan 2026" },
        ],
        applications: [
            { id: 1, university: "Tsinghua University", program: "Computer Science", status: "submitted", date: "20 Jan 2026" },
            { id: 2, university: "Peking University", program: "Computer Science", status: "under_review", date: "22 Jan 2026" },
        ],
    },
    {
        id: 2, name: "Aïcha Bamba", email: "aicha@email.com", phone: "+241 77 222 222", country: "Gabon", city: "Port-Gentil",
        level: "Master", field: "International Business", gpa: "3.5", dob: "20/07/1999", nationality: "Gabonese",
        status: "pending_review", date: "18 Jan 2026",
        documents: [
            { name: "Passport", status: "validated", date: "15 Jan 2026" },
            { name: "Motivation Letter", status: "pending", date: "16 Jan 2026" },
        ],
        applications: [
            { id: 2, university: "Peking University", program: "International Business", status: "under_review", date: "18 Jan 2026" },
        ],
    },
    {
        id: 3, name: "Paul Mbeki", email: "paul@email.com", phone: "+241 77 333 333", country: "Gabon", city: "Libreville",
        level: "Bachelor", field: "Medicine", gpa: "4.0", dob: "05/11/2000", nationality: "Gabonese",
        status: "approved", date: "10 Jan 2026",
        documents: [
            { name: "Passport", status: "validated", date: "05 Jan 2026" },
            { name: "Transcript", status: "validated", date: "05 Jan 2026" },
            { name: "High School Diploma", status: "validated", date: "05 Jan 2026" },
        ],
        applications: [
            { id: 3, university: "Fudan University", program: "Medicine", status: "accepted", date: "10 Jan 2026" },
        ],
    },
    {
        id: 4, name: "Fatou Diallo", email: "fatou@email.com", phone: "+241 77 444 444", country: "Gabon", city: "Franceville",
        level: "Master", field: "Engineering", gpa: "3.6", dob: "12/04/2000", nationality: "Gabonese",
        status: "pending_review", date: "20 Jan 2026",
        documents: [
            { name: "Passport", status: "validated", date: "18 Jan 2026" },
            { name: "Recommendation Letter", status: "rejected", date: "19 Jan 2026" },
        ],
        applications: [
            { id: 4, university: "Zhejiang University", program: "Engineering", status: "submitted", date: "22 Jan 2026" },
        ],
    },
    {
        id: 5, name: "Omar Sy", email: "omar@email.com", phone: "+241 77 555 555", country: "Gabon", city: "Libreville",
        level: "PhD", field: "Finance", gpa: "3.2", dob: "30/09/1997", nationality: "Gabonese",
        status: "rejected", date: "05 Jan 2026",
        documents: [
            { name: "Passport", status: "validated", date: "02 Jan 2026" },
        ],
        applications: [
            { id: 5, university: "Shanghai Jiao Tong", program: "Finance", status: "rejected", date: "05 Jan 2026" },
        ],
    },
    {
        id: 6, name: "Grace Nkomo", email: "grace@email.com", phone: "+241 77 666 666", country: "Gabon", city: "Libreville",
        level: "Bachelor", field: "Law", gpa: "3.4", dob: "18/02/2002", nationality: "Gabonese",
        status: "incomplete", date: "22 Jan 2026",
        documents: [],
        applications: [],
    },
];

const statusConfig: Record<string, { label: string; color: string }> = {
    approved: { label: "Approved", color: "bg-green-500/10 text-green-600 border-green-200" },
    pending_review: { label: "Questionnaire Pending", color: "bg-orange-500/10 text-orange-600 border-orange-200" },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
    incomplete: { label: "No Questionnaire", color: "bg-muted text-muted-foreground border-border" },
};

const docStatusConfig: Record<string, { label: string; color: string }> = {
    validated: { label: "Validated", color: "bg-green-500/10 text-green-600 border-green-200" },
    pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const appStatusConfig: Record<string, { label: string; color: string }> = {
    draft: { label: "Draft", color: "bg-muted text-muted-foreground border-border" },
    submitted: { label: "Submitted", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    under_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
    accepted: { label: "Accepted", color: "bg-green-500/10 text-green-600 border-green-200" },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const StarRating = ({ rating, setRating }: { rating: number; setRating: (r: number) => void }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                className={`w-4 h-4 cursor-pointer transition-colors ${
                    star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30 hover:text-primary/50"
                }`}
                onClick={() => setRating(star)}
            />
        ))}
    </div>
);

export default function AdminStudentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { assignMatching } = useAuth();
    const [student, setStudent] = useState<any | null>(null);
    const [ratings, setRatings] = useState<Record<string, number>>({ academic: 4, language: 3, adaptation: 5, motivation: 4 });
    const [selectedUnivs, setSelectedUnivs] = useState<string[]>([]);
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        const found = mockStudents.find(s => s.id === Number(id)) || mockStudents[0];
        
        // Simulation: merge live data from localStorage if available
        const simData = localStorage.getItem('yingahub_simulated_student');
        if (simData && (Number(id) === 1 || !id)) {
            const parsedSim = JSON.parse(simData);
            setStudent({ ...found, ...parsedSim });
            if (parsedSim.assigned_universities) {
                setSelectedUnivs(parsedSim.assigned_universities as string[]);
            }
        } else {
            setStudent(found);
            if (found && 'assigned_universities' in found) {
                setSelectedUnivs(found.assigned_universities as string[]);
            }
        }
    }, [id]);

    const handleAssign = () => {
        setIsAssigning(true);
        setTimeout(() => {
            setIsAssigning(false);
            assignMatching(selectedUnivs);
            // In a real app, this would refresh the user data
        }, 1000);
    };

    if (!student) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header & Back Button */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/admin/students")} className="shrink-0">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        Student Profile
                    </h1>
                    <p className="text-muted-foreground mt-1">Complete profile for {student.name}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Main Info Card */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary shrink-0 relative">
                            {student.name.split(" ").map(n => n[0]).join("")}
                            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${student.status === 'approved' ? 'bg-green-500' : student.status === 'pending_review' ? 'bg-amber-400' : student.status === 'rejected' ? 'bg-destructive' : 'bg-muted'}`} />
                        </div>
                        <div>
                            <p className="font-bold text-foreground text-2xl">{student.name}</p>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                <span className="text-sm text-muted-foreground flex items-center gap-1.5"><Mail className="w-4 h-4" /> {student.email}</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1.5"><Phone className="w-4 h-4" /> {student.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-start md:items-end w-full md:w-auto mt-2 md:mt-0">
                        <Badge variant="outline" className={`${statusConfig[student.status].color} px-3 py-1 text-sm`}>
                            {statusConfig[student.status].label}
                        </Badge>
                        {student.status === "pending_review" && (
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 h-8">
                                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 h-8">
                                    <XCircle className="w-4 h-4 mr-1.5" /> Reject
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full max-w-lg grid grid-cols-3 mb-8 bg-muted/50 p-1 rounded-2xl">
                        <TabsTrigger value="info" className="gap-2 rounded-xl data-[state=active]:shadow-sm"><Users className="w-4 h-4" />Profile</TabsTrigger>
                        <TabsTrigger value="questionnaire" className="gap-2 rounded-xl data-[state=active]:shadow-sm">
                            <FileText className="w-4 h-4" />Questionnaire
                            {student.questionnaire_submitted && <Badge className="ml-1.5 bg-primary/20 text-primary border-none shadow-none text-[9px] px-1.5 h-4">New</Badge>}
                        </TabsTrigger>
                        <TabsTrigger value="apps" className="gap-2 rounded-xl data-[state=active]:shadow-sm">
                            <GraduationCap className="w-4 h-4" />Applications
                            {student.applications.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">{student.applications.length}</span>}
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1 : Informations */}
                    <TabsContent value="info">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Detailed Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><MapPin className="w-4 h-4" /> City / Country</span>
                                    <p className="font-medium text-foreground">{student.city}, {student.country}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><Calendar className="w-4 h-4" /> Date of Birth</span>
                                    <p className="font-medium text-foreground">{student.dob}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><Users className="w-4 h-4" /> Nationality</span>
                                    <p className="font-medium text-foreground">{student.nationality}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><BookOpen className="w-4 h-4" /> Academic Level</span>
                                    <p className="font-medium text-foreground">{student.level}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><GraduationCap className="w-4 h-4" /> Field of Study</span>
                                    <p className="font-medium text-foreground">{student.field}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1"><CheckCircle2 className="w-4 h-4" /> GPA</span>
                                    <p className="font-medium text-foreground">{student.gpa} / 4.0</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab 2: Questionnaire & Evaluation */}
                    <TabsContent value="questionnaire">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-8 space-y-6">
                                <Card className="border-border/50 shadow-sm rounded-[24px]">
                                    <CardHeader className="border-b border-border/40 pb-4">
                                        <CardTitle className="text-xl font-black tracking-tighter uppercase flex items-center gap-2 text-primary">
                                            Academic Questionnaire
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Section 1: Personal */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">1. Personal Information</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Full Name</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.fullName || student.name}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Birth Date</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.dob || student.dob}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Nationality</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.nationality || student.nationality}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Whatsapp</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.whatsapp || student.phone}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Residence</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.countryRes || student.country}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 2: Academic */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">2. Academic Status</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Institution</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.currentInstitution || "N/A"}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">GPA/Average</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.gpa || student.gpa}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Strong</p>
                                                            <p className="text-[11px] text-foreground/80">{student.questionnaire_responses?.strongestSubjects || "Maths"}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Difficult</p>
                                                            <p className="text-[11px] text-foreground/80">{student.questionnaire_responses?.difficultSubjects || "None"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 3: Study Project */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">3. Study Project in China</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="flex justify-between border-b border-border/30 pb-1">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Field</p>
                                                        <p className="text-xs font-bold text-primary">{student.questionnaire_responses?.chinaField || "Unknown"}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Why this field?</p>
                                                        <p className="text-xs text-foreground/80 leading-relaxed truncate hover:text-clip">"{student.questionnaire_responses?.whyField || "N/A"}"</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Other Countries</p>
                                                        <p className="text-[11px] text-muted-foreground">Considered: {student.questionnaire_responses?.otherCountries || "None"}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 4: Languages */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">4. Languages</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">English Level</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.englishLevel || "Medium"}</span>
                                                    </div>
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Studied Mandarin?</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.studiedMandarin || "No"}</span>
                                                    </div>
                                                    {student.questionnaire_responses?.studiedMandarin === 'Yes' && (
                                                        <div className="flex justify-between">
                                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Mandarin Level</span>
                                                            <span className="text-xs font-medium">{student.questionnaire_responses?.mandarinLevel}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Section 5: Adaptation */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">5. Adaptation</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="flex justify-between border-b border-border/30 pb-2">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Lived Away?</span>
                                                        <span className="text-xs font-medium">{student.questionnaire_responses?.livedAway || "No"}</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Culture Reaction</p>
                                                        <p className="text-sm text-foreground/80">"{student.questionnaire_responses?.cultureReaction || "N/A"}"</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section 6: Discipline */}
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-black uppercase tracking-widest text-primary">6. Discipline</h3>
                                                <div className="grid gap-4 bg-muted/20 p-5 rounded-[20px] border border-border/50">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Reaction to Critique</p>
                                                        <p className="text-sm text-foreground/80">"{student.questionnaire_responses?.profCritique || "N/A"}"</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Strict Framework?</span>
                                                        <span className="text-xs font-medium text-green-600 font-bold">{student.questionnaire_responses?.respectStrictFrame || "Yes"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section 7: Motivation (Full Width) */}
                                        <div className="space-y-4 pt-4 border-t border-border/30">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-primary">7. Final Motivation & Concerns</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-6 rounded-[24px] border border-border/50 shadow-inner">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Future Goals</p>
                                                    <p className="text-sm font-medium text-foreground leading-relaxed">"{student.questionnaire_responses?.goals || "N/A"}"</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Main Concerns</p>
                                                    <p className="text-sm font-medium text-foreground leading-relaxed">"{student.questionnaire_responses?.concerns || "N/A"}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-4 space-y-6">
                                <Card className="border-border/50 shadow-sm rounded-[24px] sticky top-6">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-base font-black tracking-tight uppercase border-b border-border/40 pb-3">Evaluation Control</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase text-muted-foreground">Academic</span>
                                                <StarRating rating={ratings.academic} setRating={(r) => setRatings({...ratings, academic: r})} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase text-muted-foreground">Language</span>
                                                <StarRating rating={ratings.language} setRating={(r) => setRatings({...ratings, language: r})} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase text-muted-foreground">Adaptation</span>
                                                <StarRating rating={ratings.adaptation} setRating={(r) => setRatings({...ratings, adaptation: r})} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase text-muted-foreground">Motivation</span>
                                                <StarRating rating={ratings.motivation} setRating={(r) => setRatings({...ratings, motivation: r})} />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border/40">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Assign Universities for Matching</h4>
                                            <div className="space-y-2 mb-6 max-h-[160px] overflow-y-auto px-1">
                                                {['tsinghua', 'peking', 'fudan', 'zhejiang'].map((id) => (
                                                    <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors">
                                                        <Checkbox 
                                                            id={id} 
                                                            checked={selectedUnivs.includes(id)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) setSelectedUnivs([...selectedUnivs, id]);
                                                                else setSelectedUnivs(selectedUnivs.filter(u => u !== id));
                                                            }}
                                                        />
                                                        <Label htmlFor={id} className="text-xs font-bold cursor-pointer uppercase">{id.charAt(0).toUpperCase() + id.slice(1)} University</Label>
                                                    </div>
                                                ))}
                                            </div>
                                            <Button 
                                                className="w-full h-12 rounded-xl font-black uppercase tracking-tighter shadow-lg shadow-primary/20 gap-2"
                                                onClick={handleAssign}
                                                disabled={isAssigning || selectedUnivs.length === 0}
                                            >
                                                {isAssigning ? "Processing..." : "Validate & Match"}
                                                <CheckCircle2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Tab 3 : Candidatures */}
                    <TabsContent value="apps">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Active Applications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {student.applications.length === 0 ? (
                                    <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
                                        <GraduationCap className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                                        <p className="text-sm text-muted-foreground">No applications created yet.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {student.applications.map((app, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-colors group gap-4"
                                                onClick={() => navigate(`/admin/applications/${app.id}`)}
                                            >
                                                <div className="flex items-start sm:items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                        <Building2 className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{app.university}</p>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5 flex-wrap">
                                                            <span>{app.program}</span>
                                                            <span>•</span>
                                                            <span>{app.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 self-start sm:self-auto">
                                                    <Badge variant="outline" className={appStatusConfig[app.status].color}>
                                                        {appStatusConfig[app.status].label}
                                                    </Badge>
                                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}
