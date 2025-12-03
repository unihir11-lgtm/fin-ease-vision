import { cashFlowData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Calendar, TrendingUp } from "lucide-react";

const CashFlowTimeline = () => {
  const totalExpected = cashFlowData.reduce((sum, d) => sum + d.total, 0);
  const nextPayout = cashFlowData.find(d => d.total > 0);

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-secondary flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Cash Flow Timeline
          </h3>
          <p className="text-sm text-muted mt-1">Projected income from investments</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Total Expected (12 months)</p>
          <p className="text-xl font-bold text-primary flex items-center justify-end gap-1">
            <TrendingUp className="w-4 h-4" />
            ₹{totalExpected.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => value.split(' ')[0]}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `₹${value.toLocaleString()}`, 
                name === 'bondCoupons' ? 'Bond Coupons' : name === 'fdInterest' ? 'FD Interest' : 'Maturity'
              ]}
              labelStyle={{ color: '#0a344a', fontWeight: 600 }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend 
              formatter={(value) => (
                value === 'bondCoupons' ? 'Bond Coupons' : 
                value === 'fdInterest' ? 'FD Interest' : 'Maturity'
              )}
            />
            <Bar dataKey="bondCoupons" stackId="a" fill="#14b8a6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="fdInterest" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="maturity" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {nextPayout && (
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-secondary">
            Next Payout: <span className="text-primary">{nextPayout.month}</span>
          </p>
          <p className="text-xs text-muted mt-1">
            ₹{nextPayout.bondCoupons.toLocaleString()} from bonds • ₹{nextPayout.fdInterest.toLocaleString()} from FDs
          </p>
        </div>
      )}
    </div>
  );
};

export default CashFlowTimeline;
