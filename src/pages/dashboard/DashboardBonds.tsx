import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userPortfolio, bonds } from "@/data/mockData";
import { 
  Plus, ExternalLink, TrendingUp, IndianRupee, Calendar, Shield, 
  Download, Bell, Wallet, Landmark, FileText, ChevronRight,
  CheckCircle, ArrowUpRight, BarChart3, History, Eye, RefreshCw,
  Clock, AlertCircle, Settings, PieChart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BondComparisonTool from "@/components/dashboard/BondComparisonTool";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, AreaChart, Area, BarChart, Bar, Legend 
} from "recharts";

const DashboardBonds = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [selectedBond, setSelectedBond] = useState<any>(null);
  const [redemptionReason, setRedemptionReason] = useState("");

  const totalBondValue = userPortfolio.bonds.reduce((sum, b) => sum + b.currentValue, 0);
  const totalInvested = userPortfolio.bonds.reduce((sum, b) => sum + b.investedAmount, 0);
  const totalReturns = totalBondValue - totalInvested;

  // Calculate next coupon income
  const nextCouponIncome = userPortfolio.bonds.reduce((sum, b) => {
    const quarterlyRate = b.couponRate / 100 / 4;
    return sum + (b.investedAmount * quarterlyRate);
  }, 0);

  // Mock data for charts
  const portfolioGrowth = [
    { month: "Jun", value: 380000 },
    { month: "Jul", value: 395000 },
    { month: "Aug", value: 410000 },
    { month: "Sep", value: 425000 },
    { month: "Oct", value: 445000 },
    { month: "Nov", value: 462000 },
  ];

  const allocationData = [
    { name: "Corporate Bonds", value: 45, color: "#1dab91" },
    { name: "PSU Bonds", value: 30, color: "#23698e" },
    { name: "Government Bonds", value: 25, color: "#f59e0b" },
  ];

  const couponHistory = [
    { id: "CP001", bond: "REC Limited", amount: 7850, date: "15 Nov 2024", status: "Credited" },
    { id: "CP002", bond: "MoneyBoxx March'27", amount: 2125, date: "20 Oct 2024", status: "Credited" },
    { id: "CP003", bond: "IRFC", amount: 3825, date: "15 Sep 2024", status: "Credited" },
    { id: "CP004", bond: "NHAI", amount: 3675, date: "31 Mar 2024", status: "Credited" },
  ];

  const investmentHistory = [
    { id: "INV001", bond: "REC Limited", amount: 100000, units: 10, date: "15 Jun 2024", status: "Active", yield: "7.85%" },
    { id: "INV002", bond: "MoneyBoxx March'27", amount: 50000, units: 50, date: "20 Mar 2024", status: "Active", yield: "12.5%" },
    { id: "INV003", bond: "NHAI", amount: 75000, units: 75, date: "31 Jan 2024", status: "Active", yield: "7.35%" },
    { id: "INV004", bond: "IRFC", amount: 100000, units: 100, date: "15 Sep 2023", status: "Matured", yield: "7.65%" },
  ];

  const notifications = [
    { id: 1, type: "coupon", title: "Coupon Payment Due", message: "Interest payment of ₹7,850 from REC Limited due on 15 Dec 2024", date: "2 days ago", priority: "high" },
    { id: 2, type: "maturity", title: "Bond Maturing Soon", message: "IRFC bond (₹1,00,000) maturing on 15 Sep 2028", date: "1 week ago", priority: "medium" },
    { id: 3, type: "rate", title: "New Bond Available", message: "New AAA-rated PSU bond with 8.2% yield available for investment", date: "2 weeks ago", priority: "low" },
  ];

  const calculateDaysToMaturity = (maturityDate: string) => {
    return Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  const handleRedemption = () => {
    toast({
      title: "Redemption Request Submitted",
      description: "Your bond sale request has been submitted. Settlement within T+2 days.",
    });
    setShowRedemptionDialog(false);
    setRedemptionReason("");
  };

  const handleDownloadStatement = (bondId: string) => {
    toast({
      title: "Statement Downloaded",
      description: "Your bond statement has been downloaded successfully.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">My Bonds Portfolio</h1>
          <p className="text-muted-foreground mt-1">Track, manage, and grow your bond investments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Reports
          </Button>
          <Link to="/bonds">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Explore Bonds
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
                <p className="text-2xl font-bold text-secondary">₹{totalInvested.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                <p className="text-2xl font-bold text-secondary">₹{totalBondValue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <IndianRupee className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
                <p className="text-2xl font-bold text-green-600">₹{totalReturns.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{((totalReturns / totalInvested) * 100).toFixed(1)}%</p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Active Bonds</p>
                <p className="text-2xl font-bold text-secondary">{userPortfolio.bonds.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Across issuers</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <Landmark className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Next Quarter Income</p>
                <p className="text-2xl font-bold text-amber-600">₹{Math.round(nextCouponIncome).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Est. coupon</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-100">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full bg-muted/50 p-1 rounded-xl h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="holdings" className="text-xs sm:text-sm py-2.5">Holdings</TabsTrigger>
          <TabsTrigger value="coupon" className="text-xs sm:text-sm py-2.5">Coupons</TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm py-2.5">History</TabsTrigger>
          <TabsTrigger value="redemption" className="text-xs sm:text-sm py-2.5">Redemption</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2.5">Alerts</TabsTrigger>
          <TabsTrigger value="compare" className="text-xs sm:text-sm py-2.5">Compare</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Growth Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Portfolio Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioGrowth}>
                      <defs>
                        <linearGradient id="colorBondValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#23698e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#23698e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]} />
                      <Area type="monotone" dataKey="value" stroke="#23698e" fillOpacity={1} fill="url(#colorBondValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Allocation Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Bond Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`]} />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/bonds">
              <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">Buy Bonds</p>
                    <p className="text-xs text-muted-foreground">Explore options</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer" onClick={() => setActiveTab("coupon")}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Coupon History</p>
                  <p className="text-xs text-muted-foreground">Interest received</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer" onClick={() => setActiveTab("redemption")}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100">
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Sell Bonds</p>
                  <p className="text-xs text-muted-foreground">Redeem holdings</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Download</p>
                  <p className="text-xs text-muted-foreground">Reports & statements</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Coupons */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Coupon Payments
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-primary" onClick={() => setActiveTab("coupon")}>
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPortfolio.bonds.slice(0, 3).map((bond) => (
                  <div key={bond.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Landmark className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{bond.issuer}</p>
                        <p className="text-sm text-muted-foreground">{bond.couponRate}% • {bond.payoutFrequency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-secondary">{bond.nextCouponDate}</p>
                      <p className="text-sm text-green-600">≈ ₹{Math.round(bond.investedAmount * bond.couponRate / 100 / 4).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Holdings Tab */}
        <TabsContent value="holdings" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-secondary">Your Bond Holdings</h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bonds</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="psu">PSU</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="divide-y divide-border">
                {userPortfolio.bonds.map((bond) => (
                  <div key={bond.id} className="p-5 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                          <p className="text-sm text-muted-foreground">{bond.isin}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={bond.rating === 'AAA' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                          {bond.rating}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary">Active</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Units</p>
                        <p className="font-bold text-secondary">{bond.units}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Invested</p>
                        <p className="font-bold text-secondary">₹{bond.investedAmount.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Current Value</p>
                        <p className="font-bold text-green-600">₹{bond.currentValue.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Next Coupon</p>
                        <p className="font-medium text-secondary">{bond.nextCouponDate}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Maturity</p>
                        <p className="font-medium text-secondary">{bond.maturityDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Coupon: <span className="font-medium text-secondary">{bond.couponRate}%</span></span>
                        <span className="text-muted-foreground">Payout: <span className="font-medium text-secondary">{bond.payoutFrequency}</span></span>
                        <span className="text-green-600 font-medium">
                          +{(((bond.currentValue - bond.investedAmount) / bond.investedAmount) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadStatement(bond.id)}>
                          <FileText className="w-4 h-4 mr-1" />
                          Statement
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedBond(bond); setShowRedemptionDialog(true); }}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Sell
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coupon History Tab */}
        <TabsContent value="coupon" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Interest Payout History</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="w-4 h-4" /> Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {couponHistory.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <IndianRupee className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-secondary">{coupon.bond}</p>
                          <Badge variant="outline" className="text-xs">{coupon.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{coupon.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₹{coupon.amount.toLocaleString()}</p>
                      <Badge className="bg-green-100 text-green-700">{coupon.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payout Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Payout Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Auto-reinvest Coupons</p>
                  <p className="text-sm text-muted-foreground">Automatically reinvest interest payments</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Credit to Bank Account</p>
                  <p className="text-sm text-muted-foreground">HDFC Bank ****4521</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Investment History</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="matured">Matured</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="w-4 h-4" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {investmentHistory.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-secondary">{inv.bond}</p>
                          <Badge variant="outline" className="text-xs">{inv.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {inv.date} • {inv.units} units • Yield: {inv.yield}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary">₹{inv.amount.toLocaleString()}</p>
                      <Badge className={inv.status === "Active" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}>
                        {inv.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Redemption Tab */}
        <TabsContent value="redemption" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Bond Redemption Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Listed bonds can be sold on the exchange at market price. Settlement follows T+2 cycle. 
                    Capital gains tax may apply based on holding period.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select Bond to Sell</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPortfolio.bonds.map((bond) => (
                  <div key={bond.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-secondary">{bond.issuer}</p>
                        <p className="text-sm text-muted-foreground">
                          {bond.units} units • Current: ₹{bond.currentValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Gain/Loss</p>
                        <p className="font-medium text-green-600">+₹{(bond.currentValue - bond.investedAmount).toLocaleString()}</p>
                      </div>
                      <Button variant="outline" onClick={() => { setSelectedBond(bond); setShowRedemptionDialog(true); }}>
                        Sell
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alerts & Notifications
                </CardTitle>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(notif.priority)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-secondary">{notif.title}</p>
                        <span className="text-xs text-muted-foreground">{notif.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compare Tab */}
        <TabsContent value="compare" className="mt-6">
          <BondComparisonTool />
        </TabsContent>
      </Tabs>

      {/* Explore More Bonds */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Explore More Bonds</CardTitle>
            <Link to="/bonds">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bonds.slice(0, 3).map((bond) => (
              <Link key={bond.id} to={`/bonds/${bond.id}`}>
                <div className="p-4 border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={bond.rating === "AAA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>
                      {bond.rating}
                    </Badge>
                    <Badge variant="outline">{bond.bondType}</Badge>
                  </div>
                  <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{bond.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">{bond.tenure}</span>
                    <span className="text-lg font-bold text-primary">{bond.yield}% yield</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sell Bond Dialog */}
      <Dialog open={showRedemptionDialog} onOpenChange={setShowRedemptionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Sell Bond</DialogTitle>
          </DialogHeader>
          {selectedBond && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="font-semibold text-secondary">{selectedBond.issuer}</p>
                <p className="text-sm text-muted-foreground">Units: {selectedBond.units}</p>
                <p className="text-sm text-muted-foreground">Current Value: ₹{selectedBond.currentValue.toLocaleString()}</p>
                <p className="text-sm text-green-600">Estimated Gain: ₹{(selectedBond.currentValue - selectedBond.investedAmount).toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Reason for Selling</Label>
                <Select value={redemptionReason} onValueChange={setRedemptionReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profit">Profit Booking</SelectItem>
                    <SelectItem value="rebalance">Portfolio Rebalancing</SelectItem>
                    <SelectItem value="liquidity">Need Liquidity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Sale will be executed at market price. Settlement in T+2 days. Capital gains tax may apply.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedemptionDialog(false)}>Cancel</Button>
            <Button onClick={handleRedemption}>Confirm Sale</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardBonds;