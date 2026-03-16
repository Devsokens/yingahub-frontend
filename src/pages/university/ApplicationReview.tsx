import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle2, XCircle, FileText, Eye, Download, Search, Save, MessageSquare, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data
const mockApplication = {
    id: 1,
    student: "Jean Dupont",
    university: "Tsinghua University",
    program: "Computer Science",
    status: "under_review",
    documents: [
        { id: 101, name: "Passport.pdf", type: "Identity", status: "validated", date: "10 Jan 2026", size: "2.4 MB" },
        { id: 102, name: "Transcripts_L3.pdf", type: "Academic", status: "pending", date: "10 Jan 2026", size: "1.1 MB" },
        { id: 103, name: "Motivation_Letter.pdf", type: "Support", status: "pending", date: "11 Jan 2026", size: "0.8 MB" },
        { id: 104, name: "Medical_Certificate.pdf", type: "Health", status: "validated", date: "12 Jan 2026", size: "1.5 MB" },
    ]
};

const docStatusConfig: Record<string, { label: string; color: string }> = {
    validated: { label: "Validated", color: "bg-green-500/10 text-green-600 border-green-200" },
    pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
    rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function UniversityApplicationReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState(mockApplication);
    const [notes, setNotes] = useState("");
    const [activeDoc, setActiveDoc] = useState<typeof mockApplication.documents[0] | null>(mockApplication.documents[0]);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [documentToReject, setDocumentToReject] = useState<number | null>(null);

    useEffect(() => {
        // Mocking fetch
    }, [id]);

    const handleDocStatusChange = (docId: number, newStatus: string) => {
        if (newStatus === 'rejected') {
            setDocumentToReject(docId);
            setRejectDialogOpen(true);
            return;
        }

        setApp({
            ...app,
            documents: app.documents.map(d => d.id === docId ? { ...d, status: newStatus } : d)
        });
    };

    const confirmRejectDocument = () => {
        if (documentToReject !== null) {
            setApp({
                ...app,
                documents: app.documents.map(d => d.id === documentToReject ? { ...d, status: 'rejected' } : d)
            });
            setRejectDialogOpen(false);
            setRejectReason("");
            setDocumentToReject(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col pt-4">
            {/* Header & Back Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/university/applications`)}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-foreground">Review Application #{app.id}</h1>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200 font-bold uppercase tracking-widest text-[10px]">Under Review</Badge>
                        </div>
                        <div className="flex flex-col mt-1">
                            <p className="text-sm text-muted-foreground">Applicant: <span className="font-bold text-foreground">{app.student}</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 font-bold h-11 px-6 rounded-xl border-primary/20 hover:bg-primary/5 text-primary">
                        <Brain className="w-4 h-4" /> Start Evaluation Analysis
                    </Button>
                    <Button className="gap-2 bg-primary text-white hover:bg-primary/90 font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
                        Confirm Admission
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

                {/* Left Column: Documents List & Actions (4 columns wide) */}
                <div className="lg:col-span-4 flex flex-col gap-6 min-h-0 overflow-y-auto pr-2 pb-6">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50">
                            <CardTitle className="text-base flex items-center justify-between font-bold">
                                Documents Provided
                                <Badge variant="secondary" className="bg-muted text-foreground">{app.documents.length}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border/50">
                                {app.documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className={cn(
                                            "p-4 cursor-pointer transition-colors hover:bg-muted/30",
                                            activeDoc?.id === doc.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                                        )}
                                        onClick={() => setActiveDoc(doc)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <FileText className={cn("w-4 h-4", activeDoc?.id === doc.id ? 'text-primary' : 'text-muted-foreground')} />
                                                <span className="font-bold text-sm">{doc.name}</span>
                                            </div>
                                            <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-tighter px-1.5 py-0", docStatusConfig[doc.status].color)}>
                                                {docStatusConfig[doc.status].label}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-muted-foreground pl-6 font-medium">
                                            <span>{doc.type} • {doc.size}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="pb-3 border-b border-border/50">
                            <CardTitle className="text-base font-bold">University Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Internal Notes</Label>
                                <Textarea
                                    placeholder="Write your observations here..."
                                    className="min-h-[140px] resize-none rounded-xl bg-muted/20 border-border/50"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admission Status</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-bold h-10 rounded-xl">
                                        <CheckCircle2 className="w-4 h-4" /> Grant
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 font-bold h-10 rounded-xl">
                                        <XCircle className="w-4 h-4" /> Decline
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: PDF Preview / Document Work area (8 columns wide) */}
                <div className="lg:col-span-8 h-full min-h-[500px]">
                    <Card className="h-full flex flex-col border-border/50 shadow-sm overflow-hidden">
                        {activeDoc ? (
                            <>
                                <CardHeader className="py-3 px-4 border-b border-border/50 flex flex-row items-center justify-between shrink-0 bg-muted/20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-sm font-bold">{activeDoc.name}</CardTitle>
                                            <CardDescription className="text-[10px] uppercase font-black tracking-widest">Document Viewer</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs font-bold rounded-lg border-border/50">
                                            <Download className="w-3.5 h-3.5" /> Download
                                        </Button>

                                        <div className="h-6 w-px bg-border/50 mx-1"></div>

                                        {activeDoc.status === 'pending' ? (
                                            <>
                                                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-[10px] font-black uppercase tracking-tight text-green-600 border-green-200 hover:bg-green-50 rounded-lg" onClick={() => handleDocStatusChange(activeDoc.id, 'validated')}>
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                                                </Button>
                                                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-[10px] font-black uppercase tracking-tight text-destructive border-destructive/20 hover:bg-destructive/10 rounded-lg" onClick={() => handleDocStatusChange(activeDoc.id, 'rejected')}>
                                                    <XCircle className="w-3.5 h-3.5" /> Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <Badge variant="outline" className={cn("text-[10px] font-black uppercase tracking-tight", docStatusConfig[activeDoc.status].color)}>
                                                {docStatusConfig[activeDoc.status].label}
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 p-4 bg-muted/10 relative overflow-hidden flex flex-col">
                                    {/* Document Preview Placeholder */}
                                    <div className="flex-1 border-2 border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center bg-card shadow-inner w-full h-full min-h-[300px]">
                                        <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-4">
                                            <FileText className="w-10 h-10 text-muted-foreground/30" />
                                        </div>
                                        <p className="text-xl font-black italic tracking-tighter text-foreground">Document Analysis</p>
                                        <p className="text-xs text-muted-foreground mt-2 text-center px-4 font-medium uppercase tracking-widest">Previewing {activeDoc.name}</p>
                                        <Button variant="secondary" className="mt-8 gap-2 h-11 px-6 font-bold rounded-xl" onClick={() => window.open('#', '_blank')}>
                                            <ExternalLink className="w-4 h-4" /> View Full File
                                        </Button>
                                    </div>
                                </CardContent>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/5">
                                <Search className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-xs">Select a document to review</p>
                            </div>
                        )}
                    </Card>
                </div>

            </div>

            {/* Reject Document Modal */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="rounded-[32px] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic tracking-tight uppercase">Reject Document</DialogTitle>
                        <DialogDescription className="text-muted-foreground font-medium">
                            Please provide a reason for rejecting this document.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="reason" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Rejection Reason</Label>
                            <Textarea
                                id="reason"
                                placeholder="E.g., The document is illegible, expired..."
                                className="min-h-[100px] rounded-2xl bg-muted/30 border-none"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="ghost" className="font-bold" onClick={() => { setRejectDialogOpen(false); setRejectReason(""); }}>Cancel</Button>
                        <Button variant="destructive" className="font-bold rounded-xl px-6 h-11" onClick={confirmRejectDocument} disabled={!rejectReason.trim()}>Confirm Rejection</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const ExternalLink = ({ className, ...props }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
)
