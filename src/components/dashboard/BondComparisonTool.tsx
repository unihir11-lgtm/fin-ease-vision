import { useState } from "react";
import { bonds } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, Check, X, TrendingUp, Shield, Calendar, IndianRupee } from "lucide-react";

const BondComparisonTool = () => {
  const [selectedBonds, setSelectedBonds] = useState<string[]>([bonds[0].id, bonds[1].id]);

  const handleSelectBond = (index: number, bondId: string) => {
    const newSelected = [...selectedBonds];
    newSelected[index] = bondId;
    setSelectedBonds(newSelected);
  };

  const compareBonds = selectedBonds.map(id => bonds.find(b => b.id === id)!).filter(Boolean);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'AAA': return 'bg-green-100 text-green-700';
      case 'AA+': return 'bg-blue-100 text-blue-700';
      case 'AA': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBetterValue = (key: 'yield' | 'couponRate', values: number[]) => {
    return Math.max(...values);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-bold text-secondary flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-primary" />
        Bond Comparison Tool
      </h3>

      {/* Bond Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[0, 1].map((index) => (
          <Select 
            key={index} 
            value={selectedBonds[index]} 
            onValueChange={(value) => handleSelectBond(index, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select Bond ${index + 1}`} />
            </SelectTrigger>
            <SelectContent>
              {bonds.map((bond) => (
                <SelectItem key={bond.id} value={bond.id}>
                  {bond.issuer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="space-y-4">
        {/* Yield Comparison */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Yield
          </div>
          {compareBonds.map((bond) => (
            <div 
              key={bond.id} 
              className={`text-center p-2 rounded-lg ${
                bond.yield === getBetterValue('yield', compareBonds.map(b => b.yield))
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50'
              }`}
            >
              <span className={`font-bold ${
                bond.yield === getBetterValue('yield', compareBonds.map(b => b.yield))
                  ? 'text-green-600'
                  : 'text-secondary'
              }`}>
                {bond.yield}%
              </span>
              {bond.yield === getBetterValue('yield', compareBonds.map(b => b.yield)) && (
                <Check className="w-3 h-3 inline ml-1 text-green-600" />
              )}
            </div>
          ))}
        </div>

        {/* Coupon Rate */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            Coupon
          </div>
          {compareBonds.map((bond) => (
            <div 
              key={bond.id} 
              className={`text-center p-2 rounded-lg ${
                bond.couponRate === getBetterValue('couponRate', compareBonds.map(b => b.couponRate))
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50'
              }`}
            >
              <span className={`font-bold ${
                bond.couponRate === getBetterValue('couponRate', compareBonds.map(b => b.couponRate))
                  ? 'text-green-600'
                  : 'text-secondary'
              }`}>
                {bond.couponRate}%
              </span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Rating
          </div>
          {compareBonds.map((bond) => (
            <div key={bond.id} className="text-center p-2 bg-gray-50 rounded-lg">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRatingColor(bond.rating)}`}>
                {bond.rating}
              </span>
            </div>
          ))}
        </div>

        {/* Tenure */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Tenure
          </div>
          {compareBonds.map((bond) => (
            <div key={bond.id} className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-secondary">{bond.tenure}</span>
            </div>
          ))}
        </div>

        {/* Min Investment */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted">Min. Investment</div>
          {compareBonds.map((bond) => (
            <div key={bond.id} className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="font-medium text-secondary">₹{bond.minInvestment.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Payout */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted">Payout</div>
          {compareBonds.map((bond) => (
            <div key={bond.id} className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-secondary">{bond.payoutFrequency}</span>
            </div>
          ))}
        </div>

        {/* Risk Level */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="text-sm text-muted">Risk</div>
          {compareBonds.map((bond) => (
            <div key={bond.id} className="text-center p-2 bg-gray-50 rounded-lg">
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                bond.riskLevel === 'Very Low' ? 'bg-green-100 text-green-700' :
                bond.riskLevel === 'Low' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {bond.riskLevel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BondComparisonTool;
