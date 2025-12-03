import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userPortfolio, kycStatus } from "@/data/mockData";
import {
  TrendingUp,
  Banknote,
  PiggyBank,
  Building2,
  BarChart3,
  ChevronRight,
  Calendar,
  IndianRupee,
  CheckCircle,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import CashFlowTimeline from "@/components/dashboard/CashFlowTimeline";

const DashboardOverview = () => {
  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalFDValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0) +
    userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);
  const totalReturns = (totalBondValue + totalFDValue) - totalInvested;

  const quickActions = [
    { title: "IPO", description: "Apply for upcoming IPOs", icon: TrendingUp, href: "/dashboard/ipo", color: "bg-blue-500" },
    { title: "Bonds", description: "Explore bond offerings", icon: Banknote, href: "/dashboard/bonds", color: "bg-teal-500" },
    { title: "Fixed Deposits", description: "Book high-yield FDs", icon: PiggyBank, href: "/dashboard/fds", color: "bg-green-500" },
    { title: "NPS", description: "Manage pension savings", icon: Building2, href: "/dashboard/nps", color: "bg-purple-500" },
    { title: "Analytics", description: "Stock screener & tools", icon: BarChart3, href: "/dashboard/analytics", color: "bg-orange-500" },
  ];

  // Upcoming maturity alerts
  const upcomingMaturities = [
    ...userPortfolio.fds.map(fd => ({
      type: 'FD',
      name: `${fd.bankName} FD`,
      date: fd.maturityDate,
      value: fd.maturityValue,
    })),
    ...userPortfolio.bonds.map(bond => ({
      type: 'Bond',
      name: bond.issuer,
      date: bond.maturityDate,
      value: bond.currentValue,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Welcome back, John!</h1>
          <p className="text-muted">Here's your investment summary</p>
        </div>
        <div className="flex items-center gap-2">
          {kycStatus.status === "Approved" ? (
            <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4" />
              KYC Verified
            </span>
          ) : (
            <Link to="/dashboard/kyc">
              <Button size="sm" variant="outline">Complete KYC</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-start gap-2 p-5 rounded-2xl border border-[#E7F6FE] bg-gradient-to-br from-primary to-primary/80 text-white shadow-[0_4px_20px_0_rgba(23,93,128,0.08)]">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-sm text-white/70">Total Portfolio</span>
            <span className="flex items-center gap-1 text-xs text-white bg-white/20 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <p className="text-3xl font-bold flex items-center">
            <IndianRupee className="w-6 h-6" />
            {(totalBondValue + totalFDValue).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 p-5 rounded-2xl border border-[#E7F6FE] bg-white shadow-[0_4px_20px_0_rgba(23,93,128,0.08)]">
          <span className="text-sm text-muted">Total Invested</span>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalInvested.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 p-5 rounded-2xl border border-[#E7F6FE] bg-white shadow-[0_4px_20px_0_rgba(23,93,128,0.08)]">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted">Total Returns</span>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" />
              Profit
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalReturns.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 p-5 rounded-2xl border border-[#E7F6FE] bg-white shadow-[0_4px_20px_0_rgba(23,93,128,0.08)]">
          <span className="text-sm text-muted">Active Investments</span>
          <p className="text-2xl font-bold text-secondary">
            {userPortfolio.bonds.length + userPortfolio.fds.length}
          </p>
          <p className="text-xs text-muted">
            {userPortfolio.bonds.length} Bonds • {userPortfolio.fds.length} FDs
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-secondary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <div className="flex flex-col items-start gap-2 p-5 rounded-2xl border border-[#E7F6FE] bg-white shadow-[0_4px_20px_0_rgba(23,93,128,0.08)] hover:shadow-[0_6px_24px_0_rgba(23,93,128,0.12)] transition-all group cursor-pointer">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs text-muted">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        
        {/* Upcoming Maturities */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Upcoming Maturities
          </h3>
          <div className="space-y-3">
            {upcomingMaturities.map((item, index) => {
              const daysUntil = Math.ceil((new Date(item.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const isUrgent = daysUntil <= 30;
              
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    isUrgent ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.type === 'FD' ? 'bg-green-100' : 'bg-teal-100'
                      }`}>
                        {item.type === 'FD' ? (
                          <PiggyBank className="w-4 h-4 text-green-600" />
                        ) : (
                          <Banknote className="w-4 h-4 text-teal-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary text-sm">{item.name}</p>
                        <p className="text-xs text-muted">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary">₹{item.value.toLocaleString()}</p>
                      <p className={`text-xs ${isUrgent ? 'text-orange-600 font-medium' : 'text-muted'}`}>
                        {daysUntil > 0 ? `${daysUntil} days` : 'Matured'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/dashboard/portfolio" className="flex items-center justify-center gap-1 text-sm text-primary font-medium pt-4">
            View All Maturities <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Cash Flow Timeline */}
      <CashFlowTimeline />

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4">Portfolio Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Bonds</p>
                  <p className="text-xs text-muted">{userPortfolio.bonds.length} holdings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-secondary">₹{totalBondValue.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  {((totalBondValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}% of portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Fixed Deposits</p>
                  <p className="text-xs text-muted">{userPortfolio.fds.length} deposits</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-secondary">₹{totalFDValue.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  {((totalFDValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}% of portfolio
                </p>
              </div>
            </div>

            <Link to="/dashboard/portfolio" className="flex items-center justify-center gap-1 text-sm text-primary font-medium pt-2">
              View Full Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Coupon Payments
          </h3>
          <div className="space-y-3">
            {userPortfolio.bonds.map((bond) => (
              <div key={bond.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">{bond.issuer}</p>
                  <p className="text-xs text-muted">{bond.payoutFrequency} • {bond.nextCouponDate}</p>
                </div>
                <p className="font-bold text-primary">
                  ₹{Math.round(bond.investedAmount * bond.couponRate / 100 / 4).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
