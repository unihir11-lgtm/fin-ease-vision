import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, IndianRupee, PieChart, ArrowUpRight } from "lucide-react";

const DashboardNPS = () => {
  const npsData = {
    totalCorpus: 450000,
    totalContributed: 400000,
    returns: 50000,
    returnsPercentage: 12.5,
    tier1Balance: 350000,
    tier2Balance: 100000,
    pensionFundManager: "HDFC Pension",
    assetAllocation: {
      equity: 50,
      corporate: 30,
      government: 15,
      alternative: 5,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">National Pension System</h1>
          <p className="text-muted">Manage your retirement savings</p>
        </div>
        <Button className="bg-primary gap-2">
          <IndianRupee className="w-4 h-4" />
          Contribute Now
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Total Corpus</p>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {npsData.totalCorpus.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Contributed</p>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {npsData.totalContributed.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Total Returns</p>
          <p className="text-2xl font-bold text-green-600 flex items-center">
            <ArrowUpRight className="w-5 h-5" />
            ₹{npsData.returns.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Returns %</p>
          <p className="text-2xl font-bold text-green-600">
            +{npsData.returnsPercentage}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Account Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Tier 1 Balance</span>
              <span className="font-bold text-secondary">₹{npsData.tier1Balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Tier 2 Balance</span>
              <span className="font-bold text-secondary">₹{npsData.tier2Balance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Pension Fund Manager</span>
              <span className="font-bold text-secondary">{npsData.pensionFundManager}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">PRAN</span>
              <span className="font-bold text-secondary">1100XXXXXXXX</span>
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Asset Allocation
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted">Equity (E)</span>
                <span className="font-medium text-secondary">{npsData.assetAllocation.equity}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${npsData.assetAllocation.equity}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted">Corporate Bonds (C)</span>
                <span className="font-medium text-secondary">{npsData.assetAllocation.corporate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${npsData.assetAllocation.corporate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted">Government Bonds (G)</span>
                <span className="font-medium text-secondary">{npsData.assetAllocation.government}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${npsData.assetAllocation.government}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted">Alternative (A)</span>
                <span className="font-medium text-secondary">{npsData.assetAllocation.alternative}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${npsData.assetAllocation.alternative}%` }} />
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">Change Allocation</Button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <span className="font-medium">Download Statement</span>
          <span className="text-xs text-muted">PDF / Excel format</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <span className="font-medium">Change Fund Manager</span>
          <span className="text-xs text-muted">Switch your PFM</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2">
          <span className="font-medium">Update Nominee</span>
          <span className="text-xs text-muted">Add or change nominee</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardNPS;
