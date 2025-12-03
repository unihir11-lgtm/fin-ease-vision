import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, TrendingUp, Users, IndianRupee, Target, FileText,
  ArrowUpRight, ArrowDownRight, Calendar, ChevronRight, BarChart3,
  PieChart as PieChartIcon, Activity, Award, Clock
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { useState } from "react";

const applicationTrend = [
  { month: "Jul", applications: 450, amount: 45, approved: 380 },
  { month: "Aug", applications: 620, amount: 62, approved: 540 },
  { month: "Sep", applications: 580, amount: 58, approved: 495 },
  { month: "Oct", applications: 890, amount: 89, approved: 780 },
  { month: "Nov", applications: 1234, amount: 123, approved: 1050 },
  { month: "Dec", applications: 980, amount: 98, approved: 850 },
];

const ipoPerformance = [
  { name: "Swiggy IPO", subscribed: 185, target: 100, amount: 45, status: "Oversubscribed" },
  { name: "MobiKwik IPO", subscribed: 320, target: 100, amount: 38, status: "Oversubscribed" },
  { name: "Afcons Infra", subscribed: 65, target: 100, amount: 28, status: "Undersubscribed" },
  { name: "Zinka Logistics", subscribed: 145, target: 100, amount: 22, status: "Oversubscribed" },
  { name: "NTPC Green", subscribed: 295, target: 100, amount: 56, status: "Oversubscribed" },
];

const categoryDistribution = [
  { name: "Retail", value: 65, color: "#14b8a6", investors: 8450 },
  { name: "HNI", value: 25, color: "#3b82f6", investors: 1250 },
  { name: "Institutional", value: 10, color: "#f59e0b", investors: 85 },
];

const dailyApplications = [
  { day: "Mon", applications: 245, amount: 24.5 },
  { day: "Tue", applications: 312, amount: 31.2 },
  { day: "Wed", applications: 287, amount: 28.7 },
  { day: "Thu", applications: 398, amount: 39.8 },
  { day: "Fri", applications: 456, amount: 45.6 },
  { day: "Sat", applications: 234, amount: 23.4 },
  { day: "Sun", applications: 156, amount: 15.6 },
];

const topIPOs = [
  { name: "Swiggy IPO", applications: 4567, amount: "₹68.5 Cr", subscription: "3.2x", status: "Closed" },
  { name: "MobiKwik IPO", applications: 3890, amount: "₹58.3 Cr", subscription: "4.8x", status: "Open" },
  { name: "NTPC Green", applications: 3245, amount: "₹48.7 Cr", subscription: "2.9x", status: "Upcoming" },
  { name: "Zinka Logistics", applications: 2890, amount: "₹43.3 Cr", subscription: "2.1x", status: "Closed" },
];

const stats = [
  { label: "Total Applications", value: "12,456", change: "+18.5%", positive: true, icon: FileText, color: "bg-primary/10 text-primary" },
  { label: "Unique Investors", value: "8,234", change: "+12.3%", positive: true, icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Total Amount", value: "₹185 Cr", change: "+24.8%", positive: true, icon: IndianRupee, color: "bg-green-100 text-green-600" },
  { label: "Approval Rate", value: "87.4%", change: "+2.1%", positive: true, icon: Award, color: "bg-purple-100 text-purple-600" },
  { label: "Avg. Lot Size", value: "₹15,000", change: "+5.2%", positive: true, icon: Target, color: "bg-amber-100 text-amber-600" },
  { label: "Pending Review", value: "156", change: "-24%", positive: true, icon: Clock, color: "bg-teal-100 text-teal-600" },
];

const AdminIPOAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            IPO Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Performance metrics, subscription trends, and investor insights</p>
        </div>
        <div className="flex gap-3">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="7d" className="text-xs">7 Days</TabsTrigger>
              <TabsTrigger value="1m" className="text-xs">1 Month</TabsTrigger>
              <TabsTrigger value="6m" className="text-xs">6 Months</TabsTrigger>
              <TabsTrigger value="1y" className="text-xs">1 Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Application Trend
                </CardTitle>
                <CardDescription>Monthly applications and approvals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationTrend}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="applications" name="Applications" stroke="#14b8a6" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
                  <Area type="monotone" dataKey="approved" name="Approved" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApproved)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Investor Categories
            </CardTitle>
            <CardDescription>Distribution by investor type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-secondary">{item.value}%</span>
                    <span className="text-xs text-muted-foreground ml-2">({item.investors.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IPO Subscription Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              IPO Subscription Rates
            </CardTitle>
            <CardDescription>Subscription percentage by IPO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ipoPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} width={100} />
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Subscription']} />
                  <Bar dataKey="subscribed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Applications by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyApplications}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top IPOs Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Top Performing IPOs
              </CardTitle>
              <CardDescription>Sorted by total applications</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">IPO Name</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Applications</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Total Amount</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Subscription</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {topIPOs.map((ipo, i) => (
                  <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-secondary">{ipo.name}</td>
                    <td className="p-4 text-right text-muted-foreground">{ipo.applications.toLocaleString()}</td>
                    <td className="p-4 text-right font-bold text-secondary">{ipo.amount}</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-700">{ipo.subscription}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline" className={`${
                        ipo.status === "Open" ? "border-green-200 text-green-700" :
                        ipo.status === "Upcoming" ? "border-amber-200 text-amber-700" :
                        "border-gray-200 text-gray-600"
                      }`}>
                        {ipo.status}
                      </Badge>
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

export default AdminIPOAnalytics;
