import { userPortfolio } from "@/data/mockData";
import { IndianRupee, TrendingUp, Banknote, PiggyBank, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import CashFlowTimeline from "@/components/dashboard/CashFlowTimeline";
import CreditRatingBreakdown from "@/components/dashboard/CreditRatingBreakdown";
import MaturitySchedule from "@/components/dashboard/MaturitySchedule";

const DashboardPortfolio = () => {
  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalBondInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0);
  const totalFDValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);
  const totalFDPrincipal = userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);
  const totalPortfolio = totalBondValue + totalFDValue;
  const totalInvested = totalBondInvested + totalFDPrincipal;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">My Portfolio</h1>
          <p className="text-muted">Complete overview of all your investments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Statement
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-accent rounded-2xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-white/70 text-sm mb-1">Total Portfolio Value</p>
            <p className="text-3xl font-bold flex items-center">
              <IndianRupee className="w-6 h-6" />
              {totalPortfolio.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Total Invested</p>
            <p className="text-2xl font-bold flex items-center">
              <IndianRupee className="w-5 h-5" />
              {totalInvested.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Unrealized Gains</p>
            <p className="text-2xl font-bold flex items-center text-green-300">
              <TrendingUp className="w-5 h-5 mr-1" />
              ₹{(totalPortfolio - totalInvested).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Returns %</p>
            <p className="text-2xl font-bold text-green-300">
              +{(((totalPortfolio - totalInvested) / totalInvested) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        <CreditRatingBreakdown />
      </div>

      {/* Cash Flow & Maturity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashFlowTimeline />
        </div>
        <MaturitySchedule />
      </div>

      {/* Asset Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4">Asset Allocation</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-muted">
                  <Banknote className="w-4 h-4 text-teal-500" />
                  Bonds
                </span>
                <span className="font-medium text-secondary">
                  {((totalBondValue / totalPortfolio) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${(totalBondValue / totalPortfolio) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted mt-1">₹{totalBondValue.toLocaleString()}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2 text-muted">
                  <PiggyBank className="w-4 h-4 text-green-500" />
                  Fixed Deposits
                </span>
                <span className="font-medium text-secondary">
                  {((totalFDValue / totalPortfolio) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${(totalFDValue / totalPortfolio) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted mt-1">₹{totalFDValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4">Investment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Total Bonds</span>
              <span className="font-bold text-secondary">{userPortfolio.bonds.length}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Total FDs</span>
              <span className="font-bold text-secondary">{userPortfolio.fds.length}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Avg. Bond Returns</span>
              <span className="font-bold text-green-600">
                +{(((totalBondValue - totalBondInvested) / totalBondInvested) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-muted">Avg. FD Returns</span>
              <span className="font-bold text-green-600">
                +{(((totalFDValue - totalFDPrincipal) / totalFDPrincipal) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Holdings with Tabs */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <Tabs defaultValue="all" className="w-full">
          <div className="p-4 border-b border-border">
            <TabsList>
              <TabsTrigger value="all">All Holdings</TabsTrigger>
              <TabsTrigger value="bonds">Bonds</TabsTrigger>
              <TabsTrigger value="fds">Fixed Deposits</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="divide-y divide-border">
              {userPortfolio.bonds.map((bond) => (
                <div key={`bond-${bond.id}`} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{bond.issuer}</p>
                      <p className="text-xs text-muted">Bond • {bond.couponRate}% coupon • {bond.rating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary">₹{bond.currentValue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+₹{(bond.currentValue - bond.investedAmount).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {userPortfolio.fds.map((fd) => (
                <div key={`fd-${fd.id}`} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <PiggyBank className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{fd.bankName}</p>
                      <p className="text-xs text-muted">FD • {fd.interestRate}% p.a. • {fd.creditRating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary">₹{fd.maturityValue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+₹{(fd.maturityValue - fd.principal).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bonds" className="m-0">
            <div className="divide-y divide-border">
              {userPortfolio.bonds.map((bond) => (
                <div key={`bond-${bond.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{bond.issuer}</p>
                        <p className="text-xs text-muted">{bond.isin}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      bond.rating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {bond.rating}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
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
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fds" className="m-0">
            <div className="divide-y divide-border">
              {userPortfolio.fds.map((fd) => (
                <div key={`fd-${fd.id}`} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <PiggyBank className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{fd.bankName}</p>
                        <p className="text-xs text-muted">{fd.fdType} FD • {fd.payoutType}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      fd.creditRating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {fd.creditRating}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted text-xs">Principal</p>
                      <p className="font-medium text-secondary">₹{fd.principal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Maturity Value</p>
                      <p className="font-medium text-green-600">₹{fd.maturityValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Start Date</p>
                      <p className="font-medium text-secondary">{fd.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs">Maturity Date</p>
                      <p className="font-medium text-secondary">{fd.maturityDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPortfolio;
