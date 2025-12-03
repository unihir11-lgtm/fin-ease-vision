import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Banknote,
  PiggyBank,
  Building2,
  Eye,
  Receipt,
  IndianRupee,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const transactions = [
  { id: "TXN001", type: "buy", product: "Bond", name: "REC Limited Bond", amount: 50000, units: 5, date: "2024-01-15", status: "completed" },
  { id: "TXN002", type: "buy", product: "FD", name: "HDFC Bank FD", amount: 100000, units: 1, date: "2024-01-10", status: "completed" },
  { id: "TXN003", type: "credit", product: "Bond", name: "NHAI Bond Coupon", amount: 3750, units: null, date: "2024-01-05", status: "completed" },
  { id: "TXN004", type: "buy", product: "IPO", name: "TechCorp Ltd IPO", amount: 14850, units: 1, date: "2024-01-02", status: "pending" },
  { id: "TXN005", type: "credit", product: "FD", name: "SBI FD Interest", amount: 2500, units: null, date: "2023-12-28", status: "completed" },
  { id: "TXN006", type: "buy", product: "NPS", name: "NPS Contribution", amount: 25000, units: null, date: "2023-12-20", status: "completed" },
  { id: "TXN007", type: "sell", product: "Bond", name: "IRFC Bond", amount: 25000, units: 2, date: "2023-12-15", status: "completed" },
];

const monthlyData = [
  { month: "Aug", invested: 45000, credits: 2500 },
  { month: "Sep", invested: 75000, credits: 3200 },
  { month: "Oct", invested: 50000, credits: 4100 },
  { month: "Nov", invested: 125000, credits: 3800 },
  { month: "Dec", invested: 50000, credits: 2500 },
  { month: "Jan", invested: 164850, credits: 6250 },
];

const DashboardTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || txn.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalInvested = transactions.filter((t) => t.type === "buy").reduce((sum, t) => sum + t.amount, 0);
  const totalCredits = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0);
  const totalSold = transactions.filter((t) => t.type === "sell").reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    { label: "Total Invested", value: `₹${totalInvested.toLocaleString()}`, change: "+18.5%", positive: true, icon: ArrowUpRight, color: "bg-blue-100 text-blue-600" },
    { label: "Credits Received", value: `₹${totalCredits.toLocaleString()}`, change: "+12.3%", positive: true, icon: ArrowDownLeft, color: "bg-green-100 text-green-600" },
    { label: "Total Sold", value: `₹${totalSold.toLocaleString()}`, icon: Receipt, color: "bg-amber-100 text-amber-600" },
    { label: "Total Transactions", value: transactions.length.toString(), icon: Calendar, color: "bg-purple-100 text-purple-600" },
  ];

  const getProductIcon = (product: string) => {
    switch (product) {
      case "Bond": return <Banknote className="w-4 h-4" />;
      case "FD": return <PiggyBank className="w-4 h-4" />;
      case "IPO": return <TrendingUp className="w-4 h-4" />;
      case "NPS": return <Building2 className="w-4 h-4" />;
      default: return <Banknote className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "failed": return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Transactions</h1>
          <p className="text-gray-500">View and manage all your transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    {stat.change && (
                      <span className={`text-xs flex items-center ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                        {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transaction Trend Chart */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Transaction Trend</CardTitle>
          <p className="text-sm text-gray-500">Monthly investment and credits overview</p>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1dab91" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1dab91" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#23698e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#23698e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="invested" stroke="#1dab91" fillOpacity={1} fill="url(#colorInvested)" name="Invested" />
                <Area type="monotone" dataKey="credits" stroke="#23698e" fillOpacity={1} fill="url(#colorCredits)" name="Credits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        txn.type === "buy" ? "bg-blue-100" :
                        txn.type === "sell" ? "bg-amber-100" : "bg-green-100"
                      }`}>
                        {txn.type === "buy" ? (
                          <ArrowUpRight className={`w-4 h-4 ${txn.type === "buy" ? "text-blue-600" : "text-amber-600"}`} />
                        ) : txn.type === "sell" ? (
                          <ArrowDownLeft className="w-4 h-4 text-amber-600" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{txn.name}</p>
                        <p className="text-xs text-gray-500">{txn.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize ${
                      txn.type === "buy" ? "border-blue-200 text-blue-700" :
                      txn.type === "sell" ? "border-amber-200 text-amber-700" : "border-green-200 text-green-700"
                    }`}>
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      {getProductIcon(txn.product)}
                      {txn.product}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${
                    txn.type === "credit" || txn.type === "sell" ? "text-green-600" : "text-secondary"
                  }`}>
                    {txn.type === "credit" || txn.type === "sell" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredTransactions.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="p-12 text-center">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardTransactions;