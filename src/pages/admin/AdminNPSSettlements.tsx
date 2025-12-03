import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Download, Receipt, CheckCircle, 
  Clock, AlertTriangle, IndianRupee, Eye, RefreshCw, Building, TrendingUp, Calendar,
  FileText, XCircle, Filter, ArrowUpRight, Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area } from "recharts";

const mockSettlements = [
  { id: "SET-2025-001", batch: "BATCH-NOV-001", amount: 500000, entries: 25, date: "2025-11-15", status: "settled", bank: "HDFC Bank", pfm: "HDFC Pension", processedDate: "2025-11-16", tier1: 350000, tier2: 150000 },
  { id: "SET-2025-002", batch: "BATCH-NOV-002", amount: 350000, entries: 18, date: "2025-11-14", status: "processing", bank: "ICICI Bank", pfm: "ICICI Prudential", processedDate: null, tier1: 280000, tier2: 70000 },
  { id: "SET-2025-003", batch: "BATCH-NOV-003", amount: 750000, entries: 32, date: "2025-11-13", status: "settled", bank: "SBI", pfm: "SBI Pension", processedDate: "2025-11-14", tier1: 600000, tier2: 150000 },
  { id: "SET-2025-004", batch: "BATCH-NOV-004", amount: 200000, entries: 10, date: "2025-11-12", status: "pending", bank: "Axis Bank", pfm: "UTI Retirement", processedDate: null, tier1: 180000, tier2: 20000 },
  { id: "SET-2025-005", batch: "BATCH-NOV-005", amount: 450000, entries: 22, date: "2025-11-11", status: "settled", bank: "HDFC Bank", pfm: "HDFC Pension", processedDate: "2025-11-12", tier1: 380000, tier2: 70000 },
  { id: "SET-2025-006", batch: "BATCH-NOV-006", amount: 280000, entries: 14, date: "2025-11-10", status: "settled", bank: "Kotak Bank", pfm: "Kotak Pension", processedDate: "2025-11-11", tier1: 230000, tier2: 50000 },
  { id: "SET-2025-007", batch: "BATCH-NOV-007", amount: 620000, entries: 28, date: "2025-11-09", status: "processing", bank: "ICICI Bank", pfm: "ICICI Prudential", processedDate: null, tier1: 500000, tier2: 120000 },
  { id: "SET-2025-008", batch: "BATCH-NOV-008", amount: 180000, entries: 9, date: "2025-11-08", status: "failed", bank: "Axis Bank", pfm: "UTI Retirement", processedDate: null, tier1: 150000, tier2: 30000 },
];

const AdminNPSSettlements = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSettlement, setSelectedSettlement] = useState<typeof mockSettlements[0] | null>(null);

  const filteredSettlements = mockSettlements.filter((settlement) => {
    const matchesSearch = settlement.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          settlement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          settlement.bank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || settlement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSettled = mockSettlements.filter(s => s.status === "settled").reduce((a, b) => a + b.amount, 0);
  const totalPending = mockSettlements.filter(s => s.status === "pending" || s.status === "processing").reduce((a, b) => a + b.amount, 0);
  const totalEntries = mockSettlements.reduce((a, b) => a + b.entries, 0);
  const totalBatches = mockSettlements.length;

  const settlementTrend = [
    { month: "Jul", amount: 1200000, batches: 15 },
    { month: "Aug", amount: 1450000, batches: 18 },
    { month: "Sep", amount: 1320000, batches: 16 },
    { month: "Oct", amount: 1680000, batches: 21 },
    { month: "Nov", amount: 3330000, batches: 8 },
  ];

  const bankDistribution = [
    { name: "HDFC Bank", value: 950000, color: "#3B82F6" },
    { name: "ICICI Bank", value: 970000, color: "#22C55E" },
    { name: "SBI", value: 750000, color: "#F59E0B" },
    { name: "Axis Bank", value: 380000, color: "#EF4444" },
    { name: "Kotak Bank", value: 280000, color: "#8B5CF6" },
  ];

  const pfmDistribution = [
    { name: "HDFC Pension", amount: 950000, batches: 3 },
    { name: "ICICI Prudential", amount: 970000, batches: 2 },
    { name: "SBI Pension", amount: 750000, batches: 1 },
    { name: "UTI Retirement", amount: 380000, batches: 2 },
    { name: "Kotak Pension", amount: 280000, batches: 1 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "settled":
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Settled</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200"><RefreshCw className="w-3 h-3 mr-1" />Processing</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleProcess = (id: string) => {
    toast({ title: "Processing Settlement", description: `Settlement ${id} is now being processed.` });
  };

  const handleRetry = (id: string) => {
    toast({ title: "Retrying Settlement", description: `Retrying settlement ${id}...` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-display">Payment Settlements</h1>
          <p className="text-muted-foreground mt-1">Process settlements, track batches, and reconcile with PFMs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2 bg-primary">
            <RefreshCw className="w-4 h-4" /> Process All Pending
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">₹{(totalSettled / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Total Settled</p>
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
                <p className="text-2xl font-bold text-secondary">₹{(totalPending / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{totalBatches}</p>
                <p className="text-xs text-muted-foreground">Total Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{totalEntries}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
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
                <p className="text-2xl font-bold text-secondary">98.5%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settlement Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Settlement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={settlementTrend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/100000}L`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  <Area type="monotone" dataKey="amount" stroke="hsl(var(--primary))" fill="url(#colorAmount)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bank Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              By Bank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={bankDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={50}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {bankDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {bankDistribution.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-secondary">₹{(item.value / 100000).toFixed(1)}L</span>
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
                placeholder="Search by batch ID, settlement ID, or bank..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="settled">Settled</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Settlements Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="w-4 h-4 text-primary" />
              Settlement Batches ({filteredSettlements.length})
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
                  <th className="text-left p-4 font-medium text-secondary text-sm">Settlement ID</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Batch</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Entries</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Amount</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Tier Split</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Bank</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">PFM</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Date</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Status</th>
                  <th className="text-right p-4 font-medium text-secondary text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSettlements.map((settlement) => (
                  <tr key={settlement.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-sm text-primary">{settlement.id}</td>
                    <td className="p-4 font-medium text-secondary text-sm">{settlement.batch}</td>
                    <td className="p-4 text-sm text-muted-foreground">{settlement.entries}</td>
                    <td className="p-4 font-bold text-secondary text-sm">₹{settlement.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p className="text-muted-foreground">T1: ₹{(settlement.tier1 / 1000).toFixed(0)}K</p>
                        <p className="text-muted-foreground">T2: ₹{(settlement.tier2 / 1000).toFixed(0)}K</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{settlement.bank}</td>
                    <td className="p-4 text-sm text-muted-foreground">{settlement.pfm}</td>
                    <td className="p-4 text-sm text-muted-foreground">{settlement.date}</td>
                    <td className="p-4">{getStatusBadge(settlement.status)}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedSettlement(settlement)}>
                              <Eye className="w-4 h-4 text-primary" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Settlement Details</DialogTitle>
                            </DialogHeader>
                            {selectedSettlement && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Settlement ID</Label>
                                    <p className="font-mono font-medium">{selectedSettlement.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Batch</Label>
                                    <p className="font-medium">{selectedSettlement.batch}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Total Amount</Label>
                                    <p className="font-bold text-primary text-lg">₹{selectedSettlement.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Entries</Label>
                                    <p className="font-medium">{selectedSettlement.entries}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Tier 1 Amount</Label>
                                    <p className="font-medium">₹{selectedSettlement.tier1.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Tier 2 Amount</Label>
                                    <p className="font-medium">₹{selectedSettlement.tier2.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Bank</Label>
                                    <p className="font-medium">{selectedSettlement.bank}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">PFM</Label>
                                    <p className="font-medium">{selectedSettlement.pfm}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Created Date</Label>
                                    <p className="font-medium">{selectedSettlement.date}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Processed Date</Label>
                                    <p className="font-medium">{selectedSettlement.processedDate || "—"}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {settlement.status === "pending" && (
                          <Button variant="outline" size="sm" onClick={() => handleProcess(settlement.id)} className="gap-1 text-primary">
                            Process
                          </Button>
                        )}
                        {settlement.status === "failed" && (
                          <Button variant="outline" size="sm" onClick={() => handleRetry(settlement.id)} className="gap-1">
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
        <p className="text-sm text-muted-foreground">Showing {filteredSettlements.length} of {mockSettlements.length} settlements</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNPSSettlements;
