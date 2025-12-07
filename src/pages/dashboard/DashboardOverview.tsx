import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ExternalLink,
  Wallet,
  Target,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import CashFlowTimeline from "@/components/dashboard/CashFlowTimeline";

const DashboardOverview = () => {
  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalFDValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0) +
    userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);
  const totalReturns = (totalBondValue + totalFDValue) - totalInvested;
  const returnPercentage = ((totalReturns / totalInvested) * 100).toFixed(1);

  const quickActions = [
    { title: "IPO", description: "Apply for upcoming IPOs", icon: TrendingUp, href: "/dashboard/ipo", color: "from-blue-500 to-blue-600", external: false },
    { title: "Bonds", description: "Explore bond offerings", icon: Banknote, href: "/dashboard/bonds", color: "from-teal-500 to-teal-600", external: false },
    { title: "Fixed Deposits", description: "Book high-yield FDs", icon: PiggyBank, href: "/dashboard/fds", color: "from-green-500 to-green-600", external: false },
    { title: "NPS", description: "Manage pension savings", icon: Building2, href: "/dashboard/nps", color: "from-purple-500 to-purple-600", external: false },
    { title: "Screener", description: "Stock screener & tools", icon: BarChart3, href: "https://www.thefinease.com/", color: "from-orange-500 to-orange-600", external: true },
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
      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/20 p-6 md:p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground/70 text-sm">Welcome back</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-['Raleway']">Hello, John!</h1>
            <p className="text-white/70 mt-1">Here's your investment summary for today</p>
          </div>
          <div className="flex items-center gap-3">
            {kycStatus.status === "Approved" ? (
              <span className="flex items-center gap-2 text-sm bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/30">
                <CheckCircle className="w-4 h-4" />
                KYC Verified
              </span>
            ) : (
              <Link to="/dashboard/kyc">
                <Button size="sm" variant="secondary" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Complete KYC
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Total Portfolio</span>
              <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +{returnPercentage}%
              </span>
            </div>
            <p className="text-3xl font-bold flex items-center">
              <IndianRupee className="w-6 h-6" />
              {(totalBondValue + totalFDValue).toLocaleString()}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-white/50" />
              <span className="text-xs text-white/70">Updated just now</span>
            </div>
          </CardContent>
        </Card>

        <Card className="finease-card hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">Total Invested</span>
            </div>
            <p className="text-2xl font-bold text-secondary flex items-center">
              <IndianRupee className="w-5 h-5" />
              {totalInvested.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="finease-card hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-muted-foreground">Total Returns</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                Profit
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600 flex items-center">
              <IndianRupee className="w-5 h-5" />
              {totalReturns.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="finease-card hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-muted-foreground">Active Investments</span>
            </div>
            <p className="text-2xl font-bold text-secondary">
              {userPortfolio.bonds.length + userPortfolio.fds.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {userPortfolio.bonds.length} Bonds • {userPortfolio.fds.length} FDs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => 
            action.external ? (
              <a key={action.title} href={action.href} target="_blank" rel="noopener noreferrer">
                <Card className="finease-card hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">{action.title}</h3>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Link key={action.title} to={action.href}>
                <Card className="finease-card hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        
        {/* Upcoming Maturities */}
        <Card className="finease-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-bold text-secondary flex items-center gap-2 text-base">
              <div className="p-2 rounded-lg bg-orange-100">
                <Bell className="w-4 h-4 text-orange-600" />
              </div>
              Upcoming Maturities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMaturities.map((item, index) => {
                const daysUntil = Math.ceil((new Date(item.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysUntil <= 30;
                
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                      isUrgent ? 'bg-orange-50 border-orange-200' : 'bg-muted/30 border-transparent hover:border-primary/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.type === 'FD' ? 'bg-green-100' : 'bg-teal-100'
                        }`}>
                          {item.type === 'FD' ? (
                            <PiggyBank className="w-5 h-5 text-green-600" />
                          ) : (
                            <Banknote className="w-5 h-5 text-teal-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{item.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary">₹{item.value.toLocaleString()}</p>
                        <p className={`text-xs ${isUrgent ? 'text-orange-600 font-medium' : 'text-muted-foreground'}`}>
                          {daysUntil > 0 ? `${daysUntil} days` : 'Matured'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/dashboard/portfolio" className="flex items-center justify-center gap-1 text-sm text-primary font-medium pt-4 hover:underline">
              View All Maturities <ChevronRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Timeline */}
      <CashFlowTimeline />

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="finease-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-bold text-secondary flex items-center gap-2 text-base">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              Portfolio Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-transparent rounded-xl hover:from-teal-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Banknote className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">Bonds</p>
                    <p className="text-xs text-muted-foreground">{userPortfolio.bonds.length} holdings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">₹{totalBondValue.toLocaleString()}</p>
                  <p className="text-xs text-teal-600">
                    {((totalBondValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}% of portfolio
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-transparent rounded-xl hover:from-green-100 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PiggyBank className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">Fixed Deposits</p>
                    <p className="text-xs text-muted-foreground">{userPortfolio.fds.length} deposits</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">₹{totalFDValue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">
                    {((totalFDValue / (totalBondValue + totalFDValue)) * 100).toFixed(1)}% of portfolio
                  </p>
                </div>
              </div>

              <Link to="/dashboard/portfolio" className="flex items-center justify-center gap-1 text-sm text-primary font-medium pt-2 hover:underline">
                View Full Portfolio <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card className="finease-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-bold text-secondary flex items-center gap-2 text-base">
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              Upcoming Coupon Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userPortfolio.bonds.map((bond) => (
                <div key={bond.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-all duration-300">
                  <div>
                    <p className="font-medium text-secondary">{bond.issuer}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {bond.payoutFrequency} • {bond.nextCouponDate}
                    </p>
                  </div>
                  <p className="font-bold text-primary">
                    ₹{Math.round(bond.investedAmount * bond.couponRate / 100 / 4).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
