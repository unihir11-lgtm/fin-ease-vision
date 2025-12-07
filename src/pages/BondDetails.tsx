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
  Star, Award, Briefcase, Target, Layers, BarChart3, Sparkles, Zap
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
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-bold text-secondary mb-2">Bond Not Found</h2>
            <p className="text-muted-foreground mb-6">The bond you're looking for doesn't exist.</p>
            <Link to="/bonds">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                View All Bonds
              </Button>
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
      {/* Enhanced Hero with Gradient */}
      <div className="relative bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <Link to="/bonds" className="text-white/70 hover:text-white transition-colors">Bonds</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white font-medium">{bond.issuer}</span>
          </nav>
        </div>

        {/* Bond Header */}
        <div className="container mx-auto px-4 py-8 pb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 border-white/30 ${getIconColors(bond.bondType).bg} overflow-hidden p-3 shadow-xl`}>
                  <ProviderIcon iconType={bond.iconType} logo={bond.logo} name={bond.issuer} className={getIconColors(bond.bondType).text} size={48} />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${getRatingColor(bond.rating)} border px-3 py-1.5 font-bold text-sm shadow-sm`}>
                      {bond.rating} ({bond.ratingAgency})
                    </Badge>
                    <Badge variant="outline" className="capitalize bg-white/20 text-white border-white/30">
                      {bond.bondType}
                    </Badge>
                    {bond.bondCategory && (
                      <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                        {bond.bondCategory}
                      </Badge>
                    )}
                    {bond.secured && (
                      <Badge variant="outline" className="bg-green-500/20 text-green-200 border-green-400/30">
                        <Lock className="w-3 h-3 mr-1" /> Secured
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Raleway']">{bond.issuer}</h1>
                  <p className="text-white/70">ISIN: <span className="font-mono font-semibold text-white bg-white/20 px-2 py-0.5 rounded">{bond.isin}</span></p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {bond.listingExchange?.length > 0 && (
                      <span className="text-white/70">
                        Listed on: {bond.listingExchange.join(" & ")}
                      </span>
                    )}
                    <span className="text-white/50">•</span>
                    <Badge className={`text-xs ${bond.investmentMethod === "Lot Based" ? "bg-purple-500/30 text-purple-200" : "bg-green-500/30 text-green-200"}`}>
                      {bond.investmentMethod === "Lot Based" ? <Layers className="w-3 h-3 mr-1" /> : <BarChart3 className="w-3 h-3 mr-1" />}
                      {bond.investmentMethod}
                    </Badge>
                    {bond.lotSize > 1 && (
                      <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                        {bond.lotSize} bonds/lot
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-4 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Yield to Maturity
                  </p>
                  <p className="text-5xl font-bold text-primary">{bond.ytm}%</p>
                </div>
                <div className="flex gap-6">
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
            <Card className="finease-card overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1 p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 group-hover:text-primary transition-colors" />
                      <span>Maturity Date</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">{formatDate(bond.maturityDate)}</p>
                  </div>
                  <div className="space-y-1 p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 group-hover:text-primary transition-colors" />
                      <span>Tenure</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">{bond.tenure}</p>
                  </div>
                  <div className="space-y-1 p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Receipt className="w-4 h-4 group-hover:text-primary transition-colors" />
                      <span>Face Value</span>
                    </div>
                    <p className="text-lg font-bold text-secondary">₹{bond.faceValue.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1 p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Wallet className="w-4 h-4 group-hover:text-primary transition-colors" />
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
              <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="payments" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Payments</TabsTrigger>
                <TabsTrigger value="features" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Features</TabsTrigger>
                <TabsTrigger value="tax" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Tax & Risk</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* About Section */}
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      About {bond.issuer}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{bond.description}</p>
                  </CardContent>
                </Card>

                {/* Credit Rating */}
                <Card className="finease-card overflow-hidden">
                  <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      Credit Rating Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 mb-6">
                      <div className={`w-24 h-24 rounded-2xl ${getRatingColor(bond.rating)} flex items-center justify-center text-3xl font-bold border-2 shadow-lg`}>
                        {bond.rating}
                      </div>
                      <div>
                        <p className="font-semibold text-secondary text-lg">Rated by {bond.ratingAgency}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {bond.rating.includes("AAA") 
                            ? "Highest degree of safety regarding timely servicing of financial obligations."
                            : bond.rating.includes("AA")
                            ? "High degree of safety regarding timely servicing of financial obligations."
                            : "Adequate degree of safety regarding timely servicing of financial obligations."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-muted/30 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Credit Quality</span>
                        <span className="text-sm font-medium text-secondary">
                          {bond.rating.includes("AAA") ? "Excellent" : bond.rating.includes("AA") ? "Very Good" : "Good"}
                        </span>
                      </div>
                      <Progress 
                        value={bond.rating.includes("AAA") ? 100 : bond.rating.includes("AA+") ? 90 : bond.rating.includes("AA") ? 80 : 70} 
                        className="h-3"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-6 space-y-6">
                {/* Payment Schedule */}
                <Card className="finease-card">
                  <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      Upcoming Payment Schedule
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Based on {bond.payoutFrequency.toLowerCase()} coupon payments
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getPaymentSchedule().map((payment, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl hover:from-primary/10 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <IndianRupee className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-secondary">{payment.type} Payment</p>
                              <p className="text-sm text-muted-foreground">{payment.date}</p>
                            </div>
                          </div>
                          <p className="font-bold text-primary text-lg">₹{payment.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6 space-y-6">
                <Card className="finease-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                      Key Features
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bond.features?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl hover:bg-primary/5 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tax" className="mt-6 space-y-6">
                <Card className="finease-card">
                  <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-transparent">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      Risk Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm text-muted-foreground">
                      <p className="leading-relaxed">{bondRiskDisclaimer}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Similar Bonds */}
            {similarBonds.length > 0 && (
              <Card className="finease-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    Similar Bonds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBonds.map((similar) => (
                      <Link key={similar.id} to={`/bonds/${similar.id}`}>
                        <div className="p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg ${getIconColors(similar.bondType).bg} flex items-center justify-center`}>
                              <ProviderIcon iconType={similar.iconType} className={getIconColors(similar.bondType).text} size={20} />
                            </div>
                            <Badge className={`${getRatingColor(similar.rating)} text-xs`}>{similar.rating}</Badge>
                          </div>
                          <h4 className="font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-1">{similar.issuer}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">{similar.tenure}</span>
                            <span className="font-bold text-primary">{similar.ytm}% YTM</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Investment Sidebar */}
          <div className="space-y-6">
            <Card className="finease-card sticky top-24 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Invest Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Unit Selector */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Number of Lots</Label>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementUnits}
                      disabled={units <= 1}
                      className="h-12 w-12 rounded-xl"
                    >
                      -
                    </Button>
                    <Input 
                      type="number" 
                      value={units}
                      onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center text-xl font-bold h-12"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementUnits}
                      className="h-12 w-12 rounded-xl"
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    1 lot = {minUnits} bond{minUnits > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Bonds</span>
                    <span className="font-semibold text-secondary">{totalBonds}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Clean Price</span>
                    <span className="font-semibold text-secondary">₹{cleanPriceTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accrued Interest</span>
                    <span className="font-semibold text-secondary">₹{accruedInterestTotal.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-secondary">Total Investment</span>
                    <span className="font-bold text-primary text-xl">₹{dirtyPriceTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Expected Returns */}
                <div className="bg-green-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Annual Coupon</span>
                    <span className="font-semibold text-green-700">₹{annualReturn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Est. Maturity Returns</span>
                    <span className="font-bold text-green-700">₹{maturityReturn.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleInvest} 
                  disabled={isProcessing}
                  className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5" />
                      Invest ₹{dirtyPriceTotal.toLocaleString()}
                    </span>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By investing, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            {/* FinEase Promise */}
            <Card className="finease-card bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-5 space-y-4">
                <h3 className="font-bold text-secondary flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  FinEase Promise
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-muted-foreground">SEBI registered platform</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Direct bond ownership</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Transparent pricing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </ProductLayout>
  );
};

export default BondDetails;
