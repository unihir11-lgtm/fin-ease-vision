import { useState } from "react";
import { Calculator, TrendingUp, Calendar, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [tenure, setTenure] = useState(12);
  const [compounding, setCompounding] = useState<"monthly" | "quarterly" | "yearly">("quarterly");

  const calculateMaturity = () => {
    const n = compounding === "monthly" ? 12 : compounding === "quarterly" ? 4 : 1;
    const t = tenure / 12;
    const maturityValue = principal * Math.pow(1 + rate / 100 / n, n * t);
    return maturityValue;
  };

  const maturityValue = calculateMaturity();
  const totalInterest = maturityValue - principal;
  const effectiveYield = ((maturityValue - principal) / principal) * 100;

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-bold text-secondary flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary" />
        FD Interest Calculator
      </h3>

      <div className="space-y-5">
        {/* Principal Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm text-muted">Principal Amount</Label>
            <span className="text-sm font-bold text-secondary">₹{principal.toLocaleString()}</span>
          </div>
          <Slider
            value={[principal]}
            onValueChange={(value) => setPrincipal(value[0])}
            min={10000}
            max={10000000}
            step={10000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>₹10,000</span>
            <span>₹1 Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm text-muted flex items-center gap-1">
              <Percent className="w-3 h-3" />
              Interest Rate (p.a.)
            </Label>
            <span className="text-sm font-bold text-secondary">{rate}%</span>
          </div>
          <Slider
            value={[rate]}
            onValueChange={(value) => setRate(value[0])}
            min={5}
            max={10}
            step={0.1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>5%</span>
            <span>10%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-2">
            <Label className="text-sm text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Tenure (Months)
            </Label>
            <span className="text-sm font-bold text-secondary">{tenure} months</span>
          </div>
          <Slider
            value={[tenure]}
            onValueChange={(value) => setTenure(value[0])}
            min={3}
            max={120}
            step={3}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted">
            <span>3 months</span>
            <span>10 years</span>
          </div>
        </div>

        {/* Compounding Frequency */}
        <div>
          <Label className="text-sm text-muted mb-2 block">Compounding Frequency</Label>
          <Select value={compounding} onValueChange={(value: "monthly" | "quarterly" | "yearly") => setCompounding(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted mb-1">Maturity Value</p>
            <p className="text-xl font-bold text-primary">₹{Math.round(maturityValue).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">Total Interest</p>
            <p className="text-xl font-bold text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              ₹{Math.round(totalInterest).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Effective Yield</span>
            <span className="font-bold text-secondary">{effectiveYield.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
