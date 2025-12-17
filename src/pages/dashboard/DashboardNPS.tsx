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
    amount: "500",
    type: "one-time",
    tier: "tier1",
    fundType: "auto",
    recurringAmount: "",
    recurringFrequency: "monthly",
    equityAllocation: "50",
    corporateBondAllocation: "30",
    govtBondAllocation: "15",
    alternativeAllocation: "5",
  });

  // Latest PFRDA/Protean charge calculation (effective 31.01.2025)
  // Source: https://npstrust.org.in/charges-under-nps
  const calculateCharges = (amount: number) => {
    // POP Charges: 0.20% for eNPS, min ₹15, max ₹10,000
    const popChargesRaw = amount * 0.002; // 0.20%
    const popCharges = amount > 0 ? Math.max(15, Math.min(popChargesRaw, 10000)) : 0;
    
    // CRA Charges (Protean PCRA): ₹3.75 per transaction
    const craCharges = amount > 0 ? 3.75 : 0;
    
    // PFM Charges (Investment Management Fee): 0.09% for AUM up to 10,000 Cr
    const pfmCharges = Math.round(amount * 0.0009 * 100) / 100; // 0.09%
    
    // NPS Trust Charges: 0.003% p.a. (nominal, applied per transaction)
    const npsTrustCharges = Math.round(amount * 0.00003 * 100) / 100;
    
    // GST: 18% on all charges
    const subtotalCharges = popCharges + craCharges + pfmCharges + npsTrustCharges;
    const gstOnCharges = Math.round(subtotalCharges * 0.18 * 100) / 100;
    
    const totalCharges = Math.round((subtotalCharges + gstOnCharges) * 100) / 100;
    const totalPayable = amount + totalCharges;
    
    return {
      netInvestment: amount,
      popCharges: Math.round(popCharges * 100) / 100,
      craCharges,
      pfmCharges,
      npsTrustCharges,
      gstOnCharges,
      totalCharges,
      totalPayable
    };
  };

  const currentAmount = contribution.type === "one-time" 
    ? parseFloat(contribution.amount) || 0 
    : parseFloat(contribution.recurringAmount) || 0;
  
  const charges = calculateCharges(currentAmount);

  // Redemption state
  // FY and Quarter selection for API data
  const [selectedFY, setSelectedFY] = useState("2025-26");
  const [selectedQuarter, setSelectedQuarter] = useState("Q3");

  const [redemption, setRedemption] = useState({
    amount: "",
    reason: "",
    withdrawalType: "partial",
  });

  // Statement of Holding Data (from API)
  const statementOfHolding = {
    pran: "110185661660",
    userName: "SHRI THVH NHCVVWXZVC NVCENDCVWXZVC",
    tier1: {
      schemes: [
        {
          schemeId: "SM008001",
          schemeName: "NPS TRUST- A/C HDFC PENSION FUND MANAGEMENT LIMITED SCHEME E - TIER I",
          units: 767.6179,
          freeUnits: 767.6179,
          blckdUnits: 0.0000,
          nav: 48.8292,
          navDate: "04/08/2025",
          value: 37482.16,
          schPercentage: 0.0
        },
        {
          schemeId: "SM008002",
          schemeName: "NPS TRUST- A/C HDFC PENSION FUND MANAGEMENT LIMITED SCHEME C - TIER I",
          units: 417.7656,
          freeUnits: 417.7656,
          blckdUnits: 0.0000,
          nav: 28.5734,
          navDate: "04/08/2025",
          value: 11936.98,
          schPercentage: 0.0
        },
        {
          schemeId: "SM008003",
          schemeName: "NPS TRUST- A/C HDFC PENSION FUND MANAGEMENT LIMITED SCHEME G - TIER I",
          units: 906.8500,
          freeUnits: 906.8500,
          blckdUnits: 0.0000,
          nav: 28.2188,
          navDate: "04/08/2025",
          value: 25590.21,
          schPercentage: 0.0
        }
      ],
      amtInTransit: 0.00,
      total: 75009.35,
      message: "Tier Status-Active"
    },
    tier2: {
      schemes: [],
      amtInTransit: 0,
      total: 0,
      message: "No Schemes"
    },
    totalValue: 75009.35,
    asOnDate: "10/12/2025"
  };

  // XIRR Performance Data (from API)
  const xirrData = {
    subscriberName: "BHVCVT DHDVDHVC WVVV",
    pran: "110112862456",
    xirr: "-3.49",
    notionalGainLoss: "-86.10",
    currentHoldingValuation: "413.90",
    totalWithdrawal: "0.00",
    totalNumberContribution: "1",
    totalContributionAmount: "500.00",
    FYxirr: "0.00"
  };

  // Download Statement Dialog state
  const [showDownloadStatementDialog, setShowDownloadStatementDialog] = useState(false);
  const [selectedFYRange, setSelectedFYRange] = useState("2024-25");

  // Helper function to extract scheme type from scheme name
  const getSchemeType = (schemeName: string) => {
    if (schemeName.includes("SCHEME E")) return { type: "Equity (E)", color: "bg-blue-500" };
    if (schemeName.includes("SCHEME C")) return { type: "Corporate Bond (C)", color: "bg-green-500" };
    if (schemeName.includes("SCHEME G")) return { type: "Government Bond (G)", color: "bg-amber-500" };
    if (schemeName.includes("SCHEME A")) return { type: "Alternative Assets (A)", color: "bg-purple-500" };
    return { type: "Other", color: "bg-gray-500" };
  };

  // Helper function to extract PFM name from scheme name
  const getPFMName = (schemeName: string) => {
    const match = schemeName.match(/A\/C\s+(.+?)\s+SCHEME/);
    return match ? match[1] : "HDFC Pension Fund";
  };

  // NPS Data derived from Statement of Holding
  const npsData = {
    pran: statementOfHolding.pran,
    userName: statementOfHolding.userName,
    pranStatus: statementOfHolding.tier1.message.includes("Active") ? "Active" : "Inactive",
    dateOfJoining: "15 Jan 2020",
    totalCorpus: statementOfHolding.totalValue,
    totalContributed: 65000, // This would come from contribution history
    returns: statementOfHolding.totalValue - 65000,
    returnsPercentage: ((statementOfHolding.totalValue - 65000) / 65000 * 100).toFixed(1),
    annualizedReturn: 12.5,
    tier1Balance: statementOfHolding.tier1.total,
    tier2Balance: statementOfHolding.tier2.total,
    tier1AmtInTransit: statementOfHolding.tier1.amtInTransit,
    tier2AmtInTransit: statementOfHolding.tier2.amtInTransit,
    pensionFundManager: getPFMName(statementOfHolding.tier1.schemes[0]?.schemeName || ""),
    investmentChoice: "Active Choice",
    maturityDate: "15 Jun 2045",
    yearsToMaturity: 20,
    projectedCorpus: 4500000,
    asOnDate: statementOfHolding.asOnDate,
    assetAllocation: {
      equity: Math.round((statementOfHolding.tier1.schemes.find(s => s.schemeName.includes("SCHEME E"))?.value || 0) / statementOfHolding.totalValue * 100),
      corporate: Math.round((statementOfHolding.tier1.schemes.find(s => s.schemeName.includes("SCHEME C"))?.value || 0) / statementOfHolding.totalValue * 100),
      government: Math.round((statementOfHolding.tier1.schemes.find(s => s.schemeName.includes("SCHEME G"))?.value || 0) / statementOfHolding.totalValue * 100),
      alternative: 0,
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

  // Investment Details from Statement of Holding schemes
  const investmentDetails = statementOfHolding.tier1.schemes.map((scheme) => {
    const schemeInfo = getSchemeType(scheme.schemeName);
    return {
      schemeId: scheme.schemeId,
      fundType: schemeInfo.type,
      schemeName: scheme.schemeName,
      pfm: getPFMName(scheme.schemeName),
      units: scheme.units,
      freeUnits: scheme.freeUnits,
      blockedUnits: scheme.blckdUnits,
      nav: scheme.nav,
      navDate: scheme.navDate,
      currentValue: scheme.value,
      color: schemeInfo.color,
    };
  });

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

  // Contribution Details with POP Charges, Service Tax, and Payment Gateway Charges
  const contributionDetails = {
    totalInvestment: 580000,
    popCharges: 580,
    serviceTax: 104,
    paymentGatewayCharges: 116,
    totalCharges: 800,
    netContribution: 579200,
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
    const amount = parseFloat(contribution.type === "one-time" ? contribution.amount : contribution.recurringAmount) || 0;
    const minAmount = contribution.tier === "tier1" ? 500 : 250;
    
    if (amount < minAmount) {
      toast({
        title: "Invalid Amount",
        description: `Minimum contribution for ${contribution.tier === "tier1" ? "Tier 1" : "Tier 2"} is ₹${minAmount}`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Contribution Initiated",
      description: `Your ${contribution.tier === "tier1" ? "Tier 1" : "Tier 2"} contribution of ₹${amount.toLocaleString('en-IN')} has been initiated. Net investment: ₹${charges.netInvestment.toLocaleString('en-IN')}. Redirecting to payment gateway...`,
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
          {/* FY & Quarter Selection */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary">Select Period</p>
                    <p className="text-xs text-muted-foreground">Choose financial year and quarter to view data</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground whitespace-nowrap">Financial Year:</Label>
                    <Select value={selectedFY} onValueChange={setSelectedFY}>
                      <SelectTrigger className="w-[130px] h-9 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        <SelectItem value="2025-26">FY 2025-26</SelectItem>
                        <SelectItem value="2024-25">FY 2024-25</SelectItem>
                        <SelectItem value="2023-24">FY 2023-24</SelectItem>
                        <SelectItem value="2022-23">FY 2022-23</SelectItem>
                        <SelectItem value="2021-22">FY 2021-22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">Quarter:</Label>
                    <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                      <SelectTrigger className="w-[100px] h-9 bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        <SelectItem value="Q1">Q1 (Apr-Jun)</SelectItem>
                        <SelectItem value="Q2">Q2 (Jul-Sep)</SelectItem>
                        <SelectItem value="Q3">Q3 (Oct-Dec)</SelectItem>
                        <SelectItem value="Q4">Q4 (Jan-Mar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 h-9"
                    onClick={() => {
                      toast({
                        title: "Data Refreshed",
                        description: `Fetching data for FY ${selectedFY} - ${selectedQuarter}`,
                      });
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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

          {/* XIRR Performance Summary - Moved here after Summary Cards */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    Investment Performance (XIRR)
                  </CardTitle>
                  <CardDescription className="mt-1">Returns calculated using Extended Internal Rate of Return (XIRR) method</CardDescription>
                </div>
                <Dialog open={showDownloadStatementDialog} onOpenChange={setShowDownloadStatementDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download Statement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Download Statement of Holding
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Select Financial Year</Label>
                        <Select value={selectedFYRange} onValueChange={setSelectedFYRange}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select Financial Year" />
                          </SelectTrigger>
                          <SelectContent className="bg-background">
                            <SelectItem value="2025-26">FY 2025-26 (Current)</SelectItem>
                            <SelectItem value="2024-25">FY 2024-25</SelectItem>
                            <SelectItem value="2023-24">FY 2023-24</SelectItem>
                            <SelectItem value="2022-23">FY 2022-23</SelectItem>
                            <SelectItem value="2021-22">FY 2021-22</SelectItem>
                            <SelectItem value="all">All Years (Since Inception)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Statement will include:</p>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Scheme-wise holdings & NAV</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Contribution history</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>XIRR & Performance metrics</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Transaction details</span>
                          </li>
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => {
                            toast({
                              title: "Statement Download",
                              description: `Downloading statement for FY ${selectedFYRange} in PDF format...`,
                            });
                            setShowDownloadStatementDialog(false);
                          }} 
                          className="gap-2"
                        >
                          <FileDown className="w-4 h-4" />
                          PDF Format
                        </Button>
                        <Button 
                          onClick={() => {
                            toast({
                              title: "Statement Download",
                              description: `Downloading statement for FY ${selectedFYRange} in Excel format...`,
                            });
                            setShowDownloadStatementDialog(false);
                          }} 
                          variant="outline" 
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Excel Format
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Overall XIRR */}
                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Overall XIRR</p>
                  </div>
                  <p className={`text-2xl font-bold ${parseFloat(xirrData.xirr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(xirrData.xirr) >= 0 ? '+' : ''}{xirrData.xirr}%
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {parseFloat(xirrData.xirr) >= 0 ? (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                    )}
                    <span className="text-xs text-muted-foreground">Since inception</span>
                  </div>
                </div>

                {/* FY XIRR */}
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <p className="text-xs text-muted-foreground">FY XIRR</p>
                  </div>
                  <p className={`text-2xl font-bold ${parseFloat(xirrData.FYxirr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(xirrData.FYxirr) >= 0 ? '+' : ''}{xirrData.FYxirr}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Current FY</p>
                </div>

                {/* Current Holding Value */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-muted-foreground">Current Value</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">₹{parseFloat(xirrData.currentHoldingValuation).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Holding valuation</p>
                </div>

                {/* Total Contribution */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-4 h-4 text-secondary" />
                    <p className="text-xs text-muted-foreground">Total Contributed</p>
                  </div>
                  <p className="text-2xl font-bold text-secondary">₹{parseFloat(xirrData.totalContributionAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">{xirrData.totalNumberContribution} contribution(s)</p>
                </div>

                {/* Notional Gain/Loss */}
                <div className={`p-4 rounded-xl ${parseFloat(xirrData.notionalGainLoss) >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {parseFloat(xirrData.notionalGainLoss) >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <p className="text-xs text-muted-foreground">Notional Gain/Loss</p>
                  </div>
                  <p className={`text-2xl font-bold ${parseFloat(xirrData.notionalGainLoss) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(xirrData.notionalGainLoss) >= 0 ? '+' : ''}₹{Math.abs(parseFloat(xirrData.notionalGainLoss)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Unrealized</p>
                </div>

                {/* Total Withdrawal */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <p className="text-xs text-muted-foreground">Total Withdrawal</p>
                  </div>
                  <p className="text-2xl font-bold text-secondary">₹{parseFloat(xirrData.totalWithdrawal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground mt-1">Redeemed amount</p>
                </div>
              </div>

              {/* Information Note */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  XIRR (Extended Internal Rate of Return) is the annualized return considering the timing and amount of each contribution. 
                  Notional gain/loss represents unrealized profit/loss on your current holdings.
                </span>
              </div>
            </CardContent>
          </Card>

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

          {/* Statement of Holding - Tier 1 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Statement of Holding - Tier 1
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700">{statementOfHolding.tier1.message}</Badge>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
              <CardDescription>Scheme-wise investment breakdown with NAV and units as on {npsData.asOnDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Scheme</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Units</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Free Units</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Blocked</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV (₹)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV Date</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentDetails.map((investment, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${investment.color}`} />
                            <div>
                              <span className="font-medium text-secondary">{investment.fundType}</span>
                              <p className="text-xs text-muted-foreground mt-0.5 max-w-xs truncate" title={investment.schemeName}>
                                {investment.pfm}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-sm">{investment.units.toFixed(4)}</td>
                        <td className="py-4 px-4 text-right font-mono text-sm text-green-600">{investment.freeUnits.toFixed(4)}</td>
                        <td className="py-4 px-4 text-right font-mono text-sm">
                          {investment.blockedUnits > 0 ? (
                            <span className="text-red-600">{investment.blockedUnits.toFixed(4)}</span>
                          ) : (
                            <span className="text-muted-foreground">0.0000</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="font-semibold">₹{investment.nav.toFixed(4)}</span>
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-muted-foreground">{investment.navDate}</td>
                        <td className="py-4 px-4 text-right font-semibold text-secondary">₹{investment.currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50">
                      <td className="py-4 px-4 font-semibold text-secondary">Total Tier 1</td>
                      <td className="py-4 px-4 text-right font-mono font-semibold">
                        {investmentDetails.reduce((sum, i) => sum + i.units, 0).toFixed(4)}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold text-green-600">
                        {investmentDetails.reduce((sum, i) => sum + i.freeUnits, 0).toFixed(4)}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-semibold">
                        {investmentDetails.reduce((sum, i) => sum + i.blockedUnits, 0).toFixed(4)}
                      </td>
                      <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">-</td>
                      <td className="py-4 px-4 text-right font-bold text-secondary">
                        ₹{statementOfHolding.tier1.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                    {statementOfHolding.tier1.amtInTransit > 0 && (
                      <tr className="bg-amber-50/50">
                        <td className="py-3 px-4 text-sm text-amber-700" colSpan={6}>Amount in Transit</td>
                        <td className="py-3 px-4 text-right font-semibold text-amber-700">
                          ₹{statementOfHolding.tier1.amtInTransit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
              
              {/* Tier 2 Status */}
              {statementOfHolding.tier2.schemes.length === 0 && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-secondary">Tier 2 Account</p>
                      <p className="text-sm text-muted-foreground">{statementOfHolding.tier2.message}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Activate Tier 2</Button>
                </div>
              )}
              
              <div className="mt-4 p-4 bg-primary/5 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-secondary">₹{statementOfHolding.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  As on {npsData.asOnDate}
                </p>
              </div>
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
          {/* PFRDA & Protean Guidelines Banner */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">PFRDA & Protean NPS Contribution Guidelines</h3>
                  <p className="text-sm text-blue-700">
                    Your contributions are governed by PFRDA (Pension Fund Regulatory and Development Authority) regulations. 
                    Please review the guidelines below before making a contribution.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Minimum Contribution */}
            <Card className="border-green-200">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-green-100 rounded">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-green-800">Minimum Per Contribution</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tier 1</span>
                    <span className="font-bold text-green-700">₹500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tier 2</span>
                    <span className="font-bold text-green-700">₹250</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Annual Minimum */}
            <Card className="border-amber-200">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-amber-100 rounded">
                    <Calendar className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-semibold text-amber-800">Annual Minimum</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tier 1</span>
                    <span className="font-bold text-amber-700">₹1,000/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tier 2</span>
                    <span className="font-bold text-amber-700">No minimum</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Benefits */}
            <Card className="border-purple-200">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-purple-100 rounded">
                    <Percent className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-purple-800">Tax Benefits</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">80CCD(1)</span>
                    <span className="font-bold text-purple-700">₹1.5L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">80CCD(1B)</span>
                    <span className="font-bold text-purple-700">₹50,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equity Limit */}
            <Card className="border-teal-200">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-teal-100 rounded">
                    <PieChart className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-sm font-semibold text-teal-800">Equity (E) Limit</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Age ≤ 50</span>
                    <span className="font-bold text-teal-700">Max 75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Age &gt; 50</span>
                    <span className="font-bold text-teal-700">Reduces 2.5%/yr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Make Contribution Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Make Contribution
                </CardTitle>
                <CardDescription>Choose your contribution type and fund allocation as per PFRDA guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Tier Selection */}
                <div>
                  <Label className="text-sm font-medium">Select Tier</Label>
                  <Select value={contribution.tier} onValueChange={(v) => setContribution({...contribution, tier: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier1">
                        <div className="flex items-center gap-2">
                          <span>Tier 1 (Pension Account)</span>
                          <Badge variant="outline" className="text-xs">Tax Benefits</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="tier2">
                        <div className="flex items-center gap-2">
                          <span>Tier 2 (Investment Account)</span>
                          <Badge variant="outline" className="text-xs">Flexible</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {contribution.tier === "tier1" 
                      ? "Tier 1 is mandatory for retirement with tax benefits. Min ₹500/contribution, ₹1,000/year."
                      : "Tier 2 is optional investment account. Min ₹250/contribution, no annual minimum."
                    }
                  </p>
                </div>

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
                      placeholder={`Minimum ₹${contribution.tier === "tier1" ? "500" : "250"}`}
                      value={contribution.amount}
                      onChange={(e) => setContribution({...contribution, amount: e.target.value})}
                      className="mt-2 text-lg font-semibold"
                      min={contribution.tier === "tier1" ? 500 : 250}
                    />
                    <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div className="text-xs text-amber-700 space-y-1">
                          <p className="font-medium">PFRDA Contribution Rules:</p>
                          <ul className="list-disc list-inside space-y-0.5">
                            <li>Minimum ₹{contribution.tier === "tier1" ? "500" : "250"} per contribution for {contribution.tier === "tier1" ? "Tier 1" : "Tier 2"}</li>
                            <li>{contribution.tier === "tier1" ? "Minimum ₹1,000 annually to keep account active" : "No annual minimum for Tier 2"}</li>
                            <li>No maximum limit on contributions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Monthly Amount (₹)</Label>
                      <Input 
                        type="number" 
                        placeholder={`Minimum ₹${contribution.tier === "tier1" ? "500" : "250"}`}
                        value={contribution.recurringAmount}
                        onChange={(e) => setContribution({...contribution, recurringAmount: e.target.value})}
                        className="mt-2 text-lg font-semibold"
                        min={contribution.tier === "tier1" ? 500 : 250}
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
                          <SelectItem value="half-yearly">Half-Yearly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p className="text-xs text-blue-700">
                          <span className="font-medium">Auto-Debit Facility:</span> Set up standing instruction for automatic monthly deductions. 
                          Protean eNPS supports UPI Autopay and NACH mandate.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Label className="text-sm font-medium">Investment Choice</Label>
                  <Select value={contribution.fundType} onValueChange={(v) => setContribution({...contribution, fundType: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        <div className="flex flex-col">
                          <span>Auto Choice (Lifecycle Fund)</span>
                          <span className="text-xs text-muted-foreground">PFRDA recommended - allocation based on age</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="active">
                        <div className="flex flex-col">
                          <span>Active Choice</span>
                          <span className="text-xs text-muted-foreground">Choose your own E, C, G, A allocation</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="aggressive">
                        <div className="flex flex-col">
                          <span>LC75 - Aggressive</span>
                          <span className="text-xs text-muted-foreground">Max 75% Equity, reduces with age</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="moderate">
                        <div className="flex flex-col">
                          <span>LC50 - Moderate</span>
                          <span className="text-xs text-muted-foreground">Max 50% Equity, balanced approach</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="conservative">
                        <div className="flex flex-col">
                          <span>LC25 - Conservative</span>
                          <span className="text-xs text-muted-foreground">Max 25% Equity, low risk</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {contribution.fundType === "active" && (
                  <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Custom Allocation (must total 100%)</p>
                      <Badge variant="outline" className="text-xs">PFRDA Limits Apply</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs flex items-center gap-1">
                          Equity (E) %
                          <span className="text-muted-foreground">(Max 75%)</span>
                        </Label>
                        <Input type="number" value={contribution.equityAllocation} onChange={(e) => setContribution({...contribution, equityAllocation: e.target.value})} className="mt-1" max={75} />
                      </div>
                      <div>
                        <Label className="text-xs flex items-center gap-1">
                          Corporate Bond (C) %
                          <span className="text-muted-foreground">(Max 100%)</span>
                        </Label>
                        <Input type="number" value={contribution.corporateBondAllocation} onChange={(e) => setContribution({...contribution, corporateBondAllocation: e.target.value})} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs flex items-center gap-1">
                          Govt Securities (G) %
                          <span className="text-muted-foreground">(Max 100%)</span>
                        </Label>
                        <Input type="number" value={contribution.govtBondAllocation} onChange={(e) => setContribution({...contribution, govtBondAllocation: e.target.value})} className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-xs flex items-center gap-1">
                          Alternative (A) %
                          <span className="text-muted-foreground">(Max 5%)</span>
                        </Label>
                        <Input type="number" value={contribution.alternativeAllocation} onChange={(e) => setContribution({...contribution, alternativeAllocation: e.target.value})} className="mt-1" max={5} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <p className="text-xs text-amber-700">
                        As per PFRDA guidelines: Equity (E) max 75%, Alternative Assets (A) max 5%. Equity allocation reduces by 2.5% each year after age 50.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tax Benefit Summary - Only show for Tier 1 */}
                {contribution.tier === "tier1" && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <Gift className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-green-800">Tax Benefits Available</p>
                        <ul className="text-xs text-green-700 mt-2 space-y-1">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            <span><strong>Section 80CCD(1):</strong> Up to ₹1.5 Lakh (within 80C limit)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            <span><strong>Section 80CCD(1B):</strong> Additional ₹50,000 (exclusive benefit)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            <span><strong>Section 80CCD(2):</strong> Employer contribution up to 10% of salary (14% for Govt)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleContribution} 
                  className="w-full bg-primary" 
                  size="lg"
                  disabled={currentAmount < (contribution.tier === "tier1" ? 500 : 250)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {currentAmount >= (contribution.tier === "tier1" ? 500 : 250) 
                    ? `Pay ₹${currentAmount.toLocaleString('en-IN')} - Net: ₹${charges.netInvestment.toLocaleString('en-IN')}`
                    : `Minimum ₹${contribution.tier === "tier1" ? "500" : "250"} required`
                  }
                </Button>

                {/* Protean Disclaimer */}
                <p className="text-xs text-center text-muted-foreground">
                  Powered by Protean eGov Technologies Limited (formerly NSDL eGov) - 
                  Central Recordkeeping Agency appointed by PFRDA
                </p>
              </CardContent>
            </Card>

            {/* Contribution Breakdown - Dynamic */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-primary" />
                      Contribution Breakdown
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">As per PFRDA Norms</Badge>
                  </div>
                  <CardDescription>Charges applicable as per PFRDA & Protean guidelines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">NPS Investment Amount</p>
                      <Badge className={contribution.tier === "tier1" ? "bg-primary/10 text-primary" : "bg-purple-100 text-purple-700"}>
                        {contribution.tier === "tier1" ? "Tier 1" : "Tier 2"}
                      </Badge>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mt-1">
                      ₹{charges.netInvestment.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-green-600 mt-1">This full amount goes to your NPS account</p>
                    {charges.netInvestment < (contribution.tier === "tier1" ? 500 : 250) && charges.netInvestment > 0 && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Minimum ₹{contribution.tier === "tier1" ? "500" : "250"} required for {contribution.tier === "tier1" ? "Tier 1" : "Tier 2"}
                      </p>
                    )}
                  </div>
                  
                  {/* PFRDA Prescribed Charges - As per PFRDA Circular effective 31.01.2025 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">PFRDA Charges (w.e.f. 31.01.2025)</p>
                      <Badge variant="outline" className="text-[10px]">eNPS Platform</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="text-sm text-secondary">POP Charges</span>
                          <p className="text-xs text-muted-foreground">0.20% (Min ₹15, Max ₹10,000)</p>
                        </div>
                      </div>
                      <span className="font-semibold text-blue-600">+ ₹{charges.popCharges.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <div>
                          <span className="text-sm text-secondary">CRA Charges (Protean)</span>
                          <p className="text-xs text-muted-foreground">₹3.75 per transaction</p>
                        </div>
                      </div>
                      <span className="font-semibold text-purple-600">+ ₹{charges.craCharges.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        <div>
                          <span className="text-sm text-secondary">PFM Charges (IMF)</span>
                          <p className="text-xs text-muted-foreground">0.09% Investment Mgmt Fee</p>
                        </div>
                      </div>
                      <span className="font-semibold text-teal-600">+ ₹{charges.pfmCharges.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-indigo-500" />
                        <div>
                          <span className="text-sm text-secondary">NPS Trust Charges</span>
                          <p className="text-xs text-muted-foreground">0.003% Reimbursement</p>
                        </div>
                      </div>
                      <span className="font-semibold text-indigo-500">+ ₹{charges.npsTrustCharges.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-orange-500" />
                        <div>
                          <span className="text-sm text-secondary">GST</span>
                          <p className="text-xs text-muted-foreground">18% on all charges</p>
                        </div>
                      </div>
                      <span className="font-semibold text-orange-500">+ ₹{charges.gstOnCharges.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total Summary */}
                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-800">Total Charges</span>
                      <span className="font-bold text-blue-700">+ ₹{charges.totalCharges.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Total Payable</span>
                      </div>
                      <span className="font-bold text-primary text-lg">₹{charges.totalPayable.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Payment gateway charges will be added separately at checkout
                    </p>
                  </div>

                  {/* Info Note */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700">
                        Charges are as per PFRDA circular dated 31.03.2023. POP charges capped at 0.10% of contribution. 
                        PFM charges are deducted from NAV daily.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Benefit Tracker */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600" />
                      Tax Benefit Tracker
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-700">FY 2025-26</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 80CCD(1) Progress */}
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-secondary">Section 80CCD(1)</span>
                      <span className="text-xs text-muted-foreground">Within 80C limit</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-secondary">₹55,000</p>
                      <p className="text-sm text-muted-foreground">of ₹1,50,000</p>
                    </div>
                    <Progress value={37} className="mt-2 h-2" />
                    <p className="text-xs text-green-600 mt-2">₹95,000 more for full benefit</p>
                  </div>
                  
                  {/* 80CCD(1B) Progress */}
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">Section 80CCD(1B)</span>
                      <Badge className="bg-purple-100 text-purple-700 text-xs">Exclusive NPS</Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-purple-700">₹25,000</p>
                      <p className="text-sm text-purple-600">of ₹50,000</p>
                    </div>
                    <Progress value={50} className="mt-2 h-2 [&>div]:bg-purple-500" />
                    <p className="text-xs text-purple-600 mt-2">₹25,000 more for additional tax saving</p>
                  </div>

                  {/* Tax Savings Summary */}
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <IndianRupee className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Estimated Tax Savings</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-green-700">At 30% Slab</p>
                        <p className="text-lg font-bold text-green-700">₹24,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-700">At 20% Slab</p>
                        <p className="text-lg font-bold text-green-700">₹16,000</p>
                      </div>
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">PFM / Scheme</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV (₹)</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">NAV Units</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Total Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">1D Change</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Since Inception</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme E - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹58.42</td>
                      <td className="py-4 px-4 text-right font-mono">5,862.45</td>
                      <td className="py-4 px-4 text-right font-bold text-primary">₹3,42,500</td>
                      <td className="py-4 px-4 text-right text-green-600">+1.47%</td>
                      <td className="py-4 px-4 text-right text-green-600">+45.8%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme C - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹42.18</td>
                      <td className="py-4 px-4 text-right font-mono">4,875.32</td>
                      <td className="py-4 px-4 text-right font-bold text-primary">₹2,05,625</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.29%</td>
                      <td className="py-4 px-4 text-right text-green-600">+32.5%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme G - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹35.67</td>
                      <td className="py-4 px-4 text-right font-mono">2,885.21</td>
                      <td className="py-4 px-4 text-right font-bold text-primary">₹1,02,938</td>
                      <td className="py-4 px-4 text-right text-green-600">+0.22%</td>
                      <td className="py-4 px-4 text-right text-green-600">+28.2%</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-secondary">HDFC Pension Fund</p>
                          <p className="text-xs text-muted-foreground">Scheme A - Tier 1</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold">₹28.95</td>
                      <td className="py-4 px-4 text-right font-mono">1,176.51</td>
                      <td className="py-4 px-4 text-right font-bold text-primary">₹34,062</td>
                      <td className="py-4 px-4 text-right text-red-600">-0.52%</td>
                      <td className="py-4 px-4 text-right text-green-600">+38.5%</td>
                    </tr>
                    <tr className="bg-primary/5 border-t-2 border-primary/20">
                      <td className="py-4 px-4">
                        <p className="text-sm font-bold text-secondary">Total Portfolio</p>
                      </td>
                      <td className="py-4 px-4 text-right">-</td>
                      <td className="py-4 px-4 text-right font-bold font-mono">14,799.49</td>
                      <td className="py-4 px-4 text-right font-bold text-primary text-lg">₹6,85,125</td>
                      <td className="py-4 px-4 text-right text-green-600 font-semibold">+0.87%</td>
                      <td className="py-4 px-4 text-right text-green-600 font-semibold">+36.25%</td>
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

          {/* Last 5 Transactions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-primary" />
                    Last 5 Transactions
                  </CardTitle>
                  <CardDescription>Recent NPS transactions with fund details</CardDescription>
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
                  <Button size="sm" className="gap-2 h-8" onClick={() => setShowStatementDialog(true)}>
                    <FileDown className="w-3 h-3" />
                    Download Statement
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
                    {transactionHistory.slice(0, 5).map((txn, index) => (
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
                            <p className="text-xs text-muted-foreground">{npsData.pensionFundManager}</p>
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
                <p className="text-sm text-muted-foreground">Showing last 5 transactions</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-3 h-3" />
                  View All Transactions
                </Button>
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
