import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Building2, Plus, Pencil, Trash2, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface University {
  id: number;
  name: string;
  city: string;
  ranking: number;
  programs: string[];
  tuition: string;
  scholarship: boolean;
}

const initialUniversities: University[] = [
  { id: 1, name: "Tsinghua University", city: "Beijing", ranking: 1, programs: ["Computer Science", "Engineering", "Business"], tuition: "3 200 000 FCFA", scholarship: true },
  { id: 2, name: "Peking University", city: "Beijing", ranking: 2, programs: ["Medicine", "Law", "International Relations"], tuition: "3 500 000 FCFA", scholarship: true },
  { id: 3, name: "Fudan University", city: "Shanghai", ranking: 3, programs: ["Finance", "Medicine", "Arts"], tuition: "2 800 000 FCFA", scholarship: true },
  { id: 4, name: "Zhejiang University", city: "Hangzhou", ranking: 4, programs: ["Engineering", "Computer Science"], tuition: "2 500 000 FCFA", scholarship: true },
  { id: 5, name: "Shanghai Jiao Tong University", city: "Shanghai", ranking: 5, programs: ["Engineering", "Business", "Medicine"], tuition: "3 000 000 FCFA", scholarship: false },
  { id: 6, name: "Wuhan University", city: "Wuhan", ranking: 8, programs: ["Law", "Science", "Literature"], tuition: "1 800 000 FCFA", scholarship: true },
];

export default function AdminUniversities() {
  const [universities] = useState(initialUniversities);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = universities.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Universités partenaires
          </h1>
          <p className="text-muted-foreground mt-1">{universities.length} universités enregistrées</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Ajouter
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Rechercher par nom ou ville..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((uni, i) => (
          <motion.div key={uni.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{uni.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {uni.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-1 rounded-md text-xs font-medium">
                    <Star className="w-3 h-3" /> #{uni.ranking}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {uni.programs.map((p) => (
                    <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frais: <span className="font-medium text-foreground">{uni.tuition}</span></span>
                  {uni.scholarship && (
                    <Badge className="bg-green-500/10 text-green-600 border-green-200" variant="outline">
                      Bourse dispo
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pencil className="w-3 h-3 mr-1" /> Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter une université</DialogTitle>
            <DialogDescription>
              Remplissez les informations ci-dessous pour référencer un nouvel établissement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom</Label><Input placeholder="Nom de l'université" /></div>
            <div><Label>Ville</Label><Input placeholder="Ville" /></div>
            <div><Label>Classement national</Label><Input placeholder="Ex: 5" type="number" /></div>
            <div><Label>Frais annuels (FCFA)</Label><Input placeholder="Ex: 2 500 000" /></div>
            <div><Label>Programmes (séparés par virgule)</Label><Input placeholder="Computer Science, Medicine..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={() => setDialogOpen(false)}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
