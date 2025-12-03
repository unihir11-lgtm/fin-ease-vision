import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Download, Eye, CheckCircle, Clock, XCircle,
  Filter, PiggyBank, User, Calendar
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

const mockBookings = [
  { id: "FD001", user: "Rahul Sharma", provider: "Bajaj Finance", principal: 500000, rate: "9.1%", tenure: "2 Years", date: "2024-11-15", maturity: "2026-11-15", status: "Active" },
  { id: "FD002", user: "Priya Patel", provider: "Shriram Finance", principal: 300000, rate: "8.75%", tenure: "3 Years", date: "2024-11-14", maturity: "2027-11-14", status: "Active" },
  { id: "FD003", user: "Amit Kumar", provider: "HDFC Bank", principal: 200000, rate: "7.25%", tenure: "1 Year", date: "2024-11-13", maturity: "2025-11-13", status: "Processing" },
  { id: "FD004", user: "Sneha Reddy", provider: "Mahindra Finance", principal: 150000, rate: "8.35%", tenure: "5 Years", date: "2024-11-12", maturity: "2029-11-12", status: "Active" },
  { id: "FD005", user: "Vikram Singh", provider: "SBI", principal: 100000, rate: "6.8%", tenure: "1 Year", date: "2024-11-11", maturity: "2025-11-11", status: "Matured" },
  { id: "FD006", user: "Kavita Gupta", provider: "Utkarsh Small Finance", principal: 400000, rate: "8.1%", tenure: "2 Years", date: "2024-11-10", maturity: "2026-11-10", status: "Active" },
];

const stats = [
  { label: "Total Bookings", value: "1,892", icon: PiggyBank, color: "bg-blue-100 text-blue-600" },
  { label: "Active FDs", value: "1,456", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Processing", value: "234", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Matured", value: "202", icon: Calendar, color: "bg-purple-100 text-purple-600" },
];

const AdminFDBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "Processing":
        return <Badge className="bg-amber-100 text-amber-700">Processing</Badge>;
      case "Matured":
        return <Badge className="bg-purple-100 text-purple-700">Matured</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">FD Bookings</h1>
          <p className="text-gray-500">Track and manage Fixed Deposit bookings</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Bookings
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
                placeholder="Search by user, provider, or booking ID..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="matured">Matured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Booking ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Principal</TableHead>
                <TableHead className="text-center">Rate</TableHead>
                <TableHead>Tenure</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      {booking.user}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{booking.provider}</TableCell>
                  <TableCell className="text-right font-medium">₹{booking.principal.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {booking.rate}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.tenure}</TableCell>
                  <TableCell className="text-gray-500">{booking.maturity}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
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

      {filteredBookings.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="p-12 text-center">
            <PiggyBank className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminFDBookings;