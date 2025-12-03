import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, CreditCard, CheckCircle, 
  Clock, XCircle, IndianRupee, Filter, Eye
} from "lucide-react";

const mockPayments = [
  { id: "PAY001", user: "Rahul Sharma", pran: "110012345678", amount: 50000, date: "2024-01-15", status: "completed", type: "Contribution" },
  { id: "PAY002", user: "Priya Patel", pran: "110087654321", amount: 25000, date: "2024-01-14", status: "pending", type: "Tier I" },
  { id: "PAY003", user: "Amit Kumar", pran: "110011223344", amount: 100000, date: "2024-01-13", status: "completed", type: "Contribution" },
  { id: "PAY004", user: "Sneha Reddy", pran: "110055667788", amount: 30000, date: "2024-01-12", status: "failed", type: "Tier II" },
  { id: "PAY005", user: "Vikram Singh", pran: "110099887766", amount: 75000, date: "2024-01-11", status: "completed", type: "Contribution" },
];

const AdminNPSPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.pran.includes(searchTerm) ||
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Collections", value: "₹28.5L", icon: IndianRupee, color: "bg-primary/10 text-primary" },
    { label: "Completed", value: mockPayments.filter(p => p.status === "completed").length, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Pending", value: mockPayments.filter(p => p.status === "pending").length, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Failed", value: mockPayments.filter(p => p.status === "failed").length, icon: XCircle, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">NPS Payment Entry</h1>
          <p className="text-muted-foreground">Manage NPS contributions and payments</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, PRAN, or Payment ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary/5">
                  <th className="text-left p-4 font-medium text-secondary">Payment ID</th>
                  <th className="text-left p-4 font-medium text-secondary">User</th>
                  <th className="text-left p-4 font-medium text-secondary">PRAN</th>
                  <th className="text-left p-4 font-medium text-secondary">Type</th>
                  <th className="text-left p-4 font-medium text-secondary">Amount</th>
                  <th className="text-left p-4 font-medium text-secondary">Date</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-right p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-secondary/5 transition-colors">
                    <td className="p-4 font-medium text-primary">{payment.id}</td>
                    <td className="p-4 font-medium text-secondary">{payment.user}</td>
                    <td className="p-4 text-muted-foreground">{payment.pran}</td>
                    <td className="p-4">
                      <Badge variant="outline">{payment.type}</Badge>
                    </td>
                    <td className="p-4 font-bold text-secondary">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{payment.date}</td>
                    <td className="p-4">
                      <Badge className={
                        payment.status === "completed" ? "bg-green-100 text-green-700" :
                        payment.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
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

export default AdminNPSPayments;
