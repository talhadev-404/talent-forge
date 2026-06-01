import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe,
  Clock,
  Activity,
  Fingerprint,
  UserX,
  Monitor,
  Wifi,
  Ban
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const securityEvents = [
  { id: 1, event: "Failed login attempt", user: "unknown@hacker.io", ip: "192.168.1.100", time: "5 minutes ago", severity: "high", details: "3 consecutive failures" },
  { id: 2, event: "Password changed", user: "mark.t@company.io", ip: "10.0.0.42", time: "1 hour ago", severity: "info", details: "Self-service reset" },
  { id: 3, event: "New admin role granted", user: "elena.r@tech.co", ip: "10.0.0.15", time: "3 hours ago", severity: "medium", details: "Granted by james.li@admin.com" },
  { id: 4, event: "Account suspended", user: "lisa.w@email.com", ip: "—", time: "6 hours ago", severity: "medium", details: "Violated terms of service" },
  { id: 5, event: "Brute force detected", user: "—", ip: "203.0.113.50", time: "8 hours ago", severity: "critical", details: "50+ attempts in 10 min" },
  { id: 6, event: "2FA enabled", user: "sarah.j@email.com", ip: "10.0.0.88", time: "12 hours ago", severity: "info", details: "TOTP authenticator" },
  { id: 7, event: "API key accessed", user: "system", ip: "10.0.0.1", time: "1 day ago", severity: "low", details: "Routine health check" },
  { id: 8, event: "Suspicious session", user: "priya.p@email.com", ip: "198.51.100.14", time: "1 day ago", severity: "high", details: "Login from new country (RU)" },
];

const blockedIPs = [
  { ip: "203.0.113.50", reason: "Brute force attack", blockedAt: "2026-05-30", attempts: 127 },
  { ip: "198.51.100.14", reason: "Suspicious activity", blockedAt: "2026-05-28", attempts: 45 },
  { ip: "192.0.2.99", reason: "Bot traffic", blockedAt: "2026-05-25", attempts: 892 },
];

const Security = () => {
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(false);
  const [ipBlocking, setIpBlocking] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical": return { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" };
      case "high": return { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" };
      case "medium": return { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" };
      case "low": return { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
      case "info": return { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" };
      default: return { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
    }
  };

  const securityScore = 78;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Security Center</h1>
            <p className="text-muted-foreground">Monitor threats, manage policies, and review audit logs</p>
          </div>
          <Button className="bg-gradient-primary text-white shadow-glow">
            <Shield className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
        </div>

        {/* Security Score + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Security Score Card */}
          <Card className="lg:col-span-4 glass-card border-border/80">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-[6px] border-accent/40 flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="58" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeDasharray={`${securityScore * 3.64} 364`} strokeLinecap="round" className="opacity-80" />
                  </svg>
                  <div className="z-10">
                    <p className="text-3xl font-extrabold font-mono">{securityScore}%</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Score</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Security Health</p>
                <p className="text-xs text-muted-foreground">Good — Enable 2FA enforcement to improve</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full pt-2">
                <div className="p-3 rounded-lg bg-accent/30 border border-border/40 text-center">
                  <p className="text-lg font-extrabold text-success">0</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Active Threats</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/30 border border-border/40 text-center">
                  <p className="text-lg font-extrabold text-warning">3</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Blocked IPs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Failed Logins (24h)", value: "23", icon: ShieldAlert, color: "text-destructive", desc: "+8 from yesterday" },
              { label: "Active Sessions", value: "342", icon: Monitor, color: "text-primary", desc: "Across all users" },
              { label: "2FA Adoption", value: "67%", icon: Fingerprint, color: "text-secondary", desc: "836 of 1,247 users" },
              { label: "Blocked Requests", value: "1.2k", icon: Ban, color: "text-warning", desc: "This month" },
            ].map((stat, i) => (
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
                  <p className="text-xs text-muted-foreground mt-2">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="events" className="rounded-lg text-sm px-4 py-2 font-medium">Audit Log</TabsTrigger>
            <TabsTrigger value="policies" className="rounded-lg text-sm px-4 py-2 font-medium">Policies</TabsTrigger>
            <TabsTrigger value="blocked" className="rounded-lg text-sm px-4 py-2 font-medium">IP Blocklist</TabsTrigger>
          </TabsList>

          {/* Audit Log */}
          <TabsContent value="events">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Security Audit Log</span>
                  <Badge variant="outline" className="ml-2 font-mono text-xs">{securityEvents.length} events</Badge>
                </CardTitle>
                <CardDescription>Recent security events and suspicious activities</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="pl-6">Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">IP Address</TableHead>
                      <TableHead className="hidden lg:table-cell">Details</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right pr-6">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityEvents.map((event) => {
                      const styles = getSeverityStyles(event.severity);
                      return (
                        <TableRow key={event.id} className="border-border/40 hover:bg-accent/30 transition-colors">
                          <TableCell className="pl-6 font-semibold text-sm">{event.event}</TableCell>
                          <TableCell className="text-sm text-muted-foreground font-mono">{event.user}</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground font-mono">{event.ip}</TableCell>
                          <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{event.details}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${styles.bg} ${styles.text} ${styles.border}`}>
                              {event.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6 text-sm text-muted-foreground">{event.time}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies */}
          <TabsContent value="policies" className="space-y-6">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <span>Authentication Policies</span>
                </CardTitle>
                <CardDescription>Configure login and access security rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Enforce Two-Factor Authentication", desc: "Require all users to enable 2FA on their accounts", icon: Fingerprint, enabled: twoFactorEnforced, setter: setTwoFactorEnforced },
                  { label: "Auto IP Blocking", desc: "Automatically block IPs after 5 failed login attempts", icon: Ban, enabled: ipBlocking, setter: setIpBlocking },
                  { label: "Session Timeout", desc: "Automatically log out inactive users after 30 minutes", icon: Clock, enabled: sessionTimeout, setter: setSessionTimeout },
                  { label: "New Device Login Alerts", desc: "Notify users when their account is accessed from a new device", icon: Monitor, enabled: loginAlerts, setter: setLoginAlerts },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/20 transition-all hover:bg-accent/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/60 flex items-center justify-center border border-border/40">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-0.5">
                        <Label className="font-semibold">{item.label}</Label>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch checked={item.enabled} onCheckedChange={item.setter} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-secondary" />
                  <span>Password Policy</span>
                </CardTitle>
                <CardDescription>Set password strength requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Minimum Password Length</Label>
                    <Select defaultValue="12">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                        <SelectItem value="16">16 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">Every 30 days</SelectItem>
                        <SelectItem value="60">Every 60 days</SelectItem>
                        <SelectItem value="90">Every 90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="font-semibold">Required Complexity</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Uppercase letter", "Lowercase letter", "Number (0-9)", "Special character"].map((req, i) => (
                      <div key={i} className="flex items-center space-x-2 p-3 rounded-lg border border-border/60 bg-accent/20">
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocked IPs */}
          <TabsContent value="blocked">
            <Card className="glass-card border-border/80 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Ban className="h-5 w-5 text-destructive" />
                  <span>IP Blocklist</span>
                  <Badge variant="outline" className="ml-2 font-mono text-xs">{blockedIPs.length} blocked</Badge>
                </CardTitle>
                <CardDescription>Manage IPs that are blocked from accessing the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60 hover:bg-transparent">
                      <TableHead className="pl-6">IP Address</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Blocked Date</TableHead>
                      <TableHead className="text-center">Attempts</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockedIPs.map((ip, i) => (
                      <TableRow key={i} className="border-border/40 hover:bg-accent/30 transition-colors">
                        <TableCell className="pl-6 font-mono font-semibold text-sm">{ip.ip}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{ip.reason}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{ip.blockedAt}</TableCell>
                        <TableCell className="text-center font-bold text-sm text-destructive">{ip.attempts}</TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="outline" size="sm" className="text-xs">Unblock</Button>
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

export default Security;
