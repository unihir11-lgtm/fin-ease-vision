import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  User, Mail, Phone, Calendar, MapPin, FileText, Shield, 
  ChevronRight, ChevronLeft, CheckCircle, Upload, Building2,
  CreditCard, AlertCircle, Wallet, Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  { id: 1, name: "Personal Details", icon: User },
  { id: 2, name: "Address & Contact", icon: MapPin },
  { id: 3, name: "KYC Documents", icon: FileText },
  { id: 4, name: "Investment Preference", icon: Target },
  { id: 5, name: "Nominee Details", icon: Shield },
  { id: 6, name: "Review & Submit", icon: CheckCircle },
];

const NPSRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    
    // Contact & Address
    email: "",
    mobile: "",
    alternateMobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    
    // KYC Documents
    panNumber: "",
    aadhaarNumber: "",
    panDocument: null as File | null,
    aadhaarDocument: null as File | null,
    photograph: null as File | null,
    signature: null as File | null,
    
    // Investment Preference
    tier: "tier1",
    pensionFundManager: "",
    investmentChoice: "auto",
    riskProfile: "",
    equityAllocation: "50",
    corporateBondAllocation: "30",
    govtBondAllocation: "15",
    alternativeAllocation: "5",
    
    // Nominee
    nomineeName: "",
    nomineeRelation: "",
    nomineeDob: "",
    nomineeShare: "100",
    nomineeAddress: "",
    
    // Consent
    termsAccepted: false,
    declarationAccepted: false,
  });

  const progress = (currentStep / steps.length) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted Successfully!",
      description: "Your PRAN registration application has been submitted. You will receive confirmation via email and SMS.",
    });
    setTimeout(() => navigate("/dashboard/nps"), 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">First Name *</Label>
                <Input 
                  placeholder="Enter first name" 
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Last Name *</Label>
                <Input 
                  placeholder="Enter last name" 
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Date of Birth *</Label>
                <Input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => updateFormData("dob", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Gender *</Label>
                <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Father's Name *</Label>
                <Input 
                  placeholder="Enter father's name" 
                  value={formData.fatherName}
                  onChange={(e) => updateFormData("fatherName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Mother's Name</Label>
                <Input 
                  placeholder="Enter mother's name" 
                  value={formData.motherName}
                  onChange={(e) => updateFormData("motherName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Marital Status *</Label>
                <Select value={formData.maritalStatus} onValueChange={(v) => updateFormData("maritalStatus", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Email Address *</Label>
                <Input 
                  type="email"
                  placeholder="Enter email address" 
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Mobile Number *</Label>
                <Input 
                  placeholder="Enter 10-digit mobile number" 
                  value={formData.mobile}
                  onChange={(e) => updateFormData("mobile", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Address Line 1 *</Label>
                <Input 
                  placeholder="House/Flat No., Building Name" 
                  value={formData.addressLine1}
                  onChange={(e) => updateFormData("addressLine1", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Address Line 2</Label>
                <Input 
                  placeholder="Street, Locality, Landmark" 
                  value={formData.addressLine2}
                  onChange={(e) => updateFormData("addressLine2", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">City *</Label>
                <Input 
                  placeholder="Enter city" 
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">State *</Label>
                <Select value={formData.state} onValueChange={(v) => updateFormData("state", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">PIN Code *</Label>
                <Input 
                  placeholder="Enter 6-digit PIN code" 
                  value={formData.pincode}
                  onChange={(e) => updateFormData("pincode", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Country</Label>
                <Input 
                  value={formData.country}
                  disabled
                  className="mt-2 bg-muted/50"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">KYC Verification Required</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Please ensure your PAN and Aadhaar details match exactly as per official documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">PAN Number *</Label>
                <Input 
                  placeholder="Enter 10-character PAN" 
                  value={formData.panNumber}
                  onChange={(e) => updateFormData("panNumber", e.target.value.toUpperCase())}
                  className="mt-2 uppercase"
                  maxLength={10}
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Aadhaar Number *</Label>
                <Input 
                  placeholder="Enter 12-digit Aadhaar" 
                  value={formData.aadhaarNumber}
                  onChange={(e) => updateFormData("aadhaarNumber", e.target.value)}
                  className="mt-2"
                  maxLength={12}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors">
                <Label className="text-sm font-medium mb-3 block">Upload PAN Card *</Label>
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag & drop or <span className="text-primary font-medium">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF (max 2MB)</p>
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload("panDocument", e.target.files?.[0] || null)}
                  />
                </div>
                {formData.panDocument && (
                  <Badge className="mt-2 bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    File uploaded
                  </Badge>
                )}
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors">
                <Label className="text-sm font-medium mb-3 block">Upload Aadhaar Card *</Label>
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Drag & drop or <span className="text-primary font-medium">browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF (max 2MB)</p>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors">
                <Label className="text-sm font-medium mb-3 block">Upload Photograph *</Label>
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Passport size photo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">JPG or PNG (max 500KB)</p>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors">
                <Label className="text-sm font-medium mb-3 block">Upload Signature *</Label>
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Signature on white paper
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">JPG or PNG (max 500KB)</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Account Type *</Label>
                <Select value={formData.tier} onValueChange={(v) => updateFormData("tier", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tier1">Tier 1 (Pension Account - Mandatory)</SelectItem>
                    <SelectItem value="tier1and2">Tier 1 & Tier 2 (Pension + Savings)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Tier 1 is mandatory for tax benefits. Tier 2 is an optional savings account.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Pension Fund Manager *</Label>
                <Select value={formData.pensionFundManager} onValueChange={(v) => updateFormData("pensionFundManager", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select PFM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc">HDFC Pension Fund</SelectItem>
                    <SelectItem value="icici">ICICI Prudential Pension Fund</SelectItem>
                    <SelectItem value="sbi">SBI Pension Fund</SelectItem>
                    <SelectItem value="uti">UTI Retirement Solutions</SelectItem>
                    <SelectItem value="kotak">Kotak Pension Fund</SelectItem>
                    <SelectItem value="lic">LIC Pension Fund</SelectItem>
                    <SelectItem value="aditya">Aditya Birla Sun Life Pension</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Investment Choice *</Label>
                <Select value={formData.investmentChoice} onValueChange={(v) => updateFormData("investmentChoice", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto Choice (Lifecycle Fund)</SelectItem>
                    <SelectItem value="active">Active Choice (Custom Allocation)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Risk Profile *</Label>
                <Select value={formData.riskProfile} onValueChange={(v) => updateFormData("riskProfile", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aggressive">Aggressive (LC75 - Higher equity)</SelectItem>
                    <SelectItem value="moderate">Moderate (LC50 - Balanced)</SelectItem>
                    <SelectItem value="conservative">Conservative (LC25 - Lower equity)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.investmentChoice === "active" && (
              <div className="p-5 bg-muted/30 rounded-xl space-y-4">
                <h4 className="font-semibold text-secondary">Custom Asset Allocation</h4>
                <p className="text-sm text-muted-foreground">Allocate your investment across different asset classes (must total 100%)</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs">Equity (E) %</Label>
                    <Input 
                      type="number" 
                      value={formData.equityAllocation}
                      onChange={(e) => updateFormData("equityAllocation", e.target.value)}
                      className="mt-1"
                      max="75"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max 75%</p>
                  </div>
                  <div>
                    <Label className="text-xs">Corporate Bonds (C) %</Label>
                    <Input 
                      type="number" 
                      value={formData.corporateBondAllocation}
                      onChange={(e) => updateFormData("corporateBondAllocation", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Govt Bonds (G) %</Label>
                    <Input 
                      type="number" 
                      value={formData.govtBondAllocation}
                      onChange={(e) => updateFormData("govtBondAllocation", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Alternative (A) %</Label>
                    <Input 
                      type="number" 
                      value={formData.alternativeAllocation}
                      onChange={(e) => updateFormData("alternativeAllocation", e.target.value)}
                      className="mt-1"
                      max="5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max 5%</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h4 className="font-medium text-green-800 mb-2">Tax Benefits under NPS</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Up to ₹1.5 Lakh under Section 80CCD(1)</li>
                <li>• Additional ₹50,000 under Section 80CCD(1B)</li>
                <li>• Employer contribution under Section 80CCD(2)</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Nominee is Mandatory</p>
                  <p className="text-sm text-amber-700 mt-1">
                    You must nominate at least one person to receive benefits in case of your demise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">Nominee Full Name *</Label>
                <Input 
                  placeholder="Enter nominee's full name" 
                  value={formData.nomineeName}
                  onChange={(e) => updateFormData("nomineeName", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Relationship *</Label>
                <Select value={formData.nomineeRelation} onValueChange={(v) => updateFormData("nomineeRelation", v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="son">Son</SelectItem>
                    <SelectItem value="daughter">Daughter</SelectItem>
                    <SelectItem value="brother">Brother</SelectItem>
                    <SelectItem value="sister">Sister</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Nominee Date of Birth *</Label>
                <Input 
                  type="date"
                  value={formData.nomineeDob}
                  onChange={(e) => updateFormData("nomineeDob", e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Share Percentage *</Label>
                <Input 
                  type="number"
                  value={formData.nomineeShare}
                  onChange={(e) => updateFormData("nomineeShare", e.target.value)}
                  className="mt-2"
                  max="100"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium">Nominee Address</Label>
                <Input 
                  placeholder="Enter nominee's address" 
                  value={formData.nomineeAddress}
                  onChange={(e) => updateFormData("nomineeAddress", e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <Button variant="outline" className="w-full border-dashed gap-2">
              <User className="w-4 h-4" />
              Add Another Nominee
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="p-5 bg-primary/5 rounded-xl">
              <h4 className="font-semibold text-secondary mb-4">Application Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-secondary text-sm border-b pb-2">Personal Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.firstName} {formData.lastName}</span></p>
                    <p><span className="text-muted-foreground">DOB:</span> <span className="font-medium">{formData.dob}</span></p>
                    <p><span className="text-muted-foreground">Gender:</span> <span className="font-medium capitalize">{formData.gender}</span></p>
                    <p><span className="text-muted-foreground">Email:</span> <span className="font-medium">{formData.email}</span></p>
                    <p><span className="text-muted-foreground">Mobile:</span> <span className="font-medium">{formData.mobile}</span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-secondary text-sm border-b pb-2">KYC Documents</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">PAN:</span> <span className="font-medium font-mono">{formData.panNumber}</span></p>
                    <p><span className="text-muted-foreground">Aadhaar:</span> <span className="font-medium font-mono">{formData.aadhaarNumber}</span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-secondary text-sm border-b pb-2">Investment Preference</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Account Type:</span> <span className="font-medium capitalize">{formData.tier.replace("and", " & ")}</span></p>
                    <p><span className="text-muted-foreground">PFM:</span> <span className="font-medium capitalize">{formData.pensionFundManager || "Not selected"}</span></p>
                    <p><span className="text-muted-foreground">Investment Choice:</span> <span className="font-medium capitalize">{formData.investmentChoice}</span></p>
                    <p><span className="text-muted-foreground">Risk Profile:</span> <span className="font-medium capitalize">{formData.riskProfile || "Not selected"}</span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-secondary text-sm border-b pb-2">Nominee Details</h5>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.nomineeName || "Not provided"}</span></p>
                    <p><span className="text-muted-foreground">Relationship:</span> <span className="font-medium capitalize">{formData.nomineeRelation || "Not provided"}</span></p>
                    <p><span className="text-muted-foreground">Share:</span> <span className="font-medium">{formData.nomineeShare}%</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the <Link to="#" className="text-primary underline">Terms and Conditions</Link> and <Link to="#" className="text-primary underline">Privacy Policy</Link> of NPS.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="declaration"
                  checked={formData.declarationAccepted}
                  onCheckedChange={(checked) => updateFormData("declarationAccepted", checked)}
                />
                <label htmlFor="declaration" className="text-sm text-muted-foreground cursor-pointer">
                  I hereby declare that all information provided is true and correct to the best of my knowledge. I understand that any false information may result in rejection of my application.
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-16 max-w-5xl">
          {/* Page Header */}
          <div className="text-center mb-10">
            <Badge className="bg-primary/10 text-primary mb-4">New Registration</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary font-display">
              Open Your NPS Account
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Complete the registration process to get your PRAN (Permanent Retirement Account Number) and start building your retirement corpus.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-secondary">Step {currentStep} of {steps.length}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="hidden md:flex items-center justify-between mb-10 relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border -z-10" />
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    isCurrent || isComplete ? "opacity-100" : "opacity-50"
                  }`}
                  onClick={() => isComplete && setCurrentStep(step.id)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isComplete ? "bg-green-500 text-white" :
                    isCurrent ? "bg-primary text-white ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {isComplete ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium text-center max-w-[80px] ${
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <Card className="border-2">
            <CardHeader className="border-b bg-muted/20">
              <div className="flex items-center gap-3">
                {(() => {
                  const StepIcon = steps[currentStep - 1].icon;
                  return <StepIcon className="w-6 h-6 text-primary" />;
                })()}
                <div>
                  <CardTitle className="text-xl">{steps[currentStep - 1].name}</CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Enter your basic personal information"}
                    {currentStep === 2 && "Provide your contact and residential address"}
                    {currentStep === 3 && "Upload your KYC documents for verification"}
                    {currentStep === 4 && "Choose your investment preferences"}
                    {currentStep === 5 && "Add nominee details for your account"}
                    {currentStep === 6 && "Review your application and submit"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="gap-2 bg-primary">
                Next Step
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="gap-2 bg-green-600 hover:bg-green-700"
                disabled={!formData.termsAccepted || !formData.declarationAccepted}
              >
                <CheckCircle className="w-4 h-4" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NPSRegistration;
