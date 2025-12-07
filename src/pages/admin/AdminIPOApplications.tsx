import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, Eye, CheckCircle, XCircle, Clock,
  Filter, FileText, User, Calendar, IndianRupee, RefreshCw,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Send, Ban,
  AlertTriangle, TrendingUp, Users, Target, Percent, Building2
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const mockApplications = [
  { id: "APP001", user: "Rahul Sharma", email: "rahul@email.com", pan: "ABCDE1234F", ipo: "Swiggy IPO", amount: 150000, lots: 10, bidPrice: 390, date: "2024-11-15", status: "Approved", category: "Retail", upiId: "rahul@upi" },
  { id: "APP002", user: "Priya Patel", email: "priya@email.com", pan: "FGHIJ5678K", ipo: "Swiggy IPO", amount: 225000, lots: 15, bidPrice: 390, date: "2024-11-15", status: "Pending", category: "Retail", upiId: "priya@okaxis" },
  { id: "APP003", user: "Amit Kumar", email: "amit@email.com", pan: "LMNOP9012Q", ipo: "MobiKwik IPO", amount: 450000, lots: 30, bidPrice: 279, date: "2024-11-14", status: "Rejected", category: "HNI", upiId: "amit@icici" },
  { id: "APP004", user: "Sneha Reddy", email: "sneha@email.com", pan: "RSTUV3456W", ipo: "Afcons Infrastructure", amount: 75000, lots: 5, bidPrice: 463, date: "2024-11-14", status: "Approved", category: "Retail", upiId: "sneha@ybl" },
  { id: "APP005", user: "Vikram Singh", email: "vikram@email.com", pan: "XYZAB7890C", ipo: "Swiggy IPO", amount: 300000, lots: 20, bidPrice: 390, date: "2024-11-13", status: "Pending", category: "Retail", upiId: "vikram@paytm" },
  { id: "APP006", user: "Kavita Gupta", email: "kavita@email.com", pan: "DEFGH1234I", ipo: "MobiKwik IPO", amount: 600000, lots: 40, bidPrice: 279, date: "2024-11-13", status: "Approved", category: "HNI", upiId: "kavita@sbi" },
  { id: "APP007", user: "Rajesh Verma", email: "rajesh@email.com", pan: "JKLMN5678O", ipo: "NTPC Green Energy", amount: 180000, lots: 12, bidPrice: 108, date: "2024-11-12", status: "Allotted", category: "Retail", upiId: "rajesh@hdfc" },
  { id: "APP008", user: "Meera Iyer", email: "meera@email.com", pan: "PQRST9012U", ipo: "Zinka Logistics", amount: 90000, lots: 6, bidPrice: 273, date: "2024-11-12", status: "Not Allotted", category: "Retail", upiId: "meera@kotak" },
];

const stats = [
  { label: "Total Applications", value: "12,456", change: "+18.5%", positive: true, icon: FileText, color: "bg-primary/10 text-primary" },
  { label: "Approved", value: "8,567", change: "+12.3%", positive: true, icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Pending Review", value: "2,345", change: "-8.2%", positive: true, icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Rejected", value: "1,544", change: "+2.1%", positive: false, icon: XCircle, color: "bg-red-100 text-red-600" },
  { label: "Total Amount", value: "₹185 Cr", change: "+24.8%", positive: true, icon: IndianRupee, color: "bg-blue-100 text-blue-600" },
  { label: "Allotment Rate", value: "68.5%", change: "+5.2%", positive: true, icon: Target, color: "bg-purple-100 text-purple-600" },
];

const AdminIPOApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ipoFilter, setIpoFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch = app.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.ipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.pan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || app.category === categoryFilter;
    const matchesIPO = ipoFilter === "all" || app.ipo === ipoFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesIPO;
  });

  const uniqueIPOs = [...new Set(mockApplications.map(app => app.ipo))];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Approved": "bg-green-100 text-green-700 border-green-200",
      "Pending": "bg-amber-100 text-amber-700 border-amber-200",
      "Rejected": "bg-red-100 text-red-700 border-red-200",
      "Allotted": "bg-blue-100 text-blue-700 border-blue-200",
      "Not Allotted": "bg-gray-100 text-gray-700 border-gray-200",
    };
    return <Badge className={styles[status] || "bg-gray-100 text-gray-700"}>{status}</Badge>;
  };

  const handleApprove = (app: any) => {
    toast({ title: "Application Approved", description: `${app.user}'s application for ${app.ipo} has been approved.` });
  };

  const handleReject = (app: any) => {
    toast({ title: "Application Rejected", description: `${app.user}'s application has been rejected.`, variant: "destructive" });
  };

  const handleResendNotification = (app: any) => {
    toast({ title: "Notification Sent", description: `Status notification sent to ${app.user}.` });
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
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">IPO Applications</h1>
              <p className="text-white/70">Review, approve, and manage all IPO applications</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCw className="w-4 h-4" /> Sync
            </Button>
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, IPO name, ID, or PAN..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={ipoFilter} onValueChange={setIpoFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All IPOs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All IPOs</SelectItem>
                  {uniqueIPOs.map(ipo => (
                    <SelectItem key={ipo} value={ipo}>{ipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="HNI">HNI</SelectItem>
                  <SelectItem value="QIB">QIB</SelectItem>
                </SelectContent>
              </Select>
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-secondary">{filteredApplications.length}</span> applications
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" disabled>
            <CheckCircle className="w-4 h-4" /> Bulk Approve
          </Button>
          <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700" disabled>
            <XCircle className="w-4 h-4" /> Bulk Reject
          </Button>
        </div>
      </div>

      {/* Applications Table */}
      <Card className="finease-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-[50px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
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
                <TableRow key={app.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium text-primary">{app.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{app.user}</p>
                        <p className="text-xs text-muted-foreground">{app.pan}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="font-medium">{app.ipo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={app.category === "HNI" ? "border-purple-300 text-purple-700" : app.category === "QIB" ? "border-blue-300 text-blue-700" : ""}>
                      {app.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold text-secondary">₹{app.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{app.lots}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{app.date}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { setSelectedApplication(app); setIsViewModalOpen(true); }}>
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        {app.status === "Pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(app)} className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(app)} className="text-red-600">
                              <XCircle className="w-4 h-4 mr-2" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem onClick={() => handleResendNotification(app)}>
                          <Send className="w-4 h-4 mr-2" /> Resend Notification
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Application Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Application Details - {selectedApplication?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6 py-4">
              {/* Applicant Info */}
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" /> Applicant Information
                </h4>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedApplication.user}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">PAN</p>
                    <p className="font-mono font-medium">{selectedApplication.pan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">UPI ID</p>
                    <p className="font-medium">{selectedApplication.upiId}</p>
                  </div>
                </div>
              </div>

              {/* IPO Details */}
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> IPO Details
                </h4>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">IPO Name</p>
                    <p className="font-medium">{selectedApplication.ipo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <Badge variant="outline">{selectedApplication.category}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bid Price</p>
                    <p className="font-medium">₹{selectedApplication.bidPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lots Applied</p>
                    <p className="font-medium">{selectedApplication.lots}</p>
                  </div>
                </div>
              </div>

              {/* Amount & Status */}
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" /> Amount & Status
                </h4>
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="text-xl font-bold text-primary">₹{selectedApplication.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Application Date</p>
                    <p className="font-medium">{selectedApplication.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedApplication.status === "Pending" && (
                  <>
                    <Button className="gap-2" onClick={() => { handleApprove(selectedApplication); setIsViewModalOpen(false); }}>
                      <CheckCircle className="w-4 h-4" /> Approve Application
                    </Button>
                    <Button variant="destructive" className="gap-2" onClick={() => { handleReject(selectedApplication); setIsViewModalOpen(false); }}>
                      <XCircle className="w-4 h-4" /> Reject Application
                    </Button>
                  </>
                )}
                <Button variant="outline" className="gap-2" onClick={() => handleResendNotification(selectedApplication)}>
                  <Send className="w-4 h-4" /> Send Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredApplications.length === 0 && (
        <Card className="finease-card">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No applications found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminIPOApplications;