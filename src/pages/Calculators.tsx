import { useState } from "react";
import { Calculator, Percent, Calendar, TrendingUp, PiggyBank, Landmark, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductLayout from "@/components/ProductLayout";

const Calculators = () => {
  // FD Calculator State
  const [fdAmount, setFdAmount] = useState(100000);
  const [fdRate, setFdRate] = useState(7.5);
  const [fdTenure, setFdTenure] = useState(12);
  const [fdCompounding, setFdCompounding] = useState<"quarterly" | "monthly" | "yearly">("quarterly");

  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(5);

  // Lumpsum Calculator State
  const [lsAmount, setLsAmount] = useState(100000);
  const [lsRate, setLsRate] = useState(12);
  const [lsYears, setLsYears] = useState(5);

  // FD Calculation
  const calculateFD = () => {
    const n = fdCompounding === "monthly" ? 12 : fdCompounding === "quarterly" ? 4 : 1;
    const t = fdTenure / 12;
    const maturity = fdAmount * Math.pow(1 + fdRate / 100 / n, n * t);
    const interest = maturity - fdAmount;
    return { maturity: Math.round(maturity), interest: Math.round(interest) };
  };

  // SIP Calculation
  const calculateSIP = () => {
    const monthlyRate = sipRate / 100 / 12;
    const months = sipYears * 12;
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = sipAmount * months;
    const returns = futureValue - invested;
    return { 
      futureValue: Math.round(futureValue), 
      invested: Math.round(invested), 
      returns: Math.round(returns) 
    };
  };

  // Lumpsum Calculation
  const calculateLumpsum = () => {
    const futureValue = lsAmount * Math.pow(1 + lsRate / 100, lsYears);
    const returns = futureValue - lsAmount;
    return { 
      futureValue: Math.round(futureValue), 
      returns: Math.round(returns) 
    };
  };

  const fdResult = calculateFD();
  const sipResult = calculateSIP();
  const lsResult = calculateLumpsum();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Financial Calculators
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
            Plan Your Financial Future
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our easy-to-use calculators to estimate returns on your investments and make informed financial decisions.
          </p>
        </div>

        {/* Calculator Tabs */}
        <Tabs defaultValue="fd" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8 bg-secondary/5">
            <TabsTrigger value="fd" className="data-[state=active]:bg-white data-[state=active]:text-primary gap-2">
              <PiggyBank className="w-4 h-4" />
              FD
            </TabsTrigger>
            <TabsTrigger value="sip" className="data-[state=active]:bg-white data-[state=active]:text-primary gap-2">
              <TrendingUp className="w-4 h-4" />
              SIP
            </TabsTrigger>
            <TabsTrigger value="lumpsum" className="data-[state=active]:bg-white data-[state=active]:text-primary gap-2">
              <Landmark className="w-4 h-4" />
              Lumpsum
            </TabsTrigger>
          </TabsList>

          {/* FD Calculator */}
          <TabsContent value="fd">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="finease-card p-6 space-y-6">
                <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-primary" />
                  Fixed Deposit Calculator
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Principal Amount</Label>
                      <span className="font-semibold text-primary">{formatCurrency(fdAmount)}</span>
                    </div>
                    <Slider
                      value={[fdAmount]}
                      onValueChange={(v) => setFdAmount(v[0])}
                      min={10000}
                      max={10000000}
                      step={10000}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹10K</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Interest Rate (p.a.)</Label>
                      <span className="font-semibold text-primary">{fdRate}%</span>
                    </div>
                    <Slider
                      value={[fdRate]}
                      onValueChange={(v) => setFdRate(v[0])}
                      min={3}
                      max={10}
                      step={0.1}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>3%</span>
                      <span>10%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Tenure (Months)</Label>
                      <span className="font-semibold text-primary">{fdTenure} months</span>
                    </div>
                    <Slider
                      value={[fdTenure]}
                      onValueChange={(v) => setFdTenure(v[0])}
                      min={6}
                      max={120}
                      step={6}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>6 months</span>
                      <span>10 years</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-secondary mb-2 block">Compounding</Label>
                    <div className="flex gap-2">
                      {(["monthly", "quarterly", "yearly"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFdCompounding(type)}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            fdCompounding === type
                              ? "bg-primary text-white"
                              : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10"
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FD Results */}
              <div className="finease-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg font-bold text-secondary mb-6">Maturity Summary</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="text-xl font-bold text-secondary">{formatCurrency(fdAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(fdResult.interest)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-white rounded-xl">
                    <span className="font-medium">Maturity Value</span>
                    <span className="text-2xl font-bold">{formatCurrency(fdResult.maturity)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/50 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    *Calculations are indicative. Actual returns may vary based on bank policies and tax deductions.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SIP Calculator */}
          <TabsContent value="sip">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="finease-card p-6 space-y-6">
                <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  SIP Calculator
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Monthly Investment</Label>
                      <span className="font-semibold text-primary">{formatCurrency(sipAmount)}</span>
                    </div>
                    <Slider
                      value={[sipAmount]}
                      onValueChange={(v) => setSipAmount(v[0])}
                      min={500}
                      max={100000}
                      step={500}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Expected Returns (p.a.)</Label>
                      <span className="font-semibold text-primary">{sipRate}%</span>
                    </div>
                    <Slider
                      value={[sipRate]}
                      onValueChange={(v) => setSipRate(v[0])}
                      min={5}
                      max={30}
                      step={0.5}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Time Period (Years)</Label>
                      <span className="font-semibold text-primary">{sipYears} years</span>
                    </div>
                    <Slider
                      value={[sipYears]}
                      onValueChange={(v) => setSipYears(v[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="py-2"
                    />
                  </div>
                </div>
              </div>

              {/* SIP Results */}
              <div className="finease-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg font-bold text-secondary mb-6">Investment Summary</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Total Invested</span>
                    <span className="text-xl font-bold text-secondary">{formatCurrency(sipResult.invested)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Est. Returns</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(sipResult.returns)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-white rounded-xl">
                    <span className="font-medium">Total Value</span>
                    <span className="text-2xl font-bold">{formatCurrency(sipResult.futureValue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Lumpsum Calculator */}
          <TabsContent value="lumpsum">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="finease-card p-6 space-y-6">
                <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-primary" />
                  Lumpsum Calculator
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Investment Amount</Label>
                      <span className="font-semibold text-primary">{formatCurrency(lsAmount)}</span>
                    </div>
                    <Slider
                      value={[lsAmount]}
                      onValueChange={(v) => setLsAmount(v[0])}
                      min={10000}
                      max={10000000}
                      step={10000}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Expected Returns (p.a.)</Label>
                      <span className="font-semibold text-primary">{lsRate}%</span>
                    </div>
                    <Slider
                      value={[lsRate]}
                      onValueChange={(v) => setLsRate(v[0])}
                      min={5}
                      max={30}
                      step={0.5}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-secondary">Time Period (Years)</Label>
                      <span className="font-semibold text-primary">{lsYears} years</span>
                    </div>
                    <Slider
                      value={[lsYears]}
                      onValueChange={(v) => setLsYears(v[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Lumpsum Results */}
              <div className="finease-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg font-bold text-secondary mb-6">Investment Summary</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="text-xl font-bold text-secondary">{formatCurrency(lsAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                    <span className="text-muted-foreground">Est. Returns</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(lsResult.returns)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary text-white rounded-xl">
                    <span className="font-medium">Total Value</span>
                    <span className="text-2xl font-bold">{formatCurrency(lsResult.futureValue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="finease-card p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-secondary mb-2">Accurate Estimates</h4>
            <p className="text-sm text-muted-foreground">Get precise calculations based on standard financial formulas</p>
          </div>
          <div className="finease-card p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-bold text-secondary mb-2">Plan Ahead</h4>
            <p className="text-sm text-muted-foreground">Visualize your wealth growth over different time periods</p>
          </div>
          <div className="finease-card p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="font-bold text-secondary mb-2">Make Decisions</h4>
            <p className="text-sm text-muted-foreground">Compare options and choose the best investment strategy</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
};

export default Calculators;
