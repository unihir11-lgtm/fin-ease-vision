import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fdProviders } from "@/data/fdData";
import { ArrowLeft, Shield, CheckCircle, User, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import logo from "@/assets/finease-logo.png";
import Footer from "@/components/Footer";

const FDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fd = fdProviders.find((f) => f.id === id);

  const [customerType, setCustomerType] = useState<"below60" | "above60">("below60");
  const [depositAmount, setDepositAmount] = useState(100000);
  const [tenure, setTenure] = useState(60);
  const [payoutFrequency, setPayoutFrequency] = useState("Annually");

  if (!fd) {
    return <div className="p-8 text-center">FD not found</div>;
  }

  // Get rate based on tenure and customer type
  const getRate = () => {
    const tenureOption = fd.tenureOptions.find((t) => t.months === tenure);
    if (!tenureOption) return customerType === "above60" ? fd.seniorCitizenRate : fd.interestRate;
    return customerType === "above60" ? tenureOption.seniorRate : tenureOption.rate;
  };

  const rate = getRate();

  // Calculate interest and maturity
  const calculateReturns = () => {
    const years = tenure / 12;
    let maturityValue: number;
    let totalInterest: number;

    if (payoutFrequency === "Cumulative") {
      maturityValue = depositAmount * Math.pow(1 + rate / 100 / 4, 4 * years);
    } else {
      maturityValue = depositAmount * (1 + (rate / 100) * years);
    }

    totalInterest = maturityValue - depositAmount;
    
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + tenure);

    return {
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue),
      maturityDate: maturityDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    };
  };

  const returns = calculateReturns();

  const handleOpenFD = () => {
    toast({
      title: "FD Application Submitted",
      description: `Your FD of ₹${depositAmount.toLocaleString()} with ${fd.bankName} is being processed.`,
    });
    navigate("/dashboard/fds");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/fds" className="text-muted hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link to="/">
              <img src={logo} alt="FinEase" className="h-10" />
            </Link>
          </div>
          <div className="hidden md:flex relative w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input placeholder="Search Stock, MF, IPO..." className="pl-10 bg-gray-50" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/ipo" className="text-muted hover:text-primary font-medium">IPO</Link>
            <Link to="/bonds" className="text-muted hover:text-primary font-medium">Bond</Link>
            <Link to="/fds" className="text-primary font-medium">FD</Link>
            <Link to="/dashboard/nps" className="text-muted hover:text-primary font-medium">NPS</Link>
            <a href="https://www.thefinease.com/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary font-medium">Screener</a>
          </nav>
          <Link to="/auth" className="flex items-center gap-2">
            <div className="h-10 w-10 p-2 bg-[#E4FFFB] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <span className="hidden md:block text-muted font-bold">Login / Sign up</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* FD Header Card */}
        <Card className="finease-card mb-8 bg-gradient-to-r from-primary/5 to-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
                  {fd.logo}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-secondary">{fd.bankName}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">Regulated by the RBI</Badge>
                    <Badge variant="outline">{fd.type}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">Returns upto</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">{fd.interestRate}% p.a</p>
                <p className="text-muted">Tenure {fd.maxTenure}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Section */}
        <h2 className="text-xl font-bold text-primary mb-6">Fixed Deposit Calculator</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Calculator Form */}
          <Card className="finease-card lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              {/* Customer Type */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-secondary">Customer Type</span>
                <div className="flex gap-2">
                  <Button
                    variant={customerType === "below60" ? "default" : "outline"}
                    onClick={() => setCustomerType("below60")}
                    className={customerType === "below60" ? "finease-btn" : ""}
                  >
                    Below 60 Age Group
                  </Button>
                  <Button
                    variant={customerType === "above60" ? "default" : "outline"}
                    onClick={() => setCustomerType("above60")}
                    className={customerType === "above60" ? "finease-btn" : ""}
                  >
                    Above 60 Age Group
                  </Button>
                </div>
              </div>

              {/* Deposit Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-secondary">Deposit Amount</span>
                  <span className="font-bold text-secondary">₹{depositAmount.toLocaleString()}</span>
                </div>
                <Slider
                  value={[depositAmount]}
                  onValueChange={(value) => setDepositAmount(value[0])}
                  min={fd.minDeposit}
                  max={Math.min(fd.maxDeposit, 3000000)}
                  step={5000}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted">
                  <span>₹{fd.minDeposit.toLocaleString()}</span>
                  <span>₹3CR</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-secondary">Customer Tenure</span>
                  <span className="font-bold text-secondary">{tenure}</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={12}
                  max={60}
                  step={1}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted">
                  <span>12</span>
                  <span>60</span>
                </div>
              </div>

              {/* Interest Payout */}
              <div>
                <span className="font-medium text-secondary">Interest Amount Frequency</span>
                <Select value={payoutFrequency} onValueChange={setPayoutFrequency}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fd.payoutOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="finease-card bg-primary text-white">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-sm opacity-80">Annualized Rate of Interest</p>
                <p className="text-4xl font-bold mt-1">{rate.toFixed(2)}%</p>
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex justify-between">
                  <span className="opacity-80">Total Interest</span>
                  <span className="font-bold">₹{returns.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Maturity Time</span>
                  <span className="font-bold">{returns.maturityDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Total maturity Payout</span>
                  <span className="font-bold">₹{(returns.maturityValue / 100000).toFixed(2)}L</span>
                </div>
              </div>
              <Button
                className="w-full bg-white text-primary hover:bg-white/90 font-bold mt-4"
                size="lg"
                onClick={handleOpenFD}
              >
                Open FD
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Why Invest Section */}
        <Card className="finease-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Why to Invest now?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fd.features.map((feature, index) => (
                <div key={index} className="border-b pb-4">
                  <h4 className="font-bold text-secondary mb-1">
                    {feature.split(":")[0] || feature.split(" ").slice(0, 3).join(" ")}
                  </h4>
                  <p className="text-sm text-muted">{feature}</p>
                </div>
              ))}
              <div className="border-b pb-4">
                <h4 className="font-bold text-secondary mb-1">DICGC Insured</h4>
                <p className="text-sm text-muted">
                  Insured up to ₹5 Lakh by wholly-owned subsidiary of the Reserve Bank of India
                </p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-bold text-secondary mb-1">No New Bank Account</h4>
                <p className="text-sm text-muted">
                  Skip Opening a New Bank Account, invest in Fixed Deposits Effortlessly
                </p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-bold text-secondary mb-1">Choose Your Own Term</h4>
                <p className="text-sm text-muted">
                  Pick a Fixed Deposit Tenure from 12 months to 36 months - Fits Your Goals!
                </p>
              </div>
              <div className="border-b pb-4">
                <h4 className="font-bold text-secondary mb-1">Easy Withdrawal</h4>
                <p className="text-sm text-muted">
                  Flexible withdrawals available after 7 days
                </p>
              </div>
              <div className="border-b pb-4 md:col-span-2">
                <h4 className="font-bold text-secondary mb-1">Competitive Interest Rates</h4>
                <p className="text-sm text-muted">
                  Enjoy attractive interest rates that enhance your savings potential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-secondary mb-3">Important Disclaimer</h3>
          <ul className="text-sm text-muted space-y-2">
            <li>• Fixed Deposits are subject to terms and conditions of the respective bank/NBFC.</li>
            <li>• Interest rates are subject to change without prior notice.</li>
            <li>• TDS will be deducted at source as per Income Tax rules if interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.</li>
            <li>• FDs up to ₹5 lakhs per depositor per bank are insured under DICGC.</li>
            <li>• Premature withdrawal may attract penalty as per bank's policy.</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FDDetails;
