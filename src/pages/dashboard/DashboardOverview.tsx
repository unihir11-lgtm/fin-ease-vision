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
  ArrowDownRight,
} from "lucide-react";

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
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted">Total Portfolio</span>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {(totalBondValue + totalFDValue).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted">Total Invested</span>
          </div>
          <p className="text-2xl font-bold text-secondary flex items-center">
            <IndianRupee className="w-5 h-5" />
            {totalInvested.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
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

        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted">Active Investments</span>
          </div>
          <p className="text-2xl font-bold text-secondary">
            {userPortfolio.bonds.length + userPortfolio.fds.length}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-secondary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <div className="bg-white rounded-xl p-4 border border-border hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-xs text-muted mt-1">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Portfolio Breakdown & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Breakdown */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-secondary mb-4">Portfolio Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                <p className="text-xs text-green-600">+{((totalBondValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                <p className="text-xs text-green-600">+{((totalFDValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}%</p>
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
            Upcoming Payments
          </h3>
          <div className="space-y-3">
            {userPortfolio.bonds.map((bond) => (
              <div key={bond.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">{bond.issuer}</p>
                  <p className="text-xs text-muted">Coupon payment • {bond.nextCouponDate}</p>
                </div>
                <p className="font-bold text-primary">
                  ₹{Math.round(bond.investedAmount * bond.couponRate / 100 / 4).toLocaleString()}
                </p>
              </div>
            ))}
            {userPortfolio.fds.slice(0, 1).map((fd) => (
              <div key={fd.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">{fd.bankName} FD</p>
                  <p className="text-xs text-muted">Maturity • {fd.maturityDate}</p>
                </div>
                <p className="font-bold text-green-600">
                  ₹{fd.maturityValue.toLocaleString()}
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
