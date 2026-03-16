import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Send, User } from "lucide-react";

export default function UniversityMessages() {
    return (
        <div className="h-[calc(100vh-12rem)] flex gap-6">
            <Card className="w-80 flex flex-col shrink-0">
                <CardHeader className="p-4 border-b border-border">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search students..." className="pl-10 h-9" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto flex-1">
                    {[
                        { name: "Jean Dupont", last: "I uploaded the transcripts", time: "2m", unread: true },
                        { name: "Aya Tanaka", last: "Thank you for the update!", time: "1h", unread: false },
                        { name: "Carlos Ruiz", last: "Is there any further info?", time: "2d", unread: false },
                    ].map((chat, i) => (
                        <div key={i} className="p-4 border-b border-border hover:bg-muted/50 cursor-pointer flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {chat.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-foreground truncate">{chat.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{chat.last}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-muted-foreground mb-1">{chat.time}</p>
                                {chat.unread && <div className="w-2 h-2 rounded-full bg-primary ml-auto" />}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="flex-1 flex flex-col">
                <CardHeader className="p-4 border-b border-border shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            J
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Jean Dupont</p>
                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Applied for Master in CS</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-muted p-4 rounded-2xl rounded-bl-none max-w-[80%] text-sm">
                            Hello, I uploaded the transcripts you requested. Can you confirm if my file is complete now?
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-none max-w-[80%] text-sm">
                            Hi Jean, we'll check your documents shortly. Usually it takes 24-48h for verification.
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t border-border mt-auto">
                    <div className="flex gap-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button size="icon"><Send className="w-4 h-4" /></Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
