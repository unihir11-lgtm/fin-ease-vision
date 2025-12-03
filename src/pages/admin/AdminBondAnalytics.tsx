import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, Landmark, Users, IndianRupee, TrendingUp,
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

const investmentTrend = [
  { month: "Jul", amount: 12, orders: 145 },
  { month: "Aug", amount: 18, orders: 210 },
  { month: "Sep", amount: 15, orders: 180 },
  { month: "Oct", amount: 24, orders: 290 },
  { month: "Nov", amount: 32, orders: 380 },
  { month: "Dec", amount: 28, orders: 340 },
];

const bondTypeDistribution = [
  { name: "Corporate", value: 45, color: "#1dab91" },
  { name: "PSU", value: 30, color: "#23698e" },
  { name: "Government", value: 15, color: "#f59e0b" },
  { name: "Tax-Free", value: 10, color: "#8b5cf6" },
];

const topBonds = [
  { name: "MoneyBoxx March'27", amount: 45, yield: "12.5%" },
  { name: "REC Limited", amount: 38, yield: "7.85%" },
  { name: "NHAI", amount: 32, yield: "7.35%" },
  { name: "IRFC", amount: 28, yield: "7.65%" },
  { name: "Indel Money", amount: 22, yield: "12.8%" },
];

const stats = [
  { label: "Total Investment", value: "₹85 Cr", change: "+22.4%", positive: true, icon: IndianRupee },
  { label: "Active Bonds", value: "24", change: "+4", positive: true, icon: Landmark },
  { label: "Unique Investors", value: "3,456", change: "+15.2%", positive: true, icon: Users },
  { label: "Avg. Yield", value: "9.8%", change: "-0.3%", positive: false, icon: TrendingUp },
];

const AdminBondAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Bond Analytics</h1>
          <p className="text-gray-500">Investment metrics and performance insights</p>
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
        {/* Investment Trend */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Investment Trend</CardTitle>
            <p className="text-sm text-gray-500">Monthly investment amount (₹ Crores)</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={investmentTrend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#23698e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#23698e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#23698e" fillOpacity={1} fill="url(#colorAmount)" name="Amount (Cr)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bond Type Distribution */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Bond Type Distribution</CardTitle>
            <p className="text-sm text-gray-500">Investment by bond category</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bondTypeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bondTypeDistribution.map((entry, index) => (
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

      {/* Top Bonds */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Bonds</CardTitle>
          <p className="text-sm text-gray-500">By investment amount (₹ Lakhs)</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBonds} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={120} />
                <Tooltip />
                <Bar dataKey="amount" fill="#1dab91" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBondAnalytics;