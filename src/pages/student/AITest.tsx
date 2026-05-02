import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Zap, Shield, Target, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  question: string;
  category: "autonomie" | "adaptabilité" | "stress" | "autorité" | "solitude";
  icon: any;
  options: { label: string; value: number }[];
};

const categoryColors: Record<string, string> = {
  autonomie: "bg-violet-500/10 text-violet-600 border-violet-200",
  adaptabilité: "bg-blue-500/10 text-blue-600 border-blue-200",
  stress: "bg-amber-500/10 text-amber-600 border-amber-200",
  autorité: "bg-rose-500/10 text-rose-600 border-rose-200",
  solitude: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
};

const categoryLabels: Record<string, string> = {
  autonomie: "Autonomy",
  adaptabilité: "Adaptability",
  stress: "Stress Management",
  autorité: "Leadership",
  solitude: "Independence",
};

const questions: Question[] = [
  {
    id: 1,
    question: "How do you react to an unexpected problem when you are alone?",
    category: "autonomie",
    icon: Brain,
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
    icon: Globe,
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
    icon: Zap,
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
    icon: Target,
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
    icon: Heart,
    options: [
      { label: "It's impossible, I couldn't stand it", value: 1 },
      { label: "It would be very difficult, I would need constant contact", value: 2 },
      { label: "It would be a challenge but I could adapt", value: 3 },
      { label: "I would be comfortable, video calls would be enough", value: 4 },
      { label: "No problem, I love my independence", value: 5 },
    ],
  },
];

// Helper for globe icon which was missing from imports
const Globe = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function AITest() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: value }));
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setCompleted(true);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const prev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <Brain className="w-12 h-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground">AI Analysis in Progress</h2>
          <p className="text-muted-foreground font-medium">Crunching your answers to build your psychological profile...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-green-500/10 flex items-center justify-center mx-auto shadow-xl shadow-green-500/5">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter uppercase text-foreground">Test Completed!</h2>
            <p className="text-muted-foreground text-lg font-medium max-w-md mx-auto">
              Your results are ready. Our AI has generated a detailed profile of your academic and cultural compatibility.
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={() => navigate("/student/ai-profile")} 
            className="h-16 px-10 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30 gap-3 group"
          >
            Discover My AI Profile <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];
  const currentAnswer = answers[q.id];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg border border-primary/20">
              <Brain className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter text-foreground">Orientation Engine</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary border-none">
                  AI Powered
                </Badge>
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/student/dashboard")} className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground hover:text-foreground">
            Save & Exit
          </Button>
        </div>
        <div className="relative pt-1">
          <Progress value={progress} className="h-2 rounded-full bg-muted shadow-inner" />
          <motion.div 
            className="absolute top-0 right-0 -translate-y-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="border-border/50 shadow-2xl shadow-primary/5 rounded-[40px] overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="mb-8">
                <Badge className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-colors ${categoryColors[q.category]}`}>
                  <q.icon className="w-3.5 h-3.5 mr-2" />
                  {categoryLabels[q.category]}
                </Badge>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-12 leading-[1.2] tracking-tight">
                {q.question}
              </h2>

              <div className="space-y-4">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all text-left group ${
                      currentAnswer === opt.value
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/30 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          currentAnswer === opt.value 
                            ? "border-primary bg-primary text-white scale-110" 
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {currentAnswer === opt.value ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-xs font-black text-muted-foreground/50">{i + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-base md:text-lg font-bold transition-colors ${
                          currentAnswer === opt.value ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <ArrowRight className={`w-5 h-5 transition-all ${
                      currentAnswer === opt.value ? "text-primary opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`} />
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center px-4">
        <Button 
          variant="ghost" 
          onClick={prev} 
          disabled={currentQ === 0}
          className={`h-12 px-6 rounded-2xl gap-2 font-black uppercase tracking-widest text-xs transition-all ${currentQ === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        
        <Button 
          onClick={next} 
          disabled={!currentAnswer} 
          className="h-14 px-10 rounded-2xl gap-2 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          {currentQ < questions.length - 1 ? (
            <>
              Next Step <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Finalize Test <Sparkles className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

