import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  XCircle,
  Play,
  MessageSquare,
  Plus,
  Filter,
  MapPin,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Interview {
  id: number;
  candidate: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  duration: string;
  type: "technical" | "behavioral" | "culture-fit" | "system-design" | "final";
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  score?: number;
  feedback?: string;
}

const mockInterviews: Interview[] = [
  { id: 1, candidate: "Sarah Johnson", position: "Senior Frontend Developer", interviewer: "Mike Chen", date: "2026-06-01", time: "10:00 AM", duration: "60 min", type: "technical", status: "scheduled" },
  { id: 2, candidate: "David Kim", position: "Senior Frontend Developer", interviewer: "Lisa Wang", date: "2026-06-01", time: "2:00 PM", duration: "45 min", type: "system-design", status: "scheduled" },
  { id: 3, candidate: "Alex Rivera", position: "DevOps Engineer", interviewer: "James Lee", date: "2026-06-01", time: "4:30 PM", duration: "60 min", type: "technical", status: "in-progress" },
  { id: 4, candidate: "Maria Garcia", position: "Product Manager", interviewer: "Elena Rodriguez", date: "2026-05-31", time: "11:00 AM", duration: "45 min", type: "behavioral", status: "completed", score: 92, feedback: "Excellent communication and strategic thinking" },
  { id: 5, candidate: "Olivia Taylor", position: "UX Designer", interviewer: "Sarah Wilson", date: "2026-05-31", time: "3:00 PM", duration: "60 min", type: "culture-fit", status: "completed", score: 88, feedback: "Strong cultural alignment, great portfolio" },
  { id: 6, candidate: "Priya Patel", position: "Product Manager", interviewer: "Mike Chen", date: "2026-05-30", time: "9:00 AM", duration: "45 min", type: "final", status: "completed", score: 65, feedback: "Needs more experience in enterprise products" },
  { id: 7, candidate: "Noah Martinez", position: "Backend Python Engineer", interviewer: "James Lee", date: "2026-05-30", time: "1:00 PM", duration: "60 min", type: "technical", status: "cancelled" },
  { id: 8, candidate: "Emma Brown", position: "Backend Python Engineer", interviewer: "Lisa Wang", date: "2026-05-29", time: "10:30 AM", duration: "60 min", type: "technical", status: "no-show" },
  { id: 9, candidate: "Liam Chen", position: "Senior Frontend Developer", interviewer: "Elena Rodriguez", date: "2026-05-28", time: "2:00 PM", duration: "45 min", type: "final", status: "completed", score: 96, feedback: "Outstanding candidate — extend offer immediately" },
];

const Interviews = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const todayInterviews = mockInterviews.filter(i => i.date === "2026-06-01");
  const upcomingInterviews = mockInterviews.filter(i => i.status === "scheduled" || i.status === "in-progress");
  const pastInterviews = mockInterviews.filter(i => i.status === "completed" || i.status === "cancelled" || i.status === "no-show");

  const getStatusBadge = (status: string) => {
    const map: Record<string, { className: string; icon: React.ReactNode }> = {
      scheduled: { className: "bg-primary/10 text-primary border-primary/20", icon: <Clock className="w-3 h-3 mr-1" /> },
      "in-progress": { className: "bg-secondary/10 text-secondary border-secondary/20", icon: <Play className="w-3 h-3 mr-1" /> },
      completed: { className: "bg-success/10 text-success border-success/20", icon: <CheckCircle2 className="w-3 h-3 mr-1" /> },
      cancelled: { className: "bg-muted text-muted-foreground border-border", icon: <XCircle className="w-3 h-3 mr-1" /> },
      "no-show": { className: "bg-destructive/10 text-destructive border-destructive/20", icon: <AlertCircle className="w-3 h-3 mr-1" /> },
    };
    const s = map[status] || map.scheduled;
    return (
      <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${s.className}`}>
        {s.icon}{status.replace("-", " ")}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const map: Record<string, string> = {
      technical: "bg-primary/10 text-primary border-primary/20",
      behavioral: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "culture-fit": "bg-secondary/10 text-secondary border-secondary/20",
      "system-design": "bg-warning/10 text-warning border-warning/20",
      final: "bg-success/10 text-success border-success/20",
    };
    return map[type] || "";
  };

  const stats = [
    { label: "Today's Interviews", value: todayInterviews.length.toString(), icon: Calendar, color: "text-primary" },
    { label: "This Week", value: "12", icon: Clock, color: "text-secondary" },
    { label: "Completed", value: pastInterviews.filter(i => i.status === "completed").length.toString(), icon: CheckCircle2, color: "text-success" },
    { label: "No-Shows", value: pastInterviews.filter(i => i.status === "no-show").length.toString(), icon: AlertCircle, color: "text-destructive" },
  ];

  const renderInterviewTable = (interviews: Interview[]) => (
    <Table>
      <TableHeader>
        <TableRow className="border-border/60 hover:bg-transparent">
          <TableHead className="pl-6">Candidate</TableHead>
          <TableHead className="hidden md:table-cell">Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead className="hidden lg:table-cell">Interviewer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center hidden lg:table-cell">Score</TableHead>
          <TableHead className="text-right pr-6">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {interviews.map((interview) => (
          <TableRow key={interview.id} className="border-border/40 hover:bg-accent/30 transition-colors">
            <TableCell className="pl-6">
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 border border-border/60">
                  <AvatarFallback className="text-xs font-bold bg-accent/60">
                    {interview.candidate.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{interview.candidate}</p>
                  <p className="text-xs text-muted-foreground">{interview.position}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${getTypeBadge(interview.type)}`}>
                {interview.type.replace("-", " ")}
              </Badge>
            </TableCell>
            <TableCell>
              <div>
                <p className="text-sm font-medium">{interview.date}</p>
                <p className="text-xs text-muted-foreground">{interview.time} · {interview.duration}</p>
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{interview.interviewer}</TableCell>
            <TableCell>{getStatusBadge(interview.status)}</TableCell>
            <TableCell className="text-center hidden lg:table-cell">
              {interview.score ? (
                <span className={`font-bold text-sm font-mono ${interview.score >= 80 ? "text-success" : interview.score >= 60 ? "text-warning" : "text-destructive"}`}>
                  {interview.score}%
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell className="text-right pr-6">
              {interview.status === "scheduled" ? (
                <Button size="sm" className="bg-gradient-primary text-white text-xs">
                  <Video className="w-3 h-3 mr-1" /> Join
                </Button>
              ) : interview.status === "in-progress" ? (
                <Button size="sm" className="bg-secondary text-secondary-foreground text-xs animate-pulse">
                  <Play className="w-3 h-3 mr-1" /> Live
                </Button>
              ) : interview.status === "completed" ? (
                <Button size="sm" variant="outline" className="text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" /> Review
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="text-xs" disabled>
                  N/A
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interviews</h1>
            <p className="text-muted-foreground">Schedule, manage, and review all interviews</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-card border-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-accent/40 flex items-center justify-center border border-border/60">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule Highlight */}
        {todayInterviews.length > 0 && (
          <Card className="glass-card border-border/80 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Today's Schedule</span>
                <Badge className="bg-primary/10 text-primary border border-primary/20 ml-2 font-mono text-xs">{todayInterviews.length} interviews</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {todayInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center space-x-3 p-3 rounded-xl border border-border/60 bg-accent/20 hover:bg-accent/30 transition-all flex-1 min-w-[280px]">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xs shadow-glow">
                      {interview.time.split(":")[0]}{interview.time.includes("PM") ? "PM" : "AM"}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{interview.candidate}</p>
                      <p className="text-xs text-muted-foreground">{interview.position} · {interview.type}</p>
                    </div>
                    {getStatusBadge(interview.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="upcoming" className="rounded-lg text-sm px-4 py-2 font-medium">Upcoming ({upcomingInterviews.length})</TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg text-sm px-4 py-2 font-medium">Past ({pastInterviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Upcoming Interviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {renderInterviewTable(upcomingInterviews)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Past Interviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {renderInterviewTable(pastInterviews)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;
