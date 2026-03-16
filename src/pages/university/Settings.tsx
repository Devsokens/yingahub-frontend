import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Mail, Globe, Lock, ShieldCheck } from "lucide-react";

export default function UniversitySettings() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-foreground">University Settings</h1>

            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>University Profile</CardTitle>
                        <CardDescription>Manage your university's public information and contact details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                                <Building2 className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <Button variant="outline" size="sm">Update Logo</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="univName">University Name</Label>
                                <Input id="univName" defaultValue="Tsinghua University" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" defaultValue="Beijing, China" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="website">Official Website</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input id="website" defaultValue="https://www.tsinghua.edu.cn" className="pl-10" />
                            </div>
                        </div>
                        <Button className="mt-4">Save Profile</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security & Access</CardTitle>
                        <CardDescription>Manage admission officer accounts and security protocols.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Primary Admission Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input id="email" defaultValue="admissions@tsinghua.edu.cn" className="pl-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Update Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                            </div>
                        </div>
                        <Button variant="outline" className="mt-4 gap-2">
                            <ShieldCheck className="w-4 h-4" /> Enable 2FA
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
