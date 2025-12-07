import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ipoData, ipoMarketLots } from "@/data/ipoData";
import { 
  ExternalLink, FileText, ArrowLeft, Plus, Minus, TrendingUp, 
  Calendar, IndianRupee, Users, Target, Clock, Building2,
  Shield, Award, BarChart3, CheckCircle2, AlertCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const IPODetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [quantity, setQuantity] = useState(1200);
  const [investorType, setInvestorType] = useState("individual");
  const [category, setCategory] = useState("retail");
  const [depository, setDepository] = useState("NSDL");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const ipo = ipoData.find((i) => i.id === id);

  if (!ipo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>IPO not found</p>
      </div>
    );
  }

  const handleApply = () => {
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Application Submitted",
      description: "Your IPO application has been submitted successfully. Check your UPI app for payment mandate.",
    });
    setIsApplyOpen(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const totalAmount = quantity * ipo.priceRange.max;

  // Subscription data for pie chart
  const subscriptionData = [
    { name: "QIB", value: ipo.subscriptionRate.qib, color: "#14b8a6" },
    { name: "Retail", value: ipo.subscriptionRate.retail, color: "#3b82f6" },
    { name: "NII", value: ipo.subscriptionRate.nii, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/ipo" className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-primary transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/ipo/status" className="text-primary font-medium">IPO Status</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg">
              RS
            </div>
            <span className="hidden md:block font-medium text-secondary">Rajesh Shah</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">{ipo.type}</Badge>
                  <Badge className={`border-0 ${
                    ipo.status === "Open" ? "bg-green-500/90 text-white" :
                    ipo.status === "Upcoming" ? "bg-amber-500/90 text-white" :
                    "bg-gray-500/90 text-white"
                  }`}>
                    {ipo.status}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{ipo.companyName}</h1>
                <p className="text-white/70 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {ipo.parentOrganization}
                </p>
              </div>
            </div>
            
            <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  disabled={ipo.status !== "Open"}
                  className="bg-white text-secondary hover:bg-white/90 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  {ipo.status === "Open" ? (
                    <>
                      <Target className="w-5 h-5 mr-2" />
                      Apply Now
                    </>
                  ) : ipo.status}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-gradient-hero text-white p-6 -m-6 mb-4 rounded-t-lg">
                  <DialogTitle className="text-xl">{ipo.companyName}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 p-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Investor Type</Label>
                      <Select value={investorType} onValueChange={setInvestorType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Investor</SelectItem>
                          <SelectItem value="huf">HUF</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Applicant Name</Label>
                      <Input defaultValue="Hiten Shah" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>PAN Card</Label>
                      <Input defaultValue="FZD1234" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile No</Label>
                      <Input defaultValue="9099246254" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>UPI ID</Label>
                      <Input defaultValue="rajeshs123" />
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        RAJESH AKSHAY SHAH
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>@UPI Handler</Label>
                      <Input defaultValue="@okaxis" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Depository</Label>
                      <RadioGroup value={depository} onValueChange={setDepository} className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="NSDL" id="nsdl" />
                          <Label htmlFor="nsdl">NSDL</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="CDSL" id="cdsl" />
                          <Label htmlFor="cdsl">CDSL</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>BO / DP ID</Label>
                      <Input placeholder="IN -" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={category === "retail" ? "default" : "outline"}
                      onClick={() => setCategory("retail")}
                      className={category === "retail" ? "finease-btn" : ""}
                    >
                      {"<"}₹2L
                    </Button>
                    <Button
                      variant={category === "hni" ? "default" : "outline"}
                      onClick={() => setCategory("hni")}
                    >
                      {">"} ₹2L (HNI)
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-xl border">
                    <p className="font-medium mb-3 text-secondary">Bid (1/3)</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Quantity</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(Math.max(ipo.lotSize, quantity - ipo.lotSize))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity(quantity + ipo.lotSize)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">1 Lot</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Price</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Checkbox id="cutoff" defaultChecked />
                          <Label htmlFor="cutoff" className="text-xs">Cut Off Price</Label>
                        </div>
                        <Input value={ipo.priceRange.max} disabled className="mt-1" />
                        <p className="text-xs text-muted-foreground mt-1">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                      </div>
                    </div>
                    <Button variant="link" className="text-primary p-0 mt-2">
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="flex items-center justify-between py-4 px-5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
                    <span className="font-medium text-secondary">Amount Payable</span>
                    <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the terms and condition
                    </Label>
                  </div>

                  <Button className="finease-btn w-full" onClick={handleApply}>
                    Submit Application
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            { icon: IndianRupee, label: "Min Investment", value: `₹${ipo.minInvestment.toLocaleString()}`, color: "bg-primary/10 text-primary" },
            { icon: Users, label: "Lot Size", value: `${ipo.lotSize} shares`, color: "bg-blue-100 text-blue-600" },
            { icon: Target, label: "Price Range", value: `₹${ipo.priceRange.min} - ₹${ipo.priceRange.max}`, color: "bg-green-100 text-green-600" },
            { icon: BarChart3, label: "Issue Size", value: ipo.issueSize, color: "bg-amber-100 text-amber-600" },
            { icon: Calendar, label: "Bid Starts", value: formatDate(ipo.bidDates.start), color: "bg-purple-100 text-purple-600" },
            { icon: Clock, label: "Bid Ends", value: formatDate(ipo.bidDates.end), color: "bg-teal-100 text-teal-600" },
          ].map((item, i) => (
            <Card key={i} className="hover-lift border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`p-2.5 rounded-xl ${item.color} w-fit mb-3`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-secondary">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Subscription Status - Full Width Card */}
          <Card className="lg:col-span-2 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Subscription Status
                <Badge variant="outline" className="ml-auto text-xs">
                  As of {formatDate(ipo.bidDates.end)}, 3:00 PM
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { label: "Qualified Institutional Buyers (QIB)", value: ipo.subscriptionRate.qib, color: "bg-primary" },
                    { label: "Retail Individual Investor (RII)", value: ipo.subscriptionRate.retail, color: "bg-blue-500" },
                    { label: "Non-Institutional Investor (NII)", value: ipo.subscriptionRate.nii, color: "bg-amber-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-bold text-secondary">{item.value}x</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${Math.min(item.value * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex justify-between items-center">
                    <span className="font-semibold text-secondary">Total Subscription</span>
                    <span className="text-2xl font-bold text-primary">{ipo.subscriptionRate.total}x</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subscriptionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {subscriptionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}x`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IPO Timeline */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                IPO Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Open Date", date: formatDate(ipo.bidDates.start), status: "completed" },
                  { label: "Close Date", date: formatDate(ipo.bidDates.end), status: ipo.status === "Closed" ? "completed" : "active" },
                  { label: "Allotment", date: "Dec 25, 2024", status: "pending" },
                  { label: "Refund", date: "Dec 26, 2024", status: "pending" },
                  { label: "Listing", date: "Dec 27, 2024", status: "pending" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === "completed" ? "bg-green-500" :
                      item.status === "active" ? "bg-amber-500 animate-pulse" :
                      "bg-muted"
                    }`} />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-secondary">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="mb-8">
          <TabsList className="bg-muted/50 p-1 mb-6">
            <TabsTrigger value="details" className="data-[state=active]:bg-white">IPO Details</TabsTrigger>
            <TabsTrigger value="lotsize" className="data-[state=active]:bg-white">Market Lot</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-white">About Company</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-white">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Issue Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Issue Type", value: ipo.type },
                      { label: "Face Value", value: "₹10 per share" },
                      { label: "Issue Size", value: ipo.issueSize },
                      { label: "Fresh Issue", value: "₹250 Cr" },
                      { label: "OFS", value: "₹150 Cr" },
                      { label: "Listing At", value: "BSE, NSE" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-secondary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Promoter & Holdings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Promoter Holding (Pre)", value: "75.00%" },
                      { label: "Promoter Holding (Post)", value: "62.50%" },
                      { label: "Public Holding", value: "37.50%" },
                      { label: "Employee Reservation", value: "₹2 Cr" },
                      { label: "Market Maker", value: "Yes" },
                      { label: "Anchor Portion", value: "30%" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-secondary">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lotsize">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Market Lot Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-4 font-medium text-secondary">Application</th>
                        <th className="text-center p-4 font-medium text-secondary">Lot Size</th>
                        <th className="text-center p-4 font-medium text-secondary">Shares</th>
                        <th className="text-right p-4 font-medium text-secondary">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipoMarketLots.map((lot, index) => (
                        <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                          <td className="p-4 text-muted-foreground">{lot.application}</td>
                          <td className="p-4 text-center text-secondary font-medium">{lot.lotSize}</td>
                          <td className="p-4 text-center text-secondary font-medium">{lot.shares.toLocaleString()}</td>
                          <td className="p-4 text-right font-bold text-primary">₹{lot.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  About {ipo.companyName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {ipo.companyName} is a leading player in its industry sector, known for innovation and growth. 
                  The company has demonstrated strong financial performance over the past few years with consistent 
                  revenue growth and improving profit margins. With a focus on expanding market share and 
                  diversifying product offerings, the company is well-positioned for future growth.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Industry", value: "Technology" },
                    { label: "Founded", value: "2010" },
                    { label: "Headquarters", value: "Mumbai, India" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-secondary">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  IPO Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Red Herring Prospectus (RHP)", link: ipo.rhpLink },
                    { name: "Draft RHP (DRHP)", link: "#" },
                    { name: "Financial Statements", link: "#" },
                    { name: "Anchor Investor Details", link: "#" },
                  ].map((doc, i) => (
                    <a 
                      key={i}
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-secondary font-medium">{doc.name}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Risk Disclaimer */}
        <Card className="bg-amber-50 border-amber-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Risk Disclosure</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Investment in IPOs involves risk. There is no assurance of allotment or listing gains. 
                  Please read all offer-related documents carefully before investing. Past performance is 
                  not indicative of future returns. Investment decisions should be based on individual 
                  risk appetite and financial goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default IPODetails;