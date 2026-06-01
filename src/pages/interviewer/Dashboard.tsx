import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  Calendar, 
  Clock, 
  Star,
  Users,
  CheckCircle2,
  MessageSquare,
  FileText
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InterviewerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - would come from API
  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Frontend Developer",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Technical Interview",
      company: "TechCorp",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      candidate: "Maria Garcia",
      position: "Product Manager",
      date: "2024-03-25", 
      time: "2:00 PM",
      type: "Behavioral Interview",
      company: "StartupXYZ",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      candidate: "David Kim",
      position: "Full Stack Developer",
      date: "2024-03-26",
      time: "11:00 AM", 
      type: "Coding Assessment",
      company: "InnovateLab",
      avatar: "/api/placeholder/32/32"
    }
  ];

  const completedInterviews = [
    {
      id: 1,
      candidate: "Emma Brown",
      position: "UX Designer",
      date: "2024-03-22",
      score: 4.2,
      status: "Completed",
      feedback: "Strong design skills, good communication"
    },
    {
      id: 2,
      candidate: "James Wilson", 
      position: "Backend Developer",
      date: "2024-03-21",
      score: 3.8,
      status: "Completed",
      feedback: "Good technical knowledge, needs improvement in system design"
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Interviewer Dashboard</h1>
            <p className="text-muted-foreground">Manage your interviews and evaluate candidates</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">4.1</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Interviews</span>
              </CardTitle>
              <CardDescription>Your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={interview.avatar} />
                      <AvatarFallback>{interview.candidate.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-medium">{interview.candidate}</h4>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                  <div className="text-right space-y-2">
                    <Badge className={getInterviewTypeColor(interview.type)}>
                      {interview.type}
                    </Badge>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/interview/${interview.id}`)}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Completed Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Recent Evaluations</span>  
              </CardTitle>
              <CardDescription>Recently completed interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{interview.candidate}</h4>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <p className="text-xs text-muted-foreground">Completed: {interview.date}</p>
                    <p className="text-sm">{interview.feedback}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="font-medium">{interview.score}</span>
                    </div>
                    <Badge variant="outline">
                      {interview.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Interview Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Tools</CardTitle>
            <CardDescription>Quick access to interview resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <Video className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Video Interview</h4>
                    <p className="text-sm text-muted-foreground">HD video calls with recording</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-secondary" />
                  <div>
                    <h4 className="font-medium">Coding Assessment</h4>
                    <p className="text-sm text-muted-foreground">Live coding challenges</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-8 w-8 text-warning" />
                  <div>
                    <h4 className="font-medium">Evaluation Forms</h4>
                    <p className="text-sm text-muted-foreground">Structured feedback</p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common interviewer tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/interviewer/interviews")}>
                <Video className="h-4 w-4 mr-2" />
                Start Interview
              </Button>
              <Button variant="outline" onClick={() => navigate("/interviewer/templates")}>
                <FileText className="h-4 w-4 mr-2" />
                View Templates
              </Button>
              <Button variant="outline" onClick={() => navigate("/interviewer/evaluations")}>
                <Star className="h-4 w-4 mr-2" />
                My Evaluations
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Availability
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InterviewerDashboard;