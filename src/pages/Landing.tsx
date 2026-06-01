import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { 
  Users, 
  Video, 
  Code, 
  BarChart3, 
  Calendar, 
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  MessageSquare,
  Play,
  Check,
  HelpCircle,
  Activity,
  Smile,
  Zap,
  TrendingUp,
  Award,
  X
} from "lucide-react";

interface RoleSimulation {
  title: string;
  question: string;
  sampleAnswer: string;
  analysis: {
    communication: number;
    technical: number;
    solving: number;
    overall: number;
    feedback: string[];
  };
}
const simulations: Record<"engineer" | "pm" | "designer", RoleSimulation> = {
  engineer: {
    title: "Software Engineer",
    question: "How would you design a rate limiter for a high-traffic microservices architecture?",
    sampleAnswer: "I would implement a Token Bucket algorithm distributed via Redis. This ensures atomic counter decrements using Lua scripting to prevent race conditions across server nodes. For overflow traffic, I'd route messages to an asynchronous queue to avoid overloading database instances.",
    analysis: {
      communication: 92,
      technical: 96,
      solving: 90,
      overall: 93,
      feedback: [
        "Exceptional technical accuracy regarding distributed atomicity.",
        "Clear explanation of traffic flow management.",
        "Could mention cost-effective scaling strategies."
      ]
    }
  },
  pm: {
    title: "Product Manager",
    question: "How do you handle a situation where engineering disagrees with your product timeline?",
    sampleAnswer: "I would host a joint sync to align on goals and understand their architectural concerns first. By mapping out dependencies, prioritizing features with a MoSCoW framework, and trimming low-impact elements, we negotiate a realistic roadmap together without sacrificing code quality.",
    analysis: {
      communication: 96,
      technical: 85,
      solving: 92,
      overall: 91,
      feedback: [
        "Outstanding empathy and cross-functional leadership shown.",
        "Highly structured approach to prioritization and trade-offs.",
        "Include concrete metrics of success for clarity."
      ]
    }
  },
  designer: {
    title: "UX Designer",
    question: "Walk us through how you would validate a new navigation layout with users.",
    sampleAnswer: "I'd construct high-fidelity interactive prototypes. Then, I'd conduct moderated usability tests with 5 to 8 target users, focusing on time-on-task and error rates. Finally, I'd benchmark qualitative satisfaction using a System Usability Scale (SUS) to measure layout efficiency.",
    analysis: {
      communication: 90,
      technical: 93,
      solving: 95,
      overall: 93,
      feedback: [
        "Rigorous, metrics-based testing plan.",
        "Good distinction between qualitative and quantitative goals.",
        "Mention how user-selection bias is mitigated."
      ]
    }
  }
};

const Landing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter" | "interviewer">("candidate");
  const [showBanner, setShowBanner] = useState(true);

  // Simulator State
  const [selectedRole, setSelectedRole] = useState<"engineer" | "pm" | "designer" | null>(null);
  const [simStep, setSimStep] = useState<"idle" | "intro" | "speaking" | "answering" | "analyzing" | "results">("idle");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [activeProgress, setActiveProgress] = useState(0);

  // Typing effect for simulator question
  useEffect(() => {
    if (simStep === "intro" && selectedRole) {
      const fullText = simulations[selectedRole].question;
      let currentIndex = 0;
      setTypedQuestion("");
      const timer = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedQuestion((prev) => prev + fullText.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
          setSimStep("speaking");
        }
      }, 25);
      return () => clearInterval(timer);
    }
  }, [simStep, selectedRole]);

  // Typing effect for simulator answer
  useEffect(() => {
    if (simStep === "answering" && selectedRole) {
      const fullText = simulations[selectedRole].sampleAnswer;
      let currentIndex = 0;
      setTypedAnswer("");
      const timer = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedAnswer((prev) => prev + fullText.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(timer);
          setSimStep("analyzing");
        }
      }, 15);
      return () => clearInterval(timer);
    }
  }, [simStep, selectedRole]);

  // Analyzing progress simulation
  useEffect(() => {
    if (simStep === "analyzing") {
      setActiveProgress(0);
      const timer = setInterval(() => {
        setActiveProgress((prev) => {
          if (prev < 100) {
            return prev + 5;
          } else {
            clearInterval(timer);
            setSimStep("results");
            return 100;
          }
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [simStep]);

  const startSimulator = (role: "engineer" | "pm" | "designer") => {
    setSelectedRole(role);
    setSimStep("intro");
    setTypedQuestion("");
    setTypedAnswer("");
  };

  const resetSimulator = () => {
    setSelectedRole(null);
    setSimStep("idle");
    setTypedQuestion("");
    setTypedAnswer("");
    setActiveProgress(0);
  };

  const platformFeatures = [
    { icon: Video, title: "Smart Video Interview", desc: "Live real-time feed with built-in voice metrics.", color: "text-secondary" },
    { icon: Code, title: "Interactive Coding Workspace", desc: "Write, test, and debug code collaboratively inside the stream.", color: "text-primary" },
    { icon: Cpu, title: "AI Behavior Analysis", desc: "Receive immediate assessments of clarity, response patterns, and tone.", color: "text-purple-500" },
    { icon: Calendar, title: "Auto-Scheduling Panels", desc: "Seamless calendar synchronization for modern recruiters.", color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen bg-cyber-grid bg-background relative overflow-hidden">
      {/* Dynamic Announcement Banner */}
      {showBanner && (
        <div className="bg-gradient-primary text-white text-xs font-semibold px-6 py-2.5 flex items-center justify-between relative z-50 border-b border-white/10 shadow-sm">
          <div className="mx-auto flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>🚀 TalentForge AI v2.0 is live! Try our next-gen interactive simulator below.</span>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="text-white/80 hover:text-white focus:outline-none ml-4 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Decorative Blur Circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Fixed Sticky Glass Navigation Header */}
      <header className="sticky top-0 w-full z-50 glass-panel border-b backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#simulator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">AI Demo</a>
            <a href="#roles" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Roles</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="hover:bg-accent/50 text-foreground"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-primary text-white hover:bg-primary/90 shadow-md font-medium"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content (Left) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <Badge className="bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
              ✨ Next-Generation AI Interview Platform
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Supercharge Your Hiring With{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Connect candidates, interviewers, and recruiters in an interactive platform with real-time video, collaborative coding rooms, and Instant AI feedback.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-gradient-primary text-white hover:opacity-95 px-8 py-4 text-base shadow-glow transition-all duration-300"
                onClick={() => navigate('/live-interview')}
              >
                Start Live Interview
                <Sparkles className="ml-2 w-5 h-5 animate-pulse" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/register')}
                className="border-border hover:bg-accent/40 px-8 py-4 text-base transition-colors"
              >
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/60">
              <div>
                <p className="text-3xl font-extrabold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground mt-1">Interviews Held</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground">94%</p>
                <p className="text-sm text-muted-foreground mt-1">Time Saved</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-foreground">4.9/5</p>
                <p className="text-sm text-muted-foreground mt-1">User Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Interactive Floating Dashboard Mockup (Right) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-2xl glass-card p-6 flex flex-col justify-between border border-border/80 shadow-lg animate-float-fast">
              
              {/* Internal Mock Card 1 */}
              <div className="absolute top-4 right-[-24px] glass-panel rounded-xl p-4 shadow-md flex items-center space-x-3 border border-border/80 animate-float-slow">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Coding Assessment</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Status: Passed (92%)</p>
                </div>
              </div>

              {/* Internal Mock Card 2 */}
              <div className="absolute bottom-16 left-[-20px] glass-panel rounded-xl p-4 shadow-md flex items-center space-x-3 border border-border/80">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-secondary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Live AI Analysis</p>
                  <p className="text-[10px] text-muted-foreground">Confidence Level: High</p>
                </div>
              </div>

              {/* Mock Video Panel header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-wider font-semibold">CANDIDATE FEED</span>
                </div>
                <Badge variant="outline" className="text-[10px] border-secondary/30 text-secondary">
                  1080p Stream
                </Badge>
              </div>

              {/* Mock Video Frame */}
              <div className="flex-1 my-4 bg-muted/30 rounded-xl overflow-hidden relative flex items-center justify-center border border-border/50">
                <div className="text-center space-y-2 z-10">
                  <Smile className="w-12 h-12 text-primary mx-auto opacity-80" />
                  <p className="text-xs font-semibold font-mono tracking-tight text-foreground/80">Alex Carter</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Senior React Engineer Candidate</p>
                </div>
                
                {/* Micro Chart Overlay */}
                <div className="absolute bottom-2 right-2 glass-panel p-2 rounded-lg text-left border border-border/40">
                  <p className="text-[9px] text-muted-foreground uppercase font-semibold tracking-wider font-mono">AI Score</p>
                  <p className="text-xs font-extrabold text-primary font-mono">94.8%</p>
                </div>
              </div>

              {/* Control Panel Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1.5">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Video className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[10px] h-7 font-semibold font-mono hover:bg-accent/40">
                  MANAGE EVALUATION →
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Attraction - AI Interview Simulator Preview Widget */}
      <section id="simulator" className="py-20 relative bg-muted/10 border-y border-border/40">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <div className="space-y-4 max-w-3xl mx-auto mb-16">
            <Badge className="bg-secondary/10 hover:bg-secondary/15 text-secondary border border-secondary/20 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
              ⚡ LIVE ATTRACTION
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Try the Interactive AI Interview Simulator
            </h2>
            <p className="text-muted-foreground text-md">
              Select a job profile below to launch a simulated mini-interview. Witness our real-time typing assessment and live grading scores.
            </p>
          </div>

          {/* Simulator Console Container */}
          <div className="w-full max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-border/80 shadow-lg text-left">
            {/* Top Bar */}
            <div className="bg-card px-6 py-4 flex items-center justify-between border-b border-border/60">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground font-mono uppercase tracking-wider">AI CONSOLE V1.0</span>
              </div>
              
              {selectedRole && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={resetSimulator}
                  className="h-8 text-xs font-semibold hover:bg-accent/40 font-mono"
                >
                  RESET PREVIEW
                </Button>
              )}
            </div>

            {/* Console Screen Body */}
            <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-between bg-card/45">
              {simStep === "idle" && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">Launch a Mock Interactive Session</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Pick a specialized role to begin the preview. The simulator will pose a question, record a mock candidate response, and grade the results.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Button 
                      onClick={() => startSimulator("engineer")}
                      className="bg-primary hover:bg-primary/90 text-white font-medium"
                    >
                      💻 Software Engineer
                    </Button>
                    <Button 
                      onClick={() => startSimulator("pm")}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
                    >
                      💼 Product Manager
                    </Button>
                    <Button 
                      onClick={() => startSimulator("designer")}
                      className="bg-secondary hover:bg-secondary/90 text-white font-medium"
                    >
                      🎨 UX Designer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step: AI Interiewer Poses Question */}
              {(simStep === "intro" || simStep === "speaking") && selectedRole && (
                <div className="space-y-6 flex-1 flex flex-col justify-center">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 animate-float-fast shadow-glow">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold font-mono tracking-wider text-primary uppercase">AI INTERVIEWER</p>
                      <p className="text-base font-semibold text-foreground/90 transition-all duration-300">
                        {typedQuestion}
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary animate-pulse" />
                      </p>
                    </div>
                  </div>

                  {simStep === "speaking" && (
                    <div className="pt-8 flex justify-end">
                      <Button 
                        onClick={() => setSimStep("answering")}
                        className="bg-gradient-primary text-white shadow-glow"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Simulate Candidate Answer
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step: Candidate Formulates Response */}
              {(simStep === "answering" || simStep === "analyzing") && selectedRole && (
                <div className="space-y-6 flex-1 flex flex-col justify-center">
                  {/* Interviewer Question (Disabled view) */}
                  <div className="opacity-40 flex items-start space-x-4">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold font-mono tracking-wider uppercase">AI INTERVIEWER</p>
                      <p className="text-xs font-semibold">{simulations[selectedRole].question}</p>
                    </div>
                  </div>

                  {/* Candidate Input Simulation */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0 border border-secondary/20">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-[10px] font-bold font-mono tracking-wider text-secondary uppercase">CANDIDATE RESPONSE</p>
                      <div className="w-full bg-accent/40 rounded-xl p-4 border border-border/80">
                        <p className="text-sm font-medium italic text-foreground leading-relaxed">
                          {typedAnswer}
                          {simStep === "answering" && (
                            <span className="inline-block w-1.5 h-4 ml-0.5 bg-secondary animate-pulse" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {simStep === "analyzing" && (
                    <div className="pt-6 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold font-mono">
                        <span className="text-primary flex items-center">
                          <Cpu className="w-4 h-4 mr-1.5 animate-spin" />
                          AI SECURE ANALYTICS PROCESS IN PROGRESS...
                        </span>
                        <span>{activeProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-100" 
                          style={{ width: `${activeProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step: Results Rendered */}
              {simStep === "results" && selectedRole && (
                <div className="space-y-6 flex-1">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-success/15 flex items-center justify-center border border-success/30">
                        <Award className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground leading-tight">AI Report Generated</h4>
                        <p className="text-xs text-muted-foreground font-mono">Role: {simulations[selectedRole].title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground uppercase">Overall Rating</p>
                      <p className="text-3xl font-extrabold text-success font-mono">{simulations[selectedRole].analysis.overall}%</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Performance Progress Metrics */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground/80">Skill Scorecards</h5>
                      
                      <div className="space-y-3">
                        {/* Comm score */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-muted-foreground">Communication Delivery</span>
                            <span className="font-mono text-primary">{simulations[selectedRole].analysis.communication}%</span>
                          </div>
                          <div className="h-2 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${simulations[selectedRole].analysis.communication}%` }} />
                          </div>
                        </div>

                        {/* Tech score */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-muted-foreground">Technical Relevance</span>
                            <span className="font-mono text-secondary">{simulations[selectedRole].analysis.technical}%</span>
                          </div>
                          <div className="h-2 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${simulations[selectedRole].analysis.technical}%` }} />
                          </div>
                        </div>

                        {/* Problem solving score */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-muted-foreground">Problem Solving Logic</span>
                            <span className="font-mono text-purple-500">{simulations[selectedRole].analysis.solving}%</span>
                          </div>
                          <div className="h-2 bg-accent rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${simulations[selectedRole].analysis.solving}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Feedback items */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-foreground/80">Qualitative Insights</h5>
                      <ul className="space-y-2">
                        {simulations[selectedRole].analysis.feedback.map((item, index) => (
                          <li key={index} className="flex items-start text-xs text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-success mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between gap-4">
                    <Button 
                      variant="outline" 
                      onClick={resetSimulator}
                      className="font-mono text-xs hover:bg-accent/40"
                    >
                      ← Try Another Role
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/register')}
                      className="bg-primary text-white shadow-glow"
                    >
                      Sign Up to Start Full Interview
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section id="features" className="py-24 container mx-auto px-6">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
            🚀 Powerful Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Features Tailored for Growth Teams
          </h2>
          <p className="text-muted-foreground text-md">
            Everything required to run modern, clean, and collaborative tech assessments in a single dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feat, index) => (
            <Card key={index} className="glass-card hover:-translate-y-1 transition-all duration-300 border-border/80">
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-accent/40 flex items-center justify-center mx-auto border border-border/60`}>
                  <feat.icon className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="font-bold text-base text-foreground">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Role Switcher Tabs (Built for Every Role) */}
      <section id="roles" className="py-20 bg-muted/10 border-y border-border/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
              👥 Target Personas
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              A Complete Platform for Everyone
            </h2>
            <p className="text-muted-foreground text-md">
              Whether you are applying for a job, evaluating developers, or managing system configuration.
            </p>
          </div>

          <Tabs defaultValue="candidate" className="w-full space-y-8">
            <div className="flex justify-center">
              <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
                <TabsTrigger value="candidate" className="rounded-lg text-sm px-5 py-2 font-medium">For Candidates</TabsTrigger>
                <TabsTrigger value="recruiter" className="rounded-lg text-sm px-5 py-2 font-medium">For Recruiters</TabsTrigger>
                <TabsTrigger value="interviewer" className="rounded-lg text-sm px-5 py-2 font-medium">For Interviewers</TabsTrigger>
              </TabsList>
            </div>

            {/* Candidate Role Info */}
            <TabsContent value="candidate">
              <Card className="glass-card overflow-hidden border-border/80">
                <div className="grid md:grid-cols-12 gap-6 p-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <Badge className="bg-primary/10 text-primary uppercase text-[10px] font-bold">Ace Your Interview</Badge>
                      <h3 className="text-2xl font-bold">Prepare, Practice, and Get Hired</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Connect to top companies, take automated practice runs with AI feedback, write code live in code assessment suites, and keep track of all job timelines.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Interactive Code Workspace
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Comprehensive Job Boards
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Detailed AI Feedback reports
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Timeline Scheduler Alerts
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/register?role=candidate')} className="bg-primary text-white">
                      Sign Up as Candidate
                    </Button>
                  </div>
                  <div className="md:col-span-5 bg-accent/30 rounded-xl p-6 border border-border/40 text-center font-mono">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-4">CANDIDATE SUITE PREVIEW</p>
                    <div className="space-y-2.5">
                      <div className="bg-card p-3 rounded-lg border border-border/80 text-left flex justify-between items-center text-xs">
                        <span className="font-semibold text-foreground">Next-Gen React developer test</span>
                        <Badge variant="outline" className="text-primary font-mono text-[9px] border-primary/20">Scheduled</Badge>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-border/80 text-left flex justify-between items-center text-xs">
                        <span className="font-semibold text-foreground">Python API Logic round</span>
                        <Badge className="bg-success text-success-foreground font-mono text-[9px]">Passed (89%)</Badge>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-border/80 text-left flex justify-between items-center text-xs">
                        <span className="font-semibold text-foreground">UI Design Assessment</span>
                        <Badge variant="outline" className="text-purple-500 font-mono text-[9px] border-purple-500/20">Reviewing</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Recruiter Role Info */}
            <TabsContent value="recruiter">
              <Card className="glass-card overflow-hidden border-border/80">
                <div className="grid md:grid-cols-12 gap-6 p-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <Badge className="bg-purple-500/10 text-purple-500 uppercase text-[10px] font-bold">Streamline Pipelines</Badge>
                      <h3 className="text-2xl font-bold">Identify Top Talent Faster</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Post open roles, coordinate smart pipelines, screen candidates efficiently using AI metric scoring, and view extensive interview histories.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Create & Post Job Openings
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Applicant Review Panels
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Pipeline Analytics graphs
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Auto interview coordination
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/register?role=recruiter')} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Sign Up as Recruiter
                    </Button>
                  </div>
                  <div className="md:col-span-5 bg-accent/30 rounded-xl p-6 border border-border/40 text-center font-mono">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-4">RECRUITER PIPELINE STATS</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-semibold">Active Jobs</span>
                        <span className="font-extrabold text-foreground">8</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-semibold">Candidate Pipeline</span>
                        <span className="font-extrabold text-foreground">142 applicants</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-semibold">Avg. Screening Duration</span>
                        <span className="font-extrabold text-primary">3.2 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Interviewer Role Info */}
            <TabsContent value="interviewer">
              <Card className="glass-card overflow-hidden border-border/80">
                <div className="grid md:grid-cols-12 gap-6 p-8 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <Badge className="bg-secondary/10 text-secondary uppercase text-[10px] font-bold">Standardize Reviews</Badge>
                      <h3 className="text-2xl font-bold">Run Professional Technical Panels</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Utilize templates for assessments, provide targeted evaluation metrics live during video calls, and keep structural records of feedback securely.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Live Video panel workspace
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Assessment templates library
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Collaboration note-taking
                      </li>
                      <li className="flex items-center text-sm font-semibold text-foreground/80">
                        <CheckCircle2 className="w-4.5 h-4.5 text-success mr-2 flex-shrink-0" />
                        Structured rubrics evaluation
                      </li>
                    </ul>
                    <Button onClick={() => navigate('/register?role=interviewer')} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Sign Up as Interviewer
                    </Button>
                  </div>
                  <div className="md:col-span-5 bg-accent/30 rounded-xl p-6 border border-border/40 text-center font-mono">
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-4">INTERVIEWER TEMPLATES</p>
                    <div className="space-y-2">
                      <div className="bg-card p-2.5 rounded-lg border border-border/80 text-left text-xs font-semibold text-foreground">
                        🧑‍💻 System Architecture Panel
                      </div>
                      <div className="bg-card p-2.5 rounded-lg border border-border/80 text-left text-xs font-semibold text-foreground">
                        ⚙️ Frontend Core DOM Assessment
                      </div>
                      <div className="bg-card p-2.5 rounded-lg border border-border/80 text-left text-xs font-semibold text-foreground">
                        🌱 Behavioral Competency Rubric
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-24 container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 text-center mb-16">
          <Badge className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
            ❓ Common Inquiries
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-border/80 rounded-xl px-6 bg-card/60 backdrop-blur-sm shadow-sm">
            <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
              How does the live AI evaluation analyze the speech response?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              Our system captures candidate speech patterns through Web Speech API. Once recorded, the response text is evaluated for logic structure, language relevance, and confidence factors using custom AI semantic analyzers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-border/80 rounded-xl px-6 bg-card/60 backdrop-blur-sm shadow-sm">
            <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
              Is the live coding workspace fully interactive?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              Yes, the coding rooms allow developers and candidates to write and test programs live inside the platform. It features multi-language support, syntactical highlights, and real-time collaboration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-border/80 rounded-xl px-6 bg-card/60 backdrop-blur-sm shadow-sm">
            <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline py-4">
              Can I customize candidate screening templates?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              Absolutely. Interviewers and managers can create custom templates, modify questions, and select specific scoring weights to target technical or organizational competencies.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/40 relative">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-8 relative">
          <h2 className="text-4xl font-extrabold text-foreground">
            Transform Your Hiring Process Today
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Join modern organizations utilizing TalentForge AI to save time and assess developers with high accuracy.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-4 shadow-glow"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;