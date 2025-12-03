import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Mail, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <img src={logo} alt="FinEase" className="h-12 mx-auto mb-4" />
          </a>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Welcome to FinEase</h1>
          <p className="text-muted text-sm mt-2">Your digital wealth mall</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_0_rgba(23,93,128,0.08)] border border-[#E7F6FE]">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {authStep === "input" ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  {/* Auth Method Toggle */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setAuthMethod("mobile")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                        authMethod === "mobile" ? "bg-white shadow text-primary" : "text-muted"
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      Mobile
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMethod("email")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                        authMethod === "email" ? "bg-white shadow text-primary" : "text-muted"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                  </div>

                  {authMethod === "mobile" ? (
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <div className="flex">
                        <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-muted text-sm">
                          +91
                        </span>
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="Enter 10-digit mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                  )}

                  <Button type="submit" variant="finease" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Get OTP"}
                  </Button>

                  <p className="text-center text-xs text-muted">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms</a> &{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => { setAuthStep("input"); setOtp(""); }}
                    className="flex items-center gap-1 text-sm text-muted hover:text-secondary mb-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="text-center mb-4">
                    <p className="text-sm text-muted">Enter the 6-digit OTP sent to</p>
                    <p className="font-medium text-secondary">+91 {mobile}</p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button type="submit" variant="finease" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify & Login"}
                  </Button>

                  <p className="text-center text-sm text-muted">
                    Didn't receive OTP?{" "}
                    <button type="button" onClick={handleResendOTP} className="text-primary hover:underline">
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
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your name"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="Enter email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupMobile">Mobile Number</Label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-input rounded-l-md text-muted text-sm">
                        +91
                      </span>
                      <Input
                        id="signupMobile"
                        type="tel"
                        placeholder="Enter 10-digit mobile"
                        value={signupData.mobile}
                        onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="finease" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending OTP..." : "Get OTP & Register"}
                  </Button>
                  <p className="text-center text-xs text-muted">
                    By registering, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms</a> &{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSignupVerifyOTP} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => { setSignupStep("details"); setOtp(""); }}
                    className="flex items-center gap-1 text-sm text-muted hover:text-secondary mb-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="text-center mb-4">
                    <p className="text-sm text-muted">Enter the 6-digit OTP sent to</p>
                    <p className="font-medium text-secondary">+91 {signupData.mobile}</p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button type="submit" variant="finease" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Verify & Create Account"}
                  </Button>

                  <p className="text-center text-sm text-muted">
                    Didn't receive OTP?{" "}
                    <button type="button" onClick={handleResendOTP} className="text-primary hover:underline">
                      Resend
                    </button>
                  </p>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
