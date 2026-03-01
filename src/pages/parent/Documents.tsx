import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const documents = [
  { name: "Passeport", type: "Identité", status: "validated", date: "15 Jan 2026" },
  { name: "Relevé de notes Terminale", type: "Académique", status: "pending", date: "18 Jan 2026" },
  { name: "Diplôme Baccalauréat", type: "Académique", status: "validated", date: "10 Jan 2026" },
  { name: "Photo d'identité", type: "Identité", status: "validated", date: "10 Jan 2026" },
  { name: "Lettre de motivation", type: "Candidature", status: "missing", date: "-" },
  { name: "Certificat médical", type: "Médical", status: "missing", date: "-" },
  { name: "Relevé bancaire", type: "Financier", status: "rejected", date: "12 Jan 2026" },
];

const statusColors: Record<string, string> = {
  validated: "bg-green-500/10 text-green-600 border-green-200",
  pending: "bg-amber-500/10 text-amber-600 border-amber-200",
  missing: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<string, string> = {
  validated: "Validé", pending: "En attente", missing: "Manquant", rejected: "Rejeté",
};

export default function ParentDocuments() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Documents de Jean</h1>
        <p className="text-muted-foreground mt-1">Suivi des documents soumis par votre enfant.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["validated", "pending", "rejected", "missing"].map((s) => (
          <Card key={s}>
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold text-foreground">{documents.filter(d => d.status === s).length}</p>
              <p className="text-xs text-muted-foreground capitalize">{statusLabels[s]}s</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="pt-4 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type} · {doc.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[doc.status]}>
                  {statusLabels[doc.status]}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
