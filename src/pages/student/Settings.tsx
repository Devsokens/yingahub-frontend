import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, Globe, LogOut, CreditCard, Sparkles, Check, ArrowRight, Zap, ShieldCheck, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Tab = 'profile' | 'notifications' | 'security' | 'subscription';

const plans = [
    {
        name: "Self-Service",
        price: "120",
        description: "Ideal for independent students who just need the right tools.",
        icon: Zap,
        color: "text-blue-500",
        features: [
            "AI-powered Compatibility Analysis",
            "Access to University Catalogue",
            "Direct Application Links",
            "Basic Document Checklist",
            "Standard Support",
        ],
        cta: "Choose Self-Service",
        popular: false,
    },
    {
        name: "Full-Service",
        price: "500 - 1,200",
        description: "End-to-end accompaniment for a stress-free admission journey.",
        icon: ShieldCheck,
        color: "text-primary",
        features: [
            "Personalized Expert Orientation",
            "Full Application Management",
            "Visa Assistance & Processing",
            "Mandarin Crash Course",
            "Airport Pickup & Integration",
            "Priority 24/7 Support",
        ],
        cta: "Get Full Support",
        popular: true,
    }
];

export default function Settings() {
    const { user, updateSubscription, logout } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    useEffect(() => {
        const tab = searchParams.get('tab') as Tab;
        if (tab && ['profile', 'notifications', 'security', 'subscription'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const isSubscribed = user?.subscription_status !== 'none';

    const handlePlanSelect = (planName: string) => {
        navigate(`/student/payment?plan=${encodeURIComponent(planName)}`);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="space-y-6 max-w-5xl pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-black text-foreground tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1 font-medium italic">Manage your account preferences and service subscriptions.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="md:col-span-1 space-y-1">
                    <Button
                        variant="ghost"
                        onClick={() => setActiveTab('profile')}
                        className={`w-full justify-start gap-3 h-11 font-bold transition-all ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <User className="w-4 h-4" /> Profile
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setActiveTab('subscription')}
                        className={`w-full justify-start gap-3 h-11 font-bold transition-all ${activeTab === 'subscription' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <CreditCard className="w-4 h-4" /> Subscription
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full justify-start gap-3 h-11 font-bold transition-all ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Bell className="w-4 h-4" /> Notifications
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setActiveTab('security')}
                        className={`w-full justify-start gap-3 h-11 font-bold transition-all ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                    >
                        <Shield className="w-4 h-4" /> Security
                    </Button>
                    <div className="pt-4 mt-4 border-t border-border">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full justify-start gap-3 h-11 font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-6"
                            >
                                <Card className="border-border/50 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">Personal Profile</CardTitle>
                                        <CardDescription className="text-base">Update your photo and personal identification details.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-2xl border border-border/50">
                                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 overflow-hidden shadow-inner font-black text-primary text-xl">
                                                {user?.full_name?.split(' ').map(n => n[0]).join('') || 'JD'}
                                            </div>
                                            <div className="space-y-2">
                                                <Button size="sm" className="font-bold">Change Avatar</Button>
                                                <p className="text-xs text-muted-foreground font-medium italic">Support JPG, PNG. Max 2MB.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="font-bold text-sm">First Name</Label>
                                                <Input id="firstName" defaultValue={user?.full_name?.split(' ')[0] || "Jean"} className="h-11 rounded-xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="font-bold text-sm">Last Name</Label>
                                                <Input id="lastName" defaultValue={user?.full_name?.split(' ')[1] || "Student"} className="h-11 rounded-xl" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="font-bold text-sm">Email Address</Label>
                                            <Input id="email" defaultValue={user?.email} className="h-11 rounded-xl" readOnly />
                                            <p className="text-[10px] text-muted-foreground font-medium italic">Contact support to change your verified email.</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        <Button className="font-bold px-8 h-11 shadow-lg shadow-primary/10">Save Changes</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        )}

                        {activeTab === 'subscription' && (
                            <motion.div
                                key="subscription"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="space-y-8"
                            >
                                {isSubscribed ? (
                                    <Card className="border-border/50 shadow-sm overflow-hidden">
                                        <div className="bg-gradient-yinga h-2" />
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-xl font-black">My Service Plan</CardTitle>
                                                    <CardDescription className="text-base">You are currently on a premium tier.</CardDescription>
                                                </div>
                                                <Badge className="px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                                                    {user?.subscription_status === 'self' ? 'SELF-SERVICE' : 'FULL-SERVICE'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6 pt-2">
                                            <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-border/50">
                                                        <Check className="w-6 h-6 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Status</p>
                                                        <p className="text-xl font-black">Active - {user?.subscription_status === 'self' ? '$120' : '$500+'}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-border/50">
                                                    <p className="text-sm font-medium text-muted-foreground mb-3 font-black uppercase tracking-tighter">Your Privileges:</p>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <li className="flex items-center gap-2 text-sm font-bold">
                                                            <Check className="w-4 h-4 text-primary" /> Full Catalogue Access
                                                        </li>
                                                        <li className="flex items-center gap-2 text-sm font-bold">
                                                            <Check className="w-4 h-4 text-primary" /> AI Matching Analysis
                                                        </li>
                                                        <li className="flex items-center gap-2 text-sm font-bold">
                                                            <Check className="w-4 h-4 text-primary" /> Priority Application Help
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {user?.subscription_status === 'self' && (
                                                <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                                    <div className="space-y-1">
                                                        <h4 className="font-black text-lg italic tracking-tight">Need full accompaniment?</h4>
                                                        <p className="text-sm font-medium text-muted-foreground">Upgrade to Full-Service for visa assistance & local integration.</p>
                                                    </div>
                                                    <Button variant="outline" className="h-11 font-black px-6 border-primary/30 hover:bg-primary/5 rounded-2xl" onClick={() => handlePlanSelect('Full-Service')}>
                                                        Upgrade to Full Support
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="text-center space-y-2">
                                            <h2 className="text-3xl font-black tracking-tight text-foreground italic">Unlock Your Potential</h2>
                                            <p className="text-muted-foreground font-medium text-lg">Choose the right tier to start your Chinese academic journey.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {plans.map((plan, i) => (
                                                <motion.div
                                                    key={plan.name}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Card className={`relative h-full flex flex-col border-2 transition-all duration-300 rounded-[32px] ${plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border hover:border-primary/50'}`}>
                                                        {plan.popular && (
                                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                                <Badge className="bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg">
                                                                    ESTIMATED VALUE
                                                                </Badge>
                                                            </div>
                                                        )}

                                                        <CardHeader className="text-center pb-2">
                                                            <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 ${plan.color}`}>
                                                                <plan.icon className="w-8 h-8" />
                                                            </div>
                                                            <CardTitle className="text-2xl font-black italic tracking-tighter">{plan.name}</CardTitle>
                                                            <CardDescription className="text-sm font-medium mt-1 leading-tight px-4">{plan.description}</CardDescription>
                                                        </CardHeader>

                                                        <CardContent className="flex-grow pt-4">
                                                            <div className="text-center mb-8 bg-muted/30 py-4 rounded-2xl">
                                                                <span className="text-3xl font-black">${plan.price}</span>
                                                                <span className="text-muted-foreground font-bold text-xs ml-1 uppercase tracking-widest">USD</span>
                                                            </div>

                                                            <ul className="space-y-3">
                                                                {plan.features.map((feature) => (
                                                                    <li key={feature} className="flex items-start gap-3">
                                                                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                            <Check className="w-3 h-3 text-green-600" />
                                                                        </div>
                                                                        <span className="text-[13px] font-bold text-foreground/80">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </CardContent>

                                                        <CardFooter className="pt-6">
                                                            <Button
                                                                className={`w-full h-12 text-lg font-black gap-2 group rounded-2xl ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'variant-outline border-2'}`}
                                                                onClick={() => handlePlanSelect(plan.name)}
                                                            >
                                                                {plan.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 flex flex-col md:flex-row items-center gap-6">
                                            <div className="flex-1 space-y-1">
                                                <h3 className="text-lg font-black flex items-center gap-2 italic">
                                                    <Headphones className="w-5 h-5 text-primary" />
                                                    Still Hesitating?
                                                </h3>
                                                <p className="text-muted-foreground font-medium text-sm">
                                                    Our counselors are available for a free 15-min discovery call to help you choose the best plan.
                                                </p>
                                            </div>
                                            <Button variant="outline" className="border-2 font-black px-8 h-11 rounded-xl">
                                                Chat with counselor
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Placeholders for other tabs */}
                        {(activeTab === 'notifications' || activeTab === 'security') && (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50"
                            >
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <Sparkles className="w-8 h-8 text-muted-foreground opactiy-50" />
                                </div>
                                <p className="text-muted-foreground italic font-black text-lg">Under Construction</p>
                                <p className="text-muted-foreground font-medium text-sm mt-1">This feature is coming soon in the next update.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
