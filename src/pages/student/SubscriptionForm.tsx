import { useState } from "react";
import { Check, ArrowRight, Zap, ShieldCheck, Headphones, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

export default function SubscriptionForm() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    return (
        <div className="py-12 px-4 max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 px-3 py-1 bg-primary/5">
                    Pricing Plans
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                    Unlock Your Future in <span className="text-gradient-yinga">China</span>
                </h1>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
                    Choose the service level that fits your needs and budget.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className={`relative h-full flex flex-col border-2 transition-all duration-300 ${plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border hover:border-primary/50'}`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Badge className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                        MOST RECOMMENDED
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="text-center pb-2">
                                <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 ${plan.color}`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-2xl font-black">{plan.name}</CardTitle>
                                <CardDescription className="text-base font-medium mt-2">{plan.description}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex-grow pt-4">
                                <div className="text-center mb-8">
                                    <span className="text-4xl font-black">${plan.price}</span>
                                    <span className="text-muted-foreground font-bold text-sm ml-1 uppercase tracking-widest">USD</span>
                                </div>

                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="pt-8">
                                <Button
                                    className={`w-full h-12 text-lg font-bold gap-2 group ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'variant-outline border-2'}`}
                                    onClick={() => setSelectedPlan(plan.name)}
                                >
                                    {plan.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto bg-muted/30 rounded-3xl p-8 border border-border/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Headphones className="w-6 h-6 text-primary" />
                            Need a custom solution?
                        </h3>
                        <p className="text-muted-foreground font-medium">
                            We also partner with local agents and universities to provide tailored services for families and groups.
                        </p>
                    </div>
                    <Button variant="outline" className="border-2 font-bold px-8">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
}
