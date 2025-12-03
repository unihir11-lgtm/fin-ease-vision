import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fdProviders } from "@/data/fdData";
import { ChevronRight, PiggyBank, Shield, TrendingUp, AlertCircle, Percent, Building } from "lucide-react";
import ProductLayout from "@/components/ProductLayout";

const FDs = () => {
  const [tenureFilter, setTenureFilter] = useState("all");

  const filteredFDs = fdProviders.filter((fd) => {
    if (tenureFilter === "all") return true;
    return fd.maxTenure.includes(tenureFilter);
  });

  const tenures = ["all", "1 Year", "3 Years", "5 Years"];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-accent to-primary rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5" />
                <span className="text-white/80 text-sm font-medium">Fixed Deposits</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Earn upto 9.10% annually</h1>
              <p className="text-white/80 max-w-lg">High returns, maximum security! Invest in FDs insured by DICGC up to ₹5 lakh.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">9.10%</p>
                <p className="text-xs text-white/70">Max Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">₹5L</p>
                <p className="text-xs text-white/70">DICGC Insured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="finease-card p-4 text-center">
            <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-secondary">DICGC Insured</p>
            <p className="text-xs text-muted-foreground">Up to ₹5 Lakh</p>
          </div>
          <div className="finease-card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-bold text-secondary">High Returns</p>
            <p className="text-xs text-muted-foreground">Up to 9.10% p.a.</p>
          </div>
          <div className="finease-card p-4 text-center">
            <Building className="w-6 h-6 text-secondary mx-auto mb-2" />
            <p className="text-sm font-bold text-secondary">RBI Regulated</p>
            <p className="text-xs text-muted-foreground">Safe & Secure</p>
          </div>
          <div className="finease-card p-4 text-center">
            <Percent className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm font-bold text-secondary">Senior Citizen</p>
            <p className="text-xs text-muted-foreground">Extra 0.5% Rate</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground">Filter by Max Tenure:</span>
          {tenures.map((tenure) => (
            <button
              key={tenure}
              onClick={() => setTenureFilter(tenure)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tenureFilter === tenure
                  ? "bg-primary text-white"
                  : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10"
              }`}
            >
              {tenure === "all" ? "All Tenures" : tenure}
            </button>
          ))}
        </div>

        {/* FD Grid - Horizontal Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`}>
              <div className="finease-card bg-white rounded-xl p-4 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                    {fd.logo}
                  </div>
                  
                  {/* DICGC Badge */}
                  <Badge className="px-2 py-0.5 text-[10px] font-bold flex-shrink-0 bg-green-100 text-green-700">
                    <Shield className="w-2.5 h-2.5 mr-0.5" />
                    DICGC
                  </Badge>

                  {/* Name */}
                  <div className="min-w-0 flex-shrink">
                    <h3 className="font-bold text-secondary text-sm truncate leading-tight">{fd.bankName}</h3>
                  </div>

                  {/* Tenure */}
                  <div className="flex-shrink-0 px-2 py-1 rounded border border-accent/20 bg-accent/5 text-center">
                    <p className="text-[9px] text-muted-foreground leading-tight">Tenure:</p>
                    <p className="text-xs font-bold text-accent leading-tight">{fd.maxTenure}</p>
                  </div>

                  {/* Interest Rate */}
                  <div className="flex-shrink-0 text-center hidden sm:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Interest</p>
                    <p className="text-sm font-bold text-primary">{fd.interestRate}%</p>
                  </div>

                  {/* Senior Citizen Rate */}
                  <div className="flex-shrink-0 text-center hidden sm:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Sr. Citizen</p>
                    <p className="text-sm font-bold text-accent">{fd.seniorCitizenRate}%</p>
                  </div>

                  {/* Min Deposit */}
                  <div className="flex-shrink-0 text-center hidden lg:block">
                    <p className="text-[9px] text-muted-foreground leading-tight">Min</p>
                    <p className="text-sm font-bold text-secondary">₹{(fd.minDeposit / 1000).toFixed(0)}K</p>
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

        {filteredFDs.length === 0 && (
          <div className="text-center py-16">
            <PiggyBank className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No FDs found for the selected filters.</p>
          </div>
        )}

        {/* Compliance Disclaimer */}
        <div className="mt-10 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">RBI & DICGC Compliance</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Deposits are insured by Deposit Insurance and Credit Guarantee Corporation (DICGC) up to ₹5 lakh per depositor per bank.</li>
                <li>• Interest rates are subject to change as per bank/NBFC policies and RBI guidelines.</li>
                <li>• Premature withdrawal may attract penalty as per the terms of the FD.</li>
                <li>• TDS is applicable on interest income as per Income Tax Act provisions.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
};

export default FDs;