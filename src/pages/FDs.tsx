import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fdProviders } from "@/data/fdData";
import { 
  ChevronRight, PiggyBank, Shield, AlertCircle, Search, Filter, 
  TrendingUp, Star, Clock, IndianRupee, ArrowUpDown, X 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ProductLayout from "@/components/ProductLayout";

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
  const types = ["all", "bank", "nbfc", "small finance"];

  const stats = [
    { label: "Highest Rate", value: `${Math.max(...fdProviders.map(f => f.interestRate))}%`, icon: TrendingUp, color: "text-green-600" },
    { label: "Top Providers", value: fdProviders.length, icon: Star, color: "text-amber-600" },
    { label: "Min Deposit", value: `₹${Math.min(...fdProviders.map(f => f.minDeposit)).toLocaleString()}`, icon: IndianRupee, color: "text-blue-600" },
    { label: "Max Tenure", value: "10 Years", icon: Clock, color: "text-purple-600" },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setTenureFilter("all");
    setTypeFilter("all");
    setRateRange([5, 10]);
    setSortBy("rate-high");
    setShowSeniorRates(false);
  };

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <PiggyBank className="w-6 h-6" />
                  <span className="text-white/80 font-medium">Fixed Deposits</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
                  Earn upto <span className="text-accent">9.10%</span> annually
                </h1>
                <p className="text-white/80 mb-4">
                  High returns with maximum security! Invest in FDs insured by DICGC up to ₹5 lakh per depositor.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-0">
                    <Shield className="w-3 h-3 mr-1" />
                    DICGC Insured
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    RBI Regulated
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    Flexible Tenure
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search banks, NBFCs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-3">
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
                  {(tenureFilter !== "all" || typeFilter !== "all" || showSeniorRates) && (
                    <Badge className="ml-1 bg-primary/20 text-primary">Active</Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Tenure Filter */}
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

                  {/* Type Filter */}
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

                  {/* Rate Range */}
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

                  {/* Senior Citizen Toggle */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Customer Type</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Switch checked={showSeniorRates} onCheckedChange={setShowSeniorRates} />
                      <span className="text-sm">Show Senior Citizen Rates</span>
                    </div>
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
            Showing <span className="font-medium text-secondary">{filteredFDs.length}</span> FD options
          </p>
          {showSeniorRates && (
            <Badge className="bg-accent/10 text-accent">Showing Senior Citizen Rates</Badge>
          )}
        </div>

        {/* FD List */}
        <div className="space-y-3">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`} className="block">
              <Card className="hover:shadow-md hover:border-primary/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                      {fd.logo}
                    </div>
                    
                    {/* Badges */}
                    <div className="flex flex-col gap-1.5 min-w-[100px]">
                      <Badge className="px-2.5 py-1 text-xs font-bold bg-green-100 text-green-700 w-fit">
                        <Shield className="w-3 h-3 mr-1" />
                        DICGC
                      </Badge>
                      <Badge variant="outline" className="text-xs w-fit">
                        {fd.type}
                      </Badge>
                    </div>

                    {/* Name */}
                    <div className="min-w-[180px] flex-shrink-0">
                      <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                      <p className="text-xs text-muted-foreground">{fd.regulatedBy}</p>
                    </div>

                    {/* Interest Rate */}
                    <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 text-center min-w-[100px]">
                      <p className="text-xs text-muted-foreground">Interest</p>
                      <p className="text-xl font-bold text-primary">
                        {showSeniorRates ? fd.seniorCitizenRate : fd.interestRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">p.a.</p>
                    </div>

                    {/* Senior Citizen Rate */}
                    {!showSeniorRates && (
                      <div className="flex-shrink-0 text-center min-w-[80px]">
                        <p className="text-xs text-muted-foreground">Sr. Citizen</p>
                        <p className="text-lg font-bold text-accent">{fd.seniorCitizenRate}%</p>
                      </div>
                    )}

                    {/* Tenure */}
                    <div className="flex-shrink-0 px-3 py-2 rounded-lg border border-border bg-muted/30 text-center min-w-[80px]">
                      <p className="text-xs text-muted-foreground">Max Tenure</p>
                      <p className="text-sm font-bold text-secondary">{fd.maxTenure}</p>
                    </div>

                    {/* Min Deposit */}
                    <div className="flex-shrink-0 text-center min-w-[80px]">
                      <p className="text-xs text-muted-foreground">Min Deposit</p>
                      <p className="text-sm font-bold text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                    </div>

                    {/* Features Preview */}
                    <div className="hidden xl:flex flex-wrap gap-1 flex-1 justify-end">
                      {fd.features.slice(0, 2).map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-muted/50">
                          {feature.length > 25 ? feature.slice(0, 25) + "..." : feature}
                        </Badge>
                      ))}
                    </div>

                    {/* View Details */}
                    <Button variant="outline" size="sm" className="flex-shrink-0 ml-auto gap-1">
                      View <ChevronRight className="w-4 h-4" />
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
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-secondary mb-2">RBI & DICGC Compliance</h3>
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