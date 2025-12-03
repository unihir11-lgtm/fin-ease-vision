import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Upload, FileText } from "lucide-react";
import logo from "@/assets/finease-logo.png";

const KYC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePANSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "PAN Verified!", description: "Proceed to Aadhaar verification" });
      setStep(2);
    }, 1500);
  };

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Aadhaar Verified!", description: "Proceed to bank verification" });
      setStep(3);
    }, 1500);
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "KYC Complete!", description: "Your account is now active" });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img src={logo} alt="FinEase" className="h-10 mx-auto mb-4" />
          </a>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Complete Your KYC</h1>
          <p className="text-muted text-sm mt-2">Verify your identity to start investing</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step > s ? "bg-primary text-white" : step === s ? "bg-primary/20 text-primary border-2 border-primary" : "bg-gray-200 text-muted"
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm hidden sm:block ${step >= s ? "text-secondary" : "text-muted"}`}>
                {s === 1 ? "PAN" : s === 2 ? "Aadhaar" : "Bank"}
              </span>
              {s < 3 && <div className={`w-12 h-1 ${step > s ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
          {step === 1 && (
            <form onSubmit={handlePANSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-secondary mb-4">PAN Verification</h2>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" placeholder="ABCDE1234F" maxLength={10} required className="uppercase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="panName">Name as per PAN</Label>
                <Input id="panName" placeholder="Enter name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">Upload PAN Card Image</p>
                <input type="file" className="hidden" id="panFile" accept="image/*" />
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('panFile')?.click()}>
                  Choose File
                </Button>
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify PAN"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleAadhaarSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-secondary mb-4">Aadhaar Verification</h2>
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input id="aadhaar" placeholder="1234 5678 9012" maxLength={14} required />
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">Upload Aadhaar (Front & Back)</p>
                <input type="file" className="hidden" id="aadhaarFile" accept="image/*" multiple />
                <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById('aadhaarFile')?.click()}>
                  Choose Files
                </Button>
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Aadhaar"}
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleBankSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-secondary mb-4">Bank Account Verification</h2>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" placeholder="Enter account number" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input id="ifsc" placeholder="HDFC0001234" maxLength={11} required className="uppercase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Bank name (auto-filled)" disabled />
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Complete KYC"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYC;
