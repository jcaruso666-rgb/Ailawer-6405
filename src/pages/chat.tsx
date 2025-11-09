import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Send,
  Scale,
  Download,
  StopCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function ChatPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const { messages, stop, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/chat" }),
  });

  const exportConversation = () => {
    const content = messages
      .map((msg) => `${msg.role.toUpperCase()}: ${(msg as any).content || ""}\n\n`)
      .join("");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-consultation-${new Date().getTime()}.txt`;
    a.click();
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              AI Legal Advisor
            </h1>
            <p className="text-sm text-muted-foreground">
              Get direct, actionable legal advice instantly
            </p>
          </div>
          <div className="flex gap-2">
            {messages.length > 0 && (
              <Button variant="outline" size="sm" onClick={exportConversation}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <Card className="p-8 max-w-2xl text-center">
                <Scale className="h-16 w-16 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Start Your Legal Consultation
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ask any legal question and get direct, actionable advice. No
                  disclaimers - just answers.
                </p>
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      sendMessage({ text: "Can you help me understand my rights in a landlord-tenant dispute?" });
                    }}
                  >
                    Landlord-Tenant Rights
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      sendMessage({ text: "How do I file a small claims lawsuit?" });
                    }}
                  >
                    Filing Small Claims
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      sendMessage({ text: "What are the steps to create a legally binding contract?" });
                    }}
                  >
                    Creating Contracts
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      sendMessage({ text: "I received a cease and desist letter. What should I do?" });
                    }}
                  >
                    Cease and Desist Response
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6 pb-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-accent" />
                    </div>
                  )}
                  <Card
                    className={`p-4 max-w-2xl ${
                      msg.role === "user"
                        ? "bg-accent/10 border-accent/20"
                        : "bg-card"
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground mb-2">
                      {msg.role === "user" ? "You" : "AI Legal Advisor"}
                    </div>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {(msg as any).content || ""}
                    </p>
                  </Card>
                  {msg.role === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-4 justify-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Scale className="h-5 w-5 text-accent" />
                    </div>
                    <Card className="p-4 max-w-2xl bg-card">
                      <div className="text-sm font-semibold text-foreground mb-2">
                        AI Legal Advisor
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Analyzing your legal question...</span>
                      </div>
                    </Card>
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="border-t border-border bg-card/30 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const text = formData.get("message") as string;
              if (text.trim() && !isLoading) {
                sendMessage({ text });
                e.currentTarget.reset();
              }
            }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex gap-2">
              <Input
                name="message"
                placeholder="Ask any legal question..."
                className="flex-1"
                disabled={isLoading}
              />
              {isLoading ? (
                <Button
                  type="button"
                  onClick={stop}
                  variant="outline"
                  className="min-w-[100px]"
                >
                  <StopCircle className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[100px]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
