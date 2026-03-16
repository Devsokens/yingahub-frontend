import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Mail, GraduationCap, MapPin } from "lucide-react";

export default function UniversityStudents() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Registered Students</h1>
                    <p className="text-muted-foreground mt-1">Manage all students currently enrolled or admitted to your university.</p>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-6">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search by name, ID or email..." className="pl-10" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Student</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Program</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Admission Year</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[
                                    { name: "Li Wei", id: "STU-8821", email: "li.wei@student.com", program: "Civil Engineering", year: "2024", status: "Active" },
                                    { name: "Aria Smith", id: "STU-9023", email: "aria.s@student.com", program: "Architecture", year: "2025", status: "Active" },
                                    { name: "Hiroto Sato", id: "STU-1124", email: "h.sato@student.com", program: "Computer Science", year: "2026", status: "Admitted" },
                                ].map((stu, i) => (
                                    <tr key={i} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="w-4 h-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{stu.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{stu.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{stu.id}</td>
                                        <td className="px-6 py-4 text-sm text-foreground font-medium">{stu.program}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{stu.year}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={`text-[10px] ${stu.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 'text-blue-600 border-blue-200 bg-blue-50'}`}>
                                                {stu.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
