import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Activity, DollarSign, TrendingUp, TrendingDown, Download, 
  ArrowUpRight, ArrowDownRight, Landmark, Building2, FileText, 
  ShieldCheck, Clock, Bell, ChevronRight, PieChart, BarChart3,
  Wallet, Target, Calendar, AlertCircle, CheckCircle2
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, PieChart as RechartsPie, 
  Pie, Cell, LineChart, Line
} from "recharts";
import { Link } from "react-router-dom";

const statsCards = [
  { title: "Total Users", value: "12,845", change: "+12.5%", positive: true, icon: Users, color: "bg-primary/10 text-primary", subtitle: "328 new this month" },
  { title: "Total AUM", value: "₹48.5 Cr", change: "+23.1%", positive: true, icon: Wallet, color: "bg-green-100 text-green-600", subtitle: "Across all products" },
  { title: "Active Investments", value: "8,234", change: "+8.2%", positive: true, icon: Target, color: "bg-blue-100 text-blue-600", subtitle: "IPO, Bonds, FDs, NPS" },
  { title: "Revenue MTD", value: "₹12.4 L", change: "+18.6%", positive: true, icon: DollarSign, color: "bg-amber-100 text-amber-600", subtitle: "Commission earned" },
  { title: "KYC Pending", value: "156", change: "-24%", positive: true, icon: ShieldCheck, color: "bg-purple-100 text-purple-600", subtitle: "Needs verification" },
  { title: "Support Tickets", value: "23", change: "+5", positive: false, icon: AlertCircle, color: "bg-red-100 text-red-600", subtitle: "Open tickets" },
];

const revenueData = [
  { month: "Jul", bonds: 2500, fds: 3200, ipo: 1800, nps: 1200 },
  { month: "Aug", bonds: 3500, fds: 4100, ipo: 2400, nps: 1500 },
  { month: "Sep", bonds: 5000, fds: 5500, ipo: 3200, nps: 1800 },
  { month: "Oct", bonds: 6500, fds: 6800, ipo: 4500, nps: 2200 },
  { month: "Nov", bonds: 8000, fds: 8500, ipo: 5800, nps: 2800 },
  { month: "Dec", bonds: 9500, fds: 10200, ipo: 7200, nps: 3400 },
];

const productDistribution = [
  { name: "Bonds", value: 35, color: "#14b8a6" },
  { name: "Fixed Deposits", value: 30, color: "#3b82f6" },
  { name: "IPO", value: 25, color: "#f59e0b" },
  { name: "NPS", value: 10, color: "#8b5cf6" },
];

const dailyActivity = [
  { day: "Mon", logins: 3200, transactions: 145 },
  { day: "Tue", logins: 4100, transactions: 189 },
  { day: "Wed", logins: 3500, transactions: 156 },
  { day: "Thu", logins: 5200, transactions: 234 },
  { day: "Fri", logins: 4800, transactions: 212 },
  { day: "Sat", logins: 2800, transactions: 98 },
  { day: "Sun", logins: 1800, transactions: 67 },
];

const recentActivities = [
  { action: "New IPO Application", user: "Rahul Sharma", product: "Swiggy IPO", amount: "₹1,50,000", time: "2 min ago", type: "ipo", status: "pending" },
  { action: "Bond Purchase", user: "Priya Patel", product: "REC Ltd Bond", amount: "₹5,00,000", time: "15 min ago", type: "bond", status: "completed" },
  { action: "FD Booking", user: "Amit Kumar", product: "HDFC FD", amount: "₹2,00,000", time: "32 min ago", type: "fd", status: "completed" },
  { action: "NPS Contribution", user: "Sneha Reddy", product: "Tier 1 NPS", amount: "₹50,000", time: "1 hr ago", type: "nps", status: "completed" },
  { action: "KYC Submitted", user: "Vikram Singh", product: "Video KYC", amount: "-", time: "2 hr ago", type: "kyc", status: "pending" },
  { action: "FD Matured", user: "Kavita Gupta", product: "Bajaj FD", amount: "₹3,50,000", time: "3 hr ago", type: "fd", status: "matured" },
];

const topProducts = [
  { name: "REC Limited Bond", type: "Bond", sold: 234, value: "₹23.4 Cr", trend: "+12%" },
  { name: "HDFC 1-Year FD", type: "FD", sold: 189, value: "₹18.9 Cr", trend: "+8%" },
  { name: "Swiggy IPO", type: "IPO", sold: 156, value: "₹15.6 Cr", trend: "+45%" },
  { name: "ICICI Prudential NPS", type: "NPS", sold: 98, value: "₹4.9 Cr", trend: "+15%" },
];

const quickActions = [
  { label: "Add New IPO", href: "/admin/ipo/management", icon: FileText, color: "bg-amber-100 text-amber-600" },
  { label: "Manage Bonds", href: "/admin/bonds/management", icon: Landmark, color: "bg-primary/10 text-primary" },
  { label: "FD Providers", href: "/admin/fds/management", icon: Building2, color: "bg-blue-100 text-blue-600" },
  { label: "User Management", href: "/admin/users", icon: Users, color: "bg-purple-100 text-purple-600" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Section with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/30 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(168_72%_40%/0.2)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-white">
            <p className="text-white/60 text-sm font-medium mb-1">Admin Dashboard</p>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Admin</h1>
            <p className="text-white/70 mt-1">Here's what's happening with your platform today</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </Button>
            <Button className="gap-2 bg-white text-secondary hover:bg-white/90">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-muted/30 rounded-full translate-x-1/3 -translate-y-1/3" />
            <CardContent className="p-4 relative">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color} shadow-sm`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full ${stat.positive ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}>
                  {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link to={action.href} key={i}>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-secondary text-sm">{action.label}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Revenue by Product
                </CardTitle>
                <CardDescription>Monthly commission breakdown (in ₹ thousands)</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorBonds" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFDs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorIPO" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}K`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="bonds" name="Bonds" stroke="#14b8a6" fillOpacity={1} fill="url(#colorBonds)" strokeWidth={2} />
                  <Area type="monotone" dataKey="fds" name="FDs" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFDs)" strokeWidth={2} />
                  <Area type="monotone" dataKey="ipo" name="IPO" stroke="#f59e0b" fillOpacity={1} fill="url(#colorIPO)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              AUM Distribution
            </CardTitle>
            <CardDescription>By product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {productDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-bold text-secondary ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Weekly Activity
                </CardTitle>
                <CardDescription>User logins & transactions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="logins" name="Logins" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="transactions" name="Transactions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Top Performing Products
                </CardTitle>
                <CardDescription>By investment volume this month</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-secondary text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.type} • {product.sold} investors</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary">{product.value}</p>
                    <p className="text-xs text-green-600">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest platform transactions and events</CardDescription>
            </div>
            <Link to="/admin/logs">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">Activity</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">User</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Product</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Amount</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-secondary">{activity.action}</td>
                    <td className="p-4 text-muted-foreground">{activity.user}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{activity.product}</Badge>
                    </td>
                    <td className="p-4 text-right font-semibold text-secondary">{activity.amount}</td>
                    <td className="p-4">
                      <Badge className={`text-xs ${
                        activity.status === "completed" ? "bg-green-100 text-green-700" :
                        activity.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {activity.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
