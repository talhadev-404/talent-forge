import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Briefcase, 
  Star, 
  TrendingUp,
  Video,
  Code,
  FileText,
  Bell,
  Award,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";

const scoreData = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 74 },
  { day: "Wed", score: 81 },
  { day: "Thu", score: 79 },
  { day: "Fri", score: 88 },
  { day: "Sat", score: 91 },
  { day: "Sun", score: 94 }
];

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileCompleted, setProfileCompleted] = useState(85);

  // Mock application roadmap stages
  const activeRoadmap = {
    company: "TechCorp",
    position: "Senior Frontend Developer",
    steps: [
      { name: "Application Sent", status: "completed", date: "Mar 15" },
      { name: "Coding Challenge", status: "completed", date: "Mar 18", score: "92%" },
      { name: "Live Video Round", status: "active", date: "Mar 25", time: "10:00 AM", interviewId: 1 },
      { name: "Executive Review", status: "pending" },
      { name: "Final Offer", status: "pending" }
    ]
  };

  const recommendedJobs = [
    { id: 1, company: "Stripe", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$140k - $170k" },
    { id: 2, company: "Vercel", position: "Senior React Specialist", location: "Remote", type: "Full-time", salary: "$160k - $190k" },
    { id: 3, company: "Linear", position: "Frontend Product Engineer", location: "Remote", type: "Full-time", salary: "$130k - $155k" }
  ];

  const recentTimeline = [
    { id: 1, type: "ai", text: "AI assessment graded your Leaky Bucket rate limiter simulator mock.", value: "93% Grade", time: "2 hours ago" },
    { id: 2, type: "schedule", text: "Sarah Johnson scheduled your Live Technical Panel for March 25th.", value: "10:00 AM", time: "1 day ago" },
    { id: 3, type: "test", text: "Coding Workspace test 'DOM Tree Parsing Optimization' submitted.", value: "Passed", time: "3 days ago" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 relative">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here is your current preparation progress and interview pipeline.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold font-mono text-primary uppercase">COMPLETENESS</p>
              <p className="text-sm font-semibold">{profileCompleted}% Complete Profile</p>
            </div>
            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="font-extrabold">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Top Row: Visual Progress Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card shadow-sm border-border/80">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-black font-mono">12</p>
                <p className="text-xs text-muted-foreground font-semibold">Active Applications</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow-sm border-border/80">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-secondary animate-pulse" />
              </div>
              <div>
                <p className="text-2xl font-black font-mono">3</p>
                <p className="text-xs text-muted-foreground font-semibold">Scheduled Panels</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow-sm border-border/80">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-black font-mono">94%</p>
                <p className="text-xs text-muted-foreground font-semibold">AI Mock Average</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow-sm border-border/80">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-success/15 border border-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-black font-mono">82%</p>
                <p className="text-xs text-muted-foreground font-semibold">Hiring Match Index</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section: Chart & Interactive Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recharts Skill Trend Area Chart */}
          <Card className="lg:col-span-7 glass-card border-border/80 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold flex items-center">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                Preparation Score Trend
              </CardTitle>
              <CardDescription className="text-xs">Weekly coding and behavior preparation scoring curve</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(235, 90%, 64%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(235, 90%, 64%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(10, 12, 22, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(235, 90%, 64%)" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#scoreColor)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Interactive Pipeline Roadmap */}
          <Card className="lg:col-span-5 glass-card border-border/80 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold flex items-center">
                <Award className="h-5 w-5 text-secondary mr-2" />
                Pipeline Pipeline Roadmap
              </CardTitle>
              <CardDescription className="text-xs">Active tracking at {activeRoadmap.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="pb-2 border-b border-border/60">
                  <h4 className="font-bold text-sm text-foreground">{activeRoadmap.position}</h4>
                  <p className="text-xs text-muted-foreground">{activeRoadmap.company}</p>
                </div>
                
                {/* Stepper Steps */}
                <div className="relative pl-6 space-y-5">
                  {/* Vertical Line */}
                  <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-border/70" />

                  {activeRoadmap.steps.map((step, idx) => (
                    <div key={idx} className="relative flex justify-between items-start text-xs">
                      {/* Step Indicator Dot */}
                      <div className={`absolute left-[-21px] w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                        step.status === "completed" 
                          ? "bg-success border-success text-success-foreground"
                          : step.status === "active"
                            ? "bg-primary border-primary text-white animate-pulse"
                            : "bg-background border-border text-muted-foreground"
                      }`}>
                        {step.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {step.status === "active" && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        {step.status === "pending" && <span className="w-1 h-1 bg-muted-foreground rounded-full" />}
                      </div>

                      <div className="space-y-0.5">
                        <p className={`font-semibold ${step.status === "active" ? "text-primary" : "text-foreground"}`}>{step.name}</p>
                        {step.score && <p className="text-[10px] text-success font-mono font-bold">Grade: {step.score}</p>}
                        {step.time && <p className="text-[10px] text-muted-foreground font-mono">{step.date} at {step.time}</p>}
                      </div>

                      {step.status === "active" && step.interviewId && (
                        <Button 
                          size="sm"
                          className="h-7 text-[10px] bg-gradient-primary text-white"
                          onClick={() => navigate(`/interview/${step.interviewId}`)}
                        >
                          <Video className="w-3 h-3 mr-1" /> Join Panel
                        </Button>
                      )}

                      {step.status === "completed" && step.date && !step.score && (
                        <span className="text-[10px] text-muted-foreground font-mono">{step.date}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section: Job Recommendations & Timeline logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recommended Jobs */}
          <Card className="glass-card border-border/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center">
                <Briefcase className="h-5 w-5 text-primary mr-2" />
                Target Matches Recommendations
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">Jobs tailoring to your React & Frontend skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4.5">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="flex justify-between items-center p-3.5 rounded-xl border border-border/70 bg-card/40 hover:bg-accent/30 transition-colors">
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs">{job.position}</h5>
                    <p className="text-[11px] text-muted-foreground font-semibold">{job.company} &bull; {job.location}</p>
                    <div className="flex gap-2 pt-1">
                      <Badge variant="outline" className="text-[9px] h-4 py-0 font-semibold">{job.type}</Badge>
                      <Badge variant="secondary" className="text-[9px] h-4 py-0 font-semibold text-primary bg-primary/10 border-primary/20">{job.salary}</Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => navigate('/candidate/jobs')}
                    className="h-8 text-xs font-semibold hover:bg-accent/40"
                  >
                    Apply <ChevronRight className="w-3 h-3 ml-0.5" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline Feed & Notification Logs */}
          <Card className="glass-card border-border/80 shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center">
                <Bell className="h-5 w-5 text-secondary mr-2" />
                Activity Timeline Logs
              </CardTitle>
              <CardDescription className="text-xs">Chronological feedback and scheduling updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTimeline.map((item) => (
                <div key={item.id} className="flex items-start space-x-3.5 text-xs pb-3.5 border-b border-border/50 last:border-0 last:pb-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    item.type === "ai" 
                      ? "bg-purple-500/15 border-purple-500/35 text-purple-500" 
                      : item.type === "schedule"
                        ? "bg-primary/15 border-primary/35 text-primary"
                        : "bg-success/15 border-success/35 text-success"
                  }`}>
                    {item.type === "ai" && <Sparkles className="w-4 h-4" />}
                    {item.type === "schedule" && <Clock className="w-4 h-4" />}
                    {item.type === "test" && <Code className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-foreground/80">{item.text}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-muted-foreground font-mono">
                      <span>{item.time}</span>
                      <span>&bull;</span>
                      <span className="font-bold text-foreground">{item.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;