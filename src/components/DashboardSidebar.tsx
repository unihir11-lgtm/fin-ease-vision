import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  TrendingUp,
  Banknote,
  PiggyBank,
  Building2,
  BarChart3,
  FileText,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  Wallet,
  History,
  Download,
} from "lucide-react";
import logo from "@/assets/finease-logo.png";

const mainMenuItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Portfolio", url: "/dashboard/portfolio", icon: Wallet },
  { title: "Transactions", url: "/dashboard/transactions", icon: History },
];

const productItems = [
  { title: "IPO", url: "/dashboard/ipo", icon: TrendingUp },
  { title: "Bonds", url: "/dashboard/bonds", icon: Banknote },
  { title: "Fixed Deposits", url: "/dashboard/fds", icon: PiggyBank },
  { title: "NPS", url: "/dashboard/nps", icon: Building2 },
  { title: "Stock Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

const accountItems = [
  { title: "KYC Status", url: "/dashboard/kyc", icon: FileText },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Reports", url: "/dashboard/reports", icon: Download },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const MenuItem = ({ item }: { item: typeof mainMenuItems[0] }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive(item.url)}>
        <Link
          to={item.url}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive(item.url)
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted hover:bg-gray-100 hover:text-secondary"
          }`}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-white">
      <SidebarHeader className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FinEase" className={collapsed ? "h-8" : "h-10"} />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            {!collapsed && "Dashboard"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Products */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            {!collapsed && "Products"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {productItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            {!collapsed && "Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/dashboard/help"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-gray-100 hover:text-secondary transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                {!collapsed && <span>Help & Support</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                {!collapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
