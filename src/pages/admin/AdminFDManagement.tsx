import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, Plus, Edit, Trash2, Eye, PiggyBank, 
  Download, Shield, ChevronRight, TrendingUp, Users,
  IndianRupee, Clock, FileText, CheckCircle, AlertCircle,
  Calendar, Percent, Building2, Settings, X
} from "lucide-react";
import { fdProviders } from "@/data/fdData";
import { useToast } from "@/hooks/use-toast";

interface TenureRate {
  months: number;
  rate: number;
  seniorRate: number;
}

const AdminFDManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFD, setSelectedFD] = useState<any>(null);
  const [activeFormTab, setActiveFormTab] = useState("basic");

  // Form state
  const [formData, setFormData] = useState({
    bankName: "",
    providerType: "",
    logo: "",
    regulatedBy: "Reserve Bank of India",
    about: "",
    // Rates
    interestRate: "",
    seniorCitizenRate: "",
    // Deposit limits
    minDeposit: "",
    maxDeposit: "",
    // Tenure
    minTenure: "",
    maxTenure: "",
    // Insurance
    dicgcInsured: true,
    dicgcLimit: "500000",
    // Eligibility
    eligibility: {
      minAge: "18",
      maxAge: "100",
      seniorCitizenAge: "60",
      nriAllowed: false,
      corporateAllowed: true,
      hufAllowed: true,
      trustAllowed: false,
      minorAllowed: true,
    },
    // Tax Benefits
    taxBenefits: {
      section80C: false,
      tdsApplicable: true,
      tdsThreshold: "40000",
      seniorTdsThreshold: "50000",
      form15GH: true,
    },
    // Payout Options
    payoutOptions: {
      monthly: true,
      quarterly: true,
      halfYearly: true,
      annually: true,
      cumulative: true,
    },
    // Withdrawal
    prematureWithdrawal: true,
    prematureWithdrawalPenalty: "1%",
    lockInPeriod: "7",
    autoRenewal: true,
    // Features
    features: [] as string[],
  });

  // Tenure-wise rates
  const [tenureRates, setTenureRates] = useState<TenureRate[]>([
    { months: 12, rate: 7.0, seniorRate: 7.5 },
    { months: 24, rate: 7.5, seniorRate: 8.0 },
    { months: 36, rate: 8.0, seniorRate: 8.5 },
    { months: 60, rate: 8.5, seniorRate: 9.0 },
  ]);

  const [newFeature, setNewFeature] = useState("");

  const filteredFDs = fdProviders.filter((fd) =>
    fd.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Providers", value: fdProviders.length, icon: Building2, color: "bg-blue-100 text-blue-600" },
    { label: "Highest Rate", value: `${Math.max(...fdProviders.map(f => f.interestRate))}%`, icon: TrendingUp, color: "bg-green-100 text-green-600" },
    { label: "DICGC Insured", value: fdProviders.length, icon: Shield, color: "bg-amber-100 text-amber-600" },
    { label: "Active Users", value: "5,234", icon: Users, color: "bg-purple-100 text-purple-600" },
  ];

  const handleDelete = (id: string) => {
    toast({ title: "FD Provider Deleted", description: "The FD provider has been removed." });
  };

  const handleAddFD = () => {
    toast({ title: "FD Provider Added", description: "New FD provider has been added successfully." });
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleViewFD = (fd: any) => {
    setSelectedFD(fd);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      bankName: "",
      providerType: "",
      logo: "",
      regulatedBy: "Reserve Bank of India",
      about: "",
      interestRate: "",
      seniorCitizenRate: "",
      minDeposit: "",
      maxDeposit: "",
      minTenure: "",
      maxTenure: "",
      dicgcInsured: true,
      dicgcLimit: "500000",
      eligibility: {
        minAge: "18",
        maxAge: "100",
        seniorCitizenAge: "60",
        nriAllowed: false,
        corporateAllowed: true,
        hufAllowed: true,
        trustAllowed: false,
        minorAllowed: true,
      },
      taxBenefits: {
        section80C: false,
        tdsApplicable: true,
        tdsThreshold: "40000",
        seniorTdsThreshold: "50000",
        form15GH: true,
      },
      payoutOptions: {
        monthly: true,
        quarterly: true,
        halfYearly: true,
        annually: true,
        cumulative: true,
      },
      prematureWithdrawal: true,
      prematureWithdrawalPenalty: "1%",
      lockInPeriod: "7",
      autoRenewal: true,
      features: [],
    });
    setTenureRates([
      { months: 12, rate: 7.0, seniorRate: 7.5 },
      { months: 24, rate: 7.5, seniorRate: 8.0 },
      { months: 36, rate: 8.0, seniorRate: 8.5 },
      { months: 60, rate: 8.5, seniorRate: 9.0 },
    ]);
    setActiveFormTab("basic");
  };

  const addTenureRate = () => {
    setTenureRates([...tenureRates, { months: 0, rate: 0, seniorRate: 0 }]);
  };

  const removeTenureRate = (index: number) => {
    setTenureRates(tenureRates.filter((_, i) => i !== index));
  };

  const updateTenureRate = (index: number, field: keyof TenureRate, value: number) => {
    const updated = [...tenureRates];
    updated[index][field] = value;
    setTenureRates(updated);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">FD Provider Management</h1>
          <p className="text-muted-foreground">Manage Fixed Deposit providers, rates, and configurations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={(open) => { setIsAddModalOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add FD Provider
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New FD Provider</DialogTitle>
              </DialogHeader>
              <Tabs value={activeFormTab} onValueChange={setActiveFormTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="rates">Rates & Tenure</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="tax">Tax & Payout</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[500px] pr-4 mt-4">
                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Bank/NBFC Name *</Label>
                        <Input 
                          placeholder="Enter bank name" 
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Provider Type *</Label>
                        <Select value={formData.providerType} onValueChange={(v) => setFormData({ ...formData, providerType: v })}>
                          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Scheduled Commercial Bank">Scheduled Commercial Bank</SelectItem>
                            <SelectItem value="Small Finance Bank">Small Finance Bank</SelectItem>
                            <SelectItem value="NBFC">NBFC</SelectItem>
                            <SelectItem value="Co-operative Bank">Co-operative Bank</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Logo/Emoji</Label>
                        <Input 
                          placeholder="Enter emoji or icon code" 
                          value={formData.logo}
                          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Regulated By</Label>
                        <Select value={formData.regulatedBy} onValueChange={(v) => setFormData({ ...formData, regulatedBy: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Reserve Bank of India">Reserve Bank of India</SelectItem>
                            <SelectItem value="SEBI">SEBI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Min Deposit (₹) *</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 5000" 
                          value={formData.minDeposit}
                          onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Deposit (₹)</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 10000000" 
                          value={formData.maxDeposit}
                          onChange={(e) => setFormData({ ...formData, maxDeposit: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>About / Description</Label>
                      <Textarea 
                        placeholder="Enter description about the bank/NBFC..."
                        rows={4}
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      />
                    </div>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-600" />
                            <div>
                              <Label>DICGC Insured</Label>
                              <p className="text-xs text-muted-foreground">Deposits insured up to ₹5 Lakh per depositor</p>
                            </div>
                          </div>
                          <Switch 
                            checked={formData.dicgcInsured} 
                            onCheckedChange={(v) => setFormData({ ...formData, dicgcInsured: v })} 
                          />
                        </div>
                        {formData.dicgcInsured && (
                          <div className="mt-3">
                            <Label className="text-xs">Insurance Limit (₹)</Label>
                            <Input 
                              type="number" 
                              className="mt-1"
                              value={formData.dicgcLimit}
                              onChange={(e) => setFormData({ ...formData, dicgcLimit: e.target.value })}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Rates & Tenure Tab */}
                  <TabsContent value="rates" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Highest Interest Rate (%) *</Label>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="e.g., 8.5" 
                          value={formData.interestRate}
                          onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Highest Senior Citizen Rate (%) *</Label>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="e.g., 9.0" 
                          value={formData.seniorCitizenRate}
                          onChange={(e) => setFormData({ ...formData, seniorCitizenRate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Min Tenure (Months)</Label>
                        <Input 
                          type="number" 
                          placeholder="e.g., 12" 
                          value={formData.minTenure}
                          onChange={(e) => setFormData({ ...formData, minTenure: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Tenure</Label>
                        <Select value={formData.maxTenure} onValueChange={(v) => setFormData({ ...formData, maxTenure: v })}>
                          <SelectTrigger><SelectValue placeholder="Select tenure" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Year">1 Year</SelectItem>
                            <SelectItem value="2 Years">2 Years</SelectItem>
                            <SelectItem value="3 Years">3 Years</SelectItem>
                            <SelectItem value="5 Years">5 Years</SelectItem>
                            <SelectItem value="10 Years">10 Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tenure-wise Rate Configuration */}
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Percent className="w-4 h-4 text-primary" />
                            Tenure-wise Interest Rates
                          </CardTitle>
                          <Button variant="outline" size="sm" onClick={addTenureRate}>
                            <Plus className="w-4 h-4 mr-1" /> Add
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-3 text-sm font-medium text-muted-foreground">
                            <span>Tenure (Months)</span>
                            <span>Regular Rate (%)</span>
                            <span>Sr. Citizen Rate (%)</span>
                            <span></span>
                          </div>
                          {tenureRates.map((rate, index) => (
                            <div key={index} className="grid grid-cols-4 gap-3 items-center">
                              <Input 
                                type="number" 
                                value={rate.months || ""} 
                                onChange={(e) => updateTenureRate(index, "months", Number(e.target.value))}
                                placeholder="e.g., 12"
                              />
                              <Input 
                                type="number" 
                                step="0.01" 
                                value={rate.rate || ""} 
                                onChange={(e) => updateTenureRate(index, "rate", Number(e.target.value))}
                                placeholder="e.g., 7.5"
                              />
                              <Input 
                                type="number" 
                                step="0.01" 
                                value={rate.seniorRate || ""} 
                                onChange={(e) => updateTenureRate(index, "seniorRate", Number(e.target.value))}
                                placeholder="e.g., 8.0"
                              />
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeTenureRate(index)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Withdrawal Settings */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Settings className="w-4 h-4 text-primary" />
                          Withdrawal Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Premature Withdrawal Allowed</Label>
                            <p className="text-xs text-muted-foreground">Allow early withdrawal before maturity</p>
                          </div>
                          <Switch 
                            checked={formData.prematureWithdrawal} 
                            onCheckedChange={(v) => setFormData({ ...formData, prematureWithdrawal: v })} 
                          />
                        </div>
                        {formData.prematureWithdrawal && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Penalty Rate</Label>
                              <Select value={formData.prematureWithdrawalPenalty} onValueChange={(v) => setFormData({ ...formData, prematureWithdrawalPenalty: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0.5%">0.5% reduction</SelectItem>
                                  <SelectItem value="1%">1% reduction</SelectItem>
                                  <SelectItem value="1.5%">1.5% reduction</SelectItem>
                                  <SelectItem value="2%">2% reduction</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Lock-in Period (Days)</Label>
                              <Input 
                                type="number" 
                                value={formData.lockInPeriod}
                                onChange={(e) => setFormData({ ...formData, lockInPeriod: e.target.value })}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Auto Renewal</Label>
                            <p className="text-xs text-muted-foreground">Automatically renew FD on maturity</p>
                          </div>
                          <Switch 
                            checked={formData.autoRenewal} 
                            onCheckedChange={(v) => setFormData({ ...formData, autoRenewal: v })} 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Eligibility Tab */}
                  <TabsContent value="eligibility" className="space-y-4 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          Age Criteria
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Min Age (Years)</Label>
                            <Input 
                              type="number" 
                              value={formData.eligibility.minAge}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, minAge: e.target.value } 
                              })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Max Age (Years)</Label>
                            <Input 
                              type="number" 
                              value={formData.eligibility.maxAge}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, maxAge: e.target.value } 
                              })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Senior Citizen Age</Label>
                            <Input 
                              type="number" 
                              value={formData.eligibility.seniorCitizenAge}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, seniorCitizenAge: e.target.value } 
                              })}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          Eligible Customer Types
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="nri" 
                              checked={formData.eligibility.nriAllowed}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, nriAllowed: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="nri" className="font-medium cursor-pointer">NRI Customers</label>
                              <p className="text-xs text-muted-foreground">Non-Resident Indians</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="corporate" 
                              checked={formData.eligibility.corporateAllowed}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, corporateAllowed: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="corporate" className="font-medium cursor-pointer">Corporate</label>
                              <p className="text-xs text-muted-foreground">Companies & Firms</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="huf" 
                              checked={formData.eligibility.hufAllowed}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, hufAllowed: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="huf" className="font-medium cursor-pointer">HUF</label>
                              <p className="text-xs text-muted-foreground">Hindu Undivided Family</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="trust" 
                              checked={formData.eligibility.trustAllowed}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, trustAllowed: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="trust" className="font-medium cursor-pointer">Trusts</label>
                              <p className="text-xs text-muted-foreground">Registered Trusts</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="minor" 
                              checked={formData.eligibility.minorAllowed}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                eligibility: { ...formData.eligibility, minorAllowed: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="minor" className="font-medium cursor-pointer">Minors</label>
                              <p className="text-xs text-muted-foreground">Through guardian</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Tax & Payout Tab */}
                  <TabsContent value="tax" className="space-y-4 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          Tax Benefits & Deductions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <Label>Section 80C Tax Benefit</Label>
                              <p className="text-xs text-muted-foreground">5-year Tax Saving FD eligible</p>
                            </div>
                          </div>
                          <Switch 
                            checked={formData.taxBenefits.section80C}
                            onCheckedChange={(v) => setFormData({ 
                              ...formData, 
                              taxBenefits: { ...formData.taxBenefits, section80C: v } 
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <Label>TDS Applicable</Label>
                            <p className="text-xs text-muted-foreground">Tax Deducted at Source on interest</p>
                          </div>
                          <Switch 
                            checked={formData.taxBenefits.tdsApplicable}
                            onCheckedChange={(v) => setFormData({ 
                              ...formData, 
                              taxBenefits: { ...formData.taxBenefits, tdsApplicable: v } 
                            })}
                          />
                        </div>

                        {formData.taxBenefits.tdsApplicable && (
                          <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
                            <div className="space-y-2">
                              <Label>TDS Threshold (₹)</Label>
                              <Input 
                                type="number" 
                                value={formData.taxBenefits.tdsThreshold}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  taxBenefits: { ...formData.taxBenefits, tdsThreshold: e.target.value } 
                                })}
                              />
                              <p className="text-xs text-muted-foreground">For regular customers</p>
                            </div>
                            <div className="space-y-2">
                              <Label>Sr. Citizen TDS Threshold (₹)</Label>
                              <Input 
                                type="number" 
                                value={formData.taxBenefits.seniorTdsThreshold}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  taxBenefits: { ...formData.taxBenefits, seniorTdsThreshold: e.target.value } 
                                })}
                              />
                              <p className="text-xs text-muted-foreground">Higher limit for seniors</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <Label>Form 15G/15H Accepted</Label>
                            <p className="text-xs text-muted-foreground">For TDS exemption</p>
                          </div>
                          <Switch 
                            checked={formData.taxBenefits.form15GH}
                            onCheckedChange={(v) => setFormData({ 
                              ...formData, 
                              taxBenefits: { ...formData.taxBenefits, form15GH: v } 
                            })}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          Interest Payout Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="monthly" 
                              checked={formData.payoutOptions.monthly}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                payoutOptions: { ...formData.payoutOptions, monthly: v as boolean } 
                              })}
                            />
                            <label htmlFor="monthly" className="font-medium cursor-pointer">Monthly</label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="quarterly" 
                              checked={formData.payoutOptions.quarterly}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                payoutOptions: { ...formData.payoutOptions, quarterly: v as boolean } 
                              })}
                            />
                            <label htmlFor="quarterly" className="font-medium cursor-pointer">Quarterly</label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="halfYearly" 
                              checked={formData.payoutOptions.halfYearly}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                payoutOptions: { ...formData.payoutOptions, halfYearly: v as boolean } 
                              })}
                            />
                            <label htmlFor="halfYearly" className="font-medium cursor-pointer">Half-Yearly</label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                            <Checkbox 
                              id="annually" 
                              checked={formData.payoutOptions.annually}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                payoutOptions: { ...formData.payoutOptions, annually: v as boolean } 
                              })}
                            />
                            <label htmlFor="annually" className="font-medium cursor-pointer">Annually</label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <Checkbox 
                              id="cumulative" 
                              checked={formData.payoutOptions.cumulative}
                              onCheckedChange={(v) => setFormData({ 
                                ...formData, 
                                payoutOptions: { ...formData.payoutOptions, cumulative: v as boolean } 
                              })}
                            />
                            <div>
                              <label htmlFor="cumulative" className="font-medium cursor-pointer">Cumulative</label>
                              <p className="text-xs text-muted-foreground">Compound at maturity</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-4 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          Key Features & Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Add a feature highlight..."
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addFeature()}
                          />
                          <Button onClick={addFeature}>Add</Button>
                        </div>

                        <div className="space-y-2">
                          {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{feature}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeFeature(index)}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          {formData.features.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No features added yet</p>
                          )}
                        </div>

                        {/* Suggested Features */}
                        <div className="pt-4 border-t border-border">
                          <Label className="text-sm text-muted-foreground mb-2 block">Suggested Features (click to add)</Label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "DICGC Insured up to ₹5 Lakh",
                              "No new bank account required",
                              "Flexible tenure options",
                              "Easy online process",
                              "Loan against FD available",
                              "Auto-renewal facility",
                              "Sweep-in/out facility",
                              "Physical FD receipt available",
                              "Instant withdrawal available",
                              "Competitive interest rates"
                            ].filter(f => !formData.features.includes(f)).map((feature, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-primary/10"
                                onClick={() => setFormData({ ...formData, features: [...formData.features, feature] })}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </ScrollArea>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => { setIsAddModalOpen(false); resetForm(); }}>Cancel</Button>
                <Button onClick={handleAddFD}>Add FD Provider</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FD providers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* FD Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFDs.map((fd) => (
          <Card key={fd.id} className="hover:shadow-lg transition-all group">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {fd.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{fd.type}</Badge>
                      {fd.dicgcInsured && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <Shield className="w-3 h-3" />
                          DICGC
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="text-3xl font-bold text-primary">{fd.interestRate}%</p>
                    <p className="text-xs text-muted-foreground">per annum</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Sr. Citizen</p>
                    <p className="text-lg font-bold text-secondary">{fd.seniorCitizenRate}%</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Min Deposit</p>
                  <p className="font-bold text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">Max Tenure</p>
                  <p className="font-bold text-secondary">{fd.maxTenure}</p>
                </div>
              </div>

              {/* Payout Options */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Payout Options</p>
                <div className="flex flex-wrap gap-1">
                  {fd.payoutOptions.slice(0, 3).map((option, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{option}</Badge>
                  ))}
                  {fd.payoutOptions.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{fd.payoutOptions.length - 3}</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewFD(fd)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(fd.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewFD(fd)}>
                  View Details <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFDs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <PiggyBank className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No FD providers found.</p>
          </CardContent>
        </Card>
      )}

      {/* View FD Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>FD Provider Details</DialogTitle>
          </DialogHeader>
          {selectedFD && (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
                    {selectedFD.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary">{selectedFD.bankName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge>{selectedFD.type}</Badge>
                      {selectedFD.dicgcInsured && (
                        <Badge className="bg-green-100 text-green-700">DICGC Insured</Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rates */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Interest Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground">Regular Rate</p>
                        <p className="text-3xl font-bold text-primary">{selectedFD.interestRate}%</p>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground">Sr. Citizen Rate</p>
                        <p className="text-3xl font-bold text-accent">{selectedFD.seniorCitizenRate}%</p>
                      </div>
                    </div>

                    {/* Tenure-wise rates */}
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Tenure-wise Rates</p>
                      <div className="space-y-2">
                        {selectedFD.tenureOptions.map((option: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                            <span className="text-sm">{option.months} months</span>
                            <div className="flex gap-4">
                              <span className="text-sm font-medium">{option.rate}%</span>
                              <span className="text-sm font-medium text-accent">{option.seniorRate}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deposit Details */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Deposit Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Min Deposit</p>
                        <p className="font-bold">₹{selectedFD.minDeposit.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Max Deposit</p>
                        <p className="font-bold">₹{selectedFD.maxDeposit.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Max Tenure</p>
                        <p className="font-bold">{selectedFD.maxTenure}</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Premature Penalty</p>
                        <p className="font-bold">{selectedFD.prematureWithdrawalPenalty}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payout Options */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Payout Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedFD.payoutOptions.map((option: string, index: number) => (
                        <Badge key={index} variant="outline">{option}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedFD.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* About */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedFD.about}</p>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            <Button>Edit Provider</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFDManagement;