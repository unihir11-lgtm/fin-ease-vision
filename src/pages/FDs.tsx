import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fdProviders } from "@/data/fdData";
import { 
  ChevronRight, PiggyBank, Shield, AlertCircle, Search, Filter, 
  TrendingUp, Star, Clock, IndianRupee, ArrowUpDown, X, Calculator,
  Award, Eye, Percent, Building2, CheckCircle2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ProductLayout from "@/components/ProductLayout";
import { ProviderIcon, getIconColors } from "@/components/icons/ProviderIcon";
import { CreditCard, UserCheck, Video, Wallet2 } from "lucide-react";

const FDs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenureFilter, setTenureFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rateRange, setRateRange] = useState([5, 10]);
  const [sortBy, setSortBy] = useState("rate-high");
  const [showSeniorRates, setShowSeniorRates] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredFDs = fdProviders
    .filter((fd) => {
      const matchesSearch = fd.bankName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTenure = tenureFilter === "all" || fd.maxTenure.includes(tenureFilter);
      const matchesType = typeFilter === "all" || fd.type.toLowerCase().includes(typeFilter.toLowerCase());
      const rate = showSeniorRates ? fd.seniorCitizenRate : fd.interestRate;
      const matchesRate = rate >= rateRange[0] && rate <= rateRange[1];
      return matchesSearch && matchesTenure && matchesType && matchesRate;
    })
    .sort((a, b) => {
      const rateA = showSeniorRates ? a.seniorCitizenRate : a.interestRate;
      const rateB = showSeniorRates ? b.seniorCitizenRate : b.interestRate;
      switch (sortBy) {
        case "rate-high": return rateB - rateA;
        case "rate-low": return rateA - rateB;
        case "min-deposit": return a.minDeposit - b.minDeposit;
        case "name": return a.bankName.localeCompare(b.bankName);
        default: return 0;
      }
    });

  const tenures = ["all", "1 Year", "3 Years", "5 Years", "10 Years"];

  const stats = [
    { label: "Highest Rate", value: `${Math.max(...fdProviders.map(f => f.interestRate))}%`, icon: TrendingUp, bgColor: "bg-green-50", textColor: "text-green-600" },
    { label: "Top Providers", value: fdProviders.length, icon: Star, bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { label: "Min Deposit", value: `₹${Math.min(...fdProviders.map(f => f.minDeposit)).toLocaleString()}`, icon: IndianRupee, bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { label: "Max Tenure", value: "10 Years", icon: Clock, bgColor: "bg-purple-50", textColor: "text-purple-600" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setTenureFilter("all");
    setTypeFilter("all");
    setRateRange([5, 10]);
    setSortBy("rate-high");
    setShowSeniorRates(false);
  };

  // Featured FD (highest rate)
  const featuredFD = [...fdProviders].sort((a, b) => b.interestRate - a.interestRate)[0];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#0a344a] via-[#175d80] to-[#1dab91] rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Fixed Deposits</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display leading-tight">
                Earn upto <span className="text-[#1dab91]">9.10%</span> annually
              </h1>
              <p className="text-white/80 text-lg mb-6">
                High returns with maximum security! Invest in FDs insured by DICGC up to ₹5 lakh per depositor.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  DICGC Insured
                </Badge>
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  RBI Regulated
                </Badge>
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  Flexible Tenure
                </Badge>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured FD */}
        {featuredFD && (
          <Card className="mb-8 border-2 border-[#1dab91]/30 bg-gradient-to-r from-[#1dab91]/5 to-transparent overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-[#1dab91] text-white border-0 gap-1">
                      <Award className="w-3 h-3" />
                      Best Rate
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 border-0 gap-1">
                      <Shield className="w-3 h-3" />
                      DICGC Insured
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border border-border/50 ${getIconColors(featuredFD.type).bg}`}>
                      <ProviderIcon iconType={featuredFD.iconType} className={getIconColors(featuredFD.type).text} size={36} />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#0a344a] mb-1">{featuredFD.bankName}</h2>
                      <p className="text-muted-foreground">{featuredFD.type} • {featuredFD.regulatedBy}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Interest Rate</p>
                      <p className="text-xl font-bold text-green-600">{featuredFD.interestRate}%</p>
                    </div>
                    <div className="bg-[#1dab91]/10 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sr. Citizen Rate</p>
                      <p className="text-xl font-bold text-[#1dab91]">{featuredFD.seniorCitizenRate}%</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Max Tenure</p>
                      <p className="text-xl font-bold text-[#175d80]">{featuredFD.maxTenure}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Min Deposit</p>
                      <p className="text-xl font-bold text-[#175d80]">₹{featuredFD.minDeposit.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/fds/${featuredFD.id}`}>
                      <Button size="lg" className="bg-[#1dab91] hover:bg-[#18937c] text-white gap-2">
                        Invest Now <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/fds/${featuredFD.id}`}>
                      <Button size="lg" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </Button>
                    </Link>
                    <Link to="/calculators">
                      <Button size="lg" variant="outline" className="gap-2">
                        <Calculator className="w-4 h-4" /> Calculate Returns
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/3 bg-gradient-to-br from-[#0a344a] to-[#175d80] p-6 lg:p-8 text-white flex flex-col justify-center">
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-2">Key Features</p>
                    <div className="space-y-4 mt-4">
                      {featuredFD.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-left">
                          <CheckCircle2 className="w-5 h-5 text-[#1dab91] flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search banks, NBFCs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  <Switch checked={showSeniorRates} onCheckedChange={setShowSeniorRates} id="senior-toggle" />
                  <Label htmlFor="senior-toggle" className="text-sm cursor-pointer">Senior Citizen</Label>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rate-high">Highest Rate</SelectItem>
                    <SelectItem value="rate-low">Lowest Rate</SelectItem>
                    <SelectItem value="min-deposit">Min Deposit</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {(tenureFilter !== "all" || typeFilter !== "all") && (
                    <Badge className="ml-1 bg-[#1dab91]/20 text-[#1dab91]">Active</Badge>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Max Tenure</Label>
                    <Select value={tenureFilter} onValueChange={setTenureFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenure" />
                      </SelectTrigger>
                      <SelectContent>
                        {tenures.map((tenure) => (
                          <SelectItem key={tenure} value={tenure}>
                            {tenure === "all" ? "All Tenures" : tenure}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Provider Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="bank">Banks</SelectItem>
                        <SelectItem value="nbfc">NBFCs</SelectItem>
                        <SelectItem value="small finance">Small Finance Banks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Interest Rate: {rateRange[0]}% - {rateRange[1]}%</Label>
                    <Slider
                      value={rateRange}
                      onValueChange={setRateRange}
                      min={5}
                      max={10}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                    <X className="w-4 h-4" /> Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-[#0a344a]">{filteredFDs.length}</span> FD options
          </p>
          {showSeniorRates && (
            <Badge className="bg-[#1dab91]/10 text-[#1dab91]">Showing Senior Citizen Rates</Badge>
          )}
        </div>

        {/* FD Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`} className="block group">
              <Card className="h-full border-border/50 hover:border-[#1dab91]/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-5 border-b border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center border border-border/50 group-hover:scale-105 transition-transform ${getIconColors(fd.type).bg} overflow-hidden p-2`}>
                          <ProviderIcon iconType={fd.iconType} logo={fd.logo} name={fd.bankName} className={getIconColors(fd.type).text} size={40} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            <Badge className="bg-green-100 text-green-700 text-xs gap-1">
                              <Shield className="w-3 h-3" />
                              DICGC
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {fd.type}
                            </Badge>
                            {!fd.accountRequired && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs border border-blue-200">
                                <Wallet2 className="w-3 h-3 mr-1" />
                                No Account
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-[#0a344a] group-hover:text-[#1dab91] transition-colors line-clamp-1">{fd.bankName}</h3>
                          <p className="text-sm text-muted-foreground">{fd.regulatedBy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {showSeniorRates ? fd.seniorCitizenRate : fd.interestRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">p.a.</p>
                      </div>
                      {!showSeniorRates && (
                        <div className="text-center p-4 bg-[#1dab91]/10 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Sr. Citizen</p>
                          <p className="text-2xl font-bold text-[#1dab91]">{fd.seniorCitizenRate}%</p>
                          <p className="text-xs text-muted-foreground">p.a.</p>
                        </div>
                      )}
                      {showSeniorRates && (
                        <div className="text-center p-4 bg-muted/30 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Regular Rate</p>
                          <p className="text-2xl font-bold text-[#175d80]">{fd.interestRate}%</p>
                          <p className="text-xs text-muted-foreground">p.a.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Min Deposit</p>
                        <p className="text-xl font-bold text-[#0a344a]">₹{fd.minDeposit.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Max Tenure</p>
                        <p className="text-lg font-bold text-[#175d80]">{fd.maxTenure}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs bg-muted/50">
                        <Video className="w-3 h-3 mr-1" />
                        {fd.kycRequired}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-muted/50">
                        <Clock className="w-3 h-3 mr-1" />
                        {fd.processingTime}
                      </Badge>
                      {fd.loanAgainstFD && (
                        <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">
                          <CreditCard className="w-3 h-3 mr-1" />
                          {fd.loanPercentage}% Loan
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full gap-2" variant="outline">
                      View Details <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredFDs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <PiggyBank className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No FDs found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        )}

        {/* Compliance Disclaimer */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#0a344a] mb-2">RBI & DICGC Compliance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Deposits are insured by Deposit Insurance and Credit Guarantee Corporation (DICGC) up to ₹5 lakh per depositor per bank.</li>
                  <li>• Interest rates are subject to change as per bank/NBFC policies and RBI guidelines.</li>
                  <li>• Premature withdrawal may attract penalty as per the terms of the FD.</li>
                  <li>• TDS is applicable on interest income as per Income Tax Act provisions.</li>
                  <li>• Past performance is not indicative of future returns.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductLayout>
  );
};

export default FDs;
