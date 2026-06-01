import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Search,
  Filter,
  Star,
  Download,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InterviewerEvaluations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const evaluations = [
    {
      id: 1,
      candidate: "Emma Brown",
      position: "UX Designer",
      date: "2026-05-30",
      score: 4.8,
      status: "Recommended",
      type: "Portfolio Review",
      avatar: ""
    },
    {
      id: 2,
      candidate: "James Wilson",
      position: "Backend Developer",
      date: "2026-05-29",
      score: 3.5,
      status: "Neutral",
      type: "Technical Interview",
      avatar: ""
    },
    {
      id: 3,
      candidate: "Liam Chen",
      position: "Senior Frontend Developer",
      date: "2026-05-25",
      score: 4.9,
      status: "Strong Hire",
      type: "System Design",
      avatar: ""
    },
    {
      id: 4,
      candidate: "Priya Patel",
      position: "Product Manager",
      date: "2026-05-20",
      score: 2.8,
      status: "Not Recommended",
      type: "Behavioral",
      avatar: ""
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Strong Hire": return "bg-success/10 text-success border-success/20";
      case "Recommended": return "bg-primary/10 text-primary border-primary/20";
      case "Neutral": return "bg-warning/10 text-warning border-warning/20";
      case "Not Recommended": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const filteredEvals = evaluations.filter(e => e.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || e.position.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Evaluations</h1>
            <p className="text-muted-foreground">Review your past candidate assessments and feedback</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="glass-card border-border/80">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{evaluations.length}</p>
                  <p className="text-sm text-muted-foreground">Total Evaluations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/80">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {(evaluations.reduce((acc, curr) => acc + curr.score, 0) / evaluations.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Average Score Given</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card border-border/80">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">
                    {evaluations.filter(e => e.status.includes("Hire") || e.status === "Recommended").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Recommended Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by candidate or role..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="strong">Strong Hire</SelectItem>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="no">Not Recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/80 overflow-hidden">
          <CardHeader>
            <CardTitle>Evaluation History</CardTitle>
            <CardDescription>Detailed records of your submitted feedback</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="pl-6">Candidate</TableHead>
                  <TableHead>Interview Details</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center p-8 text-muted-foreground">No evaluations found.</TableCell>
                  </TableRow>
                ) : (
                  filteredEvals.map((evaluation) => (
                    <TableRow key={evaluation.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9 border border-border/60">
                            <AvatarImage src={evaluation.avatar} />
                            <AvatarFallback className="text-xs font-bold bg-accent/60">
                              {evaluation.candidate.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm">{evaluation.candidate}</p>
                            <p className="text-xs text-muted-foreground">{evaluation.position}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{evaluation.type}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {evaluation.date}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="font-bold text-sm">{evaluation.score.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${getStatusColor(evaluation.status)}`}>
                          {evaluation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InterviewerEvaluations;
