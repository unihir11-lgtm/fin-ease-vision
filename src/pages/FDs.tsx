import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

        {/* FD Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFDs.map((fd) => (
            <Link key={fd.id} to={`/fds/${fd.id}`}>
              <div className="finease-card bg-white rounded-2xl p-5 hover:shadow-lg transition-all group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                      {fd.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Shield className="w-3 h-3" />
                        <span>DICGC Insured</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                      <p className="text-3xl font-bold text-primary">{fd.interestRate}%</p>
                      <p className="text-xs text-muted-foreground">per annum</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Max Tenure</p>
                      <p className="text-lg font-bold text-secondary">{fd.maxTenure}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-secondary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Min Deposit</p>
                    <p className="font-bold text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-secondary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Senior Citizen</p>
                    <p className="font-bold text-primary">{fd.seniorCitizenRate}%</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
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
