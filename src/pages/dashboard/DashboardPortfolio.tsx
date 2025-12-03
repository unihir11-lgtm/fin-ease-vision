import { userPortfolio } from "@/data/mockData";
import { 
  IndianRupee, TrendingUp, Banknote, PiggyBank, Download, Filter,
  ArrowUpRight, ArrowDownRight, Eye, ChevronRight, Calendar, Percent,
  Wallet, Target, Clock, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const totalReturns = totalPortfolio - totalInvested;
  const returnsPercentage = ((totalReturns / totalInvested) * 100).toFixed(2);

  const stats = [
    { 
      label: "Total Portfolio", 
      value: `₹${totalPortfolio.toLocaleString()}`, 
      change: `+${returnsPercentage}%`, 
      positive: true, 
      icon: Wallet,
      color: "bg-gradient-to-br from-primary to-primary/80",
      iconBg: "bg-white/20",
      isPrimary: true
    },
    { 
      label: "Total Invested", 
      value: `₹${totalInvested.toLocaleString()}`, 
      subtext: `${userPortfolio.bonds.length + userPortfolio.fds.length} investments`,
      icon: Target,
      color: "bg-white",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      label: "Total Returns", 
      value: `₹${totalReturns.toLocaleString()}`, 
      change: `+${returnsPercentage}%`, 
      positive: true, 
      icon: TrendingUp,
      color: "bg-white",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      label: "Active Holdings", 
      value: `${userPortfolio.bonds.length + userPortfolio.fds.length}`, 
      subtext: `${userPortfolio.bonds.length} Bonds • ${userPortfolio.fds.length} FDs`,
      icon: BarChart3,
      color: "bg-white",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    { 
      label: "Next Maturity", 
      value: "15 Jun 2025", 
      subtext: "HDFC Bank FD",
      icon: Clock,
      color: "bg-white",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    { 
      label: "Avg. Yield", 
      value: `${returnsPercentage}%`, 
      subtext: "Annualized",
      icon: Percent,
      color: "bg-white",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">My Portfolio</h1>
          <p className="text-gray-500">Complete overview of all your investments</p>
        </div>
        <div className="flex gap-3">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`border border-border/60 ${stat.isPrimary ? stat.color + " text-white" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${stat.isPrimary ? stat.iconBg : stat.iconBg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.isPrimary ? "text-white" : stat.iconColor}`} />
                </div>
                {stat.change && (
                  <span className={`text-xs flex items-center gap-0.5 ${stat.positive ? (stat.isPrimary ? "text-green-300 bg-white/20" : "text-green-600 bg-green-50") : "text-red-500 bg-red-50"} px-1.5 py-0.5 rounded-full`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mt-2">
                <p className={`text-xl font-bold ${stat.isPrimary ? "" : "text-secondary"}`}>{stat.value}</p>
                <p className={`text-xs ${stat.isPrimary ? "text-white/70" : "text-muted-foreground"}`}>
                  {stat.subtext || stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
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
        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 text-gray-600">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    Bonds
                  </span>
                  <span className="font-bold text-secondary">
                    {((totalBondValue / totalPortfolio) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${(totalBondValue / totalPortfolio) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">₹{totalBondValue.toLocaleString()}</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 text-gray-600">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Fixed Deposits
                  </span>
                  <span className="font-bold text-secondary">
                    {((totalFDValue / totalPortfolio) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${(totalFDValue / totalPortfolio) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">₹{totalFDValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Investment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Total Bonds</span>
                <span className="font-bold text-secondary">{userPortfolio.bonds.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Total FDs</span>
                <span className="font-bold text-secondary">{userPortfolio.fds.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Avg. Bond Returns</span>
                <span className="font-bold text-green-600">
                  +{(((totalBondValue - totalBondInvested) / totalBondInvested) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Avg. FD Returns</span>
                <span className="font-bold text-green-600">
                  +{(((totalFDValue - totalFDPrincipal) / totalFDPrincipal) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Holdings Table */}
      <Card className="border border-gray-200">
        <Tabs defaultValue="all" className="w-full">
          <CardHeader className="pb-0 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Holdings</CardTitle>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="bonds" className="text-sm">Bonds</TabsTrigger>
                <TabsTrigger value="fds" className="text-sm">FDs</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>

          <TabsContent value="all" className="m-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Investment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Invested</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead className="text-right">Returns</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPortfolio.bonds.map((bond) => (
                    <TableRow key={`bond-${bond.id}`} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary">{bond.issuer}</p>
                            <p className="text-xs text-gray-500">{bond.isin}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-teal-100 text-teal-700">Bond</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">₹{bond.investedAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">₹{bond.currentValue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-medium">
                          +₹{(bond.currentValue - bond.investedAmount).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {userPortfolio.fds.map((fd) => (
                    <TableRow key={`fd-${fd.id}`} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <PiggyBank className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary">{fd.bankName}</p>
                            <p className="text-xs text-gray-500">{fd.interestRate}% p.a.</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">FD</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">₹{fd.principal.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">₹{fd.maturityValue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-medium">
                          +₹{(fd.maturityValue - fd.principal).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>

          <TabsContent value="bonds" className="m-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Bond</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-center">Coupon</TableHead>
                    <TableHead className="text-right">Invested</TableHead>
                    <TableHead className="text-right">Current</TableHead>
                    <TableHead>Maturity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPortfolio.bonds.map((bond) => (
                    <TableRow key={`bond-${bond.id}`} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                            <Banknote className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary">{bond.issuer}</p>
                            <p className="text-xs text-gray-500">{bond.isin}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={bond.rating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                          {bond.rating}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">{bond.couponRate}%</TableCell>
                      <TableCell className="text-right font-medium">₹{bond.investedAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">₹{bond.currentValue.toLocaleString()}</TableCell>
                      <TableCell className="text-gray-500">{bond.maturityDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>

          <TabsContent value="fds" className="m-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Provider</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-center">Rate</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead className="text-right">Maturity Value</TableHead>
                    <TableHead>Maturity Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPortfolio.fds.map((fd) => (
                    <TableRow key={`fd-${fd.id}`} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <PiggyBank className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary">{fd.bankName}</p>
                            <p className="text-xs text-gray-500">{fd.fdType} • {fd.payoutType}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={fd.creditRating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                          {fd.creditRating}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-bold text-primary">{fd.interestRate}%</span>
                      </TableCell>
                      <TableCell className="text-right font-medium">₹{fd.principal.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-green-600">₹{fd.maturityValue.toLocaleString()}</TableCell>
                      <TableCell className="text-gray-500">{fd.maturityDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DashboardPortfolio;