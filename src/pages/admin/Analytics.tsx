import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Activity,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Video,
  Code,
  Award,
  Target,
  Zap,
  Globe
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Analytics = () => {
  const overviewStats = [
    { label: "Total Interviews", value: "3,842", change: "+18%", trend: "up", icon: Video, color: "text-primary" },
    { label: "Active Users", value: "1,089", change: "+12%", trend: "up", icon: Users, color: "text-secondary" },
    { label: "Avg. Session Time", value: "42 min", change: "-3%", trend: "down", icon: Clock, color: "text-warning" },
    { label: "Completion Rate", value: "94.2%", change: "+2.1%", trend: "up", icon: Target, color: "text-success" },
  ];

  const monthlyData = [
    { month: "Jan", interviews: 245, users: 820, hires: 18 },
    { month: "Feb", interviews: 312, users: 890, hires: 24 },
    { month: "Mar", interviews: 287, users: 935, hires: 21 },
    { month: "Apr", interviews: 398, users: 1020, hires: 32 },
    { month: "May", interviews: 456, users: 1100, hires: 38 },
    { month: "Jun", interviews: 342, users: 1089, hires: 29 },
  ];

  const topRoles = [
    { role: "Senior React Developer", interviews: 127, applications: 342, conversionRate: 37.1, avgScore: 82 },
    { role: "Backend Python Engineer", interviews: 98, applications: 278, conversionRate: 35.2, avgScore: 79 },
    { role: "Product Manager", interviews: 86, applications: 195, conversionRate: 44.1, avgScore: 85 },
    { role: "UX Designer", interviews: 72, applications: 164, conversionRate: 43.9, avgScore: 88 },
    { role: "DevOps Engineer", interviews: 64, applications: 145, conversionRate: 44.1, avgScore: 76 },
    { role: "Data Scientist", interviews: 58, applications: 132, conversionRate: 43.9, avgScore: 81 },
  ];

  const performanceMetrics = [
    { label: "AI Analysis Accuracy", value: 94.8, target: 95, color: "bg-primary" },
    { label: "Video Call Quality", value: 98.2, target: 99, color: "bg-secondary" },
    { label: "Platform Uptime", value: 99.9, target: 99.9, color: "bg-success" },
    { label: "API Response Time", value: 87, target: 95, color: "bg-warning" },
  ];

  const regionData = [
    { region: "North America", users: 482, interviews: 1245, percentage: 38.6 },
    { region: "Europe", users: 324, interviews: 856, percentage: 25.9 },
    { region: "Asia Pacific", users: 218, interviews: 642, percentage: 17.5 },
    { region: "South America", users: 112, interviews: 298, percentage: 8.9 },
    { region: "Middle East & Africa", users: 89, interviews: 234, percentage: 7.1 },
    { region: "Other", users: 22, interviews: 45, percentage: 1.8 },
  ];

  const maxInterviews = Math.max(...monthlyData.map(d => d.interviews));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Deep insights into platform performance and user behavior</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="30d">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
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
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-destructive" />
                  )}
                  <span className={`text-xs font-semibold ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bar Chart - Interview Volume */}
          <Card className="lg:col-span-8 glass-card border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Interview Volume</span>
              </CardTitle>
              <CardDescription>Monthly interview sessions conducted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-muted-foreground w-8 font-mono">{data.month}</span>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-8 bg-accent/30 rounded-lg overflow-hidden relative border border-border/40">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg transition-all duration-700 flex items-center justify-end pr-3"
                          style={{ width: `${(data.interviews / maxInterviews) * 100}%` }}
                        >
                          <span className="text-[10px] font-bold text-white font-mono">{data.interviews}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground w-32">
                      <span className="font-mono"><Users className="w-3 h-3 inline mr-1" />{data.users}</span>
                      <span className="font-mono text-success"><Award className="w-3 h-3 inline mr-1" />{data.hires}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 pt-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-primary to-secondary" />
                  <span>Interviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3" />
                  <span>Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-success" />
                  <span>Hires</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="lg:col-span-4 glass-card border-border/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-warning" />
                <span>Performance</span>
              </CardTitle>
              <CardDescription>Key platform health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {performanceMetrics.map((metric, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">{metric.label}</span>
                    <span className="font-mono">
                      {metric.value}%
                      <span className="text-muted-foreground ml-1">/ {metric.target}%</span>
                    </span>
                  </div>
                  <div className="h-2.5 bg-accent/40 rounded-full overflow-hidden border border-border/40">
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all duration-700`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="roles" className="rounded-lg text-sm px-4 py-2 font-medium">Top Job Roles</TabsTrigger>
            <TabsTrigger value="regions" className="rounded-lg text-sm px-4 py-2 font-medium">Geographic Data</TabsTrigger>
            <TabsTrigger value="engagement" className="rounded-lg text-sm px-4 py-2 font-medium">Engagement</TabsTrigger>
          </TabsList>

          {/* Top Job Roles */}
          <TabsContent value="roles">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Top Hiring Roles</span>
                </CardTitle>
                <CardDescription>Most active job positions by interview volume</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="pl-6">Role</TableHead>
                      <TableHead className="text-center">Interviews</TableHead>
                      <TableHead className="text-center hidden md:table-cell">Applications</TableHead>
                      <TableHead className="text-center hidden lg:table-cell">Conversion</TableHead>
                      <TableHead className="text-center">Avg Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topRoles.map((role, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-accent/30 transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/60 flex items-center justify-center text-xs font-bold text-primary border border-border/40">
                              #{i + 1}
                            </div>
                            <span className="font-semibold text-sm">{role.role}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-sm">{role.interviews}</TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground hidden md:table-cell">{role.applications}</TableCell>
                        <TableCell className="text-center hidden lg:table-cell">
                          <Badge variant="outline" className="font-mono text-xs bg-success/10 text-success border-success/20">
                            {role.conversionRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-16 h-2 bg-accent/40 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${role.avgScore}%` }} />
                            </div>
                            <span className="text-xs font-bold font-mono">{role.avgScore}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geographic Data */}
          <TabsContent value="regions">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-secondary" />
                  <span>Geographic Distribution</span>
                </CardTitle>
                <CardDescription>User and interview distribution by region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {regionData.map((region, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-accent/10 hover:bg-accent/25 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center text-xs font-bold text-foreground border border-border/40 font-mono">
                      {region.percentage.toFixed(0)}%
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{region.region}</span>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          <span><Users className="w-3 h-3 inline mr-1" />{region.users}</span>
                          <span><Video className="w-3 h-3 inline mr-1" />{region.interviews}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-accent/40 rounded-full overflow-hidden border border-border/40">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                          style={{ width: `${region.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Metrics */}
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "User Engagement",
                  icon: Activity,
                  color: "text-primary",
                  metrics: [
                    { label: "Daily Active Users", value: "342", change: "+5.2%" },
                    { label: "Avg. Pages/Session", value: "8.4", change: "+1.3%" },
                    { label: "Bounce Rate", value: "24%", change: "-2.1%" },
                    { label: "Session Duration", value: "12m 30s", change: "+8%" },
                  ]
                },
                {
                  title: "Interview Metrics",
                  icon: Video,
                  color: "text-secondary",
                  metrics: [
                    { label: "Completion Rate", value: "94.2%", change: "+2.1%" },
                    { label: "No-Show Rate", value: "3.8%", change: "-1.5%" },
                    { label: "Avg. Duration", value: "42 min", change: "-3 min" },
                    { label: "Reschedule Rate", value: "8.1%", change: "-0.9%" },
                  ]
                },
                {
                  title: "AI Performance",
                  icon: Zap,
                  color: "text-warning",
                  metrics: [
                    { label: "Analysis Accuracy", value: "94.8%", change: "+0.3%" },
                    { label: "Processing Time", value: "2.1s", change: "-0.4s" },
                    { label: "Feedback Rating", value: "4.7/5", change: "+0.2" },
                    { label: "Reports Generated", value: "2,841", change: "+22%" },
                  ]
                },
              ].map((section, i) => (
                <Card key={i} className="glass-card border-border/80">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-base">
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.metrics.map((metric, j) => (
                      <div key={j} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-accent/10">
                        <div>
                          <p className="text-xs text-muted-foreground">{metric.label}</p>
                          <p className="text-lg font-extrabold font-mono">{metric.value}</p>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px] font-bold">
                          {metric.change}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
