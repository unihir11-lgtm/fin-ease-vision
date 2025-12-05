import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bondsData } from "@/data/bondData";
import { 
  ChevronRight, Landmark, AlertCircle, Search, Filter, 
  TrendingUp, Star, Shield, IndianRupee, ArrowUpDown, X, Calendar,
  Percent, Clock, Award, Eye, Sparkles, Heart, Bookmark, BookmarkCheck
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ProductLayout from "@/components/ProductLayout";
import { ProviderIcon, getIconColors, getInvestmentMethodColor, getMarketTypeColor } from "@/components/icons/ProviderIcon";
import { Layers, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Bond category tabs configuration
const bondCategoryTabs = [
  { id: "all", label: "All Bonds", icon: Landmark },
  { id: "ncd", label: "NCDs", icon: Layers },
  { id: "gsec", label: "G-Secs", icon: Shield },
  { id: "taxfree", label: "Tax-Free", icon: Percent },
  { id: "sgb", label: "SGBs", icon: Star },
  { id: "psu", label: "PSU Bonds", icon: Award },
  { id: "watchlist", label: "Watchlist", icon: Heart },
];

// Watchlist storage key
const WATCHLIST_KEY = "finease_bond_watchlist";

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [yieldRange, setYieldRange] = useState([5, 15]);
  const [sortBy, setSortBy] = useState("yield-high");
  const [showFilters, setShowFilters] = useState(false);
  const [showTaxFree, setShowTaxFree] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(WATCHLIST_KEY);
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading watchlist:", e);
      }
    }
  }, []);

  // Save watchlist to localStorage
  const saveWatchlist = (newWatchlist: string[]) => {
    setWatchlist(newWatchlist);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
  };

  const toggleWatchlist = (bondId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (watchlist.includes(bondId)) {
      saveWatchlist(watchlist.filter(id => id !== bondId));
      toast({ title: "Removed from Watchlist", description: "Bond removed from your watchlist" });
    } else {
      saveWatchlist([...watchlist, bondId]);
      toast({ title: "Added to Watchlist", description: "Bond added to your watchlist" });
    }
  };

  const isInWatchlist = (bondId: string) => watchlist.includes(bondId);

  // Category filter based on bondCategory
  const getCategoryFilter = (category: string) => {
    switch (category) {
      case "ncd": return (bond: typeof bondsData[0]) => bond.bondCategory === "NCD";
      case "gsec": return (bond: typeof bondsData[0]) => bond.bondCategory === "G-Sec" || bond.bondCategory === "SDL" || bond.bondCategory === "T-Bill";
      case "taxfree": return (bond: typeof bondsData[0]) => bond.bondCategory === "Tax-Free Bond" || bond.bondType === "Tax-Free";
      case "sgb": return (bond: typeof bondsData[0]) => bond.bondCategory === "Sovereign Bond" || bond.bondType === "Sovereign Gold";
      case "psu": return (bond: typeof bondsData[0]) => bond.bondType === "PSU";
      case "watchlist": return (bond: typeof bondsData[0]) => watchlist.includes(bond.id);
      default: return () => true;
    }
  };

  const filteredBonds = bondsData
    .filter(getCategoryFilter(activeCategory))
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
    { label: "Highest Yield", value: `${Math.max(...bondsData.map(b => b.currentYield))}%`, icon: TrendingUp, bgColor: "bg-green-50", textColor: "text-green-600" },
    { label: "Bonds Available", value: bondsData.length, icon: Star, bgColor: "bg-amber-50", textColor: "text-amber-600" },
    { label: "AAA Rated", value: bondsData.filter(b => b.rating.includes("AAA")).length, icon: Shield, bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { label: "Min Investment", value: `₹${Math.min(...bondsData.map(b => b.minInvestment)).toLocaleString()}`, icon: IndianRupee, bgColor: "bg-purple-50", textColor: "text-purple-600" },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-IN", { month: "short" });
    const year = date.getFullYear();
    return { day, month, year, full: `${day} ${month} ${year}` };
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setTypeFilter("all");
    setYieldRange([5, 15]);
    setSortBy("yield-high");
    setShowTaxFree(false);
  };

  // Featured bond (highest yield)
  const featuredBond = [...bondsData].sort((a, b) => b.currentYield - a.currentYield)[0];

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
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Corporate & Government Bonds</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display leading-tight">
                Invest in <span className="text-[#1dab91]">Bonds</span>
              </h1>
              <p className="text-white/80 text-lg mb-6">
                Secure, fixed-income investments with predictable returns. Diversify your portfolio with SEBI-compliant rated bonds.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  SEBI Compliant
                </Badge>
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  Listed on NSE/BSE
                </Badge>
                <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm">
                  Fixed Income
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

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {bondCategoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              const count = tab.id === "watchlist" 
                ? watchlist.length 
                : tab.id === "all" 
                  ? bondsData.length 
                  : bondsData.filter(getCategoryFilter(tab.id)).length;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? "bg-[#0a344a] text-white shadow-lg" 
                      : "bg-white border border-border hover:border-[#1dab91] hover:bg-[#1dab91]/5 text-[#0a344a]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#1dab91]" : ""}`} />
                  {tab.label}
                  <Badge className={`ml-1 text-xs ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : tab.id === "watchlist" && count > 0 
                        ? "bg-red-100 text-red-600" 
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Bond */}
        {activeCategory === "all" && featuredBond && (
          <Card className="mb-8 border-2 border-[#1dab91]/30 bg-gradient-to-r from-[#1dab91]/5 to-transparent overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-[#1dab91] text-white border-0 gap-1">
                      <Award className="w-3 h-3" />
                      Top Yield
                    </Badge>
                    <Badge className={`${
                      featuredBond.rating.includes("AAA") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    } border-0`}>
                      {featuredBond.rating}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border border-border/50 ${getIconColors(featuredBond.bondType).bg}`}>
                      <ProviderIcon iconType={featuredBond.iconType} className={getIconColors(featuredBond.bondType).text} size={36} />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#0a344a] mb-1">{featuredBond.issuer}</h2>
                      <p className="text-muted-foreground">{featuredBond.bondType} • {featuredBond.isin}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Coupon Rate</p>
                      <p className="text-xl font-bold text-[#175d80]">{featuredBond.couponRate}%</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Current Yield</p>
                      <p className="text-xl font-bold text-green-600">{featuredBond.currentYield}%</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">YTM</p>
                      <p className="text-xl font-bold text-[#175d80]">{featuredBond.ytm}%</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Min Investment</p>
                      <p className="text-xl font-bold text-[#1dab91]">₹{featuredBond.minInvestment.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/bonds/${featuredBond.id}`}>
                      <Button size="lg" className="bg-[#1dab91] hover:bg-[#18937c] text-white gap-2">
                        Invest Now <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/bonds/${featuredBond.id}`}>
                      <Button size="lg" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="lg:w-1/3 bg-gradient-to-br from-[#0a344a] to-[#175d80] p-6 lg:p-8 text-white flex flex-col justify-center">
                  <div className="text-center">
                    <p className="text-white/70 text-sm mb-2">Maturity Date</p>
                    <div className="text-3xl font-bold mb-4">{formatDate(featuredBond.maturityDate).full}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Payout</span>
                        <span className="font-semibold">{featuredBond.payoutFrequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Rating Agency</span>
                        <span className="font-semibold">{featuredBond.ratingAgency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Face Value</span>
                        <span className="font-semibold">₹{featuredBond.faceValue.toLocaleString()}</span>
                      </div>
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
                  placeholder="Search bonds by issuer, ISIN..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
                    <Badge className="ml-1 bg-[#1dab91]/20 text-[#1dab91]">Active</Badge>
                  )}
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            Showing <span className="font-medium text-[#0a344a]">{filteredBonds.length}</span> bonds
          </p>
        </div>

        {/* Bonds Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {filteredBonds.map((bond) => {
            const maturity = formatDate(bond.maturityDate);
            return (
              <Link key={bond.id} to={`/bonds/${bond.id}`} className="block group relative">
                {/* Watchlist Button */}
                <button
                  onClick={(e) => toggleWatchlist(bond.id, e)}
                  className={`absolute top-4 right-4 z-10 p-2.5 rounded-full transition-all shadow-md ${
                    isInWatchlist(bond.id) 
                      ? "bg-red-500 text-white hover:bg-red-600" 
                      : "bg-white/90 text-muted-foreground hover:bg-white hover:text-red-500"
                  }`}
                  title={isInWatchlist(bond.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                  <Heart className={`w-4 h-4 ${isInWatchlist(bond.id) ? "fill-current" : ""}`} />
                </button>
                
                <Card className="h-full border-border/50 hover:border-[#1dab91]/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-5 border-b border-border/50">
                      <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 pr-8">
                          <div className={`w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center border border-border/50 group-hover:scale-105 transition-transform ${getIconColors(bond.bondType).bg} overflow-hidden p-2`}>
                            <ProviderIcon iconType={bond.iconType} logo={bond.logo} name={bond.issuer} className={getIconColors(bond.bondType).text} size={40} />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <Badge className={`text-xs font-bold ${
                                bond.rating.includes("AAA") || bond.rating === "Sovereign" ? "bg-green-100 text-green-700" :
                                bond.rating.includes("AA") ? "bg-blue-100 text-blue-700" :
                                "bg-amber-100 text-amber-700"
                              }`}>
                                {bond.rating}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {bond.bondType}
                              </Badge>
                              <Badge className={`text-xs border ${getInvestmentMethodColor(bond.investmentMethod)}`}>
                                {bond.investmentMethod === "Lot Based" ? <Layers className="w-3 h-3 mr-1" /> : <BarChart3 className="w-3 h-3 mr-1" />}
                                {bond.investmentMethod}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-lg text-[#0a344a] group-hover:text-[#1dab91] transition-colors line-clamp-1">{bond.issuer}</h3>
                            <p className="text-sm text-muted-foreground">{bond.isin}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Coupon</p>
                          <p className="text-lg font-bold text-[#0a344a]">{bond.couponRate}%</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">Yield</p>
                          <p className="text-lg font-bold text-green-600">{bond.currentYield}%</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-xl">
                          <p className="text-xs text-muted-foreground mb-1">YTM</p>
                          <p className="text-lg font-bold text-[#0a344a]">{bond.ytm}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Min Investment</p>
                          <p className="text-xl font-bold text-[#1dab91]">₹{bond.minInvestment.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Maturity</p>
                          <p className="text-lg font-bold text-[#175d80]">{maturity.full}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {bond.payoutFrequency}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bond.ratingAgency}
                        </Badge>
                        {bond.lotSize > 1 && (
                          <Badge variant="outline" className="text-xs bg-purple-50">
                            <Layers className="w-3 h-3 mr-1" />
                            {bond.lotSize} per lot
                          </Badge>
                        )}
                        <Badge className={`text-xs border ${getMarketTypeColor(bond.marketType)}`}>
                          {bond.marketType}
                        </Badge>
                      </div>

                      <Button className="w-full gap-2" variant="outline">
                        View Details <ChevronRight className="w-4 h-4" />
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
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#0a344a] mb-2">Risk Disclosure & SEBI Compliance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bond investments are subject to interest rate risk and credit risk.</li>
                  <li>• Credit ratings are assigned by SEBI-registered agencies and may change over time.</li>
                  <li>• Past performance and ratings do not guarantee future returns.</li>
                  <li>• Please read the offer document and risk factors carefully before investing.</li>
                  <li>• TDS is applicable on interest income at 10% if PAN is provided.</li>
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
