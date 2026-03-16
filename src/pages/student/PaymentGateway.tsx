import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    CreditCard,
    Smartphone,
    ArrowLeft,
    Lock,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    ChevronRight,
    Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type PaymentMethod = 'card' | 'mobile';

export default function PaymentGateway() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { updateSubscription } = useAuth();
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const plan = searchParams.get('plan') || 'Self-Service';
    const price = plan === 'Self-Service' ? '120' : '500';

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        const status = plan === 'Self-Service' ? 'self' : 'full';
        await updateSubscription(status);

        setIsProcessing(false);
        setIsSuccess(true);

        toast.success("Payment successful! Your plan is now active.");

        // Redirect after success animation
        setTimeout(() => {
            navigate('/student/settings?tab=subscription');
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-foreground italic">Payment Confirmed!</h1>
                        <p className="text-muted-foreground font-medium">Your subscription has been activated successfully.</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Transaction ID</span>
                            <span className="font-mono font-bold">YH-7829-XQ-2026</span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground animate-pulse italic">Redirecting to your dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 gap-2 font-bold text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Settings
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100 p-8">
                                <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Checkout</CardTitle>
                                <CardDescription className="text-base">Secure your academic future with Yinga Hub.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                {/* Payment Methods */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setMethod('card')}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 ${method === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'card' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight text-foreground uppercase">Visa / Master</span>
                                    </button>
                                    <button
                                        onClick={() => setMethod('mobile')}
                                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 ${method === 'mobile' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'mobile' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight text-foreground uppercase">Mobile Money</span>
                                    </button>
                                </div>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    <AnimatePresence mode="wait">
                                        {method === 'card' ? (
                                            <motion.div
                                                key="card"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Cardholder Name</Label>
                                                    <Input placeholder="Jean Dupont" className="h-12 rounded-xl border-slate-200" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Card Number</Label>
                                                    <div className="relative">
                                                        <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl border-slate-200 pr-12" required />
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                                            <div className="w-6 h-4 bg-slate-100 rounded-sm" />
                                                            <div className="w-6 h-4 bg-slate-100 rounded-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Expiry Date</Label>
                                                        <Input placeholder="MM / YY" className="h-12 rounded-xl border-slate-200" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">CVV</Label>
                                                        <div className="relative">
                                                            <Input placeholder="123" type="password" maxLength={3} className="h-12 rounded-xl border-slate-200" required />
                                                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="mobile"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-6"
                                            >
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="p-3 border rounded-xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all border-slate-100 bg-white shadow-sm h-14">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Airtel_Money_Logo.svg" alt="Airtel" className="h-6" />
                                                    </div>
                                                    <div className="p-3 border rounded-xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all border-slate-100 bg-white shadow-sm h-14">
                                                        <span className="font-black text-orange-500 italic">Moov</span>
                                                    </div>
                                                    <div className="p-3 border rounded-xl flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition-all border-slate-100 bg-white shadow-sm h-14">
                                                        <span className="font-black text-[#FFCC00]">MTN</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                                                    <div className="flex gap-2">
                                                        <div className="w-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center font-bold text-sm">+241</div>
                                                        <Input placeholder="077 12 34 56" className="h-12 rounded-xl border-slate-200 flex-1" required />
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                                    <p className="text-[11px] text-orange-800 font-medium leading-relaxed italic">
                                                        You will receive a prompt on your phone to confirm the transaction. Please enter your secret PIN to authorize.
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-black italic rounded-2xl shadow-xl shadow-primary/20 gap-3 group"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing Transaction...
                                            </>
                                        ) : (
                                            <>
                                                Pay ${price}.00 USD
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-center gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                Secure SSL Encryption
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                                <Globe className="w-4 h-4 text-primary" />
                                Global Academic Escrow
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden sticky top-8">
                            <div className="bg-primary/10 p-6 flex items-center justify-center border-b border-primary/5">
                                <Badge className="bg-primary/20 text-primary border-none font-black text-[10px] tracking-widest uppercase">Order Summary</Badge>
                            </div>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="font-black italic text-lg leading-none">{plan}</p>
                                            <p className="text-xs text-muted-foreground font-medium">Single payment, full access</p>
                                        </div>
                                        <span className="font-black">${price}.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
                                        <span className="text-muted-foreground font-medium">Subtotal</span>
                                        <span className="font-bold">${price}.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">Service Fee</span>
                                        <span className="font-bold">$0.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                        <span className="text-lg font-black italic">Total</span>
                                        <span className="text-2xl font-black text-primary">${price}.00</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Included Features:</p>
                                    <div className="space-y-3">
                                        {(plan === 'Self-Service' ? [
                                            'University Catalogue Access',
                                            'AI Compatibility Test',
                                            'Direct Application Portal'
                                        ] : [
                                            'End-to-end Assistance',
                                            'Visa Processing Help',
                                            'Personal Expert Orientation'
                                        ]).map(f => (
                                            <div key={f} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                                <span className="text-xs font-bold text-foreground/70">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
