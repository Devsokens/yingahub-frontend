import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "income_range",
    question: "Quel est le revenu mensuel du foyer ?",
    type: "radio",
    options: [
      { value: "below_500", label: "Moins de 500 000 FCFA" },
      { value: "500_1000", label: "500 000 – 1 000 000 FCFA" },
      { value: "1000_2000", label: "1 000 000 – 2 000 000 FCFA" },
      { value: "above_2000", label: "Plus de 2 000 000 FCFA" },
    ],
  },
  {
    id: "funding_source",
    question: "Quelle sera la source principale de financement ?",
    type: "radio",
    options: [
      { value: "personal", label: "Épargne personnelle / familiale" },
      { value: "loan", label: "Prêt bancaire" },
      { value: "scholarship", label: "Bourse (déjà obtenue ou en cours)" },
      { value: "mixed", label: "Financement mixte" },
    ],
  },
  {
    id: "budget_annual",
    question: "Quel budget annuel pouvez-vous consacrer aux études ?",
    type: "radio",
    options: [
      { value: "economy", label: "Moins de 3 000 000 FCFA (Économique)" },
      { value: "standard", label: "3 000 000 – 6 000 000 FCFA (Standard)" },
      { value: "premium", label: "6 000 000 – 10 000 000 FCFA (Premium)" },
      { value: "luxury", label: "Plus de 10 000 000 FCFA (Luxe)" },
    ],
  },
  {
    id: "scholarship_interest",
    question: "Êtes-vous intéressé par des bourses d'études chinoises ?",
    type: "radio",
    options: [
      { value: "yes_priority", label: "Oui, c'est une priorité" },
      { value: "yes_nice", label: "Oui, si possible" },
      { value: "no", label: "Non, le budget est couvert" },
    ],
  },
  {
    id: "housing_preference",
    question: "Quel type de logement préférez-vous pour votre enfant ?",
    type: "radio",
    options: [
      { value: "campus", label: "Résidence universitaire (économique)" },
      { value: "shared", label: "Appartement partagé" },
      { value: "private", label: "Appartement privé" },
    ],
  },
  {
    id: "duration",
    question: "Quelle durée d'études envisagez-vous ?",
    type: "select",
    options: [
      { value: "1", label: "1 an (formation courte / langue)" },
      { value: "2", label: "2 ans (Master)" },
      { value: "3", label: "3 ans (Licence restante)" },
      { value: "4", label: "4 ans (Licence complète)" },
      { value: "5+", label: "5+ ans (Doctorat)" },
    ],
  },
  {
    id: "additional_support",
    question: "Avez-vous besoin d'un accompagnement pour le financement ?",
    type: "radio",
    options: [
      { value: "yes", label: "Oui, aidez-moi à trouver des options" },
      { value: "partial", label: "J'ai besoin de conseils ponctuels" },
      { value: "no", label: "Non, tout est déjà planifié" },
    ],
  },
];

export default function FinancialProfile() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const current = questions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [current.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="text-center">
            <CardContent className="pt-10 pb-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Profil financier complété !</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Merci d'avoir rempli le questionnaire. Nous allons adapter nos recommandations
                en fonction de votre profil financier.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto">
                <Card className="border-primary/20">
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-xs text-muted-foreground">Budget estimé</p>
                    <p className="text-lg font-bold text-primary">Standard</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="pt-4 pb-4 text-center">
                    <p className="text-xs text-muted-foreground">Bourse</p>
                    <p className="text-lg font-bold text-primary">Recommandée</p>
                  </CardContent>
                </Card>
              </div>
              <Button className="mt-4" onClick={() => { setCompleted(false); setCurrentStep(0); }}>
                Modifier mes réponses
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          Questionnaire financier
        </h1>
        <p className="text-muted-foreground mt-1">Question {currentStep + 1} sur {questions.length}</p>
      </div>

      <Progress value={progress} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{current.question}</CardTitle>
              <CardDescription>Sélectionnez la réponse la plus appropriée</CardDescription>
            </CardHeader>
            <CardContent>
              {current.type === "radio" && (
                <RadioGroup
                  value={answers[current.id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {current.options.map((opt) => (
                    <div
                      key={opt.value}
                      className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                        answers[current.id] === opt.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                      onClick={() => handleAnswer(opt.value)}
                    >
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="cursor-pointer flex-1">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {current.type === "select" && (
                <Select value={answers[current.id] || ""} onValueChange={handleAnswer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une option" />
                  </SelectTrigger>
                  <SelectContent>
                    {current.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
        </Button>
        <Button onClick={handleNext} disabled={!answers[current.id]}>
          {currentStep === questions.length - 1 ? "Terminer" : "Suivant"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
