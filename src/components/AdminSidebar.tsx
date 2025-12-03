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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/finease-logo.png";

const AdminSidebar = () => {
  const location = useLocation();
  const [npsOpen, setNpsOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "User Master", icon: Users, path: "/admin/users" },
  ];

  const npsItems = [
    { name: "NPS User Master", icon: Users, path: "/admin/nps/users" },
    { name: "Payment Entry", icon: CreditCard, path: "/admin/nps/payments" },
    { name: "Payment Settlement", icon: Receipt, path: "/admin/nps/settlements" },
  ];

  const cmsItems = [
    { name: "IPO Management", icon: FileText, path: "/admin/cms/ipo" },
    { name: "Bond Management", icon: FileText, path: "/admin/cms/bonds" },
    { name: "FD Management", icon: FileText, path: "/admin/cms/fds" },
  ];

  return (
    <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-secondary">NPS Admin</h1>
            <p className="text-sm text-muted">Super Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? "bg-primary text-white"
                : "text-muted hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}

        {/* NPS Section */}
        <div>
          <button
            onClick={() => setNpsOpen(!npsOpen)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-muted hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium">NPS</span>
            </div>
            {npsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {npsOpen && (
            <div className="ml-4 pl-4 border-l border-gray-200 space-y-1 mt-1">
              {npsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CMS Section */}
        <div>
          <button
            onClick={() => setCmsOpen(!cmsOpen)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-muted hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium">CMS</span>
            </div>
            {cmsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {cmsOpen && (
            <div className="ml-4 pl-4 border-l border-gray-200 space-y-1 mt-1">
              {cmsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Logs */}
        <Link
          to="/admin/logs"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive("/admin/logs")
              ? "bg-primary text-white"
              : "text-muted hover:bg-gray-100"
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-medium">Logs</span>
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <Link to="/">
          <Button variant="destructive" className="w-full justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
