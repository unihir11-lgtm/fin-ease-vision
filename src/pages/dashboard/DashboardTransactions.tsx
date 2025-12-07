import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ReceiptText,
  CreditCard,
  Wallet
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
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

const productDistribution = [
  { name: "Bonds", value: 45, color: "#14b8a6" },
  { name: "FDs", value: 35, color: "#3b82f6" },
  { name: "IPO", value: 12, color: "#f59e0b" },
  { name: "NPS", value: 8, color: "#8b5cf6" },
];

const DashboardTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterProduct, setFilterProduct] = useState("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || txn.type === filterType;
    const matchesProduct = filterProduct === "all" || txn.product === filterProduct;
    return matchesSearch && matchesType && matchesProduct;
  });

  const totalInvested = transactions.filter((t) => t.type === "buy").reduce((sum, t) => sum + t.amount, 0);
  const totalCredits = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0);
  const totalSold = transactions.filter((t) => t.type === "sell").reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    { label: "Total Invested", value: `₹${totalInvested.toLocaleString()}`, change: "+18.5%", positive: true, icon: Wallet, color: "bg-primary/10 text-primary" },
    { label: "Credits Received", value: `₹${totalCredits.toLocaleString()}`, change: "+12.3%", positive: true, icon: ArrowDownLeft, color: "bg-green-100 text-green-600" },
    { label: "Total Sold", value: `₹${totalSold.toLocaleString()}`, icon: ReceiptText, color: "bg-amber-100 text-amber-600" },
    { label: "Total Transactions", value: transactions.length.toString(), icon: Receipt, color: "bg-purple-100 text-purple-600" },
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
      case "completed": return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      case "failed": return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-['Raleway'] flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            Transactions
          </h1>
          <p className="text-muted-foreground mt-1">View and manage all your investment transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Statement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                    {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-secondary mt-3">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Trend Chart */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Transaction Trend
            </CardTitle>
            <p className="text-sm text-muted-foreground">Monthly investment and credits overview</p>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="invested" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" name="Invested" />
                  <Area type="monotone" dataKey="credits" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCredits)" name="Credits" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Distribution */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              By Product
            </CardTitle>
            <p className="text-sm text-muted-foreground">Transaction distribution</p>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {productDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold text-secondary">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by transaction name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterProduct} onValueChange={setFilterProduct}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="Bond">Bonds</SelectItem>
                  <SelectItem value="FD">FDs</SelectItem>
                  <SelectItem value="IPO">IPO</SelectItem>
                  <SelectItem value="NPS">NPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Transaction History ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead className="font-semibold">Transaction</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="text-right font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/10">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        txn.type === "buy" ? "bg-blue-100" :
                        txn.type === "sell" ? "bg-amber-100" : "bg-green-100"
                      }`}>
                        {txn.type === "buy" ? (
                          <ArrowUpRight className={`w-4 h-4 text-blue-600`} />
                        ) : txn.type === "sell" ? (
                          <ArrowDownLeft className="w-4 h-4 text-amber-600" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{txn.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{txn.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize ${
                      txn.type === "buy" ? "border-blue-200 text-blue-700 bg-blue-50" :
                      txn.type === "sell" ? "border-amber-200 text-amber-700 bg-amber-50" : "border-green-200 text-green-700 bg-green-50"
                    }`}>
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1.5">
                      {getProductIcon(txn.product)}
                      {txn.product}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${
                    txn.type === "credit" || txn.type === "sell" ? "text-green-600" : "text-secondary"
                  }`}>
                    {txn.type === "credit" || txn.type === "sell" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
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
        <Card className="border-border">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-secondary mb-2">No transactions found</p>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardTransactions;
