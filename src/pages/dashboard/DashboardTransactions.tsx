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
} from "lucide-react";

const transactions = [
  {
    id: "TXN001",
    type: "buy",
    product: "Bond",
    name: "REC Limited Bond",
    amount: 50000,
    units: 5,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "TXN002",
    type: "buy",
    product: "FD",
    name: "HDFC Bank FD",
    amount: 100000,
    units: 1,
    date: "2024-01-10",
    status: "completed",
  },
  {
    id: "TXN003",
    type: "credit",
    product: "Bond",
    name: "NHAI Bond Coupon",
    amount: 3750,
    units: null,
    date: "2024-01-05",
    status: "completed",
  },
  {
    id: "TXN004",
    type: "buy",
    product: "IPO",
    name: "TechCorp Ltd IPO",
    amount: 14850,
    units: 1,
    date: "2024-01-02",
    status: "pending",
  },
  {
    id: "TXN005",
    type: "credit",
    product: "FD",
    name: "SBI FD Interest",
    amount: 2500,
    units: null,
    date: "2023-12-28",
    status: "completed",
  },
  {
    id: "TXN006",
    type: "buy",
    product: "NPS",
    name: "NPS Contribution",
    amount: 25000,
    units: null,
    date: "2023-12-20",
    status: "completed",
  },
  {
    id: "TXN007",
    type: "sell",
    product: "Bond",
    name: "IRFC Bond",
    amount: 25000,
    units: 2,
    date: "2023-12-15",
    status: "completed",
  },
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

  const totalInvested = transactions
    .filter((t) => t.type === "buy")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const getProductIcon = (product: string) => {
    switch (product) {
      case "Bond":
        return <Banknote className="w-4 h-4" />;
      case "FD":
        return <PiggyBank className="w-4 h-4" />;
      case "IPO":
        return <TrendingUp className="w-4 h-4" />;
      case "NPS":
        return <Building2 className="w-4 h-4" />;
      default:
        return <Banknote className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Transactions</h1>
          <p className="text-muted">View and manage all your transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">Total Invested</p>
                <p className="text-xl font-bold text-secondary">
                  ₹{totalInvested.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Credits Received</p>
                <p className="text-xl font-bold text-secondary">
                  ₹{totalCredits.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="finease-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Total Transactions</p>
                <p className="text-xl font-bold text-secondary">
                  {transactions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
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
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      txn.type === "buy"
                        ? "bg-blue-100"
                        : txn.type === "sell"
                        ? "bg-orange-100"
                        : "bg-green-100"
                    }`}
                  >
                    {txn.type === "buy" ? (
                      <ArrowUpRight
                        className={`w-5 h-5 ${
                          txn.type === "buy" ? "text-blue-600" : "text-orange-600"
                        }`}
                      />
                    ) : txn.type === "sell" ? (
                      <ArrowDownLeft className="w-5 h-5 text-orange-600" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-secondary">{txn.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {getProductIcon(txn.product)}
                        <span className="ml-1">{txn.product}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted">
                      {txn.id} • {new Date(txn.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      txn.type === "credit" || txn.type === "sell"
                        ? "text-green-600"
                        : "text-secondary"
                    }`}
                  >
                    {txn.type === "credit" || txn.type === "sell" ? "+" : "-"}₹
                    {txn.amount.toLocaleString()}
                  </p>
                  <Badge
                    variant={txn.status === "completed" ? "default" : "secondary"}
                    className={`text-xs ${
                      txn.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTransactions;
