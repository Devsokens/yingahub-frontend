import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { title: "Créer votre compte", subtitle: "Commencez par vos informations de base" },
  { title: "Profil académique", subtitle: "Dites-nous en plus sur votre parcours" },
  { title: "Vos objectifs", subtitle: "Quel est votre rêve d'études en Chine ?" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "",
    country: "", level: "", field: "",
    goal: "", budget: "",
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex lg:w-2/5 bg-secondary flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-secondary-foreground">Yinga Hub</span>
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

        <p className="text-sm text-secondary-foreground/40">© 2025 Yinga Hub</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Link to="/" className="lg:hidden inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>

          {/* Progress */}
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
                    <div>
                      <Label>Prénom</Label>
                      <Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Jean" className="mt-1" />
                    </div>
                    <div>
                      <Label>Nom</Label>
                      <Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Dupont" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="votre@email.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>Mot de passe</Label>
                    <Input type="password" value={form.password} onChange={e => update("password", e.target.value)} placeholder="••••••••" className="mt-1" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label>Pays de résidence</Label>
                    <Input value={form.country} onChange={e => update("country", e.target.value)} placeholder="Cameroun" className="mt-1" />
                  </div>
                  <div>
                    <Label>Niveau d'études actuel</Label>
                    <Input value={form.level} onChange={e => update("level", e.target.value)} placeholder="Licence, Master..." className="mt-1" />
                  </div>
                  <div>
                    <Label>Domaine d'études</Label>
                    <Input value={form.field} onChange={e => update("field", e.target.value)} placeholder="Informatique, Médecine..." className="mt-1" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Objectif principal</Label>
                    <Input value={form.goal} onChange={e => update("goal", e.target.value)} placeholder="Obtenir une bourse pour un Master" className="mt-1" />
                  </div>
                  <div>
                    <Label>Budget estimé (USD)</Label>
                    <Input value={form.budget} onChange={e => update("budget", e.target.value)} placeholder="5000" className="mt-1" />
                  </div>
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
                // else submit
              }}
            >
              {step < steps.length - 1 ? (
                <>Continuer <ArrowRight className="w-4 h-4" /></>
              ) : (
                "Créer mon compte"
              )}
            </Button>
          </div>

          {step === 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
