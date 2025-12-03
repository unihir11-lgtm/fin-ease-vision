import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bonds } from "@/data/mockData";
import { Search, Filter, TrendingUp, Star, ArrowLeft } from "lucide-react";
import logo from "@/assets/finease-logo.png";

const Bonds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredBonds = bonds.filter((bond) => {
    const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || bond.rating === ratingFilter;
    const matchesType = typeFilter === "all" || bond.bondType === typeFilter;
    return matchesSearch && matchesRating && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <Link to="/dashboard">
            <Button variant="outline">My Portfolio</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold font-['Raleway'] mb-2">Bond Investment</h1>
          <p className="text-white/80 max-w-2xl">
            Get early access to companies going public. Invest in corporate and government bonds with attractive yields and secure returns.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-border flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input 
              placeholder="Search bonds..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="AAA">AAA</SelectItem>
              <SelectItem value="AA+">AA+</SelectItem>
              <SelectItem value="AA">AA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Bond Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Bond Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBonds.map((bond) => (
            <Link key={bond.id} to={`/bonds/${bond.id}`}>
              <div className="bg-white rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        bond.rating === "AAA" ? "bg-green-100 text-green-700" :
                        bond.rating === "AA+" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {bond.rating}
                      </span>
                      <span className="text-xs text-muted">{bond.bondType}</span>
                    </div>
                    <h3 className="text-lg font-bold text-secondary">{bond.issuer}</h3>
                    <p className="text-sm text-muted">ISIN: {bond.isin}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{bond.yield}%</p>
                    <p className="text-xs text-muted">Yield</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted">Coupon Rate</p>
                    <p className="font-medium text-secondary">{bond.couponRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted">Tenure</p>
                    <p className="font-medium text-secondary">{bond.tenure}</p>
                  </div>
                  <div>
                    <p className="text-muted">Payout</p>
                    <p className="font-medium text-secondary">{bond.payoutFrequency}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted">
                    <TrendingUp className="w-4 h-4" />
                    Min. ₹{bond.minInvestment.toLocaleString()}
                  </div>
                  <Button size="sm" className="bg-primary">Invest Now</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bonds;
