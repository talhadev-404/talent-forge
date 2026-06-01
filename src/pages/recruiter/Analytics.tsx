import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Video,
  Award,
  Target,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Zap,
  Star
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const RecruiterAnalytics = () => {
  const overviewStats = [
    { label: "Total Hires", value: "24", change: "+33%", trend: "up", icon: Award, color: "text-success" },
    { label: "Open Positions", value: "8", change: "+2", trend: "up", icon: Briefcase, color: "text-primary" },
    { label: "Avg. Time to Hire", value: "18 days", change: "-4 days", trend: "up", icon: Clock, color: "text-secondary" },
    { label: "Offer Accept Rate", value: "87%", change: "+5%", trend: "up", icon: Target, color: "text-warning" },
  ];

  const pipelineData = [
    { stage: "Applications", count: 342, conversion: "100%", color: "bg-muted-foreground" },
    { stage: "Screening", count: 186, conversion: "54.4%", color: "bg-primary" },
    { stage: "Interviews", count: 89, conversion: "47.8%", color: "bg-secondary" },
    { stage: "Assessments", count: 52, conversion: "58.4%", color: "bg-purple-500" },
    { stage: "Offers", count: 28, conversion: "53.8%", color: "bg-warning" },
    { stage: "Hired", count: 24, conversion: "85.7%", color: "bg-success" },
  ];

  const jobPerformance = [
    { title: "Senior Frontend Developer", applications: 48, interviews: 12, hires: 2, timeToHire: "22 days", quality: 4.5 },
    { title: "Product Manager", applications: 32, interviews: 8, hires: 1, timeToHire: "28 days", quality: 4.8 },
    { title: "UX Designer", applications: 56, interviews: 15, hires: 3, timeToHire: "14 days", quality: 4.2 },
    { title: "Backend Python Engineer", applications: 27, interviews: 6, hires: 1, timeToHire: "19 days", quality: 4.0 },
    { title: "DevOps Engineer", applications: 19, interviews: 5, hires: 0, timeToHire: "—", quality: 0 },
  ];

  const monthlyHires = [
    { month: "Jan", applications: 45, interviews: 12, hires: 3 },
    { month: "Feb", applications: 62, interviews: 18, hires: 4 },
    { month: "Mar", applications: 51, interviews: 14, hires: 3 },
    { month: "Apr", applications: 78, interviews: 22, hires: 5 },
    { month: "May", applications: 92, interviews: 28, hires: 6 },
    { month: "Jun", applications: 68, interviews: 19, hires: 3 },
  ];

  const maxApps = Math.max(...monthlyHires.map(d => d.applications));

  const sourceData = [
    { source: "LinkedIn", applications: 124, hires: 8, quality: 4.3, costPerHire: "$2,400" },
    { source: "Company Website", applications: 89, hires: 6, quality: 4.5, costPerHire: "$800" },
    { source: "Indeed", applications: 67, hires: 4, quality: 3.8, costPerHire: "$1,900" },
    { source: "Referrals", applications: 42, hires: 5, quality: 4.7, costPerHire: "$500" },
    { source: "University", applications: 20, hires: 1, quality: 3.5, costPerHire: "$1,200" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Recruiting Analytics</h1>
            <p className="text-muted-foreground">Track hiring metrics and optimize your recruitment pipeline</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last Quarter</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, i) => (
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
                <div className="flex items-center space-x-1 mt-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pipeline Funnel + Trend Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pipeline Funnel */}
          <Card className="lg:col-span-5 glass-card border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Hiring Funnel</span>
              </CardTitle>
              <CardDescription>Conversion rates across pipeline stages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pipelineData.map((stage, i) => {
                const widthPercent = (stage.count / pipelineData[0].count) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-muted-foreground w-24 text-right">{stage.stage}</span>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-accent/30 rounded-lg overflow-hidden border border-border/40">
                        <div
                          className={`h-full ${stage.color} rounded-lg transition-all duration-700 flex items-center justify-end pr-3`}
                          style={{ width: `${widthPercent}%`, opacity: 0.7 }}
                        >
                          {widthPercent > 25 && (
                            <span className="text-[10px] font-bold text-white font-mono">{stage.count}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold w-12 text-right">{stage.conversion}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="lg:col-span-7 glass-card border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
                <span>Monthly Hiring Trend</span>
              </CardTitle>
              <CardDescription>Applications, interviews, and hires over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyHires.map((data, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-muted-foreground w-8 font-mono">{data.month}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-7 bg-accent/30 rounded-lg overflow-hidden relative border border-border/40">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg transition-all duration-700 flex items-center justify-end pr-2"
                          style={{ width: `${(data.applications / maxApps) * 100}%` }}
                        >
                          <span className="text-[9px] font-bold text-white font-mono">{data.applications}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground w-28">
                      <span className="font-mono"><Video className="w-3 h-3 inline mr-0.5" />{data.interviews}</span>
                      <span className="font-mono text-success"><Award className="w-3 h-3 inline mr-0.5" />{data.hires}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 pt-5 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded bg-gradient-to-r from-primary to-secondary" /><span>Applications</span></div>
                <div className="flex items-center space-x-2"><Video className="w-3 h-3" /><span>Interviews</span></div>
                <div className="flex items-center space-x-2"><Award className="w-3 h-3 text-success" /><span>Hires</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Job Performance & Source Quality */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="jobs" className="rounded-lg text-sm px-4 py-2 font-medium">Job Performance</TabsTrigger>
            <TabsTrigger value="sources" className="rounded-lg text-sm px-4 py-2 font-medium">Source Quality</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Performance Breakdown</span>
                </CardTitle>
                <CardDescription>Metrics for each active job posting</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="pl-6">Position</TableHead>
                      <TableHead className="text-center">Applications</TableHead>
                      <TableHead className="text-center">Interviews</TableHead>
                      <TableHead className="text-center">Hires</TableHead>
                      <TableHead className="text-center hidden md:table-cell">Time to Hire</TableHead>
                      <TableHead className="text-center hidden lg:table-cell">Quality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobPerformance.map((job, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-accent/30 transition-colors">
                        <TableCell className="pl-6 font-semibold text-sm">{job.title}</TableCell>
                        <TableCell className="text-center font-bold text-sm">{job.applications}</TableCell>
                        <TableCell className="text-center font-bold text-sm">{job.interviews}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={`font-mono text-xs ${job.hires > 0 ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"}`}>
                            {job.hires}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground hidden md:table-cell">{job.timeToHire}</TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          {job.quality > 0 ? (
                            <div className="flex items-center justify-center space-x-1">
                              <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                              <span className="text-sm font-bold font-mono">{job.quality}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-warning" />
                  <span>Sourcing Channel Effectiveness</span>
                </CardTitle>
                <CardDescription>Compare candidate quality and cost across different sourcing channels</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="pl-6">Source</TableHead>
                      <TableHead className="text-center">Applications</TableHead>
                      <TableHead className="text-center">Hires</TableHead>
                      <TableHead className="text-center hidden md:table-cell">Quality</TableHead>
                      <TableHead className="text-center hidden lg:table-cell">Cost/Hire</TableHead>
                      <TableHead className="text-center">Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sourceData.map((source, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-accent/30 transition-colors">
                        <TableCell className="pl-6 font-semibold text-sm">{source.source}</TableCell>
                        <TableCell className="text-center font-bold text-sm">{source.applications}</TableCell>
                        <TableCell className="text-center font-bold text-sm text-success">{source.hires}</TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                            <span className="text-sm font-bold font-mono">{source.quality}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center hidden lg:table-cell text-sm font-mono">{source.costPerHire}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-mono text-xs">
                            {((source.hires / source.applications) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterAnalytics;
