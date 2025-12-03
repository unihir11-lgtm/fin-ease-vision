import { portfolioHistory } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";

const PortfolioChart = () => {
  const startValue = portfolioHistory[0].value;
  const endValue = portfolioHistory[portfolioHistory.length - 1].value;
  const growthPercent = ((endValue - startValue) / startValue * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-secondary">Portfolio Growth</h3>
        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-sm">
          <TrendingUp className="w-3 h-3" />
          +{growthPercent}%
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            />
            <Tooltip 
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Portfolio Value']}
              labelStyle={{ color: '#0a344a', fontWeight: 600 }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#14b8a6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted">Starting</p>
          <p className="font-bold text-secondary">₹{(startValue / 100000).toFixed(1)}L</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted">Current</p>
          <p className="font-bold text-primary">₹{(endValue / 100000).toFixed(1)}L</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <p className="text-xs text-muted">Gain</p>
          <p className="font-bold text-green-600">₹{((endValue - startValue) / 100000).toFixed(1)}L</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
