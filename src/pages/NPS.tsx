import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductLayout from "@/components/ProductLayout";
import { 
  Calculator, 
  Users, 
  Building2, 
  Shield, 
  TrendingUp, 
  PiggyBank,
  Clock,
  BadgeCheck,
  Wallet,
  LayoutDashboard,
  UserPlus,
  IndianRupee,
  Target,
  Award,
  HeartHandshake
} from "lucide-react";
import { useState } from "react";

const NPS = () => {
  const navigate = useNavigate();
  const [calculatorData, setCalculatorData] = useState({
    dob: "2007-08-15",
    existingCorpus: "100",
    monthlyContribution: "1000",
    retirementAge: "60",
    expectedReturn: "10",
    deferWithdrawal: "5",
    annualIncrease: "6.5",
    annuityRatio: "40",
    annuityRate: "6.5"
  });

  const [results, setResults] = useState({
    projectedCorpus: 93,
    lumpsumWithdrawal: 5577447,
    monthlyPension: 20915,
    totalCorpus: 13987542
  });

  const handleCalculatorChange = (field: string, value: string) => {
    setCalculatorData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setCalculatorData({
      dob: "2007-08-15",
      existingCorpus: "100",
      monthlyContribution: "1000",
      retirementAge: "60",
      expectedReturn: "10",
      deferWithdrawal: "5",
      annualIncrease: "6.5",
      annuityRatio: "40",
      annuityRate: "6.5"
    });
  };

  const features = [
    {
      icon: Shield,
      title: "Government Backed",
      description: "NPS is regulated by PFRDA under the Government of India"
    },
    {
      icon: TrendingUp,
      title: "Market-Linked Returns",
      description: "Potential for higher returns through equity exposure"
    },
    {
      icon: PiggyBank,
      title: "Tax Benefits",
      description: "Up to ₹2 lakh tax deduction under 80C & 80CCD"
    },
    {
      icon: Clock,
      title: "Flexible Investment",
      description: "Choose your own asset allocation and fund managers"
    },
    {
      icon: BadgeCheck,
      title: "Low Cost",
      description: "One of the lowest fund management charges globally"
    },
    {
      icon: Wallet,
      title: "Pension for Life",
      description: "Regular income after retirement through annuity"
    }
  ];

  const faqs = [
    {
      question: "What is the difference between Tier 1 and Tier 2 Account?",
      answer: "Both NPS Tier 1 and Tier 2 accounts have their set of advantages and considerations. While Tier 1 offers significant tax benefits and is primarily designed for long-term retirement savings, Tier 2 investments provide more withdrawal flexibility and can cater to immediate financial needs."
    },
    {
      question: "What are the Documents required to open NPS?",
      answer: "You will need basic KYC documents such as Aadhaar, PAN card, address proof, and a passport-size photograph. For online registration, digital copies are sufficient."
    },
    {
      question: "What are the Different Schemes for Investment?",
      answer: "NPS offers Active Choice where you can decide your asset allocation among Equity (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A). Auto Choice automatically allocates assets based on your age."
    },
    {
      question: "What is the minimum contribution for NPS?",
      answer: "The minimum contribution for Tier 1 is ₹500 per contribution and ₹1,000 per year. For Tier 2, the minimum is ₹250 per contribution with no minimum annual requirement."
    },
    {
      question: "Can I withdraw from NPS before retirement?",
      answer: "Partial withdrawal is allowed after 3 years of account opening for specific purposes like higher education, marriage, house purchase, or medical treatment. Up to 25% of your contributions can be withdrawn."
    }
  ];

  return (
    <ProductLayout>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[550px] bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Government Backed Pension Scheme
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display leading-tight">
                Invest To Secure Your Retirement & Save Taxes
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Seamlessly manage and track all your NPS investments with cutting-edge technology - empowering you to make informed decisions for a secure financial future.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-white text-secondary hover:bg-white/90 font-bold px-8 py-6 text-lg shadow-xl"
                  onClick={() => navigate("/nps/register")}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg backdrop-blur-sm"
                  onClick={() => navigate("/dashboard/nps")}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Button>
              </div>

              <div className="flex flex-wrap gap-6">
                {[
                  { value: "₹2L", label: "Tax Savings" },
                  { value: "10%+", label: "Returns" },
                  { value: "0.01%", label: "Fund Charges" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Shield, label: "Govt Backed", color: "bg-green-500/20" },
                      { icon: TrendingUp, label: "Market Returns", color: "bg-blue-500/20" },
                      { icon: PiggyBank, label: "Tax Benefits", color: "bg-amber-500/20" },
                      { icon: Wallet, label: "Low Cost", color: "bg-purple-500/20" },
                    ].map((item, i) => (
                      <div key={i} className={`${item.color} p-4 rounded-2xl text-center`}>
                        <item.icon className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pension Calculator Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calculator Form */}
            <Card className="border border-border shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl lg:text-3xl font-display text-primary flex items-center justify-center gap-3">
                  <Calculator className="h-8 w-8 text-[#1dab91]" />
                  Pension Calculator NPS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      value={calculatorData.dob}
                      onChange={(e) => handleCalculatorChange("dob", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="corpus">Existing NPS Tier 1 Corpus</Label>
                    <Input 
                      id="corpus" 
                      type="number" 
                      value={calculatorData.existingCorpus}
                      onChange={(e) => handleCalculatorChange("existingCorpus", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly">I would like to contribute (per month)</Label>
                    <Input 
                      id="monthly" 
                      type="number" 
                      value={calculatorData.monthlyContribution}
                      onChange={(e) => handleCalculatorChange("monthlyContribution", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retAge">Retirement Age (In Years)</Label>
                    <Select value={calculatorData.retirementAge} onValueChange={(v) => handleCalculatorChange("retirementAge", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[58, 60, 62, 65, 70].map(age => (
                          <SelectItem key={age} value={String(age)}>{age}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="return">My Expected return on Investment is (%)</Label>
                    <Select value={calculatorData.expectedReturn} onValueChange={(v) => handleCalculatorChange("expectedReturn", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[8, 10, 12, 15].map(rate => (
                          <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defer">Defer withdrawal until age (Years)</Label>
                    <Select value={calculatorData.deferWithdrawal} onValueChange={(v) => handleCalculatorChange("deferWithdrawal", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 5, 7, 10].map(year => (
                          <SelectItem key={year} value={String(year)}>{year}%</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="increase">% Annual Increase in contribution</Label>
                    <Select value={calculatorData.annualIncrease} onValueChange={(v) => handleCalculatorChange("annualIncrease", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5.5, 6, 6.5, 7, 7.5].map(rate => (
                          <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annuityRatio">I would like to purchase annuity ratio (%)</Label>
                    <Select value={calculatorData.annuityRatio} onValueChange={(v) => handleCalculatorChange("annuityRatio", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[30, 35, 40, 45, 50].map(rate => (
                          <SelectItem key={rate} value={String(rate)}>{rate}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annuityRate">I am expecting an annuity rate of (%)</Label>
                  <Select value={calculatorData.annuityRate} onValueChange={(v) => handleCalculatorChange("annuityRate", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5.5, 6, 6.5, 7, 7.5].map(rate => (
                        <SelectItem key={rate} value={String(rate)}>{rate}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={handleReset}>
                  Reset
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-[#1dab91] to-[#175d80] text-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-center">
                    Your Projected Corpus at the time of exit: <span className="text-2xl font-bold">{results.projectedCorpus / 100} Cr</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-white/80 mb-2">Lumpsum Withdrawal</p>
                      <p className="text-2xl font-bold">₹ {results.lumpsumWithdrawal.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/80 mb-2">Monthly Pension</p>
                      <p className="text-2xl font-bold">₹ {results.monthlyPension.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-center mb-6">Status of your Pension Account at retirement</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Total Corpus</span>
                      <span className="font-bold text-primary">₹ {results.totalCorpus.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#1dab91]/10 rounded-lg">
                      <span className="text-muted-foreground">Lumpsum Withdrawal</span>
                      <span className="font-semibold text-[#1dab91]">₹ {results.lumpsumWithdrawal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#175d80]/10 rounded-lg">
                      <span className="text-muted-foreground">Monthly Pension</span>
                      <span className="font-semibold text-[#175d80]">₹ {results.monthlyPension.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Register Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center text-primary mb-12">
            Who Can Register For NPS?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Subscribers */}
            <Card className="border border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#1dab91]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-[#1dab91]" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Individual Subscribers</h3>
                <ul className="text-left space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#1dab91] mt-0.5 flex-shrink-0" />
                    <span>Between 18–70 years can join</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#1dab91] mt-0.5 flex-shrink-0" />
                    <span>Easy and multiple registration options (Aadhaar, Digilocker etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#1dab91] mt-0.5 flex-shrink-0" />
                    <span>Open Tier I (Pension A/c) and Tier II (Add-on investment A/c)</span>
                  </li>
                </ul>
                <Button 
                  className="bg-[#1dab91] hover:bg-[#18937c] text-white w-full"
                  onClick={() => navigate("/nps/register")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>

            {/* NPS Vatsalya */}
            <Card className="border border-border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#175d80]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-[#175d80]" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">NPS Vatsalya (Minors)</h3>
                <ul className="text-left space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#175d80] mt-0.5 flex-shrink-0" />
                    <span>Subscriber below 18 years of age</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#175d80] mt-0.5 flex-shrink-0" />
                    <span>Easy and multiple registration options (Aadhaar, Digilocker etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-[#175d80] mt-0.5 flex-shrink-0" />
                    <span>Applicable for NRI & OCI Subscribers also. Contributions accepted from NRE/NRO A/c.</span>
                  </li>
                </ul>
                <Button 
                  variant="outline"
                  className="border-[#175d80] text-[#175d80] hover:bg-[#175d80]/10 w-full"
                  onClick={() => navigate("/nps/register")}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Build Your Retirement Plan Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center text-primary mb-12">
            Build Your Retirement Plan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1dab91]/20 to-[#175d80]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-[#1dab91]" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-[#0a344a] to-[#175d80]">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Tax Benefits Under NPS
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Maximize your tax savings with NPS - one of the most tax-efficient retirement savings options
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <IndianRupee className="h-10 w-10 mx-auto mb-4 text-[#1dab91]" />
                <h3 className="text-xl font-bold mb-2">₹1.5 Lakh</h3>
                <p className="text-white/80 text-sm">Under Section 80C</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Target className="h-10 w-10 mx-auto mb-4 text-[#1dab91]" />
                <h3 className="text-xl font-bold mb-2">₹50,000</h3>
                <p className="text-white/80 text-sm">Additional under 80CCD(1B)</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Award className="h-10 w-10 mx-auto mb-4 text-[#1dab91]" />
                <h3 className="text-xl font-bold mb-2">₹2 Lakh</h3>
                <p className="text-white/80 text-sm">Total Tax Benefit</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-center text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                  {index + 1}. {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#1dab91] to-[#175d80] border-0 shadow-xl">
            <CardContent className="p-8 lg:p-12 text-center text-white">
              <HeartHandshake className="h-16 w-16 mx-auto mb-6 text-white/90" />
              <h2 className="text-2xl lg:text-3xl font-display font-bold mb-4">
                Start Your Retirement Journey Today
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join millions of Indians who have secured their future with NPS. 
                Open your account in minutes and start building your retirement corpus.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-[#175d80] hover:bg-white/90 font-semibold px-8"
                  onClick={() => navigate("/nps/register")}
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Open NPS Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8"
                  onClick={() => navigate("/dashboard/nps")}
                >
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </ProductLayout>
  );
};

export default NPS;
