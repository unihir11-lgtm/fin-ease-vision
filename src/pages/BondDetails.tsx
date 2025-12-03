import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bonds } from "@/data/mockData";
import { ArrowLeft, FileText, AlertTriangle, Download, CheckCircle, IndianRupee } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/finease-logo.png";

const BondDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bond = bonds.find((b) => b.id === id);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bond) {
    return <div className="p-8 text-center">Bond not found</div>;
  }

  const units = amount ? Math.floor(Number(amount) / bond.faceValue) : 0;
  const totalAmount = units * bond.faceValue;

  const handleInvest = () => {
    if (Number(amount) < bond.minInvestment) {
      toast({ title: "Error", description: `Minimum investment is ₹${bond.minInvestment}`, variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({ title: "Investment Successful!", description: `You've invested ₹${totalAmount.toLocaleString()} in ${bond.issuer}` });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/bonds" className="text-muted hover:text-primary">
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
          {/* Bond Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      bond.rating === "AAA" ? "bg-green-100 text-green-700" :
                      bond.rating === "AA+" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {bond.rating}
                    </span>
                    <span className="text-sm bg-gray-100 text-muted px-3 py-1 rounded-full">{bond.bondType}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-secondary font-['Raleway']">{bond.issuer}</h1>
                  <p className="text-muted">ISIN: {bond.isin}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{bond.yield}%</p>
                  <p className="text-sm text-muted">Yield to Maturity</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
                <div>
                  <p className="text-sm text-muted mb-1">Coupon Rate</p>
                  <p className="text-lg font-bold text-secondary">{bond.couponRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Tenure</p>
                  <p className="text-lg font-bold text-secondary">{bond.tenure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Maturity Date</p>
                  <p className="text-lg font-bold text-secondary">{bond.maturityDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Payout</p>
                  <p className="text-lg font-bold text-secondary">{bond.payoutFrequency}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <p className="text-sm text-muted mb-1">Face Value</p>
                  <p className="font-medium text-secondary">₹{bond.faceValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Min. Investment</p>
                  <p className="font-medium text-secondary">₹{bond.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Risk Level</p>
                  <p className="font-medium text-secondary">{bond.riskLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Settlement</p>
                  <p className="font-medium text-secondary">T+2 Days</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4">Documents</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-left text-secondary">Offer Document</span>
                  <Download className="w-4 h-4 text-muted" />
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-left text-secondary">Information Memorandum</span>
                  <Download className="w-4 h-4 text-muted" />
                </button>
              </div>
            </div>

            {/* Risk Warning */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Risk Warning</p>
                <p>Investments in bonds are subject to market risks. Past performance is not indicative of future results. Please read all offer documents carefully before investing.</p>
              </div>
            </div>
          </div>

          {/* Investment Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
              <h3 className="font-bold text-secondary mb-4">Invest in this Bond</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount</Label>
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
                  <p className="text-xs text-muted">Min. ₹{bond.minInvestment.toLocaleString()}</p>
                </div>

                {amount && Number(amount) >= bond.minInvestment && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Units</span>
                      <span className="font-medium text-secondary">{units}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Investment Amount</span>
                      <span className="font-medium text-secondary">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Expected Yield</span>
                      <span className="font-medium text-green-600">₹{Math.round(totalAmount * bond.yield / 100).toLocaleString()} / year</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted">Settlement Date</span>
                      <span className="font-medium text-secondary">
                        {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full bg-primary" 
                  size="lg"
                  onClick={handleInvest}
                  disabled={!amount || Number(amount) < bond.minInvestment || isProcessing}
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

export default BondDetails;
