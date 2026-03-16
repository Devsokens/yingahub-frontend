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
  autonomie: "🧠 Autonomy",
  adaptabilité: "🌍 Adaptability",
  stress: "⚡ Stress Management",
  autorité: "👑 Leadership",
  solitude: "💚 Independence",
};

const questions: Question[] = [
  {
    id: 1,
    question: "How do you react to an unexpected problem when you are alone?",
    category: "autonomie",
    options: [
      { label: "I wait for help, I don't know what to do", value: 1 },
      { label: "I ask for advice before acting", value: 2 },
      { label: "I try to find a solution, but I need validation", value: 3 },
      { label: "I take the initiative to solve the problem", value: 4 },
      { label: "I am very comfortable managing unexpected situations alone", value: 5 },
    ],
  },
  {
    id: 2,
    question: "You arrive in a city where no one speaks your language. What do you do?",
    category: "adaptabilité",
    options: [
      { label: "I panic and look to return immediately", value: 1 },
      { label: "I stay in my comfort zone and avoid interactions", value: 2 },
      { label: "I use a translator and manage for basic needs", value: 3 },
      { label: "I try to communicate with gestures and a few words", value: 4 },
      { label: "I love this kind of challenge, I adapt quickly", value: 5 },
    ],
  },
  {
    id: 3,
    question: "You have 3 exams in the same week and a project to submit. How do you react?",
    category: "stress",
    options: [
      { label: "I am completely overwhelmed and don't know where to start", value: 1 },
      { label: "I stress a lot but try to organize at the last minute", value: 2 },
      { label: "I make a schedule but have trouble sticking to it", value: 3 },
      { label: "I handle pressure well and organize effectively", value: 4 },
      { label: "I am motivated by pressure, it pushes me to do my best", value: 5 },
    ],
  },
  {
    id: 4,
    question: "In a group work, what role do you naturally take?",
    category: "autorité",
    options: [
      { label: "I follow instructions from others without giving my opinion", value: 1 },
      { label: "I participate but let others decide", value: 2 },
      { label: "I suggest ideas but don't impose myself", value: 3 },
      { label: "I often coordinate the group and distribute tasks", value: 4 },
      { label: "I naturally take the lead and motivate the team", value: 5 },
    ],
  },
  {
    id: 5,
    question: "Imagine spending 6 months away from your family and friends. How do you feel?",
    category: "solitude",
    options: [
      { label: "It's impossible, I couldn't stand it", value: 1 },
      { label: "It would be very difficult, I would need constant contact", value: 2 },
      { label: "It would be a challenge but I could adapt", value: 3 },
      { label: "I would be comfortable, video calls would be enough", value: 4 },
      { label: "No problem, I love my independence", value: 5 },
    ],
  },
  {
    id: 6,
    question: "You are asked to present a project in front of 50 people. What is your reaction?",
    category: "autorité",
    options: [
      { label: "I categorically refuse, it's too stressful", value: 1 },
      { label: "I accept but with a lot of anxiety", value: 2 },
      { label: "I am nervous but I prepare well", value: 3 },
      { label: "I am fairly comfortable, I like sharing my ideas", value: 4 },
      { label: "I love it, it's an opportunity to shine", value: 5 },
    ],
  },
  {
    id: 7,
    question: "You receive several urgent tasks at the same time. What do you do?",
    category: "stress",
    options: [
      { label: "I am paralyzed and do nothing", value: 1 },
      { label: "I do everything at once and the result is mediocre", value: 2 },
      { label: "I prioritize but with difficulty", value: 3 },
      { label: "I prioritize effectively and handle one task at a time", value: 4 },
      { label: "I am multi-tasking and handle everything simultaneously", value: 5 },
    ],
  },
  {
    id: 8,
    question: "You are offered to taste a completely unknown dish from another culture. Your reaction?",
    category: "adaptabilité",
    options: [
      { label: "No thanks, I prefer what I know", value: 1 },
      { label: "I hesitate a lot but I might try a little", value: 2 },
      { label: "Why not, if it looks appetizing", value: 3 },
      { label: "Yes, I like discovering new flavors", value: 4 },
      { label: "Absolutely! That's what I prefer when traveling", value: 5 },
    ],
  },
  {
    id: 9,
    question: "Your computer breaks down the day before an important deadline. What do you do?",
    category: "autonomie",
    options: [
      { label: "I cry and give up", value: 1 },
      { label: "I call someone to help me immediately", value: 2 },
      { label: "I search for solutions online and ask for help", value: 3 },
      { label: "I find an alternative quickly (library, friend...)", value: 4 },
      { label: "I always have a plan B, I am prepared for this kind of situation", value: 5 },
    ],
  },
  {
    id: 10,
    question: "After an important failure (failed exam, rejection...), how do you react?",
    category: "stress",
    options: [
      { label: "I am devastated for a long time", value: 1 },
      { label: "I am very affected but I eventually get over it", value: 2 },
      { label: "I am disappointed but I analyze what didn't work", value: 3 },
      { label: "I bounce back fast and focus on the next step", value: 4 },
      { label: "Failure motivates me even more to succeed", value: 5 },
    ],
  },
  {
    id: 11,
    question: "You are at a party where you know no one. What do you do?",
    category: "solitude",
    options: [
      { label: "I leave quickly, I am too uncomfortable", value: 1 },
      { label: "I stay in a corner hoping someone comes to talk to me", value: 2 },
      { label: "I observe first then engage in conversation carefully", value: 3 },
      { label: "I go to people and introduce myself", value: 4 },
      { label: "I am the center of the party in a few minutes", value: 5 },
    ],
  },
  {
    id: 12,
    question: "Would you be ready to learn Mandarin to study in China?",
    category: "adaptabilité",
    options: [
      { label: "No, it's too difficult for me", value: 1 },
      { label: "Maybe, if it's mandatory", value: 2 },
      { label: "Yes, but I would need a lot of support", value: 3 },
      { label: "Yes, I like learning new languages", value: 4 },
      { label: "Absolutely, it's even what excites me most about this project", value: 5 },
    ],
  },
  {
    id: 13,
    question: "How do you manage your studies and schedule daily?",
    category: "autonomie",
    options: [
      { label: "I don't really have organization, I do it day by day", value: 1 },
      { label: "I try to organize but often forget things", value: 2 },
      { label: "I use a planner but don't always follow it", value: 3 },
      { label: "I am well organized with a clear schedule", value: 4 },
      { label: "I am ultra-organized, every hour is planned", value: 5 },
    ],
  },
  {
    id: 14,
    question: "A friend asks you to lead an important associative project. Your reaction?",
    category: "autorité",
    options: [
      { label: "I refuse, too much responsibility", value: 1 },
      { label: "I hesitate a lot, I'm not sure of my abilities", value: 2 },
      { label: "I accept but look for a co-leader", value: 3 },
      { label: "I accept with enthusiasm and start planning", value: 4 },
      { label: "This is exactly the type of challenge I love taking on", value: 5 },
    ],
  },
  {
    id: 15,
    question: "You have to live in modest housing during your studies abroad. What do you think?",
    category: "adaptabilité",
    options: [
      { label: "It's unacceptable, I need my comfort", value: 1 },
      { label: "It would be very difficult for me", value: 2 },
      { label: "I could get used to it if it's temporary", value: 3 },
      { label: "No problem, the most important thing is the studies", value: 4 },
      { label: "It's part of the adventure, I like getting out of my comfort zone", value: 5 },
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
          <h2 className="text-2xl font-bold text-foreground">Test finished! 🎉</h2>
          <p className="text-muted-foreground">
            Your results have been analyzed by our AI. Discover your psychological profile and recommendations.
          </p>
          <Button size="lg" onClick={() => navigate("/student/ai-profile")} className="gap-2">
            View my AI Profile <ArrowRight className="w-4 h-4" />
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
              <h1 className="text-lg font-bold text-foreground">AI Orientation Test</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQ + 1} of {questions.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/student/dashboard")} className="text-muted-foreground">
            Quit
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
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${currentAnswer === opt.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                      }`}
                  >
                    {/* Radio circle */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${currentAnswer === opt.value ? "border-primary" : "border-muted-foreground/30"
                        }`}
                    >
                      {currentAnswer === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-sm ${currentAnswer === opt.value ? "text-foreground font-medium" : "text-muted-foreground"
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
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={next} disabled={!currentAnswer} className="gap-1">
          {currentQ < questions.length - 1 ? (
            <>
              Next <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            "Finish Test"
          )}
        </Button>
      </div>
    </div>
  );
}
