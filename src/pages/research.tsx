import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Scale, Search, FileSearch, BookOpen, Loader2 } from "lucide-react";

export default function Research() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("federal");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResults("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Research this legal question and provide relevant case law, statutes, and precedents for ${jurisdiction} jurisdiction: ${query}`
          }],
          model: "gpt-5-nano"
        })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === "text-delta" && parsed.delta) {
                  fullText += parsed.delta;
                  setResults(fullText);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Research error:", error);
      setResults("Error conducting research. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Legal Research Engine</h1>
              <p className="text-sm text-muted-foreground">Research case law, statutes, and legal precedents</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Research Question</label>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your legal research question... (e.g., 'What is the statute of limitations for breach of contract in California?')"
                className="min-h-[100px]"
                disabled={isSearching}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Jurisdiction</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full p-2 border rounded-md bg-background text-foreground"
                disabled={isSearching}
              >
                <option value="federal">Federal Law</option>
                <option value="california">California</option>
                <option value="new-york">New York</option>
                <option value="texas">Texas</option>
                <option value="florida">Florida</option>
                <option value="illinois">Illinois</option>
                <option value="pennsylvania">Pennsylvania</option>
                <option value="all-states">All States</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Research Legal Question
                </>
              )}
            </Button>
          </form>
        </Card>

        {results && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileSearch className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Research Results</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-foreground bg-slate-800/50 p-4 rounded-lg">
                {results}
              </pre>
            </div>
          </Card>
        )}

        {!results && !isSearching && (
          <Card className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Start Your Legal Research</h3>
            <p className="text-muted-foreground">
              Enter a legal question above to search case law, statutes, and precedents
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
