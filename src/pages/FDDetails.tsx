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
import { fdProviders } from "@/data/fdData";
import { ArrowLeft, Shield, CheckCircle, User, Search, Building2, Users, Calendar, TrendingUp, Landmark, Clock, Banknote, FileText, BadgeCheck, ArrowRight } from "lucide-react";
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
    return <div className="p-8 text-center">FD not found</div>;
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
            <Link to="/fds" className="text-muted-foreground hover:text-primary">
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

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 h-52 md:h-72">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%3Cpath%20fill%3D%22%2323698e%22%20fill-opacity%3D%220.1%22%20d%3D%22M0%2C128L48%2C144C96%2C160%2C192%2C192%2C288%2C186.7C384%2C181%2C480%2C139%2C576%2C138.7C672%2C139%2C768%2C181%2C864%2C181.3C960%2C181%2C1056%2C139%2C1152%2C117.3C1248%2C96%2C1344%2C96%2C1392%2C96L1440%2C96L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')] bg-cover bg-bottom opacity-50"></div>
              <div className="absolute top-5 left-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getIconColors(fd.type).bg} border border-white/20`}>
                  <ProviderIcon iconType={fd.iconType} className={getIconColors(fd.type).text} size={28} />
                </div>
                <div>
                  <span className="font-bold text-foreground text-xl">{fd.bankName}</span>
                  <p className="text-sm text-muted-foreground font-medium">Fixed Deposit</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/30 to-transparent"></div>
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <p className="text-xs text-muted-foreground font-medium">Interest Rate</p>
                <p className="text-3xl font-bold text-primary">{fd.interestRate}%</p>
              </div>
            </div>

            {/* Bank Name and Badges */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{fd.bankName}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-muted/50 text-xs font-semibold tracking-wider">
                  RBI-REGULATED
                </Badge>
                <span className="text-muted-foreground">■</span>
                <Badge variant="outline" className="bg-muted/50 text-xs font-semibold tracking-wider">
                  {fd.type.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Enhanced Interest Rates Table */}
            <Card className="finease-card overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/5 to-transparent">
                <h3 className="font-bold text-secondary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
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
                                <TrendingUp className="w-3 h-3 mr-1" />
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
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Instant withdrawal available</p>
                  <p className="text-sm text-muted-foreground">After minimum lock-in period</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Up to ₹5 lakh insured by DICGC</p>
                  <p className="text-sm text-muted-foreground">RBI's deposit insurance</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                <Banknote className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Monthly/Quarterly payouts</p>
                  <p className="text-sm text-muted-foreground">Flexible interest payment options</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                <FileText className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Physical FD receipt available</p>
                  <p className="text-sm text-muted-foreground">On request from the bank</p>
                </div>
              </div>
            </div>

            {/* Compare with Top Banks */}
            <Card className="finease-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Compare with top banks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {comparisonBanks.map((bank, index) => (
                    <div key={index} className={`text-center p-4 rounded-xl ${bank.highlight ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/30'}`}>
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${getIconColors(fd.type).bg}`}>
                        <ProviderIcon iconType={bank.iconType} className={getIconColors(fd.type).text} size={20} />
                      </div>
                      <p className={`text-xl font-bold ${bank.highlight ? 'text-primary' : 'text-foreground'}`}>{bank.rate}%</p>
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
                <CardTitle className="text-lg text-foreground">About {fd.bankName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{fd.about}</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <Building2 className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">AUM</p>
                    <p className="font-bold text-foreground">{bankInfo.aum}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Customers</p>
                    <p className="font-bold text-foreground">{bankInfo.customers}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <Landmark className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Branches</p>
                    <p className="font-bold text-foreground">{bankInfo.branches}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="font-bold text-foreground">{bankInfo.founded}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-xl col-span-2 md:col-span-1">
                    <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Listed on</p>
                    <p className="font-bold text-foreground">{bankInfo.listedOn}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FinEase Promise */}
            <Card className="finease-card bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  FinEase Promise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Your money goes directly to {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">We do not hold your funds at any point</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">You will get an FD receipt from {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">Official documentation directly from the bank</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Your interest & principal are paid by {fd.bankName}</p>
                    <p className="text-sm text-muted-foreground">Direct bank transfer to your account</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-3">Important Disclaimer</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Fixed Deposits are subject to terms and conditions of the respective bank/NBFC.</li>
                <li>• Interest rates are subject to change without prior notice.</li>
                <li>• TDS will be deducted at source as per Income Tax rules if interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.</li>
                <li>• FDs up to ₹5 lakhs per depositor per bank are insured under DICGC.</li>
                <li>• Premature withdrawal may attract penalty as per bank's policy.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Sticky Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="finease-card">
                <CardContent className="p-6 space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="text-lg font-semibold"
                      min={fd.minDeposit}
                      max={fd.maxDeposit}
                    />
                  </div>

                  {/* Senior Citizen Toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">Sr. Citizen</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{isSeniorCitizen ? "Yes" : "No"}</span>
                      <Switch
                        checked={isSeniorCitizen}
                        onCheckedChange={setIsSeniorCitizen}
                      />
                    </div>
                  </div>

                  {/* Tenure Select */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Interest rate and tenure</label>
                    <Select value={selectedTenure} onValueChange={setSelectedTenure}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fd.tenureOptions.map((option) => (
                          <SelectItem key={option.months} value={option.months.toString()}>
                            {formatTenure(option.months)} ({(isSeniorCitizen ? option.seniorRate : option.rate).toFixed(2)}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Compounding Select */}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Compounding</label>
                    <Select value={compounding} onValueChange={setCompounding}>
                      <SelectTrigger className="w-full">
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

                  {/* Calculation Results */}
                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Investment amount</span>
                      <span className="font-semibold text-foreground">₹{depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Compounding</span>
                      <span className="font-semibold text-foreground">{compounding}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">FD rate applicable</span>
                      <span className="font-semibold text-foreground">{rate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">FD tenure</span>
                      <span className="font-semibold text-foreground">{formatTenure(tenure)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Maturity amount</span>
                      <span className="font-semibold text-foreground">₹{returns.maturityValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Interest earned</span>
                      <span className="font-bold text-primary">₹{returns.totalInterest.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Invest Button */}
                  <Button
                    className="w-full finease-btn"
                    size="lg"
                    onClick={handleOpenFD}
                  >
                    Invest now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Min. ₹{fd.minDeposit.toLocaleString()} • Max. ₹{fd.maxDeposit.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FDDetails;