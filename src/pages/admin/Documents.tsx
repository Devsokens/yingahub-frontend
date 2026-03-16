import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, CheckCircle2, XCircle, FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

const documents = [
  { id: 1, student: "Jean Dupont", type: "Passeport", status: "pending", date: "18 Jan 2026" },
  { id: 2, student: "Jean Dupont", type: "Relevé de notes", status: "pending", date: "18 Jan 2026" },
  { id: 3, student: "Aïcha Bamba", type: "Passeport", status: "validated", date: "15 Jan 2026" },
  { id: 4, student: "Aïcha Bamba", type: "Diplôme", status: "validated", date: "15 Jan 2026" },
  { id: 5, student: "Paul Mbeki", type: "Lettre de motivation", status: "rejected", date: "12 Jan 2026", reason: "Document illisible" },
  { id: 6, student: "Fatou Diallo", type: "Passeport", status: "pending", date: "20 Jan 2026" },
  { id: 7, student: "Fatou Diallo", type: "Photo d'identité", status: "pending", date: "20 Jan 2026" },
  { id: 8, student: "Omar Sy", type: "Certificat médical", status: "validated", date: "08 Jan 2026" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  validated: { label: "Validé", color: "bg-green-500/10 text-green-600 border-green-200" },
  pending: { label: "En attente", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  rejected: { label: "Rejeté", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function AdminDocuments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectDialog, setRejectDialog] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = documents.filter((d) => {
    const matchSearch = d.student.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Validation des documents
        </h1>
        <p className="text-muted-foreground mt-1">{documents.filter(d => d.status === "pending").length} documents en attente de validation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "En attente", count: documents.filter(d => d.status === "pending").length, color: "text-amber-500" },
          { label: "Validés", count: documents.filter(d => d.status === "validated").length, color: "text-green-500" },
          { label: "Rejetés", count: documents.filter(d => d.status === "rejected").length, color: "text-destructive" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="validated">Validé</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <CardContent className="pt-4 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.type}</p>
                    <p className="text-xs text-muted-foreground">{doc.student} · {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={statusConfig[doc.status].color}>
                    {statusConfig[doc.status].label}
                  </Badge>
                  {doc.status === "pending" && (
                    <>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => setRejectDialog(doc.id)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog !== null} onOpenChange={() => setRejectDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motif de rejet</DialogTitle>
            <DialogDescription>
              Veuillez expliquer pourquoi ce document a été rejeté.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Indiquez la raison du rejet..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(null)}>Annuler</Button>
            <Button variant="destructive" onClick={() => { setRejectDialog(null); setRejectReason(""); }}>
              Rejeter le document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
