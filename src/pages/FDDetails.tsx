import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { fdProviders } from "@/data/fdData";
import { ArrowLeft, Shield, CheckCircle, User, Search, Building2, Users, Calendar, TrendingUp, Landmark, Clock, Banknote, FileText, BadgeCheck, ArrowRight, ChevronRight, Sparkles, Zap, IndianRupee, PiggyBank, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";
import { ProviderIcon, getIconColors } from "@/components/icons/ProviderIcon";

const FDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fd = fdProviders.find((f) => f.id === id);

  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(100000);
  const [selectedTenure, setSelectedTenure] = useState("60");
  const [compounding, setCompounding] = useState("Quarterly");

  if (!fd) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
            <PiggyBank className="w-12 h-12 text-muted-foreground/30" />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">FD Not Found</h2>
          <p className="text-muted-foreground mb-6">The fixed deposit you're looking for doesn't exist.</p>
          <Link to="/fds">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              View All FDs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get rate based on tenure and customer type
  const getRate = (months: number) => {
    const tenureOption = fd.tenureOptions.find((t) => t.months === months);
    if (!tenureOption) return isSeniorCitizen ? fd.seniorCitizenRate : fd.interestRate;
    return isSeniorCitizen ? tenureOption.seniorRate : tenureOption.rate;
  };

  const tenure = parseInt(selectedTenure);
  const rate = getRate(tenure);

  // Calculate interest and maturity
  const calculateReturns = () => {
    const years = tenure / 12;
    let maturityValue: number;
    
    const compoundingFrequency = compounding === "Monthly" ? 12 : compounding === "Quarterly" ? 4 : compounding === "Half-Yearly" ? 2 : 1;
    maturityValue = depositAmount * Math.pow(1 + rate / 100 / compoundingFrequency, compoundingFrequency * years);

    const totalInterest = maturityValue - depositAmount;
    
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + tenure);

    return {
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue),
      maturityDate: maturityDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    };
  };

  const returns = calculateReturns();

  const handleOpenFD = () => {
    toast({
      title: "FD Application Submitted",
      description: `Your FD of ₹${depositAmount.toLocaleString()} with ${fd.bankName} is being processed.`,
    });
    navigate("/dashboard/fds");
  };

  // Format tenure for display
  const formatTenure = (months: number) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) return `${years}Y`;
      return `${years}Y ${remainingMonths}M`;
    }
    return `${months}M`;
  };

  // Mock comparison banks
  const comparisonBanks = [
    { name: "SBI", rate: 6.95, iconType: "landmark" as const },
    { name: "HDFC Bank", rate: 7.1, iconType: "banknote" as const },
    { name: fd.bankName, rate: fd.interestRate, iconType: fd.iconType, highlight: true },
  ];

  // Bank info
  const bankInfo = {
    aum: "₹9,600Cr+",
    customers: "33L+",
    branches: "700+",
    founded: "2017",
    listedOn: "NSE, BSE",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/fds" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <div className="hidden md:flex relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search Stock, MF, IPO..." className="pl-10 bg-muted/30" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/ipo" className="text-muted-foreground hover:text-primary font-medium">IPO</Link>
            <Link to="/bonds" className="text-muted-foreground hover:text-primary font-medium">Bond</Link>
            <Link to="/fds" className="text-primary font-medium">FD</Link>
            <Link to="/dashboard/nps" className="text-muted-foreground hover:text-primary font-medium">NPS</Link>
          </nav>
          <Link to="/auth" className="flex items-center gap-2">
            <div className="h-10 w-10 p-2 bg-accent rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <span className="hidden md:block text-muted-foreground font-bold">Login</span>
          </Link>
        </div>
      </header>

      {/* Enhanced Hero Banner */}
      <div className="relative bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <Link to="/fds" className="text-white/70 hover:text-white transition-colors">Fixed Deposits</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white font-medium">{fd.bankName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl ${getIconColors(fd.type).bg} border-2 border-white/30`}>
                <ProviderIcon iconType={fd.iconType} className={getIconColors(fd.type).text} size={40} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-['Raleway']">{fd.bankName}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs font-semibold">
                    RBI-REGULATED
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs font-semibold">
                    {fd.type.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/30 text-green-200 border-green-400/30 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    DICGC Insured
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Interest Rate (up to)
                </p>
                <p className="text-5xl font-bold text-primary">{fd.interestRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Senior Citizens: <span className="font-bold text-green-600">{fd.seniorCitizenRate}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Interest Rates Table */}
            <Card className="finease-card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-5 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
                <h3 className="font-bold text-secondary flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  Interest Rates
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 text-muted-foreground font-semibold text-sm">Tenure</th>
                      <th className="text-right p-4 text-muted-foreground font-semibold text-sm">Regular</th>
                      <th className="text-right p-4 text-muted-foreground font-semibold text-sm">Sr. Citizen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fd.tenureOptions.map((option, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{formatTenure(option.months)}</span>
                            {option.months === 60 && (
                              <Badge className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs border border-primary/20">
                                <Star className="w-3 h-3 mr-1" />
                                POPULAR
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right font-bold text-foreground text-lg">{option.rate.toFixed(2)}%</td>
                        <td className="p-4 text-right font-bold text-primary text-lg">{option.seniorRate.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Instant withdrawal available</p>
                  <p className="text-sm text-muted-foreground">After minimum lock-in period</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Up to ₹5 lakh insured by DICGC</p>
                  <p className="text-sm text-muted-foreground">RBI's deposit insurance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Banknote className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Monthly/Quarterly payouts</p>
                  <p className="text-sm text-muted-foreground">Flexible interest payment options</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Physical FD receipt available</p>
                  <p className="text-sm text-muted-foreground">On request from the bank</p>
                </div>
              </div>
            </div>

            {/* Compare with Top Banks */}
            <Card className="finease-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  Compare with top banks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {comparisonBanks.map((bank, index) => (
                    <div key={index} className={`text-center p-5 rounded-xl transition-all duration-300 ${bank.highlight ? 'bg-primary/10 border-2 border-primary shadow-lg' : 'bg-muted/30 hover:bg-muted/50'}`}>
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${bank.highlight ? 'bg-primary/20' : getIconColors(fd.type).bg}`}>
                        <ProviderIcon iconType={bank.iconType} className={bank.highlight ? 'text-primary' : getIconColors(fd.type).text} size={24} />
                      </div>
                      <p className={`text-2xl font-bold ${bank.highlight ? 'text-primary' : 'text-foreground'}`}>{bank.rate}%</p>
                      <p className="text-sm text-muted-foreground mt-1">{bank.name}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">*Highest FD rates in each bank</p>
              </CardContent>
            </Card>

            {/* About Bank */}
            <Card className="finease-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  About {fd.bankName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{fd.about}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors">
                    <Building2 className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">AUM</p>
                    <p className="font-bold text-foreground">{bankInfo.aum}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors">
                    <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="font-bold text-foreground">{bankInfo.customers}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors">
                    <Landmark className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Branches</p>
                    <p className="font-bold text-foreground">{bankInfo.branches}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="font-bold text-foreground">{bankInfo.founded}</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors col-span-2 md:col-span-1">
                    <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Listed on</p>
                    <p className="font-bold text-foreground">{bankInfo.listedOn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FinEase Promise */}
            <Card className="finease-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  FinEase Promise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Your money goes directly to {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">We do not hold your funds at any point</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">You will get an FD receipt from {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">Official documentation directly from the bank</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Your interest & principal are paid by {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">Direct bank transfer to your account</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Important Disclaimer
              </h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Fixed Deposits are subject to terms and conditions of the respective bank/NBFC.</li>
                <li>• Interest rates are subject to change without prior notice.</li>
                <li>• TDS will be deducted at source as per Income Tax rules if interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.</li>
                <li>• FDs up to ₹5 lakhs per depositor per bank are insured under DICGC.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Calculator Sidebar */}
          <div className="space-y-6">
            <Card className="finease-card sticky top-24 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  FD Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Senior Citizen Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <Label htmlFor="senior" className="text-sm font-medium cursor-pointer">
                    Senior Citizen (60+ years)
                  </Label>
                  <Switch 
                    id="senior" 
                    checked={isSeniorCitizen} 
                    onCheckedChange={setIsSeniorCitizen}
                  />
                </div>

                {/* Deposit Amount */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Deposit Amount</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="pl-10 h-12 text-lg font-semibold"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[50000, 100000, 500000].map((amt) => (
                      <Button
                        key={amt}
                        variant={depositAmount === amt ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDepositAmount(amt)}
                        className="flex-1 text-xs"
                      >
                        ₹{(amt/1000)}K
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tenure Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tenure</Label>
                  <Select value={selectedTenure} onValueChange={setSelectedTenure}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fd.tenureOptions.map((option) => (
                        <SelectItem key={option.months} value={option.months.toString()}>
                          {formatTenure(option.months)} @ {isSeniorCitizen ? option.seniorRate : option.rate}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Compounding */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Interest Compounding</Label>
                  <Select value={compounding} onValueChange={setCompounding}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Half-Yearly">Half-Yearly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Interest Rate</span>
                    <span className="font-bold text-green-700 text-xl">{rate.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Total Interest</span>
                    <span className="font-bold text-green-700 text-xl">₹{returns.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-green-200 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-green-800">Maturity Value</span>
                    <span className="font-bold text-green-800 text-2xl">₹{returns.maturityValue.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-green-600 text-center">
                    Maturity Date: {returns.maturityDate}
                  </p>
                </div>

                <Button 
                  onClick={handleOpenFD}
                  className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Open FD Now
                  </span>
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FDDetails;
