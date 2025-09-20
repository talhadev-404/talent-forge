import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Video, 
  Code, 
  BarChart3, 
  Calendar, 
  Shield,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const userRoles = [
    {
      title: "For Candidates",
      description: "Find your dream job and ace interviews",
      icon: Users,
      role: "candidate",
      features: ["Browse Jobs", "Schedule Interviews", "Coding Tests", "Get Feedback"]
    },
    {
      title: "For Recruiters", 
      description: "Streamline your hiring process",
      icon: BarChart3,
      role: "recruiter", 
      features: ["Post Jobs", "Screen Candidates", "Schedule Interviews", "Analytics"]
    },
    {
      title: "For Interviewers",
      description: "Conduct professional interviews",
      icon: Video,
      role: "interviewer",
      features: ["Video Interviews", "Coding Sessions", "Evaluation Tools", "Feedback"]
    },
    {
      title: "For Admins",
      description: "Manage your organization",
      icon: Shield,
      role: "admin",
      features: ["User Management", "System Analytics", "Security", "Reports"]
    }
  ];

  const platformFeatures = [
    { icon: Video, title: "Live Video Interviews", desc: "HD video calls with screen sharing" },
    { icon: Code, title: "Coding Assessments", desc: "Multi-language coding challenges" },
    { icon: Calendar, title: "Smart Scheduling", desc: "Automated interview scheduling" },
    { icon: BarChart3, title: "AI Analytics", desc: "Performance insights and feedback" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">InterviewPro</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center text-white">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            Next-Generation Interview Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {" "}Hiring Process
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Complete interview platform with live video, coding assessments, 
            AI analytics, and seamless scheduling for modern teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-6 py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Everything You Need for Modern Interviews
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Built for Every Role
          </h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">
            Whether you're hiring, interviewing, or looking for your next opportunity, 
            we have the perfect tools for you.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userRoles.map((role, index) => (
              <Card key={index} className="bg-gradient-card border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <role.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90"
                    onClick={() => navigate(`/register?role=${role.role}`)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Interviews?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of companies already using InterviewPro to find the best talent.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-white text-primary hover:bg-white/90 shadow-glow"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto text-center text-blue-100">
          <p>&copy; 2024 InterviewPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;