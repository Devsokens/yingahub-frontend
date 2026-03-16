import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, GraduationCap, Eye, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";

const applications = [
  {
    id: 1, student: "Jean Dupont", studentEmail: "jean@email.com", studentCountry: "Gabon",
    university: "Tsinghua University", program: "Computer Science", status: "submitted",
    date: "20 Jan 2026", notes: "", gpa: "3.8", level: "Bachelor",
    timeline: [
      { label: "Application Submitted", date: "20 Jan 2026", done: true },
      { label: "Under Review", date: "—", done: false },
      { label: "Final Decision", date: "—", done: false },
    ],
  },
  {
    id: 2, student: "Aïcha Bamba", studentEmail: "aicha@email.com", studentCountry: "Gabon",
    university: "Peking University", program: "International Business", status: "under_review",
    date: "18 Jan 2026", notes: "Complete file", gpa: "3.5", level: "Master",
    timeline: [
      { label: "Application Submitted", date: "18 Jan 2026", done: true },
      { label: "Under Review", date: "25 Jan 2026", done: true },
      { label: "Final Decision", date: "—", done: false },
    ],
  },
  {
    id: 3, student: "Paul Mbeki", studentEmail: "paul@email.com", studentCountry: "Gabon",
    university: "Fudan University", program: "Medicine", status: "accepted",
    date: "10 Jan 2026", notes: "CSC Scholarship granted", gpa: "4.0", level: "Bachelor",
    timeline: [
      { label: "Application Submitted", date: "10 Jan 2026", done: true },
      { label: "Under Review", date: "15 Jan 2026", done: true },
      { label: "Accepted", date: "28 Jan 2026", done: true },
    ],
  },
  {
    id: 4, student: "Fatou Diallo", studentEmail: "fatou@email.com", studentCountry: "Gabon",
    university: "Zhejiang University", program: "Engineering", status: "submitted",
    date: "22 Jan 2026", notes: "", gpa: "3.6", level: "Master",
    timeline: [
      { label: "Application Submitted", date: "22 Jan 2026", done: true },
      { label: "Under Review", date: "—", done: false },
      { label: "Final Decision", date: "—", done: false },
    ],
  },
  {
    id: 5, student: "Omar Sy", studentEmail: "omar@email.com", studentCountry: "Gabon",
    university: "Shanghai Jiao Tong", program: "Finance", status: "rejected",
    date: "05 Jan 2026", notes: "Insufficient GPA", gpa: "3.2", level: "PhD",
    timeline: [
      { label: "Application Submitted", date: "05 Jan 2026", done: true },
      { label: "Under Review", date: "10 Jan 2026", done: true },
      { label: "Rejected", date: "15 Jan 2026", done: true },
    ],
  },
  {
    id: 6, student: "Yves Kouassi", studentEmail: "yves@email.com", studentCountry: "Gabon",
    university: "Wuhan University", program: "Law", status: "draft",
    date: "25 Jan 2026", notes: "", gpa: "3.4", level: "Bachelor",
    timeline: [
      { label: "Draft Created", date: "25 Jan 2026", done: true },
      { label: "Submission", date: "—", done: false },
      { label: "Final Decision", date: "—", done: false },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground border-border", icon: FileText },
  submitted: { label: "Submitted", color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: Clock },
  under_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Search },
  accepted: { label: "Accepted", color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export default function AdminApplications() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

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
          Applications Management
        </h1>
        <p className="text-muted-foreground mt-1">{applications.length} total applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search student or university..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Student</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">University</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden lg:table-cell">Program</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30 cursor-pointer"
                  onClick={() => navigate(`/admin/applications/${a.id}`)}
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {a.student.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-foreground">{a.student}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-foreground hidden md:table-cell">{a.university}</td>
                  <td className="py-3 px-2 text-muted-foreground hidden lg:table-cell">{a.program}</td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className={statusConfig[a.status].color}>
                      {statusConfig[a.status].label}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{a.date}</td>
                  <td className="py-3 px-2 text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); navigate(`/admin/applications/${a.id}`); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">No applications found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
