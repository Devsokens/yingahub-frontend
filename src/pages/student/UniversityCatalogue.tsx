import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, GraduationCap, Star, BookOpen, Globe, ArrowRight, Lock, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

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
    const { user } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const isSubscribed = user?.subscription_status !== 'none';

    const filtered = universities.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header & Search */}
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-500 ${!isSubscribed ? 'blur-sm pointer-events-none select-none opacity-50' : ''}`}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">University Catalogue</h1>
                    <p className="text-muted-foreground mt-2 text-lg">
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
                        className="pl-10 h-11"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </motion.div>
            </div>

            {/* Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative transition-all duration-500 ${!isSubscribed ? 'min-h-[500px]' : ''}`}>
                {filtered.map((u, i) => (
                    <motion.div
                        key={u.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={!isSubscribed ? 'blur-md pointer-events-none select-none opacity-40 scale-[0.98]' : ''}
                    >
                        <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={u.image}
                                    alt={u.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm border-none shadow-lg">
                                    {u.ranking}
                                </Badge>
                                <div className="absolute bottom-3 left-3 flex gap-1">
                                    {u.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-[10px] bg-white/20 backdrop-blur-md text-white border-none py-0 px-2">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{u.name}</CardTitle>
                                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {u.location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-primary mb-0.5">{u.match}%</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Match</div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-6">
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {u.description}
                                </p>
                            </CardContent>

                            <CardFooter className="pt-0 flex gap-2">
                                <Button variant="outline" className="flex-1 text-sm h-10 border-primary/20 hover:bg-primary/5">
                                    Details
                                </Button>
                                <Button
                                    className="flex-1 text-sm h-10 gap-2 shadow-lg shadow-primary/20"
                                    onClick={() => navigate(`/student/applications/new?univ=${encodeURIComponent(u.name)}`)}
                                >
                                    Apply <ArrowRight className="w-3 h-3" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}

                {!isSubscribed && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/20 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="max-w-md w-full"
                        >
                            <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-2xl">
                                <div className="bg-gradient-yinga h-3 w-full" />
                                <CardHeader className="text-center pt-6 pb-2 md:pt-8 md:pb-4">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm border border-primary/5">
                                        <Lock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl font-black italic tracking-tighter text-foreground uppercase">Access Restricted</CardTitle>
                                    <CardDescription className="text-sm md:text-base font-medium mt-2 leading-relaxed px-4 text-muted-foreground italic">
                                        The university catalogue is reserved for students with an active service plan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-4 md:space-y-6 overflow-y-auto max-h-[60vh]">
                                    <div className="space-y-3 bg-muted/40 p-4 md:p-5 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground/80 italic">
                                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <Rocket className="w-3 h-3 text-green-600" />
                                            </div>
                                            100+ Top Chinese Universities
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-foreground/80 italic">
                                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <Star className="w-3 h-3 text-green-600" />
                                            </div>
                                            Personalized Matching Analysis
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Button
                                            size="lg"
                                            className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-black italic tracking-tight gap-2 shadow-xl shadow-primary/20 rounded-2xl uppercase"
                                            onClick={() => navigate('/student/settings?tab=subscription')}
                                        >
                                            Choose My Plan <ArrowRight className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full h-12 font-black text-muted-foreground hover:text-foreground rounded-xl uppercase italic text-xs tracking-widest"
                                            onClick={() => navigate('/student/dashboard')}
                                        >
                                            Return to Dashboard
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                )}
            </div>

            {isSubscribed && filtered.length === 0 && (
                <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-border mt-8">
                    <p className="text-muted-foreground text-lg italic">No universities found matching your search.</p>
                    <Button variant="link" onClick={() => setSearch("")} className="mt-2 text-primary font-bold">Clear search</Button>
                </div>
            )}
        </div>
    );
}
