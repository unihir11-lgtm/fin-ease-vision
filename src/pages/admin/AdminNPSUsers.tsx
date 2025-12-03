import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Search, Filter, Download, Eye, Edit2, Trash2, Users } from "lucide-react";

const npsUsers = [
  { id: 1, name: "Mani Shah", mobile: "2548769523", status: "Pending", pranCard: "HGFCFXC122", tier: "Tier 1", additionalPran: "HGTR4558" },
  { id: 2, name: "Amina Patel", mobile: "2548769524", status: "Active", pranCard: "BTDFXCX123", tier: "Tier 1 Tier 2", additionalPran: "HGTR4558" },
  { id: 3, name: "Ravi Kumar", mobile: "2548769525", status: "Deactive", pranCard: "KJHGFDC234", tier: "Tier 1 Tier 2", additionalPran: "HGTR4558" },
  { id: 4, name: "Sofia Lin", mobile: "2548769526", status: "Pending", pranCard: "ZXCASDQ456", tier: "Tier 1", additionalPran: "HGTR4558" },
  { id: 5, name: "Liam O'Connor", mobile: "2548769527", status: "Active", pranCard: "QWERTYUI789", tier: "Tier 1 Tier 2", additionalPran: "HGTR4558" },
  { id: 6, name: "Zara Ali", mobile: "2548769528", status: "Deactive", pranCard: "HGFDSAQ987", tier: "Tier 1 Tier 2", additionalPran: "HGTR4558" },
  { id: 7, name: "Victor Chen", mobile: "2548769529", status: "Pending", pranCard: "RTYUIO123", tier: "Tier 1 Tier 2", additionalPran: "HGTR4558" },
  { id: 8, name: "Nina Morales", mobile: "2548769530", status: "Active", pranCard: "ASDFGHJ234", tier: "Tier 1", additionalPran: "HGTR4558" },
];

const AdminNPSUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = npsUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      user.pranCard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">● Active</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">● Pending</Badge>;
      case "Deactive":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">● Deactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary">NPS User Master</h1>
        <p className="text-muted flex items-center gap-2">
          <Users className="w-4 h-4" />
          Manage all NPS users and their details
        </p>
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input
                placeholder="Search by name, mobile, or PRAN Card..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="deactive">Deactive</SelectItem>
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
                  <th className="text-left p-4 font-medium text-secondary">Full Name</th>
                  <th className="text-left p-4 font-medium text-secondary">Mobile no.</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-left p-4 font-medium text-secondary">PRANCard</th>
                  <th className="text-left p-4 font-medium text-secondary">Tier Account</th>
                  <th className="text-left p-4 font-medium text-secondary">Additional PRAN Number</th>
                  <th className="text-center p-4 font-medium text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-secondary">{user.name}</td>
                    <td className="p-4 text-muted">{user.mobile}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4 text-muted">{user.pranCard}</td>
                    <td className="p-4 text-primary">{user.tier}</td>
                    <td className="p-4 text-muted">{user.additionalPran}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
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

export default AdminNPSUsers;
