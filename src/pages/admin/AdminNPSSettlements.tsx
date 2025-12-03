import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, Receipt, CheckCircle, 
  Clock, AlertTriangle, IndianRupee, Eye, RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockSettlements = [
  { id: "SET001", batch: "BATCH-2024-001", amount: 500000, entries: 25, date: "2024-01-15", status: "settled", bank: "HDFC Bank" },
  { id: "SET002", batch: "BATCH-2024-002", amount: 350000, entries: 18, date: "2024-01-14", status: "processing", bank: "ICICI Bank" },
  { id: "SET003", batch: "BATCH-2024-003", amount: 750000, entries: 32, date: "2024-01-13", status: "settled", bank: "SBI" },
  { id: "SET004", batch: "BATCH-2024-004", amount: 200000, entries: 10, date: "2024-01-12", status: "pending", bank: "Axis Bank" },
  { id: "SET005", batch: "BATCH-2024-005", amount: 450000, entries: 22, date: "2024-01-11", status: "settled", bank: "HDFC Bank" },
];

const AdminNPSSettlements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSettlements = mockSettlements.filter((settlement) => {
    const matchesSearch = settlement.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          settlement.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || settlement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSettled = mockSettlements.filter(s => s.status === "settled").reduce((a, b) => a + b.amount, 0);
  const totalPending = mockSettlements.filter(s => s.status !== "settled").reduce((a, b) => a + b.amount, 0);

  const stats = [
    { label: "Total Settled", value: `₹${(totalSettled / 100000).toFixed(1)}L`, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Pending Amount", value: `₹${(totalPending / 100000).toFixed(1)}L`, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Total Batches", value: mockSettlements.length, icon: Receipt, color: "bg-primary/10 text-primary" },
    { label: "Processing", value: mockSettlements.filter(s => s.status === "processing").length, icon: RefreshCw, color: "bg-blue-100 text-blue-600" },
  ];

  const handleProcess = (id: string) => {
    toast({ title: "Processing Settlement", description: `Settlement ${id} is now being processed.` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Payment Settlements</h1>
          <p className="text-muted-foreground">Manage NPS payment settlements and batches</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="gap-2">
            <RefreshCw className="w-4 h-4" /> Process All Pending
          </Button>
        </div>
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
                placeholder="Search by batch ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="settled">Settled</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Settlements Table */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Settlement Batches
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary/5">
                  <th className="text-left p-4 font-medium text-secondary">Settlement ID</th>
                  <th className="text-left p-4 font-medium text-secondary">Batch</th>
                  <th className="text-left p-4 font-medium text-secondary">Entries</th>
                  <th className="text-left p-4 font-medium text-secondary">Amount</th>
                  <th className="text-left p-4 font-medium text-secondary">Bank</th>
                  <th className="text-left p-4 font-medium text-secondary">Date</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-right p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSettlements.map((settlement) => (
                  <tr key={settlement.id} className="border-b hover:bg-secondary/5 transition-colors">
                    <td className="p-4 font-medium text-primary">{settlement.id}</td>
                    <td className="p-4 font-medium text-secondary">{settlement.batch}</td>
                    <td className="p-4 text-muted-foreground">{settlement.entries}</td>
                    <td className="p-4 font-bold text-secondary">₹{settlement.amount.toLocaleString()}</td>
                    <td className="p-4">{settlement.bank}</td>
                    <td className="p-4 text-muted-foreground">{settlement.date}</td>
                    <td className="p-4">
                      <Badge className={
                        settlement.status === "settled" ? "bg-green-100 text-green-700" :
                        settlement.status === "processing" ? "bg-blue-100 text-blue-700" :
                        "bg-amber-100 text-amber-700"
                      }>
                        {settlement.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {settlement.status === "pending" && (
                          <Button variant="outline" size="sm" onClick={() => handleProcess(settlement.id)}>
                            Process
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
