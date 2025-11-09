import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Scale, UserSearch, Search, Building, MapPin, FileSearch, Loader2 } from "lucide-react";

export default function OSINT() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("people");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const searchTypes = [
    { value: "people", label: "People Search", icon: UserSearch },
    { value: "property", label: "Property Records", icon: MapPin },
    { value: "business", label: "Business Entities", icon: Building },
    { value: "court", label: "Court Records", icon: FileSearch },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setResults([
        {
          id: "1",
          name: "John Smith",
          age: 45,
          location: "Los Angeles, CA",
          records: ["Public Records", "Property Ownership", "Business Registrations"],
        },
        {
          id: "2",
          name: "Jane Smith",
          age: 42,
          location: "Los Angeles, CA",
          records: ["Public Records", "Court Filings"],
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
              <h1 className="text-xl font-bold text-foreground">OSINT & Background Checks</h1>
              <p className="text-sm text-muted-foreground">Investigate public records and background information</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {searchTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.value}
                className={`p-4 cursor-pointer transition-all ${
                  searchType === type.value ? "border-accent bg-accent/5" : "hover:border-accent/50"
                }`}
                onClick={() => setSearchType(type.value)}
              >
                <Icon className="h-8 w-8 text-accent mb-2" />
                <h3 className="font-semibold text-foreground">{type.label}</h3>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Search Query</label>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter name, address, business name, or case number..."
                className="text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSearching ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              {isSearching ? "Searching..." : "Search Records"}
            </Button>
          </form>
        </Card>

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
            {results.map((result) => (
              <Card key={result.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{result.name}</h3>
                    <p className="text-muted-foreground">Age: {result.age} | Location: {result.location}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-foreground mb-2">Available Records:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.records.map((record: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                            {record}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">View Full Report</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
