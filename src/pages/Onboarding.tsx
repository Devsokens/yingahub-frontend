import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

const steps = [
  { title: "Personal Information", subtitle: "Let's start with your basic details" },
  { title: "Location", subtitle: "Where are you from and where do you live?" },
  { title: "Academic Background", subtitle: "Tell us about your studies" },
  { title: "Languages", subtitle: "Which languages do you speak?" },
];

const languageLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", dateOfBirth: "", phone: "",
    nationality: "", countryOfResidence: "",
    educationLevel: "", fieldOfStudy: "", gpa: "",
    languages: [{ language: "", level: "" }],
  });

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const addLanguage = () => update("languages", [...form.languages, { language: "", level: "" }]);
  const removeLanguage = (i: number) => update("languages", form.languages.filter((_, j) => j !== i));
  const updateLanguage = (i: number, key: string, value: string) => {
    const langs = [...form.languages];
    langs[i] = { ...langs[i], [key]: value };
    update("languages", langs);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-secondary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <Link to="/" className="relative z-10">
          <Logo imageClassName="h-16" />
        </Link>

        <div className="space-y-6 relative z-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${i < step ? "bg-primary text-white" :
                i === step ? "bg-primary text-white shadow-lg shadow-primary/30" :
                  "bg-secondary-foreground/10 text-secondary-foreground/40"
                }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <div>
                <div className={`font-semibold transition-colors ${i <= step ? "text-secondary-foreground" : "text-secondary-foreground/40"}`}>
                  {s.title}
                </div>
                <div className="text-sm text-secondary-foreground/50">{s.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-secondary-foreground/40 relative z-10">© 2026 Yinga Hub</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Link to="/" className="lg:hidden inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-1">{steps[step].title}</h2>
              <p className="text-muted-foreground mb-8">{steps[step].subtitle}</p>

              {step === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>First Name</Label><Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" className="mt-1" /></div>
                    <div><Label>Last Name</Label><Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe" className="mt-1" /></div>
                  </div>
                  <div><Label>Date of Birth</Label><Input type="date" value={form.dateOfBirth} onChange={e => update("dateOfBirth", e.target.value)} className="mt-1" /></div>
                  <div><Label>Phone</Label><Input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+237 6XX XXX XXX" className="mt-1" /></div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div><Label>Nationality</Label><Input value={form.nationality} onChange={e => update("nationality", e.target.value)} placeholder="Gabonese" className="mt-1" /></div>
                  <div><Label>Country of Residence</Label><Input value={form.countryOfResidence} onChange={e => update("countryOfResidence", e.target.value)} placeholder="Gabon" className="mt-1" /></div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Education Level</Label>
                    <select
                      value={form.educationLevel}
                      onChange={e => update("educationLevel", e.target.value)}
                      className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Select...</option>
                      <option value="high_school">High School / Baccalaureate</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD / Doctorate</option>
                    </select>
                  </div>
                  <div><Label>Field of Study</Label><Input value={form.fieldOfStudy} onChange={e => update("fieldOfStudy", e.target.value)} placeholder="Computer Science, Medicine..." className="mt-1" /></div>
                  <div><Label>GPA (General Average)</Label><Input type="number" step="0.1" value={form.gpa} onChange={e => update("gpa", e.target.value)} placeholder="3.5" className="mt-1" /></div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {form.languages.map((lang, i) => (
                    <div key={i} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label>Language</Label>
                        <Input value={lang.language} onChange={e => updateLanguage(i, "language", e.target.value)} placeholder="English, French, Mandarin..." className="mt-1" />
                      </div>
                      <div className="flex-1">
                        <Label>Level</Label>
                        <select
                          value={lang.level}
                          onChange={e => updateLanguage(i, "level", e.target.value)}
                          className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Level...</option>
                          {languageLevels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      {form.languages.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeLanguage(i)} className="shrink-0 text-destructive">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addLanguage} className="gap-1">
                    <Plus className="w-4 h-4" /> Add a language
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            )}
            <Button
              className="flex-1 gap-1 bg-gradient-yinga text-white"
              onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
                else navigate("/student/dashboard");
              }}
            >
              {step < steps.length - 1 ? (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              ) : (
                "Create My Profile"
              )}
            </Button>
          </div>

          {step === 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
