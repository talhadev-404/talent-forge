import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Code,
  FileText,
  MessageSquare,
  Search,
  Filter,
  Plus,
  Eye,
  Copy,
  Clock,
  Tag
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InterviewerTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    {
      id: 1,
      title: "React Frontend Developer - Mid Level",
      category: "Technical",
      duration: "60 mins",
      questions: 8,
      tags: ["React", "JavaScript", "Frontend"],
      type: "Coding",
      description: "Standard technical interview for mid-level React developers. Includes live coding on component architecture and state management."
    },
    {
      id: 2,
      title: "Senior System Design",
      category: "System Design",
      duration: "90 mins",
      questions: 4,
      tags: ["Architecture", "Scalability", "Backend"],
      type: "Whiteboarding",
      description: "In-depth system design interview focusing on distributed systems, scalability, and database choices."
    },
    {
      id: 3,
      title: "General Culture Fit",
      category: "Behavioral",
      duration: "45 mins",
      questions: 10,
      tags: ["Soft Skills", "Teamwork", "Culture"],
      type: "Discussion",
      description: "Standard behavioral questions focusing on teamwork, conflict resolution, and alignment with company values."
    },
    {
      id: 4,
      title: "Product Manager - Analytical",
      category: "Product",
      duration: "60 mins",
      questions: 6,
      tags: ["Data", "Strategy", "PM"],
      type: "Case Study",
      description: "Case study driven interview to evaluate product sense, analytical skills, and prioritization frameworks."
    },
    {
      id: 5,
      title: "Python Backend API Design",
      category: "Technical",
      duration: "60 mins",
      questions: 7,
      tags: ["Python", "API", "Backend"],
      type: "Coding",
      description: "Live coding exercise to build a RESTful API with Python, handling edge cases and data validation."
    },
    {
      id: 6,
      title: "Engineering Manager Leadership",
      category: "Leadership",
      duration: "60 mins",
      questions: 8,
      tags: ["Management", "Leadership", "Mentorship"],
      type: "Discussion",
      description: "Evaluation of management style, team building, performance feedback, and conflict resolution."
    }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "Coding": return <Code className="w-4 h-4 text-primary" />;
      case "Whiteboarding": return <FileText className="w-4 h-4 text-secondary" />;
      case "Discussion": return <MessageSquare className="w-4 h-4 text-success" />;
      case "Case Study": return <FileText className="w-4 h-4 text-warning" />;
      default: return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredTemplates = templates.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Interview Templates</h1>
            <p className="text-muted-foreground">Standardized questions and rubrics for consistent evaluations</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search templates by title or tags..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="system">System Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg text-sm px-4 py-2 font-medium">All Templates</TabsTrigger>
            <TabsTrigger value="my" className="rounded-lg text-sm px-4 py-2 font-medium">My Templates</TabsTrigger>
            <TabsTrigger value="company" className="rounded-lg text-sm px-4 py-2 font-medium">Company Defaults</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="glass-card border-border/80 flex flex-col hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant="outline" className="mb-2 bg-accent/40 text-xs font-semibold">
                          {template.category}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">{template.title}</CardTitle>
                      </div>
                      <div className="p-2 bg-accent/40 rounded-lg border border-border/40">
                        {getTypeIcon(template.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center text-xs text-muted-foreground bg-accent/30 border border-border/40 rounded-full px-2 py-0.5">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t border-border/40 bg-accent/10 py-3 px-6 mt-auto">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {template.duration}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-1" />
                        {template.questions} Qs
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredTemplates.length === 0 && (
                <div className="col-span-full text-center p-8 text-muted-foreground">
                  No templates match your search criteria.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="my">
            <div className="text-center p-8 text-muted-foreground">
              You haven't created any custom templates yet.
            </div>
          </TabsContent>
          <TabsContent value="company">
             <div className="text-center p-8 text-muted-foreground">
              Company defaults will appear here.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InterviewerTemplates;
