import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Eye, Edit2, Trash2, Users, UserPlus } from "lucide-react";

const allUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@email.com", mobile: "9876543210", status: "Active", kycStatus: "Verified", joinedDate: "2024-01-15", investments: "₹5,50,000" },
  { id: 2, name: "Priya Patel", email: "priya@email.com", mobile: "9876543211", status: "Active", kycStatus: "Verified", joinedDate: "2024-02-20", investments: "₹2,30,000" },
  { id: 3, name: "Amit Kumar", email: "amit@email.com", mobile: "9876543212", status: "Inactive", kycStatus: "Pending", joinedDate: "2024-03-10", investments: "₹0" },
  { id: 4, name: "Sneha Reddy", email: "sneha@email.com", mobile: "9876543213", status: "Active", kycStatus: "Verified", joinedDate: "2024-01-25", investments: "₹8,75,000" },
  { id: 5, name: "Vikram Singh", email: "vikram@email.com", mobile: "9876543214", status: "Blocked", kycStatus: "Rejected", joinedDate: "2024-02-05", investments: "₹0" },
  { id: 6, name: "Ananya Gupta", email: "ananya@email.com", mobile: "9876543215", status: "Active", kycStatus: "Verified", joinedDate: "2024-03-18", investments: "₹3,45,000" },
];

const AdminUserMaster = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "Inactive":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Inactive</Badge>;
      case "Blocked":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getKYCBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✓ Verified</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Pending</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">✗ Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary">User Master</h1>
          <p className="text-muted flex items-center gap-2">
            <Users className="w-4 h-4" />
            Manage all platform users
          </p>
        </div>
        <Button className="finease-btn gap-2">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="finease-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted">Total Users</p>
            <p className="text-2xl font-bold text-secondary">{allUsers.length}</p>
          </CardContent>
        </Card>
        <Card className="finease-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted">Active Users</p>
            <p className="text-2xl font-bold text-green-600">{allUsers.filter(u => u.status === "Active").length}</p>
          </CardContent>
        </Card>
        <Card className="finease-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted">KYC Verified</p>
            <p className="text-2xl font-bold text-primary">{allUsers.filter(u => u.kycStatus === "Verified").length}</p>
          </CardContent>
        </Card>
        <Card className="finease-card">
          <CardContent className="p-4">
            <p className="text-sm text-muted">KYC Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{allUsers.filter(u => u.kycStatus === "Pending").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Search by name, email, or mobile..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="finease-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-medium text-secondary">Name</th>
                  <th className="text-left p-4 font-medium text-secondary">Email</th>
                  <th className="text-left p-4 font-medium text-secondary">Mobile</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-left p-4 font-medium text-secondary">KYC Status</th>
                  <th className="text-left p-4 font-medium text-secondary">Investments</th>
                  <th className="text-left p-4 font-medium text-secondary">Joined</th>
                  <th className="text-center p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-secondary">{user.name}</td>
                    <td className="p-4 text-muted">{user.email}</td>
                    <td className="p-4 text-muted">{user.mobile}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">{getKYCBadge(user.kycStatus)}</td>
                    <td className="p-4 font-medium text-primary">{user.investments}</td>
                    <td className="p-4 text-muted">{new Date(user.joinedDate).toLocaleDateString("en-IN")}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
};

export default AdminUserMaster;
