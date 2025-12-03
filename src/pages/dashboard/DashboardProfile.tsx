import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const userProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  pan: "ABCDE1234F",
  dob: "1990-05-15",
  address: "123, Green Valley Apartments, Andheri West, Mumbai - 400053",
  nomineeName: "Priya Sharma",
  nomineeRelation: "Spouse",
  bankName: "HDFC Bank",
  accountNumber: "XXXX XXXX 4567",
  ifsc: "HDFC0001234",
  joinedDate: "2023-06-15",
  kycStatus: "verified",
};

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
          <p className="text-muted">Manage your account details and preferences</p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          className={isEditing ? "finease-btn" : ""}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="finease-card lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {formData.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-secondary">{formData.name}</h2>
            <p className="text-muted">{formData.email}</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                KYC Verified
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="text-left space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted" />
                <span className="text-muted">Member since</span>
                <span className="ml-auto font-medium">
                  {new Date(formData.joinedDate).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-muted" />
                <span className="text-muted">Account Status</span>
                <Badge className="ml-auto bg-green-100 text-green-700">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card className="finease-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>PAN Number</Label>
                <Input value={formData.pan} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input value={formData.bankName} disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input value={formData.accountNumber} disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>IFSC Code</Label>
              <Input value={formData.ifsc} disabled className="bg-gray-50" />
            </div>
            <Button variant="outline" className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Update Bank Details
            </Button>
          </CardContent>
        </Card>

        {/* Nominee Details */}
        <Card className="finease-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Nominee Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nominee Name</Label>
                <Input
                  value={formData.nomineeName}
                  onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Input
                  value={formData.nomineeRelation}
                  onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardProfile;
