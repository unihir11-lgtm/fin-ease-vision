import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, Download, CreditCard, CheckCircle, 
  Clock, XCircle, IndianRupee, Eye, TrendingUp, Calendar, RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const mockPayments = [
  { id: "PAY001", user: "Rahul Sharma", pran: "1122334455", amount: 50000, date: "2024-01-15", status: "completed", type: "Tier I", tier: "Tier 1", frequency: "Monthly" },
  { id: "PAY002", user: "Priya Patel", pran: "1122334456", amount: 25000, date: "2024-01-14", status: "pending", type: "Tier I", tier: "Tier 1", frequency: "One-time" },
  { id: "PAY003", user: "Amit Kumar", pran: "1122334457", amount: 100000, date: "2024-01-13", status: "completed", type: "Tier II", tier: "Tier 2", frequency: "Quarterly" },
  { id: "PAY004", user: "Sneha Reddy", pran: "1122334458", amount: 30000, date: "2024-01-12", status: "failed", type: "Tier I", tier: "Tier 1", frequency: "Monthly" },
  { id: "PAY005", user: "Vikram Singh", pran: "1122334459", amount: 75000, date: "2024-01-11", status: "completed", type: "Tier I", tier: "Tier 1 & 2", frequency: "Monthly" },
  { id: "PAY006", user: "Neha Gupta", pran: "1122334460", amount: 45000, date: "2024-01-10", status: "completed", type: "Tier II", tier: "Tier 2", frequency: "One-time" },
  { id: "PAY007", user: "Arjun Nair", pran: "1122334461", amount: 60000, date: "2024-01-09", status: "pending", type: "Tier I", tier: "Tier 1", frequency: "Monthly" },
  { id: "PAY008", user: "Kavita Joshi", pran: "1122334462", amount: 35000, date: "2024-01-08", status: "completed", type: "Tier I", tier: "Tier 1", frequency: "Quarterly" },
];

const AdminNPSPayments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<typeof mockPayments[0] | null>(null);

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.pran.includes(searchTerm) ||
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCompleted = mockPayments.filter(p => p.status === "completed").reduce((a, b) => a + b.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === "pending").reduce((a, b) => a + b.amount, 0);
  const totalFailed = mockPayments.filter(p => p.status === "failed").reduce((a, b) => a + b.amount, 0);

  const stats = [
    { label: "Total Collections", value: `₹${(totalCompleted / 100000).toFixed(1)}L`, icon: IndianRupee, color: "bg-primary/10 text-primary" },
    { label: "Completed", value: mockPayments.filter(p => p.status === "completed").length, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Pending", value: mockPayments.filter(p => p.status === "pending").length, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Failed", value: mockPayments.filter(p => p.status === "failed").length, icon: XCircle, color: "bg-red-100 text-red-600" },
  ];

  const monthlyTrend = [
    { month: "Jan", tier1: 180000, tier2: 120000 },
    { month: "Feb", tier1: 220000, tier2: 150000 },
    { month: "Mar", tier1: 195000, tier2: 130000 },
    { month: "Apr", tier1: 280000, tier2: 180000 },
    { month: "May", tier1: 320000, tier2: 200000 },
  ];

  const contributionByType = [
    { name: "Monthly", value: 420000 },
    { name: "Quarterly", value: 180000 },
    { name: "One-time", value: 95000 },
  ];

  const handleRetry = (id: string) => {
    toast({ title: "Payment Retry Initiated", description: `Retrying payment ${id}...` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">NPS Payment Management</h1>
          <p className="text-muted-foreground">Track and manage all NPS contributions and payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2 bg-primary">
            <CreditCard className="w-4 h-4" /> New Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="bg-white border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Contribution Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/1000}K`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  <Legend />
                  <Bar dataKey="tier1" name="Tier I" fill="#23698e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tier2" name="Tier II" fill="#1dab91" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Type Distribution */}
        <Card className="bg-white border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Contribution by Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contributionByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/1000}K`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#9CA3AF" width={80} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  <Bar dataKey="value" fill="#23698e" radius={[0, 4, 4, 0]} />
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
                placeholder="Search by name, PRAN, or Payment ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-muted/50">
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
      <Card className="bg-white border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            Payment Entries ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">Payment ID</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">User</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">PRAN</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Tier</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Frequency</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Amount</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Date</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-sm text-primary">{payment.id}</td>
                    <td className="p-4 font-medium text-secondary text-sm">{payment.user}</td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">{payment.pran}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{payment.tier}</Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{payment.frequency}</td>
                    <td className="p-4 font-bold text-secondary text-sm">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-4 text-sm text-muted-foreground">{payment.date}</td>
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
                      <div className="flex justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedPayment(payment)}>
                              <Eye className="w-4 h-4 text-primary" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Payment Details</DialogTitle>
                            </DialogHeader>
                            {selectedPayment && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Payment ID</Label>
                                    <p className="font-mono font-medium">{selectedPayment.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">User</Label>
                                    <p className="font-medium">{selectedPayment.user}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">PRAN</Label>
                                    <p className="font-mono">{selectedPayment.pran}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Amount</Label>
                                    <p className="font-bold text-primary">₹{selectedPayment.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Tier</Label>
                                    <p className="font-medium">{selectedPayment.tier}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Frequency</Label>
                                    <p className="font-medium">{selectedPayment.frequency}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {payment.status === "failed" && (
                          <Button variant="outline" size="sm" onClick={() => handleRetry(payment.id)} className="gap-1">
                            <RefreshCw className="w-3 h-3" /> Retry
                          </Button>
                        )}
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