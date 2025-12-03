import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, Landmark, Users, IndianRupee, TrendingUp,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart as PieChartIcon,
  Shield, Calendar, ChevronRight, Award, Percent
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { useState } from "react";

const investmentTrend = [
  { month: "Jul", amount: 12, orders: 145, yield: 8.2 },
  { month: "Aug", amount: 18, orders: 210, yield: 8.4 },
  { month: "Sep", amount: 15, orders: 180, yield: 8.1 },
  { month: "Oct", amount: 24, orders: 290, yield: 8.6 },
  { month: "Nov", amount: 32, orders: 380, yield: 8.8 },
  { month: "Dec", amount: 28, orders: 340, yield: 8.5 },
];

const bondTypeDistribution = [
  { name: "Corporate", value: 45, color: "#14b8a6", amount: 38.25 },
  { name: "PSU", value: 30, color: "#3b82f6", amount: 25.5 },
  { name: "Government", value: 15, color: "#f59e0b", amount: 12.75 },
  { name: "Tax-Free", value: 10, color: "#8b5cf6", amount: 8.5 },
];

const ratingDistribution = [
  { rating: "AAA", count: 12, amount: 45 },
  { rating: "AA+", count: 8, amount: 28 },
  { rating: "AA", count: 6, amount: 18 },
  { rating: "A+", count: 3, amount: 8 },
  { rating: "A", count: 1, amount: 2 },
];

const topBonds = [
  { name: "REC Limited Bond", issuer: "REC Ltd", amount: "₹12.5 Cr", yield: "7.85%", rating: "AAA", orders: 234 },
  { name: "NHAI Bond 2030", issuer: "NHAI", amount: "₹9.8 Cr", yield: "7.35%", rating: "AAA", orders: 189 },
  { name: "MoneyBoxx March'27", issuer: "MoneyBoxx", amount: "₹8.2 Cr", yield: "12.50%", rating: "AA", orders: 156 },
  { name: "IRFC Bond 2028", issuer: "IRFC", amount: "₹7.5 Cr", yield: "7.65%", rating: "AAA", orders: 142 },
  { name: "Indel Money Aug'26", issuer: "Indel Money", amount: "₹5.8 Cr", yield: "12.80%", rating: "AA", orders: 98 },
];

const maturitySchedule = [
  { year: "2025", bonds: 3, amount: 12 },
  { year: "2026", bonds: 5, amount: 25 },
  { year: "2027", bonds: 8, amount: 38 },
  { year: "2028", bonds: 4, amount: 18 },
  { year: "2029", bonds: 3, amount: 15 },
  { year: "2030+", bonds: 2, amount: 8 },
];

const stats = [
  { label: "Total Investment", value: "₹85 Cr", change: "+22.4%", positive: true, icon: IndianRupee, color: "bg-primary/10 text-primary" },
  { label: "Active Bonds", value: "24", change: "+4", positive: true, icon: Landmark, color: "bg-blue-100 text-blue-600" },
  { label: "Unique Investors", value: "3,456", change: "+15.2%", positive: true, icon: Users, color: "bg-green-100 text-green-600" },
  { label: "Avg. Yield", value: "8.8%", change: "+0.3%", positive: true, icon: Percent, color: "bg-amber-100 text-amber-600" },
  { label: "AAA Rated", value: "68%", change: "+5%", positive: true, icon: Shield, color: "bg-purple-100 text-purple-600" },
  { label: "Monthly Orders", value: "380", change: "+18%", positive: true, icon: TrendingUp, color: "bg-teal-100 text-teal-600" },
];

const AdminBondAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
            <Landmark className="w-7 h-7 text-primary" />
            Bond Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Investment metrics, yield trends, and portfolio insights</p>
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
        {/* Investment Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Investment Trend
                </CardTitle>
                <CardDescription>Monthly investment amount (₹ Crores) and average yield</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={investmentTrend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="amount" name="Investment (Cr)" stroke="#14b8a6" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="yield" name="Avg Yield %" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bond Type Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Bond Categories
            </CardTitle>
            <CardDescription>Distribution by bond type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bondTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {bondTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {bondTypeDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-secondary">{item.value}%</span>
                    <span className="text-xs text-muted-foreground ml-2">(₹{item.amount}Cr)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Credit Rating Distribution
            </CardTitle>
            <CardDescription>Investment by credit rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="rating" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Amount (₹ Cr)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="count" name="No. of Bonds" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Maturity Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Maturity Schedule
            </CardTitle>
            <CardDescription>Bonds maturing by year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maturitySchedule} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `₹${v}Cr`} />
                  <YAxis type="category" dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} width={50} />
                  <Tooltip formatter={(value: number) => [`₹${value} Cr`, 'Amount']} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Bonds Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Top Performing Bonds
              </CardTitle>
              <CardDescription>Sorted by investment amount</CardDescription>
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
                  <th className="text-left p-4 font-medium text-secondary text-sm">Bond Name</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Issuer</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Total Investment</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Yield</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Rating</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topBonds.map((bond, i) => (
                  <tr key={i} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-secondary">{bond.name}</td>
                    <td className="p-4 text-muted-foreground">{bond.issuer}</td>
                    <td className="p-4 text-right font-bold text-secondary">{bond.amount}</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-100 text-green-700">{bond.yield}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={`${
                        bond.rating === "AAA" ? "bg-green-100 text-green-700" :
                        bond.rating.startsWith("AA") ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {bond.rating}
                      </Badge>
                    </td>
                    <td className="p-4 text-right text-muted-foreground">{bond.orders}</td>
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

export default AdminBondAnalytics;
