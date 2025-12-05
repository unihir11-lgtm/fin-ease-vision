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
import { ExternalLink, FileText, ArrowLeft, Plus, Minus, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/ipo" className="text-muted hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted hover:text-primary font-medium">Home</Link>
            <Link to="/ipo/status" className="text-primary font-medium">IPO Status</Link>
          </nav>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              RS
            </div>
            <span className="hidden md:block font-medium text-secondary">Rajesh Shah</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* IPO Header Card */}
        <Card className="finease-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{ipo.type}</Badge>
                    <Badge variant="outline">{ipo.type}</Badge>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-secondary">{ipo.companyName}</h1>
                  <p className="text-muted">{ipo.parentOrganization}</p>
                </div>
              </div>
              <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                <DialogTrigger asChild>
                  <Button className="finease-btn" size="lg" disabled={ipo.status !== "Open"}>
                    {ipo.status === "Open" ? "Apply Now" : ipo.status}
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
                        <p className="text-xs text-green-600">RAJESH AKSHAY SHAH ✓</p>
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

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Bid (1/3)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-muted">Quantity</Label>
                          <div className="flex items-center gap-2">
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
                          <p className="text-xs text-muted mt-1">1 Lot</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted">Price</Label>
                          <div className="flex items-center gap-2">
                            <Checkbox id="cutoff" defaultChecked />
                            <Label htmlFor="cutoff" className="text-xs">Cut Off Price</Label>
                          </div>
                          <Input value={ipo.priceRange.max} disabled className="mt-1" />
                          <p className="text-xs text-muted mt-1">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                        </div>
                      </div>
                      <Button variant="link" className="text-primary p-0 mt-2">
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t">
                      <span className="font-medium text-primary">Amount Payable :</span>
                      <span className="text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the terms and condition
                      </Label>
                    </div>

                    <Button className="finease-btn w-full" onClick={handleApply}>
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Investment Summary */}
        <Card className="finease-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">
                  ₹{ipo.minInvestment.toLocaleString()} <span className="text-lg font-normal text-muted">/{ipo.lotSize} shares</span>
                </p>
                <p className="text-muted">Minimum Investment</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <p className="text-muted text-sm">Bidding Dates</p>
                  <p className="font-semibold">{formatDate(ipo.bidDates.start)} - {formatDate(ipo.bidDates.end)}</p>
                </div>
                <div>
                  <p className="text-muted text-sm">Min Investment</p>
                  <p className="font-semibold">₹ {ipo.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted text-sm">Lot Size</p>
                  <p className="font-semibold">{ipo.lotSize}</p>
                </div>
                <div>
                  <p className="text-muted text-sm">Price Range</p>
                  <p className="font-semibold">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IPO Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* IPO Details */}
          <Card className="finease-card">
            <CardHeader>
              <CardTitle>IPO Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Bidding Dates</p>
                  <p className="font-medium">{formatDate(ipo.bidDates.start)} - {formatDate(ipo.bidDates.end)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Min Investment</p>
                  <p className="font-medium">₹ {ipo.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Lot Size</p>
                  <p className="font-medium">{ipo.lotSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Price Range</p>
                  <p className="font-medium">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Issue Size</p>
                  <p className="font-medium">{ipo.issueSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">IPO Doc</p>
                  <a href={ipo.rhpLink} target="_blank" rel="noopener noreferrer" className="text-primary flex items-center gap-1">
                    RHP PDF <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Rate */}
          <Card className="finease-card">
            <CardHeader>
              <CardTitle>Subscription Rate <span className="text-xs text-muted">As of 14th May 25, 3:00PM</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted">Qualified Institutional Buyers</span>
                  <span className="font-bold text-primary">{ipo.subscriptionRate.qib}x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted">Retail Individual Investor</span>
                  <span className="font-bold text-primary">{ipo.subscriptionRate.retail}x</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted">Non-Institutional Investor</span>
                  <span className="font-bold text-primary">{ipo.subscriptionRate.nii}x</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-primary">{ipo.subscriptionRate.total}x</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Lot */}
        <Card className="finease-card mb-6">
          <CardHeader>
            <CardTitle>Market Lot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left p-3 font-medium">Application</th>
                    <th className="text-center p-3 font-medium">Lot Size</th>
                    <th className="text-center p-3 font-medium">Shares</th>
                    <th className="text-right p-3 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ipoMarketLots.map((lot, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{lot.category}</td>
                      <td className="p-3 text-center">{lot.lotSize}</td>
                      <td className="p-3 text-center">{lot.shares}</td>
                      <td className="p-3 text-right">₹{lot.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* IPO Activity & Dates */}
        <Card className="finease-card mb-6">
          <CardHeader>
            <CardTitle>SME IPO Activity & Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between items-center gap-4">
              {[
                { label: "IPO Open Date", date: formatDate(ipo.bidDates.start) },
                { label: "IPO Close Date", date: formatDate(ipo.bidDates.end) },
                { label: "Basis of Allotment Finalisation Date*", date: formatDate(ipo.allotmentDate) },
                { label: "Refunds Initiation*", date: formatDate(ipo.refundDate) },
                { label: "Credit of Shares to Demat Account*", date: formatDate(ipo.refundDate) },
                { label: "IPO Listing Date*", date: formatDate(ipo.listingDate) },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-primary mb-1">{item.label}</p>
                  <p className="font-medium">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* About Company */}
        <Card className="finease-card mb-6">
          <CardHeader>
            <CardTitle>About {ipo.companyShortName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted mb-6">{ipo.aboutCompany}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted">Founded in</p>
                <p className="font-semibold">{ipo.foundedYear}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Managing Director</p>
                <p className="font-semibold">{ipo.managingDirector}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Parent Organisation</p>
                <p className="font-semibold">{ipo.parentOrganization}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="finease-card mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Financial Overview</CardTitle>
              <span className="text-sm text-muted">*All Values are in Rs.Cr</span>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="assets">Total Assets</TabsTrigger>
                <TabsTrigger value="profit">Profit</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ipo.financials}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Peer Comparison */}
        {ipo.peerComparison.length > 0 && (
          <Card className="finease-card mb-6">
            <CardHeader>
              <CardTitle>{ipo.companyShortName} SME IPO Peer Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3">Company</th>
                      <th className="text-center p-3">EPS Basic</th>
                      <th className="text-center p-3">EPS Diluted</th>
                      <th className="text-center p-3">NAV</th>
                      <th className="text-center p-3">P/E(x)</th>
                      <th className="text-center p-3">RoNW</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ipo.peerComparison.map((peer, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{peer.company}</td>
                        <td className="p-3 text-center text-primary">{peer.epsBasic}</td>
                        <td className="p-3 text-center text-primary">{peer.epsDiluted}</td>
                        <td className="p-3 text-center text-primary">{peer.nav}</td>
                        <td className="p-3 text-center text-primary">{peer.pe || "-"}</td>
                        <td className="p-3 text-center text-primary">{peer.ronw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="finease-card mb-6 bg-gray-50">
          <CardHeader>
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted space-y-2">
              <li>• IPO Grey Market Premium ({ipo.companyShortName} IPO GMP) mention is valid for the specific date as mentioned in the header.</li>
              <li>• We are not buying and selling IPO forms on IPO Grey Market.</li>
              <li>• Kostak Rate is the premium one gets by selling his/her IPO application (in an off-market transaction) to someone else even before allotment or listing of the issue.</li>
              <li>• Do not subscribe for IPO by just seeing the premium Price as it may change anytime before listing. Subscribe only considering the fundamentals of the companies.</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default IPODetails;
