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
  Settings,
  TrendingUp,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/finease-logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const [npsOpen, setNpsOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isActiveGroup = (paths: string[]) => paths.some(p => location.pathname.includes(p));

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "User Management", icon: Users, path: "/admin/users" },
  ];

  const npsItems = [
    { name: "NPS Users", icon: Users, path: "/admin/nps/users" },
    { name: "Payment Entry", icon: CreditCard, path: "/admin/nps/payments" },
    { name: "Settlements", icon: Receipt, path: "/admin/nps/settlements" },
  ];

  const cmsItems = [
    { name: "IPO Management", icon: TrendingUp, path: "/admin/cms/ipo" },
    { name: "Bond Management", icon: Landmark, path: "/admin/cms/bonds" },
    { name: "FD Management", icon: PiggyBank, path: "/admin/cms/fds" },
  ];

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="FinEase" className="h-10" />
        </Link>
        <div className="mt-4 px-3 py-2 bg-primary/10 rounded-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Super Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Items */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}

        {/* NPS Section */}
        <div className="pt-2">
          <button
            onClick={() => setNpsOpen(!npsOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
              isActiveGroup(['/admin/nps'])
                ? "bg-secondary/10 text-secondary"
                : "text-muted-foreground hover:bg-secondary/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium">NPS</span>
            </div>
            {npsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {npsOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              {npsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CMS Section */}
        <div className="pt-2">
          <button
            onClick={() => setCmsOpen(!cmsOpen)}
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
              isActiveGroup(['/admin/cms'])
                ? "bg-secondary/10 text-secondary"
                : "text-muted-foreground hover:bg-secondary/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Product CMS</span>
            </div>
            {cmsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {cmsOpen && (
            <div className="ml-4 pl-4 border-l-2 border-gray-100 space-y-1 mt-1">
              {cmsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Activity Logs */}
        <div className="pt-2">
          <Link
            to="/admin/logs"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive("/admin/logs")
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary"
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">Activity Logs</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {/* Admin Info */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-secondary text-sm truncate">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@finease.com</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
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
