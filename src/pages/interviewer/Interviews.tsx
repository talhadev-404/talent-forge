import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Video,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  AlertCircle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

const InterviewerInterviews = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Frontend Developer",
      date: "2026-06-02",
      time: "10:00 AM",
      type: "Technical Interview",
      status: "Scheduled",
      avatar: ""
    },
    {
      id: 2,
      candidate: "Maria Garcia",
      position: "Product Manager",
      date: "2026-06-02", 
      time: "2:00 PM",
      type: "Behavioral Interview",
      status: "Scheduled",
      avatar: ""
    },
    {
      id: 3,
      candidate: "David Kim",
      position: "Full Stack Developer",
      date: "2026-06-03",
      time: "11:00 AM", 
      type: "Coding Assessment",
      status: "Scheduled",
      avatar: ""
    }
  ];

  const pastInterviews = [
    {
      id: 4,
      candidate: "Emma Brown",
      position: "UX Designer",
      date: "2026-05-30",
      time: "1:00 PM",
      type: "Portfolio Review",
      status: "Completed",
      avatar: ""
    },
    {
      id: 5,
      candidate: "James Wilson",
      position: "Backend Developer",
      date: "2026-05-29",
      time: "3:30 PM",
      type: "Technical Interview",
      status: "Completed",
      avatar: ""
    }
  ];

  const getInterviewTypeColor = (type: string) => {
    switch (type) {
      case "Technical Interview": return "bg-primary text-primary-foreground";
      case "Behavioral Interview": return "bg-secondary text-secondary-foreground";
      case "Coding Assessment": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredUpcoming = upcomingInterviews.filter(i => i.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || i.position.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPast = pastInterviews.filter(i => i.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || i.position.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Interviews</h1>
            <p className="text-muted-foreground">View and manage your upcoming interview schedule</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/interviewer/evaluations")}>
            <FileText className="h-4 w-4 mr-2" />
            View Evaluations
          </Button>
        </div>

        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search candidates or positions..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Interview Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="coding">Coding Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="upcoming" className="rounded-lg text-sm px-4 py-2 font-medium">Upcoming ({filteredUpcoming.length})</TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg text-sm px-4 py-2 font-medium">Past ({filteredPast.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid gap-4">
              {filteredUpcoming.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">No upcoming interviews found.</div>
              ) : (
                filteredUpcoming.map((interview) => (
                  <Card key={interview.id} className="glass-card border-border/80">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border border-border/60">
                          <AvatarImage src={interview.avatar} />
                          <AvatarFallback className="text-sm font-bold bg-accent/60">{interview.candidate.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{interview.candidate}</h4>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{interview.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{interview.time}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge className={getInterviewTypeColor(interview.type)}>
                          {interview.type}
                        </Badge>
                        <Button onClick={() => navigate(`/interview/${interview.id}`)} className="w-full sm:w-auto bg-gradient-primary text-white">
                          <Video className="h-4 w-4 mr-2" />
                          Join Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-4">
              {filteredPast.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">No past interviews found.</div>
              ) : (
                filteredPast.map((interview) => (
                  <Card key={interview.id} className="glass-card border-border/80">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border border-border/60">
                          <AvatarImage src={interview.avatar} />
                          <AvatarFallback className="text-sm font-bold bg-accent/60">{interview.candidate.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{interview.candidate}</h4>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{interview.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              <span className="text-success font-medium">Completed</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                          {interview.type}
                        </Badge>
                        <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/interviewer/evaluations")}>
                          View Evaluation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InterviewerInterviews;
