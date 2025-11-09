import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Scale,
  MessageSquare,
  FileText,
  Search,
  BookOpen,
  Shield,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Gavel,
  UserSearch,
} from "lucide-react";
import { siteConfig } from "@/config";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: MessageSquare,
      title: "AI Legal Advisor",
      description:
        "Get direct, actionable legal advice instantly. No disclaimers - just answers.",
      href: "/chat",
    },
    {
      icon: Search,
      title: "Legal Research Engine",
      description:
        "Search case law, statutes, and precedents across state and federal databases.",
      href: "/research",
    },
    {
      icon: FileText,
      title: "Document Drafting",
      description:
        "Generate court-ready documents: contracts, motions, pleadings, and more.",
      href: "/documents",
    },
    {
      icon: UserSearch,
      title: "OSINT & Background Checks",
      description:
        "People search, public records, property lookup, and social media investigation.",
      href: "/osint",
    },
    {
      icon: Briefcase,
      title: "Case Management",
      description:
        "Organize cases, track deadlines, store documents, and plan strategy.",
      href: "/cases",
    },
    {
      icon: Gavel,
      title: "Self-Representation Tools",
      description:
        "Step-by-step guides for representing yourself in court with confidence.",
      href: "/self-rep",
    },
    {
      icon: BookOpen,
      title: "Legal Knowledge Base",
      description:
        "Comprehensive law library with state-specific laws and federal regulations.",
      href: "/knowledge",
    },
    {
      icon: Shield,
      title: "Court Procedure Guide",
      description:
        "Learn how to file documents, prepare for trial, and navigate the legal system.",
      href: "/procedures",
    },
  ];

  const capabilities = [
    "Answer ANY legal question directly",
    "Research case law and precedents",
    "Draft file-ready legal documents",
    "Conduct background investigations",
    "Manage multiple cases simultaneously",
    "Track court dates and deadlines",
    "Generate professional contracts",
    "Search public records databases",
    "Prepare for self-representation",
    "Access comprehensive legal library",
    "Export and download all documents",
    "Save and organize research history",
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {siteConfig.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Link to="/chat">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Start Consulting
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                Most Powerful AI Legal Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              Your AI-Powered
              <br />
              <span className="text-accent">Legal Assistant</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get direct legal advice, research case law, draft documents, and
              manage cases with the most powerful AI lawyer application ever
              built.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link to={user ? "/chat" : "/sign-up"}>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Start Consulting Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/knowledge">
                <Button size="lg" variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">
                Always Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">
                Instant
              </div>
              <div className="text-sm text-muted-foreground">
                Legal Answers
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">8+</div>
              <div className="text-sm text-muted-foreground">
                Core Features
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">
                Confidential
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Legal Suite
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for legal research, document drafting, and
              case management
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.href}>
                <Card className="p-6 hover:shadow-lg hover:border-accent/50 transition-all cursor-pointer h-full group">
                  <feature.icon className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-accent text-sm font-medium">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                No More "Consult a Lawyer"
                <br />
                <span className="text-accent">This IS Your Lawyer</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Unlike other legal chatbots that dodge questions, our AI
                provides direct, actionable legal advice. It remembers context,
                handles complex scenarios, and gives you the answers you need to
                take action immediately.
              </p>
              <div className="space-y-4">
                {[
                  "Direct answers to ANY legal question",
                  "Multi-turn conversations with full context",
                  "Complex legal scenario analysis",
                  "Actionable advice you can implement",
                  "No disclaimers or lawyer referrals",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-accent/20 p-2 rounded">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground mb-1">
                      You: Can I sue for breach of contract?
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI: Yes. Based on your situation, you have grounds for a
                      breach of contract claim. Here's your action plan...
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground mb-1">
                      You: Draft a demand letter for me
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI: I'll create a professional demand letter. Let me
                      gather the details...
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Every Tool You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              From legal research to court representation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-start gap-3 p-4 rounded-lg bg-background/50"
              >
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands who are already using AI Lawyer Pro for their legal
            needs
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to={user ? "/chat" : "/sign-up"}>
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6 text-accent" />
                <span className="font-bold text-foreground">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-powered legal assistant for direct advice, research, and
                document drafting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/chat" className="hover:text-accent">
                    AI Legal Chat
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-accent">
                    Legal Research
                  </Link>
                </li>
                <li>
                  <Link to="/documents" className="hover:text-accent">
                    Document Drafting
                  </Link>
                </li>
                <li>
                  <Link to="/cases" className="hover:text-accent">
                    Case Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/knowledge" className="hover:text-accent">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/self-rep" className="hover:text-accent">
                    Self-Representation
                  </Link>
                </li>
                <li>
                  <Link to="/procedures" className="hover:text-accent">
                    Court Procedures
                  </Link>
                </li>
                <li>
                  <Link to="/osint" className="hover:text-accent">
                    OSINT Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/terms" className="hover:text-accent">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-accent">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
