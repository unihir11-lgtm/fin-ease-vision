import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userPortfolio, kycStatus } from "@/data/mockData";
import { 
  TrendingUp, 
  Banknote, 
  PiggyBank, 
  User, 
  FileText, 
  LogOut,
  ChevronRight,
  Calendar,
  IndianRupee,
  CheckCircle,
  Clock
} from "lucide-react";
import logo from "@/assets/finease-logo.png";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "bonds" | "fds">("overview");

  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalFDValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0) + 
                        userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="FinEase" className="h-10" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/bonds" className="text-muted hover:text-primary text-sm font-medium">Bonds</Link>
            <Link to="/fds" className="text-muted hover:text-primary text-sm font-medium">FDs</Link>
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-secondary">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border min-h-[calc(100vh-65px)] hidden lg:block">
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "overview" ? "bg-primary/10 text-primary" : "text-muted hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab("bonds")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "bonds" ? "bg-primary/10 text-primary" : "text-muted hover:bg-gray-100"
              }`}
            >
              <Banknote className="w-5 h-5" />
              <span className="font-medium">My Bonds</span>
            </button>
            <button 
              onClick={() => setActiveTab("fds")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "fds" ? "bg-primary/10 text-primary" : "text-muted hover:bg-gray-100"
              }`}
            >
              <PiggyBank className="w-5 h-5" />
              <span className="font-medium">My FDs</span>
            </button>
            <Link to="/kyc" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-gray-100">
              <FileText className="w-5 h-5" />
              <span className="font-medium">KYC Status</span>
            </Link>
            <hr className="my-4" />
            <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-gray-100">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Dashboard</h1>

              {/* KYC Status */}
              <div className="bg-white rounded-xl p-4 border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {kycStatus.status === "Approved" ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Clock className="w-6 h-6 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium text-secondary">KYC Status: {kycStatus.status}</p>
                    <p className="text-sm text-muted">PAN, Aadhaar, Bank - All Verified</p>
                  </div>
                </div>
                <Link to="/kyc">
                  <Button variant="outline" size="sm">View Details</Button>
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
                  <p className="text-sm text-muted mb-1">Bond Portfolio</p>
                  <p className="text-2xl font-bold text-primary flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {totalBondValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted mb-1">FD Portfolio</p>
                  <p className="text-2xl font-bold text-primary flex items-center">
                    <IndianRupee className="w-5 h-5" />
                    {totalFDValue.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/bonds" className="bg-gradient-hero rounded-xl p-6 text-white hover:opacity-90 transition-opacity">
                  <Banknote className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold mb-1">Invest in Bonds</h3>
                  <p className="text-sm text-white/80">Explore corporate & government bonds</p>
                  <ChevronRight className="w-5 h-5 mt-2" />
                </Link>
                <Link to="/fds" className="bg-[#057170] rounded-xl p-6 text-white hover:opacity-90 transition-opacity">
                  <PiggyBank className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold mb-1">Invest in FDs</h3>
                  <p className="text-sm text-white/80">Fixed deposits from top banks & NBFCs</p>
                  <ChevronRight className="w-5 h-5 mt-2" />
                </Link>
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
                        <p className="font-medium text-secondary">{bond.issuer} - Coupon</p>
                        <p className="text-sm text-muted">Due: {bond.nextCouponDate}</p>
                      </div>
                      <p className="font-bold text-primary">
                        ₹{Math.round(bond.investedAmount * bond.couponRate / 100 / 4).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "bonds" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary font-['Raleway']">My Bonds</h1>
                <Link to="/bonds">
                  <Button className="bg-primary">Explore Bonds</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {userPortfolio.bonds.map((bond) => (
                  <div key={bond.id} className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {bond.couponRate}% p.a.
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Units</p>
                        <p className="font-medium text-secondary">{bond.units}</p>
                      </div>
                      <div>
                        <p className="text-muted">Invested</p>
                        <p className="font-medium text-secondary">₹{bond.investedAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted">Current Value</p>
                        <p className="font-medium text-green-600">₹{bond.currentValue.toLocaleString()}</p>
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
          )}

          {activeTab === "fds" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-secondary font-['Raleway']">My Fixed Deposits</h1>
                <Link to="/fds">
                  <Button className="bg-primary">Explore FDs</Button>
                </Link>
              </div>
              <div className="space-y-4">
                {userPortfolio.fds.map((fd) => (
                  <div key={fd.id} className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {fd.interestRate}% p.a.
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted">Principal</p>
                        <p className="font-medium text-secondary">₹{fd.principal.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted">Maturity Value</p>
                        <p className="font-medium text-green-600">₹{fd.maturityValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted">Payout</p>
                        <p className="font-medium text-secondary">{fd.payoutType}</p>
                      </div>
                      <div>
                        <p className="text-muted">Maturity</p>
                        <p className="font-medium text-secondary">{fd.maturityDate}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <Button variant="outline" size="sm">View Statement</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
                        Premature Withdrawal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
