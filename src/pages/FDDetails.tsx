import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fixedDeposits } from "@/data/mockData";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, IndianRupee, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/finease-logo.png";

const FDDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fd = fixedDeposits.find((f) => f.id === id);
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [payoutType, setPayoutType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!fd) {
    return <div className="p-8 text-center">FD not found</div>;
  }

  const calculateMaturity = () => {
    if (!amount || !tenure) return 0;
    const principal = Number(amount);
    const years = parseInt(tenure);
    const rate = fd.interestRate / 100;
    
    if (payoutType === "Cumulative") {
      return Math.round(principal * Math.pow(1 + rate / 4, 4 * years));
    }
    return Math.round(principal * (1 + rate * years));
  };

  const maturityValue = calculateMaturity();

  const handleInvest = () => {
    if (Number(amount) < fd.minDeposit) {
      toast({ title: "Error", description: `Minimum deposit is ₹${fd.minDeposit}`, variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: "FD Booked Successfully!", description: `Your FD of ₹${Number(amount).toLocaleString()} with ${fd.bankName} is confirmed.` });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/fds" className="text-muted hover:text-primary">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FD Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
                  {fd.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      fd.creditRating === "AAA" ? "bg-green-100 text-green-700" :
                      fd.creditRating === "AA+" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {fd.creditRating}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted">
                      <Shield className="w-4 h-4" />
                      DICGC Insured
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-secondary font-['Raleway']">{fd.bankName} FD</h1>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{fd.interestRate}%</p>
                  <p className="text-sm text-muted">p.a.</p>
                </div>
              </div>

              {/* Interest Rate Table */}
              <div className="mb-6">
                <h3 className="font-bold text-secondary mb-3">Interest Rate Structure</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-3 font-medium text-muted">Tenure</th>
                        <th className="text-right p-3 font-medium text-muted">General</th>
                        <th className="text-right p-3 font-medium text-muted">Senior Citizen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-secondary">1 Year</td>
                        <td className="p-3 text-right font-medium text-secondary">{fd.interestRate}%</td>
                        <td className="p-3 text-right font-medium text-green-600">{fd.seniorCitizenRate}%</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-secondary">2 Years</td>
                        <td className="p-3 text-right font-medium text-secondary">{(fd.interestRate + 0.1).toFixed(2)}%</td>
                        <td className="p-3 text-right font-medium text-green-600">{(fd.seniorCitizenRate + 0.1).toFixed(2)}%</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="p-3 text-secondary">3 Years</td>
                        <td className="p-3 text-right font-medium text-secondary">{(fd.interestRate + 0.15).toFixed(2)}%</td>
                        <td className="p-3 text-right font-medium text-green-600">{(fd.seniorCitizenRate + 0.15).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
                <div>
                  <p className="text-sm text-muted mb-1">Min. Deposit</p>
                  <p className="font-bold text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Max. Deposit</p>
                  <p className="font-bold text-secondary">₹{(fd.maxDeposit / 10000000).toFixed(0)} Cr</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Payout Options</p>
                  <p className="font-bold text-secondary">{fd.payoutOptions.length} Types</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Premature Withdrawal</p>
                  <p className="font-bold text-secondary">{fd.prematureWithdrawal}</p>
                </div>
              </div>

              {/* Features */}
              <div className="pt-6">
                <h3 className="font-bold text-secondary mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Auto-renewal facility", "Loan against FD available", "Nomination facility", "TDS applicable as per norms"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important Information</p>
                <p>Interest rates are subject to change without prior notice. TDS will be deducted at source as per Income Tax rules. FDs up to ₹5 lakhs are insured under DICGC.</p>
              </div>
            </div>
          </div>

          {/* Investment Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
              <h3 className="font-bold text-secondary mb-4">Book Fixed Deposit</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Deposit Amount</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      className="pl-10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted">Min. ₹{fd.minDeposit.toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  <Label>Select Tenure</Label>
                  <Select value={tenure} onValueChange={setTenure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Payout Type</Label>
                  <Select value={payoutType} onValueChange={setPayoutType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose payout" />
                    </SelectTrigger>
                    <SelectContent>
                      {fd.payoutOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {amount && tenure && payoutType && Number(amount) >= fd.minDeposit && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Principal</span>
                      <span className="font-medium text-secondary">₹{Number(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Interest Rate</span>
                      <span className="font-medium text-secondary">{fd.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Tenure</span>
                      <span className="font-medium text-secondary">{tenure} Year(s)</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted">Maturity Value</span>
                      <span className="font-bold text-green-600">₹{maturityValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Interest Earned</span>
                      <span className="font-medium text-green-600">₹{(maturityValue - Number(amount)).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-primary" 
                  size="lg"
                  onClick={handleInvest}
                  disabled={!amount || !tenure || !payoutType || Number(amount) < fd.minDeposit || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Proceed to Pay"}
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted justify-center">
                  <CheckCircle className="w-3 h-3" />
                  <span>Secure payment via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FDDetails;
