import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
  CheckCircle2,
  PiggyBank,
  BarChart3,
  Wallet,
  ArrowRight
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

  const features = [
    { icon: TrendingUp, title: "Smart Investments", desc: "Access curated investment options with detailed analysis", color: "bg-primary/10 text-primary" },
    { icon: Building2, title: "SEBI & RBI Compliant", desc: "All products follow regulatory guidelines", color: "bg-accent/10 text-accent" },
    { icon: Lock, title: "Secure & Trusted", desc: "Bank-grade security for all transactions", color: "bg-secondary/10 text-secondary" },
    { icon: BarChart3, title: "Portfolio Tracking", desc: "Real-time insights and analytics", color: "bg-amber-100 text-amber-600" },
  ];

  const stats = [
    { value: "₹500Cr+", label: "AUM" },
    { value: "50K+", label: "Investors" },
    { value: "4.8★", label: "Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="relative z-10 flex flex-col h-full">
          <a href="/" className="inline-block w-fit">
            <img src={logo} alt="FinEase" className="h-12 brightness-0 invert" />
          </a>
          
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold text-white font-display leading-tight mb-6">
              Your Digital Wealth
              <span className="text-primary brightness-150"> Mall</span>
            </h1>
            <p className="text-white/70 text-lg mb-10">
              Access all your investment needs in one place - IPO, Bonds, Fixed Deposits, and NPS.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                  <div className={`p-2.5 rounded-lg ${feature.color} bg-white/10 w-fit mb-3`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-sm">
            © 2025 FinEase Research Pvt. Ltd.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <a href="/" className="inline-block">
              <img src={logo} alt="FinEase" className="h-12 mx-auto mb-4" />
            </a>
            <h1 className="text-2xl font-bold text-secondary font-display">Welcome to FinEase</h1>
          </div>

          {/* Demo Login Section */}
          <Card className="border-0 shadow-lg mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-1" />
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">Quick Demo Access</h3>
                  <p className="text-xs text-muted-foreground">Explore the platform instantly</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDemoLogin("user")}
                  disabled={isLoading}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all group disabled:opacity-50"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-secondary text-sm">User</p>
                    <p className="text-xs text-muted-foreground">Dashboard</p>
                  </div>
                </button>
                <button
                  onClick={() => handleDemoLogin("admin")}
                  disabled={isLoading}
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border-2 border-transparent hover:border-secondary hover:bg-secondary/5 transition-all group disabled:opacity-50"
                >
                  <div className="p-2.5 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-secondary text-sm">Admin</p>
                    <p className="text-xs text-muted-foreground">Panel</p>
                  </div>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No registration required for demo</span>
              </div>
            </CardContent>
          </Card>

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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1">
                  <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  {authStep === "input" ? (
                    <form onSubmit={handleSendOTP} className="space-y-5">
                      {/* Auth Method Toggle */}
                      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setAuthMethod("mobile")}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
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
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
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
                          <Label htmlFor="mobile" className="text-secondary font-medium">Mobile Number</Label>
                          <div className="flex">
                            <span className="flex items-center px-4 bg-muted/50 border border-r-0 border-input rounded-l-xl text-secondary text-sm font-medium">
                              +91
                            </span>
                            <Input
                              id="mobile"
                              type="tel"
                              placeholder="Enter 10-digit mobile"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                              className="rounded-l-none rounded-r-xl h-12"
                              required
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-secondary font-medium">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            className="h-12 rounded-xl"
                            required 
                          />
                        </div>
                      )}

                      <Button type="submit" className="finease-btn w-full h-12 text-base" disabled={isLoading}>
                        {isLoading ? "Sending OTP..." : (
                          <>
                            Get OTP
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Terms</a> &{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                      <button
                        type="button"
                        onClick={() => { setAuthStep("input"); setOtp(""); }}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      <div className="text-center p-5 bg-muted/30 rounded-2xl">
                        <p className="text-sm text-muted-foreground">Enter the 6-digit OTP sent to</p>
                        <p className="font-bold text-secondary text-lg mt-1">+91 {mobile}</p>
                      </div>

                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} className="w-12 h-12 text-lg border-muted" />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <Button type="submit" className="finease-btn w-full h-12 text-base" disabled={isLoading}>
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
                        <Label htmlFor="fullName" className="text-secondary font-medium">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your name"
                          value={signupData.fullName}
                          onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                          className="h-12 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupEmail" className="text-secondary font-medium">Email</Label>
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="Enter email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="h-12 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signupMobile" className="text-secondary font-medium">Mobile Number</Label>
                        <div className="flex">
                          <span className="flex items-center px-4 bg-muted/50 border border-r-0 border-input rounded-l-xl text-secondary text-sm font-medium">
                            +91
                          </span>
                          <Input
                            id="signupMobile"
                            type="tel"
                            placeholder="Enter 10-digit mobile"
                            value={signupData.mobile}
                            onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                            className="rounded-l-none rounded-r-xl h-12"
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="finease-btn w-full h-12 text-base" disabled={isLoading}>
                        {isLoading ? "Sending OTP..." : (
                          <>
                            Create Account
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Terms</a> &{" "}
                        <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleSignupVerifyOTP} className="space-y-5">
                      <button
                        type="button"
                        onClick={() => { setSignupStep("details"); setOtp(""); }}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      <div className="text-center p-5 bg-muted/30 rounded-2xl">
                        <p className="text-sm text-muted-foreground">Enter the 6-digit OTP sent to</p>
                        <p className="font-bold text-secondary text-lg mt-1">+91 {signupData.mobile}</p>
                      </div>

                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot key={i} index={i} className="w-12 h-12 text-lg border-muted" />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      <Button type="submit" className="finease-btn w-full h-12 text-base" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify & Continue"}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;