import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Platform Settings</h1>
                <p className="text-muted-foreground mt-1">Configure general system preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">General Settings</CardTitle>
                    <CardDescription>Manage your platform's core configurations here.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Settings className="w-12 h-12 opacity-30 mb-4 animate-[spin_10s_linear_infinite]" />
                    <p>Settings module is currently under construction.</p>
                    <Button variant="outline" className="mt-6" disabled>Save Preferences</Button>
                </CardContent>
            </Card>
        </div>
    );
}
