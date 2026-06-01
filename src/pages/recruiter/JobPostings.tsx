import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Users,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  Building2
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  applications: number;
  shortlisted: number;
  status: "active" | "paused" | "closed" | "draft";
  postedDate: string;
  deadline: string;
}

const mockJobs: Job[] = [
  { id: 1, title: "Senior Frontend Developer", department: "Engineering", location: "Remote", type: "Full-time", salary: "$120k - $160k", applications: 48, shortlisted: 8, status: "active", postedDate: "2026-05-10", deadline: "2026-06-15" },
  { id: 2, title: "Product Manager", department: "Product", location: "New York, NY", type: "Full-time", salary: "$130k - $170k", applications: 32, shortlisted: 5, status: "active", postedDate: "2026-05-15", deadline: "2026-06-20" },
  { id: 3, title: "UX Designer", department: "Design", location: "San Francisco, CA", type: "Full-time", salary: "$100k - $140k", applications: 56, shortlisted: 12, status: "active", postedDate: "2026-05-08", deadline: "2026-06-10" },
  { id: 4, title: "Backend Python Engineer", department: "Engineering", location: "Remote", type: "Full-time", salary: "$110k - $150k", applications: 27, shortlisted: 4, status: "paused", postedDate: "2026-04-28", deadline: "2026-06-01" },
  { id: 5, title: "DevOps Engineer", department: "Infrastructure", location: "Austin, TX", type: "Full-time", salary: "$115k - $155k", applications: 19, shortlisted: 3, status: "active", postedDate: "2026-05-20", deadline: "2026-06-25" },
  { id: 6, title: "Data Analyst Intern", department: "Data", location: "Remote", type: "Internship", salary: "$30/hr", applications: 84, shortlisted: 15, status: "closed", postedDate: "2026-04-01", deadline: "2026-05-01" },
  { id: 7, title: "Marketing Manager", department: "Marketing", location: "Chicago, IL", type: "Full-time", salary: "$90k - $120k", applications: 0, shortlisted: 0, status: "draft", postedDate: "—", deadline: "—" },
];

const JobPostings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const map: Record<string, { className: string; icon: React.ReactNode }> = {
      active: { className: "bg-success/10 text-success border-success/20", icon: <CheckCircle2 className="w-3 h-3 mr-1" /> },
      paused: { className: "bg-warning/10 text-warning border-warning/20", icon: <Pause className="w-3 h-3 mr-1" /> },
      closed: { className: "bg-muted text-muted-foreground border-border", icon: <XCircle className="w-3 h-3 mr-1" /> },
      draft: { className: "bg-primary/10 text-primary border-primary/20", icon: <Edit className="w-3 h-3 mr-1" /> },
    };
    const s = map[status] || map.draft;
    return (
      <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${s.className}`}>
        {s.icon}{status}
      </Badge>
    );
  };

  const stats = [
    { label: "Total Postings", value: mockJobs.length.toString(), icon: Briefcase, color: "text-primary" },
    { label: "Active", value: mockJobs.filter(j => j.status === "active").length.toString(), icon: CheckCircle2, color: "text-success" },
    { label: "Total Applications", value: mockJobs.reduce((s, j) => s + j.applications, 0).toString(), icon: Users, color: "text-secondary" },
    { label: "Shortlisted", value: mockJobs.reduce((s, j) => s + j.shortlisted, 0).toString(), icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground">Create and manage all your job listings</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Job Posting</DialogTitle>
                <DialogDescription>Fill in the details to create a new job listing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Job Title</Label>
                  <Input placeholder="e.g. Senior React Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data">Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Employment Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Location</Label>
                    <Input placeholder="e.g. Remote, New York" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Salary Range</Label>
                    <Input placeholder="e.g. $120k - $160k" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Job Description</Label>
                  <Textarea placeholder="Describe the role, responsibilities, and requirements..." rows={4} className="resize-none" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-gradient-primary text-white">Publish Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-card border-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-accent/40 flex items-center justify-center border border-border/60">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by title or department..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card className="glass-card border-border/80 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>All Job Postings</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs">{filteredJobs.length} jobs</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="pl-6">Position</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Salary</TableHead>
                  <TableHead className="text-center">Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Deadline</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-accent/60 flex items-center justify-center border border-border/40">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.department} · {job.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm font-medium">{job.salary}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>
                        <span className="font-bold text-sm">{job.applications}</span>
                        <span className="text-xs text-muted-foreground ml-1">({job.shortlisted} shortlisted)</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{job.deadline}</TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/40">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer"><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer"><Edit className="mr-2 h-4 w-4" /> Edit Posting</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer"><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {job.status === "active" ? (
                            <DropdownMenuItem className="cursor-pointer text-warning"><Pause className="mr-2 h-4 w-4" /> Pause Job</DropdownMenuItem>
                          ) : job.status === "paused" ? (
                            <DropdownMenuItem className="cursor-pointer text-success"><Play className="mr-2 h-4 w-4" /> Resume Job</DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem className="cursor-pointer text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default JobPostings;
