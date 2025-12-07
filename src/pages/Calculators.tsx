import { useState } from "react";
import { Calculator, Percent, Calendar, TrendingUp, PiggyBank, Landmark, IndianRupee, Target, ArrowUpRight, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ProductLayout from "@/components/ProductLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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

  // Chart data for SIP
  const generateSIPChartData = () => {
    const data = [];
    const monthlyRate = sipRate / 100 / 12;
    for (let year = 1; year <= sipYears; year++) {
      const months = year * 12;
      const fv = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const invested = sipAmount * months;
      data.push({
        year: `Year ${year}`,
        invested: Math.round(invested),
        value: Math.round(fv),
      });
    }
    return data;
  };

  // Pie chart data
  const fdPieData = [
    { name: "Principal", value: fdAmount, color: "#14b8a6" },
    { name: "Interest", value: fdResult.interest, color: "#3b82f6" },
  ];

  const sipPieData = [
    { name: "Invested", value: sipResult.invested, color: "#14b8a6" },
    { name: "Returns", value: sipResult.returns, color: "#f59e0b" },
  ];

  const lsPieData = [
    { name: "Principal", value: lsAmount, color: "#14b8a6" },
    { name: "Returns", value: lsResult.returns, color: "#8b5cf6" },
  ];

  return (
    <ProductLayout>
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 p-8 md:p-12 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Financial Calculators
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
              Plan Your Financial Future
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Use our easy-to-use calculators to estimate returns on your investments and make informed financial decisions.
            </p>
          </div>
        </div>

        {/* Calculator Tabs */}
        <Tabs defaultValue="fd" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-8 bg-muted/50 p-1.5 rounded-xl">
            <TabsTrigger value="fd" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm gap-2 rounded-lg py-3">
              <PiggyBank className="w-4 h-4" />
              <span className="hidden sm:inline">Fixed Deposit</span>
              <span className="sm:hidden">FD</span>
            </TabsTrigger>
            <TabsTrigger value="sip" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm gap-2 rounded-lg py-3">
              <TrendingUp className="w-4 h-4" />
              SIP
            </TabsTrigger>
            <TabsTrigger value="lumpsum" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm gap-2 rounded-lg py-3">
              <Landmark className="w-4 h-4" />
              Lumpsum
            </TabsTrigger>
          </TabsList>

          {/* FD Calculator */}
          <TabsContent value="fd" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="hover-lift border-0 shadow-lg">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <PiggyBank className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary">FD Calculator</h3>
                      <p className="text-sm text-muted-foreground">Calculate your maturity amount</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Principal Amount</Label>
                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                          <span className="font-bold text-primary">{formatCurrency(fdAmount)}</span>
                        </div>
                      </div>
                      <Slider
                        value={[fdAmount]}
                        onValueChange={(v) => setFdAmount(v[0])}
                        min={10000}
                        max={10000000}
                        step={10000}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹10K</span>
                        <span>₹1Cr</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Interest Rate (p.a.)</Label>
                        <div className="px-4 py-2 bg-blue-100 rounded-lg">
                          <span className="font-bold text-blue-600">{fdRate}%</span>
                        </div>
                      </div>
                      <Slider
                        value={[fdRate]}
                        onValueChange={(v) => setFdRate(v[0])}
                        min={3}
                        max={10}
                        step={0.1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>3%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Tenure</Label>
                        <div className="px-4 py-2 bg-amber-100 rounded-lg">
                          <span className="font-bold text-amber-600">{fdTenure} months</span>
                        </div>
                      </div>
                      <Slider
                        value={[fdTenure]}
                        onValueChange={(v) => setFdTenure(v[0])}
                        min={6}
                        max={120}
                        step={6}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>6 months</span>
                        <span>10 years</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-secondary font-medium">Compounding Frequency</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["monthly", "quarterly", "yearly"] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setFdCompounding(type)}
                            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                              fdCompounding === type
                                ? "bg-primary text-white shadow-md"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FD Results */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Maturity Summary
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={fdPieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={70}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {fdPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center space-y-3">
                        {fdPieData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-muted-foreground">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground">Principal Amount</span>
                        <span className="text-xl font-bold text-secondary">{formatCurrency(fdAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          Interest Earned
                        </span>
                        <span className="text-xl font-bold text-green-600">{formatCurrency(fdResult.interest)}</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg">
                        <span className="font-semibold">Total Maturity Value</span>
                        <span className="text-2xl font-bold">{formatCurrency(fdResult.maturity)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="text-sm text-amber-700">
                        *Calculations are indicative. Actual returns may vary based on bank policies and tax deductions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* SIP Calculator */}
          <TabsContent value="sip" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="hover-lift border-0 shadow-lg">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-amber-100">
                      <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary">SIP Calculator</h3>
                      <p className="text-sm text-muted-foreground">Plan your systematic investments</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Monthly Investment</Label>
                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                          <span className="font-bold text-primary">{formatCurrency(sipAmount)}</span>
                        </div>
                      </div>
                      <Slider
                        value={[sipAmount]}
                        onValueChange={(v) => setSipAmount(v[0])}
                        min={500}
                        max={100000}
                        step={500}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹500</span>
                        <span>₹1,00,000</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Expected Returns (p.a.)</Label>
                        <div className="px-4 py-2 bg-green-100 rounded-lg">
                          <span className="font-bold text-green-600">{sipRate}%</span>
                        </div>
                      </div>
                      <Slider
                        value={[sipRate]}
                        onValueChange={(v) => setSipRate(v[0])}
                        min={5}
                        max={30}
                        step={0.5}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Time Period</Label>
                        <div className="px-4 py-2 bg-purple-100 rounded-lg">
                          <span className="font-bold text-purple-600">{sipYears} years</span>
                        </div>
                      </div>
                      <Slider
                        value={[sipYears]}
                        onValueChange={(v) => setSipYears(v[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 year</span>
                        <span>30 years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SIP Results */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50/50 via-background to-primary/5">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Investment Summary
                    </h3>
                    
                    <div className="h-[200px] mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={generateSIPChartData()}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Area type="monotone" dataKey="invested" name="Invested" stroke="#f59e0b" fillOpacity={1} fill="url(#colorInvested)" strokeWidth={2} />
                          <Area type="monotone" dataKey="value" name="Value" stroke="#14b8a6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground">Total Invested</span>
                        <span className="text-xl font-bold text-secondary">{formatCurrency(sipResult.invested)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          Estimated Returns
                        </span>
                        <span className="text-xl font-bold text-green-600">{formatCurrency(sipResult.returns)}</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg">
                        <span className="font-semibold">Total Value</span>
                        <span className="text-2xl font-bold">{formatCurrency(sipResult.futureValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Lumpsum Calculator */}
          <TabsContent value="lumpsum" className="animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="hover-lift border-0 shadow-lg">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-purple-100">
                      <Landmark className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary">Lumpsum Calculator</h3>
                      <p className="text-sm text-muted-foreground">Calculate one-time investment returns</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Investment Amount</Label>
                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                          <span className="font-bold text-primary">{formatCurrency(lsAmount)}</span>
                        </div>
                      </div>
                      <Slider
                        value={[lsAmount]}
                        onValueChange={(v) => setLsAmount(v[0])}
                        min={10000}
                        max={10000000}
                        step={10000}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹10K</span>
                        <span>₹1Cr</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Expected Returns (p.a.)</Label>
                        <div className="px-4 py-2 bg-green-100 rounded-lg">
                          <span className="font-bold text-green-600">{lsRate}%</span>
                        </div>
                      </div>
                      <Slider
                        value={[lsRate]}
                        onValueChange={(v) => setLsRate(v[0])}
                        min={5}
                        max={30}
                        step={0.5}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-secondary font-medium">Time Period</Label>
                        <div className="px-4 py-2 bg-purple-100 rounded-lg">
                          <span className="font-bold text-purple-600">{lsYears} years</span>
                        </div>
                      </div>
                      <Slider
                        value={[lsYears]}
                        onValueChange={(v) => setLsYears(v[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 year</span>
                        <span>30 years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lumpsum Results */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50/50 via-background to-primary/5">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-primary" />
                      Investment Summary
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={lsPieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={70}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {lsPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center space-y-3">
                        {lsPieData.map((item) => (
                          <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-muted-foreground">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground">Principal Amount</span>
                        <span className="text-xl font-bold text-secondary">{formatCurrency(lsAmount)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          Estimated Returns
                        </span>
                        <span className="text-xl font-bold text-green-600">{formatCurrency(lsResult.returns)}</span>
                      </div>
                      <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg">
                        <span className="font-semibold">Total Value</span>
                        <span className="text-2xl font-bold">{formatCurrency(lsResult.futureValue)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Percent, title: "Accurate Estimates", desc: "Get precise calculations based on standard financial formulas", color: "bg-primary/10 text-primary" },
            { icon: Calendar, title: "Plan Ahead", desc: "Visualize your wealth growth over different time periods", color: "bg-amber-100 text-amber-600" },
            { icon: Target, title: "Compare Options", desc: "Easily compare different investment scenarios", color: "bg-purple-100 text-purple-600" },
          ].map((item, i) => (
            <Card key={i} className="hover-lift border-0 shadow-sm text-center">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-secondary mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProductLayout>
  );
};

export default Calculators;