import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, PiggyBank, Users, IndianRupee, TrendingUp,
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
  LineChart,
  Line,
} from "recharts";

const depositTrend = [
  { month: "Jul", deposits: 25, bookings: 180 },
  { month: "Aug", deposits: 32, bookings: 245 },
  { month: "Sep", deposits: 28, bookings: 210 },
  { month: "Oct", deposits: 45, bookings: 320 },
  { month: "Nov", deposits: 58, bookings: 420 },
  { month: "Dec", deposits: 52, bookings: 385 },
];

const providerDistribution = [
  { name: "Bajaj Finance", value: 35, color: "#1dab91" },
  { name: "Shriram Finance", value: 25, color: "#23698e" },
  { name: "HDFC Bank", value: 20, color: "#f59e0b" },
  { name: "Mahindra Finance", value: 12, color: "#8b5cf6" },
  { name: "Others", value: 8, color: "#94a3b8" },
];

const tenureDistribution = [
  { tenure: "< 1 Year", count: 320 },
  { tenure: "1-2 Years", count: 580 },
  { tenure: "2-3 Years", count: 450 },
  { tenure: "3-5 Years", count: 380 },
  { tenure: "5+ Years", count: 162 },
];

const rateComparison = [
  { provider: "Bajaj Finance", regular: 9.1, senior: 9.35 },
  { provider: "Shriram Finance", regular: 8.75, senior: 9.0 },
  { provider: "Utkarsh SFB", regular: 8.1, senior: 8.6 },
  { provider: "Mahindra Finance", regular: 8.35, senior: 8.6 },
  { provider: "HDFC Bank", regular: 7.25, senior: 7.75 },
];

const stats = [
  { label: "Total Deposits", value: "₹240 Cr", change: "+28.5%", positive: true, icon: IndianRupee },
  { label: "Active Bookings", value: "1,892", change: "+15.2%", positive: true, icon: PiggyBank },
  { label: "Unique Depositors", value: "1,456", change: "+12.8%", positive: true, icon: Users },
  { label: "Avg. Rate", value: "8.2%", change: "+0.3%", positive: true, icon: TrendingUp },
];

const AdminFDAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">FD Analytics</h1>
          <p className="text-gray-500">Deposit metrics and performance insights</p>
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
        {/* Deposit Trend */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Deposit Trend</CardTitle>
            <p className="text-sm text-gray-500">Monthly deposits (₹ Crores)</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depositTrend}>
                  <defs>
                    <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1dab91" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1dab91" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="deposits" stroke="#1dab91" fillOpacity={1} fill="url(#colorDeposits)" name="Deposits (Cr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Provider Distribution */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Provider Distribution</CardTitle>
            <p className="text-sm text-gray-500">Deposit share by provider</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={providerDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {providerDistribution.map((entry, index) => (
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

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tenure Distribution */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Tenure Distribution</CardTitle>
            <p className="text-sm text-gray-500">Number of bookings by tenure</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tenureDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="tenure" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#23698e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rate Comparison */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Rate Comparison</CardTitle>
            <p className="text-sm text-gray-500">Regular vs Senior Citizen rates</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} domain={[6, 10]} />
                  <YAxis type="category" dataKey="provider" axisLine={false} tickLine={false} width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="regular" fill="#1dab91" name="Regular" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="senior" fill="#23698e" name="Senior Citizen" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminFDAnalytics;