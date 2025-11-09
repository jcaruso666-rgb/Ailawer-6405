import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Scale, BookOpen, Search, ChevronRight } from "lucide-react";

export default function Knowledge() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const categories = [
    { id: "1", name: "Constitutional Law", articles: 45 },
    { id: "2", name: "Criminal Law", articles: 67 },
    { id: "3", name: "Civil Procedure", articles: 52 },
    { id: "4", name: "Contract Law", articles: 89 },
    { id: "5", name: "Tort Law", articles: 71 },
    { id: "6", name: "Property Law", articles: 58 },
    { id: "7", name: "Family Law", articles: 43 },
    { id: "8", name: "Corporate Law", articles: 62 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Legal Knowledge Base</h1>
              <p className="text-sm text-muted-foreground">Comprehensive law library and resources</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="p-6 mb-8">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal topics, definitions, statutes..."
              className="flex-1"
            />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="p-6 hover:border-accent/50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
