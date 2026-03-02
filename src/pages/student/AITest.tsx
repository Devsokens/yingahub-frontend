import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  question: string;
  category: "autonomie" | "adaptabilité" | "stress" | "autorité" | "solitude";
  options: { label: string; value: number }[];
};

const categoryColors: Record<string, string> = {
  autonomie: "bg-violet-100 text-violet-700",
  adaptabilité: "bg-blue-100 text-blue-700",
  stress: "bg-amber-100 text-amber-700",
  autorité: "bg-rose-100 text-rose-700",
  solitude: "bg-emerald-100 text-emerald-700",
};

const categoryLabels: Record<string, string> = {
  autonomie: "🧠 Autonomie",
  adaptabilité: "🌍 Adaptabilité",
  stress: "⚡ Gestion du stress",
  autorité: "👑 Leadership",
  solitude: "💚 Indépendance",
};

const questions: Question[] = [
  {
    id: 1,
    question: "Comment réagissez-vous face à un problème inattendu quand vous êtes seul(e) ?",
    category: "autonomie",
    options: [
      { label: "J'attends de l'aide, je ne sais pas quoi faire", value: 1 },
      { label: "Je demande conseil avant d'agir", value: 2 },
      { label: "J'essaie de trouver une solution, mais j'ai besoin de validation", value: 3 },
      { label: "Je prends l'initiative de résoudre le problème", value: 4 },
      { label: "Je suis très à l'aise pour gérer seul(e) les imprévus", value: 5 },
    ],
  },
  {
    id: 2,
    question: "Vous arrivez dans une ville où personne ne parle votre langue. Que faites-vous ?",
    category: "adaptabilité",
    options: [
      { label: "Je panique et je cherche immédiatement à rentrer", value: 1 },
      { label: "Je reste dans ma zone de confort et évite les interactions", value: 2 },
      { label: "J'utilise un traducteur et je me débrouille pour les besoins de base", value: 3 },
      { label: "Je tente de communiquer avec des gestes et quelques mots", value: 4 },
      { label: "J'adore ce genre de défi, je m'adapte rapidement", value: 5 },
    ],
  },
  {
    id: 3,
    question: "Vous avez 3 examens la même semaine et un projet à rendre. Comment réagissez-vous ?",
    category: "stress",
    options: [
      { label: "Je suis complètement submergé(e) et je ne sais pas par où commencer", value: 1 },
      { label: "Je stresse beaucoup mais j'essaie de m'organiser à la dernière minute", value: 2 },
      { label: "Je fais un planning mais j'ai du mal à le respecter", value: 3 },
      { label: "Je gère bien la pression et je m'organise efficacement", value: 4 },
      { label: "Je suis motivé(e) par la pression, ça me pousse à donner le meilleur", value: 5 },
    ],
  },
  {
    id: 4,
    question: "Dans un travail de groupe, quel rôle prenez-vous naturellement ?",
    category: "autorité",
    options: [
      { label: "Je suis les instructions des autres sans donner mon avis", value: 1 },
      { label: "Je participe mais je laisse les autres décider", value: 2 },
      { label: "Je propose des idées mais je ne m'impose pas", value: 3 },
      { label: "Je coordonne souvent le groupe et répartis les tâches", value: 4 },
      { label: "Je prends naturellement le lead et motive l'équipe", value: 5 },
    ],
  },
  {
    id: 5,
    question: "Imaginez passer 6 mois loin de votre famille et vos amis. Comment vous sentez-vous ?",
    category: "solitude",
    options: [
      { label: "C'est impossible, je ne pourrais pas le supporter", value: 1 },
      { label: "Ce serait très difficile, j'aurais besoin de contact constant", value: 2 },
      { label: "Ce serait un défi mais je pourrais m'y adapter", value: 3 },
      { label: "Je serais à l'aise, les appels vidéo suffiraient", value: 4 },
      { label: "Aucun problème, j'aime mon indépendance", value: 5 },
    ],
  },
  {
    id: 6,
    question: "On vous demande de présenter un projet devant 50 personnes. Quelle est votre réaction ?",
    category: "autorité",
    options: [
      { label: "Je refuse catégoriquement, c'est trop stressant", value: 1 },
      { label: "J'accepte mais avec beaucoup d'anxiété", value: 2 },
      { label: "Je suis nerveux(se) mais je me prépare bien", value: 3 },
      { label: "Je suis assez à l'aise, j'aime partager mes idées", value: 4 },
      { label: "J'adore ça, c'est une opportunité de briller", value: 5 },
    ],
  },
  {
    id: 7,
    question: "Vous recevez plusieurs tâches urgentes en même temps. Que faites-vous ?",
    category: "stress",
    options: [
      { label: "Je suis paralysé(e) et je ne fais rien", value: 1 },
      { label: "Je fais tout en même temps et le résultat est médiocre", value: 2 },
      { label: "Je priorise mais avec difficulté", value: 3 },
      { label: "Je priorise efficacement et je gère une tâche à la fois", value: 4 },
      { label: "Je suis multitâche et je gère tout simultanément", value: 5 },
    ],
  },
  {
    id: 8,
    question: "On vous propose de goûter un plat totalement inconnu d'une autre culture. Votre réaction ?",
    category: "adaptabilité",
    options: [
      { label: "Non merci, je préfère ce que je connais", value: 1 },
      { label: "J'hésite beaucoup mais je pourrais essayer un petit peu", value: 2 },
      { label: "Pourquoi pas, si ça a l'air appétissant", value: 3 },
      { label: "Oui, j'aime découvrir de nouvelles saveurs", value: 4 },
      { label: "Absolument ! C'est ce que je préfère en voyage", value: 5 },
    ],
  },
  {
    id: 9,
    question: "Votre ordinateur tombe en panne la veille d'un rendu important. Que faites-vous ?",
    category: "autonomie",
    options: [
      { label: "Je pleure et j'abandonne", value: 1 },
      { label: "J'appelle quelqu'un pour m'aider immédiatement", value: 2 },
      { label: "Je cherche des solutions en ligne et demande de l'aide", value: 3 },
      { label: "Je trouve une alternative rapidement (bibliothèque, ami...)", value: 4 },
      { label: "J'ai toujours un plan B, je suis préparé(e) à ce genre de situation", value: 5 },
    ],
  },
  {
    id: 10,
    question: "Après un échec important (examen raté, rejet...), comment réagissez-vous ?",
    category: "stress",
    options: [
      { label: "Je suis dévasté(e) pendant longtemps", value: 1 },
      { label: "Je suis très affecté(e) mais je finis par m'en remettre", value: 2 },
      { label: "Je suis déçu(e) mais j'analyse ce qui n'a pas marché", value: 3 },
      { label: "Je rebondis vite et je me concentre sur la prochaine étape", value: 4 },
      { label: "L'échec me motive encore plus à réussir", value: 5 },
    ],
  },
  {
    id: 11,
    question: "Vous êtes dans une soirée où vous ne connaissez personne. Que faites-vous ?",
    category: "solitude",
    options: [
      { label: "Je pars rapidement, je suis trop mal à l'aise", value: 1 },
      { label: "Je reste dans un coin en espérant que quelqu'un vienne me parler", value: 2 },
      { label: "J'observe d'abord puis j'engage la conversation prudemment", value: 3 },
      { label: "Je vais vers les gens et je me présente", value: 4 },
      { label: "Je suis le centre de la soirée en quelques minutes", value: 5 },
    ],
  },
  {
    id: 12,
    question: "Seriez-vous prêt(e) à apprendre le mandarin pour étudier en Chine ?",
    category: "adaptabilité",
    options: [
      { label: "Non, c'est trop difficile pour moi", value: 1 },
      { label: "Peut-être, si c'est obligatoire", value: 2 },
      { label: "Oui, mais j'aurais besoin de beaucoup de soutien", value: 3 },
      { label: "Oui, j'aime apprendre de nouvelles langues", value: 4 },
      { label: "Absolument, c'est même ce qui m'excite le plus dans ce projet", value: 5 },
    ],
  },
  {
    id: 13,
    question: "Comment gérez-vous vos études et votre emploi du temps au quotidien ?",
    category: "autonomie",
    options: [
      { label: "Je n'ai pas vraiment d'organisation, je fais au jour le jour", value: 1 },
      { label: "J'essaie de m'organiser mais j'oublie souvent des choses", value: 2 },
      { label: "J'utilise un agenda mais je ne le suis pas toujours", value: 3 },
      { label: "Je suis bien organisé(e) avec un planning clair", value: 4 },
      { label: "Je suis ultra-organisé(e), chaque heure est planifiée", value: 5 },
    ],
  },
  {
    id: 14,
    question: "Un ami vous demande de diriger un projet associatif important. Votre réaction ?",
    category: "autorité",
    options: [
      { label: "Je refuse, trop de responsabilités", value: 1 },
      { label: "J'hésite beaucoup, je ne suis pas sûr(e) de mes capacités", value: 2 },
      { label: "J'accepte mais je cherche un co-leader", value: 3 },
      { label: "J'accepte avec enthousiasme et je commence à planifier", value: 4 },
      { label: "C'est exactement le genre de défi que j'adore relever", value: 5 },
    ],
  },
  {
    id: 15,
    question: "Vous devez vivre dans un logement modeste pendant vos études à l'étranger. Qu'en pensez-vous ?",
    category: "adaptabilité",
    options: [
      { label: "C'est inacceptable, j'ai besoin de mon confort", value: 1 },
      { label: "Ce serait très difficile pour moi", value: 2 },
      { label: "Je pourrais m'y faire si c'est temporaire", value: 3 },
      { label: "Pas de problème, l'essentiel c'est les études", value: 4 },
      { label: "Ça fait partie de l'aventure, j'aime sortir de ma zone de confort", value: 5 },
    ],
  },
];

export default function AITest() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: value }));
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
          <p className="text-muted-foreground">
            Vos résultats ont été analysés par notre IA. Découvrez votre profil psychologique et vos recommandations.
          </p>
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
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Test d'Orientation IA</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQ + 1} sur {questions.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/student/dashboard")} className="text-muted-foreground">
            Quitter
          </Button>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-8 pb-6 px-6 md:px-8">
              {/* Category badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${categoryColors[q.category]}`}>
                  <Sparkles className="w-3 h-3" />
                  {categoryLabels[q.category]}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-xl font-semibold text-foreground mb-8 leading-relaxed">{q.question}</h2>

              {/* Options as radio-style list */}
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      currentAnswer === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        currentAnswer === opt.value ? "border-primary" : "border-muted-foreground/30"
                      }`}
                    >
                      {currentAnswer === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-sm ${
                        currentAnswer === opt.value ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {currentQ > 0 ? (
          <Button variant="outline" onClick={prev} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Précédent
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={next} disabled={!currentAnswer} className="gap-1">
          {currentQ < questions.length - 1 ? (
            <>
              Suivant <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            "Terminer le test"
          )}
        </Button>
      </div>
    </div>
  );
}
