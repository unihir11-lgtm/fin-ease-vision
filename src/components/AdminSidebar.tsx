import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Receipt,
  ChevronDown,
  ChevronRight,
  LogOut,
  Activity,
  TrendingUp,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Bell,
  Settings,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/finease-logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const [npsOpen, setNpsOpen] = useState(true);
  const [ipoOpen, setIpoOpen] = useState(false);
  const [bondsOpen, setBondsOpen] = useState(false);
  const [fdOpen, setFdOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isActiveGroup = (paths: string[]) => paths.some(p => location.pathname.includes(p));

  // Auto-expand based on current route
  useState(() => {
    if (location.pathname.includes('/admin/ipo')) setIpoOpen(true);
    if (location.pathname.includes('/admin/bonds')) setBondsOpen(true);
    if (location.pathname.includes('/admin/fds')) setFdOpen(true);
    if (location.pathname.includes('/admin/nps')) setNpsOpen(true);
  });

  const navLinkClass = (active: boolean) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-primary text-white shadow-md"
        : "text-foreground/70 hover:bg-muted/60 hover:text-secondary"
    }`;

  const subLinkClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
      active
        ? "bg-primary/10 text-primary font-semibold"
        : "text-foreground/70 hover:bg-muted/60 hover:text-secondary"
    }`;

  const groupButtonClass = (active: boolean) =>
    `flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-muted/60 text-secondary"
        : "text-foreground/70 hover:bg-muted/50"
    }`;

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="FinEase" className="h-10" />
        </Link>
        <div className="mt-4 px-3 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary block">Super Admin</span>
              <span className="text-xs text-gray-500">Full Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {/* Dashboard */}
        <Link to="/admin" className={navLinkClass(isActive("/admin"))}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* User Management */}
        <Link to="/admin/users" className={navLinkClass(isActive("/admin/users"))}>
          <Users className="w-5 h-5" />
          <span className="font-medium">User Management</span>
        </Link>

        {/* Section Divider */}
        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Products</p>
        </div>

        {/* NPS Section */}
        <div>
          <button
            onClick={() => setNpsOpen(!npsOpen)}
            className={groupButtonClass(isActiveGroup(['/admin/nps']))}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium">NPS</span>
            </div>
            {npsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {npsOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              <Link to="/admin/nps/users" className={subLinkClass(isActive("/admin/nps/users"))}>
                <Users className="w-4 h-4" />
                <span>NPS Users</span>
              </Link>
              <Link to="/admin/nps/payments" className={subLinkClass(isActive("/admin/nps/payments"))}>
                <CreditCard className="w-4 h-4" />
                <span>Payment Entry</span>
              </Link>
              <Link to="/admin/nps/settlements" className={subLinkClass(isActive("/admin/nps/settlements"))}>
                <Receipt className="w-4 h-4" />
                <span>Settlements</span>
              </Link>
            </div>
          )}
        </div>

        {/* IPO Section */}
        <div>
          <button
            onClick={() => setIpoOpen(!ipoOpen)}
            className={groupButtonClass(isActiveGroup(['/admin/ipo']))}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">IPO</span>
            </div>
            {ipoOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {ipoOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              <Link to="/admin/ipo/management" className={subLinkClass(isActive("/admin/ipo/management"))}>
                <Settings className="w-4 h-4" />
                <span>IPO Management</span>
              </Link>
              <Link to="/admin/ipo/applications" className={subLinkClass(isActive("/admin/ipo/applications"))}>
                <FileText className="w-4 h-4" />
                <span>Applications</span>
              </Link>
              <Link to="/admin/ipo/analytics" className={subLinkClass(isActive("/admin/ipo/analytics"))}>
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* Bonds Section */}
        <div>
          <button
            onClick={() => setBondsOpen(!bondsOpen)}
            className={groupButtonClass(isActiveGroup(['/admin/bonds']))}
          >
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5" />
              <span className="font-medium">Bonds</span>
            </div>
            {bondsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {bondsOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              <Link to="/admin/bonds/management" className={subLinkClass(isActive("/admin/bonds/management"))}>
                <Settings className="w-4 h-4" />
                <span>Bond Management</span>
              </Link>
              <Link to="/admin/bonds/orders" className={subLinkClass(isActive("/admin/bonds/orders"))}>
                <Receipt className="w-4 h-4" />
                <span>Orders</span>
              </Link>
              <Link to="/admin/bonds/analytics" className={subLinkClass(isActive("/admin/bonds/analytics"))}>
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* FD Section */}
        <div>
          <button
            onClick={() => setFdOpen(!fdOpen)}
            className={groupButtonClass(isActiveGroup(['/admin/fds']))}
          >
            <div className="flex items-center gap-3">
              <PiggyBank className="w-5 h-5" />
              <span className="font-medium">Fixed Deposits</span>
            </div>
            {fdOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {fdOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              <Link to="/admin/fds/management" className={subLinkClass(isActive("/admin/fds/management"))}>
                <Settings className="w-4 h-4" />
                <span>FD Management</span>
              </Link>
              <Link to="/admin/fds/bookings" className={subLinkClass(isActive("/admin/fds/bookings"))}>
                <Calendar className="w-4 h-4" />
                <span>Bookings</span>
              </Link>
              <Link to="/admin/fds/analytics" className={subLinkClass(isActive("/admin/fds/analytics"))}>
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </div>
          )}
        </div>

        {/* Section Divider */}
        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</p>
        </div>

        {/* Activity Logs */}
        <Link to="/admin/logs" className={navLinkClass(isActive("/admin/logs"))}>
          <Activity className="w-5 h-5" />
          <span className="font-medium">Activity Logs</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {/* Admin Info */}
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-secondary text-sm truncate">Super Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@finease.com</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-primary">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Logout */}
        <Link to="/">
          <Button variant="outline" className="w-full justify-center gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;