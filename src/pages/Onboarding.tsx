import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft, ArrowRight, Check, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

const steps = [
  { title: "Informations personnelles", subtitle: "Commençons par vos informations de base" },
  { title: "Localisation", subtitle: "D'où venez-vous et où résidez-vous ?" },
  { title: "Parcours académique", subtitle: "Parlez-nous de vos études" },
  { title: "Langues", subtitle: "Quelles langues parlez-vous ?" },
];

const languageLevels = ["Débutant", "Intermédiaire", "Avancé", "Natif"];

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
      <div className="hidden lg:flex lg:w-2/5 bg-secondary flex-col justify-between p-12">
        <Link to="/">
          <Logo imageClassName="h-16" />
        </Link>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                i < step ? "bg-primary text-primary-foreground" :
                i === step ? "bg-primary text-primary-foreground" :
                "bg-secondary-foreground/10 text-secondary-foreground/40"
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <div>
                <div className={`font-semibold ${i <= step ? "text-secondary-foreground" : "text-secondary-foreground/40"}`}>
                  {s.title}
                </div>
                <div className="text-sm text-secondary-foreground/50">{s.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-secondary-foreground/40">© 2026 Yinga Hub</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Link to="/" className="lg:hidden inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>

          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
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
                    <div><Label>Prénom</Label><Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Jean" className="mt-1" /></div>
                    <div><Label>Nom</Label><Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Dupont" className="mt-1" /></div>
                  </div>
                  <div><Label>Date de naissance</Label><Input type="date" value={form.dateOfBirth} onChange={e => update("dateOfBirth", e.target.value)} className="mt-1" /></div>
                  <div><Label>Téléphone</Label><Input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+237 6XX XXX XXX" className="mt-1" /></div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div><Label>Nationalité</Label><Input value={form.nationality} onChange={e => update("nationality", e.target.value)} placeholder="Camerounaise" className="mt-1" /></div>
                  <div><Label>Pays de résidence</Label><Input value={form.countryOfResidence} onChange={e => update("countryOfResidence", e.target.value)} placeholder="Cameroun" className="mt-1" /></div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Niveau d'études</Label>
                    <select
                      value={form.educationLevel}
                      onChange={e => update("educationLevel", e.target.value)}
                      className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="baccalaureat">Baccalauréat</option>
                      <option value="licence">Licence</option>
                      <option value="master">Master</option>
                      <option value="doctorat">Doctorat</option>
                    </select>
                  </div>
                  <div><Label>Domaine d'études</Label><Input value={form.fieldOfStudy} onChange={e => update("fieldOfStudy", e.target.value)} placeholder="Informatique, Médecine..." className="mt-1" /></div>
                  <div><Label>Moyenne générale (GPA)</Label><Input type="number" step="0.1" value={form.gpa} onChange={e => update("gpa", e.target.value)} placeholder="3.5" className="mt-1" /></div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  {form.languages.map((lang, i) => (
                    <div key={i} className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label>Langue</Label>
                        <Input value={lang.language} onChange={e => updateLanguage(i, "language", e.target.value)} placeholder="Français, Anglais, Chinois..." className="mt-1" />
                      </div>
                      <div className="flex-1">
                        <Label>Niveau</Label>
                        <select
                          value={lang.level}
                          onChange={e => updateLanguage(i, "level", e.target.value)}
                          className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value="">Niveau...</option>
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
                    <Plus className="w-4 h-4" /> Ajouter une langue
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Button>
            )}
            <Button
              className="flex-1 gap-1"
              onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
                else navigate("/student/dashboard");
              }}
            >
              {step < steps.length - 1 ? (
                <>Continuer <ArrowRight className="w-4 h-4" /></>
              ) : (
                "Créer mon profil"
              )}
            </Button>
          </div>

          {step === 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Se connecter</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
