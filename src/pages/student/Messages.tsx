import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

interface Message {
  id: string;
  sender: "student" | "admin";
  text: string;
  time: string;
}

const mockMessages: Message[] = [
  { id: "1", sender: "admin", text: "Hello Jean! Welcome to Yinga Hub. How can we help you?", time: "10:00" },
  { id: "2", sender: "student", text: "Hello! I'd like to know if my application for Tsinghua is complete.", time: "10:05" },
  { id: "3", sender: "admin", text: "Your application is almost complete. We are still missing the medical certificate and the motivation letter. Once these documents are sent, we can submit your application.", time: "10:12" },
  { id: "4", sender: "student", text: "Got it, I'll upload them today. Thanks!", time: "10:15" },
];

export default function Messages() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: "student",
      text: input.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm">Direct communication with the Yinga Hub team</p>
      </motion.div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Logo imageClassName="h-8" />
          <div>
            <p className="text-sm font-semibold text-foreground">Yinga Hub Team</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.sender === "student"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
                }`}>
                <p>{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.sender === "student" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {m.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={e => e.key === "Enter" && send()}
              className="flex-1"
            />
            <Button onClick={send} size="icon" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
