import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { 
    User, 
    Calendar, 
    Globe, 
    BookOpen, 
    Target, 
    Languages, 
    Users, 
    ShieldCheck, 
    Rocket,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    X
} from "lucide-react";

interface QuestionnaireModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const steps = [
    { title: "Personal Info", icon: User },
    { title: "Academic", icon: BookOpen },
    { title: "Study Project", icon: Target },
    { title: "Languages", icon: Languages },
    { title: "Adaptation", icon: Users },
    { title: "Discipline", icon: ShieldCheck },
    { title: "Motivation", icon: Rocket }
];

export function QuestionnaireModal({ isOpen, onClose, onSubmit }: QuestionnaireModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({
        // Section 1: Personal
        fullName: "",
        dob: "",
        nationality: "",
        countryRes: "",
        whatsapp: "",
        email: "",
        // Section 2: Academic
        currentLevel: "",
        currentField: "",
        currentInstitution: "",
        gpa: "",
        strongestSubjects: "",
        difficultSubjects: "",
        // Section 3: Project
        chinaField: "",
        whyField: "",
        whyChina: "",
        otherCountries: "",
        // Section 4: Languages
        englishLevel: "Moyen",
        studiedMandarin: "Non",
        mandarinLevel: "",
        // Section 5: Adaptation
        livedAway: "Non",
        cultureReaction: "",
        readyMandarin: "Oui",
        // Section 6: Discipline
        profCritique: "",
        respectStrictFrame: "Oui",
        // Section 7: Motivation
        goals: "",
        concerns: ""
    });

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onSubmit(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl p-0 border-none bg-background rounded-3xl shadow-2xl overflow-hidden [&>button:last-child]:hidden">
                <div className="bg-gradient-yinga h-2 w-full" />
                
                <div className="max-h-[90vh] flex flex-col relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2 md:right-4 md:top-4 rounded-full border-[1.5px] border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 shadow-sm z-[70] transition-all duration-300 h-8 w-8"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4 stroke-[3px]" />
                    </Button>

                    {/* Stepper */}
                    <div className="px-4 md:px-8 pt-10 md:pt-12 pb-4 bg-muted/30 border-b border-border/50 sticky top-0 z-10 backdrop-blur-md shrink-0">
                        <div className="flex items-center justify-between mb-6 pr-4 md:pr-0">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 flex-1 relative">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                        idx <= currentStep ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
                                    }`}>
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-tighter hidden md:block ${
                                        idx <= currentStep ? "text-primary" : "text-muted-foreground"
                                    }`}>{step.title}</span>
                                    {idx < steps.length - 1 && (
                                        <div className={`absolute top-5 -right-1/2 w-full h-[2px] -z-10 ${
                                            idx < currentStep ? "bg-primary" : "bg-muted-foreground/10"
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="pr-10 md:pr-0">
                            <DialogTitle className="text-xl md:text-2xl font-black tracking-tighter uppercase text-foreground">
                                Academic Evaluation
                            </DialogTitle>
                            <DialogDescription className="text-xs md:text-sm font-medium mt-1 text-muted-foreground">
                                {currentStep === 0 && "Let's start with your personal information."}
                                {currentStep === 1 && "Tell us about your current academic status."}
                                {currentStep === 2 && "What are your study goals in China?"}
                                {currentStep > 2 && "Almost there! help us understand your profile better."}
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="p-4 md:p-8 overflow-y-auto flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Section 1: Personal */}
                            {currentStep === 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="As per passport" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date of Birth</Label>
                                        <Input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Nationality</Label>
                                        <Input value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} placeholder="Your country" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Country of Residence</Label>
                                        <Input value={formData.countryRes} onChange={e => setFormData({...formData, countryRes: e.target.value})} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>WhatsApp Number</Label>
                                        <Input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="+241..." className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-11" />
                                    </div>
                                </div>
                            )}

                            {/* Section 2: Academic */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Current Academic Level</Label>
                                        <RadioGroup value={formData.currentLevel} onValueChange={v => setFormData({...formData, currentLevel: v})} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {['Terminale', 'Bac obtained', 'Bachelor', 'Other'].map(level => (
                                                <div key={level} className="flex items-center space-x-2 p-3 rounded-xl border border-border/50 hover:bg-muted/50 transition-colors">
                                                    <RadioGroupItem value={level} id={level} />
                                                    <Label htmlFor={level} className="text-xs font-bold cursor-pointer">{level}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-2">
                                            <Label>Field of Study</Label>
                                            <Input value={formData.currentField} onChange={e => setFormData({...formData, currentField: e.target.value})} placeholder="e.g. Science, Arts..." className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Current Institution</Label>
                                            <Input value={formData.currentInstitution} onChange={e => setFormData({...formData, currentInstitution: e.target.value})} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>GPA (Current Average)</Label>
                                            <Input value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} placeholder="e.g. 15/20 or 3.5/4" className="h-11" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Strongest Subjects</Label>
                                            <Textarea value={formData.strongestSubjects} onChange={e => setFormData({...formData, strongestSubjects: e.target.value})} className="resize-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Most Difficult Subjects</Label>
                                            <Textarea value={formData.difficultSubjects} onChange={e => setFormData({...formData, difficultSubjects: e.target.value})} className="resize-none" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 3: Study Project */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Desired Field of Study in China</Label>
                                        <Input value={formData.chinaField} onChange={e => setFormData({...formData, chinaField: e.target.value})} className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Why did you choose this field?</Label>
                                        <Textarea value={formData.whyField} onChange={e => setFormData({...formData, whyField: e.target.value})} className="resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Why do you want to study in China?</Label>
                                        <Textarea value={formData.whyChina} onChange={e => setFormData({...formData, whyChina: e.target.value})} className="resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Have you considered other countries? (Specify)</Label>
                                        <Input value={formData.otherCountries} onChange={e => setFormData({...formData, otherCountries: e.target.value})} className="h-11" />
                                    </div>
                                </div>
                            )}

                            {/* Section 4: Languages */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="space-y-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <Label className="text-base font-bold">English Level</Label>
                                        <RadioGroup value={formData.englishLevel} onValueChange={v => setFormData({...formData, englishLevel: v})} className="flex gap-8">
                                            {['Beginner', 'Average', 'Good'].map(lv => (
                                                <div key={lv} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={lv} id={`eng-${lv}`} />
                                                    <Label htmlFor={`eng-${lv}`}>{lv}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <div className="space-y-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <Label className="text-base font-bold">Have you studied Mandarin?</Label>
                                        <RadioGroup value={formData.studiedMandarin} onValueChange={v => setFormData({...formData, studiedMandarin: v})} className="flex gap-8">
                                            {['Yes', 'No'].map(v => (
                                                <div key={v} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={v} id={`man-${v}`} />
                                                    <Label htmlFor={`man-${v}`}>{v}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {formData.studiedMandarin === 'Yes' && (
                                            <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                                <Label>Specify your level (HSK...)</Label>
                                                <Input value={formData.mandarinLevel} onChange={e => setFormData({...formData, mandarinLevel: e.target.value})} className="h-11 mt-2" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Section 5: Adaptation */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <Label>Have you ever lived away from your family?</Label>
                                        <RadioGroup value={formData.livedAway} onValueChange={v => setFormData({...formData, livedAway: v})} className="flex gap-8">
                                            {['Yes', 'No'].map(v => (
                                                <div key={v} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={v} id={`away-${v}`} />
                                                    <Label htmlFor={`away-${v}`}>{v}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>How do you react to a new environment or culture?</Label>
                                        <Textarea value={formData.cultureReaction} onChange={e => setFormData({...formData, cultureReaction: e.target.value})} className="resize-none" />
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Are you ready to learn Mandarin if necessary?</Label>
                                        <RadioGroup value={formData.readyMandarin} onValueChange={v => setFormData({...formData, readyMandarin: v})} className="flex gap-8">
                                            {['Yes', 'No'].map(v => (
                                                <div key={v} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={v} id={`ready-${v}`} />
                                                    <Label htmlFor={`ready-${v}`}>{v}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            )}

                            {/* Section 6: Discipline */}
                            {currentStep === 5 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>How do you react when a teacher critiques your work?</Label>
                                        <Textarea value={formData.profCritique} onChange={e => setFormData({...formData, profCritique: e.target.value})} className="resize-none" />
                                    </div>
                                    <div className="space-y-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <Label className="text-base font-bold">Can you respect a strict academic framework?</Label>
                                        <RadioGroup value={formData.respectStrictFrame} onValueChange={v => setFormData({...formData, respectStrictFrame: v})} className="flex gap-8 mt-2">
                                            {['Yes', 'No'].map(v => (
                                                <div key={v} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={v} id={`strict-${v}`} />
                                                    <Label htmlFor={`strict-${v}`}>{v}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            )}

                            {/* Section 7: Motivation */}
                            {currentStep === 6 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>What are your goals after your studies?</Label>
                                        <Textarea value={formData.goals} onChange={e => setFormData({...formData, goals: e.target.value})} className="min-h-[100px] resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>What are your main concerns about studying abroad?</Label>
                                        <Textarea value={formData.concerns} onChange={e => setFormData({...formData, concerns: e.target.value})} className="min-h-[100px] resize-none" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                            By submitting this questionnaire, you agree that YINGA HUB will analyze your profile to provide the best university matches.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer buttons */}
                    <div className="flex items-center justify-between mt-8 md:mt-12 gap-4 pb-4 md:pb-0">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`rounded-2xl h-12 md:h-14 px-4 md:px-8 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${currentStep === 0 ? 'opacity-0' : 'opacity-100'}`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="rounded-2xl h-12 md:h-14 px-6 md:px-10 font-black uppercase tracking-tight shadow-xl shadow-primary/25 gap-2 text-xs md:text-sm"
                        >
                            {currentStep === steps.length - 1 ? "Submit Profile" : "Continue"}
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                    </div>
                </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
