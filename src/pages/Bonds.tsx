import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { bondsData } from "@/data/bondData";
import { ChevronRight, Landmark, AlertCircle, Filter } from "lucide-react";
import ProductLayout from "@/components/ProductLayout";

const Bonds = () => {
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredBonds = bondsData.filter((bond) => {
    const matchesRating = ratingFilter === "all" || bond.rating.includes(ratingFilter);
    return matchesRating;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-IN", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return { day, month, year };
  };

  const ratings = ["all", "AAA", "AA+", "AA", "A+"];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5" />
                <span className="text-white/80 text-sm font-medium">Corporate & Government Bonds</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Invest in Bonds</h1>
              <p className="text-white/80 max-w-lg">Secure, fixed-income investments with predictable returns. Diversify your portfolio with rated bonds.</p>
            </div>
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                ratingFilter === rating
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {rating === "all" ? "All Ratings" : rating}
            </button>
          ))}
        </div>

        {/* Bonds List - Full Width Rows */}
        <div className="space-y-3">
          {filteredBonds.map((bond) => {
            const maturity = formatDate(bond.maturityDate);
            return (
              <Link key={bond.id} to={`/bonds/${bond.id}`} className="block">
                <div className="bg-white rounded-xl border border-border/50 p-4 hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                      {bond.logo}
                    </div>
                    
                    {/* Rating Badge */}
                    <Badge className={`px-2.5 py-1 text-xs font-bold flex-shrink-0 ${
                      bond.rating.includes("AAA") ? "bg-green-100 text-green-700" :
                      bond.rating.includes("AA") ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {bond.rating}
                    </Badge>

                    {/* Name */}
                    <div className="min-w-[120px] flex-shrink-0">
                      <h3 className="font-semibold text-secondary text-sm truncate max-w-[140px]">{bond.issuer}</h3>
                    </div>

                    {/* Maturity Date Box */}
                    <div className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-center min-w-[70px]">
                      <p className="text-[10px] text-muted-foreground leading-tight">Maturity:</p>
                      <p className="text-xs font-bold text-primary leading-tight">{maturity.day} {maturity.month}</p>
                      <p className="text-[10px] font-semibold text-primary/70">{maturity.year}</p>
                    </div>

                    {/* Coupon Rate */}
                    <div className="flex-shrink-0 text-center min-w-[70px]">
                      <p className="text-[10px] text-muted-foreground">Coupon Rate</p>
                      <p className="text-sm font-bold text-secondary">{bond.couponRate}%</p>
                    </div>

                    {/* Yield */}
                    <div className="flex-shrink-0 text-center min-w-[60px]">
                      <p className="text-[10px] text-muted-foreground">Yield</p>
                      <p className="text-sm font-bold text-accent">{bond.currentYield}%</p>
                    </div>

                    {/* YTM */}
                    <div className="flex-shrink-0 text-center min-w-[50px]">
                      <p className="text-[10px] text-muted-foreground">YTM</p>
                      <p className="text-sm font-bold text-secondary">{bond.ytm}%</p>
                    </div>

                    {/* Min Amount */}
                    <div className="flex-shrink-0 text-center min-w-[50px]">
                      <p className="text-[10px] text-muted-foreground">Min</p>
                      <p className="text-sm font-bold text-secondary">₹{(bond.minInvestment / 1000).toFixed(0)}K</p>
                    </div>

                    {/* View Details Button */}
                    <button className="flex-shrink-0 ml-auto flex items-center gap-1 text-primary hover:text-primary/80 font-semibold text-sm transition-colors">
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredBonds.length === 0 && (
          <div className="text-center py-16">
            <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No bonds found for the selected filters.</p>
          </div>
        )}

        {/* Risk Disclaimer */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">Risk Disclosure</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
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