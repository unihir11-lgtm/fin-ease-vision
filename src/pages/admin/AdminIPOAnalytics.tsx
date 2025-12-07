import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Download, TrendingUp, Users, IndianRupee, Target, FileText,
  ArrowUpRight, ArrowDownRight, Calendar, ChevronRight, BarChart3,
  PieChart as PieChartIcon, Activity, Award, Clock, RefreshCw,
  Percent, Building2, AlertTriangle, CheckCircle, XCircle, Eye
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, ComposedChart
} from "recharts";
import { useState } from "react";

const applicationTrend = [
  { month: "Jul", applications: 450, amount: 45, approved: 380, rejected: 70 },
  { month: "Aug", applications: 620, amount: 62, approved: 540, rejected: 80 },
  { month: "Sep", applications: 580, amount: 58, approved: 495, rejected: 85 },
  { month: "Oct", applications: 890, amount: 89, approved: 780, rejected: 110 },
  { month: "Nov", applications: 1234, amount: 123, approved: 1050, rejected: 184 },
  { month: "Dec", applications: 980, amount: 98, approved: 850, rejected: 130 },
];

const ipoPerformance = [
  { name: "Swiggy", subscribed: 185, target: 100, amount: 45, listingGain: 17.5, status: "Listed" },
  { name: "MobiKwik", subscribed: 320, target: 100, amount: 38, listingGain: 58.5, status: "Listed" },
  { name: "Afcons Infra", subscribed: 65, target: 100, amount: 28, listingGain: -12.3, status: "Listed" },
  { name: "Zinka Logistics", subscribed: 145, target: 100, amount: 22, listingGain: 8.2, status: "Listed" },
  { name: "NTPC Green", subscribed: 295, target: 100, amount: 56, listingGain: 0, status: "Open" },
];

const categoryDistribution = [
  { name: "Retail", value: 65, color: "#14b8a6", investors: 8450, amount: 120 },
  { name: "HNI", value: 25, color: "#3b82f6", investors: 1250, amount: 45 },
  { name: "QIB", value: 10, color: "#f59e0b", investors: 85, amount: 20 },
];

const dailyApplications = [
  { day: "Mon", applications: 245, amount: 24.5, approved: 210, pending: 35 },
  { day: "Tue", applications: 312, amount: 31.2, approved: 278, pending: 34 },
  { day: "Wed", applications: 287, amount: 28.7, approved: 245, pending: 42 },
  { day: "Thu", applications: 398, amount: 39.8, approved: 356, pending: 42 },
  { day: "Fri", applications: 456, amount: 45.6, approved: 412, pending: 44 },
  { day: "Sat", applications: 234, amount: 23.4, approved: 198, pending: 36 },
  { day: "Sun", applications: 156, amount: 15.6, approved: 132, pending: 24 },
];

const revenueData = [
  { month: "Jul", commission: 4.5, fees: 1.2 },
  { month: "Aug", commission: 6.2, fees: 1.8 },
  { month: "Sep", commission: 5.8, fees: 1.5 },
  { month: "Oct", commission: 8.9, fees: 2.4 },
  { month: "Nov", commission: 12.3, fees: 3.2 },
  { month: "Dec", commission: 9.8, fees: 2.6 },
];

const topIPOs = [
  { name: "Swiggy IPO", applications: 4567, amount: "₹68.5 Cr", subscription: "3.2x", allotment: "42%", listingGain: "+17.5%", status: "Listed" },
  { name: "MobiKwik IPO", applications: 3890, amount: "₹58.3 Cr", subscription: "4.8x", allotment: "28%", listingGain: "+58.5%", status: "Listed" },
  { name: "NTPC Green", applications: 3245, amount: "₹48.7 Cr", subscription: "2.9x", allotment: "-", listingGain: "-", status: "Open" },
  { name: "Zinka Logistics", applications: 2890, amount: "₹43.3 Cr", subscription: "2.1x", allotment: "52%", listingGain: "+8.2%", status: "Listed" },
  { name: "Afcons Infrastructure", applications: 2456, amount: "₹36.8 Cr", subscription: "0.65x", allotment: "100%", listingGain: "-12.3%", status: "Listed" },
];

const allotmentStats = [
  { range: "0-25%", count: 2, percentage: 20 },
  { range: "26-50%", count: 3, percentage: 30 },
  { range: "51-75%", count: 2, percentage: 20 },
  { range: "76-100%", count: 3, percentage: 30 },
];

const stats = [
  { label: "Total Applications", value: "12,456", change: "+18.5%", positive: true, icon: FileText, color: "bg-primary/10 text-primary" },
  { label: "Unique Investors", value: "8,234", change: "+12.3%", positive: true, icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Total Amount", value: "₹185 Cr", change: "+24.8%", positive: true, icon: IndianRupee, color: "bg-green-100 text-green-600" },
  { label: "Approval Rate", value: "87.4%", change: "+2.1%", positive: true, icon: Award, color: "bg-purple-100 text-purple-600" },
  { label: "Commission Earned", value: "₹47.5 L", change: "+32.5%", positive: true, icon: Target, color: "bg-amber-100 text-amber-600" },
  { label: "Avg. Allotment", value: "45.2%", change: "-5.2%", positive: false, icon: Percent, color: "bg-teal-100 text-teal-600" },
];

const AdminIPOAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <svg className="absolute right-0 top-0 h-full w-1/3 text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" points="50,0 100,0 100,100 0,100" />
        </svg>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">IPO Analytics</h1>
              <p className="text-white/70">Performance metrics, trends, and revenue insights</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="bg-white/10">
                <TabsTrigger value="7d" className="text-white data-[state=active]:bg-white data-[state=active]:text-secondary">7D</TabsTrigger>
                <TabsTrigger value="1m" className="text-white data-[state=active]:bg-white data-[state=active]:text-secondary">1M</TabsTrigger>
                <TabsTrigger value="6m" className="text-white data-[state=active]:bg-white data-[state=active]:text-secondary">6M</TabsTrigger>
                <TabsTrigger value="1y" className="text-white data-[state=active]:bg-white data-[state=active]:text-secondary">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button className="gap-2 bg-white text-secondary hover:bg-white/90">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
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

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">IPO Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Application Trend */}
            <Card className="lg:col-span-2 finease-card">
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
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={applicationTrend}>
                      <defs>
                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                      <Legend />
                      <Area type="monotone" dataKey="applications" name="Total Applications" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
                      <Line type="monotone" dataKey="approved" name="Approved" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="rejected" name="Rejected" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="finease-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                  Investor Categories
                </CardTitle>
                <CardDescription>Distribution by investor type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
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
                <div className="space-y-3 mt-4">
                  {categoryDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-secondary">{item.value}%</span>
                        <span className="text-xs text-muted-foreground ml-2">(₹{item.amount} Cr)</span>
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
            <Card className="finease-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  IPO Subscription Rates
                </CardTitle>
                <CardDescription>Subscription percentage by IPO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ipoPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} width={90} />
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Subscription']} />
                      <Bar dataKey="subscribed" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="finease-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Weekly Activity
                </CardTitle>
                <CardDescription>Applications by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyApplications}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="approved" stackId="a" fill="#22c55e" name="Approved" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Status Breakdown */}
            <Card className="finease-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Application Status Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Approved</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">8,567</p>
                    <p className="text-xs text-muted-foreground">68.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="font-medium">Pending Review</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber-600">2,345</p>
                    <p className="text-xs text-muted-foreground">18.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium">Rejected</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-600">1,544</p>
                    <p className="text-xs text-muted-foreground">12.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allotment Distribution */}
            <Card className="finease-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Allotment Rate Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={allotmentStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="IPO Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Revenue Breakdown
              </CardTitle>
              <CardDescription>Commission and fees earned from IPO facilitation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(v) => `₹${v}L`} />
                    <Tooltip formatter={(value: number) => [`₹${value}L`, '']} />
                    <Legend />
                    <Area type="monotone" dataKey="commission" name="Commission" stroke="#22c55e" fillOpacity={1} fill="url(#colorCommission)" strokeWidth={2} />
                    <Area type="monotone" dataKey="fees" name="Service Fees" stroke="#3b82f6" fillOpacity={1} fill="url(#colorFees)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="finease-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    IPO Performance Summary
                  </CardTitle>
                  <CardDescription>Subscription, allotment, and listing performance</CardDescription>
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
                      <th className="text-center p-4 font-medium text-secondary text-sm">Allotment</th>
                      <th className="text-center p-4 font-medium text-secondary text-sm">Listing Gain</th>
                      <th className="text-center p-4 font-medium text-secondary text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topIPOs.map((ipo, i) => (
                      <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-secondary">{ipo.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right text-muted-foreground">{ipo.applications.toLocaleString()}</td>
                        <td className="p-4 text-right font-bold text-secondary">{ipo.amount}</td>
                        <td className="p-4 text-center">
                          <Badge className={parseFloat(ipo.subscription) >= 1 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            {ipo.subscription}
                          </Badge>
                        </td>
                        <td className="p-4 text-center text-muted-foreground">{ipo.allotment}</td>
                        <td className="p-4 text-center">
                          {ipo.listingGain !== "-" ? (
                            <span className={`font-medium ${ipo.listingGain.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {ipo.listingGain}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline" className={`${
                            ipo.status === "Open" ? "border-green-200 text-green-700" :
                            ipo.status === "Listed" ? "border-blue-200 text-blue-700" :
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIPOAnalytics;