import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle2, XCircle, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

const students = [
  {
    id: 1, name: "Jean Dupont", email: "jean@email.com", phone: "+241 77 111 111", country: "Gabon", city: "Libreville",
    level: "Bachelor", field: "Computer Science", gpa: "3.8", dob: "15/03/2001", nationality: "Gabonese",
    status: "approved", date: "15 Jan 2026",
    documents: [
      { name: "Passport", status: "validated", date: "10 Jan 2026" },
      { name: "Transcript", status: "validated", date: "10 Jan 2026" },
      { name: "High School Diploma", status: "pending", date: "12 Jan 2026" },
    ],
    applications: [
      { id: 1, university: "Tsinghua University", program: "Computer Science", status: "submitted", date: "20 Jan 2026" },
      { id: 2, university: "Peking University", program: "Computer Science", status: "under_review", date: "22 Jan 2026" },
    ],
  },
  {
    id: 2, name: "Aïcha Bamba", email: "aicha@email.com", phone: "+241 77 222 222", country: "Gabon", city: "Port-Gentil",
    level: "Master", field: "International Business", gpa: "3.5", dob: "20/07/1999", nationality: "Gabonese",
    status: "pending_review", date: "18 Jan 2026",
    documents: [
      { name: "Passport", status: "validated", date: "15 Jan 2026" },
      { name: "Motivation Letter", status: "pending", date: "16 Jan 2026" },
    ],
    applications: [
      { id: 2, university: "Peking University", program: "International Business", status: "under_review", date: "18 Jan 2026" },
    ],
  },
  {
    id: 3, name: "Paul Mbeki", email: "paul@email.com", phone: "+241 77 333 333", country: "Gabon", city: "Libreville",
    level: "Bachelor", field: "Medicine", gpa: "4.0", dob: "05/11/2000", nationality: "Gabonese",
    status: "approved", date: "10 Jan 2026",
    documents: [
      { name: "Passport", status: "validated", date: "05 Jan 2026" },
      { name: "Transcript", status: "validated", date: "05 Jan 2026" },
      { name: "High School Diploma", status: "validated", date: "05 Jan 2026" },
    ],
    applications: [
      { id: 3, university: "Fudan University", program: "Medicine", status: "accepted", date: "10 Jan 2026" },
    ],
  },
  {
    id: 4, name: "Fatou Diallo", email: "fatou@email.com", phone: "+241 77 444 444", country: "Gabon", city: "Franceville",
    level: "Master", field: "Engineering", gpa: "3.6", dob: "12/04/2000", nationality: "Gabonese",
    status: "pending_review", date: "20 Jan 2026",
    documents: [
      { name: "Passport", status: "validated", date: "18 Jan 2026" },
      { name: "Recommendation Letter", status: "rejected", date: "19 Jan 2026" },
    ],
    applications: [
      { id: 4, university: "Zhejiang University", program: "Engineering", status: "submitted", date: "22 Jan 2026" },
    ],
  },
  {
    id: 5, name: "Omar Sy", email: "omar@email.com", phone: "+241 77 555 555", country: "Gabon", city: "Libreville",
    level: "PhD", field: "Finance", gpa: "3.2", dob: "30/09/1997", nationality: "Gabonese",
    status: "rejected", date: "05 Jan 2026",
    documents: [
      { name: "Passport", status: "validated", date: "02 Jan 2026" },
    ],
    applications: [
      { id: 5, university: "Shanghai Jiao Tong", program: "Finance", status: "rejected", date: "05 Jan 2026" },
    ],
  },
  {
    id: 6, name: "Grace Nkomo", email: "grace@email.com", phone: "+241 77 666 666", country: "Gabon", city: "Libreville",
    level: "Bachelor", field: "Law", gpa: "3.4", dob: "18/02/2002", nationality: "Gabonese",
    status: "incomplete", date: "22 Jan 2026",
    documents: [],
    applications: [],
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  approved: { label: "Approved", color: "bg-green-500/10 text-green-600 border-green-200" },
  pending_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20" },
  incomplete: { label: "Incomplete", color: "bg-muted text-muted-foreground border-border" },
};

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

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
          Enrolled Students
        </h1>
        <p className="text-muted-foreground mt-1">{students.length} registered students</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending_review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
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
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">City</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Level</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
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
                  className="border-b border-border/50 hover:bg-muted/30 cursor-pointer"
                  onClick={() => navigate(`/admin/students/${s.id}`)}
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
                  <td className="py-3 px-2 text-foreground hidden sm:table-cell">{s.city}</td>
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
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50" onClick={(e) => { e.stopPropagation(); }}>
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => { e.stopPropagation(); }}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); navigate(`/admin/students/${s.id}`); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No students found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
