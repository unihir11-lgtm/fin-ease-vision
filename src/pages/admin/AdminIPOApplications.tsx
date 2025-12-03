import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Download, Eye, CheckCircle, XCircle, Clock,
  Filter, FileText, User, Calendar, IndianRupee
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

const mockApplications = [
  { id: "APP001", user: "Rahul Sharma", ipo: "Swiggy IPO", amount: 150000, lots: 10, date: "2024-11-15", status: "Approved", category: "Retail" },
  { id: "APP002", user: "Priya Patel", ipo: "Swiggy IPO", amount: 225000, lots: 15, date: "2024-11-15", status: "Pending", category: "Retail" },
  { id: "APP003", user: "Amit Kumar", ipo: "MobiKwik IPO", amount: 450000, lots: 30, date: "2024-11-14", status: "Rejected", category: "HNI" },
  { id: "APP004", user: "Sneha Reddy", ipo: "Afcons Infrastructure", amount: 75000, lots: 5, date: "2024-11-14", status: "Approved", category: "Retail" },
  { id: "APP005", user: "Vikram Singh", ipo: "Swiggy IPO", amount: 300000, lots: 20, date: "2024-11-13", status: "Pending", category: "Retail" },
  { id: "APP006", user: "Kavita Gupta", ipo: "MobiKwik IPO", amount: 600000, lots: 40, date: "2024-11-13", status: "Approved", category: "HNI" },
];

const stats = [
  { label: "Total Applications", value: "1,234", icon: FileText, color: "bg-blue-100 text-blue-600" },
  { label: "Approved", value: "856", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Pending", value: "234", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Rejected", value: "144", icon: XCircle, color: "bg-red-100 text-red-600" },
];

const AdminIPOApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch = app.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.ipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">IPO Applications</h1>
          <p className="text-gray-500">Manage and review IPO applications</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
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
                placeholder="Search by user, IPO name, or application ID..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Application ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IPO Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Lots</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm font-medium">{app.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      {app.user}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{app.ipo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={app.category === "HNI" ? "border-purple-300 text-purple-700" : ""}>
                      {app.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{app.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{app.lots}</TableCell>
                  <TableCell className="text-gray-500">{app.date}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
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

      {filteredApplications.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No applications found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminIPOApplications;