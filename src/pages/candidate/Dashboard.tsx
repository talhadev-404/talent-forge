import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Briefcase, 
  Star, 
  TrendingUp,
  Video,
  Code,
  FileText,
  Bell
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const CandidateDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - would come from API
  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Video Interview",
      interviewer: "Sarah Johnson"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer", 
      date: "2024-03-27",
      time: "2:00 PM",
      type: "Coding Assessment",
      interviewer: "Mike Chen"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      status: "Interview Scheduled",
      appliedDate: "2024-03-15"
    },
    {
      id: 2,
      company: "InnovateLab",
      position: "React Developer",
      status: "Under Review",
      appliedDate: "2024-03-18"
    },
    {
      id: 3,
      company: "DataFlow Inc",
      position: "Frontend Engineer",
      status: "Rejected",
      appliedDate: "2024-03-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled": return "bg-primary text-primary-foreground";
      case "Under Review": return "bg-warning text-warning-foreground";
      case "Rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Track your interviews and job applications</p>
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
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">4.2</p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">25%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
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
                  <div className="space-y-1">
                    <h4 className="font-medium">{interview.position}</h4>
                    <p className="text-sm text-muted-foreground">{interview.company}</p>
                    <div className="flex items-center space-x-4 text-sm">
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
                  <div className="text-right space-y-2">
                    <Badge variant="outline">{interview.type}</Badge>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/interview/${interview.id}`)}
                    >
                      {interview.type === "Video Interview" ? (
                        <><Video className="h-4 w-4 mr-1" /> Join</>
                      ) : (
                        <><Code className="h-4 w-4 mr-1" /> Start</>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Applications</span>
              </CardTitle>
              <CardDescription>Track your application status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{app.position}</h4>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                    <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/candidate/jobs')}
              >
                View All Applications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/candidate/jobs')}>
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Jobs
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Update Resume
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;