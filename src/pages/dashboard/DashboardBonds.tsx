import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userPortfolio, bonds } from "@/data/mockData";
import { Plus, ExternalLink, TrendingUp, IndianRupee } from "lucide-react";

const DashboardBonds = () => {
  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">My Bonds</h1>
          <p className="text-muted">Manage your bond investments</p>
        </div>
        <Link to="/bonds">
          <Button className="bg-primary gap-2">
            <Plus className="w-4 h-4" />
            Explore Bonds
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalInvested.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Current Value</p>
          <p className="text-2xl font-bold text-primary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalBondValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <p className="text-sm text-muted mb-1">Total Returns</p>
          <p className="text-2xl font-bold text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            ₹{(totalBondValue - totalInvested).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-secondary">Your Holdings</h2>
        </div>
        <div className="divide-y divide-border">
          {userPortfolio.bonds.map((bond) => (
            <div key={bond.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                  <p className="text-sm text-muted">{bond.units} units • {bond.couponRate}% coupon</p>
                </div>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted">Invested</p>
                  <p className="font-medium text-secondary">₹{bond.investedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted">Current Value</p>
                  <p className="font-medium text-green-600">₹{bond.currentValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted">Next Coupon</p>
                  <p className="font-medium text-secondary">{bond.nextCouponDate}</p>
                </div>
                <div>
                  <p className="text-muted">Maturity</p>
                  <p className="font-medium text-secondary">{bond.maturityDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore More */}
      <div>
        <h2 className="font-bold text-secondary mb-4">Explore More Bonds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bonds.slice(0, 2).map((bond) => (
            <Link key={bond.id} to={`/bonds/${bond.id}`}>
              <div className="bg-white rounded-xl p-4 border border-border hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      bond.rating === "AAA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {bond.rating}
                    </span>
                    <span className="text-xs text-muted">{bond.bondType}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted" />
                </div>
                <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted">{bond.tenure}</span>
                  <span className="text-lg font-bold text-primary">{bond.yield}% yield</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardBonds;
