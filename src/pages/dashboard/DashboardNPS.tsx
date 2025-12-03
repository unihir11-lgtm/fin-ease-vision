import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { 
  Building2, TrendingUp, IndianRupee, PieChart, ArrowUpRight, ArrowDownRight,
  User, Shield, Bell, CreditCard, Calendar, ChevronRight, FileText, Download,
  Edit, Eye, EyeOff, Lock, Smartphone, Mail, MapPin, Clock, CheckCircle,
  AlertCircle, Target, Wallet, BarChart3, RefreshCw, Receipt, Gift, Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, AreaChart, Area } from "recharts";

const DashboardNPS = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    fullName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    dob: "1985-06-15",
    gender: "Male",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    riskPreference: "Medium",
    pan: "ABCDE1234F",
    aadhaar: "XXXX-XXXX-4321",
  });

  // Contribution state
  const [contribution, setContribution] = useState({
    amount: "",
    type: "one-time",
    fundType: "auto",
    recurringAmount: "",
    recurringFrequency: "monthly",
    equityAllocation: "50",
    corporateBondAllocation: "30",
    govtBondAllocation: "15",
    alternativeAllocation: "5",
  });

  // Redemption state
  const [redemption, setRedemption] = useState({
    amount: "",
    reason: "",
    withdrawalType: "partial",
  });

  // NPS Data
  const npsData = {
    pran: "1100345678901",
    pranStatus: "Active",
    dateOfJoining: "15 Jan 2020",
    totalCorpus: 685000,
    totalContributed: 580000,
    returns: 105000,
    returnsPercentage: 18.1,
    annualizedReturn: 12.5,
    tier1Balance: 535000,
    tier2Balance: 150000,
    pensionFundManager: "HDFC Pension Fund",
    investmentChoice: "Active Choice",
    maturityDate: "15 Jun 2045",
    yearsToMaturity: 20,
    projectedCorpus: 4500000,
    assetAllocation: {
      equity: 50,
      corporate: 30,
      government: 15,
      alternative: 5,
    },
    fundPerformance: [
      { name: "Equity (E)", return: 14.2, benchmark: 12.5 },
      { name: "Corp Bond (C)", return: 9.8, benchmark: 8.5 },
      { name: "Govt Bond (G)", return: 7.5, benchmark: 6.8 },
      { name: "Alternative (A)", return: 11.2, benchmark: 10.0 },
    ],
    recentTransactions: [
      { date: "15 Nov 2025", type: "Contribution", amount: 5000, status: "Completed" },
      { date: "15 Oct 2025", type: "Contribution", amount: 5000, status: "Completed" },
      { date: "01 Oct 2025", type: "Fund Switch", amount: 0, status: "Completed" },
    ],
  };

  const contributionHistory = [
    { date: "15 Nov 2025", amount: 5000, type: "Monthly SIP", fund: "Auto Choice", status: "Completed", reference: "TXN001234" },
    { date: "15 Oct 2025", amount: 5000, type: "Monthly SIP", fund: "Auto Choice", status: "Completed", reference: "TXN001233" },
    { date: "15 Sep 2025", amount: 5000, type: "Monthly SIP", fund: "Auto Choice", status: "Completed", reference: "TXN001232" },
    { date: "01 Sep 2025", amount: 25000, type: "Lump Sum", fund: "Equity Heavy", status: "Completed", reference: "TXN001231" },
    { date: "15 Aug 2025", amount: 5000, type: "Monthly SIP", fund: "Auto Choice", status: "Completed", reference: "TXN001230" },
    { date: "15 Jul 2025", amount: 5000, type: "Monthly SIP", fund: "Auto Choice", status: "Pending", reference: "TXN001229" },
  ];

  const monthlyContributionTrend = [
    { month: "Jun", amount: 5000 },
    { month: "Jul", amount: 5000 },
    { month: "Aug", amount: 30000 },
    { month: "Sep", amount: 5000 },
    { month: "Oct", amount: 5000 },
    { month: "Nov", amount: 5000 },
  ];

  const performanceData = [
    { month: "Jun", value: 580000, benchmark: 570000 },
    { month: "Jul", value: 605000, benchmark: 590000 },
    { month: "Aug", value: 625000, benchmark: 610000 },
    { month: "Sep", value: 650000, benchmark: 635000 },
    { month: "Oct", value: 668000, benchmark: 655000 },
    { month: "Nov", value: 685000, benchmark: 670000 },
  ];

  const yearlyReturns = [
    { year: "2021", return: 15.2 },
    { year: "2022", return: 8.5 },
    { year: "2023", return: 18.7 },
    { year: "2024", return: 14.3 },
    { year: "2025", return: 12.5 },
  ];

  const notifications = [
    { id: 1, type: "contribution", title: "Upcoming Contribution", message: "Your monthly SIP of ₹5,000 is due on 15th December 2025", date: "2 days ago", priority: "high" },
    { id: 2, type: "performance", title: "Portfolio Alert", message: "Your NPS portfolio has gained 3.2% in the last month", date: "1 week ago", priority: "medium" },
    { id: 3, type: "regulatory", title: "Tax Benefit Reminder", message: "Maximize your tax benefit under Section 80CCD(1B) - ₹50,000 remaining", date: "2 weeks ago", priority: "low" },
    { id: 4, type: "maturity", title: "Milestone Achieved", message: "Congratulations! Your NPS corpus has crossed ₹6.5 Lakhs", date: "3 weeks ago", priority: "medium" },
  ];

  const pieData = [
    { name: "Equity", value: npsData.assetAllocation.equity, color: "#3B82F6" },
    { name: "Corporate Bonds", value: npsData.assetAllocation.corporate, color: "#22C55E" },
    { name: "Govt Bonds", value: npsData.assetAllocation.government, color: "#F59E0B" },
    { name: "Alternative", value: npsData.assetAllocation.alternative, color: "#8B5CF6" },
  ];

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleContribution = () => {
    const amount = contribution.type === "one-time" ? contribution.amount : contribution.recurringAmount;
    toast({
      title: "Contribution Initiated",
      description: `Your contribution of ₹${amount} has been initiated. Redirecting to payment gateway...`,
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  const handleRedemption = () => {
    toast({
      title: "Redemption Request Submitted",
      description: "Your withdrawal request has been submitted for review. You'll receive confirmation within 3-5 business days.",
    });
    setShowRedemptionDialog(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "contribution": return <CreditCard className="w-4 h-4" />;
      case "performance": return <TrendingUp className="w-4 h-4" />;
      case "regulatory": return <FileText className="w-4 h-4" />;
      case "maturity": return <Gift className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
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
      {/* Header with PRAN Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">National Pension System</h1>
          <p className="text-muted-foreground mt-1">Secure your retirement with Protean NPS</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            PRAN: {npsData.pran}
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Statement
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full bg-muted/50 p-1 rounded-xl h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="contributions" className="text-xs sm:text-sm py-2.5">Contributions</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm py-2.5">Performance</TabsTrigger>
          <TabsTrigger value="redemption" className="text-xs sm:text-sm py-2.5">Withdrawal</TabsTrigger>
          <TabsTrigger value="profile" className="text-xs sm:text-sm py-2.5">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm py-2.5">Alerts</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm py-2.5">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Corpus</p>
                    <p className="text-2xl font-bold text-secondary">₹{npsData.totalCorpus.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">+{npsData.returnsPercentage}%</span>
                    </div>
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
                    <p className="text-xs text-muted-foreground mb-1">Total Contributed</p>
                    <p className="text-2xl font-bold text-secondary">₹{npsData.totalContributed.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">Since {npsData.dateOfJoining}</p>
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
                    <p className="text-2xl font-bold text-green-600">₹{npsData.returns.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1">+{npsData.annualizedReturn}% CAGR</p>
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
                    <p className="text-xs text-muted-foreground mb-1">Projected at Maturity</p>
                    <p className="text-2xl font-bold text-secondary">₹{(npsData.projectedCorpus / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-muted-foreground mt-1">{npsData.yearsToMaturity} years to go</p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-100">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PRAN & Account Details */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">PRAN Number</span>
                  <span className="font-bold text-secondary font-mono">{npsData.pran}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-700">{npsData.pranStatus}</Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Tier 1 Balance</span>
                  <span className="font-bold text-secondary">₹{npsData.tier1Balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Tier 2 Balance</span>
                  <span className="font-bold text-secondary">₹{npsData.tier2Balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">PFM</span>
                  <span className="font-medium text-secondary text-sm">{npsData.pensionFundManager}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Investment Choice</span>
                  <Badge variant="outline">{npsData.investmentChoice}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Asset Allocation Pie Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Asset Allocation
                  </CardTitle>
                  <Button variant="outline" size="sm">Change Allocation</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`]} />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    {pieData.map((item) => (
                      <div key={item.name} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                        </div>
                        <p className="text-xl font-bold text-secondary">{item.value}%</p>
                        <p className="text-xs text-muted-foreground">₹{((npsData.totalCorpus * item.value) / 100).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => setActiveTab("contributions")} className="h-auto py-5 flex-col gap-2 bg-primary hover:bg-primary/90">
              <CreditCard className="w-6 h-6" />
              <span className="font-semibold">Make Contribution</span>
              <span className="text-xs opacity-80">Add to your corpus</span>
            </Button>
            <Button variant="outline" className="h-auto py-5 flex-col gap-2 border-2">
              <Download className="w-6 h-6 text-primary" />
              <span className="font-semibold text-secondary">Download Statement</span>
              <span className="text-xs text-muted-foreground">PDF / Excel format</span>
            </Button>
            <Button variant="outline" className="h-auto py-5 flex-col gap-2 border-2">
              <RefreshCw className="w-6 h-6 text-primary" />
              <span className="font-semibold text-secondary">Switch Fund Manager</span>
              <span className="text-xs text-muted-foreground">Change your PFM</span>
            </Button>
            <Button variant="outline" className="h-auto py-5 flex-col gap-2 border-2">
              <User className="w-6 h-6 text-primary" />
              <span className="font-semibold text-secondary">Update Nominee</span>
              <span className="text-xs text-muted-foreground">Add or modify</span>
            </Button>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {npsData.recentTransactions.map((txn, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${txn.type === 'Contribution' ? 'bg-green-100' : 'bg-blue-100'}`}>
                        {txn.type === 'Contribution' ? <IndianRupee className="w-4 h-4 text-green-600" /> : <RefreshCw className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-secondary text-sm">{txn.type}</p>
                        <p className="text-xs text-muted-foreground">{txn.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {txn.amount > 0 && <p className="font-bold text-secondary">₹{txn.amount.toLocaleString()}</p>}
                      <Badge className="bg-green-100 text-green-700 text-xs">{txn.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contributions Tab */}
        <TabsContent value="contributions" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Make Contribution Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Make Contribution
                </CardTitle>
                <CardDescription>Choose your contribution type and fund allocation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-sm font-medium">Contribution Type</Label>
                  <Select value={contribution.type} onValueChange={(v) => setContribution({...contribution, type: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time Contribution</SelectItem>
                      <SelectItem value="recurring">Recurring (SIP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {contribution.type === "one-time" ? (
                  <div>
                    <Label className="text-sm font-medium">Amount (₹)</Label>
                    <Input 
                      type="number" 
                      placeholder="Minimum ₹500" 
                      value={contribution.amount}
                      onChange={(e) => setContribution({...contribution, amount: e.target.value})}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Maximum tax benefit: ₹50,000 under 80CCD(1B)</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Monthly Amount (₹)</Label>
                      <Input 
                        type="number" 
                        placeholder="Minimum ₹500" 
                        value={contribution.recurringAmount}
                        onChange={(e) => setContribution({...contribution, recurringAmount: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Frequency</Label>
                      <Select value={contribution.recurringFrequency} onValueChange={(v) => setContribution({...contribution, recurringFrequency: v})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label className="text-sm font-medium">Fund Selection</Label>
                  <Select value={contribution.fundType} onValueChange={(v) => setContribution({...contribution, fundType: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Choice (Lifecycle Fund)</SelectItem>
                      <SelectItem value="active">Active Choice</SelectItem>
                      <SelectItem value="aggressive">Aggressive (LC75)</SelectItem>
                      <SelectItem value="moderate">Moderate (LC50)</SelectItem>
                      <SelectItem value="conservative">Conservative (LC25)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {contribution.fundType === "active" && (
                  <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <p className="text-sm font-medium">Custom Allocation (must total 100%)</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Equity (E) %</Label>
                        <Input type="number" value={contribution.equityAllocation} onChange={(e) => setContribution({...contribution, equityAllocation: e.target.value})} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Corporate Bond (C) %</Label>
                        <Input type="number" value={contribution.corporateBondAllocation} onChange={(e) => setContribution({...contribution, corporateBondAllocation: e.target.value})} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Govt Bond (G) %</Label>
                        <Input type="number" value={contribution.govtBondAllocation} onChange={(e) => setContribution({...contribution, govtBondAllocation: e.target.value})} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs">Alternative (A) %</Label>
                        <Input type="number" value={contribution.alternativeAllocation} onChange={(e) => setContribution({...contribution, alternativeAllocation: e.target.value})} className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                <Button onClick={handleContribution} className="w-full bg-primary" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>

            {/* Contribution Summary & Stats */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    Contribution Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground">Total Contributions</p>
                    <p className="text-3xl font-bold text-primary mt-1">₹{npsData.totalContributed.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-xl">
                      <p className="text-xs text-muted-foreground">This Financial Year</p>
                      <p className="text-xl font-bold text-secondary mt-1">₹55,000</p>
                      <Progress value={55} className="mt-2 h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">₹55K of ₹1.5L limit</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl">
                      <p className="text-xs text-muted-foreground">Last Financial Year</p>
                      <p className="text-xl font-bold text-secondary mt-1">₹72,000</p>
                      <p className="text-xs text-green-600 mt-1">+20% from previous</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Monthly Contributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyContributionTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                        <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/1000}K`} />
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contribution History Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Contribution History
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-4 font-medium text-secondary text-sm">Date</th>
                      <th className="text-left p-4 font-medium text-secondary text-sm">Reference</th>
                      <th className="text-left p-4 font-medium text-secondary text-sm">Type</th>
                      <th className="text-left p-4 font-medium text-secondary text-sm">Fund</th>
                      <th className="text-left p-4 font-medium text-secondary text-sm">Amount</th>
                      <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributionHistory.map((item, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-4 text-sm text-secondary">{item.date}</td>
                        <td className="p-4 text-sm text-muted-foreground font-mono">{item.reference}</td>
                        <td className="p-4 text-sm text-muted-foreground">{item.type}</td>
                        <td className="p-4 text-sm text-muted-foreground">{item.fund}</td>
                        <td className="p-4 text-sm font-bold text-secondary">₹{item.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <Badge className={item.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          {/* Returns Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Annualized Return</p>
                <p className="text-2xl font-bold text-green-600">+{npsData.annualizedReturn}%</p>
                <p className="text-xs text-muted-foreground mt-1">CAGR</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1">1 Year Return</p>
                <p className="text-2xl font-bold text-green-600">+14.2%</p>
                <p className="text-xs text-green-600 mt-1">vs 12.5% benchmark</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1">3 Year Return</p>
                <p className="text-2xl font-bold text-green-600">+42.8%</p>
                <p className="text-xs text-green-600 mt-1">vs 38.5% benchmark</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1">5 Year Return</p>
                <p className="text-2xl font-bold text-green-600">+78.5%</p>
                <p className="text-xs text-green-600 mt-1">vs 70.2% benchmark</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Since Inception</p>
                <p className="text-2xl font-bold text-green-600">+{npsData.returnsPercentage}%</p>
                <p className="text-xs text-muted-foreground mt-1">From {npsData.dateOfJoining}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Growth Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Portfolio Growth vs Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                      <Legend />
                      <Area type="monotone" dataKey="value" name="Your Portfolio" stroke="hsl(var(--primary))" fill="url(#colorValue)" strokeWidth={2} />
                      <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke="#9CA3AF" strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Fund Performance Comparison */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Fund Performance vs Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={npsData.fundPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `${v}%`} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#9CA3AF" width={100} />
                      <Tooltip formatter={(value: number) => [`${value}%`]} />
                      <Legend />
                      <Bar dataKey="return" name="Fund Return" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="benchmark" name="Benchmark" fill="#E5E7EB" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Year-wise Returns */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Year-wise Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Return']} />
                    <Bar dataKey="return" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Redemption/Withdrawal Tab */}
        <TabsContent value="redemption" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  Withdrawal & Redemption
                </CardTitle>
                <CardDescription>Request withdrawal from your matured NPS investments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Eligibility Info */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">Withdrawal Eligibility</p>
                      <p className="text-sm text-amber-700 mt-1">
                        NPS allows partial withdrawal (up to 25% of your contributions) after 3 years of subscription for specific purposes like education, medical treatment, or home purchase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground">Eligible for Withdrawal</p>
                    <p className="text-2xl font-bold text-secondary mt-1">₹1,45,000</p>
                    <p className="text-xs text-muted-foreground mt-1">25% of ₹5,80,000 contributions</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground">Withdrawals Made</p>
                    <p className="text-2xl font-bold text-secondary mt-1">₹0</p>
                    <p className="text-xs text-muted-foreground mt-1">0 of 3 allowed</p>
                  </div>
                </div>

                {/* Request Withdrawal Button */}
                <Dialog open={showRedemptionDialog} onOpenChange={setShowRedemptionDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary" size="lg">
                      <Receipt className="w-4 h-4 mr-2" />
                      Request Partial Withdrawal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request Withdrawal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>Withdrawal Type</Label>
                        <Select value={redemption.withdrawalType} onValueChange={(v) => setRedemption({...redemption, withdrawalType: v})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="partial">Partial Withdrawal (25% max)</SelectItem>
                            <SelectItem value="exit">Premature Exit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Amount (₹)</Label>
                        <Input 
                          type="number" 
                          placeholder="Maximum ₹1,45,000"
                          value={redemption.amount}
                          onChange={(e) => setRedemption({...redemption, amount: e.target.value})}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Reason for Withdrawal</Label>
                        <Select value={redemption.reason} onValueChange={(v) => setRedemption({...redemption, reason: v})}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Children's Education</SelectItem>
                            <SelectItem value="medical">Medical Treatment</SelectItem>
                            <SelectItem value="home">Home Purchase/Construction</SelectItem>
                            <SelectItem value="marriage">Children's Marriage</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note: You'll need to submit supporting documents for the selected reason.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRedemptionDialog(false)}>Cancel</Button>
                      <Button onClick={handleRedemption} className="bg-primary">Submit Request</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Withdrawal History */}
                <div className="space-y-3">
                  <h4 className="font-medium text-secondary">Previous Withdrawal Requests</h4>
                  <div className="p-8 text-center bg-muted/20 rounded-xl">
                    <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No withdrawal requests yet</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Withdrawal Rules Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Withdrawal Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-secondary text-sm">Partial Withdrawal</p>
                  <p className="text-xs text-muted-foreground mt-1">Up to 25% of own contributions after 3 years, maximum 3 times during tenure.</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-secondary text-sm">Exit Before 60</p>
                  <p className="text-xs text-muted-foreground mt-1">80% must be used to buy annuity, 20% can be withdrawn tax-free.</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-secondary text-sm">Exit After 60</p>
                  <p className="text-xs text-muted-foreground mt-1">60% can be withdrawn tax-free, 40% must be used to buy annuity.</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-medium text-secondary text-sm">Superannuation</p>
                  <p className="text-xs text-muted-foreground mt-1">Option to continue till age 75 or exit anytime after 60.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Management
              </CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Email Address</Label>
                  <Input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <Input 
                    type="date"
                    value={profile.dob}
                    onChange={(e) => setProfile({...profile, dob: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Gender</Label>
                  <Select value={profile.gender} onValueChange={(v) => setProfile({...profile, gender: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Risk Preference</Label>
                  <Select value={profile.riskPreference} onValueChange={(v) => setProfile({...profile, riskPreference: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low Risk</SelectItem>
                      <SelectItem value="Medium">Medium Risk</SelectItem>
                      <SelectItem value="High">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">PAN Number</Label>
                  <Input 
                    value={profile.pan}
                    disabled
                    className="mt-2 bg-muted/50"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Aadhaar Number</Label>
                  <Input 
                    value={profile.aadhaar}
                    disabled
                    className="mt-2 bg-muted/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Residential Address</Label>
                  <Input 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="mt-2"
                  />
                </div>
              </div>
              <Button onClick={handleProfileUpdate} className="mt-6 bg-primary">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notifications & Alerts
                  </CardTitle>
                  <CardDescription>Stay updated with your NPS account activities</CardDescription>
                </div>
                <Button variant="outline" size="sm">Mark all as read</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(notif.priority)}`} />
                    <div className={`p-2 rounded-lg ${
                      notif.type === 'contribution' ? 'bg-blue-100' :
                      notif.type === 'performance' ? 'bg-green-100' :
                      notif.type === 'regulatory' ? 'bg-amber-100' : 'bg-purple-100'
                    }`}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-secondary">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Contribution Reminders</p>
                  <p className="text-xs text-muted-foreground">Get notified before SIP due dates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Portfolio Alerts</p>
                  <p className="text-xs text-muted-foreground">Updates on portfolio performance</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Regulatory Updates</p>
                  <p className="text-xs text-muted-foreground">Changes in NPS rules and guidelines</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-secondary">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Current Password</Label>
                  <div className="relative mt-2">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-2" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-2" />
                </div>
                <Button onClick={handlePasswordChange} className="w-full bg-primary">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* 2FA Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">SMS Authentication</p>
                      <p className="text-xs text-muted-foreground">Receive codes via SMS</p>
                    </div>
                  </div>
                  <Switch checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">Email Authentication</p>
                      <p className="text-xs text-muted-foreground">Receive codes via Email</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Security Tip:</strong> Enable 2FA to add an extra layer of security to your NPS account.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Login Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Login Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm font-medium text-secondary">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">Mumbai, India • Current session</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-secondary">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">Mumbai, India</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardNPS;
