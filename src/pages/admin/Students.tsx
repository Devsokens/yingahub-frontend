import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle2, XCircle, Clock, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

const students = [
  { id: 1, name: "Jean Dupont", email: "jean@email.com", country: "Cameroun", level: "Licence", status: "approved", date: "15 Jan 2026" },
  { id: 2, name: "Aïcha Bamba", email: "aicha@email.com", country: "Sénégal", level: "Master", status: "pending_review", date: "18 Jan 2026" },
  { id: 3, name: "Paul Mbeki", email: "paul@email.com", country: "Congo", level: "Licence", status: "approved", date: "10 Jan 2026" },
  { id: 4, name: "Fatou Diallo", email: "fatou@email.com", country: "Côte d'Ivoire", level: "Master", status: "pending_review", date: "20 Jan 2026" },
  { id: 5, name: "Omar Sy", email: "omar@email.com", country: "Sénégal", level: "Doctorat", status: "rejected", date: "05 Jan 2026" },
  { id: 6, name: "Grace Nkomo", email: "grace@email.com", country: "Gabon", level: "Licence", status: "incomplete", date: "22 Jan 2026" },
  { id: 7, name: "Yves Kouassi", email: "yves@email.com", country: "Côte d'Ivoire", level: "Licence", status: "approved", date: "12 Jan 2026" },
  { id: 8, name: "Amina Traoré", email: "amina@email.com", country: "Mali", level: "Master", status: "pending_review", date: "25 Jan 2026" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  approved: { label: "Approuvé", color: "bg-green-500/10 text-green-600 border-green-200" },
  pending_review: { label: "En révision", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  rejected: { label: "Rejeté", color: "bg-destructive/10 text-destructive border-destructive/20" },
  incomplete: { label: "Incomplet", color: "bg-muted text-muted-foreground border-border" },
};

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          Gestion des étudiants
        </h1>
        <p className="text-muted-foreground mt-1">{students.length} étudiants enregistrés</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
                <SelectItem value="pending_review">En révision</SelectItem>
                <SelectItem value="rejected">Rejeté</SelectItem>
                <SelectItem value="incomplete">Incomplet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Nom</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Pays</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Niveau</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Statut</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{s.email}</td>
                  <td className="py-3 px-2 text-foreground hidden sm:table-cell">{s.country}</td>
                  <td className="py-3 px-2 text-foreground hidden lg:table-cell">{s.level}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={statusConfig[s.status].color}>
                      {statusConfig[s.status].label}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {s.status === "pending_review" && (
                        <>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">Aucun étudiant trouvé.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
