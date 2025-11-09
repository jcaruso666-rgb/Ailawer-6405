import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Scale, BookOpen, FileText, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Research() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("federal");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setResults([
        {
          id: "1",
          title: "Brown v. Board of Education",
          citation: "347 U.S. 483 (1954)",
          type: "Case Law",
          summary: "Landmark Supreme Court decision declaring state laws establishing separate public schools for black and white students unconstitutional.",
          relevance: 95,
        },
        {
          id: "2",
          title: "Miranda v. Arizona",
          citation: "384 U.S. 436 (1966)",
          type: "Case Law",
          summary: "Supreme Court decision requiring law enforcement to inform suspects of their rights before custodial interrogation.",
          relevance: 88,
        },
        {
          id: "3",
          title: "Title VII of the Civil Rights Act",
          citation: "42 U.S.C. § 2000e et seq.",
          type: "Statute",
          summary: "Federal law prohibiting employment discrimination based on race, color, religion, sex, or national origin.",
          relevance: 82,
        },
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Legal Research Engine</h1>
              <p className="text-sm text-muted-foreground">Search case law, statutes, and precedents</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Search Query</label>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter case name, statute, legal concept, or keywords..."
                className="text-base"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Jurisdiction</label>
                <Select value={jurisdiction} onValueChange={setJurisdiction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="federal">Federal</SelectItem>
                    <SelectItem value="california">California</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="texas">Texas</SelectItem>
                    <SelectItem value="florida">Florida</SelectItem>
                    <SelectItem value="all">All Jurisdictions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={!query.trim() || isSearching} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isSearching ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                  {isSearching ? "Searching..." : "Search Legal Database"}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
              <span className="text-sm text-muted-foreground">{results.length} results found</span>
            </div>
            {results.map((result) => (
              <Card key={result.id} className="p-6 hover:border-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">{result.title}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">{result.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{result.citation}</p>
                <p className="text-foreground mb-4">{result.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Relevance:</span>
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${result.relevance}%` }} />
                    </div>
                    <span className="text-sm font-medium text-accent">{result.relevance}%</span>
                  </div>
                  <Button variant="outline" size="sm">View Full Text</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Research</h3>
            <p className="text-muted-foreground">Enter a search query to find relevant case law, statutes, and legal precedents</p>
          </div>
        )}
      </div>
    </div>
  );
}
