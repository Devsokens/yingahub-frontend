import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    GraduationCap,
    MapPin,
    Calendar,
    ChevronRight,
    ChevronLeft,
    Lock,
    Rocket,
    Star,
    ArrowRight,
    Search,
    User,
    Upload,
    FileCheck2,
    ArrowLeft,
    Send,
    Sparkles,
    Globe,
    BookOpen,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
    { id: "program", title: "Program Selection", icon: Search, description: "Choose your university and program" },
    { id: "personal", title: "Personal Details", icon: User, description: "Your contact and basic information" },
    { id: "documents", title: "Document Uploads", icon: Upload, description: "Passport, transcripts, and certificates" },
    { id: "review", title: "Submission Review", icon: FileCheck2, description: "Verify your information before submitting" },
];

const UNIVERSITY_OPTIONS = [
    "Tsinghua University",
    "Peking University",
    "Fudan University",
    "Zhejiang University",
    "Shanghai Jiao Tong University",
    "Nanjing University",
    "Wuhan University",
    "Sun Yat-sen University"
];

export default function ApplicationNew() {
    const { user } = useAuth();
    const isSubscribed = user?.subscription_status !== 'none';
    const [params] = useSearchParams();
    const initialUniv = params.get("univ") || "";

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        university: initialUniv,
        program: "",
        fullName: "Jean Dupont",
        email: "jean.dupont@example.com",
        bio: "",
        documents: [],
    });

    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final submission logic here
            alert("Application submitted successfully!");
            navigate("/student/applications");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="relative min-h-[80vh]">
            <div className={`max-w-4xl mx-auto space-y-8 transition-all duration-500 ${!isSubscribed ? 'blur-md grayscale opacity-40 pointer-events-none select-none scale-[0.98]' : ''}`}>
                {/* Stepper Header */}
                <div className="relative flex justify-between items-start pt-6 pb-2">
                    {/* Connection Line */}
                    <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-muted -z-10" />
                    <div
                        className="absolute top-[52px] left-0 h-0.5 bg-primary transition-all duration-500 ease-in-out -z-10"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, idx) => {
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isActive ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30" :
                                        isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                            "bg-background border-muted text-muted-foreground"
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <div className="mt-3 text-center hidden md:block">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>Step {idx + 1}</span>
                                    <p className={`text-xs font-semibold mt-0.5 ${isActive ? "text-foreground" : "text-muted-foreground opacity-60"}`}>{step.title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="border-border shadow-soft overflow-hidden">
                            <CardHeader className="bg-muted/30 border-b border-border/50 py-8 px-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        {(() => {
                                            const Icon = steps[currentStep].icon;
                                            return <Icon className="w-6 h-6 text-primary" />;
                                        })()}
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
                                        <CardDescription className="text-sm mt-1">{steps[currentStep].description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-8">
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="univ">Select University</Label>
                                            <Select
                                                value={formData.university}
                                                onValueChange={(value) => setFormData({ ...formData, university: value })}
                                            >
                                                <SelectTrigger className="h-11">
                                                    <div className="flex items-center gap-3">
                                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                                        <SelectValue placeholder="Choose a university" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {UNIVERSITY_OPTIONS.map((univ) => (
                                                        <SelectItem key={univ} value={univ}>
                                                            {univ}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="program">Academic Program</Label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="program"
                                                    placeholder="e.g. Master in Information Technology"
                                                    value={formData.program}
                                                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                                    className="pl-10 h-11"
                                                />
                                            </div>
                                            <p className="text-[11px] text-muted-foreground pl-1">Choose the specific course or department you're applying for.</p>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" value={formData.fullName} readOnly className="bg-muted h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input id="email" value={formData.email} readOnly className="bg-muted h-11" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Statement of Purpose / Brief Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us about yourself and your academic goals..."
                                                className="min-h-[150px] resize-none"
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="bg-primary/5 p-4 rounded-lg flex items-start gap-4 border border-primary/10">
                                            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Please upload high-quality scans of your original documents. Formats allowed: PDF, JPG, PNG (Max 5MB each).
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: "Passport Scan", required: true },
                                                { name: "Academic Transcripts", required: true },
                                                { name: "IELTS/TOEFL Results", required: false },
                                                { name: "Medical Certificate", required: true },
                                            ].map((doc, idx) => (
                                                <div key={idx} className="p-5 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors group cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                                <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{doc.name}</p>
                                                                <p className="text-[10px] text-muted-foreground">{doc.required ? "Required" : "Optional"}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                                                            <Upload className="w-4 h-4 mr-1" /> Upload
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/20 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <p className="text-sm font-medium text-green-800">Everything looks good! Ready to submit.</p>
                                        </div>

                                        <div className="grid grid-cols-1 border border-border rounded-xl divide-y divide-border">
                                            <div className="p-6 flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">University & Program</p>
                                                    <p className="text-lg font-bold">{formData.university}</p>
                                                    <p className="text-sm text-primary font-medium">{formData.program}</p>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)} className="text-xs">Edit</Button>
                                            </div>
                                            <div className="p-6 flex items-start justify-between">
                                                <div className="w-full">
                                                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Personal Info</p>
                                                    <div className="flex gap-8">
                                                        <div>
                                                            <p className="text-xs text-muted-foreground mt-1 text-[10px]">Name</p>
                                                            <p className="text-sm font-medium">{formData.fullName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground mt-1 text-[10px]">Email</p>
                                                            <p className="text-sm font-medium">{formData.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-xs">Edit</Button>
                                            </div>
                                            <div className="p-6 flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Documents Uploaded</p>
                                                    <p className="text-sm font-medium">3/4 mandatory documents attached</p>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="text-xs">Edit</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 pb-12">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="h-11 px-6 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="h-11 px-8 gap-2 shadow-lg shadow-primary/25"
                    >
                        {currentStep === steps.length - 1 ? "Submit Application" : "Continue"}
                        {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            {/* Subscription Guard Modal */}
            {!isSubscribed && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/20 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full max-w-md"
                    >
                        <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-2xl">
                            <div className="bg-gradient-yinga h-3 w-full" />
                            <CardHeader className="text-center pt-8 pb-4">
                                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary/5">
                                    <Lock className="w-10 h-10 text-primary" />
                                </div>
                                <CardTitle className="text-3xl font-black italic tracking-tighter text-foreground uppercase">Access Restricted</CardTitle>
                                <CardDescription className="text-base font-medium mt-2 leading-relaxed px-4 text-muted-foreground italic">
                                    A service plan is required to start a new application.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                <div className="space-y-3 bg-muted/40 p-5 rounded-2xl border border-border/50">
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/80 italic">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Rocket className="w-3 h-3 text-green-600" />
                                        </div>
                                        100+ Top Chinese Universities
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-foreground/80 italic">
                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Star className="w-3 h-3 text-green-600" />
                                        </div>
                                        Personalized Matching Analysis
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        size="lg"
                                        className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-black italic tracking-tight gap-2 shadow-xl shadow-primary/20 rounded-2xl uppercase"
                                        onClick={() => navigate('/student/settings?tab=subscription')}
                                    >
                                        Choose My Plan <ArrowRight className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full h-12 font-black text-muted-foreground hover:text-foreground rounded-xl uppercase italic text-xs tracking-widest"
                                        onClick={() => navigate('/student/dashboard')}
                                    >
                                        Return to Dashboard
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
