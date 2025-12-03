import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userPortfolio, bonds } from "@/data/mockData";
import { Plus, ExternalLink, TrendingUp, IndianRupee, Calendar, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BondComparisonTool from "@/components/dashboard/BondComparisonTool";

const DashboardBonds = () => {
  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0);

  // Calculate next coupon income
  const nextCouponIncome = userPortfolio.bonds.reduce((sum, b) => {
    const quarterlyRate = b.couponRate / 100 / 4;
    return sum + (b.investedAmount * quarterlyRate);
  }, 0);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-5 border border-primary/20">
          <p className="text-sm text-muted mb-1">Next Quarter Income</p>
          <p className="text-2xl font-bold text-primary flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            ₹{Math.round(nextCouponIncome).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabs for Holdings and Tools */}
      <Tabs defaultValue="holdings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="holdings">My Holdings</TabsTrigger>
          <TabsTrigger value="compare">Compare Bonds</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          {/* Holdings */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-bold text-secondary">Your Bond Holdings</h2>
              <span className="text-sm text-muted">{userPortfolio.bonds.length} bonds</span>
            </div>
            <div className="divide-y divide-border">
              {userPortfolio.bonds.map((bond) => (
                <div key={bond.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                        <p className="text-xs text-muted">{bond.isin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        bond.rating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {bond.rating}
                      </span>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-muted text-xs">Units</p>
                      <p className="font-medium text-secondary">{bond.units}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Invested</p>
                      <p className="font-medium text-secondary">₹{bond.investedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Current Value</p>
                      <p className="font-medium text-green-600">₹{bond.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Next Coupon</p>
                      <p className="font-medium text-secondary">{bond.nextCouponDate}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Maturity</p>
                      <p className="font-medium text-secondary">{bond.maturityDate}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Coupon Rate: <span className="font-medium text-secondary">{bond.couponRate}%</span></span>
                      <span className="text-muted">Payout: <span className="font-medium text-secondary">{bond.payoutFrequency}</span></span>
                      <span className="text-green-600 font-medium">
                        +{(((bond.currentValue - bond.investedAmount) / bond.investedAmount) * 100).toFixed(2)}% returns
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compare">
          <BondComparisonTool />
        </TabsContent>
      </Tabs>

      {/* Explore More */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-secondary">Explore More Bonds</h2>
          <Link to="/bonds" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bonds.slice(0, 3).map((bond) => (
            <Link key={bond.id} to={`/bonds/${bond.id}`}>
              <div className="bg-white rounded-xl p-4 border border-border hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      bond.rating === "AAA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {bond.rating}
                    </span>
                    <span className="text-xs text-muted">{bond.bondType}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{bond.issuer}</h3>
                <p className="text-xs text-muted mt-1 line-clamp-2">{bond.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
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
