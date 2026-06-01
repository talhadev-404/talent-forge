import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Edit,
  Trash2,
  Download,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "recruiter" | "interviewer" | "admin";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  interviews: number;
}

const mockUsers: MockUser[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "candidate", status: "active", joinDate: "2026-01-15", lastActive: "2 hours ago", interviews: 5 },
  { id: 2, name: "Mark Thompson", email: "mark.t@company.io", role: "recruiter", status: "active", joinDate: "2025-11-02", lastActive: "1 hour ago", interviews: 48 },
  { id: 3, name: "Elena Rodriguez", email: "elena.r@tech.co", role: "interviewer", status: "active", joinDate: "2025-09-20", lastActive: "5 minutes ago", interviews: 127 },
  { id: 4, name: "James Li", email: "james.li@admin.com", role: "admin", status: "active", joinDate: "2025-06-01", lastActive: "Online", interviews: 0 },
  { id: 5, name: "Priya Patel", email: "priya.p@email.com", role: "candidate", status: "inactive", joinDate: "2026-03-10", lastActive: "3 days ago", interviews: 2 },
  { id: 6, name: "Ahmed Hassan", email: "ahmed.h@startup.dev", role: "recruiter", status: "active", joinDate: "2026-02-18", lastActive: "30 minutes ago", interviews: 22 },
  { id: 7, name: "Lisa Wang", email: "lisa.w@email.com", role: "candidate", status: "suspended", joinDate: "2026-04-05", lastActive: "1 week ago", interviews: 1 },
  { id: 8, name: "David Okonkwo", email: "david.o@bigcorp.com", role: "interviewer", status: "active", joinDate: "2025-12-12", lastActive: "45 minutes ago", interviews: 89 },
  { id: 9, name: "Mei Chen", email: "mei.c@email.com", role: "candidate", status: "active", joinDate: "2026-05-22", lastActive: "1 hour ago", interviews: 3 },
  { id: 10, name: "Alex Rivera", email: "alex.r@company.io", role: "recruiter", status: "inactive", joinDate: "2025-10-30", lastActive: "2 weeks ago", interviews: 15 },
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      candidate: "bg-primary/10 text-primary border-primary/20",
      recruiter: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      interviewer: "bg-secondary/10 text-secondary border-secondary/20",
      admin: "bg-warning/10 text-warning border-warning/20",
    };
    return styles[role] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
      case "inactive": return <Clock className="w-3.5 h-3.5 text-muted-foreground" />;
      case "suspended": return <XCircle className="w-3.5 h-3.5 text-destructive" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-success/10 text-success border-success/20",
      inactive: "bg-muted text-muted-foreground border-border",
      suspended: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return styles[status] || "";
  };

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-primary", change: "+12%" },
    { label: "Active Users", value: "1,089", icon: UserCheck, color: "text-success", change: "+8%" },
    { label: "Suspended", value: "23", icon: UserX, color: "text-destructive", change: "-3%" },
    { label: "New This Month", value: "156", icon: TrendingUp, color: "text-secondary", change: "+24%" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage all users, roles, and account statuses</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary text-white shadow-glow">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account and assign a role.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="user@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candidate">Candidate</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="interviewer">Interviewer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-gradient-primary text-white">Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-card border-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-accent/40 flex items-center justify-center border border-border/60`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-xs font-semibold text-success mt-2">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters & Search */}
        <Card className="glass-card border-border/80">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="interviewer">Interviewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-44">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="glass-card border-border/80 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Users</span>
              <Badge variant="outline" className="ml-2 font-mono text-xs">{filteredUsers.length} results</Badge>
            </CardTitle>
            <CardDescription>Click on a row to view full user profile</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="pl-6">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Joined</TableHead>
                  <TableHead className="hidden md:table-cell">Last Active</TableHead>
                  <TableHead className="hidden lg:table-cell text-center">Interviews</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/40 hover:bg-accent/30 cursor-pointer transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9 border border-border/60">
                          <AvatarFallback className="text-xs font-bold bg-accent/60">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1.5">
                        {getStatusIcon(user.status)}
                        <Badge variant="outline" className={`text-[10px] capitalize font-semibold ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{user.joinDate}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="hidden lg:table-cell text-center font-bold text-sm">{user.interviews}</TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/40">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem className="cursor-pointer text-warning">
                              <UserX className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-success">
                              <UserCheck className="mr-2 h-4 w-4" /> Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete User
                          </DropdownMenuItem>
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

export default UserManagement;
