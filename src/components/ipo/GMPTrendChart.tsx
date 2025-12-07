import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GMPTrendChartProps {
  companyName: string;
  currentGMP: number;
  priceMax: number;
}

const GMPTrendChart = ({ companyName, currentGMP, priceMax }: GMPTrendChartProps) => {
  // Generate mock GMP trend data for past 14 days
  const generateGMPData = () => {
    const data = [];
    const baseGMP = currentGMP;
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const variance = Math.floor(Math.random() * 40) - 20;
      const gmp = Math.max(0, baseGMP + variance - (i * 3));
      
      data.push({
        date: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        gmp: gmp,
        expectedListing: priceMax + gmp,
      });
    }
    return data;
  };

  const gmpData = generateGMPData();
  const latestGMP = gmpData[gmpData.length - 1].gmp;
  const previousGMP = gmpData[gmpData.length - 2].gmp;
  const gmpChange = latestGMP - previousGMP;
  const expectedListingPrice = priceMax + currentGMP;
  const expectedGain = ((currentGMP / priceMax) * 100).toFixed(1);

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Grey Market Premium (GMP) Trend
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Last 14 Days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* GMP Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Current GMP</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-primary">₹{currentGMP}</p>
              {gmpChange > 0 ? (
                <Badge className="bg-green-100 text-green-700 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{gmpChange}
                </Badge>
              ) : gmpChange < 0 ? (
                <Badge className="bg-red-100 text-red-700 border-0">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {gmpChange}
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-700 border-0">
                  <Minus className="w-3 h-3 mr-1" />
                  0
                </Badge>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Expected Listing</p>
            <p className="text-2xl font-bold text-green-600">₹{expectedListingPrice}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Issue Price</p>
            <p className="text-2xl font-bold text-amber-600">₹{priceMax}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Expected Gain</p>
            <p className="text-2xl font-bold text-blue-600">+{expectedGain}%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gmpData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gmpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: "hsl(var(--background))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
                formatter={(value: number, name: string) => [
                  `₹${value}`, 
                  name === "gmp" ? "GMP" : "Expected Listing"
                ]}
              />
              <Area
                type="monotone"
                dataKey="gmp"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#gmpGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          * Grey Market Premium is unofficial and indicative only. Actual listing price may vary.
        </p>
      </CardContent>
    </Card>
  );
};

export default GMPTrendChart;
