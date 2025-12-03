import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, TrendingUp, Users, IndianRupee, Target,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const applicationTrend = [
  { month: "Jul", applications: 450, amount: 45 },
  { month: "Aug", applications: 620, amount: 62 },
  { month: "Sep", applications: 580, amount: 58 },
  { month: "Oct", applications: 890, amount: 89 },
  { month: "Nov", applications: 1234, amount: 123 },
  { month: "Dec", applications: 980, amount: 98 },
];

const ipoPerformance = [
  { name: "Swiggy", subscribed: 85, target: 100 },
  { name: "MobiKwik", subscribed: 120, target: 100 },
  { name: "Afcons Infra", subscribed: 65, target: 100 },
  { name: "Zinka", subscribed: 45, target: 100 },
  { name: "NTPC Green", subscribed: 95, target: 100 },
];

const categoryDistribution = [
  { name: "Retail", value: 65, color: "#1dab91" },
  { name: "HNI", value: 25, color: "#23698e" },
  { name: "Institutional", value: 10, color: "#f59e0b" },
];

const stats = [
  { label: "Total Applications", value: "12,456", change: "+18.5%", positive: true, icon: TrendingUp },
  { label: "Unique Investors", value: "8,234", change: "+12.3%", positive: true, icon: Users },
  { label: "Total Amount", value: "₹185 Cr", change: "+24.8%", positive: true, icon: IndianRupee },
  { label: "Conversion Rate", value: "72.4%", change: "-2.1%", positive: false, icon: Target },
];

const AdminIPOAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">IPO Analytics</h1>
          <p className="text-gray-500">Performance metrics and insights</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Download Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-sm flex items-center gap-0.5 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Application Trend</CardTitle>
            <p className="text-sm text-gray-500">Monthly applications over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationTrend}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1dab91" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1dab91" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="applications" stroke="#1dab91" fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* IPO Subscription */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">IPO Subscription Rate</CardTitle>
            <p className="text-sm text-gray-500">Subscription percentage by IPO</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ipoPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                  <Tooltip />
                  <Bar dataKey="subscribed" fill="#23698e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Investor Category Distribution</CardTitle>
          <p className="text-sm text-gray-500">Application breakdown by investor type</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIPOAnalytics;