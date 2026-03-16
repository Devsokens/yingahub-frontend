import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-muted-foreground mt-1">Manage platform administrators and staff access.</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <UserPlus className="w-4 h-4" /> Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Registered Users</CardTitle>
                    <CardDescription>Users with access to the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium text-foreground">No additional users yet</h3>
                    <p className="text-muted-foreground text-sm mt-1 mb-6 max-w-sm">
                        You are the only registered administrator. Add team members to collaborate.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
