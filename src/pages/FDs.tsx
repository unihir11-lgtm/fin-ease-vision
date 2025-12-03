import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fixedDeposits } from "@/data/mockData";
import { Search, Filter, Star, ArrowLeft, Shield } from "lucide-react";
import logo from "@/assets/finease-logo.png";

const FDs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenureFilter, setTenureFilter] = useState("all");

  const filteredFDs = fixedDeposits.filter((fd) => {
    const matchesSearch = fd.bankName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTenure = tenureFilter === "all" || fd.tenure === tenureFilter;
    return matchesSearch && matchesTenure;
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
        <div className="bg-[#057170] rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold font-['Raleway'] mb-2">Fixed Deposits</h1>
          <p className="text-white/80 max-w-2xl">
            Invest in FDs from top banks and NBFCs. Enjoy guaranteed returns with flexible tenure options and attractive interest rates.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-border flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input 
              placeholder="Search FDs..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={tenureFilter} onValueChange={setTenureFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tenure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tenures</SelectItem>
              <SelectItem value="1 Year">1 Year</SelectItem>
              <SelectItem value="2 Years">2 Years</SelectItem>
              <SelectItem value="3 Years">3 Years</SelectItem>
              <SelectItem value="5 Years">5 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* FD Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`}>
              <div className="bg-white rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {fd.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary">{fd.bankName}</h3>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          fd.creditRating === "AAA" ? "bg-green-100 text-green-700" :
                          fd.creditRating === "AA+" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {fd.creditRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{fd.interestRate}%</p>
                    <p className="text-xs text-muted">p.a.</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-3 mb-4 flex items-center justify-between">
                  <span className="text-sm text-green-700">Senior Citizen Rate</span>
                  <span className="font-bold text-green-700">{fd.seniorCitizenRate}% p.a.</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted">Tenure</p>
                    <p className="font-medium text-secondary">{fd.tenure}</p>
                  </div>
                  <div>
                    <p className="text-muted">Min. Deposit</p>
                    <p className="font-medium text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted">Payout Options</p>
                    <p className="font-medium text-secondary">{fd.payoutOptions.length} types</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted">
                    <Shield className="w-4 h-4" />
                    DICGC Insured
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

export default FDs;
