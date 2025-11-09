import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, FileText, Users, Calendar } from "lucide-react";

export default function Procedures() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const procedures = [
    {
      title: "Filing Court Documents",
      icon: FileText,
      steps: [
        "Prepare your documents according to court rules",
        "Make copies for all parties and the court",
        "File with the court clerk and pay filing fees",
        "Serve copies to all parties involved",
        "Keep proof of service for your records",
      ],
    },
    {
      title: "Court Appearance Preparation",
      icon: Users,
      steps: [
        "Review all case documents and evidence",
        "Prepare your opening statement",
        "Organize exhibits and witness lists",
        "Practice your presentation",
        "Arrive early and dress professionally",
      ],
    },
    {
      title: "Trial Timeline",
      icon: Calendar,
      steps: [
        "Filing of complaint or petition",
        "Service of process to defendants",
        "Answer or response from defendants",
        "Discovery period",
        "Pre-trial motions and hearings",
        "Trial date and verdict",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Court Procedures Guide</h1>
              <p className="text-sm text-muted-foreground">Navigate the legal system with confidence</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <div className="space-y-6">
          {procedures.map((procedure, idx) => {
            const Icon = procedure.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{procedure.title}</h2>
                </div>
                <div className="space-y-3">
                  {procedure.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                        {stepIdx + 1}
                      </div>
                      <p className="text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
