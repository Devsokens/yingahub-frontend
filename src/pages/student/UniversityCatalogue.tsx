import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, GraduationCap, Star, BookOpen, Globe, ArrowRight, Lock, Rocket, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionnaireModal } from "@/components/student/QuestionnaireModal";

const universities = [
    {
        id: "tsinghua",
        name: "Tsinghua University",
        location: "Beijing, China",
        ranking: "#1 in China",
        image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
        tags: ["Top Tier", "Engineering", "Research"],
        match: 95,
        description: "One of the most prestigious universities in China, known for its engineering and computer science programs.",
    },
    {
        id: "peking",
        name: "Peking University",
        location: "Beijing, China",
        ranking: "#2 in China",
        image: "https://images.unsplash.com/photo-1523050853063-bd388f9f79b5?auto=format&fit=crop&q=80&w=800",
        tags: ["Prestige", "Liberal Arts", "Medicine"],
        match: 92,
        description: "A major research university in Beijing and a member of the C9 League of Chinese universities.",
    },
    {
        id: "fudan",
        name: "Fudan University",
        location: "Shanghai, China",
        ranking: "#3 in China",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
        tags: ["Business", "Shanghai", "International"],
        match: 88,
        description: "Located in the heart of Shanghai, Fudan is highly regarded for its business and humanities departments.",
    },
    {
        id: "zhejiang",
        name: "Zhejiang University",
        location: "Hangzhou, China",
        ranking: "#4 in China",
        image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=800",
        tags: ["Science", "Innovation", "Nature"],
        match: 85,
        description: "Renowned for its research impact and beautiful campus in Hangzhou.",
    },
];

export default function UniversityCatalogue() {
    const { user, submitQuestionnaire } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isApplyGuardOpen, setIsApplyGuardOpen] = useState(false);

    const isSubscribed = user?.subscription_status !== 'none';
    const hasSubmitted = user?.questionnaire_submitted || false;
    const matchingStatus = user?.matching_status || 'none';

    const handleApply = (univName: string) => {
        if (!isSubscribed) {
            setIsApplyGuardOpen(true);
        } else {
            navigate(`/student/applications/new?univ=${encodeURIComponent(univName)}`);
        }
    };

    const handleSubmitQuestionnaire = (data: any) => {
        submitQuestionnaire(data);
    };

    const filtered = universities.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                             u.location.toLowerCase().includes(search.toLowerCase());
        
        // If matching completed, only show assigned universities
        if (matchingStatus === 'completed' && user?.assigned_universities) {
            return matchesSearch && user.assigned_universities.includes(u.id);
        }
        
        return matchesSearch;
    });

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            <QuestionnaireModal 
                isOpen={!hasSubmitted} 
                onClose={() => navigate('/student/dashboard')}
                onSubmit={handleSubmitQuestionnaire}
            />

            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-500">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {matchingStatus === 'completed' ? "Your Recommended Universities" : "University Catalogue"}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg font-medium">
                        Explore top-tier universities in China and find your perfect match.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative w-full md:w-96"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or city..."
                        className="pl-10 h-11 rounded-xl shadow-sm border-border/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </motion.div>
            </div>

            {/* Grid or Pending Message */}
            {matchingStatus === 'pending' ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white/50 backdrop-blur-md border border-primary/10 rounded-[40px] shadow-2xl shadow-primary/5"
                >
                    <div className="w-24 h-24 rounded-[32px] bg-primary/10 flex items-center justify-center mb-8 animate-pulse border border-primary/20">
                        <Clock className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground uppercase">Profile Under Review</h2>
                    <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-medium text-sm md:text-lg leading-relaxed">
                        Thank you for completing the questionnaire! Our team is currently analyzing your profile 
                        to match you with the best universities and programs in China. 
                        You will be notified as soon as your personalized matching is ready.
                    </p>
                    <Button 
                        variant="secondary" 
                        className="mt-8 md:mt-10 font-black uppercase tracking-widest text-[10px] md:text-xs h-12 md:h-14 px-8 md:px-10 rounded-xl md:rounded-2xl shadow-lg border-border/50"
                        onClick={() => navigate('/student/dashboard')}
                    >
                        Return to Dashboard
                    </Button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    {filtered.map((u, i) => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(var(--primary-rgb),0.15)] hover:-translate-y-2 bg-white/80 backdrop-blur-sm rounded-[32px]">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={u.image}
                                        alt={u.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black border-none font-black uppercase tracking-tighter shadow-xl px-3 py-1 text-[10px]">
                                        {u.ranking}
                                    </Badge>
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        {u.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-[9px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md text-white border-none py-0.5 px-2">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <CardHeader className="pb-4 pt-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors duration-300">{u.name}</CardTitle>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1.5 font-medium">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary/60" />
                                                {u.location}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-primary tracking-tight mb-0.5">{u.match}%</div>
                                            <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Match</div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pb-6">
                                    <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed font-medium">
                                        {u.description}
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-0 pb-6 px-6 flex gap-3">
                                    <Button variant="outline" className="flex-1 text-[10px] font-black uppercase tracking-widest h-12 border-primary/20 hover:bg-primary/5 rounded-xl transition-all duration-300">
                                        Details
                                    </Button>
                                    <Button
                                        className="flex-1 text-[10px] font-black uppercase tracking-widest h-12 gap-2 shadow-xl shadow-primary/20 rounded-xl group/btn"
                                        onClick={() => handleApply(u.name)}
                                    >
                                        Apply <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {isApplyGuardOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/40 backdrop-blur-md transition-all duration-500">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="max-w-md w-full"
                    >
                        <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/20 overflow-hidden rounded-[40px] bg-white backdrop-blur-2xl">
                            <div className="bg-gradient-yinga h-3 w-full" />
                            <CardHeader className="text-center pt-8 pb-4">
                                <div className="w-20 h-20 rounded-[28px] bg-primary/10 flex items-center justify-center mx-auto mb-6 shadow-xl border border-primary/5">
                                    <Lock className="w-10 h-10 text-primary" />
                                </div>
                                <CardTitle className="text-3xl font-black tracking-tighter text-foreground uppercase">Access Restricted</CardTitle>
                                <CardDescription className="text-base font-bold mt-2 leading-relaxed px-4 text-muted-foreground">
                                    A service plan is required to start a new application.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                <div className="space-y-4 bg-muted/30 p-6 rounded-[24px] border border-border/50 shadow-inner">
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                                        <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center shadow-sm">
                                            <Rocket className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        100+ Top Chinese Universities
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/80">
                                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shadow-sm">
                                            <Star className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        Personalized Matching Analysis
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        className="w-full h-14 md:h-16 bg-primary hover:bg-primary/90 text-xs md:text-sm font-black tracking-widest gap-3 shadow-2xl shadow-primary/30 rounded-2xl uppercase"
                                        onClick={() => navigate('/student/settings?tab=subscription')}
                                    >
                                        Choose My Plan <ArrowRight className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full h-10 md:h-12 font-black text-muted-foreground hover:text-foreground rounded-xl uppercase text-[10px] tracking-[0.2em] transition-all"
                                        onClick={() => setIsApplyGuardOpen(false)}
                                    >
                                        Return to Catalogue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}

            {hasSubmitted && matchingStatus === 'completed' && filtered.length === 0 && (
                <div className="text-center py-24 bg-muted/10 rounded-[32px] border-2 border-dashed border-border/40 mt-8 backdrop-blur-sm">
                    <p className="text-muted-foreground text-xl font-medium">No universities found matching your search.</p>
                    <Button variant="link" onClick={() => setSearch("")} className="mt-4 text-primary font-black uppercase tracking-widest text-xs">Clear search filters</Button>
                </div>
            )}
        </div>
    );
}
