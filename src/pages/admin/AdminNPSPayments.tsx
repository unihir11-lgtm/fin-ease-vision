import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Download, CreditCard, CheckCircle, 
  Clock, XCircle, IndianRupee, Eye, TrendingUp, Calendar, RefreshCw,
  Filter, ArrowUpRight, ArrowDownRight, FileText, Users, Receipt
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart as RechartsPie, Pie, Cell, AreaChart, Area } from "recharts";

const mockPayments = [
  { id: "PAY-2025-001", user: "Rahul Sharma", pran: "1100345678901", amount: 50000, popCharges: 50, serviceTax: 9, pgCharges: 10, netAmount: 49931, date: "2025-11-15", status: "completed", tier: "Tier 1", frequency: "Monthly", fund: "Auto Choice", pfm: "HDFC Pension" },
  { id: "PAY-2025-002", user: "Priya Patel", pran: "1100345678902", amount: 25000, popCharges: 25, serviceTax: 5, pgCharges: 5, netAmount: 24965, date: "2025-11-14", status: "pending", tier: "Tier 1", frequency: "One-time", fund: "Active Choice", pfm: "ICICI Prudential" },
  { id: "PAY-2025-003", user: "Amit Kumar", pran: "1100345678903", amount: 100000, popCharges: 100, serviceTax: 18, pgCharges: 20, netAmount: 99862, date: "2025-11-13", status: "completed", tier: "Tier 1 & 2", frequency: "Quarterly", fund: "Aggressive", pfm: "SBI Pension" },
  { id: "PAY-2025-004", user: "Sneha Reddy", pran: "1100345678904", amount: 30000, popCharges: 30, serviceTax: 5, pgCharges: 6, netAmount: 29959, date: "2025-11-12", status: "failed", tier: "Tier 1", frequency: "Monthly", fund: "Auto Choice", pfm: "HDFC Pension" },
  { id: "PAY-2025-005", user: "Vikram Singh", pran: "1100345678905", amount: 75000, popCharges: 75, serviceTax: 14, pgCharges: 15, netAmount: 74896, date: "2025-11-11", status: "completed", tier: "Tier 1 & 2", frequency: "Monthly", fund: "Moderate", pfm: "UTI Retirement" },
  { id: "PAY-2025-006", user: "Neha Gupta", pran: "1100345678906", amount: 45000, popCharges: 45, serviceTax: 8, pgCharges: 9, netAmount: 44938, date: "2025-11-10", status: "completed", tier: "Tier 1", frequency: "One-time", fund: "Conservative", pfm: "Kotak Pension" },
  { id: "PAY-2025-007", user: "Arjun Nair", pran: "1100345678907", amount: 60000, popCharges: 60, serviceTax: 11, pgCharges: 12, netAmount: 59917, date: "2025-11-09", status: "pending_approval", tier: "Tier 1", frequency: "Monthly", fund: "Auto Choice", pfm: "HDFC Pension" },
  { id: "PAY-2025-008", user: "Kavita Joshi", pran: "1100345678908", amount: 35000, popCharges: 35, serviceTax: 6, pgCharges: 7, netAmount: 34952, date: "2025-11-08", status: "completed", tier: "Tier 1", frequency: "Quarterly", fund: "Active Choice", pfm: "ICICI Prudential" },
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
  const totalPending = mockPayments.filter(p => p.status === "pending" || p.status === "pending_approval").reduce((a, b) => a + b.amount, 0);
  const totalFailed = mockPayments.filter(p => p.status === "failed").reduce((a, b) => a + b.amount, 0);
  const totalTransactions = mockPayments.length;

  const monthlyTrend = [
    { month: "Jul", tier1: 180000, tier2: 120000, total: 300000 },
    { month: "Aug", tier1: 220000, tier2: 150000, total: 370000 },
    { month: "Sep", tier1: 195000, tier2: 130000, total: 325000 },
    { month: "Oct", tier1: 280000, tier2: 180000, total: 460000 },
    { month: "Nov", tier1: 420000, tier2: 200000, total: 620000 },
  ];

  const contributionByType = [
    { name: "Monthly SIP", value: 420000, color: "#3B82F6" },
    { name: "Quarterly", value: 180000, color: "#22C55E" },
    { name: "One-time", value: 95000, color: "#F59E0B" },
  ];

  const fundDistribution = [
    { name: "Auto Choice", amount: 145000 },
    { name: "Active Choice", amount: 60000 },
    { name: "Aggressive", amount: 100000 },
    { name: "Moderate", amount: 75000 },
    { name: "Conservative", amount: 45000 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "pending_approval":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200"><Clock className="w-3 h-3 mr-1" />Awaiting Approval</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRetry = (id: string) => {
    toast({ title: "Payment Retry Initiated", description: `Retrying payment ${id}...` });
  };

  const handleApprove = (id: string) => {
    toast({ title: "Payment Approved", description: `Payment ${id} has been approved and processed.` });
  };

  const handleReject = (id: string) => {
    toast({ title: "Payment Rejected", description: `Payment ${id} has been rejected.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">NPS Payment Management</h1>
          <p className="text-muted-foreground mt-1">Track contributions, process payments, and manage settlements</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2 bg-primary">
            <CreditCard className="w-4 h-4" /> Record Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">₹{(totalCompleted / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total Collected</p>
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
                <p className="text-2xl font-bold text-secondary">{mockPayments.filter(p => p.status === "completed").length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
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
                <p className="text-2xl font-bold text-secondary">{mockPayments.filter(p => p.status.includes("pending")).length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{mockPayments.filter(p => p.status === "failed").length}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
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
                <p className="text-2xl font-bold text-green-600">+24%</p>
                <p className="text-xs text-muted-foreground">vs Last Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Collection Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/1000}K`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  <Legend />
                  <Area type="monotone" dataKey="total" name="Total" stroke="hsl(var(--primary))" fill="url(#colorTotal)" strokeWidth={2} />
                  <Line type="monotone" dataKey="tier1" name="Tier 1" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
                  <Line type="monotone" dataKey="tier2" name="Tier 2" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Type Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              By Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={contributionByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {contributionByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {contributionByType.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-secondary">₹{(item.value / 1000)}K</span>
                  </div>
                ))}
              </div>
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
                <TabsTrigger value="pending_approval">Awaiting Approval</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              Payment Entries ({filteredPayments.length})
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
                  <th className="text-left p-4 font-medium text-secondary text-sm">Payment ID</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">User Details</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">PRAN</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Tier</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Fund</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Gross Amt</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Charges</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Net Amt</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Date</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <p className="font-mono text-sm text-primary">{payment.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-secondary text-sm">{payment.user}</p>
                      <p className="text-xs text-muted-foreground">{payment.pfm}</p>
                    </td>
                    <td className="p-4 font-mono text-sm text-muted-foreground">{payment.pran}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{payment.tier}</Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{payment.fund}</td>
                    <td className="p-4 font-medium text-secondary text-sm">₹{payment.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="text-xs space-y-0.5">
                        <p className="text-amber-600">POP: ₹{payment.popCharges}</p>
                        <p className="text-orange-600">Tax: ₹{payment.serviceTax}</p>
                        <p className="text-red-600">PG: ₹{payment.pgCharges}</p>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-green-600 text-sm">₹{payment.netAmount.toLocaleString()}</td>
                    <td className="p-4 text-sm text-muted-foreground">{payment.date}</td>
                    <td className="p-4">{getStatusBadge(payment.status)}</td>
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
                                    <Label className="text-xs text-muted-foreground">PFM</Label>
                                    <p className="font-medium">{selectedPayment.pfm}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Tier</Label>
                                    <p className="font-medium">{selectedPayment.tier}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Frequency</Label>
                                    <p className="font-medium">{selectedPayment.frequency}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Fund Selection</Label>
                                    <p className="font-medium">{selectedPayment.fund}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Date</Label>
                                    <p className="font-medium">{selectedPayment.date}</p>
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                                  <p className="text-sm font-semibold text-secondary">Payment Breakdown</p>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Gross Amount</span>
                                      <span className="font-medium">₹{selectedPayment.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-amber-600">POP Charges (0.1%)</span>
                                      <span className="text-amber-600">- ₹{selectedPayment.popCharges}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-orange-600">Service Tax (18%)</span>
                                      <span className="text-orange-600">- ₹{selectedPayment.serviceTax}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-red-600">Payment Gateway Charges</span>
                                      <span className="text-red-600">- ₹{selectedPayment.pgCharges}</span>
                                    </div>
                                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                                      <span className="font-semibold text-green-700">Net Contribution</span>
                                      <span className="font-bold text-green-700">₹{selectedPayment.netAmount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {selectedPayment.status === "pending_approval" && (
                                  <div className="flex gap-3 pt-4 border-t">
                                    <Button onClick={() => handleApprove(selectedPayment.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleReject(selectedPayment.id)} className="flex-1">
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {payment.status === "pending_approval" && (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleApprove(payment.id)} className="gap-1 text-green-600 border-green-200 hover:bg-green-50">
                              <CheckCircle className="w-3 h-3" /> Approve
                            </Button>
                          </>
                        )}
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {filteredPayments.length} of {mockPayments.length} payments</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNPSPayments;
