import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Video,
  Menu,
  X,
  Home,
  Briefcase,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Code,
  Shield
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: `/${user?.role}/dashboard`, icon: Home },
    ];

    switch (user?.role) {
      case 'candidate':
        return [
          ...baseItems,
          { name: 'Job Board', href: '/candidate/jobs', icon: Briefcase },
          { name: 'My Applications', href: '/candidate/applications', icon: Calendar },
          { name: 'My Profile', href: '/candidate/profile', icon: Users },
        ];
      case 'recruiter':
        return [
          ...baseItems,
          { name: 'Job Postings', href: '/recruiter/jobs', icon: Briefcase },
          { name: 'Interviews', href: '/recruiter/interviews', icon: Calendar },
          { name: 'Analytics', href: '/recruiter/analytics', icon: BarChart3 },
          { name: 'Candidates', href: '/recruiter/candidates', icon: Users },
        ];
      case 'interviewer':
        return [
          ...baseItems,
          { name: 'Interviews', href: '/interviewer/interviews', icon: Calendar },
          { name: 'Evaluations', href: '/interviewer/evaluations', icon: BarChart3 },
          { name: 'Templates', href: '/interviewer/templates', icon: Code },
        ];
      case 'admin':
        return [
          ...baseItems,
          { name: 'User Management', href: '/admin/users', icon: Users },
          { name: 'Security', href: '/admin/security', icon: Shield },
          { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
          { name: 'System Settings', href: '/admin/settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-cyber-grid bg-background/95">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-45"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with Glass Panel */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 glass-panel border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border/70">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">TalentForge AI</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-accent/40"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation links with sleek indicators */}
        <nav className="px-4 py-6 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive(item.href)
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
                }`}
            >
              <item.icon className="h-4.5 w-4.5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content frame */}
      <div className="lg:ml-64">
        {/* Sticky top header with Backdrop Blur */}
        <header className="glass-panel border-b px-6 py-4 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden hover:bg-accent/40"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Profile Menu dropdown */}
            <div className="flex items-center space-x-4 ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:opacity-90">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="font-bold">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-[10px] font-bold font-mono text-primary leading-none uppercase mt-1 tracking-wider">{user?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content main zone */}
        <main className="p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;