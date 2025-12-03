import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { 
  Search, Download, Eye, Edit2, Trash2, Users, UserPlus, 
  Filter, Mail, Phone, Calendar, MapPin, Shield, TrendingUp,
  Wallet, CheckCircle, Clock, XCircle, IndianRupee, PieChart,
  BarChart3, ChevronRight, MoreVertical
} from "lucide-react";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "@/hooks/use-toast";

const allUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@email.com", mobile: "9876543210", status: "Active", kycStatus: "Verified", joinedDate: "2024-01-15", investments: "₹5,50,000", city: "Mumbai", products: ["Bonds", "FDs", "IPO"], totalTransactions: 12 },
  { id: 2, name: "Priya Patel", email: "priya@email.com", mobile: "9876543211", status: "Active", kycStatus: "Verified", joinedDate: "2024-02-20", investments: "₹2,30,000", city: "Bangalore", products: ["FDs", "NPS"], totalTransactions: 5 },
  { id: 3, name: "Amit Kumar", email: "amit@email.com", mobile: "9876543212", status: "Inactive", kycStatus: "Pending", joinedDate: "2024-03-10", investments: "₹0", city: "Delhi", products: [], totalTransactions: 0 },
  { id: 4, name: "Sneha Reddy", email: "sneha@email.com", mobile: "9876543213", status: "Active", kycStatus: "Verified", joinedDate: "2024-01-25", investments: "₹8,75,000", city: "Hyderabad", products: ["Bonds", "IPO", "NPS"], totalTransactions: 18 },
  { id: 5, name: "Vikram Singh", email: "vikram@email.com", mobile: "9876543214", status: "Blocked", kycStatus: "Rejected", joinedDate: "2024-02-05", investments: "₹0", city: "Chennai", products: [], totalTransactions: 2 },
  { id: 6, name: "Ananya Gupta", email: "ananya@email.com", mobile: "9876543215", status: "Active", kycStatus: "Verified", joinedDate: "2024-03-18", investments: "₹3,45,000", city: "Pune", products: ["FDs", "Bonds"], totalTransactions: 8 },
  { id: 7, name: "Rajesh Iyer", email: "rajesh@email.com", mobile: "9876543216", status: "Active", kycStatus: "Verified", joinedDate: "2024-04-01", investments: "₹12,00,000", city: "Kolkata", products: ["Bonds", "FDs", "IPO", "NPS"], totalTransactions: 25 },
  { id: 8, name: "Meera Krishnan", email: "meera@email.com", mobile: "9876543217", status: "Active", kycStatus: "Under Review", joinedDate: "2024-04-15", investments: "₹50,000", city: "Kochi", products: ["FDs"], totalTransactions: 1 },
];

const statusDistribution = [
  { name: "Active", value: 6, color: "#22c55e" },
  { name: "Inactive", value: 1, color: "#f59e0b" },
  { name: "Blocked", value: 1, color: "#ef4444" },
];

const monthlySignups = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 62 },
  { month: "Mar", users: 78 },
  { month: "Apr", users: 95 },
  { month: "May", users: 112 },
  { month: "Jun", users: 134 },
];

const AdminUserMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof allUsers[0] | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesKyc = kycFilter === "all" || user.kycStatus.toLowerCase().includes(kycFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesKyc;
  });

  const stats = {
    total: allUsers.length,
    active: allUsers.filter(u => u.status === "Active").length,
    kycVerified: allUsers.filter(u => u.kycStatus === "Verified").length,
    kycPending: allUsers.filter(u => u.kycStatus === "Pending" || u.kycStatus === "Under Review").length,
    totalInvestments: "₹32.5 L",
    avgInvestment: "₹4.06 L",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "Inactive":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" />Inactive</Badge>;
      case "Blocked":
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getKYCBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-700"><Shield className="w-3 h-3 mr-1" />Verified</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "Under Review":
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" />Under Review</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewUser = (user: typeof allUsers[0]) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    toast({ title: "User Deleted", description: "User has been removed from the system." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage all platform users and their KYC status</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4" /> Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.total}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.kycVerified}</p>
                <p className="text-xs text-muted-foreground">KYC Verified</p>
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
                <p className="text-2xl font-bold text-amber-600">{stats.kycPending}</p>
                <p className="text-xs text-muted-foreground">KYC Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalInvestments}</p>
                <p className="text-xs text-muted-foreground">Total Invested</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-100">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-600">{stats.avgInvestment}</p>
                <p className="text-xs text-muted-foreground">Avg. Investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              User Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={25} outerRadius={40} paddingAngle={3} dataKey="value">
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {statusDistribution.map((item) => (
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

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Monthly User Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or mobile..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="KYC Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              All Users ({filteredUsers.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">User</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Contact</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">KYC</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Products</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Investments</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Joined</th>
                  <th className="text-center p-4 font-medium text-secondary text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{user.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {user.city}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                        <p className="text-sm flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" /> {user.mobile}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">{getKYCBadge(user.kycStatus)}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {user.products.length > 0 ? user.products.slice(0, 2).map((p, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                        )) : <span className="text-muted-foreground text-xs">None</span>}
                        {user.products.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{user.products.length - 2}</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-primary">{user.investments}</p>
                      <p className="text-xs text-muted-foreground">{user.totalTransactions} txns</p>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(user.joinedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewUser(user)}>
                          <Eye className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteUser(user.id)}>
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

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl text-primary">
                {selectedUser?.name.charAt(0)}
              </div>
              {selectedUser?.name}
            </DialogTitle>
            <DialogDescription>User ID: #{selectedUser?.id} • Member since {selectedUser?.joinedDate}</DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-muted-foreground">KYC Status</p>
                  <div className="mt-1">{getKYCBadge(selectedUser.kycStatus)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-secondary flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" /> Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {selectedUser.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedUser.mobile}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {selectedUser.city}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-semibold text-secondary flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-primary" /> Investment Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Invested</span>
                        <span className="font-bold text-primary">{selectedUser.investments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transactions</span>
                        <span className="font-bold text-secondary">{selectedUser.totalTransactions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-secondary mb-3">Active Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.products.length > 0 ? selectedUser.products.map((p, i) => (
                      <Badge key={i} className="bg-primary/10 text-primary border-primary/20">{p}</Badge>
                    )) : <p className="text-muted-foreground text-sm">No active products</p>}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button>Edit User</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserMaster;
