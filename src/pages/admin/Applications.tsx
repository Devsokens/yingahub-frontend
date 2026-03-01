import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, GraduationCap, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const applications = [
  { id: 1, student: "Jean Dupont", university: "Tsinghua University", program: "Computer Science", status: "submitted", date: "20 Jan 2026", notes: "" },
  { id: 2, student: "Aïcha Bamba", university: "Peking University", program: "International Business", status: "under_review", date: "18 Jan 2026", notes: "Dossier complet" },
  { id: 3, student: "Paul Mbeki", university: "Fudan University", program: "Medicine", status: "accepted", date: "10 Jan 2026", notes: "Bourse CSC accordée" },
  { id: 4, student: "Fatou Diallo", university: "Zhejiang University", program: "Engineering", status: "submitted", date: "22 Jan 2026", notes: "" },
  { id: 5, student: "Omar Sy", university: "Shanghai Jiao Tong", program: "Finance", status: "rejected", date: "05 Jan 2026", notes: "GPA insuffisant" },
  { id: 6, student: "Yves Kouassi", university: "Wuhan University", program: "Law", status: "draft", date: "25 Jan 2026", notes: "" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: "Brouillon", color: "bg-muted text-muted-foreground border-border" },
  submitted: { label: "Soumise", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  under_review: { label: "En examen", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  accepted: { label: "Acceptée", color: "bg-green-500/10 text-green-600 border-green-200" },
  rejected: { label: "Rejetée", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function AdminApplications() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [noteDialog, setNoteDialog] = useState<number | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const filtered = applications.filter((a) => {
    const matchSearch = a.student.toLowerCase().includes(search.toLowerCase()) || a.university.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Gestion des candidatures
        </h1>
        <p className="text-muted-foreground mt-1">{applications.length} candidatures au total</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher étudiant ou université..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="submitted">Soumise</SelectItem>
            <SelectItem value="under_review">En examen</SelectItem>
            <SelectItem value="accepted">Acceptée</SelectItem>
            <SelectItem value="rejected">Rejetée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Étudiant</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Université</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Programme</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Statut</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Notes</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-3 px-2 font-medium text-foreground">{a.student}</td>
                  <td className="py-3 px-2 text-foreground hidden md:table-cell">{a.university}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden lg:table-cell">{a.program}</td>
                  <td className="py-3 px-2">
                    <Select defaultValue={a.status}>
                      <SelectTrigger className="w-32 h-8">
                        <Badge variant="outline" className={statusConfig[a.status].color}>{statusConfig[a.status].label}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([k, v]) => (
                          <SelectItem key={k} value={k}>{v.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-2 text-xs text-muted-foreground max-w-[150px] truncate hidden sm:table-cell">
                    {a.notes || "—"}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setNoteDialog(a.id); setAdminNote(a.notes); }}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={noteDialog !== null} onOpenChange={() => setNoteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note admin</DialogTitle>
          </DialogHeader>
          <Textarea placeholder="Ajouter une note..." value={adminNote} onChange={(e) => setAdminNote(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialog(null)}>Annuler</Button>
            <Button onClick={() => setNoteDialog(null)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
