import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, XCircle, Users, FileText, GraduationCap, Mail, Phone, MapPin, Calendar, BookOpen, ExternalLink, Building2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const mockStudents = [
    {
        id: 1, name: "Jean Dupont", email: "jean@email.com", phone: "+241 77 111 111", country: "Gabon", city: "Libreville",
        level: "Bachelor", field: "Computer Science", gpa: "3.8", dob: "15/03/2001", nationality: "Gabonese",
        status: "approved", date: "15 Jan 2026",
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
    pending_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
    incomplete: { label: "Incomplete", color: "bg-muted text-muted-foreground border-border" },
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

export default function AdminStudentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState<typeof mockStudents[0] | null>(null);

    useEffect(() => {
        const found = mockStudents.find(s => s.id === Number(id)) || mockStudents[0];
        setStudent(found);
    }, [id]);

    if (!student) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
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
                    <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
                        <TabsTrigger value="info" className="gap-2"><Users className="w-4 h-4" />Info</TabsTrigger>
                        <TabsTrigger value="docs" className="gap-2">
                            <FileText className="w-4 h-4" />Documents
                            {student.documents.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">{student.documents.length}</span>}
                        </TabsTrigger>
                        <TabsTrigger value="apps" className="gap-2">
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

                    {/* Tab 2 : Documents */}
                    <TabsContent value="docs">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Student Documents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {student.documents.length === 0 ? (
                                    <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
                                        <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                                        <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {student.documents.map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${doc.status === 'validated' ? 'bg-green-500/10 text-green-600' : doc.status === 'pending' ? 'bg-amber-500/10 text-amber-600' : 'bg-destructive/10 text-destructive'}`}>
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">Added on {doc.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <Badge variant="outline" className={docStatusConfig[doc.status].color}>
                                                        {docStatusConfig[doc.status].label}
                                                    </Badge>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" title="View Document" className="w-7 h-7 text-muted-foreground hover:text-primary">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {doc.status === 'pending' && (
                                                            <>
                                                                <Button variant="ghost" size="icon" title="Approve" className="w-7 h-7 text-green-600 hover:bg-green-50"><CheckCircle2 className="w-4 h-4" /></Button>
                                                                <Button variant="ghost" size="icon" title="Reject" className="w-7 h-7 text-destructive hover:bg-destructive/10"><XCircle className="w-4 h-4" /></Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
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
