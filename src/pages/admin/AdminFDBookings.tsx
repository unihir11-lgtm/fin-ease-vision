import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Download, Eye, CheckCircle, Clock, XCircle,
  Filter, PiggyBank, User, Calendar, FileText, AlertCircle,
  IndianRupee, TrendingUp, ArrowUpRight, RefreshCw
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const mockBookings = [
  { id: "FD001", user: "Rahul Sharma", email: "rahul@email.com", provider: "Bajaj Finance", principal: 500000, rate: "9.1%", tenure: "2 Years", date: "2024-11-15", maturity: "2026-11-15", status: "Active", kycStatus: "Verified", payoutType: "Quarterly" },
  { id: "FD002", user: "Priya Patel", email: "priya@email.com", provider: "Shriram Finance", principal: 300000, rate: "8.75%", tenure: "3 Years", date: "2024-11-14", maturity: "2027-11-14", status: "Active", kycStatus: "Verified", payoutType: "Cumulative" },
  { id: "FD003", user: "Amit Kumar", email: "amit@email.com", provider: "HDFC Bank", principal: 200000, rate: "7.25%", tenure: "1 Year", date: "2024-11-13", maturity: "2025-11-13", status: "Pending", kycStatus: "Pending", payoutType: "Monthly" },
  { id: "FD004", user: "Sneha Reddy", email: "sneha@email.com", provider: "Mahindra Finance", principal: 150000, rate: "8.35%", tenure: "5 Years", date: "2024-11-12", maturity: "2029-11-12", status: "Active", kycStatus: "Verified", payoutType: "Annually" },
  { id: "FD005", user: "Vikram Singh", email: "vikram@email.com", provider: "SBI", principal: 100000, rate: "6.8%", tenure: "1 Year", date: "2024-11-11", maturity: "2025-11-11", status: "Matured", kycStatus: "Verified", payoutType: "Cumulative" },
  { id: "FD006", user: "Kavita Gupta", email: "kavita@email.com", provider: "Utkarsh Small Finance", principal: 400000, rate: "8.1%", tenure: "2 Years", date: "2024-11-10", maturity: "2026-11-10", status: "Active", kycStatus: "Verified", payoutType: "Quarterly" },
];

const redemptionRequests = [
  { id: "RD001", bookingId: "FD001", user: "Rahul Sharma", provider: "Bajaj Finance", principal: 500000, requestDate: "2024-11-20", reason: "Emergency", status: "Pending", penalty: 5000 },
  { id: "RD002", bookingId: "FD004", user: "Sneha Reddy", provider: "Mahindra Finance", principal: 150000, requestDate: "2024-11-18", reason: "Better Investment", status: "Approved", penalty: 1500 },
  { id: "RD003", bookingId: "FD002", user: "Priya Patel", provider: "Shriram Finance", principal: 300000, requestDate: "2024-11-15", reason: "Personal", status: "Rejected", penalty: 0 },
];

const stats = [
  { label: "Total Bookings", value: "1,892", change: "+12.5%", icon: PiggyBank, color: "bg-blue-100 text-blue-600" },
  { label: "Active FDs", value: "1,456", change: "+8.2%", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Pending Approval", value: "234", change: "-5.1%", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Total Value", value: "₹240 Cr", change: "+18.7%", icon: IndianRupee, color: "bg-purple-100 text-purple-600" },
];

const AdminFDBookings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

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
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "Matured":
        return <Badge className="bg-purple-100 text-purple-700">Matured</Badge>;
      case "Approved":
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (booking: any) => {
    toast({
      title: "FD Booking Approved",
      description: `FD booking ${booking.id} for ${booking.user} has been approved.`,
    });
    setShowApprovalDialog(false);
  };

  const handleReject = (booking: any) => {
    toast({
      title: "FD Booking Rejected",
      description: `FD booking ${booking.id} has been rejected.`,
      variant: "destructive",
    });
    setShowApprovalDialog(false);
    setRejectionReason("");
  };

  const handleRedemptionApprove = (redemption: any) => {
    toast({
      title: "Redemption Approved",
      description: `Redemption request ${redemption.id} has been approved.`,
    });
    setShowRedemptionDialog(false);
  };

  const handleRedemptionReject = (redemption: any) => {
    toast({
      title: "Redemption Rejected",
      description: `Redemption request ${redemption.id} has been rejected.`,
      variant: "destructive",
    });
    setShowRedemptionDialog(false);
    setRejectionReason("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">FD Bookings Management</h1>
          <p className="text-muted-foreground">Approve, track, and manage Fixed Deposit bookings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" /> Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-green-600 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="redemptions">Redemption Requests</TabsTrigger>
        </TabsList>

        {/* All Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, provider, or booking ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="matured">Matured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Booking ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead className="text-center">Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Payout</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{booking.user}</p>
                            <p className="text-xs text-muted-foreground">{booking.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{booking.provider}</TableCell>
                      <TableCell className="text-right font-bold">₹{booking.principal.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {booking.rate}
                        </Badge>
                      </TableCell>
                      <TableCell>{booking.tenure}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{booking.payoutType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={booking.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                          {booking.kycStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {booking.status === "Pending" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-green-600"
                                onClick={() => { setSelectedBooking(booking); setShowApprovalDialog(true); }}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600"
                                onClick={() => { setSelectedBooking(booking); setShowApprovalDialog(true); }}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Approval Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Pending Investment Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.filter(b => b.status === "Pending").map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                        <PiggyBank className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-secondary">{booking.user}</p>
                          <Badge variant="outline" className="text-xs">{booking.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.provider} • ₹{booking.principal.toLocaleString()} • {booking.tenure}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={booking.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            KYC: {booking.kycStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => { setSelectedBooking(booking); setShowApprovalDialog(true); }}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(booking)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => { setSelectedBooking(booking); setShowApprovalDialog(true); }}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {mockBookings.filter(b => b.status === "Pending").length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                    <p className="text-muted-foreground">No pending approvals</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Redemption Requests Tab */}
        <TabsContent value="redemptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Redemption Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>FD Provider</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Penalty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests.map((redemption) => (
                    <TableRow key={redemption.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">{redemption.id}</TableCell>
                      <TableCell className="font-medium">{redemption.user}</TableCell>
                      <TableCell>{redemption.provider}</TableCell>
                      <TableCell className="text-right font-bold">₹{redemption.principal.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{redemption.reason}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-red-600">₹{redemption.penalty.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(redemption.status)}</TableCell>
                      <TableCell className="text-right">
                        {redemption.status === "Pending" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleRedemptionApprove(redemption)}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => { setSelectedRedemption(redemption); setShowRedemptionDialog(true); }}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {redemption.status !== "Pending" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review FD Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID:</span>
                  <span className="font-medium">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User:</span>
                  <span className="font-medium">{selectedBooking.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span className="font-medium">{selectedBooking.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal:</span>
                  <span className="font-bold">₹{selectedBooking.principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium text-green-600">{selectedBooking.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">KYC Status:</span>
                  <Badge className={selectedBooking.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                    {selectedBooking.kycStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rejection Reason (if rejecting)</Label>
                <Textarea 
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleReject(selectedBooking)}>Reject</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedBooking)}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Redemption Dialog */}
      <Dialog open={showRedemptionDialog} onOpenChange={setShowRedemptionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Redemption Request</DialogTitle>
          </DialogHeader>
          {selectedRedemption && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Request ID:</span>
                  <span className="font-medium">{selectedRedemption.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User:</span>
                  <span className="font-medium">{selectedRedemption.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal:</span>
                  <span className="font-bold">₹{selectedRedemption.principal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Rejection Reason</Label>
                <Textarea 
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRedemptionDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleRedemptionReject(selectedRedemption)}>Reject Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFDBookings;