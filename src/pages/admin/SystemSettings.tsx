import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Globe,
  Bell,
  Mail,
  Database,
  Palette,
  Server,
  Save,
  RotateCcw,
  Zap,
  Clock,
  FileText,
  HardDrive,
  CloudOff,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const SystemSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);
  const [rateLimit, setRateLimit] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure platform behavior, integrations, and preferences</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Defaults
            </Button>
            <Button className="bg-gradient-primary text-white shadow-glow">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        {maintenanceMode && (
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-center space-x-3">
            <CloudOff className="w-5 h-5 text-warning flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-warning">Maintenance Mode Active</p>
              <p className="text-xs text-muted-foreground">The platform is currently in maintenance mode. Only admins can access the system.</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-accent/45 border border-border/60 p-1 rounded-xl">
            <TabsTrigger value="general" className="rounded-lg text-sm px-4 py-2 font-medium">General</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg text-sm px-4 py-2 font-medium">Notifications</TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-lg text-sm px-4 py-2 font-medium">Integrations</TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-lg text-sm px-4 py-2 font-medium">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Platform Configuration</span>
                </CardTitle>
                <CardDescription>Core platform settings and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" defaultValue="TalentForge AI" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platformUrl">Platform URL</Label>
                    <Input id="platformUrl" defaultValue="https://talentforge.ai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input id="supportEmail" type="email" defaultValue="support@talentforge.ai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="cet">CET (Central European Time)</SelectItem>
                        <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Platform Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="AI-powered interview platform for modern hiring teams."
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-secondary" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Accent Color</Label>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary border border-border/40 shadow-glow" />
                      <Input defaultValue="#6366F1" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/20">
                  <div className="space-y-0.5">
                    <Label className="font-semibold">Compact Mode</Label>
                    <p className="text-xs text-muted-foreground">Reduce spacing and use smaller font sizes</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-warning" />
                  <span>Interview Defaults</span>
                </CardTitle>
                <CardDescription>Default settings for new interviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Default Duration</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Video Quality</Label>
                    <Select defaultValue="1080p">
                      <SelectTrigger>
                        <SelectValue placeholder="Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="1080p">1080p Full HD</SelectItem>
                        <SelectItem value="4k">4K Ultra HD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Recording</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger>
                        <SelectValue placeholder="Recording" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Notification Channels</span>
                </CardTitle>
                <CardDescription>Configure how notifications are delivered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Send notifications via email to all users", icon: Mail, enabled: emailNotifications, setter: setEmailNotifications },
                  { label: "In-App Alerts", desc: "Show real-time notifications within the platform", icon: Bell, enabled: true, setter: () => {} },
                  { label: "Interview Reminders", desc: "Automated reminders 24h and 1h before interviews", icon: Clock, enabled: true, setter: () => {} },
                  { label: "Weekly Reports", desc: "Send weekly usage and analytics summaries to admins", icon: FileText, enabled: analyticsTracking, setter: setAnalyticsTracking },
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
                  <Mail className="h-5 w-5 text-secondary" />
                  <span>Email Configuration</span>
                </CardTitle>
                <CardDescription>SMTP server settings for outgoing emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>SMTP Server</Label>
                    <Input defaultValue="smtp.talentforge.ai" />
                  </div>
                  <div className="space-y-2">
                    <Label>SMTP Port</Label>
                    <Input defaultValue="587" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sender Name</Label>
                    <Input defaultValue="TalentForge AI" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sender Email</Label>
                    <Input defaultValue="noreply@talentforge.ai" type="email" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-warning" />
                  <span>Connected Services</span>
                </CardTitle>
                <CardDescription>Manage third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Google Calendar", desc: "Sync interview schedules with Google Calendar", status: "connected", color: "text-success" },
                  { name: "Slack", desc: "Push notifications and interview alerts to Slack channels", status: "connected", color: "text-success" },
                  { name: "GitHub", desc: "Import coding challenges and repositories", status: "disconnected", color: "text-muted-foreground" },
                  { name: "OpenAI GPT-4", desc: "Power AI-driven interview analysis and feedback generation", status: "connected", color: "text-success" },
                  { name: "Zoom", desc: "Use Zoom as an alternative video conferencing provider", status: "disconnected", color: "text-muted-foreground" },
                ].map((service, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/20 transition-all hover:bg-accent/30">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-sm">{service.name}</p>
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${service.status === "connected" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"}`}>
                          {service.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{service.desc}</p>
                    </div>
                    <Button variant={service.status === "connected" ? "outline" : "default"} size="sm" className={service.status === "connected" ? "" : "bg-gradient-primary text-white"}>
                      {service.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>API Keys</span>
                </CardTitle>
                <CardDescription>Manage API access tokens for integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/20">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">Production API Key</p>
                    <p className="text-xs text-muted-foreground font-mono">tf_live_••••••••••••••••k7Xp</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Reveal</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-accent/20">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">Development API Key</p>
                    <p className="text-xs text-muted-foreground font-mono">tf_test_••••••••••••••••m9Qr</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Reveal</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="glass-card border-border/80">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span>System Configuration</span>
                </CardTitle>
                <CardDescription>Advanced system-level settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Maintenance Mode", desc: "Put the platform into maintenance mode. Only admins can log in.", icon: CloudOff, enabled: maintenanceMode, setter: setMaintenanceMode, danger: true },
                  { label: "Auto Database Backup", desc: "Automatically back up the database every 24 hours", icon: HardDrive, enabled: autoBackup, setter: setAutoBackup },
                  { label: "Debug Mode", desc: "Enable verbose logging for troubleshooting (performance impact)", icon: FileText, enabled: debugMode, setter: setDebugMode, danger: true },
                  { label: "Rate Limiting", desc: "Limit API requests to prevent abuse (100 req/min per user)", icon: Zap, enabled: rateLimit, setter: setRateLimit },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:bg-accent/30 ${item.danger ? "border-destructive/20 bg-destructive/5" : "border-border/60 bg-accent/20"}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.danger ? "bg-destructive/10 border-destructive/20" : "bg-accent/60 border-border/40"}`}>
                        <item.icon className={`w-5 h-5 ${item.danger ? "text-destructive" : "text-muted-foreground"}`} />
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
                  <Database className="h-5 w-5 text-secondary" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>Database and storage operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border/60 bg-accent/20 text-center space-y-2">
                    <p className="text-2xl font-extrabold text-primary font-mono">12.4 GB</p>
                    <p className="text-xs text-muted-foreground font-medium">Database Size</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-accent/20 text-center space-y-2">
                    <p className="text-2xl font-extrabold text-secondary font-mono">847 GB</p>
                    <p className="text-xs text-muted-foreground font-medium">Video Storage</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-accent/20 text-center space-y-2">
                    <p className="text-2xl font-extrabold text-success font-mono">6h ago</p>
                    <p className="text-xs text-muted-foreground font-medium">Last Backup</p>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Trigger Backup Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <FileText className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettings;
