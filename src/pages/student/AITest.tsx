import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, question: "Je préfère travailler seul(e) plutôt qu'en groupe.", category: "autonomie" },
  { id: 2, question: "Je m'adapte facilement à de nouveaux environnements.", category: "adaptabilité" },
  { id: 3, question: "Je gère bien la pression et les deadlines.", category: "stress" },
  { id: 4, question: "Je prends facilement des décisions sans demander l'avis des autres.", category: "autorité" },
  { id: 5, question: "Je supporte bien d'être loin de ma famille et de mes amis.", category: "solitude" },
  { id: 6, question: "Je suis à l'aise pour parler devant un groupe.", category: "autorité" },
  { id: 7, question: "Je peux gérer plusieurs tâches simultanément.", category: "stress" },
  { id: 8, question: "J'aime découvrir de nouvelles cultures.", category: "adaptabilité" },
  { id: 9, question: "Je suis capable de résoudre des problèmes de manière indépendante.", category: "autonomie" },
  { id: 10, question: "Je reste positif(ve) même dans les situations difficiles.", category: "stress" },
  { id: 11, question: "Je m'intègre facilement dans de nouveaux groupes sociaux.", category: "solitude" },
  { id: 12, question: "Je suis prêt(e) à apprendre une nouvelle langue.", category: "adaptabilité" },
  { id: 13, question: "Je suis organisé(e) dans mon travail quotidien.", category: "autonomie" },
  { id: 14, question: "Je sais diriger un projet d'équipe.", category: "autorité" },
  { id: 15, question: "Je peux vivre sans le confort habituel pendant un certain temps.", category: "adaptabilité" },
];

const options = [
  { label: "Pas du tout", value: 1 },
  { label: "Un peu", value: 2 },
  { label: "Modérément", value: 3 },
  { label: "Beaucoup", value: 4 },
  { label: "Tout à fait", value: 5 },
];

export default function AITest() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQ].id]: value }));
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
    }
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Test terminé ! 🎉</h2>
          <p className="text-muted-foreground">Vos résultats ont été analysés par notre IA. Découvrez votre profil psychologique et vos recommandations.</p>
          <Button size="lg" onClick={() => navigate("/student/ai-profile")} className="gap-2">
            Voir mon profil IA <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];
  const currentAnswer = answers[q.id];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Test d'orientation IA</h1>
            <p className="text-sm text-muted-foreground">Question {currentQ + 1} sur {questions.length}</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardContent className="pt-8 pb-6">
              <p className="text-lg font-medium text-foreground text-center mb-8">{q.question}</p>
              <div className="grid grid-cols-5 gap-2">
                {options.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center ${
                      currentAnswer === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-2xl font-bold">{opt.value}</span>
                    <span className="text-[10px] leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {currentQ > 0 && (
          <Button variant="outline" onClick={prev} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Précédent
          </Button>
        )}
        <Button
          className="flex-1 gap-1"
          onClick={next}
          disabled={!currentAnswer}
        >
          {currentQ < questions.length - 1 ? (
            <>Suivant <ArrowRight className="w-4 h-4" /></>
          ) : (
            "Terminer le test"
          )}
        </Button>
      </div>
    </div>
  );
}
