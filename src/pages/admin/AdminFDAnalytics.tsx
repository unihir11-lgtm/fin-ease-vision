import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, PiggyBank, Users, IndianRupee, TrendingUp,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart as PieChartIcon,
  Calendar, ChevronRight, Award, Percent, Building2, Clock
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { useState } from "react";

const depositTrend = [
  { month: "Jul", deposits: 25, bookings: 180, avgRate: 8.1 },
  { month: "Aug", deposits: 32, bookings: 245, avgRate: 8.2 },
  { month: "Sep", deposits: 28, bookings: 210, avgRate: 8.0 },
  { month: "Oct", deposits: 45, bookings: 320, avgRate: 8.3 },
  { month: "Nov", deposits: 58, bookings: 420, avgRate: 8.5 },
  { month: "Dec", deposits: 52, bookings: 385, avgRate: 8.4 },
];

const providerDistribution = [
  { name: "Bajaj Finance", value: 35, color: "#14b8a6", amount: 84 },
  { name: "Shriram Finance", value: 25, color: "#3b82f6", amount: 60 },
  { name: "HDFC Bank", value: 20, color: "#f59e0b", amount: 48 },
  { name: "Mahindra Finance", value: 12, color: "#8b5cf6", amount: 29 },
  { name: "Others", value: 8, color: "#6b7280", amount: 19 },
];

const tenureDistribution = [
  { tenure: "< 1 Year", count: 320, amount: 45 },
  { tenure: "1-2 Years", count: 580, amount: 98 },
  { tenure: "2-3 Years", count: 450, amount: 72 },
  { tenure: "3-5 Years", count: 380, amount: 58 },
  { tenure: "5+ Years", count: 162, amount: 32 },
];

const rateComparison = [
  { provider: "Bajaj Finance", regular: 9.1, senior: 9.35 },
  { provider: "Shriram Finance", regular: 8.75, senior: 9.0 },
  { provider: "Utkarsh SFB", regular: 8.1, senior: 8.6 },
  { provider: "Mahindra Finance", regular: 8.35, senior: 8.6 },
  { provider: "HDFC Bank", regular: 7.25, senior: 7.75 },
];

const topProviders = [
  { name: "Bajaj Finance", bookings: 456, amount: "₹84 Cr", rate: "9.10%", type: "NBFC", rating: "AAA" },
  { name: "Shriram Finance", bookings: 342, amount: "₹60 Cr", rate: "8.75%", type: "NBFC", rating: "AA+" },
  { name: "HDFC Bank", bookings: 287, amount: "₹48 Cr", rate: "7.25%", type: "Bank", rating: "AAA" },
  { name: "Mahindra Finance", bookings: 234, amount: "₹29 Cr", rate: "8.35%", type: "NBFC", rating: "AA" },
  { name: "Utkarsh SFB", bookings: 189, amount: "₹22 Cr", rate: "8.10%", type: "SFB", rating: "A+" },
];

const maturityCalendar = [
  { month: "Jan", maturing: 45, amount: 12 },
  { month: "Feb", maturing: 38, amount: 9.5 },
  { month: "Mar", maturing: 62, amount: 18 },
  { month: "Apr", maturing: 28, amount: 7 },
  { month: "May", maturing: 51, amount: 14 },
  { month: "Jun", maturing: 34, amount: 8 },
];

const stats = [
  { label: "Total Deposits", value: "₹240 Cr", change: "+28.5%", positive: true, icon: IndianRupee, color: "bg-primary/10 text-primary" },
  { label: "Active Bookings", value: "1,892", change: "+15.2%", positive: true, icon: PiggyBank, color: "bg-blue-100 text-blue-600" },
  { label: "Unique Depositors", value: "1,456", change: "+12.8%", positive: true, icon: Users, color: "bg-green-100 text-green-600" },
  { label: "Avg. Rate", value: "8.4%", change: "+0.3%", positive: true, icon: Percent, color: "bg-amber-100 text-amber-600" },
  { label: "FD Providers", value: "18", change: "+2", positive: true, icon: Building2, color: "bg-purple-100 text-purple-600" },
  { label: "Maturing (30d)", value: "₹18 Cr", change: "62 FDs", positive: true, icon: Clock, color: "bg-teal-100 text-teal-600" },
];

const AdminFDAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
            <PiggyBank className="w-7 h-7 text-primary" />
            FD Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Deposit metrics, provider performance, and maturity insights</p>
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
        {/* Deposit Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Deposit Trend
                </CardTitle>
                <CardDescription>Monthly deposits (₹ Crores) and average interest rate</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depositTrend}>
                  <defs>
                    <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[7, 9]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="deposits" name="Deposits (Cr)" stroke="#14b8a6" fillOpacity={1} fill="url(#colorDeposits)" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="avgRate" name="Avg Rate %" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Provider Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Provider Share
            </CardTitle>
            <CardDescription>Distribution by FD provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={providerDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {providerDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {providerDistribution.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground text-xs">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-secondary text-xs">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tenure Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Tenure Distribution
            </CardTitle>
            <CardDescription>Bookings by tenure period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tenureDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="tenure" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="amount" name="Amount (₹Cr)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rate Comparison */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              Interest Rate Comparison
            </CardTitle>
            <CardDescription>Regular vs Senior Citizen rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} domain={[6, 10]} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="provider" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 10 }} width={100} />
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="regular" name="Regular" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="senior" name="Senior Citizen" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Providers Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Top FD Providers
              </CardTitle>
              <CardDescription>Sorted by total deposits</CardDescription>
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
                  <th className="text-left p-4 font-medium text-secondary text-sm">Provider</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Type</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Bookings</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Total Deposits</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Best Rate</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topProviders.map((provider, i) => (
                  <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-secondary">{provider.name}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{provider.type}</Badge>
                    </td>
                    <td className="p-4 text-right text-muted-foreground">{provider.bookings}</td>
                    <td className="p-4 text-right font-bold text-secondary">{provider.amount}</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-700">{provider.rate}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={`${
                        provider.rating === "AAA" ? "bg-green-100 text-green-700" :
                        provider.rating.startsWith("AA") ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {provider.rating}
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

export default AdminFDAnalytics;
