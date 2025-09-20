import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Building2,
  Users
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { toast } = useToast();

  // Mock job data - would come from API
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      postedDate: "2 days ago",
      description: "Join our team building next-generation web applications using React, TypeScript, and modern web technologies.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "System design knowledge"],
      benefits: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budget"]
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time", 
      salary: "$130k - $180k",
      postedDate: "1 week ago",
      description: "Lead product strategy and development for our innovative SaaS platform serving enterprise customers.",
      requirements: ["3+ years PM experience", "B2B SaaS background", "Data-driven mindset"],
      benefits: ["Equity Package", "Flexible Hours", "Health & Dental", "Gym Membership"]
    },
    {
      id: 3,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Contract",
      salary: "$80k - $100k",
      postedDate: "3 days ago",
      description: "Create beautiful and intuitive user experiences for mobile and web applications.",
      requirements: ["Portfolio required", "Figma expertise", "User research experience"],
      benefits: ["Creative Freedom", "Latest Tools", "Professional Development"]
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "InnovateLab",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $140k", 
      postedDate: "5 days ago",
      description: "Build scalable applications using Node.js, React, and cloud technologies in a remote-first environment.",
      requirements: ["Full-stack experience", "Cloud platforms (AWS/GCP)", "Agile methodology"],
      benefits: ["100% Remote", "Equipment Provided", "Unlimited PTO", "Global Team"]
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataFlow Inc",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$110k - $150k",
      postedDate: "1 week ago",
      description: "Apply machine learning and statistical analysis to solve complex business problems.",
      requirements: ["Python/R proficiency", "ML frameworks", "Statistics background"],
      benefits: ["Research Time", "Conference Budget", "Stock Options", "Flexible Schedule"]
    }
  ];

  const handleApply = (jobId: number, jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} has been submitted successfully.`
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-primary text-primary-foreground";
      case "Contract": return "bg-secondary text-secondary-foreground";
      case "Part-time": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Job Board</h1>
          <p className="text-muted-foreground">Discover your next career opportunity</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <Select defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary-high">Salary: High to Low</SelectItem>
              <SelectItem value="salary-low">Salary: Low to High</SelectItem>
              <SelectItem value="company">Company A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.postedDate}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(job.type)}>
                      {job.type}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{job.salary}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>12 applicants</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApply(job.id, job.title)}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobBoard;