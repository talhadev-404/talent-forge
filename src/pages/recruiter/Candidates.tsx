import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  UserCheck,
  UserX,
  Download,
  MessageSquare,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  stage: "applied" | "screening" | "interview" | "assessment" | "offer" | "hired" | "rejected";
  score: number;
  appliedDate: string;
  experience: string;
  skills: string[];
}

const mockCandidates: Candidate[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", position: "Senior Frontend Developer", stage: "interview", score: 92, appliedDate: "2026-05-18", experience: "6 years", skills: ["React", "TypeScript", "Node.js"] },
  { id: 2, name: "David Kim", email: "david.k@email.com", position: "Senior Frontend Developer", stage: "assessment", score: 88, appliedDate: "2026-05-20", experience: "5 years", skills: ["Vue.js", "JavaScript", "CSS"] },
  { id: 3, name: "Maria Garcia", email: "maria.g@email.com", position: "Product Manager", stage: "offer", score: 95, appliedDate: "2026-05-12", experience: "8 years", skills: ["Strategy", "Agile", "Analytics"] },
  { id: 4, name: "James Wilson", email: "james.w@email.com", position: "UX Designer", stage: "screening", score: 74, appliedDate: "2026-05-25", experience: "4 years", skills: ["Figma", "User Research", "Prototyping"] },
  { id: 5, name: "Emma Brown", email: "emma.b@email.com", position: "Backend Python Engineer", stage: "applied", score: 0, appliedDate: "2026-05-28", experience: "3 years", skills: ["Python", "Django", "PostgreSQL"] },
  { id: 6, name: "Alex Rivera", email: "alex.r@email.com", position: "DevOps Engineer", stage: "interview", score: 81, appliedDate: "2026-05-22", experience: "7 years", skills: ["AWS", "Docker", "Kubernetes"] },
  { id: 7, name: "Priya Patel", email: "priya.p@email.com", position: "Product Manager", stage: "rejected", score: 62, appliedDate: "2026-05-10", experience: "2 years", skills: ["Jira", "Scrum", "Roadmapping"] },
  { id: 8, name: "Liam Chen", email: "liam.c@email.com", position: "Senior Frontend Developer", stage: "hired", score: 96, appliedDate: "2026-04-28", experience: "9 years", skills: ["React", "Next.js", "GraphQL"] },
  { id: 9, name: "Olivia Taylor", email: "olivia.t@email.com", position: "UX Designer", stage: "assessment", score: 85, appliedDate: "2026-05-19", experience: "5 years", skills: ["Sketch", "Adobe XD", "CSS"] },
  { id: 10, name: "Noah Martinez", email: "noah.m@email.com", position: "Backend Python Engineer", stage: "screening", score: 70, appliedDate: "2026-05-26", experience: "4 years", skills: ["Python", "FastAPI", "Redis"] },
];

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");

  const filteredCandidates = mockCandidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "all" || c.stage === stageFilter;
    const matchesPosition = positionFilter === "all" || c.position === positionFilter;
    return matchesSearch && matchesStage && matchesPosition;
  });

  const uniquePositions = [...new Set(mockCandidates.map(c => c.position))];

  const getStageBadge = (stage: string) => {
    const map: Record<string, string> = {
      applied: "bg-muted text-muted-foreground border-border",
      screening: "bg-primary/10 text-primary border-primary/20",
      interview: "bg-secondary/10 text-secondary border-secondary/20",
      assessment: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      offer: "bg-warning/10 text-warning border-warning/20",
      hired: "bg-success/10 text-success border-success/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return map[stage] || "";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const pipelineStages = [
    { name: "Applied", count: mockCandidates.filter(c => c.stage === "applied").length, color: "bg-muted-foreground" },
    { name: "Screening", count: mockCandidates.filter(c => c.stage === "screening").length, color: "bg-primary" },
    { name: "Interview", count: mockCandidates.filter(c => c.stage === "interview").length, color: "bg-secondary" },
    { name: "Assessment", count: mockCandidates.filter(c => c.stage === "assessment").length, color: "bg-purple-500" },
    { name: "Offer", count: mockCandidates.filter(c => c.stage === "offer").length, color: "bg-warning" },
    { name: "Hired", count: mockCandidates.filter(c => c.stage === "hired").length, color: "bg-success" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Candidates</h1>
            <p className="text-muted-foreground">Review and manage your candidate pipeline</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>

        {/* Pipeline Overview */}
        <Card className="glass-card border-border/80">
          <CardHeader>
            <CardTitle className="text-base">Hiring Pipeline</CardTitle>
            <CardDescription>Current candidate distribution across stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="flex-1 text-center group">
                  <div className={`h-10 ${stage.color} rounded-lg flex items-center justify-center mb-2 transition-all group-hover:scale-105`} style={{ opacity: 0.15 + (stage.count / mockCandidates.length) }}>
                    <span className="text-lg font-extrabold">{stage.count}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{stage.name}</p>
                  {i < pipelineStages.length - 1 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search candidates by name or email..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="assessment">Assessment</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-full md:w-52">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {uniquePositions.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="glass-card border-border/80 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Candidates</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs">{filteredCandidates.length} results</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="pl-6">Candidate</TableHead>
                  <TableHead className="hidden md:table-cell">Position</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">Score</TableHead>
                  <TableHead className="hidden lg:table-cell">Skills</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="border-border/40 hover:bg-accent/30 cursor-pointer transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9 border border-border/60">
                          <AvatarFallback className="text-xs font-bold bg-accent/60">
                            {candidate.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm">{candidate.position}</p>
                      <p className="text-xs text-muted-foreground">{candidate.experience} exp</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${getStageBadge(candidate.stage)}`}>
                        {candidate.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {candidate.score > 0 ? (
                        <span className={`font-bold text-sm font-mono ${getScoreColor(candidate.score)}`}>{candidate.score}%</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-[9px] font-medium">{skill}</Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="outline" className="text-[9px] font-medium">+{candidate.skills.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/40">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer"><Eye className="mr-2 h-4 w-4" /> View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer"><Mail className="mr-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer"><Calendar className="mr-2 h-4 w-4" /> Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer"><MessageSquare className="mr-2 h-4 w-4" /> Add Note</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-success"><UserCheck className="mr-2 h-4 w-4" /> Advance Stage</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive"><UserX className="mr-2 h-4 w-4" /> Reject</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Candidates;
