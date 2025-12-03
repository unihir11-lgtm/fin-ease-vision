import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, Download, Receipt, CheckCircle, 
  Clock, AlertTriangle, IndianRupee, Eye, RefreshCw, Building, TrendingUp, Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

const mockSettlements = [
  { id: "SET001", batch: "BATCH-2024-001", amount: 500000, entries: 25, date: "2024-01-15", status: "settled", bank: "HDFC Bank", pfm: "HDFC Pension", processedDate: "2024-01-16" },
  { id: "SET002", batch: "BATCH-2024-002", amount: 350000, entries: 18, date: "2024-01-14", status: "processing", bank: "ICICI Bank", pfm: "ICICI Prudential", processedDate: null },
  { id: "SET003", batch: "BATCH-2024-003", amount: 750000, entries: 32, date: "2024-01-13", status: "settled", bank: "SBI", pfm: "SBI Pension", processedDate: "2024-01-14" },
  { id: "SET004", batch: "BATCH-2024-004", amount: 200000, entries: 10, date: "2024-01-12", status: "pending", bank: "Axis Bank", pfm: "UTI Retirement", processedDate: null },
  { id: "SET005", batch: "BATCH-2024-005", amount: 450000, entries: 22, date: "2024-01-11", status: "settled", bank: "HDFC Bank", pfm: "HDFC Pension", processedDate: "2024-01-12" },
  { id: "SET006", batch: "BATCH-2024-006", amount: 280000, entries: 14, date: "2024-01-10", status: "settled", bank: "Kotak Bank", pfm: "Kotak Pension", processedDate: "2024-01-11" },
  { id: "SET007", batch: "BATCH-2024-007", amount: 620000, entries: 28, date: "2024-01-09", status: "processing", bank: "ICICI Bank", pfm: "ICICI Prudential", processedDate: null },
  { id: "SET008", batch: "BATCH-2024-008", amount: 180000, entries: 9, date: "2024-01-08", status: "failed", bank: "Axis Bank", pfm: "UTI Retirement", processedDate: null },
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

  const stats = [
    { label: "Total Settled", value: `₹${(totalSettled / 100000).toFixed(1)}L`, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Pending Amount", value: `₹${(totalPending / 100000).toFixed(1)}L`, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Total Batches", value: mockSettlements.length, icon: Receipt, color: "bg-primary/10 text-primary" },
    { label: "Total Entries", value: totalEntries, icon: Building, color: "bg-blue-100 text-blue-600" },
  ];

  const settlementTrend = [
    { month: "Jan", amount: 1200000 },
    { month: "Feb", amount: 1450000 },
    { month: "Mar", amount: 1320000 },
    { month: "Apr", amount: 1680000 },
    { month: "May", amount: 1950000 },
  ];

  const bankDistribution = [
    { name: "HDFC Bank", value: 950000, color: "#3B82F6" },
    { name: "ICICI Bank", value: 970000, color: "#22C55E" },
    { name: "SBI", value: 750000, color: "#EAB308" },
    { name: "Axis Bank", value: 380000, color: "#EF4444" },
    { name: "Kotak Bank", value: 280000, color: "#A855F7" },
  ];

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
          <h1 className="text-2xl font-bold text-secondary">Payment Settlements</h1>
          <p className="text-muted-foreground">Manage NPS payment settlements and batch processing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2 bg-primary">
            <RefreshCw className="w-4 h-4" /> Process All Pending
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
        {/* Settlement Trend */}
        <Card className="bg-white border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Settlement Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={settlementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${v/100000}L`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`]} />
                  <Line type="monotone" dataKey="amount" stroke="#23698e" strokeWidth={2} dot={{ fill: '#23698e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bank Distribution */}
        <Card className="bg-white border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Building className="w-4 h-4 text-primary" />
              Settlement by Bank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={bankDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {bankDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {bankDistribution.map((item) => (
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
      <Card className="bg-white border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by batch ID or bank..."
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
      <Card className="bg-white border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Receipt className="w-4 h-4 text-primary" />
            Settlement Batches ({filteredSettlements.length})
          </CardTitle>
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
                    <td className="p-4 text-sm">{settlement.bank}</td>
                    <td className="p-4 text-sm text-muted-foreground">{settlement.pfm}</td>
                    <td className="p-4 text-sm text-muted-foreground">{settlement.date}</td>
                    <td className="p-4">
                      <Badge className={
                        settlement.status === "settled" ? "bg-green-100 text-green-700" :
                        settlement.status === "processing" ? "bg-blue-100 text-blue-700" :
                        settlement.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }>
                        {settlement.status}
                      </Badge>
                    </td>
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
                                    <Label className="text-xs text-muted-foreground">Amount</Label>
                                    <p className="font-bold text-primary">₹{selectedSettlement.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Entries</Label>
                                    <p className="font-medium">{selectedSettlement.entries}</p>
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
                          <Button variant="outline" size="sm" onClick={() => handleProcess(settlement.id)}>
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
    </div>
  );
};

export default AdminNPSSettlements;