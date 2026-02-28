import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2, Clock, XCircle, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

type DocStatus = "validated" | "pending" | "rejected" | "missing";

interface Doc {
  id: string;
  name: string;
  type: string;
  status: DocStatus;
  date?: string;
  rejectionReason?: string;
}

const initialDocs: Doc[] = [
  { id: "1", name: "Passeport", type: "passport", status: "validated", date: "15 Jan 2026" },
  { id: "2", name: "Relevé de notes Bac", type: "transcript", status: "pending", date: "20 Jan 2026" },
  { id: "3", name: "Diplôme", type: "diploma", status: "rejected", date: "18 Jan 2026", rejectionReason: "Image floue, veuillez renvoyer une version lisible" },
  { id: "4", name: "Photo d'identité", type: "photo", status: "missing" },
  { id: "5", name: "Lettre de motivation", type: "motivation", status: "missing" },
  { id: "6", name: "Certificat médical", type: "medical", status: "missing" },
];

const statusConfig: Record<DocStatus, { label: string; icon: typeof CheckCircle2; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  validated: { label: "Validé", icon: CheckCircle2, variant: "default" },
  pending: { label: "En attente", icon: Clock, variant: "secondary" },
  rejected: { label: "Rejeté", icon: XCircle, variant: "destructive" },
  missing: { label: "Manquant", icon: Upload, variant: "outline" },
};

export default function Documents() {
  const [docs] = useState<Doc[]>(initialDocs);

  const completed = docs.filter(d => d.status === "validated").length;
  const total = docs.length;

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Mes Documents</h1>
        <p className="text-muted-foreground mt-1">
          {completed}/{total} documents validés. Uploadez les documents manquants.
        </p>
      </motion.div>

      <div className="space-y-3">
        {docs.map((doc, i) => {
          const config = statusConfig[doc.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={doc.status === "rejected" ? "border-destructive/30" : ""}>
                <CardContent className="py-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    doc.status === "validated" ? "bg-green-500/10" :
                    doc.status === "pending" ? "bg-amber-500/10" :
                    doc.status === "rejected" ? "bg-destructive/10" :
                    "bg-muted"
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      doc.status === "validated" ? "text-green-500" :
                      doc.status === "pending" ? "text-amber-500" :
                      doc.status === "rejected" ? "text-destructive" :
                      "text-muted-foreground"
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <Badge variant={config.variant} className="text-xs">
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    {doc.date && <p className="text-xs text-muted-foreground mt-0.5">{doc.date}</p>}
                    {doc.rejectionReason && (
                      <p className="text-xs text-destructive mt-1">⚠ {doc.rejectionReason}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {doc.status === "missing" || doc.status === "rejected" ? (
                      <Button size="sm" className="gap-1.5">
                        <Upload className="w-4 h-4" /> Uploader
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive/60 hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
