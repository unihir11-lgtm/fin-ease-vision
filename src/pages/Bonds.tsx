import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bondsData } from "@/data/bondData";
import { 
  ChevronRight, Landmark, AlertCircle, Search, Filter, 
  TrendingUp, Star, Shield, IndianRupee, ArrowUpDown, X, Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ProductLayout from "@/components/ProductLayout";

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [yieldRange, setYieldRange] = useState([5, 15]);
  const [sortBy, setSortBy] = useState("yield-high");
  const [showFilters, setShowFilters] = useState(false);
  const [showTaxFree, setShowTaxFree] = useState(false);

  const filteredBonds = bondsData
    .filter((bond) => {
      const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bond.isin.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === "all" || bond.rating.includes(ratingFilter);
      const matchesType = typeFilter === "all" || bond.bondType.toLowerCase() === typeFilter.toLowerCase();
      const matchesYield = bond.currentYield >= yieldRange[0] && bond.currentYield <= yieldRange[1];
      const matchesTaxFree = !showTaxFree || bond.taxBenefits.includes("tax-free");
      return matchesSearch && matchesRating && matchesType && matchesYield && matchesTaxFree;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "yield-high": return b.currentYield - a.currentYield;
        case "yield-low": return a.currentYield - b.currentYield;
        case "rating": return b.rating.localeCompare(a.rating);
        case "maturity": return new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime();
        case "min-investment": return a.minInvestment - b.minInvestment;
        default: return 0;
      }
    });

  const ratings = ["all", "AAA", "AA+", "AA", "A+"];
  const bondTypes = ["all", "Corporate", "Government", "PSU", "Tax-Free"];

  const stats = [
    { label: "Highest Yield", value: `${Math.max(...bondsData.map(b => b.currentYield))}%`, icon: TrendingUp, color: "text-green-600" },
    { label: "Bonds Available", value: bondsData.length, icon: Star, color: "text-amber-600" },
    { label: "AAA Rated", value: bondsData.filter(b => b.rating.includes("AAA")).length, icon: Shield, color: "text-blue-600" },
    { label: "Min Investment", value: `₹${Math.min(...bondsData.map(b => b.minInvestment)).toLocaleString()}`, icon: IndianRupee, color: "text-purple-600" },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-IN", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return { day, month, year, full: `${day} ${month} '${year}` };
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setTypeFilter("all");
    setYieldRange([5, 15]);
    setSortBy("yield-high");
    setShowTaxFree(false);
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
                  <Landmark className="w-6 h-6" />
                  <span className="text-white/80 font-medium">Corporate & Government Bonds</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">
                  Invest in <span className="text-accent">Bonds</span>
                </h1>
                <p className="text-white/80 mb-4">
                  Secure, fixed-income investments with predictable returns. Diversify your portfolio with SEBI-compliant rated bonds.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-0">
                    <Shield className="w-3 h-3 mr-1" />
                    SEBI Compliant
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    Listed on NSE/BSE
                  </Badge>
                  <Badge className="bg-white/20 text-white border-0">
                    Fixed Income
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
                  placeholder="Search bonds by issuer, ISIN..."
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
                    <SelectItem value="yield-high">Highest Yield</SelectItem>
                    <SelectItem value="yield-low">Lowest Yield</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                    <SelectItem value="maturity">Nearest Maturity</SelectItem>
                    <SelectItem value="min-investment">Min Investment</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {(ratingFilter !== "all" || typeFilter !== "all" || showTaxFree) && (
                    <Badge className="ml-1 bg-primary/20 text-primary">Active</Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Credit Rating</Label>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        {ratings.map((rating) => (
                          <SelectItem key={rating} value={rating}>
                            {rating === "all" ? "All Ratings" : rating}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Bond Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bondTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type === "all" ? "All Types" : type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Yield Range */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Yield Range: {yieldRange[0]}% - {yieldRange[1]}%</Label>
                    <Slider
                      value={yieldRange}
                      onValueChange={setYieldRange}
                      min={5}
                      max={15}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  {/* Tax Free Toggle */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Special Filters</Label>
                    <div className="flex items-center space-x-3 mt-2">
                      <Checkbox 
                        id="taxfree" 
                        checked={showTaxFree}
                        onCheckedChange={(v) => setShowTaxFree(v as boolean)}
                      />
                      <label htmlFor="taxfree" className="text-sm cursor-pointer">Tax-Free Bonds Only</label>
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
            Showing <span className="font-medium text-secondary">{filteredBonds.length}</span> bonds
          </p>
        </div>

        {/* Bonds List */}
        <div className="space-y-3">
          {filteredBonds.map((bond) => {
            const maturity = formatDate(bond.maturityDate);
            return (
              <Link key={bond.id} to={`/bonds/${bond.id}`} className="block">
                <Card className="hover:shadow-md hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                        {bond.logo}
                      </div>
                      
                      {/* Rating & Type */}
                      <div className="flex flex-col gap-1.5 min-w-[80px]">
                        <Badge className={`px-2.5 py-1 text-xs font-bold w-fit ${
                          bond.rating.includes("AAA") ? "bg-green-100 text-green-700" :
                          bond.rating.includes("AA") ? "bg-blue-100 text-blue-700" :
                          "bg-amber-100 text-amber-700"
                        }`}>
                          {bond.rating}
                        </Badge>
                        <Badge variant="outline" className="text-xs w-fit">
                          {bond.bondType}
                        </Badge>
                      </div>

                      {/* Name */}
                      <div className="min-w-[160px] flex-1">
                        <h3 className="font-bold text-secondary">{bond.issuer}</h3>
                        <p className="text-xs text-muted-foreground">{bond.isin} • {bond.ratingAgency}</p>
                      </div>

                      {/* Maturity Date */}
                      <div className="flex-shrink-0 px-3 py-2 rounded-xl border border-primary/20 bg-primary/5 text-center min-w-[90px]">
                        <p className="text-xs text-muted-foreground">Maturity</p>
                        <p className="text-sm font-bold text-primary">{maturity.full}</p>
                      </div>

                      {/* Coupon Rate */}
                      <div className="flex-shrink-0 text-center min-w-[80px]">
                        <p className="text-xs text-muted-foreground">Coupon</p>
                        <p className="text-lg font-bold text-secondary">{bond.couponRate}%</p>
                      </div>

                      {/* Current Yield */}
                      <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 text-center min-w-[90px]">
                        <p className="text-xs text-muted-foreground">Yield</p>
                        <p className="text-xl font-bold text-green-600">{bond.currentYield}%</p>
                      </div>

                      {/* YTM */}
                      <div className="flex-shrink-0 text-center min-w-[60px]">
                        <p className="text-xs text-muted-foreground">YTM</p>
                        <p className="text-sm font-bold text-secondary">{bond.ytm}%</p>
                      </div>

                      {/* Min Investment */}
                      <div className="flex-shrink-0 text-center min-w-[80px]">
                        <p className="text-xs text-muted-foreground">Min Invest</p>
                        <p className="text-sm font-bold text-secondary">₹{bond.minInvestment.toLocaleString()}</p>
                      </div>

                      {/* Payout Frequency */}
                      <div className="hidden xl:block flex-shrink-0">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {bond.payoutFrequency}
                        </Badge>
                      </div>

                      {/* View Details */}
                      <Button variant="outline" size="sm" className="flex-shrink-0 ml-auto gap-1">
                        View <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredBonds.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No bonds found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        )}

        {/* Risk Disclaimer */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-secondary mb-2">Risk Disclosure & SEBI Compliance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bond investments are subject to interest rate risk and credit risk.</li>
                  <li>• Credit ratings are assigned by SEBI-registered agencies and may change over time.</li>
                  <li>• Past performance and ratings do not guarantee future returns.</li>
                  <li>• Please read the offer document and risk factors carefully before investing.</li>
                  <li>• TDS is applicable on interest income at 10% if PAN is provided.</li>
                  <li>• All bonds listed are regulated under SEBI (Issue and Listing of Non-Convertible Securities) Regulations, 2021.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductLayout>
  );
};

export default Bonds;