import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { bondsData, Bond, bondRiskDisclaimer } from "@/data/bondData";
import { 
  ArrowLeft, FileText, AlertTriangle, Download, CheckCircle, IndianRupee,
  Calendar, TrendingUp, Shield, Building2, Clock, Percent, 
  BadgeCheck, Info, ChevronRight, Calculator, PieChart, 
  Wallet, Receipt, Scale, Lock, Unlock, ExternalLink,
  Star, Award, Briefcase, Target, Layers, BarChart3
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/finease-logo.png";
import ProductLayout from "@/components/ProductLayout";
import { ProviderIcon, getIconColors } from "@/components/icons/ProviderIcon";

const BondDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bond = bondsData.find((b) => b.id === id);
  const [units, setUnits] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get similar bonds
  const similarBonds = useMemo(() => {
    if (!bond) return [];
    return bondsData
      .filter(b => b.id !== bond.id && (b.bondType === bond.bondType || b.rating === bond.rating))
      .slice(0, 3);
  }, [bond]);

  if (!bond) {
    return (
      <ProductLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-secondary mb-2">Bond Not Found</h2>
            <p className="text-muted-foreground mb-4">The bond you're looking for doesn't exist.</p>
            <Link to="/bonds">
              <Button>View All Bonds</Button>
            </Link>
          </div>
        </div>
      </ProductLayout>
    );
  }

  // Unit-based investment calculations (like GoldenPi)
  const minUnits = bond.lotSize || 1;
  const totalBonds = units * minUnits;
  const cleanPriceTotal = totalBonds * bond.cleanPrice;
  const accruedInterestTotal = totalBonds * bond.accruedInterest;
  const dirtyPriceTotal = totalBonds * bond.dirtyPrice; // Total investment amount
  const annualReturn = Math.round(totalBonds * bond.faceValue * bond.couponRate / 100);
  const maturityReturn = Math.round(totalBonds * bond.faceValue * bond.ytm / 100 * parseInt(bond.tenure));
  
  const incrementUnits = () => setUnits(prev => prev + 1);
  const decrementUnits = () => setUnits(prev => prev > 1 ? prev - 1 : 1);

  // Calculate payment schedule
  const getPaymentSchedule = () => {
    const payments = [];
    const frequency = bond.payoutFrequency === "Monthly" ? 12 : 
                     bond.payoutFrequency === "Quarterly" ? 4 : 
                     bond.payoutFrequency === "Half-yearly" ? 2 : 1;
    const couponPerPayment = (totalBonds * bond.faceValue * bond.couponRate / 100) / frequency;
    const today = new Date();
    
    for (let i = 0; i < Math.min(frequency * 2, 8); i++) {
      const paymentDate = new Date(today);
      paymentDate.setMonth(today.getMonth() + (12 / frequency) * (i + 1));
      payments.push({
        date: paymentDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        amount: couponPerPayment || (bond.faceValue * bond.couponRate / 100 / frequency),
        type: "Coupon"
      });
    }
    return payments;
  };

  const handleInvest = () => {
    if (units < 1) {
      toast({ title: "Error", description: `Please select at least 1 unit`, variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: "Investment Successful!", description: `You've invested ₹${dirtyPriceTotal.toLocaleString()} in ${totalBonds} units of ${bond.issuer}` });
      navigate("/dashboard/bonds");
    }, 2000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const getRatingColor = (rating: string) => {
    if (rating.includes("AAA")) return "bg-green-100 text-green-700 border-green-200";
    if (rating.includes("AA")) return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Medium": return "text-amber-600";
      case "High": return "text-red-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <ProductLayout>
      <div className="bg-gradient-to-b from-secondary/5 via-secondary/3 to-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/bonds" className="text-muted-foreground hover:text-primary transition-colors">Bonds</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-secondary font-medium">{bond.issuer}</span>
          </nav>
        </div>

        {/* Enhanced Bond Header */}
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex items-start gap-5">
              <div className={`w-18 h-18 rounded-2xl flex items-center justify-center border border-primary/20 ${getIconColors(bond.bondType).bg} overflow-hidden p-3 shadow-sm`}>
                  <ProviderIcon iconType={bond.iconType} logo={bond.logo} name={bond.issuer} className={getIconColors(bond.bondType).text} size={48} />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${getRatingColor(bond.rating)} border px-3 py-1.5 font-bold text-sm`}>
                      {bond.rating} ({bond.ratingAgency})
                    </Badge>
                    <Badge variant="outline" className="capitalize bg-muted/50">
                      {bond.bondType}
                    </Badge>
                    {bond.bondCategory && (
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {bond.bondCategory}
                      </Badge>
                    )}
                    {bond.secured && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Lock className="w-3 h-3 mr-1" /> Secured
                      </Badge>
                    )}
                    {bond.listed && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Listed
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-secondary font-['Raleway']">{bond.issuer}</h1>
                  <p className="text-muted-foreground">ISIN: <span className="font-mono font-semibold text-secondary bg-muted/50 px-2 py-0.5 rounded">{bond.isin}</span></p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {bond.listingExchange?.length > 0 && (
                      <span className="text-muted-foreground">
                        Listed on: {bond.listingExchange.join(" & ")}
                      </span>
                    )}
                    <span className="text-muted-foreground">•</span>
                    <Badge className={`text-xs ${bond.investmentMethod === "Lot Based" ? "bg-purple-100 text-purple-700" : bond.investmentMethod === "Direct" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {bond.investmentMethod === "Lot Based" ? <Layers className="w-3 h-3 mr-1" /> : <BarChart3 className="w-3 h-3 mr-1" />}
                      {bond.investmentMethod}
                    </Badge>
                    {bond.lotSize > 1 && (
                      <Badge variant="outline" className="text-xs bg-purple-50">
                        {bond.lotSize} bonds/lot
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {bond.marketType}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3 bg-gradient-to-br from-primary/5 to-primary/10 p-5 rounded-2xl">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-medium">Yield to Maturity</p>
                  <p className="text-5xl font-bold text-primary">{bond.ytm}%</p>
                </div>
                <div className="flex gap-6 mt-2">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Coupon</p>
                    <p className="text-xl font-bold text-secondary">{bond.couponRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Current Yield</p>
                    <p className="text-xl font-bold text-secondary">{bond.currentYield}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <Card className="finease-card hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Maturity Date</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">{formatDate(bond.maturityDate)}</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Tenure</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">{bond.tenure}</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Receipt className="w-4 h-4" />
                      <span>Face Value</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">₹{bond.faceValue.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Wallet className="w-4 h-4" />
                      <span>Min Investment</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">₹{bond.minInvestment.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">Payout Frequency</p>
                      <p className="font-semibold text-secondary">{bond.payoutFrequency}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">Next Coupon Date</p>
                      <p className="font-semibold text-secondary">{formatDate(bond.nextCouponDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">Issue Date</p>
                      <p className="font-semibold text-secondary">{formatDate(bond.issueDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">Risk Level</p>
                      <p className={`font-semibold ${getRiskColor(bond.riskLevel)}`}>{bond.riskLevel}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full grid grid-cols-4 bg-secondary/5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="tax">Tax & Risk</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* About Section */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                      About {bond.issuer}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{bond.description}</p>
                  </CardContent>
                </Card>

                {/* Credit Rating */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Credit Rating Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-6">
                      <div className={`w-20 h-20 rounded-xl ${getRatingColor(bond.rating)} flex items-center justify-center text-2xl font-bold border-2`}>
                        {bond.rating}
                      </div>
                      <div>
                        <p className="font-semibold text-secondary">Rated by {bond.ratingAgency}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {bond.rating.includes("AAA") 
                            ? "Highest degree of safety regarding timely servicing of financial obligations."
                            : bond.rating.includes("AA")
                            ? "High degree of safety regarding timely servicing of financial obligations."
                            : "Adequate degree of safety regarding timely servicing of financial obligations."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Credit Quality</span>
                        <span className="text-sm font-medium text-secondary">
                          {bond.rating.includes("AAA") ? "Excellent" : bond.rating.includes("AA") ? "Very Good" : "Good"}
                        </span>
                      </div>
                      <Progress 
                        value={bond.rating.includes("AAA") ? 100 : bond.rating.includes("AA+") ? 90 : bond.rating.includes("AA") ? 80 : 70} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-6 space-y-6">
                {/* Payment Schedule */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Payment Schedule
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Based on {bond.payoutFrequency.toLowerCase()} coupon payments
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getPaymentSchedule().map((payment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Receipt className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary">{payment.type} Payment</p>
                              <p className="text-sm text-muted-foreground">{payment.date}</p>
                            </div>
                          </div>
                          <p className="font-bold text-secondary">₹{payment.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      * Payment schedule is indicative based on your investment amount
                    </p>
                  </CardContent>
                </Card>

                {/* Bond Options */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Scale className="w-5 h-5 text-primary" />
                      Bond Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {bond.callOption ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Info className="w-5 h-5 text-muted-foreground" />}
                          <span className="font-medium text-secondary">Call Option</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bond.callOption ? "Issuer can redeem before maturity" : "No early redemption by issuer"}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {bond.putOption ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Info className="w-5 h-5 text-muted-foreground" />}
                          <span className="font-medium text-secondary">Put Option</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bond.putOption ? "You can sell back before maturity" : "No early exit option"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6 space-y-6">
                {/* Key Features */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Star className="w-5 h-5 text-primary" />
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bond.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg">
                          <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Security Details */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lock className="w-5 h-5 text-primary" />
                      Security Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          {bond.secured ? <Lock className="w-5 h-5 text-green-600" /> : <Unlock className="w-5 h-5 text-amber-600" />}
                          <span className="font-medium text-secondary">Security Status</span>
                        </div>
                        <Badge className={bond.secured ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                          {bond.secured ? "Secured" : "Unsecured"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bond.secured 
                          ? "This bond is secured against the issuer's assets, providing additional protection to investors."
                          : "This is an unsecured bond. Returns depend on the issuer's creditworthiness and ability to pay."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tax" className="mt-6 space-y-6">
                {/* Tax Benefits */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Percent className="w-5 h-5 text-primary" />
                      Tax Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <p className="text-blue-800">{bond.taxBenefits}</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">TDS is deducted at source at 10% (with PAN) or 20% (without PAN)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Long-term capital gains (held &gt;36 months) taxed at 20% with indexation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Short-term capital gains taxed as per your income tax slab</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Warning */}
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-amber-800">
                      <AlertTriangle className="w-5 h-5" />
                      Risk Disclosure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm text-amber-900">
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Bond investments are subject to credit risk and interest rate risk</li>
                        <li>Past performance does not guarantee future returns</li>
                        <li>Bond prices may fluctuate based on market conditions</li>
                        <li>Credit ratings may change over time</li>
                        <li>Please read all offer documents carefully before investing</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Documents */}
            <Card className="finease-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-secondary">Offer Document</p>
                      <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-secondary">Information Memorandum</p>
                      <p className="text-xs text-muted-foreground">PDF • 1.8 MB</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-secondary">Rating Rationale</p>
                      <p className="text-xs text-muted-foreground">PDF • 856 KB</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                  <button className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-secondary">Key Information Document</p>
                      <p className="text-xs text-muted-foreground">PDF • 512 KB</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Bonds */}
            {similarBonds.length > 0 && (
              <Card className="finease-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-primary" />
                    Similar Bonds You May Like
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBonds.map((b) => (
                      <Link 
                        key={b.id} 
                        to={`/bonds/${b.id}`}
                        className="block p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColors(b.bondType).bg}`}>
                            <ProviderIcon iconType={b.iconType} className={getIconColors(b.bondType).text} size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-secondary text-sm">{b.issuer}</p>
                            <Badge className={`${getRatingColor(b.rating)} text-xs`}>{b.rating}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-muted-foreground">YTM</p>
                            <p className="font-bold text-primary">{b.ytm}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Tenure</p>
                            <p className="font-bold text-secondary">{b.tenure}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Investment Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="finease-card border-primary/20 overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="w-5 h-5 text-primary" />
                    Invest in {minUnits > 1 ? "Lots" : "Units"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {minUnits > 1 ? `${minUnits} bonds per lot` : "Direct unit investment"}
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-5">
                    {/* Unit Selector */}
                    <div className="space-y-3">
                      <Label className="text-secondary font-medium">
                        Select {minUnits > 1 ? "Lots" : "Units"}
                      </Label>
                      <div className="flex items-center justify-center gap-4 p-4 bg-secondary/5 rounded-xl">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-full text-xl font-bold"
                          onClick={decrementUnits}
                          disabled={units <= 1}
                        >
                          −
                        </Button>
                        <div className="text-center min-w-[100px]">
                          <Input
                            type="number"
                            min="1"
                            value={units}
                            onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                            className="text-3xl font-bold text-center h-14 border-0 bg-transparent"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {minUnits > 1 ? `${totalBonds} bonds` : "bonds"}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-full text-xl font-bold"
                          onClick={incrementUnits}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-secondary text-sm flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-primary" />
                        Price Breakdown
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Clean Price</span>
                          <span className="font-medium text-secondary">₹{bond.cleanPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">+ Accrued Interest</span>
                          <span className="font-medium text-secondary">₹{bond.accruedInterest.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                          <span className="text-muted-foreground font-medium">Dirty Price (per unit)</span>
                          <span className="font-bold text-primary">₹{bond.dirtyPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <h4 className="font-semibold text-secondary text-sm">Your Investment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Bonds</span>
                          <span className="font-bold text-secondary">{totalBonds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Clean Price Total</span>
                          <span className="font-medium text-secondary">₹{cleanPriceTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Accrued Interest Total</span>
                          <span className="font-medium text-secondary">₹{accruedInterestTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg -mx-1">
                          <span className="text-secondary font-semibold">Total Investment</span>
                          <span className="font-bold text-primary text-lg">₹{dirtyPriceTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Returns Section */}
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 space-y-2">
                      <h4 className="font-semibold text-green-800 text-sm">Expected Returns</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">Annual Interest</span>
                          <span className="font-bold text-green-700">₹{annualReturn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">{bond.payoutFrequency} Payout</span>
                          <span className="font-bold text-green-700">
                            ₹{Math.round(annualReturn / (
                              bond.payoutFrequency === "Monthly" ? 12 :
                              bond.payoutFrequency === "Quarterly" ? 4 :
                              bond.payoutFrequency === "Half-yearly" ? 2 : 1
                            )).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-green-300">
                          <span className="text-green-800 font-medium">Est. Total Return</span>
                          <span className="font-bold text-green-800">₹{(dirtyPriceTotal + maturityReturn).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-green-600">Over {bond.tenure} tenure</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-12 text-base font-semibold" 
                      size="lg"
                      onClick={handleInvest}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Invest ₹${dirtyPriceTotal.toLocaleString()}`}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      <span>Secure payment via Razorpay</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="finease-card">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary text-sm">Settlement</p>
                      <p className="text-xs text-muted-foreground">T+2 Working Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary text-sm">SEBI Regulated</p>
                      <p className="text-xs text-muted-foreground">Compliant with NCS Regulations 2021</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary text-sm">Demat Required</p>
                      <p className="text-xs text-muted-foreground">Bonds will be credited to your demat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-secondary mb-2">Need help investing?</p>
                  <p className="text-sm text-muted-foreground mb-3">Our experts are here to assist you</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" /> Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </ProductLayout>
  );
};

export default BondDetails;