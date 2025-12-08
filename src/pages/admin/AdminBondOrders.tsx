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
  Filter, Landmark, User, FileText, AlertCircle,
  IndianRupee, TrendingUp, ArrowUpRight, RefreshCw,
  Calendar, BarChart3, Percent, Shield, Users, Mail, Phone
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

const mockOrders = [
  { id: "BO001", user: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", bond: "MoneyBoxx March'27", isin: "INE0DXQ07017", units: 50, amount: 50000, date: "2024-11-15", status: "Completed", yield: "12.5%", kycStatus: "Verified", rating: "AA-", paymentMethod: "UPI" },
  { id: "BO002", user: "Priya Patel", email: "priya@email.com", phone: "+91 98765 43211", bond: "REC Limited", isin: "INE020B07HM8", units: 10, amount: 100000, date: "2024-11-15", status: "Pending", yield: "7.85%", kycStatus: "Verified", rating: "AAA", paymentMethod: "Net Banking" },
  { id: "BO003", user: "Amit Kumar", email: "amit@email.com", phone: "+91 98765 43212", bond: "NHAI", isin: "INE906B07GP7", units: 75, amount: 75000, date: "2024-11-14", status: "Completed", yield: "7.35%", kycStatus: "Verified", rating: "AAA", paymentMethod: "UPI" },
  { id: "BO004", user: "Sneha Reddy", email: "sneha@email.com", phone: "+91 98765 43213", bond: "Indel Money Aug'26", isin: "INE0F3407018", units: 30, amount: 30000, date: "2024-11-14", status: "Failed", yield: "12.8%", kycStatus: "Pending", rating: "BBB+", paymentMethod: "Net Banking" },
  { id: "BO005", user: "Vikram Singh", email: "vikram@email.com", phone: "+91 98765 43214", bond: "IRFC", isin: "INE053F07AE8", units: 100, amount: 100000, date: "2024-11-13", status: "Completed", yield: "7.65%", kycStatus: "Verified", rating: "AAA", paymentMethod: "UPI" },
  { id: "BO006", user: "Kavita Gupta", email: "kavita@email.com", phone: "+91 98765 43215", bond: "Varthana Aug'27", isin: "INE0H5G07012", units: 40, amount: 40000, date: "2024-11-13", status: "Pending", yield: "12.5%", kycStatus: "Verified", rating: "AA", paymentMethod: "Net Banking" },
  { id: "BO007", user: "Deepak Mehra", email: "deepak@email.com", phone: "+91 98765 43216", bond: "PFC Limited", isin: "INE134E08KN9", units: 200, amount: 200000, date: "2024-11-12", status: "Completed", yield: "7.45%", kycStatus: "Verified", rating: "AAA", paymentMethod: "UPI" },
  { id: "BO008", user: "Neha Joshi", email: "neha@email.com", phone: "+91 98765 43217", bond: "Axis Bank AT1", isin: "INE238A08AB1", units: 25, amount: 250000, date: "2024-11-12", status: "Processing", yield: "9.25%", kycStatus: "Verified", rating: "AA+", paymentMethod: "Net Banking" },
];

const redemptionRequests = [
  { id: "RD001", orderId: "BO001", user: "Rahul Sharma", email: "rahul@email.com", bond: "MoneyBoxx March'27", units: 25, currentValue: 26500, purchaseValue: 25000, requestDate: "2024-11-20", reason: "Profit Booking", status: "Pending", settlementDays: 2 },
  { id: "RD002", orderId: "BO003", user: "Amit Kumar", email: "amit@email.com", bond: "NHAI", units: 50, currentValue: 52000, purchaseValue: 50000, requestDate: "2024-11-18", reason: "Liquidity", status: "Approved", settlementDays: 2 },
  { id: "RD003", orderId: "BO005", user: "Vikram Singh", email: "vikram@email.com", bond: "IRFC", units: 30, currentValue: 31500, purchaseValue: 30000, requestDate: "2024-11-15", reason: "Rebalancing", status: "Rejected", settlementDays: 0 },
  { id: "RD004", orderId: "BO007", user: "Deepak Mehra", email: "deepak@email.com", bond: "PFC Limited", units: 100, currentValue: 103000, purchaseValue: 100000, requestDate: "2024-11-14", reason: "Partial Exit", status: "Pending", settlementDays: 2 },
];

const stats = [
  { label: "Total Orders", value: "2,456", change: "+15.2%", icon: Landmark, color: "bg-blue-100 text-blue-600", bgGlow: "from-blue-500/20" },
  { label: "Completed", value: "2,102", change: "+12.8%", icon: CheckCircle, color: "bg-green-100 text-green-600", bgGlow: "from-green-500/20" },
  { label: "Pending Approval", value: "298", change: "-3.5%", icon: Clock, color: "bg-amber-100 text-amber-600", bgGlow: "from-amber-500/20" },
  { label: "Total Value", value: "₹85 Cr", change: "+22.4%", icon: IndianRupee, color: "bg-purple-100 text-purple-600", bgGlow: "from-purple-500/20" },
  { label: "Avg Yield", value: "9.45%", change: "+0.35%", icon: Percent, color: "bg-teal-100 text-teal-600", bgGlow: "from-teal-500/20" },
  { label: "Redemption Queue", value: "12", change: "-2", icon: RefreshCw, color: "bg-rose-100 text-rose-600", bgGlow: "from-rose-500/20" },
];

const AdminBondOrders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRedemptionDialog, setShowRedemptionDialog] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.bond.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.isin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    const matchesRating = ratingFilter === "all" || order.rating.includes(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      case "Failed":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>;
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Processing</Badge>;
      case "Approved":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (order: any) => {
    toast({
      title: "Bond Order Approved",
      description: `Order ${order.id} for ${order.user} has been approved successfully.`,
    });
    setShowApprovalDialog(false);
  };

  const handleReject = (order: any) => {
    toast({
      title: "Bond Order Rejected",
      description: `Order ${order.id} has been rejected with reason: ${rejectionReason || 'Not specified'}`,
      variant: "destructive",
    });
    setShowApprovalDialog(false);
    setRejectionReason("");
  };

  const handleRedemptionApprove = (redemption: any) => {
    toast({
      title: "Redemption Approved",
      description: `Redemption request ${redemption.id} has been approved. Settlement in T+${redemption.settlementDays}.`,
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

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/80 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <svg className="absolute right-0 top-0 h-full w-1/3 text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" points="50,0 100,0 100,100 0,100" />
        </svg>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <Landmark className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">Bond Orders Management</h1>
              <p className="text-white/70">Approve, track, and manage all bond purchase orders and redemptions</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="w-4 h-4" /> Export Orders
            </Button>
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <FileText className="w-4 h-4" /> Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="relative overflow-hidden hover:shadow-lg transition-shadow group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs flex items-center gap-0.5 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                  <ArrowUpRight className={`w-3 h-3 ${!stat.change.startsWith('+') && 'rotate-180'}`} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="orders">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="redemptions">Redemption Requests</TabsTrigger>
        </TabsList>

        {/* All Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by user, bond, ISIN, or order ID..."
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
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Bond</TableHead>
                    <TableHead className="text-center">Units</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-center">Yield</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{order.user}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.bond}</p>
                          <p className="text-xs text-muted-foreground">{order.isin}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium">{order.units}</TableCell>
                      <TableCell className="text-right font-bold">₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {order.yield}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={order.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                          {order.kycStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {order.status === "Pending" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-green-600"
                                onClick={() => { setSelectedOrder(order); setShowApprovalDialog(true); }}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-red-600"
                                onClick={() => { setSelectedOrder(order); setShowApprovalDialog(true); }}
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
                Pending Bond Purchase Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.filter(o => o.status === "Pending").map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-secondary">{order.user}</p>
                          <Badge variant="outline" className="text-xs">{order.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.bond} • {order.units} units • ₹{order.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={order.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                            KYC: {order.kycStatus}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{order.yield} yield</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => { setSelectedOrder(order); setShowApprovalDialog(true); }}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Review
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(order)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => { setSelectedOrder(order); setShowApprovalDialog(true); }}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
                {mockOrders.filter(o => o.status === "Pending").length === 0 && (
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
                Bond Sale/Redemption Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Bond</TableHead>
                    <TableHead className="text-center">Units</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests.map((redemption) => (
                    <TableRow key={redemption.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">{redemption.id}</TableCell>
                      <TableCell className="font-medium">{redemption.user}</TableCell>
                      <TableCell>{redemption.bond}</TableCell>
                      <TableCell className="text-center">{redemption.units}</TableCell>
                      <TableCell className="text-right font-bold">₹{redemption.currentValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{redemption.reason}</Badge>
                      </TableCell>
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
            <DialogTitle>Review Bond Order</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User:</span>
                  <span className="font-medium">{selectedOrder.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bond:</span>
                  <span className="font-medium">{selectedOrder.bond}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISIN:</span>
                  <span className="font-medium text-xs">{selectedOrder.isin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Units:</span>
                  <span className="font-medium">{selectedOrder.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold">₹{selectedOrder.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yield:</span>
                  <span className="font-medium text-green-600">{selectedOrder.yield}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">KYC Status:</span>
                  <Badge className={selectedOrder.kycStatus === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                    {selectedOrder.kycStatus}
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
            <Button variant="destructive" onClick={() => handleReject(selectedOrder)}>Reject</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedOrder)}>Approve</Button>
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
                  <span className="text-muted-foreground">Bond:</span>
                  <span className="font-medium">{selectedRedemption.bond}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Units:</span>
                  <span className="font-medium">{selectedRedemption.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Value:</span>
                  <span className="font-bold">₹{selectedRedemption.currentValue.toLocaleString()}</span>
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

export default AdminBondOrders;