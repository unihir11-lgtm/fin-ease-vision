import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bondsData } from "@/data/bondData";
import { ChevronRight, Landmark, Shield, TrendingUp, AlertCircle, Filter } from "lucide-react";
import ProductLayout from "@/components/ProductLayout";

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredBonds = bondsData.filter((bond) => {
    const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || bond.rating.includes(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
  };

  const ratings = ["all", "AAA", "AA+", "AA", "A+"];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5" />
                <span className="text-white/80 text-sm font-medium">Corporate & Government Bonds</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Invest in Bonds</h1>
              <p className="text-white/80 max-w-lg">Secure, fixed-income investments with predictable returns. Diversify your portfolio with rated bonds.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">8.5%</p>
                <p className="text-xs text-white/70">Avg. Yield</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">AAA</p>
                <p className="text-xs text-white/70">Top Rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="finease-card p-4 text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary">{bondsData.length}+</p>
            <p className="text-xs text-muted-foreground">Available Bonds</p>
          </div>
          <div className="finease-card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary">9.5%</p>
            <p className="text-xs text-muted-foreground">Max Yield</p>
          </div>
          <div className="finease-card p-4 text-center">
            <Landmark className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary">₹10K</p>
            <p className="text-xs text-muted-foreground">Min Investment</p>
          </div>
          <div className="finease-card p-4 text-center">
            <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary">100%</p>
            <p className="text-xs text-muted-foreground">Rated Bonds</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter by Rating:</span>
          </div>
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setRatingFilter(rating)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                ratingFilter === rating
                  ? "bg-primary text-white"
                  : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10"
              }`}
            >
              {rating === "all" ? "All Ratings" : rating}
            </button>
          ))}
        </div>

        {/* Bonds Grid - Horizontal Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredBonds.map((bond) => (
            <Link key={bond.id} to={`/bonds/${bond.id}`}>
              <div className="finease-card bg-white rounded-xl p-4 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                    {bond.logo}
                  </div>
                  
                  {/* Rating Badge */}
                  <Badge className={`px-2 py-0.5 text-[10px] font-bold flex-shrink-0 ${
                    bond.rating.includes("AAA") ? "bg-green-100 text-green-700" :
                    bond.rating.includes("AA") ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {bond.rating}
                  </Badge>

                  {/* Name */}
                  <div className="min-w-0 flex-shrink">
                    <h3 className="font-bold text-secondary text-sm truncate leading-tight">{bond.issuer}</h3>
                  </div>

                  {/* Maturity */}
                  <div className="flex-shrink-0 px-2 py-1 rounded border border-primary/20 bg-primary/5 text-center">
                    <p className="text-[9px] text-muted-foreground leading-tight">Maturity:</p>
                    <p className="text-xs font-bold text-primary leading-tight">{formatDate(bond.maturityDate).split(' ').slice(0, 2).join(' ')}</p>
                  </div>

                  {/* Coupon Rate */}
                  <div className="flex-shrink-0 text-center hidden sm:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Coupon Rate</p>
                    <p className="text-sm font-bold text-secondary">{bond.couponRate}%</p>
                  </div>

                  {/* Yield */}
                  <div className="flex-shrink-0 text-center hidden sm:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Yield</p>
                    <p className="text-sm font-bold text-accent">{bond.currentYield}%</p>
                  </div>

                  {/* YTM & Min Amount */}
                  <div className="flex-shrink-0 text-center hidden lg:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">YTM</p>
                    <p className="text-sm font-bold text-secondary">{bond.ytm}%</p>
                  </div>

                  <div className="flex-shrink-0 text-center hidden lg:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Min</p>
                    <p className="text-sm font-bold text-secondary">₹{(bond.minInvestment / 1000).toFixed(0)}K</p>
                  </div>

                  {/* View Details Button */}
                  <Button variant="outline" size="sm" className="flex-shrink-0 ml-auto text-primary border-primary/30 hover:bg-primary hover:text-white text-xs px-3 gap-1">
                    View Details <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBonds.length === 0 && (
          <div className="text-center py-16">
            <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No bonds found for the selected filters.</p>
          </div>
        )}

        {/* Risk Disclaimer */}
        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">Risk Disclosure</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Bond investments are subject to interest rate risk and credit risk.</li>
                <li>• Credit ratings are assigned by rating agencies and may change over time.</li>
                <li>• Past performance and ratings do not guarantee future returns.</li>
                <li>• Please read the offer document carefully before investing.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
};

export default Bonds;