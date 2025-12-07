import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, IndianRupee, PieChart as PieChartIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface FinancialData {
  year: string;
  revenue: number;
  assets: number;
  profit: number;
  netWorth?: number;
}

interface FinancialChartsProps {
  companyName: string;
  financials: FinancialData[];
}

const FinancialCharts = ({ companyName, financials }: FinancialChartsProps) => {
  // Calculate growth rates
  const revenueGrowth = financials.length >= 2 
    ? ((financials[financials.length - 1].revenue - financials[0].revenue) / financials[0].revenue * 100).toFixed(1)
    : "0";
  
  const profitGrowth = financials.length >= 2 && financials[0].profit > 0
    ? ((financials[financials.length - 1].profit - financials[0].profit) / Math.abs(financials[0].profit) * 100).toFixed(1)
    : financials[financials.length - 1].profit > 0 ? "Turned Profitable" : "N/A";

  const latestFinancial = financials[financials.length - 1];
  
  // Asset breakdown for pie chart
  const assetBreakdown = [
    { name: "Fixed Assets", value: latestFinancial.assets * 0.35, color: "#14b8a6" },
    { name: "Current Assets", value: latestFinancial.assets * 0.40, color: "#3b82f6" },
    { name: "Investments", value: latestFinancial.assets * 0.15, color: "#f59e0b" },
    { name: "Other Assets", value: latestFinancial.assets * 0.10, color: "#8b5cf6" },
  ];

  // Profitability ratios
  const profitMargin = ((latestFinancial.profit / latestFinancial.revenue) * 100).toFixed(1);
  const roa = ((latestFinancial.profit / latestFinancial.assets) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover-lift bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Revenue (FY24)</span>
            </div>
            <p className="text-2xl font-bold text-primary">₹{latestFinancial.revenue} Cr</p>
            <Badge className="mt-2 bg-green-100 text-green-700 border-0 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              {revenueGrowth}% CAGR
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="hover-lift bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-muted-foreground">Net Profit (FY24)</span>
            </div>
            <p className={`text-2xl font-bold ${latestFinancial.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {latestFinancial.profit >= 0 ? "₹" : "-₹"}{Math.abs(latestFinancial.profit)} Cr
            </p>
            <Badge className={`mt-2 ${typeof profitGrowth === "string" && profitGrowth.includes("Turned") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"} border-0 text-xs`}>
              {profitGrowth}
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="hover-lift bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Total Assets</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">₹{latestFinancial.assets} Cr</p>
            <p className="text-xs text-muted-foreground mt-2">As of FY2024</p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PieChartIcon className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-muted-foreground">Profit Margin</span>
            </div>
            <p className={`text-2xl font-bold ${Number(profitMargin) >= 0 ? "text-amber-600" : "text-red-600"}`}>
              {profitMargin}%
            </p>
            <p className="text-xs text-muted-foreground mt-2">Net Profit / Revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trend */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Revenue & Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financials} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: "hsl(var(--background))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`₹${value} Cr`, '']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Breakdown */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Asset Breakdown (FY24)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {assetBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`₹${value.toFixed(0)} Cr`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trajectory */}
      <Card className="hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Financial Growth Trajectory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financials} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: "hsl(var(--background))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number) => [`₹${value} Cr`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="assets" 
                  name="Total Assets"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                />
                {financials[0].netWorth && (
                  <Line 
                    type="monotone" 
                    dataKey="netWorth" 
                    name="Net Worth"
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCharts;
