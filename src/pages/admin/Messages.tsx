import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MessageSquare } from "lucide-react";

const conversations = [
  { id: 1, name: "Jean Dupont", lastMessage: "Thanks for the validation!", unread: 2, time: "5m ago" },
  { id: 2, name: "Aïcha Bamba", lastMessage: "Is my document compliant?", unread: 1, time: "30m ago" },
  { id: 3, name: "Paul Mbeki", lastMessage: "When will I receive confirmation?", unread: 0, time: "2h ago" },
  { id: 4, name: "Fatou Diallo", lastMessage: "I've uploaded my passport.", unread: 3, time: "1h ago" },
  { id: 5, name: "Omar Sy", lastMessage: "Can you check my application?", unread: 0, time: "Yesterday" },
];

const mockMessages = [
  { sender: "student", text: "Hello, I submitted my passport yesterday.", time: "10:30" },
  { sender: "admin", text: "Hello Jean! I will verify your document.", time: "10:35" },
  { sender: "student", text: "Thank you very much. I also have a question about fees.", time: "10:38" },
  { sender: "admin", text: "Of course, I am at your disposal.", time: "10:40" },
  { sender: "student", text: "Thanks for the validation!", time: "11:00" },
];

export default function AdminMessages() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filteredConvs = conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 max-w-6xl">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        Messages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        {/* Conversation list */}
        <Card className="md:col-span-1">
          <CardContent className="pt-4 p-0 h-full flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {filteredConvs.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3 border-b border-border/50 cursor-pointer transition-colors ${selectedConv.id === conv.id ? "bg-primary/5" : "hover:bg-muted/50"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {conv.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{conv.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{conv.lastMessage}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground">{conv.time}</p>
                      {conv.unread > 0 && (
                        <Badge className="mt-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="md:col-span-2">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {selectedConv.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedConv.name}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${msg.sender === "admin"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                      }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && setMessage("")}
              />
              <Button size="icon" onClick={() => setMessage("")}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
