import { maturitySchedule } from "@/data/mockData";
import { CalendarDays, Banknote, PiggyBank } from "lucide-react";

const MaturitySchedule = () => {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-bold text-secondary flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-primary" />
        Maturity Schedule
      </h3>

      <div className="space-y-3">
        {maturitySchedule.map((item) => {
          const totalValue = item.bondValue + item.fdValue;
          const hasMaturity = totalValue > 0;

          return (
            <div 
              key={item.year} 
              className={`p-3 rounded-lg border transition-all ${
                hasMaturity 
                  ? 'bg-primary/5 border-primary/20 hover:border-primary/40' 
                  : 'bg-gray-50 border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold ${hasMaturity ? 'text-secondary' : 'text-muted'}`}>
                  {item.year}
                </span>
                {hasMaturity && (
                  <span className="text-lg font-bold text-primary">
                    ₹{totalValue.toLocaleString()}
                  </span>
                )}
              </div>
              
              {hasMaturity && (
                <div className="flex gap-4 text-xs">
                  {item.bonds > 0 && (
                    <span className="flex items-center gap-1 text-teal-600">
                      <Banknote className="w-3 h-3" />
                      {item.bonds} bond{item.bonds > 1 ? 's' : ''} (₹{item.bondValue.toLocaleString()})
                    </span>
                  )}
                  {item.fds > 0 && (
                    <span className="flex items-center gap-1 text-green-600">
                      <PiggyBank className="w-3 h-3" />
                      {item.fds} FD{item.fds > 1 ? 's' : ''} (₹{item.fdValue.toLocaleString()})
                    </span>
                  )}
                </div>
              )}

              {!hasMaturity && (
                <p className="text-xs text-muted">No maturities scheduled</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaturitySchedule;
