import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Download, Eye, CheckCircle, Clock, XCircle,
  Filter, Landmark, User
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockOrders = [
  { id: "BO001", user: "Rahul Sharma", bond: "MoneyBoxx March'27", units: 50, amount: 50000, date: "2024-11-15", status: "Completed", yield: "12.5%" },
  { id: "BO002", user: "Priya Patel", bond: "REC Limited", units: 100, amount: 100000, date: "2024-11-15", status: "Processing", yield: "7.85%" },
  { id: "BO003", user: "Amit Kumar", bond: "NHAI", units: 75, amount: 75000, date: "2024-11-14", status: "Completed", yield: "7.35%" },
  { id: "BO004", user: "Sneha Reddy", bond: "Indel Money Aug'26", units: 30, amount: 30000, date: "2024-11-14", status: "Failed", yield: "12.8%" },
  { id: "BO005", user: "Vikram Singh", bond: "IRFC", units: 200, amount: 200000, date: "2024-11-13", status: "Completed", yield: "7.65%" },
  { id: "BO006", user: "Kavita Gupta", bond: "Varthana Aug'27", units: 40, amount: 40000, date: "2024-11-13", status: "Processing", yield: "12.5%" },
];

const stats = [
  { label: "Total Orders", value: "2,456", icon: Landmark, color: "bg-blue-100 text-blue-600" },
  { label: "Completed", value: "2,102", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Processing", value: "298", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Failed", value: "56", icon: XCircle, color: "bg-red-100 text-red-600" },
];

const AdminBondOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.bond.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "Processing":
        return <Badge className="bg-amber-100 text-amber-700">Processing</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Bond Orders</h1>
          <p className="text-gray-500">Track and manage bond purchase orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by user, bond name, or order ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Bond</TableHead>
                <TableHead className="text-center">Units</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Yield</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      {order.user}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{order.bond}</TableCell>
                  <TableCell className="text-center">{order.units}</TableCell>
                  <TableCell className="text-right font-medium">₹{order.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {order.yield}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{order.date}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
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

      {filteredOrders.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="p-12 text-center">
            <Landmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBondOrders;