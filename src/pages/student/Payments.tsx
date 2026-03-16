import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const payments = [
  { id: "1", label: "Application Fee", amount: 150, status: "paid", date: "Jan 5, 2026" },
  { id: "2", label: "Tsinghua Enrollment Fee", amount: 800, status: "pending", date: "—" },
  { id: "3", label: "Health Insurance", amount: 200, status: "pending", date: "—" },
];

const totalPaid = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

export default function Payments() {
  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <p className="text-muted-foreground mt-1">Manage your fees and download your invoices.</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-xl font-bold text-foreground">${totalPaid}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-foreground">${totalPending}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-foreground">${totalPaid + totalPending}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg">Payment History</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.status === "paid" ? "bg-green-500/10" : "bg-amber-500/10"
                  }`}>
                  <CreditCard className={`w-5 h-5 ${p.status === "paid" ? "text-green-500" : "text-amber-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
                <p className="font-bold text-foreground">${p.amount}</p>
                {p.status === "paid" ? (
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="sm">Pay Now</Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
