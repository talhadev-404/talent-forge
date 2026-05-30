import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { 
  Video, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Code,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: (searchParams.get('role') as UserRole) || "candidate"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      toast({
        title: "Welcome to TalentForge AI!",
        description: "Your account has been created successfully"
      });
      navigate(`/${formData.role}/dashboard`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const rolesList: { role: UserRole; title: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { role: "candidate", title: "Candidate", desc: "For job seekers practicing & taking panels", icon: User },
    { role: "recruiter", title: "Recruiter", desc: "For hiring managers & talent acquisition teams", icon: Briefcase },
    { role: "interviewer", title: "Interviewer", desc: "For technical assessors hosting workspace rounds", icon: Video },
    { role: "admin", title: "Admin", desc: "For core organization & system monitoring", icon: Shield }
  ];

  const highlights = [
    { icon: Sparkles, text: "Instant AI Performance Scorecard" },
    { icon: Code, text: "Embedded Collaborative Coding IDE" },
    { icon: Video, text: "Sleek Real-time Video Stream Workspace" },
    { icon: Shield, text: "Secure Automated Hiring Pipeline Logs" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col lg:grid lg:grid-cols-12 relative overflow-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Left Panel: Presentation Branding (lg:col-span-5) */}
      <div className="hidden lg:flex lg:col-span-5 bg-cyber-grid bg-card border-r border-border/80 p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Logo */}
        <Link to="/" className="inline-flex items-center space-x-2.5 relative z-10">
          <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
        </Link>

        {/* Dynamic Highlights block */}
        <div className="space-y-8 relative z-10 my-auto">
          <div className="space-y-3">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold tracking-widest uppercase">
              RECRUITMENT ACCELERATION
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Unlock Next-Gen Hiring Pipelines
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Practice mock rounds, compile logic inside streams, and analyze candidate metrics instantly.
            </p>
          </div>

          <ul className="space-y-4">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-xs font-semibold text-foreground/80">
                <div className="w-7 h-7 rounded-lg bg-accent/40 border border-border/70 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Small stats banner footer */}
        <div className="relative z-10 border-t border-border/60 pt-6 flex items-center space-x-4">
          <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-normal">
            Join thousands of teams utilizing **TalentForge AI** to evaluate talent efficiently.
          </p>
        </div>

      </div>

      {/* Right Panel: Form Console (lg:col-span-7) */}
      <div className="flex-1 lg:col-span-7 flex flex-col justify-center items-center p-6 md:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-xl space-y-6">
          
          {/* Logo only shown on small devices */}
          <div className="text-center lg:hidden">
            <Link to="/" className="inline-flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Video className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
            </Link>
          </div>

          <div className="text-left space-y-1 md:text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create Your Account</h1>
            <p className="text-sm text-muted-foreground">Sign up in seconds to start evaluating or interviewing</p>
          </div>

          <Card className="glass-card shadow-lg border-border/80">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-foreground/80">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-9 h-10 border-border/70 focus-visible:ring-primary/50 text-sm bg-background/40"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-9 h-10 border-border/70 focus-visible:ring-primary/50 text-sm bg-background/40"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-9 pr-9 h-10 border-border/70 focus-visible:ring-primary/50 text-sm bg-background/40"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Interactive Card Role Selector */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground/80">Select Your Registration Role</Label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {rolesList.map((item) => {
                      const isSelected = formData.role === item.role;
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.role}
                          type="button"
                          onClick={() => setFormData({...formData, role: item.role})}
                          className={`flex flex-col text-left p-3 rounded-xl border transition-all text-xs relative ${
                            isSelected 
                              ? "border-primary bg-primary/[0.03] shadow-sm" 
                              : "border-border/80 bg-background/30 hover:bg-accent/40"
                          }`}
                        >
                          {/* Active check indicator badge */}
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center text-white">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 border ${
                            isSelected 
                              ? "bg-primary/10 border-primary/20 text-primary" 
                              : "bg-accent/40 border-border/60 text-muted-foreground"
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-foreground mb-0.5">{item.title}</span>
                          <span className="text-[10px] text-muted-foreground leading-normal">{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-95 text-white shadow-glow h-10 font-semibold mt-2" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

              </form>

              <div className="text-center text-xs pt-4 mt-4 border-t border-border/50">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:underline font-bold">
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
};

export default Register;