import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userPortfolio, fixedDeposits } from "@/data/mockData";
import { 
  Plus, ExternalLink, TrendingUp, IndianRupee, AlertCircle, Clock, Calendar,
  Download, Bell, RefreshCw, Wallet, PiggyBank, FileText, ChevronRight,
  CheckCircle, XCircle, ArrowUpRight, BarChart3, History, Settings, Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import FDCalculator from "@/components/dashboard/FDCalculator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, AreaChart, Area, Legend 
} from "recharts";

const DashboardFDs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [selectedFD, setSelectedFD] = useState<any>(null);
  const [redemptionReason, setRedemptionReason] = useState("");

  const totalPrincipal = userPortfolio.fds.reduce((sum, f) => sum + f.principal, 0);
  const totalMaturityValue = userPortfolio.fds.reduce((sum, f) => sum + f.maturityValue, 0);
  const totalInterest = totalMaturityValue - totalPrincipal;

  // Mock data for charts
  const portfolioGrowth = [
    { month: "Jun", value: 450000 },
    { month: "Jul", value: 465000 },
    { month: "Aug", value: 520000 },
    { month: "Sep", value: 545000 },
    { month: "Oct", value: 580000 },
    { month: "Nov", value: 605000 },
  ];

  const allocationData = [
    { name: "Banks", value: 45, color: "#1dab91" },
    { name: "NBFCs", value: 35, color: "#23698e" },
    { name: "Small Finance Banks", value: 20, color: "#f59e0b" },
  ];

  const investmentHistory = [
    { id: "INV001", provider: "Bajaj Finance", amount: 200000, rate: "9.1%", date: "15 Nov 2024", tenure: "2 Years", status: "Active", maturity: "15 Nov 2026" },
    { id: "INV002", provider: "HDFC Bank", amount: 150000, rate: "7.25%", date: "01 Oct 2024", tenure: "1 Year", status: "Active", maturity: "01 Oct 2025" },
    { id: "INV003", provider: "Shriram Finance", amount: 100000, rate: "8.75%", date: "15 Aug 2024", tenure: "3 Years", status: "Active", maturity: "15 Aug 2027" },
    { id: "INV004", provider: "SBI", amount: 50000, rate: "6.5%", date: "01 Jun 2024", tenure: "1 Year", status: "Matured", maturity: "01 Jun 2025" },
  ];

  const notifications = [
    { id: 1, type: "maturity", title: "FD Maturing Soon", message: "Your FD with HDFC Bank (₹1,50,000) is maturing on 01 Oct 2025", date: "2 days ago", priority: "high" },
    { id: 2, type: "interest", title: "Interest Credited", message: "Quarterly interest of ₹4,500 has been credited from Bajaj Finance FD", date: "1 week ago", priority: "low" },
    { id: 3, type: "rate", title: "Rate Change Alert", message: "Shriram Finance has increased FD rates by 0.25%", date: "2 weeks ago", priority: "medium" },
  ];

  const calculateProgress = (startDate: string, maturityDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(maturityDate).getTime();
    const now = Date.now();
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  };

  const calculateDaysRemaining = (maturityDate: string) => {
    return Math.ceil((new Date(maturityDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  const handleRedemption = () => {
    toast({
      title: "Redemption Request Submitted",
      description: "Your withdrawal request has been submitted. You'll receive confirmation within 3-5 business days.",
    });
    setShowRedemptionDialog(false);
    setRedemptionReason("");
  };

  const handleDownloadStatement = (fdId: string) => {
    toast({
      title: "Statement Downloaded",
      description: "Your FD statement has been downloaded successfully.",
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
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">My Fixed Deposits</h1>
          <p className="text-muted-foreground mt-1">Track, manage, and grow your FD investments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Reports
          </Button>
          <Link to="/fds">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Book New FD
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
                <p className="text-2xl font-bold text-secondary">₹{totalPrincipal.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground mb-1">Maturity Value</p>
                <p className="text-2xl font-bold text-secondary">₹{totalMaturityValue.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground mb-1">Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{totalInterest.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{((totalInterest / totalPrincipal) * 100).toFixed(1)}%</p>
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
                <p className="text-xs text-muted-foreground mb-1">Active FDs</p>
                <p className="text-2xl font-bold text-secondary">{userPortfolio.fds.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Across {userPortfolio.fds.length} providers</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg. Interest</p>
                <p className="text-2xl font-bold text-primary">8.2%</p>
                <p className="text-xs text-muted-foreground mt-1">p.a. weighted</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-100">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full bg-muted/50 p-1 rounded-xl h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="holdings" className="text-xs sm:text-sm py-2.5">My FDs</TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm py-2.5">History</TabsTrigger>
          <TabsTrigger value="redemption" className="text-xs sm:text-sm py-2.5">Redemption</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2.5">Alerts</TabsTrigger>
          <TabsTrigger value="calculator" className="text-xs sm:text-sm py-2.5">Calculator</TabsTrigger>
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
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1dab91" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1dab91" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]} />
                      <Area type="monotone" dataKey="value" stroke="#1dab91" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Allocation Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-primary" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`]} />
                    </PieChart>
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
            <Link to="/fds">
              <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">Book New FD</p>
                    <p className="text-xs text-muted-foreground">Explore options</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer" onClick={() => setActiveTab("history")}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100">
                  <History className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">View History</p>
                  <p className="text-xs text-muted-foreground">Past investments</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer" onClick={() => setActiveTab("redemption")}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100">
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Redemption</p>
                  <p className="text-xs text-muted-foreground">Withdraw funds</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-100">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-secondary">Download</p>
                  <p className="text-xs text-muted-foreground">Reports & statements</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Maturities */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Maturities
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPortfolio.fds.slice(0, 3).map((fd) => {
                  const daysRemaining = calculateDaysRemaining(fd.maturityDate);
                  return (
                    <div key={fd.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <PiggyBank className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{fd.bankName}</p>
                          <p className="text-sm text-muted-foreground">₹{fd.principal.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={daysRemaining <= 30 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}>
                          {daysRemaining} days
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{fd.maturityDate}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My FDs Tab */}
        <TabsContent value="holdings" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-secondary">Your Fixed Deposits</h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All FDs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="matured">Matured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="divide-y divide-border">
                {userPortfolio.fds.map((fd) => {
                  const progress = calculateProgress(fd.startDate, fd.maturityDate);
                  const daysRemaining = calculateDaysRemaining(fd.maturityDate);
                  const isNearMaturity = daysRemaining <= 30;

                  return (
                    <div key={fd.id} className="p-5 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <PiggyBank className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                            <p className="text-sm text-muted-foreground">{fd.interestRate}% p.a. • {fd.payoutType}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {isNearMaturity ? (
                            <Badge className="bg-amber-100 text-amber-700">
                              <Clock className="w-3 h-3 mr-1" />{daysRemaining} days
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">Progress to Maturity</span>
                          <span className="font-medium">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Principal</p>
                          <p className="font-bold text-secondary">₹{fd.principal.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Maturity Value</p>
                          <p className="font-bold text-green-600">₹{fd.maturityValue.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Start Date</p>
                          <p className="font-medium text-secondary">{fd.startDate}</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">Maturity Date</p>
                          <p className="font-medium text-secondary">{fd.maturityDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-3 border-t border-border">
                        <Button variant="outline" size="sm" onClick={() => handleDownloadStatement(fd.id)}>
                          <FileText className="w-4 h-4 mr-1" />
                          Statement
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedFD(fd); setShowRedemptionDialog(true); }}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Redeem
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
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
                        <PiggyBank className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-secondary">{inv.provider}</p>
                          <Badge variant="outline" className="text-xs">{inv.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {inv.date} • {inv.tenure} • {inv.rate}
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
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-100">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">Premature Withdrawal Notice</h3>
                  <p className="text-sm text-muted-foreground">
                    Premature withdrawal may attract a penalty of 0.5% to 1% on the applicable interest rate as per the FD provider's terms. 
                    TDS will be deducted as applicable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Select FD for Redemption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userPortfolio.fds.map((fd) => {
                  const daysRemaining = calculateDaysRemaining(fd.maturityDate);
                  return (
                    <div key={fd.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <PiggyBank className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-secondary">{fd.bankName}</p>
                          <p className="text-sm text-muted-foreground">
                            Principal: ₹{fd.principal.toLocaleString()} • {fd.interestRate}% p.a.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Maturity in</p>
                          <p className="font-medium">{daysRemaining} days</p>
                        </div>
                        <Button variant="outline" onClick={() => { setSelectedFD(fd); setShowRedemptionDialog(true); }}>
                          Redeem
                        </Button>
                      </div>
                    </div>
                  );
                })}
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

          {/* Notification Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Maturity Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before FD maturity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Interest Credit Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify when interest is credited</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Rate Change Alerts</p>
                  <p className="text-sm text-muted-foreground">Updates on FD rate changes</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calculator Tab */}
        <TabsContent value="calculator" className="mt-6">
          <FDCalculator />
        </TabsContent>
      </Tabs>

      {/* Explore More FDs */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Explore More FD Options</CardTitle>
            <Link to="/fds">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fixedDeposits.slice(0, 3).map((fd) => (
              <Link key={fd.id} to={`/fds/${fd.id}`}>
                <div className="p-4 border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{fd.logo}</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">{fd.creditRating}</Badge>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">{fd.tenure}</span>
                    <span className="text-lg font-bold text-primary">{fd.interestRate}% p.a.</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Dialog */}
      <Dialog open={showRedemptionDialog} onOpenChange={setShowRedemptionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Redemption</DialogTitle>
          </DialogHeader>
          {selectedFD && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="font-semibold text-secondary">{selectedFD.bankName}</p>
                <p className="text-sm text-muted-foreground">Principal: ₹{selectedFD.principal.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Interest Rate: {selectedFD.interestRate}%</p>
              </div>
              <div className="space-y-2">
                <Label>Reason for Withdrawal</Label>
                <Select value={redemptionReason} onValueChange={setRedemptionReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency Funds</SelectItem>
                    <SelectItem value="better-rate">Better Investment Option</SelectItem>
                    <SelectItem value="personal">Personal Expenses</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Premature withdrawal may attract a penalty. Interest will be recalculated at a lower rate.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedemptionDialog(false)}>Cancel</Button>
            <Button onClick={handleRedemption}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardFDs;