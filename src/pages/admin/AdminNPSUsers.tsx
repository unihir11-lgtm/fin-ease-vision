import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Download, Eye, Edit2, Trash2, Users, UserPlus, 
  TrendingUp, IndianRupee, PieChart, AlertCircle, CheckCircle, Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const npsUsers = [
  { id: 1, name: "Mani Shah", email: "mani@email.com", mobile: "9876543210", status: "Active", pranCard: "1122334455", tier: "Tier 1 & 2", riskProfile: "High", totalContribution: 250000, corpus: 285000, returns: 14 },
  { id: 2, name: "Amina Patel", email: "amina@email.com", mobile: "9876543211", status: "Active", pranCard: "1122334456", tier: "Tier 1", riskProfile: "Medium", totalContribution: 180000, corpus: 198000, returns: 10 },
  { id: 3, name: "Ravi Kumar", email: "ravi@email.com", mobile: "9876543212", status: "Pending", pranCard: "1122334457", tier: "Tier 1 & 2", riskProfile: "Low", totalContribution: 320000, corpus: 352000, returns: 10 },
  { id: 4, name: "Sofia Lin", email: "sofia@email.com", mobile: "9876543213", status: "Active", pranCard: "1122334458", tier: "Tier 1", riskProfile: "High", totalContribution: 150000, corpus: 175500, returns: 17 },
  { id: 5, name: "Liam O'Connor", email: "liam@email.com", mobile: "9876543214", status: "Inactive", pranCard: "1122334459", tier: "Tier 1 & 2", riskProfile: "Medium", totalContribution: 420000, corpus: 470400, returns: 12 },
  { id: 6, name: "Zara Ali", email: "zara@email.com", mobile: "9876543215", status: "Active", pranCard: "1122334460", tier: "Tier 1", riskProfile: "Low", totalContribution: 280000, corpus: 302400, returns: 8 },
  { id: 7, name: "Victor Chen", email: "victor@email.com", mobile: "9876543216", status: "Pending", pranCard: "1122334461", tier: "Tier 1 & 2", riskProfile: "High", totalContribution: 95000, corpus: 109250, returns: 15 },
  { id: 8, name: "Nina Morales", email: "nina@email.com", mobile: "9876543217", status: "Active", pranCard: "1122334462", tier: "Tier 1", riskProfile: "Medium", totalContribution: 210000, corpus: 231000, returns: 10 },
];

const AdminNPSUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof npsUsers[0] | null>(null);

  const filteredUsers = npsUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm) ||
      user.pranCard.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUsers: npsUsers.length,
    activeUsers: npsUsers.filter(u => u.status === "Active").length,
    pendingUsers: npsUsers.filter(u => u.status === "Pending").length,
    totalCorpus: npsUsers.reduce((a, b) => a + b.corpus, 0),
  };

  const riskDistribution = [
    { name: "High Risk", value: npsUsers.filter(u => u.riskProfile === "High").length, color: "#EF4444" },
    { name: "Medium Risk", value: npsUsers.filter(u => u.riskProfile === "Medium").length, color: "#F59E0B" },
    { name: "Low Risk", value: npsUsers.filter(u => u.riskProfile === "Low").length, color: "#22C55E" },
  ];

  const tierDistribution = [
    { name: "Tier 1 Only", users: npsUsers.filter(u => u.tier === "Tier 1").length },
    { name: "Tier 1 & 2", users: npsUsers.filter(u => u.tier === "Tier 1 & 2").length },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-700">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "High":
        return <Badge className="bg-red-100 text-red-700">{risk}</Badge>;
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-700">{risk}</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-700">{risk}</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const handleDelete = (id: number) => {
    toast({ title: "User Deleted", description: "NPS user has been removed from the system." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">NPS User Management</h1>
          <p className="text-muted-foreground">Manage all NPS users, PRAN accounts, and portfolio data</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2 bg-primary">
            <UserPlus className="w-4 h-4" /> Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border">
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
        <Card className="bg-white border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.activeUsers}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border">
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
        <Card className="bg-white border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent/10">
                <IndianRupee className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">₹{(stats.totalCorpus / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total AUM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card className="bg-white border">
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
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
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

        {/* Tier Distribution */}
        <Card className="bg-white border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Tier Account Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tierDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <Tooltip />
                  <Bar dataKey="users" fill="#23698e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile, or PRAN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            NPS Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">User</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">PRAN</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Tier</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Risk Profile</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Total Contribution</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Corpus</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Returns</th>
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
                        <p className="text-xs text-muted-foreground">{user.mobile}</p>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm text-secondary">{user.pranCard}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{user.tier}</Badge>
                    </td>
                    <td className="p-4">{getRiskBadge(user.riskProfile)}</td>
                    <td className="p-4 font-medium text-secondary text-sm">₹{user.totalContribution.toLocaleString()}</td>
                    <td className="p-4 font-bold text-secondary text-sm">₹{user.corpus.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="text-green-600 font-medium text-sm">+{user.returns}%</span>
                    </td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedUser(user)}>
                              <Eye className="w-4 h-4 text-primary" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Full Name</Label>
                                    <p className="font-medium">{selectedUser.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">PRAN</Label>
                                    <p className="font-medium font-mono">{selectedUser.pranCard}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Email</Label>
                                    <p className="font-medium">{selectedUser.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Mobile</Label>
                                    <p className="font-medium">{selectedUser.mobile}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Total Corpus</Label>
                                    <p className="font-bold text-primary">₹{selectedUser.corpus.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Returns</Label>
                                    <p className="font-bold text-green-600">+{selectedUser.returns}%</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
};

export default AdminNPSUsers;