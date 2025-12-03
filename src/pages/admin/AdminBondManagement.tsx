import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Plus, Edit, Trash2, Eye, Landmark, Download, ChevronRight, Filter,
  Building2, TrendingUp, Shield, Calendar, DollarSign, FileText, Settings,
  Users, AlertTriangle, CheckCircle, Clock, Percent, CreditCard, Globe,
  X, BarChart3, Banknote, Scale, Gavel, ArrowUpDown, Info
} from "lucide-react";
import { bondsData } from "@/data/bondData";
import { toast } from "@/hooks/use-toast";

interface CouponSchedule {
  frequency: string;
  dates: string;
  dayCount: string;
}

interface BondFormData {
  // Basic Info
  issuerName: string;
  isin: string;
  bondType: string;
  issuerType: string;
  sector: string;
  logo: string;
  description: string;
  faceValue: number;
  issueSize: number;
  outstandingAmount: number;
  listingExchange: string[];
  
  // Rates & Yield
  couponRate: number;
  currentYield: number;
  ytm: number;
  modifiedDuration: number;
  macaulayDuration: number;
  pricePerUnit: number;
  accruedInterest: number;
  cleanPrice: number;
  dirtyPrice: number;
  
  // Dates & Tenure
  issueDate: string;
  maturityDate: string;
  allotmentDate: string;
  recordDate: string;
  nextCouponDate: string;
  callDate: string;
  putDate: string;
  
  // Coupon Details
  couponFrequency: string;
  couponPaymentDates: string;
  dayCountConvention: string;
  couponType: string;
  floatingRateBenchmark: string;
  spread: number;
  
  // Investment Limits
  minInvestment: number;
  maxInvestment: number;
  lotSize: number;
  incrementalAmount: number;
  
  // Rating & Risk
  rating: string;
  ratingAgency: string;
  ratingOutlook: string;
  riskLevel: string;
  
  // Call/Put Options
  isCallable: boolean;
  callPrice: number;
  callProtectionPeriod: number;
  isPuttable: boolean;
  putPrice: number;
  putProtectionPeriod: number;
  
  // Tax & Compliance
  isTaxFree: boolean;
  taxCategory: string;
  tdsApplicable: boolean;
  tdsRate: number;
  section80CCF: boolean;
  capitalGainsTax: string;
  
  // Eligibility
  eligibleInvestors: string[];
  nriAllowed: boolean;
  fiAllowed: boolean;
  hufAllowed: boolean;
  corporateAllowed: boolean;
  trustAllowed: boolean;
  minAge: number;
  maxAge: number;
  
  // Security & Collateral
  securityType: string;
  collateralDetails: string;
  guarantorName: string;
  covenants: string;
  
  // Features
  features: string[];
}

const defaultFormData: BondFormData = {
  issuerName: "",
  isin: "",
  bondType: "corporate",
  issuerType: "private",
  sector: "",
  logo: "🏛️",
  description: "",
  faceValue: 1000,
  issueSize: 0,
  outstandingAmount: 0,
  listingExchange: [],
  couponRate: 0,
  currentYield: 0,
  ytm: 0,
  modifiedDuration: 0,
  macaulayDuration: 0,
  pricePerUnit: 0,
  accruedInterest: 0,
  cleanPrice: 0,
  dirtyPrice: 0,
  issueDate: "",
  maturityDate: "",
  allotmentDate: "",
  recordDate: "",
  nextCouponDate: "",
  callDate: "",
  putDate: "",
  couponFrequency: "semi-annual",
  couponPaymentDates: "",
  dayCountConvention: "actual/365",
  couponType: "fixed",
  floatingRateBenchmark: "",
  spread: 0,
  minInvestment: 10000,
  maxInvestment: 10000000,
  lotSize: 1,
  incrementalAmount: 1000,
  rating: "AAA",
  ratingAgency: "CRISIL",
  ratingOutlook: "stable",
  riskLevel: "low",
  isCallable: false,
  callPrice: 100,
  callProtectionPeriod: 0,
  isPuttable: false,
  putPrice: 100,
  putProtectionPeriod: 0,
  isTaxFree: false,
  taxCategory: "taxable",
  tdsApplicable: true,
  tdsRate: 10,
  section80CCF: false,
  capitalGainsTax: "ltcg",
  eligibleInvestors: ["individual"],
  nriAllowed: true,
  fiAllowed: true,
  hufAllowed: true,
  corporateAllowed: true,
  trustAllowed: true,
  minAge: 18,
  maxAge: 100,
  securityType: "unsecured",
  collateralDetails: "",
  guarantorName: "",
  covenants: "",
  features: [],
};

const AdminBondManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBond, setSelectedBond] = useState<any>(null);
  const [formData, setFormData] = useState<BondFormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState("basic");

  const filteredBonds = bondsData.filter((bond) => {
    const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bond.isin?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || bond.rating.includes(ratingFilter);
    const matchesType = typeFilter === "all" || bond.bondType.toLowerCase() === typeFilter;
    return matchesSearch && matchesRating && matchesType;
  });

  const ratings = ["all", "AAA", "AA+", "AA", "A+", "A"];
  const bondTypes = ["all", "corporate", "government", "psu", "municipal"];

  const stats = [
    { label: "Total Bonds", value: bondsData.length, icon: Landmark, color: "bg-primary/10 text-primary" },
    { label: "AAA Rated", value: bondsData.filter(b => b.rating.includes("AAA")).length, icon: Shield, color: "bg-green-100 text-green-600" },
    { label: "Avg Yield", value: `${(bondsData.reduce((a, b) => a + b.currentYield, 0) / bondsData.length).toFixed(2)}%`, icon: TrendingUp, color: "bg-blue-100 text-blue-600" },
    { label: "Total AUM", value: "₹125 Cr", icon: DollarSign, color: "bg-amber-100 text-amber-600" },
    { label: "Tax Free", value: bondsData.filter(b => b.bondType === "Tax-Free" || b.bondType === "Government").length, icon: FileText, color: "bg-purple-100 text-purple-600" },
    { label: "Active Issues", value: bondsData.length - 2, icon: CheckCircle, color: "bg-teal-100 text-teal-600" },
  ];

  const handleDelete = (id: string) => {
    toast({ title: "Bond Deleted", description: "The bond has been removed successfully." });
  };

  const handleAddBond = () => {
    toast({ title: "Bond Added", description: "New bond has been added successfully." });
    setIsAddModalOpen(false);
    setFormData(defaultFormData);
    setActiveTab("basic");
  };

  const handleViewBond = (bond: any) => {
    setSelectedBond(bond);
    setIsViewModalOpen(true);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount}`;
  };

  const addFeature = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData({ ...formData, features: [...formData.features, feature] });
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({ ...formData, features: formData.features.filter(f => f !== feature) });
  };

  const toggleExchange = (exchange: string) => {
    if (formData.listingExchange.includes(exchange)) {
      setFormData({ ...formData, listingExchange: formData.listingExchange.filter(e => e !== exchange) });
    } else {
      setFormData({ ...formData, listingExchange: [...formData.listingExchange, exchange] });
    }
  };

  const suggestedFeatures = [
    "Secured Bond", "Government Backed", "Monthly Interest", "Quarterly Interest",
    "Cumulative Option", "Non-Cumulative", "Redeemable", "Perpetual",
    "Senior Secured", "Subordinated", "Green Bond", "Infrastructure Bond",
    "Zero Coupon", "Step-Up Coupon", "Step-Down Coupon", "Floating Rate"
  ];

  const exchanges = ["NSE", "BSE", "NSE-WDM", "BSE-WDM"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <Landmark className="w-7 h-7 text-primary" />
            Bond Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage corporate, government, and municipal bonds</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" /> Add New Bond
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Landmark className="w-5 h-5 text-primary" />
                  Add New Bond Issue
                </DialogTitle>
                <DialogDescription>
                  Configure all bond parameters including rates, eligibility, tax benefits, and call/put options
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="basic" className="text-xs">
                    <Building2 className="w-3 h-3 mr-1" /> Basic
                  </TabsTrigger>
                  <TabsTrigger value="rates" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" /> Rates
                  </TabsTrigger>
                  <TabsTrigger value="dates" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" /> Dates
                  </TabsTrigger>
                  <TabsTrigger value="eligibility" className="text-xs">
                    <Users className="w-3 h-3 mr-1" /> Eligibility
                  </TabsTrigger>
                  <TabsTrigger value="tax" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" /> Tax
                  </TabsTrigger>
                  <TabsTrigger value="features" className="text-xs">
                    <Settings className="w-3 h-3 mr-1" /> Features
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto py-4">
                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-6 mt-0">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Issuer Name *</Label>
                        <Input 
                          placeholder="e.g., HDFC Bank Ltd" 
                          value={formData.issuerName}
                          onChange={(e) => setFormData({...formData, issuerName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">ISIN *</Label>
                        <Input 
                          placeholder="e.g., INE001A07XY8" 
                          value={formData.isin}
                          onChange={(e) => setFormData({...formData, isin: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Logo Emoji</Label>
                        <Input 
                          placeholder="🏛️" 
                          value={formData.logo}
                          onChange={(e) => setFormData({...formData, logo: e.target.value})}
                          className="text-center text-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Bond Type *</Label>
                        <Select value={formData.bondType} onValueChange={(v) => setFormData({...formData, bondType: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">Corporate Bond</SelectItem>
                            <SelectItem value="government">Government Bond</SelectItem>
                            <SelectItem value="psu">PSU Bond</SelectItem>
                            <SelectItem value="municipal">Municipal Bond</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure Bond</SelectItem>
                            <SelectItem value="green">Green Bond</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Issuer Type</Label>
                        <Select value={formData.issuerType} onValueChange={(v) => setFormData({...formData, issuerType: v})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Private Company</SelectItem>
                            <SelectItem value="public">Public Company</SelectItem>
                            <SelectItem value="government">Government</SelectItem>
                            <SelectItem value="psu">PSU</SelectItem>
                            <SelectItem value="nbfc">NBFC</SelectItem>
                            <SelectItem value="bank">Bank</SelectItem>
                            <SelectItem value="hfc">Housing Finance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Sector</Label>
                        <Select value={formData.sector} onValueChange={(v) => setFormData({...formData, sector: v})}>
                          <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="banking">Banking & Finance</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="energy">Energy & Power</SelectItem>
                            <SelectItem value="realty">Real Estate</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="telecom">Telecom</SelectItem>
                            <SelectItem value="fmcg">FMCG</SelectItem>
                            <SelectItem value="it">IT & Technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Face Value (₹)</Label>
                        <Input 
                          type="number" 
                          value={formData.faceValue}
                          onChange={(e) => setFormData({...formData, faceValue: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Issue Size (₹ Cr)</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 500"
                          value={formData.issueSize || ""}
                          onChange={(e) => setFormData({...formData, issueSize: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Outstanding (₹ Cr)</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 450"
                          value={formData.outstandingAmount || ""}
                          onChange={(e) => setFormData({...formData, outstandingAmount: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Lot Size</Label>
                        <Input 
                          type="number" 
                          value={formData.lotSize}
                          onChange={(e) => setFormData({...formData, lotSize: Number(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Listing Exchanges</Label>
                      <div className="flex flex-wrap gap-2">
                        {exchanges.map((exchange) => (
                          <button
                            key={exchange}
                            type="button"
                            onClick={() => toggleExchange(exchange)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                              formData.listingExchange.includes(exchange)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background border-border hover:bg-muted"
                            }`}
                          >
                            {exchange}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Description</Label>
                      <Textarea 
                        placeholder="Brief description of the bond issue..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  {/* Rates & Yield Tab */}
                  <TabsContent value="rates" className="space-y-6 mt-0">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Percent className="w-4 h-4 text-primary" />
                          Coupon & Yield Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Coupon Rate (%) *</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 8.50"
                              value={formData.couponRate || ""}
                              onChange={(e) => setFormData({...formData, couponRate: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Current Yield (%)</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 8.75"
                              value={formData.currentYield || ""}
                              onChange={(e) => setFormData({...formData, currentYield: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">YTM (%) *</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 9.00"
                              value={formData.ytm || ""}
                              onChange={(e) => setFormData({...formData, ytm: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Coupon Type</Label>
                            <Select value={formData.couponType} onValueChange={(v) => setFormData({...formData, couponType: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Rate</SelectItem>
                                <SelectItem value="floating">Floating Rate</SelectItem>
                                <SelectItem value="zero">Zero Coupon</SelectItem>
                                <SelectItem value="step-up">Step-Up</SelectItem>
                                <SelectItem value="step-down">Step-Down</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {formData.couponType === "floating" && (
                          <div className="grid grid-cols-2 gap-4 p-3 bg-background rounded-lg border">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Benchmark Rate</Label>
                              <Select value={formData.floatingRateBenchmark} onValueChange={(v) => setFormData({...formData, floatingRateBenchmark: v})}>
                                <SelectTrigger><SelectValue placeholder="Select benchmark" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="repo">RBI Repo Rate</SelectItem>
                                  <SelectItem value="tbill">T-Bill Rate</SelectItem>
                                  <SelectItem value="mibor">MIBOR</SelectItem>
                                  <SelectItem value="gsec">G-Sec Yield</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Spread (bps)</Label>
                              <Input 
                                type="number" 
                                placeholder="e.g., 150"
                                value={formData.spread || ""}
                                onChange={(e) => setFormData({...formData, spread: Number(e.target.value)})}
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-blue-600" />
                          Duration & Risk Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Modified Duration</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 3.50"
                              value={formData.modifiedDuration || ""}
                              onChange={(e) => setFormData({...formData, modifiedDuration: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Macaulay Duration</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 3.75"
                              value={formData.macaulayDuration || ""}
                              onChange={(e) => setFormData({...formData, macaulayDuration: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Credit Rating *</Label>
                            <Select value={formData.rating} onValueChange={(v) => setFormData({...formData, rating: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AAA">AAA (Highest Safety)</SelectItem>
                                <SelectItem value="AA+">AA+ (High Safety)</SelectItem>
                                <SelectItem value="AA">AA (High Safety)</SelectItem>
                                <SelectItem value="AA-">AA- (High Safety)</SelectItem>
                                <SelectItem value="A+">A+ (Adequate Safety)</SelectItem>
                                <SelectItem value="A">A (Adequate Safety)</SelectItem>
                                <SelectItem value="BBB+">BBB+ (Moderate Safety)</SelectItem>
                                <SelectItem value="BBB">BBB (Moderate Safety)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Rating Agency</Label>
                            <Select value={formData.ratingAgency} onValueChange={(v) => setFormData({...formData, ratingAgency: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CRISIL">CRISIL</SelectItem>
                                <SelectItem value="ICRA">ICRA</SelectItem>
                                <SelectItem value="CARE">CARE</SelectItem>
                                <SelectItem value="IndiaRatings">India Ratings</SelectItem>
                                <SelectItem value="Brickwork">Brickwork</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-green-600" />
                          Pricing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Price per Unit (₹)</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 1025.50"
                              value={formData.pricePerUnit || ""}
                              onChange={(e) => setFormData({...formData, pricePerUnit: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Clean Price (₹)</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 1020.00"
                              value={formData.cleanPrice || ""}
                              onChange={(e) => setFormData({...formData, cleanPrice: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Accrued Interest (₹)</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 5.50"
                              value={formData.accruedInterest || ""}
                              onChange={(e) => setFormData({...formData, accruedInterest: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Dirty Price (₹)</Label>
                            <Input 
                              type="number" 
                              step="0.01" 
                              placeholder="e.g., 1025.50"
                              value={formData.dirtyPrice || ""}
                              onChange={(e) => setFormData({...formData, dirtyPrice: Number(e.target.value)})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200 bg-amber-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-amber-600" />
                          Investment Limits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Min Investment (₹)</Label>
                            <Input 
                              type="number" 
                              value={formData.minInvestment}
                              onChange={(e) => setFormData({...formData, minInvestment: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Max Investment (₹)</Label>
                            <Input 
                              type="number" 
                              value={formData.maxInvestment}
                              onChange={(e) => setFormData({...formData, maxInvestment: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Lot Size (Units)</Label>
                            <Input 
                              type="number" 
                              value={formData.lotSize}
                              onChange={(e) => setFormData({...formData, lotSize: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Incremental Amount (₹)</Label>
                            <Input 
                              type="number" 
                              value={formData.incrementalAmount}
                              onChange={(e) => setFormData({...formData, incrementalAmount: Number(e.target.value)})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Dates Tab */}
                  <TabsContent value="dates" className="space-y-6 mt-0">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Key Dates
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Issue Date *</Label>
                            <Input 
                              type="date" 
                              value={formData.issueDate}
                              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Allotment Date</Label>
                            <Input 
                              type="date" 
                              value={formData.allotmentDate}
                              onChange={(e) => setFormData({...formData, allotmentDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Maturity Date *</Label>
                            <Input 
                              type="date" 
                              value={formData.maturityDate}
                              onChange={(e) => setFormData({...formData, maturityDate: e.target.value})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Coupon Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Coupon Frequency *</Label>
                            <Select value={formData.couponFrequency} onValueChange={(v) => setFormData({...formData, couponFrequency: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                                <SelectItem value="annual">Annual</SelectItem>
                                <SelectItem value="maturity">At Maturity</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Record Date</Label>
                            <Input 
                              type="date" 
                              value={formData.recordDate}
                              onChange={(e) => setFormData({...formData, recordDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Next Coupon Date</Label>
                            <Input 
                              type="date" 
                              value={formData.nextCouponDate}
                              onChange={(e) => setFormData({...formData, nextCouponDate: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Day Count Convention</Label>
                            <Select value={formData.dayCountConvention} onValueChange={(v) => setFormData({...formData, dayCountConvention: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="actual/365">Actual/365</SelectItem>
                                <SelectItem value="actual/360">Actual/360</SelectItem>
                                <SelectItem value="30/360">30/360</SelectItem>
                                <SelectItem value="actual/actual">Actual/Actual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Coupon Payment Dates</Label>
                            <Input 
                              placeholder="e.g., 15th Jan, 15th Jul"
                              value={formData.couponPaymentDates}
                              onChange={(e) => setFormData({...formData, couponPaymentDates: e.target.value})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <ArrowUpDown className="w-4 h-4 text-purple-600" />
                          Call/Put Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Callable Bond</Label>
                              <Switch 
                                checked={formData.isCallable}
                                onCheckedChange={(v) => setFormData({...formData, isCallable: v})}
                              />
                            </div>
                            {formData.isCallable && (
                              <>
                                <div className="space-y-2">
                                  <Label className="text-xs text-muted-foreground">Call Date</Label>
                                  <Input 
                                    type="date" 
                                    value={formData.callDate}
                                    onChange={(e) => setFormData({...formData, callDate: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Call Price (%)</Label>
                                    <Input 
                                      type="number" 
                                      step="0.01"
                                      value={formData.callPrice}
                                      onChange={(e) => setFormData({...formData, callPrice: Number(e.target.value)})}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Protection (Yrs)</Label>
                                    <Input 
                                      type="number" 
                                      value={formData.callProtectionPeriod}
                                      onChange={(e) => setFormData({...formData, callProtectionPeriod: Number(e.target.value)})}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Puttable Bond</Label>
                              <Switch 
                                checked={formData.isPuttable}
                                onCheckedChange={(v) => setFormData({...formData, isPuttable: v})}
                              />
                            </div>
                            {formData.isPuttable && (
                              <>
                                <div className="space-y-2">
                                  <Label className="text-xs text-muted-foreground">Put Date</Label>
                                  <Input 
                                    type="date" 
                                    value={formData.putDate}
                                    onChange={(e) => setFormData({...formData, putDate: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Put Price (%)</Label>
                                    <Input 
                                      type="number" 
                                      step="0.01"
                                      value={formData.putPrice}
                                      onChange={(e) => setFormData({...formData, putPrice: Number(e.target.value)})}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Protection (Yrs)</Label>
                                    <Input 
                                      type="number" 
                                      value={formData.putProtectionPeriod}
                                      onChange={(e) => setFormData({...formData, putProtectionPeriod: Number(e.target.value)})}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Eligibility Tab */}
                  <TabsContent value="eligibility" className="space-y-6 mt-0">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Investor Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { key: "nriAllowed", label: "NRI Investors", icon: Globe },
                            { key: "fiAllowed", label: "Foreign Institutional", icon: Building2 },
                            { key: "hufAllowed", label: "HUF", icon: Users },
                            { key: "corporateAllowed", label: "Corporates", icon: Building2 },
                            { key: "trustAllowed", label: "Trusts", icon: Scale },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center space-x-3 p-3 border rounded-lg bg-background hover:bg-muted/50 transition-colors">
                              <Checkbox 
                                id={item.key}
                                checked={formData[item.key as keyof BondFormData] as boolean}
                                onCheckedChange={(checked) => setFormData({...formData, [item.key]: checked})}
                              />
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                <Label htmlFor={item.key} className="text-sm cursor-pointer">{item.label}</Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          Age Criteria
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Minimum Age</Label>
                            <Input 
                              type="number" 
                              value={formData.minAge}
                              onChange={(e) => setFormData({...formData, minAge: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Maximum Age</Label>
                            <Input 
                              type="number" 
                              value={formData.maxAge}
                              onChange={(e) => setFormData({...formData, maxAge: Number(e.target.value)})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200 bg-amber-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-600" />
                          Security & Collateral
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Security Type</Label>
                            <Select value={formData.securityType} onValueChange={(v) => setFormData({...formData, securityType: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="secured">Secured</SelectItem>
                                <SelectItem value="unsecured">Unsecured</SelectItem>
                                <SelectItem value="senior-secured">Senior Secured</SelectItem>
                                <SelectItem value="subordinated">Subordinated</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Guarantor (if any)</Label>
                            <Input 
                              placeholder="e.g., Government of India"
                              value={formData.guarantorName}
                              onChange={(e) => setFormData({...formData, guarantorName: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Collateral Details</Label>
                          <Textarea 
                            placeholder="Describe collateral/security details..."
                            value={formData.collateralDetails}
                            onChange={(e) => setFormData({...formData, collateralDetails: e.target.value})}
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Covenants</Label>
                          <Textarea 
                            placeholder="Key covenants and conditions..."
                            value={formData.covenants}
                            onChange={(e) => setFormData({...formData, covenants: e.target.value})}
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tax Tab */}
                  <TabsContent value="tax" className="space-y-6 mt-0">
                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-600" />
                          Tax Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Tax-Free Bond</p>
                              <p className="text-sm text-muted-foreground">Interest income is exempt from tax</p>
                            </div>
                          </div>
                          <Switch 
                            checked={formData.isTaxFree}
                            onCheckedChange={(v) => setFormData({...formData, isTaxFree: v})}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Tax Category</Label>
                            <Select value={formData.taxCategory} onValueChange={(v) => setFormData({...formData, taxCategory: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="taxable">Taxable</SelectItem>
                                <SelectItem value="tax-free">Tax Free</SelectItem>
                                <SelectItem value="tax-saving">Tax Saving (80CCF)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Capital Gains Tax</Label>
                            <Select value={formData.capitalGainsTax} onValueChange={(v) => setFormData({...formData, capitalGainsTax: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ltcg">LTCG (Listed)</SelectItem>
                                <SelectItem value="stcg">STCG</SelectItem>
                                <SelectItem value="exempt">Exempt</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Gavel className="w-4 h-4 text-blue-600" />
                          TDS Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Percent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">TDS Applicable</p>
                              <p className="text-sm text-muted-foreground">Tax deducted at source on interest</p>
                            </div>
                          </div>
                          <Switch 
                            checked={formData.tdsApplicable}
                            onCheckedChange={(v) => setFormData({...formData, tdsApplicable: v})}
                          />
                        </div>

                        {formData.tdsApplicable && (
                          <div className="p-4 border rounded-lg bg-background">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">TDS Rate (%)</Label>
                              <Input 
                                type="number" 
                                step="0.1"
                                value={formData.tdsRate}
                                onChange={(e) => setFormData({...formData, tdsRate: Number(e.target.value)})}
                              />
                              <p className="text-xs text-muted-foreground">Standard TDS rate is 10% for residents</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-600" />
                          Tax Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <FileText className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">Section 80CCF Benefit</p>
                              <p className="text-sm text-muted-foreground">Additional ₹20,000 deduction for infrastructure bonds</p>
                            </div>
                          </div>
                          <Switch 
                            checked={formData.section80CCF}
                            onCheckedChange={(v) => setFormData({...formData, section80CCF: v})}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6 mt-0">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Settings className="w-4 h-4 text-primary" />
                          Bond Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Add Custom Feature</Label>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="Enter feature..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  addFeature((e.target as HTMLInputElement).value);
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={(e) => {
                                const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                                addFeature(input.value);
                                input.value = '';
                              }}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {formData.features.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                                {feature}
                                <button 
                                  type="button"
                                  onClick={() => removeFeature(feature)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="pt-4 border-t">
                          <Label className="text-sm font-medium mb-3 block">Quick Add Suggestions</Label>
                          <div className="flex flex-wrap gap-2">
                            {suggestedFeatures.filter(f => !formData.features.includes(f)).map((feature) => (
                              <button
                                key={feature}
                                type="button"
                                onClick={() => addFeature(feature)}
                                className="px-3 py-1.5 text-xs rounded-full border border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/5 transition-colors"
                              >
                                + {feature}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-200 bg-amber-50/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Risk Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Risk Level</Label>
                            <Select value={formData.riskLevel} onValueChange={(v) => setFormData({...formData, riskLevel: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="very-low">Very Low</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Rating Outlook</Label>
                            <Select value={formData.ratingOutlook} onValueChange={(v) => setFormData({...formData, ratingOutlook: v})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="positive">Positive</SelectItem>
                                <SelectItem value="stable">Stable</SelectItem>
                                <SelectItem value="negative">Negative</SelectItem>
                                <SelectItem value="watch">Under Watch</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <Info className="w-4 h-4 inline mr-1" />
                    Fields marked with * are required
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => { setIsAddModalOpen(false); setActiveTab("basic"); }}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddBond} className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-1" /> Add Bond
                    </Button>
                  </div>
                </div>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by issuer or ISIN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Rating:</span>
                <div className="flex gap-1">
                  {ratings.map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(rating)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        ratingFilter === rating
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {rating === "all" ? "All" : rating}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bondTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredBonds.map((bond) => (
          <Card key={bond.id} className="finease-card hover:shadow-lg transition-all group overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-secondary/5 to-primary/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl border">
                      {bond.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-sm line-clamp-1">{bond.issuer}</h3>
                      <p className="text-xs text-muted-foreground">{bond.isin || "INE001A07XY8"}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    bond.rating.includes("AAA") ? "bg-green-100 text-green-700 border-green-200" :
                    bond.rating.includes("AA") ? "bg-blue-100 text-blue-700 border-blue-200" :
                    "bg-amber-100 text-amber-700 border-amber-200"
                  } border`}>
                    {bond.rating}
                  </Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(bond.maturityDate)}
                  </Badge>
                  {(bond.bondType === "Tax-Free" || bond.bondType === "Government") && (
                    <Badge className="bg-green-100 text-green-700 text-xs">Tax Free</Badge>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">
                    {bond.bondType}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-primary/5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Coupon</p>
                    <p className="font-bold text-primary text-lg">{bond.couponRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">YTM</p>
                    <p className="font-bold text-secondary text-lg">{bond.ytm}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Yield</p>
                    <p className="font-semibold text-secondary">{bond.currentYield}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Min Investment</p>
                    <p className="font-semibold text-secondary">{formatCurrency(bond.minInvestment)}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewBond(bond)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(bond.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => handleViewBond(bond)}>
                  Details <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBonds.length === 0 && (
        <Card className="finease-card">
          <CardContent className="p-12 text-center">
            <Landmark className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="font-semibold text-secondary mb-2">No bonds found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or add a new bond</p>
          </CardContent>
        </Card>
      )}

      {/* View Bond Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                {selectedBond?.logo}
              </div>
              {selectedBond?.issuer}
            </DialogTitle>
            <DialogDescription>
              ISIN: {selectedBond?.isin || "INE001A07XY8"} | {selectedBond?.type || "Corporate"} Bond
            </DialogDescription>
          </DialogHeader>
          
          {selectedBond && (
            <div className="space-y-6 py-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <p className="text-sm text-muted-foreground">Coupon Rate</p>
                  <p className="text-2xl font-bold text-primary">{selectedBond.couponRate}%</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/10 text-center">
                  <p className="text-sm text-muted-foreground">YTM</p>
                  <p className="text-2xl font-bold text-secondary">{selectedBond.ytm}%</p>
                </div>
                <div className="p-4 rounded-xl bg-green-100 text-center">
                  <p className="text-sm text-muted-foreground">Credit Rating</p>
                  <p className="text-2xl font-bold text-green-700">{selectedBond.rating}</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-100 text-center">
                  <p className="text-sm text-muted-foreground">Current Yield</p>
                  <p className="text-2xl font-bold text-amber-700">{selectedBond.currentYield}%</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Dates & Tenure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maturity Date</span>
                      <span className="font-medium">{formatDate(selectedBond.maturityDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coupon Frequency</span>
                      <span className="font-medium">Semi-Annual</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Day Count</span>
                      <span className="font-medium">Actual/365</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" /> Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Investment</span>
                      <span className="font-medium">{formatCurrency(selectedBond.minInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Face Value</span>
                      <span className="font-medium">₹1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lot Size</span>
                      <span className="font-medium">1 Unit</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> Tax & Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Status</span>
                      <Badge variant={selectedBond.taxFree ? "default" : "secondary"} className="text-xs">
                        {selectedBond.taxFree ? "Tax Free" : "Taxable"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TDS Rate</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listing</span>
                      <span className="font-medium">NSE, BSE</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" /> Eligibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NRI Allowed</span>
                      <Badge variant="outline" className="text-xs">Yes</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Corporate</span>
                      <Badge variant="outline" className="text-xs">Yes</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Age</span>
                      <span className="font-medium">18 Years</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" /> Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(selectedBond.features || ["Secured Bond", "Semi-Annual Interest", "Listed on NSE/BSE"]).map((feature: string, i: number) => (
                      <Badge key={i} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBondManagement;
