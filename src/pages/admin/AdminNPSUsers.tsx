import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Download, Eye, Edit2, Trash2, Users, UserPlus, 
  TrendingUp, IndianRupee, PieChart, CheckCircle, Clock, XCircle,
  FileText, AlertTriangle, MoreVertical, Filter, RefreshCw,
  User, MapPin, CreditCard, Wallet, UserCheck, Building2, ScrollText,
  ArrowLeft, ArrowRight, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

const npsUsers = [
  { 
    id: 1, name: "Rahul Sharma", email: "rahul@email.com", mobile: "9876543210", status: "Active", pranCard: "1100345678901", tier: "Tier 1 & 2", riskProfile: "High", totalContribution: 580000, corpus: 685000, returns: 18.1, joinDate: "15 Jan 2020", kycStatus: "Verified", pfm: "HDFC Pension",
    dob: "15 Mar 1985", gender: "Male", pan: "ABCDE1234F", aadhaar: "XXXX XXXX 4567",
    address: "123, Green Park, Sector 12, Gurgaon, Haryana - 122001",
    bankName: "HDFC Bank", accountNo: "XXXX XXXX 5678", ifsc: "HDFC0001234",
    contributionFrequency: "Monthly", contributionAmount: 10000,
    nomineeName: "Sunita Sharma", nomineeRelation: "Wife", nomineeDob: "22 Aug 1988"
  },
  { 
    id: 2, name: "Priya Patel", email: "priya@email.com", mobile: "9876543211", status: "Active", pranCard: "1100345678902", tier: "Tier 1", riskProfile: "Medium", totalContribution: 320000, corpus: 368000, returns: 15.0, joinDate: "22 Mar 2021", kycStatus: "Verified", pfm: "ICICI Prudential",
    dob: "08 Jul 1990", gender: "Female", pan: "PQRST5678G", aadhaar: "XXXX XXXX 7890",
    address: "45, Rose Garden, Andheri West, Mumbai - 400058",
    bankName: "ICICI Bank", accountNo: "XXXX XXXX 9012", ifsc: "ICIC0002345",
    contributionFrequency: "Quarterly", contributionAmount: 25000,
    nomineeName: "Ramesh Patel", nomineeRelation: "Father", nomineeDob: "10 Dec 1960"
  },
  { 
    id: 3, name: "Amit Kumar", email: "amit@email.com", mobile: "9876543212", status: "Pending KYC", pranCard: "1100345678903", tier: "Tier 1 & 2", riskProfile: "Low", totalContribution: 0, corpus: 0, returns: 0, joinDate: "01 Nov 2025", kycStatus: "Pending", pfm: "SBI Pension",
    dob: "20 Nov 1995", gender: "Male", pan: "LMNOP9012H", aadhaar: "XXXX XXXX 1234",
    address: "78, Lajpat Nagar, New Delhi - 110024",
    bankName: "SBI", accountNo: "XXXX XXXX 3456", ifsc: "SBIN0003456",
    contributionFrequency: "Monthly", contributionAmount: 5000,
    nomineeName: "Kavita Kumar", nomineeRelation: "Mother", nomineeDob: "05 Apr 1970"
  },
  { 
    id: 4, name: "Sneha Reddy", email: "sneha@email.com", mobile: "9876543213", status: "Active", pranCard: "1100345678904", tier: "Tier 1", riskProfile: "High", totalContribution: 450000, corpus: 535500, returns: 19.0, joinDate: "10 Aug 2019", kycStatus: "Verified", pfm: "HDFC Pension",
    dob: "12 Feb 1988", gender: "Female", pan: "UVWXY3456I", aadhaar: "XXXX XXXX 5678",
    address: "234, Banjara Hills, Hyderabad - 500034",
    bankName: "Axis Bank", accountNo: "XXXX XXXX 7890", ifsc: "UTIB0004567",
    contributionFrequency: "Monthly", contributionAmount: 15000,
    nomineeName: "Vijay Reddy", nomineeRelation: "Husband", nomineeDob: "18 Sep 1985"
  },
  { 
    id: 5, name: "Vikram Singh", email: "vikram@email.com", mobile: "9876543214", status: "Inactive", pranCard: "1100345678905", tier: "Tier 1 & 2", riskProfile: "Medium", totalContribution: 890000, corpus: 1023500, returns: 15.0, joinDate: "05 Feb 2018", kycStatus: "Verified", pfm: "UTI Retirement",
    dob: "30 Jun 1982", gender: "Male", pan: "ZABCD7890J", aadhaar: "XXXX XXXX 9012",
    address: "567, Civil Lines, Jaipur - 302006",
    bankName: "Kotak Mahindra", accountNo: "XXXX XXXX 1234", ifsc: "KKBK0005678",
    contributionFrequency: "Yearly", contributionAmount: 200000,
    nomineeName: "Meera Singh", nomineeRelation: "Wife", nomineeDob: "25 Jan 1985"
  },
  { 
    id: 6, name: "Neha Gupta", email: "neha@email.com", mobile: "9876543215", status: "Active", pranCard: "1100345678906", tier: "Tier 1", riskProfile: "Low", totalContribution: 280000, corpus: 308000, returns: 10.0, joinDate: "18 Jun 2022", kycStatus: "Verified", pfm: "Kotak Pension",
    dob: "14 Sep 1992", gender: "Female", pan: "EFGHI1234K", aadhaar: "XXXX XXXX 3456",
    address: "890, Koramangala, Bangalore - 560034",
    bankName: "Yes Bank", accountNo: "XXXX XXXX 5678", ifsc: "YESB0006789",
    contributionFrequency: "Monthly", contributionAmount: 8000,
    nomineeName: "Rajesh Gupta", nomineeRelation: "Brother", nomineeDob: "03 Mar 1989"
  },
  { 
    id: 7, name: "Arjun Nair", email: "arjun@email.com", mobile: "9876543216", status: "Pending KYC", pranCard: "1100345678907", tier: "Tier 1 & 2", riskProfile: "High", totalContribution: 0, corpus: 0, returns: 0, joinDate: "28 Oct 2025", kycStatus: "Under Review", pfm: "HDFC Pension",
    dob: "28 Dec 1993", gender: "Male", pan: "JKLMN5678L", aadhaar: "XXXX XXXX 7890",
    address: "123, Marine Drive, Kochi - 682001",
    bankName: "Federal Bank", accountNo: "XXXX XXXX 9012", ifsc: "FDRL0007890",
    contributionFrequency: "Monthly", contributionAmount: 12000,
    nomineeName: "Lakshmi Nair", nomineeRelation: "Mother", nomineeDob: "17 Jul 1965"
  },
  { 
    id: 8, name: "Kavita Joshi", email: "kavita@email.com", mobile: "9876543217", status: "Active", pranCard: "1100345678908", tier: "Tier 1", riskProfile: "Medium", totalContribution: 520000, corpus: 598000, returns: 15.0, joinDate: "12 Apr 2020", kycStatus: "Verified", pfm: "ICICI Prudential",
    dob: "06 May 1987", gender: "Female", pan: "OPQRS9012M", aadhaar: "XXXX XXXX 1234",
    address: "456, Shivaji Nagar, Pune - 411005",
    bankName: "Bank of Baroda", accountNo: "XXXX XXXX 3456", ifsc: "BARB0008901",
    contributionFrequency: "Quarterly", contributionAmount: 30000,
    nomineeName: "Anil Joshi", nomineeRelation: "Husband", nomineeDob: "29 Oct 1984"
  },
];

const AdminNPSUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof npsUsers[0] | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const handleViewUser = (user: typeof npsUsers[0]) => {
    setSelectedUser(user);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedUser(null);
  };

  const filteredUsers = npsUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      user.pranCard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.status === "Active") ||
      (statusFilter === "pending" && user.status === "Pending KYC") ||
      (statusFilter === "inactive" && user.status === "Inactive");
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUsers: npsUsers.length,
    activeUsers: npsUsers.filter(u => u.status === "Active").length,
    pendingUsers: npsUsers.filter(u => u.status === "Pending KYC").length,
    totalAUM: npsUsers.reduce((a, b) => a + b.corpus, 0),
    totalContributions: npsUsers.reduce((a, b) => a + b.totalContribution, 0),
    avgReturns: npsUsers.filter(u => u.returns > 0).reduce((a, b) => a + b.returns, 0) / npsUsers.filter(u => u.returns > 0).length,
  };

  const riskDistribution = [
    { name: "High Risk", value: npsUsers.filter(u => u.riskProfile === "High").length, color: "#EF4444" },
    { name: "Medium Risk", value: npsUsers.filter(u => u.riskProfile === "Medium").length, color: "#F59E0B" },
    { name: "Low Risk", value: npsUsers.filter(u => u.riskProfile === "Low").length, color: "#22C55E" },
  ];

  const monthlyGrowth = [
    { month: "Jul", users: 142, aum: 45 },
    { month: "Aug", users: 148, aum: 48 },
    { month: "Sep", users: 155, aum: 52 },
    { month: "Oct", users: 162, aum: 56 },
    { month: "Nov", users: 170, aum: 61 },
  ];

  const pfmDistribution = [
    { name: "HDFC Pension", users: 3, aum: 1220500 },
    { name: "ICICI Prudential", users: 2, aum: 966000 },
    { name: "SBI Pension", users: 1, aum: 0 },
    { name: "UTI Retirement", users: 1, aum: 1023500 },
    { name: "Kotak Pension", users: 1, aum: 308000 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case "Pending KYC":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending KYC</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-50 text-red-700 border-red-200">{risk}</Badge>;
      case "Medium":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">{risk}</Badge>;
      case "Low":
        return <Badge className="bg-green-50 text-green-700 border-green-200">{risk}</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const getKYCBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "Under Review":
        return <Badge className="bg-blue-100 text-blue-700"><RefreshCw className="w-3 h-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (id: number) => {
    toast({ title: "User Deleted", description: "NPS user has been removed from the system." });
  };

  const handleApproveKYC = (id: number) => {
    toast({ title: "KYC Approved", description: "User KYC has been approved successfully." });
  };

  const handleRejectKYC = (id: number) => {
    toast({ title: "KYC Rejected", description: "User KYC has been rejected." });
  };

  // Full Details View - Form Style
  if (viewMode === "detail" && selectedUser) {
    return (
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" /> Edit
            </Button>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="border-border/50">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-display">{selectedUser.name}</CardTitle>
                  <CardDescription>Application ID: NPS-{selectedUser.id.toString().padStart(6, '0')}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(selectedUser.status)}
                    {getKYCBadge(selectedUser.kycStatus)}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-center">
                <div className="px-4 py-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Corpus</p>
                  <p className="font-bold text-primary">₹{selectedUser.corpus.toLocaleString()}</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-green-50 border border-green-100">
                  <p className="text-xs text-muted-foreground">Returns</p>
                  <p className="font-bold text-green-600">+{selectedUser.returns}%</p>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Personal Details Section */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-5">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Personal Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                  <p className="font-medium mt-1">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                  <p className="font-medium mt-1">{selectedUser.dob}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <p className="font-medium mt-1">{selectedUser.gender}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Mobile Number</Label>
                  <p className="font-medium mt-1">{selectedUser.mobile}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                  <p className="font-medium mt-1">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="p-6 border-b bg-muted/20">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Address Details</h3>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Residential Address</Label>
                <p className="font-medium mt-1">{selectedUser.address}</p>
              </div>
            </div>

            {/* KYC Documents Section */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-secondary">KYC Documents</h3>
                </div>
                {getKYCBadge(selectedUser.kycStatus)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">PAN Number</Label>
                  <p className="font-mono font-medium mt-1 bg-muted/50 px-3 py-1.5 rounded inline-block">{selectedUser.pan}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Aadhaar Number</Label>
                  <p className="font-mono font-medium mt-1 bg-muted/50 px-3 py-1.5 rounded inline-block">{selectedUser.aadhaar}</p>
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="p-6 border-b bg-muted/20">
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Bank Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Bank Name</Label>
                  <p className="font-medium mt-1">{selectedUser.bankName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Account Number</Label>
                  <p className="font-mono font-medium mt-1">{selectedUser.accountNo}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">IFSC Code</Label>
                  <p className="font-mono font-medium mt-1">{selectedUser.ifsc}</p>
                </div>
              </div>
            </div>

            {/* Investment Preferences Section */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-2 mb-5">
                <Wallet className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Investment Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">PRAN Number</Label>
                  <p className="font-mono font-medium mt-1 bg-primary/5 px-3 py-1.5 rounded border border-primary/20 inline-block">{selectedUser.pranCard}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Account Tier</Label>
                  <div className="mt-1"><Badge variant="outline">{selectedUser.tier}</Badge></div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Risk Profile</Label>
                  <div className="mt-1">{getRiskBadge(selectedUser.riskProfile)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">PFM</Label>
                  <p className="font-medium mt-1">{selectedUser.pfm}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Contribution Frequency</Label>
                  <p className="font-medium mt-1">{selectedUser.contributionFrequency}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Contribution Amount</Label>
                  <p className="font-medium mt-1">₹{selectedUser.contributionAmount?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Nominee Details Section */}
            <div className="p-6 border-b bg-muted/20">
              <div className="flex items-center gap-2 mb-5">
                <UserCheck className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Nominee Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
                <div>
                  <Label className="text-xs text-muted-foreground">Nominee Name</Label>
                  <p className="font-medium mt-1">{selectedUser.nomineeName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Relationship</Label>
                  <p className="font-medium mt-1">{selectedUser.nomineeRelation}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Nominee DOB</Label>
                  <p className="font-medium mt-1">{selectedUser.nomineeDob}</p>
                </div>
              </div>
            </div>

            {/* Account Summary Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <ScrollText className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-secondary">Account Summary</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Member Since</Label>
                  <p className="font-bold text-lg mt-1">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Total Contributed</Label>
                  <p className="font-bold text-lg mt-1">₹{selectedUser.totalContribution.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Current Corpus</Label>
                  <p className="font-bold text-lg text-green-600 mt-1">₹{selectedUser.corpus.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Total Gains</Label>
                  <p className="font-bold text-lg text-accent mt-1">₹{(selectedUser.corpus - selectedUser.totalContribution).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Action Card */}
        {selectedUser.kycStatus !== "Verified" && (
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-secondary">KYC Verification Required</p>
                    <p className="text-sm text-muted-foreground">Review the documents and take action</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => handleApproveKYC(selectedUser.id)} className="bg-green-600 hover:bg-green-700 gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => handleRejectKYC(selectedUser.id)} className="gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">NPS User Management</h1>
          <p className="text-muted-foreground mt-1">Manage PRAN accounts, KYC verification, and user portfolios</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2 bg-primary">
            <UserPlus className="w-4 h-4" /> Add New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.pendingUsers}</p>
                <p className="text-xs text-muted-foreground">Pending KYC</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100">
                <IndianRupee className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">₹{(stats.totalAUM / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total AUM</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">₹{(stats.totalContributions / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">+{stats.avgReturns.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Avg Returns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Risk Profile Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={55}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold text-secondary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" name="Users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* PFM Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              PFM Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pfmDistribution.slice(0, 4)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} stroke="#9CA3AF" width={80} />
                  <Tooltip />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, mobile, or PRAN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending KYC</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              NPS Users ({filteredUsers.length})
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">User Details</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">PRAN</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Tier</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Risk</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Contributions</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Corpus</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Returns</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">KYC</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-secondary text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.mobile}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-mono text-sm text-secondary">{user.pranCard}</p>
                      <p className="text-xs text-muted-foreground">Since {user.joinDate}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{user.tier}</Badge>
                    </td>
                    <td className="p-4">{getRiskBadge(user.riskProfile)}</td>
                    <td className="p-4">
                      <p className="font-medium text-secondary text-sm">₹{user.totalContribution.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-secondary text-sm">₹{user.corpus.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      {user.returns > 0 ? (
                        <span className="text-green-600 font-medium text-sm">+{user.returns}%</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                    <td className="p-4">{getKYCBadge(user.kycStatus)}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewUser(user)}>
                          <Eye className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedUser(user); setShowEditDialog(true); }}>
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {filteredUsers.length} of {npsUsers.length} users</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNPSUsers;
