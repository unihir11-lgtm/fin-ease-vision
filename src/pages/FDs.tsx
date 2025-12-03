import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { fdProviders } from "@/data/fdData";
import { ChevronRight, PiggyBank, Shield, AlertCircle } from "lucide-react";
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
        <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5" />
                <span className="text-white/80 text-sm font-medium">Fixed Deposits</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Earn upto 9.10% annually</h1>
              <p className="text-white/80 max-w-lg">High returns, maximum security! Invest in FDs insured by DICGC up to ₹5 lakh.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground">Filter by Max Tenure:</span>
          {tenures.map((tenure) => (
            <button
              key={tenure}
              onClick={() => setTenureFilter(tenure)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tenureFilter === tenure
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tenure === "all" ? "All Tenures" : tenure}
            </button>
          ))}
        </div>

        {/* FD List - Full Width Rows */}
        <div className="space-y-3">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`} className="block">
              <div className="bg-white rounded-xl border border-border/50 p-4 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                  {/* Logo */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                    {fd.logo}
                  </div>
                  
                  {/* DICGC Badge */}
                  <Badge className="px-2.5 py-1 text-xs font-bold flex-shrink-0 bg-green-100 text-green-700">
                    <Shield className="w-3 h-3 mr-1" />
                    DICGC
                  </Badge>

                  {/* Name */}
                  <div className="min-w-[140px] flex-shrink-0">
                    <h3 className="font-semibold text-secondary text-sm truncate max-w-[160px]">{fd.bankName}</h3>
                  </div>

                  {/* Tenure Box */}
                  <div className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-accent/20 bg-accent/5 text-center min-w-[70px]">
                    <p className="text-[10px] text-muted-foreground leading-tight">Tenure:</p>
                    <p className="text-xs font-bold text-accent leading-tight">{fd.maxTenure}</p>
                  </div>

                  {/* Interest Rate */}
                  <div className="flex-shrink-0 text-center min-w-[60px]">
                    <p className="text-[10px] text-muted-foreground">Interest</p>
                    <p className="text-sm font-bold text-primary">{fd.interestRate}%</p>
                  </div>

                  {/* Senior Citizen Rate */}
                  <div className="flex-shrink-0 text-center min-w-[70px]">
                    <p className="text-[10px] text-muted-foreground">Sr. Citizen</p>
                    <p className="text-sm font-bold text-accent">{fd.seniorCitizenRate}%</p>
                  </div>

                  {/* Min Deposit */}
                  <div className="flex-shrink-0 text-center min-w-[50px]">
                    <p className="text-[10px] text-muted-foreground">Min</p>
                    <p className="text-sm font-bold text-secondary">₹{(fd.minDeposit / 1000).toFixed(0)}K</p>
                  </div>

                  {/* View Details Button */}
                  <button className="flex-shrink-0 ml-auto flex items-center gap-1 text-primary hover:text-primary/80 font-semibold text-sm transition-colors">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
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
        <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-secondary mb-2">RBI & DICGC Compliance</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
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