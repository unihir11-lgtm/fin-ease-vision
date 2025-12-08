import { useState } from "react";
import { Link } from "react-router-dom";
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
  AlertCircle, Target, Wallet, BarChart3, RefreshCw, Receipt, Gift, Settings,
  Image, Printer, FileDown, Info, DollarSign, TrendingDown, Percent, LineChart as LineChartIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, AreaChart, Area } from "recharts";

const DashboardNPS = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [showPRANCardDialog, setShowPRANCardDialog] = useState(false);
  const [showNAVDialog, setShowNAVDialog] = useState(false);
  const [showStatementDialog, setShowStatementDialog] = useState(false);
  
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

  // Investment Details with NAV, PFM, Units
  const investmentDetails = [
    { 
      fundType: "Equity (E)", 
      pfm: "HDFC Pension Fund",
      units: 5862.45,
      nav: 58.42,
      currentValue: 342500,
      investedValue: 292500,
      returns: 50000,
      returnsPercent: 17.1,
      lastUpdated: "08 Dec 2025"
    },
    { 
      fundType: "Corporate Bond (C)", 
      pfm: "HDFC Pension Fund",
      units: 4875.32,
      nav: 42.18,
      currentValue: 205625,
      investedValue: 174000,
      returns: 31625,
      returnsPercent: 18.2,
      lastUpdated: "08 Dec 2025"
    },
    { 
      fundType: "Government Bond (G)", 
      pfm: "HDFC Pension Fund",
      units: 2885.21,
      nav: 35.67,
      currentValue: 102938,
      investedValue: 87000,
      returns: 15938,
      returnsPercent: 18.3,
      lastUpdated: "08 Dec 2025"
    },
    { 
      fundType: "Alternative Assets (A)", 
      pfm: "HDFC Pension Fund",
      units: 1176.51,
      nav: 28.95,
      currentValue: 34062,
      investedValue: 26500,
      returns: 7562,
      returnsPercent: 28.5,
      lastUpdated: "08 Dec 2025"
    },
  ];

  // Transaction History
  const transactionHistory = [
    { 
      id: "TXN789456", 
      date: "15 Nov 2025", 
      type: "Contribution", 
      fund: "Auto Choice",
      amount: 5000, 
      units: 85.62,
      nav: 58.40,
      status: "Completed",
      tier: "Tier 1"
    },
    { 
      id: "TXN789455", 
      date: "15 Oct 2025", 
      type: "Contribution", 
      fund: "Auto Choice",
      amount: 5000, 
      units: 86.21,
      nav: 58.02,
      status: "Completed",
      tier: "Tier 1"
    },
    { 
      id: "TXN789454", 
      date: "01 Oct 2025", 
      type: "Fund Switch", 
      fund: "E to C",
      amount: 25000, 
      units: 432.18,
      nav: 57.85,
      status: "Completed",
      tier: "Tier 1"
    },
    { 
      id: "TXN789453", 
      date: "15 Sep 2025", 
      type: "Contribution", 
      fund: "Auto Choice",
      amount: 5000, 
      units: 87.45,
      nav: 57.18,
      status: "Completed",
      tier: "Tier 1"
    },
    { 
      id: "TXN789452", 
      date: "01 Sep 2025", 
      type: "Lump Sum", 
      fund: "Equity Heavy",
      amount: 25000, 
      units: 442.31,
      nav: 56.52,
      status: "Completed",
      tier: "Tier 1"
    },
    { 
      id: "TXN789451", 
      date: "15 Aug 2025", 
      type: "Contribution", 
      fund: "Auto Choice",
      amount: 5000, 
      units: 89.12,
      nav: 56.10,
      status: "Completed",
      tier: "Tier 2"
    },
  ];

  // NAV Details Data
  const navDetails = [
    { fund: "Equity (E)", nav: 58.42, change: 0.85, changePercent: 1.47, date: "08 Dec 2025" },
    { fund: "Corporate Bond (C)", nav: 42.18, change: 0.12, changePercent: 0.29, date: "08 Dec 2025" },
    { fund: "Government Bond (G)", nav: 35.67, change: 0.08, changePercent: 0.22, date: "08 Dec 2025" },
    { fund: "Alternative (A)", nav: 28.95, change: -0.15, changePercent: -0.52, date: "08 Dec 2025" },
  ];

  // Contribution Details with OPO Trail and Service Tax
  const contributionDetails = {
    totalInvestment: 580000,
    opoTrailCommission: 1160,
    serviceTax: 209,
    netContribution: 578631,
    lastUpdated: "08 Dec 2025",
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

  const handleDownloadPRANCard = (format: string) => {
    toast({
      title: `PRAN Card ${format}`,
      description: format === 'print' 
        ? "Opening print dialog for ePRAN card..." 
        : `Downloading PRAN card as ${format.toUpperCase()}...`,
    });
    setShowPRANCardDialog(false);
  };

  const handleDownloadStatement = (format: string) => {
    toast({
      title: "Statement Download",
      description: `Downloading your NPS statement in ${format.toUpperCase()} format...`,
    });
    setShowStatementDialog(false);
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
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            PRAN: {npsData.pran}
          </Badge>
          <Dialog open={showPRANCardDialog} onOpenChange={setShowPRANCardDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CreditCard className="w-4 h-4" />
                PRAN Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Download PRAN Card
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">PRAN Number</span>
                    <span className="font-bold font-mono text-lg text-primary">{npsData.pran}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="font-medium text-secondary">{profile.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="bg-green-100 text-green-700">{npsData.pranStatus}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    onClick={() => handleDownloadPRANCard('image')} 
                    variant="outline" 
                    className="flex-col h-auto py-4 gap-2"
                  >
                    <Image className="w-5 h-5 text-primary" />
                    <span className="text-xs">Image</span>
                  </Button>
                  <Button 
                    onClick={() => handleDownloadPRANCard('pdf')} 
                    variant="outline" 
                    className="flex-col h-auto py-4 gap-2"
                  >
                    <FileDown className="w-5 h-5 text-primary" />
                    <span className="text-xs">PDF</span>
                  </Button>
                  <Button 
                    onClick={() => handleDownloadPRANCard('print')} 
                    variant="outline" 
                    className="flex-col h-auto py-4 gap-2"
                  >
                    <Printer className="w-5 h-5 text-primary" />
                    <span className="text-xs">Print ePRAN</span>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showStatementDialog} onOpenChange={setShowStatementDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Statement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Download Statement
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Period</Label>
                  <Select defaultValue="current-fy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-fy">Current Financial Year (2025-26)</SelectItem>
                      <SelectItem value="last-fy">Last Financial Year (2024-25)</SelectItem>
                      <SelectItem value="last-3-years">Last 3 Years</SelectItem>
                      <SelectItem value="all">Since Inception</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => handleDownloadStatement('pdf')} className="gap-2">
                    <FileDown className="w-4 h-4" />
                    PDF Format
                  </Button>
                  <Button onClick={() => handleDownloadStatement('excel')} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Excel Format
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showNAVDialog} onOpenChange={setShowNAVDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <LineChartIcon className="w-4 h-4" />
                NAV Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-primary" />
                  NAV Details - {npsData.pensionFundManager}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Net Asset Value as on {navDetails[0].date}
                </div>
                <div className="space-y-3">
                  {navDetails.map((item, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-medium text-secondary">{item.fund}</p>
                        <p className="text-xs text-muted-foreground">Updated: {item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-secondary">₹{item.nav.toFixed(2)}</p>
                        <div className={`flex items-center gap-1 text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>NAV is updated at the end of each business day. Your unit balance remains constant; only NAV changes.</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* New User CTA Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">Don't have an NPS account yet?</h3>
                <p className="text-sm text-muted-foreground">Register for PRAN and start building your retirement corpus today. Get tax benefits up to ₹2 Lakhs!</p>
              </div>
            </div>
            <Link to="/nps/register">
              <Button className="gap-2 whitespace-nowrap">
                Register Now <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-muted/50 p-1 rounded-xl h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="contributions" className="text-xs sm:text-sm py-2.5">Contributions</TabsTrigger>
          <TabsTrigger value="nav-performance" className="text-xs sm:text-sm py-2.5">NAV & Performance</TabsTrigger>
          <TabsTrigger value="statements" className="text-xs sm:text-sm py-2.5">Statements</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm py-2.5">Analytics</TabsTrigger>
          <TabsTrigger value="redemption" className="text-xs sm:text-sm py-2.5">Withdrawal</TabsTrigger>
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

          {/* My Investments - Detailed View */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  My Investments
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <CardDescription>Detailed fund-wise investment breakdown with NAV and units</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fund Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">PFM</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Units</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV (₹)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Invested</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Current Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentDetails.map((investment, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${
                              investment.fundType.includes('Equity') ? 'bg-blue-500' :
                              investment.fundType.includes('Corporate') ? 'bg-green-500' :
                              investment.fundType.includes('Government') ? 'bg-amber-500' : 'bg-purple-500'
                            }`} />
                            <span className="font-medium text-secondary">{investment.fundType}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{investment.pfm}</td>
                        <td className="py-4 px-4 text-right font-mono text-sm">{investment.units.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold">₹{investment.nav.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4 text-right text-sm">₹{investment.investedValue.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-semibold text-secondary">₹{investment.currentValue.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-green-600">+₹{investment.returns.toLocaleString()}</span>
                            <span className="text-xs text-green-600">+{investment.returnsPercent}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50">
                      <td className="py-4 px-4 font-semibold text-secondary" colSpan={2}>Total</td>
                      <td className="py-4 px-4 text-right font-mono font-semibold">
                        {investmentDetails.reduce((sum, i) => sum + i.units, 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                      <td className="py-4 px-4 text-right font-semibold">
                        ₹{investmentDetails.reduce((sum, i) => sum + i.investedValue, 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-secondary">
                        ₹{investmentDetails.reduce((sum, i) => sum + i.currentValue, 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-green-600">
                          +₹{investmentDetails.reduce((sum, i) => sum + i.returns, 0).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <Info className="w-3 h-3" />
                NAV updated as on {investmentDetails[0].lastUpdated}
              </p>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  Transaction History
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="contribution">Contributions</SelectItem>
                      <SelectItem value="switch">Fund Switch</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fund</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Units</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Tier</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((txn, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm text-primary">{txn.id}</td>
                        <td className="py-3 px-4 text-sm">{txn.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`text-xs ${
                            txn.type === 'Contribution' ? 'bg-green-50 text-green-700 border-green-200' :
                            txn.type === 'Fund Switch' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            txn.type === 'Lump Sum' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {txn.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{txn.fund}</td>
                        <td className="py-3 px-4 text-right font-semibold">₹{txn.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-mono text-sm">{txn.units.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-sm">₹{txn.nav.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="secondary" className="text-xs">{txn.tier}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-100 text-green-700 text-xs">{txn.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">Showing 6 of 48 transactions</p>
                <Button variant="outline" size="sm" className="gap-2">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

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
                    <p className="text-sm text-muted-foreground">Total Investment Amount</p>
                    <p className="text-3xl font-bold text-primary mt-1">₹{contributionDetails.totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-muted-foreground">OPO Trail Commission</span>
                      </div>
                      <span className="font-semibold text-amber-600">- ₹{contributionDetails.opoTrailCommission.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-muted-foreground">Service Tax</span>
                      </div>
                      <span className="font-semibold text-red-500">- ₹{contributionDetails.serviceTax.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Net Contribution</span>
                      </div>
                      <span className="font-bold text-green-700">₹{contributionDetails.netContribution.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Last updated: {contributionDetails.lastUpdated}</p>
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

        {/* NAV & Performance Tab */}
        <TabsContent value="nav-performance" className="space-y-6 mt-6">
          {/* NAV Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {navDetails.map((nav, index) => (
              <Card key={index} className={`${nav.change >= 0 ? 'border-green-200' : 'border-red-200'}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      nav.fund.includes('Equity') ? 'bg-blue-500' :
                      nav.fund.includes('Corporate') ? 'bg-green-500' :
                      nav.fund.includes('Government') ? 'bg-amber-500' : 'bg-purple-500'
                    }`} />
                    <span className="text-sm font-medium text-secondary">{nav.fund}</span>
                  </div>
                  <p className="text-2xl font-bold text-secondary">₹{nav.nav.toFixed(2)}</p>
                  <div className={`flex items-center gap-1 mt-2 ${nav.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {nav.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="text-sm font-medium">{nav.change >= 0 ? '+' : ''}{nav.change.toFixed(2)} ({nav.changePercent.toFixed(2)}%)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">As on {nav.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed NAV Table */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-primary" />
                  NAV Details - {npsData.pensionFundManager}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="1m">
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1w">1 Week</SelectItem>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fund Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">PFM</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Current NAV</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">1 Day</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">1 Week</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">1 Month</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">1 Year</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Since Inception</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="font-medium text-secondary">Equity (E)</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme E - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹58.42</td>
                      <td className="py-4 px-4 text-right text-green-600">+1.47%</td>
                      <td className="py-4 px-4 text-right text-green-600">+2.85%</td>
                      <td className="py-4 px-4 text-right text-green-600">+4.52%</td>
                      <td className="py-4 px-4 text-right text-green-600">+14.2%</td>
                      <td className="py-4 px-4 text-right text-green-600">+45.8%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="font-medium text-secondary">Corporate Bond (C)</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme C - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹42.18</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.29%</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.85%</td>
                      <td className="py-4 px-4 text-right text-green-600">+1.42%</td>
                      <td className="py-4 px-4 text-right text-green-600">+9.8%</td>
                      <td className="py-4 px-4 text-right text-green-600">+32.5%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="font-medium text-secondary">Government Bond (G)</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme G - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹35.67</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.22%</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.65%</td>
                      <td className="py-4 px-4 text-right text-green-600">+1.12%</td>
                      <td className="py-4 px-4 text-right text-green-600">+7.5%</td>
                      <td className="py-4 px-4 text-right text-green-600">+28.2%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <span className="font-medium text-secondary">Alternative Assets (A)</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme A - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹28.95</td>
                      <td className="py-4 px-4 text-right text-red-600">-0.52%</td>
                      <td className="py-4 px-4 text-right text-green-600">+1.25%</td>
                      <td className="py-4 px-4 text-right text-green-600">+2.85%</td>
                      <td className="py-4 px-4 text-right text-green-600">+11.2%</td>
                      <td className="py-4 px-4 text-right text-green-600">+38.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">NAV is updated at the end of each business day. PFM: Pension Fund Manager manages your investments across different asset classes.</p>
              </div>
            </CardContent>
          </Card>

          {/* NAV Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-primary" />
                  NAV Trend - All Funds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: "Jul", equity: 54.2, corporate: 40.5, govt: 34.2, alt: 27.1 },
                      { date: "Aug", equity: 55.1, corporate: 41.0, govt: 34.5, alt: 27.8 },
                      { date: "Sep", equity: 56.3, corporate: 41.3, govt: 34.9, alt: 28.2 },
                      { date: "Oct", equity: 57.2, corporate: 41.8, govt: 35.2, alt: 28.5 },
                      { date: "Nov", equity: 57.8, corporate: 42.0, govt: 35.5, alt: 29.1 },
                      { date: "Dec", equity: 58.4, corporate: 42.2, govt: 35.7, alt: 29.0 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v}`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toFixed(2)}`]} />
                      <Legend />
                      <Line type="monotone" dataKey="equity" name="Equity (E)" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="corporate" name="Corporate (C)" stroke="#22C55E" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="govt" name="Govt Bond (G)" stroke="#F59E0B" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="alt" name="Alternative (A)" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Unit Holdings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Unit Holdings Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentDetails.map((inv, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            inv.fundType.includes('Equity') ? 'bg-blue-500' :
                            inv.fundType.includes('Corporate') ? 'bg-green-500' :
                            inv.fundType.includes('Government') ? 'bg-amber-500' : 'bg-purple-500'
                          }`} />
                          <span className="font-medium text-secondary">{inv.fundType}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{inv.pfm}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Units</p>
                          <p className="font-bold font-mono">{inv.units.toFixed(4)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">NAV</p>
                          <p className="font-bold">₹{inv.nav.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Value</p>
                          <p className="font-bold text-primary">₹{inv.currentValue.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-secondary">Total Units</span>
                      <span className="font-bold font-mono">{investmentDetails.reduce((sum, i) => sum + i.units, 0).toFixed(4)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-secondary">Total Value</span>
                      <span className="font-bold text-primary text-lg">₹{investmentDetails.reduce((sum, i) => sum + i.currentValue, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Statements Tab */}
        <TabsContent value="statements" className="space-y-6 mt-6">
          {/* Statement Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Transactions</p>
                    <p className="text-2xl font-bold text-secondary">48</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-green-100">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Invested</p>
                    <p className="text-2xl font-bold text-secondary">₹5.8L</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Units</p>
                    <p className="text-2xl font-bold text-secondary">14,799</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-100">
                    <Building2 className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">PFM</p>
                    <p className="text-sm font-bold text-secondary">HDFC Pension</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Value</p>
                    <p className="text-2xl font-bold text-primary">₹6.85L</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Statement List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" />
                    Transaction Statement
                  </CardTitle>
                  <CardDescription>Complete list of all NPS transactions with fund details</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-36 h-8 text-xs bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="contribution">Contributions</SelectItem>
                      <SelectItem value="switch">Fund Switch</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-funds">
                    <SelectTrigger className="w-32 h-8 text-xs bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-lg z-50">
                      <SelectItem value="all-funds">All Funds</SelectItem>
                      <SelectItem value="equity">Equity (E)</SelectItem>
                      <SelectItem value="corporate">Corporate (C)</SelectItem>
                      <SelectItem value="govt">Govt Bond (G)</SelectItem>
                      <SelectItem value="alt">Alternative (A)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 h-8">
                    <Download className="w-3 h-3" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Txn ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fund / PFM</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Units</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Tier</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "TXN789456", date: "15 Nov 2025", type: "Contribution", fund: "Equity (E)", pfm: "HDFC Pension", amount: 5000, nav: 58.40, units: 85.62, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789455", date: "15 Nov 2025", type: "Contribution", fund: "Corporate (C)", pfm: "HDFC Pension", amount: 3000, nav: 42.15, units: 71.17, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789454", date: "15 Nov 2025", type: "Contribution", fund: "Govt Bond (G)", pfm: "HDFC Pension", amount: 1500, nav: 35.62, units: 42.11, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789453", date: "15 Nov 2025", type: "Contribution", fund: "Alternative (A)", pfm: "HDFC Pension", amount: 500, nav: 29.05, units: 17.21, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789452", date: "15 Oct 2025", type: "Contribution", fund: "Equity (E)", pfm: "HDFC Pension", amount: 5000, nav: 58.02, units: 86.18, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789451", date: "15 Oct 2025", type: "Contribution", fund: "Corporate (C)", pfm: "HDFC Pension", amount: 3000, nav: 41.95, units: 71.51, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789450", date: "01 Oct 2025", type: "Fund Switch", fund: "E → C", pfm: "HDFC Pension", amount: 25000, nav: 57.85, units: 432.15, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789449", date: "15 Sep 2025", type: "Contribution", fund: "Equity (E)", pfm: "HDFC Pension", amount: 5000, nav: 57.18, units: 87.45, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789448", date: "01 Sep 2025", type: "Lump Sum", fund: "Equity (E)", pfm: "HDFC Pension", amount: 25000, nav: 56.52, units: 442.31, tier: "Tier 1", status: "Completed" },
                      { id: "TXN789447", date: "15 Aug 2025", type: "Contribution", fund: "Equity (E)", pfm: "HDFC Pension", amount: 5000, nav: 56.10, units: 89.12, tier: "Tier 2", status: "Completed" },
                    ].map((txn, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-mono text-sm text-primary">{txn.id}</td>
                        <td className="py-3 px-4 text-sm">{txn.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`text-xs ${
                            txn.type === 'Contribution' ? 'bg-green-50 text-green-700 border-green-200' :
                            txn.type === 'Fund Switch' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            txn.type === 'Lump Sum' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {txn.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-secondary">{txn.fund}</p>
                            <p className="text-xs text-muted-foreground">{txn.pfm}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">₹{txn.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-sm">₹{txn.nav.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-mono text-sm">{txn.units.toFixed(4)}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="secondary" className="text-xs">{txn.tier}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-100 text-green-700 text-xs">{txn.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Showing 10 of 48 transactions</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund-wise Transaction Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Fund-wise Transaction Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { fund: "Equity (E)", pfm: "HDFC Pension Fund", scheme: "Scheme E - Tier 1", transactions: 28, invested: 292500, units: 5862.45, nav: 58.42, value: 342500, color: "blue" },
                  { fund: "Corporate Bond (C)", pfm: "HDFC Pension Fund", scheme: "Scheme C - Tier 1", transactions: 12, invested: 174000, units: 4875.32, nav: 42.18, value: 205625, color: "green" },
                  { fund: "Govt Bond (G)", pfm: "HDFC Pension Fund", scheme: "Scheme G - Tier 1", transactions: 6, invested: 87000, units: 2885.21, nav: 35.67, value: 102938, color: "amber" },
                  { fund: "Alternative (A)", pfm: "HDFC Pension Fund", scheme: "Scheme A - Tier 1", transactions: 2, invested: 26500, units: 1176.51, nav: 28.95, value: 34062, color: "purple" },
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-xl border-2 border-${item.color}-200 bg-${item.color}-50/30`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} style={{ backgroundColor: item.color === 'blue' ? '#3B82F6' : item.color === 'green' ? '#22C55E' : item.color === 'amber' ? '#F59E0B' : '#8B5CF6' }} />
                      <span className="font-semibold text-secondary">{item.fund}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PFM</span>
                        <span className="font-medium text-secondary">{item.pfm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Scheme</span>
                        <span className="text-xs text-muted-foreground">{item.scheme}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transactions</span>
                        <span className="font-medium">{item.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Units</span>
                        <span className="font-mono font-medium">{item.units.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NAV</span>
                        <span className="font-medium">₹{item.nav.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">Invested</span>
                        <span className="font-medium">₹{item.invested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Value</span>
                        <span className="font-bold text-primary">₹{item.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
      </Tabs>
    </div>
  );
};

export default DashboardNPS;
