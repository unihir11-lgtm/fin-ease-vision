import { creditRatingData } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Shield } from "lucide-react";

const COLORS = ['#059669', '#14b8a6', '#3b82f6', '#8b5cf6'];

const CreditRatingBreakdown = () => {
  const filteredData = creditRatingData.filter(d => d.value > 0);

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-bold text-secondary flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        Credit Rating Breakdown
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {creditRatingData.map((item, index) => (
            <div key={item.rating} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.value > 0 ? COLORS[index % COLORS.length] : '#e5e7eb' }}
                />
                <span className={`text-sm font-medium ${item.value > 0 ? 'text-secondary' : 'text-muted'}`}>
                  {item.rating}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-sm font-bold ${item.value > 0 ? 'text-secondary' : 'text-muted'}`}>
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800 font-medium">
          ✓ 75% of your portfolio is in AAA-rated investments
        </p>
        <p className="text-xs text-green-700 mt-1">
          High credit quality indicates lower default risk
        </p>
      </div>
    </div>
  );
};

export default CreditRatingBreakdown;
