import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, TrendingUp, TrendingDown, MoreVertical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const statsCards = [
  { title: "Total Users", value: "12,845", change: "+12.5%", positive: true, icon: Users, color: "bg-primary/10" },
  { title: "Active Sessions", value: "8,234", change: "+8.2%", positive: true, icon: Activity, color: "bg-orange-100" },
  { title: "Revenue", value: "₹2.4M", change: "+23.1%", positive: true, icon: DollarSign, color: "bg-green-100" },
  { title: "Growth Rate", value: "18.6%", change: "-2.4%", positive: false, icon: TrendingUp, color: "bg-red-100" },
];

const growthData = [
  { month: "Jan", revenue: 2500, users: 3200 },
  { month: "Feb", revenue: 3500, users: 4100 },
  { month: "Mar", revenue: 5000, users: 5500 },
  { month: "Apr", revenue: 6500, users: 6800 },
  { month: "May", revenue: 8000, users: 8500 },
  { month: "Jun", revenue: 12000, users: 11000 },
];

const weeklyData = [
  { day: "Mon", activity: 3200 },
  { day: "Tue", activity: 4100 },
  { day: "Wed", activity: 3500 },
  { day: "Thu", activity: 5200 },
  { day: "Fri", activity: 4800 },
  { day: "Sat", activity: 4200 },
  { day: "Sun", activity: 2800 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="finease-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <span className={`text-sm flex items-center gap-0.5 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                    {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth & Revenue */}
        <Card className="finease-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">User Growth & Revenue</CardTitle>
              <p className="text-sm text-muted">Last 6 months performance</p>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" name="revenue" />
                  <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" name="users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="finease-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
              <p className="text-sm text-muted">User engagement this week</p>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="activity" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New user registered", user: "Rahul Sharma", time: "2 minutes ago", type: "success" },
              { action: "NPS payment processed", user: "Priya Patel", time: "15 minutes ago", type: "info" },
              { action: "KYC approved", user: "Amit Kumar", time: "1 hour ago", type: "success" },
              { action: "Bond purchase completed", user: "Sneha Reddy", time: "2 hours ago", type: "info" },
              { action: "FD matured", user: "Vikram Singh", time: "3 hours ago", type: "warning" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "success" ? "bg-green-500" :
                    activity.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                  }`} />
                  <div>
                    <p className="font-medium text-secondary">{activity.action}</p>
                    <p className="text-sm text-muted">{activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-muted">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
