import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Video, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Login successful"
      });
      
      // Redirect based on user role
      const role = email.includes('recruiter') ? 'recruiter' : 
                   email.includes('admin') ? 'admin' :
                   email.includes('interviewer') ? 'interviewer' : 'candidate';
      navigate(`/${role}/dashboard`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: string) => {
    const demoCredentials = {
      candidate: { email: "candidate@demo.com", password: "demo123" },
      recruiter: { email: "recruiter@demo.com", password: "demo123" },
      interviewer: { email: "interviewer@demo.com", password: "demo123" },
      admin: { email: "admin@demo.com", password: "demo123" }
    };
    
    const creds = demoCredentials[role as keyof typeof demoCredentials];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-cyber-grid bg-background relative flex items-center justify-center p-6 overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mt-3">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage your assessments</p>
        </div>

        <Card className="glass-card shadow-lg border-border/80">
          <CardHeader className="space-y-1.5 pb-4">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-xs">
              Enter your credentials to enter the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-10 border-border/70 focus-visible:ring-primary/50 text-sm bg-background/40"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-95 text-white shadow-glow h-10 font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <Separator className="bg-border/60" />

            <div className="space-y-3">
              <p className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground text-center uppercase">
                Quick Trial Accounts
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('candidate')}
                  className="h-8 text-xs font-semibold hover:bg-accent/40"
                >
                  Candidate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('recruiter')}
                  className="h-8 text-xs font-semibold hover:bg-accent/40"
                >
                  Recruiter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('interviewer')}
                  className="h-8 text-xs font-semibold hover:bg-accent/40"
                >
                  Interviewer  
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="h-8 text-xs font-semibold hover:bg-accent/40"
                >
                  Admin
                </Button>
              </div>
            </div>

            <div className="text-center text-xs pt-2">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-bold">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;