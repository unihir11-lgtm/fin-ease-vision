import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { 
  Phone, 
  Mail, 
  ArrowLeft, 
  User, 
  Shield, 
  Sparkles,
  TrendingUp,
  Building2,
  Lock,
  CheckCircle2
} from "lucide-react";
import logo from "@/assets/finease-logo.png";

type AuthMethod = "mobile" | "email";
type AuthStep = "input" | "otp";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("mobile");
  const [authStep, setAuthStep] = useState<AuthStep>("input");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  
  // Signup state
  const [signupStep, setSignupStep] = useState<"details" | "otp">("details");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const handleDemoLogin = (role: "user" | "admin") => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "admin") {
        toast({ 
          title: "Admin Login Successful!", 
          description: "Welcome to FinEase Admin Panel" 
        });
        navigate("/admin");
      } else {
        toast({ 
          title: "User Login Successful!", 
          description: "Welcome back to FinEase" 
        });
        navigate("/dashboard");
      }
    }, 800);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      toast({ title: "Invalid mobile number", description: "Please enter a valid 10-digit mobile number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep("otp");
      toast({ title: "OTP Sent!", description: `Verification code sent to +91 ${mobile}` });
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Login successful!", description: "Welcome back to FinEase" });
      navigate("/dashboard");
    }, 1000);
  };

  const handleSignupSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.mobile || signupData.mobile.length < 10) {
      toast({ title: "Invalid mobile number", description: "Please enter a valid 10-digit mobile number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSignupStep("otp");
      toast({ title: "OTP Sent!", description: `Verification code sent to +91 ${signupData.mobile}` });
    }, 1000);
  };

  const handleSignupVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Account created!", description: "Please complete your KYC" });
      navigate("/kyc");
    }, 1000);
  };

  const handleResendOTP = () => {
    toast({ title: "OTP Resent!", description: "A new verification code has been sent" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div>
            <a href="/" className="inline-block">
              <img src={logo} alt="FinEase" className="h-14 mb-6" />
            </a>
            <h1 className="text-4xl font-bold text-secondary font-['Raleway'] leading-tight">
              Your Digital Wealth
              <span className="text-primary"> Mall</span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Access all your investment needs in one place - IPO, Bonds, Fixed Deposits, and NPS.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">Smart Investments</h3>
                <p className="text-sm text-muted-foreground">Access curated investment options with detailed analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <div className="p-2 rounded-lg bg-accent/10">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">SEBI & RBI Compliant</h3>
                <p className="text-sm text-muted-foreground">All products follow regulatory guidelines</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Lock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary">Secure & Trusted</h3>
                <p className="text-sm text-muted-foreground">Bank-grade security for all transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="text-center mb-6 lg:hidden">
            <a href="/" className="inline-block">
              <img src={logo} alt="FinEase" className="h-12 mx-auto mb-4" />
            </a>
            <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Welcome to FinEase</h1>
          </div>

          {/* Demo Login Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-5 mb-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-secondary">Quick Demo Access</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Explore the platform instantly with demo accounts
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin("user")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group disabled:opacity-50"
              >
                <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-secondary text-sm">User</p>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white border-2 border-secondary/20 hover:border-secondary hover:bg-secondary/5 transition-all group disabled:opacity-50"
              >
                <div className="p-2 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-secondary text-sm">Admin</p>
                  <p className="text-xs text-muted-foreground">Panel</p>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No registration required for demo</span>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-br from-secondary/5 via-background to-primary/5 px-4 text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_0_rgba(23,93,128,0.08)] border border-[#E7F6FE]">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/5">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-primary">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {authStep === "input" ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    {/* Auth Method Toggle */}
                    <div className="flex gap-2 p-1 bg-secondary/5 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setAuthMethod("mobile")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                          authMethod === "mobile" 
                            ? "bg-white shadow-sm text-primary" 
                            : "text-muted-foreground hover:text-secondary"
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        Mobile
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod("email")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                          authMethod === "email" 
                            ? "bg-white shadow-sm text-primary" 
                            : "text-muted-foreground hover:text-secondary"
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                    </div>

                    {authMethod === "mobile" ? (
                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-secondary">Mobile Number</Label>
                        <div className="flex">
                          <span className="flex items-center px-3 bg-secondary/5 border border-r-0 border-input rounded-l-md text-secondary text-sm font-medium">
                            +91
                          </span>
                          <Input
                            id="mobile"
                            type="tel"
                            placeholder="Enter 10-digit mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            className="rounded-l-none focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-secondary">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          className="focus:ring-primary"
                          required 
                        />
                      </div>
                    )}

                    <Button type="submit" variant="finease" className="w-full h-12 text-base" disabled={isLoading}>
                      {isLoading ? "Sending OTP..." : "Get OTP"}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      By continuing, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline font-medium">Terms</a> &{" "}
                      <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => { setAuthStep("input"); setOtp(""); }}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary mb-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <div className="text-center mb-4 p-4 bg-secondary/5 rounded-xl">
                      <p className="text-sm text-muted-foreground">Enter the 6-digit OTP sent to</p>
                      <p className="font-semibold text-secondary text-lg">+91 {mobile}</p>
                    </div>

                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="border-secondary/20" />
                          <InputOTPSlot index={1} className="border-secondary/20" />
                          <InputOTPSlot index={2} className="border-secondary/20" />
                          <InputOTPSlot index={3} className="border-secondary/20" />
                          <InputOTPSlot index={4} className="border-secondary/20" />
                          <InputOTPSlot index={5} className="border-secondary/20" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button type="submit" variant="finease" className="w-full h-12 text-base" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify & Login"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Didn't receive OTP?{" "}
                      <button type="button" onClick={handleResendOTP} className="text-primary hover:underline font-medium">
                        Resend
                      </button>
                    </p>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="signup">
                {signupStep === "details" ? (
                  <form onSubmit={handleSignupSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-secondary">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your name"
                        value={signupData.fullName}
                        onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                        className="focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail" className="text-secondary">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="Enter email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupMobile" className="text-secondary">Mobile Number</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 bg-secondary/5 border border-r-0 border-input rounded-l-md text-secondary text-sm font-medium">
                          +91
                        </span>
                        <Input
                          id="signupMobile"
                          type="tel"
                          placeholder="Enter 10-digit mobile"
                          value={signupData.mobile}
                          onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          className="rounded-l-none focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" variant="finease" className="w-full h-12 text-base" disabled={isLoading}>
                      {isLoading ? "Sending OTP..." : "Get OTP & Register"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline font-medium">Terms</a> &{" "}
                      <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleSignupVerifyOTP} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => { setSignupStep("details"); setOtp(""); }}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary mb-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <div className="text-center mb-4 p-4 bg-secondary/5 rounded-xl">
                      <p className="text-sm text-muted-foreground">Enter the 6-digit OTP sent to</p>
                      <p className="font-semibold text-secondary text-lg">+91 {signupData.mobile}</p>
                    </div>

                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="border-secondary/20" />
                          <InputOTPSlot index={1} className="border-secondary/20" />
                          <InputOTPSlot index={2} className="border-secondary/20" />
                          <InputOTPSlot index={3} className="border-secondary/20" />
                          <InputOTPSlot index={4} className="border-secondary/20" />
                          <InputOTPSlot index={5} className="border-secondary/20" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button type="submit" variant="finease" className="w-full h-12 text-base" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Verify & Create Account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      Didn't receive OTP?{" "}
                      <button type="button" onClick={handleResendOTP} className="text-primary hover:underline font-medium">
                        Resend
                      </button>
                    </p>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Back to Home</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-primary transition-colors">Need Help?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
