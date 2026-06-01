import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Upload,
  Save,
  FileText,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const CandidateProfile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and resume</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Basic Info */}
          <div className="space-y-6">
            <Card className="glass-card border-border/80 text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="relative inline-block group">
                  <Avatar className="h-32 w-32 border-4 border-accent/40 shadow-xl">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-4xl font-black bg-accent/60">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Upload className="h-6 w-6 text-white" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user?.name || "Candidate Name"}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="pt-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Open to Opportunities
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <LinkIcon className="w-4 h-4 mr-2 text-primary" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center">
                    <Linkedin className="w-3 h-3 mr-1" /> LinkedIn
                  </Label>
                  <Input placeholder="https://linkedin.com/in/username" defaultValue="https://linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center">
                    <Github className="w-3 h-3 mr-1" /> GitHub
                  </Label>
                  <Input placeholder="https://github.com/username" defaultValue="https://github.com/johndoe" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center">
                    <Code className="w-3 h-3 mr-1" /> Portfolio
                  </Label>
                  <Input placeholder="https://yourportfolio.com" defaultValue="https://johndoe.dev" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Detailed Forms */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl w-full justify-start overflow-x-auto">
                <TabsTrigger value="personal" className="rounded-lg text-sm px-4 py-2 font-medium">Personal Info</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-lg text-sm px-4 py-2 font-medium">Experience & Education</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-lg text-sm px-4 py-2 font-medium">Skills & Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="glass-card border-border/80">
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                    <CardDescription>Your main contact and identification details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user?.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input type="email" defaultValue={user?.email} />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input placeholder="City, Country" className="pl-9" defaultValue="San Francisco, CA" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2">
                      <Label>Professional Summary</Label>
                      <Textarea 
                        placeholder="Write a brief summary of your professional background and goals..." 
                        className="resize-none"
                        rows={4}
                        defaultValue="Passionate frontend developer with 5+ years of experience building scalable web applications. Strong focus on UI/UX, performance optimization, and clean code architecture."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/80 border-dashed border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent/40 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Resume / CV</h3>
                      <p className="text-sm text-muted-foreground">Upload your latest resume in PDF or Word format</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" /> Upload New File
                      </Button>
                      <Button variant="ghost" className="text-primary hover:text-primary/80">
                        View Current Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="glass-card border-border/80">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-secondary" />
                        Work Experience
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative pl-6 pb-2 border-l border-border/50">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-background" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-base">Senior Frontend Developer</h4>
                        <p className="text-sm font-medium text-foreground/80">TechCorp Inc. &bull; <span className="text-muted-foreground font-normal">Jan 2023 - Present</span></p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Lead development of core platform features using React and TypeScript. Improved initial load time by 40% through code splitting and lazy loading.
                        </p>
                      </div>
                    </div>
                    <div className="relative pl-6 pb-2 border-l border-border/50">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted ring-4 ring-background" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-base">Frontend Web Developer</h4>
                        <p className="text-sm font-medium text-foreground/80">Digital Agency &bull; <span className="text-muted-foreground font-normal">Mar 2020 - Dec 2022</span></p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Built responsive client websites and e-commerce platforms. Worked closely with design team to implement pixel-perfect UIs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/80 mt-6">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-warning" />
                        Education
                      </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative pl-6 border-l border-border/50">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-warning ring-4 ring-background" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-base">B.S. Computer Science</h4>
                        <p className="text-sm font-medium text-foreground/80">State University &bull; <span className="text-muted-foreground font-normal">2016 - 2020</span></p>
                        <p className="text-sm text-muted-foreground mt-1">GPA: 3.8/4.0. Minor in Mathematics.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className="glass-card border-border/80">
                  <CardHeader>
                    <CardTitle className="text-lg">Core Skills</CardTitle>
                    <CardDescription>Add skills to help match you with the right jobs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Technical Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "GraphQL", "Git", "Jest"].map((skill) => (
                          <Badge key={skill} className="bg-accent/40 text-foreground border-border hover:bg-accent/60 text-sm px-3 py-1 cursor-default">
                            {skill} <span className="ml-2 text-muted-foreground hover:text-destructive cursor-pointer">&times;</span>
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="h-7 border-dashed rounded-full text-xs">
                          <Plus className="w-3 h-3 mr-1" /> Add Skill
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border/80 mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Job Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Desired Roles</Label>
                        <Input defaultValue="Frontend Developer, Full Stack Engineer" />
                      </div>
                      <div className="space-y-2">
                        <Label>Target Salary (USD)</Label>
                        <Input defaultValue="$120,000 - $160,000" />
                      </div>
                      <div className="space-y-2 md:col-span-2 pt-2">
                        <Label>Preferred Work Setup</Label>
                        <div className="flex flex-wrap gap-3">
                          <label className="flex items-center space-x-2 p-3 border border-border/60 rounded-lg bg-accent/20 cursor-pointer hover:bg-accent/40">
                            <input type="checkbox" defaultChecked className="rounded border-border bg-background" />
                            <span className="text-sm font-medium">Remote</span>
                          </label>
                          <label className="flex items-center space-x-2 p-3 border border-border/60 rounded-lg bg-accent/20 cursor-pointer hover:bg-accent/40">
                            <input type="checkbox" defaultChecked className="rounded border-border bg-background" />
                            <span className="text-sm font-medium">Hybrid</span>
                          </label>
                          <label className="flex items-center space-x-2 p-3 border border-border/60 rounded-lg bg-accent/20 cursor-pointer hover:bg-accent/40">
                            <input type="checkbox" className="rounded border-border bg-background" />
                            <span className="text-sm font-medium">On-site</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateProfile;
