import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Camera,
  CheckCircle,
  Building,
  CreditCard,
  FileText,
  Upload,
  Clock,
  AlertCircle,
  Eye,
  Download,
  IdCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const userProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  pan: "ABCDE1234F",
  dob: "1990-05-15",
  address: "123, Green Valley Apartments, Andheri West, Mumbai - 400053",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400053",
  nomineeName: "Priya Sharma",
  nomineeRelation: "Spouse",
  nomineeDob: "1992-08-20",
  nomineePhone: "+91 98765 43211",
  bankName: "HDFC Bank",
  accountNumber: "XXXX XXXX 4567",
  ifsc: "HDFC0001234",
  accountType: "Savings",
  joinedDate: "2023-06-15",
  kycStatus: "verified",
};

const kycDocuments = [
  {
    id: 1,
    name: "PAN Card",
    status: "verified",
    uploadedOn: "2024-01-15",
    documentNumber: "ABCDE1234F",
  },
  {
    id: 2,
    name: "Aadhaar Card",
    status: "verified",
    uploadedOn: "2024-01-15",
    documentNumber: "XXXX XXXX 5678",
  },
  {
    id: 3,
    name: "Bank Statement",
    status: "verified",
    uploadedOn: "2024-01-16",
    documentNumber: "Jan 2024",
  },
  {
    id: 4,
    name: "Address Proof",
    status: "verified",
    uploadedOn: "2024-01-16",
    documentNumber: "Utility Bill",
  },
];

const DashboardProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-700 border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-0">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-700 border-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            Required
          </Badge>
        );
    }
  };

  const completionPercentage = 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-['Raleway']">Profile & KYC</h1>
          <p className="text-muted">Manage your personal information and verification documents</p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          className={isEditing ? "finease-btn" : ""}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>}
        </Button>
      </div>

      {/* Profile Summary Card */}
      <Card className="finease-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-primary text-white font-bold">
                  {formData.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-secondary">{formData.name}</h2>
              <div className="flex flex-col md:flex-row gap-3 mt-2 text-muted">
                <span className="flex items-center gap-1 justify-center md:justify-start">
                  <Mail className="w-4 h-4" /> {formData.email}
                </span>
                <span className="flex items-center gap-1 justify-center md:justify-start">
                  <Phone className="w-4 h-4" /> {formData.phone}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <Badge className="bg-green-100 text-green-700 border-0">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  KYC Verified
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  Member since {new Date(formData.joinedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block text-center p-4 bg-white/80 rounded-xl">
              <div className="text-sm text-muted mb-1">Profile Completion</div>
              <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
              <Progress value={completionPercentage} className="w-24 h-2 mt-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-muted/30 p-1 w-full md:w-auto flex flex-wrap">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            KYC Documents
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Bank Details
          </TabsTrigger>
          <TabsTrigger value="nominee" className="flex items-center gap-2">
            <IdCard className="w-4 h-4" />
            Nominee
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Email Address</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Phone Number</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">PAN Number</Label>
                  <Input value={formData.pan} disabled className="bg-muted/20" />
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Address Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label className="text-muted text-sm">Street Address</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">State</Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Pincode</Label>
                  <Input
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Documents Tab */}
        <TabsContent value="kyc" className="space-y-6">
          {/* KYC Status Banner */}
          <Card className="finease-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700">KYC Verified</h3>
                  <p className="text-green-600">
                    Your identity has been verified. You can invest in all products.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kycDocuments.map((doc) => (
              <Card key={doc.id} className="finease-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary">{doc.name}</h4>
                        <p className="text-sm text-muted">{doc.documentNumber}</p>
                        <p className="text-xs text-muted mt-1">
                          Uploaded on {new Date(doc.uploadedOn).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Re-upload Section */}
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Update Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted text-sm mb-4">
                If any of your documents have been updated, you can re-upload them here for re-verification.
              </p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Details Tab */}
        <TabsContent value="bank" className="space-y-6">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="w-5 h-5 text-primary" />
                Bank Account Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Bank Name</Label>
                  <Input value={formData.bankName} disabled className="bg-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Account Type</Label>
                  <Input value={formData.accountType} disabled className="bg-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Account Number</Label>
                  <Input value={formData.accountNumber} disabled className="bg-muted/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">IFSC Code</Label>
                  <Input value={formData.ifsc} disabled className="bg-muted/20" />
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Bank Account Verified</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Your bank account is linked for investment payouts and redemptions.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                <CreditCard className="w-4 h-4 mr-2" />
                Request Bank Account Change
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nominee Tab */}
        <TabsContent value="nominee" className="space-y-6">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IdCard className="w-5 h-5 text-primary" />
                Nominee Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Nominee Name</Label>
                  <Input
                    value={formData.nomineeName}
                    onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Relationship</Label>
                  <Input
                    value={formData.nomineeRelation}
                    onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.nomineeDob}
                    onChange={(e) => setFormData({ ...formData, nomineeDob: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted text-sm">Phone Number</Label>
                  <Input
                    value={formData.nomineePhone}
                    onChange={(e) => setFormData({ ...formData, nomineePhone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">Important Note</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Your nominee will receive all investment proceeds in case of any unforeseen circumstances.
                      Make sure to keep this information updated.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardProfile;
