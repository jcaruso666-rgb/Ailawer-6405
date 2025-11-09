import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Plus, Briefcase, Calendar, FileText, AlertCircle } from "lucide-react";

export default function Cases() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  const mockCases = [
    {
      id: "1",
      title: "Smith v. Property Management LLC",
      description: "Landlord-tenant dispute regarding security deposit",
      status: "active",
      caseType: "Civil",
      courtDate: new Date("2024-12-15"),
      documents: 5,
    },
    {
      id: "2",
      title: "Personal Injury Claim",
      description: "Motor vehicle accident case",
      status: "pending",
      caseType: "Personal Injury",
      courtDate: new Date("2024-11-30"),
      documents: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Case Management</h1>
              <p className="text-sm text-muted-foreground">Organize and track your legal cases</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Cases</h2>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>

        <div className="grid gap-6">
          {mockCases.map((case_) => (
            <Card key={case_.id} className="p-6 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded">
                    <Briefcase className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{case_.title}</h3>
                    <p className="text-muted-foreground">{case_.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  case_.status === "active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {case_.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Type: {case_.caseType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Court Date: {case_.courtDate.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{case_.documents} Documents</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Add Document</Button>
                <Button size="sm" variant="outline">Add Note</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
