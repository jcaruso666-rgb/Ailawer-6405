import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  FileSearch, 
  FileText, 
  Briefcase, 
  UserSearch, 
  BookOpen, 
  Scale,
  GraduationCap,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "AI Legal Advisor",
      description: "Get instant legal advice from our AI lawyer. Ask any question.",
      path: "/chat",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: FileSearch,
      title: "Legal Research",
      description: "Research case law, statutes, and precedents across all jurisdictions.",
      path: "/research",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: FileText,
      title: "Document Drafting",
      description: "Draft contracts, affidavits, motions, and other legal documents.",
      path: "/documents",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Briefcase,
      title: "Case Management",
      description: "Organize cases, track deadlines, and manage evidence.",
      path: "/cases",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: UserSearch,
      title: "OSINT & Background Checks",
      description: "Search public records, court filings, and background information.",
      path: "/osint",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: BookOpen,
      title: "Legal Knowledge Base",
      description: "Browse comprehensive legal information and definitions.",
      path: "/knowledge",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      icon: GraduationCap,
      title: "Self-Representation Guide",
      description: "Learn how to represent yourself in court successfully.",
      path: "/self-rep",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      icon: Scale,
      title: "Court Procedures",
      description: "Understand court rules, filing requirements, and procedures.",
      path: "/procedures",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Lawyer Pro Dashboard</h1>
          <p className="text-blue-200">Your complete AI-powered legal solution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.path}
                className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer group"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50">
            <CardHeader>
              <CardTitle className="text-white">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">AI Consultations:</span>
                  <span className="font-bold">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Document Drafts:</span>
                  <span className="font-bold">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Legal Research:</span>
                  <span className="font-bold">Unlimited</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/50">
            <CardHeader>
              <CardTitle className="text-white">Most Used</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-slate-200 hover:text-white"
                  onClick={() => navigate("/chat")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  AI Legal Chat
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-slate-200 hover:text-white"
                  onClick={() => navigate("/documents")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Draft Documents
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-slate-200 hover:text-white"
                  onClick={() => navigate("/research")}
                >
                  <FileSearch className="mr-2 h-4 w-4" />
                  Legal Research
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/50">
            <CardHeader>
              <CardTitle className="text-white">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-4">
                Start with the AI Legal Advisor to get immediate answers to your legal questions.
              </p>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => navigate("/chat")}
              >
                Start Consulting Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
