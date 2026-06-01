import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Video,
  FileText,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";

const CandidateApplications = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      company: "TechCorp",
      position: "Senior Frontend Developer",
      location: "Remote",
      appliedDate: "2026-05-15",
      status: "In Progress",
      stage: "Live Video Round",
      nextAction: { text: "Join Interview", icon: Video, action: () => navigate("/interview/1") },
      progress: 60
    },
    {
      id: 2,
      company: "InnovateLab",
      position: "Full Stack Engineer",
      location: "New York, NY",
      appliedDate: "2026-05-10",
      status: "Action Required",
      stage: "Coding Assessment",
      nextAction: { text: "Start Assessment", icon: FileText, action: () => navigate("/coding-assessment/2") },
      progress: 40
    },
    {
      id: 3,
      company: "StartupXYZ",
      position: "React Developer",
      location: "San Francisco, CA",
      appliedDate: "2026-05-01",
      status: "Completed",
      stage: "Offer Received",
      nextAction: { text: "View Offer", icon: FileText, action: () => {} },
      progress: 100
    },
    {
      id: 4,
      company: "GlobalTech",
      position: "UI Developer",
      location: "Remote",
      appliedDate: "2026-04-20",
      status: "Rejected",
      stage: "Technical Interview",
      progress: 100
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress": return <Badge className="bg-primary/10 text-primary border-primary/20"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Action Required": return <Badge className="bg-warning/10 text-warning border-warning/20"><AlertCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Completed": return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Rejected": return <Badge variant="outline" className="text-muted-foreground border-border">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const activeApplications = applications.filter(app => app.status === "In Progress" || app.status === "Action Required");
  const pastApplications = applications.filter(app => app.status === "Completed" || app.status === "Rejected");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Applications</h1>
            <p className="text-muted-foreground">Track the status of your job applications</p>
          </div>
          <Button onClick={() => navigate("/candidate/jobs")} className="bg-gradient-primary hover:opacity-90">
            Browse New Jobs
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="active" className="rounded-lg text-sm px-4 py-2 font-medium">Active ({activeApplications.length})</TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg text-sm px-4 py-2 font-medium">Past ({pastApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeApplications.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">You don't have any active applications.</div>
            ) : (
              activeApplications.map((app) => (
                <Card key={app.id} className="glass-card border-border/80 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold">{app.position}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                              <Building2 className="w-4 h-4" />
                              <span className="font-medium text-foreground/80">{app.company}</span>
                              <span>&bull;</span>
                              <MapPin className="w-4 h-4" />
                              <span>{app.location}</span>
                            </div>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>
                        
                        <div className="pt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            Applied: <span className="font-medium text-foreground ml-1">{app.appliedDate}</span>
                          </div>
                          <div className="font-medium">
                            Stage: <span className="text-primary">{app.stage}</span>
                          </div>
                        </div>

                        <div className="w-full h-1.5 bg-accent/40 rounded-full mt-2 overflow-hidden border border-border/40">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all" 
                            style={{ width: `${app.progress}%` }}
                          />
                        </div>
                      </div>

                      {app.nextAction && (
                        <div className="flex items-center md:flex-col justify-end gap-3 md:pl-6 md:border-l border-border/50">
                          <Button 
                            className={`w-full md:w-auto ${app.status === "Action Required" ? "bg-warning text-warning-foreground hover:bg-warning/90" : "bg-gradient-primary text-white"}`}
                            onClick={app.nextAction.action}
                          >
                            <app.nextAction.icon className="w-4 h-4 mr-2" />
                            {app.nextAction.text}
                          </Button>
                          <Button variant="ghost" className="w-full md:w-auto text-muted-foreground hover:text-foreground">
                            View Details <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastApplications.map((app) => (
               <Card key={app.id} className="glass-card border-border/80 opacity-80 hover:opacity-100 transition-opacity">
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="space-y-2 flex-1">
                     <div className="flex items-start justify-between">
                       <div>
                         <h3 className="text-lg font-bold">{app.position}</h3>
                         <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                           <Building2 className="w-4 h-4" />
                           <span className="font-medium text-foreground/80">{app.company}</span>
                           <span>&bull;</span>
                           <MapPin className="w-4 h-4" />
                           <span>{app.location}</span>
                         </div>
                       </div>
                       {getStatusBadge(app.status)}
                     </div>
                     
                     <div className="pt-2 flex items-center space-x-6 text-sm">
                       <div className="flex items-center text-muted-foreground">
                         <Calendar className="w-4 h-4 mr-2" />
                         Applied: <span className="ml-1">{app.appliedDate}</span>
                       </div>
                       <div className="text-muted-foreground">
                         Final Stage: <span className="font-medium text-foreground">{app.stage}</span>
                       </div>
                     </div>
                   </div>

                   {app.status === "Completed" && app.nextAction && (
                     <div className="md:pl-6 md:border-l border-border/50">
                       <Button variant="outline" className="w-full md:w-auto border-success text-success hover:bg-success/10">
                         <app.nextAction.icon className="w-4 h-4 mr-2" />
                         {app.nextAction.text}
                       </Button>
                     </div>
                   )}
                 </div>
               </CardContent>
             </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateApplications;
