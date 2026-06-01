import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp,
  Plus,
  Eye,
  MessageSquare,
  BarChart3
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - would come from API
  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      applications: 24,
      status: "Active",
      postedDate: "2024-03-15"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      applications: 18,
      status: "Active", 
      postedDate: "2024-03-18"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      applications: 31,
      status: "Paused",
      postedDate: "2024-03-10"
    }
  ];

  const todaysInterviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Frontend Developer",
      time: "10:00 AM",
      interviewer: "Sarah Wilson",
      type: "Technical Interview"
    },
    {
      id: 2,
      candidate: "Maria Garcia",
      position: "Product Manager", 
      time: "2:00 PM",
      interviewer: "Mike Chen",
      type: "Culture Fit"
    }
  ];

  const recentCandidates = [
    {
      id: 1,
      name: "David Kim",
      position: "Senior Frontend Developer",
      score: 4.5,
      status: "Shortlisted",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Emma Brown", 
      position: "UX Designer",
      score: 4.2,
      status: "Interview Scheduled",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "James Wilson",
      position: "Product Manager",
      score: 3.8,
      status: "Under Review",
      avatar: "/api/placeholder/32/32"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Paused": return "bg-warning text-warning-foreground";
      case "Shortlisted": return "bg-primary text-primary-foreground";
      case "Interview Scheduled": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage your hiring pipeline and track candidates</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" onClick={() => navigate('/recruiter/jobs')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
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
                  <p className="text-sm text-muted-foreground">Total Candidates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">18%</p>
                  <p className="text-sm text-muted-foreground">Hire Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Active Job Postings</span>
              </CardTitle>
              <CardDescription>Your currently active job listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                    <p className="text-xs text-muted-foreground">Posted: {job.postedDate}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    <p className="text-sm font-medium">{job.applications} applications</p>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Today's Interviews</span>
              </CardTitle>
              <CardDescription>Scheduled interviews for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{interview.candidate}</h4>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <p className="text-xs text-muted-foreground">
                      {interview.time} • {interview.interviewer}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="outline">{interview.type}</Badge>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recent Candidates</span>
            </CardTitle>
            <CardDescription>Latest candidate applications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{candidate.score}/5.0</p>
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common recruiting tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/recruiter/jobs')}>
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Button>
              <Button variant="outline" onClick={() => navigate('/recruiter/candidates')}>
                <Users className="h-4 w-4 mr-2" />
                View Candidates
              </Button>
              <Button variant="outline" onClick={() => navigate('/recruiter/analytics')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" onClick={() => navigate('/recruiter/interviews')}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;