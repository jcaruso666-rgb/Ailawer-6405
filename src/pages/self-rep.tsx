import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Gavel, FileText, Users, AlertTriangle } from "lucide-react";

export default function SelfRepresentation() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const guides = [
    {
      id: "1",
      title: "Small Claims Court Guide",
      description: "Step-by-step guide for filing and winning small claims cases",
      steps: 8,
      difficulty: "Beginner",
    },
    {
      id: "2",
      title: "Family Court Procedures",
      description: "Navigate divorce, custody, and family law cases",
      steps: 12,
      difficulty: "Intermediate",
    },
    {
      id: "3",
      title: "Criminal Court Representation",
      description: "Understand your rights and court procedures in criminal cases",
      steps: 15,
      difficulty: "Advanced",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Self-Representation Tools</h1>
              <p className="text-sm text-muted-foreground">Represent yourself in court with confidence</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <Card className="p-6 mb-6 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Note</h3>
              <p className="text-muted-foreground">
                These guides are designed to help you represent yourself effectively. While self-representation
                is your right, complex cases may benefit from professional legal counsel.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Gavel className="h-12 w-12 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Court Procedures</h3>
            <p className="text-sm text-muted-foreground">Learn proper court etiquette and procedures</p>
          </Card>
          <Card className="p-6 text-center">
            <FileText className="h-12 w-12 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Document Filing</h3>
            <p className="text-sm text-muted-foreground">How to file documents correctly and on time</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-12 w-12 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Trial Preparation</h3>
            <p className="text-sm text-muted-foreground">Prepare effectively for your court appearance</p>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Self-Representation Guides</h2>
        <div className="space-y-4">
          {guides.map((guide) => (
            <Card key={guide.id} className="p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{guide.steps} Steps</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      guide.difficulty === "Beginner" ? "bg-green-500/10 text-green-500" :
                      guide.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-red-500/10 text-red-500"
                    }`}>
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Start Guide</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
