import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Shield,
  BarChart3,
  Activity,
  UserCheck,
  AlertTriangle,
  Settings,
  Download
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - would come from API
  const systemStats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Active Jobs", value: "89", icon: Briefcase, color: "text-secondary" },
    { label: "This Month Interviews", value: "342", icon: Calendar, color: "text-warning" },
    { label: "System Uptime", value: "99.9%", icon: Activity, color: "text-success" }
  ];

  const userBreakdown = [
    { role: "Candidates", count: 892, percentage: 71.5 },
    { role: "Recruiters", count: 156, percentage: 12.5 },
    { role: "Interviewers", count: 134, percentage: 10.7 },
    { role: "Admins", count: 65, percentage: 5.2 }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "25 new users registered today",
      timestamp: "2 hours ago",
      severity: "info"
    },
    {
      id: 2,
      type: "system_alert",
      message: "High API usage detected",
      timestamp: "4 hours ago", 
      severity: "warning"
    },
    {
      id: 3,
      type: "security",
      message: "Failed login attempts from IP 192.168.1.100",
      timestamp: "6 hours ago",
      severity: "error"
    },
    {
      id: 4,
      type: "system_update",
      message: "Database backup completed successfully",
      timestamp: "12 hours ago",
      severity: "success"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "text-destructive";
      case "warning": return "text-warning";
      case "success": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "error": return "bg-destructive text-destructive-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "success": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor system performance and manage users</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button onClick={() => navigate('/admin/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Distribution</span>
              </CardTitle>
              <CardDescription>Breakdown of users by role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full" style={{ 
                      backgroundColor: `hsl(${213 + index * 40} 94% 68%)` 
                    }} />
                    <span className="font-medium">{item.role}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    <span className="font-bold">{item.count}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Activity</span>
              </CardTitle>
              <CardDescription>Recent system events and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                  <Badge className={getSeverityBadge(activity.severity)}>
                    {activity.severity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Management */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage user accounts, roles, and permissions
              </p>
              <Button className="w-full" onClick={() => navigate('/admin/users')}>
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Center</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor security events and configure policies
              </p>
              <Button className="w-full" variant="outline" onClick={() => navigate('/admin/security')}>
                Security Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View detailed reports and system analytics
              </p>
              <Button className="w-full" variant="outline" onClick={() => navigate('/admin/analytics')}>
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Health</span>
            </CardTitle>
            <CardDescription>Monitor system performance and availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">124ms</p>
                <p className="text-sm text-muted-foreground">Avg Response</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">2.4GB</p>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">45%</p>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;