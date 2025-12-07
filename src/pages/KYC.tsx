import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, Upload, FileText, Shield, User, CreditCard, 
  Building2, ArrowLeft, ArrowRight, Fingerprint, Clock, AlertCircle,
  Camera, BadgeCheck
} from "lucide-react";
import logo from "@/assets/finease-logo.png";

const KYC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [aadhaarFiles, setAadhaarFiles] = useState<File[]>([]);

  const steps = [
    { number: 1, title: "PAN Verification", icon: CreditCard },
    { number: 2, title: "Aadhaar Verification", icon: Fingerprint },
    { number: 3, title: "Bank Details", icon: Building2 },
  ];

  const progress = (step / 3) * 100;

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pan' | 'aadhaar') => {
    if (e.target.files) {
      if (type === 'pan') {
        setPanFile(e.target.files[0]);
      } else {
        setAadhaarFiles(Array.from(e.target.files));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="FinEase" className="h-10" />
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-secondary font-['Raleway'] mb-2">Complete Your KYC</h1>
          <p className="text-muted-foreground">Verify your identity to start investing securely</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          {steps.map((s, index) => {
            const StepIcon = s.icon;
            return (
              <div key={s.number} className="flex items-center">
                <div className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                  step > s.number 
                    ? "bg-green-100 text-green-700" 
                    : step === s.number 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step > s.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                  <span className="hidden md:block text-sm font-medium">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${step > s.number ? "bg-green-500" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden">
          <CardContent className="p-8">
            {step === 1 && (
              <form onSubmit={handlePANSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary">PAN Card Verification</h2>
                    <p className="text-sm text-muted-foreground">Enter your PAN details for identity verification</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pan" className="flex items-center gap-2">
                      PAN Number <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="pan" 
                      placeholder="ABCDE1234F" 
                      maxLength={10} 
                      required 
                      className="uppercase text-lg tracking-wider"
                    />
                    <p className="text-xs text-muted-foreground">10-character alphanumeric PAN</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panName" className="flex items-center gap-2">
                      Name as per PAN <span className="text-red-500">*</span>
                    </Label>
                    <Input id="panName" placeholder="Enter your full name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input id="dob" type="date" required className="max-w-xs" />
                </div>

                <div className="space-y-3">
                  <Label>Upload PAN Card</Label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                      panFile ? 'border-green-500 bg-green-50' : 'border-border'
                    }`}
                    onClick={() => document.getElementById('panFile')?.click()}
                  >
                    {panFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-green-700">{panFile.name}</p>
                          <p className="text-sm text-green-600">File uploaded successfully</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="font-medium text-secondary">Click to upload PAN Card</p>
                        <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, PDF (Max 5MB)</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      id="panFile" 
                      accept="image/*,.pdf" 
                      onChange={(e) => handleFileChange(e, 'pan')}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-700">Important</p>
                    <p className="text-amber-600">Ensure your PAN card image is clear and all details are readable.</p>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary h-12 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 animate-spin" /> Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Verify PAN & Continue <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleAadhaarSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Fingerprint className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary">Aadhaar Verification</h2>
                    <p className="text-sm text-muted-foreground">Enter your Aadhaar details for address verification</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhaar" className="flex items-center gap-2">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="aadhaar" 
                    placeholder="1234 5678 9012" 
                    maxLength={14} 
                    required 
                    className="text-lg tracking-wider"
                  />
                  <p className="text-xs text-muted-foreground">12-digit Aadhaar number</p>
                </div>

                <div className="space-y-3">
                  <Label>Upload Aadhaar Card (Front & Back)</Label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                      aadhaarFiles.length > 0 ? 'border-green-500 bg-green-50' : 'border-border'
                    }`}
                    onClick={() => document.getElementById('aadhaarFile')?.click()}
                  >
                    {aadhaarFiles.length > 0 ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-green-700">{aadhaarFiles.length} file(s) uploaded</p>
                          <p className="text-sm text-green-600">Files uploaded successfully</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="font-medium text-secondary">Click to upload Aadhaar (Front & Back)</p>
                        <p className="text-sm text-muted-foreground mt-1">You can select multiple files</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      id="aadhaarFile" 
                      accept="image/*,.pdf" 
                      multiple
                      onChange={(e) => handleFileChange(e, 'aadhaar')}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary h-12 text-lg" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-spin" /> Verifying...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Verify Aadhaar <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleBankSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary">Bank Account Verification</h2>
                    <p className="text-sm text-muted-foreground">Link your bank account for investments</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="flex items-center gap-2">
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="accountNumber" 
                      placeholder="Enter account number" 
                      required 
                      type="password"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmAccount" className="flex items-center gap-2">
                      Confirm Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="confirmAccount" 
                      placeholder="Re-enter account number" 
                      required 
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ifsc" className="flex items-center gap-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="ifsc" 
                      placeholder="HDFC0001234" 
                      maxLength={11} 
                      required 
                      className="uppercase text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName" 
                      placeholder="Auto-detected from IFSC" 
                      disabled 
                      className="bg-muted/50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-700">Secure Verification</p>
                      <p className="text-green-600">We'll deposit ₹1 to verify your account. This amount will be credited back.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary h-12 text-lg" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Clock className="w-5 h-5 animate-spin" /> Completing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Complete KYC <CheckCircle className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-white/50 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
