import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Search, Plus, Edit, Trash2, Eye, TrendingUp, 
  Calendar, Users, Download, RefreshCw, Settings,
  CheckCircle, Clock, XCircle, AlertTriangle, Copy,
  ExternalLink, FileText, IndianRupee, Target, BarChart3,
  ArrowUpRight, Building2, Percent, Layers
} from "lucide-react";
import { ipoData } from "@/data/ipoData";
import { toast } from "@/hooks/use-toast";

const AdminIPOManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedIPO, setSelectedIPO] = useState<any>(null);

  const filteredIPOs = ipoData.filter((ipo) => {
    const matchesSearch = ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ipo.companyShortName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ipo.status === statusFilter;
    const matchesType = typeFilter === "all" || ipo.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalIssueSize = ipoData.reduce((sum, ipo) => {
    const size = parseFloat(ipo.issueSize.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(size) ? 0 : size);
  }, 0);

  const stats = [
    { label: "Total IPOs", value: ipoData.length, icon: TrendingUp, color: "bg-primary/10 text-primary", change: "+3 this month" },
    { label: "Open Now", value: ipoData.filter(i => i.status === "Open").length, icon: CheckCircle, color: "bg-green-100 text-green-600", change: "Active subscriptions" },
    { label: "Upcoming", value: ipoData.filter(i => i.status === "Upcoming").length, icon: Clock, color: "bg-amber-100 text-amber-600", change: "Scheduled" },
    { label: "Closed/Listed", value: ipoData.filter(i => i.status === "Closed" || i.status === "Listed").length, icon: XCircle, color: "bg-blue-100 text-blue-600", change: "Completed" },
    { label: "Main Board", value: ipoData.filter(i => i.type === "Main Board").length, icon: Building2, color: "bg-purple-100 text-purple-600", change: "Large cap" },
    { label: "Total Issue Size", value: `₹${totalIssueSize.toFixed(0)} Cr`, icon: IndianRupee, color: "bg-teal-100 text-teal-600", change: "Combined value" },
  ];

  const handleDelete = (id: string, name: string) => {
    toast({ 
      title: "IPO Deleted", 
      description: `${name} has been removed successfully.`,
      variant: "destructive"
    });
  };

  const handleAddIPO = () => {
    toast({ title: "IPO Added", description: "New IPO has been added successfully." });
    setIsAddModalOpen(false);
  };

  const handleEditIPO = () => {
    toast({ title: "IPO Updated", description: `${selectedIPO?.companyShortName} has been updated successfully.` });
    setIsEditModalOpen(false);
  };

  const handleDuplicate = (ipo: any) => {
    toast({ title: "IPO Duplicated", description: `${ipo.companyShortName} has been duplicated as draft.` });
  };

  const handleRefreshData = () => {
    toast({ title: "Data Refreshed", description: "IPO data has been synced with the latest information." });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Open": "bg-green-100 text-green-700 border-green-200",
      "Upcoming": "bg-amber-100 text-amber-700 border-amber-200",
      "Closed": "bg-gray-100 text-gray-700 border-gray-200",
      "Listed": "bg-blue-100 text-blue-700 border-blue-200"
    };
    return <Badge className={styles[status] || "bg-gray-100 text-gray-700"}>{status}</Badge>;
  };

  const IPOFormFields = () => (
    <div className="space-y-6 py-4">
      {/* Basic Info */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4" /> Company Information
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name *</Label>
            <Input placeholder="Enter full company name" defaultValue={selectedIPO?.companyName} />
          </div>
          <div className="space-y-2">
            <Label>Short Name *</Label>
            <Input placeholder="Enter short/display name" defaultValue={selectedIPO?.companyShortName} />
          </div>
        </div>
      </div>

      {/* IPO Details */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> IPO Details
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>IPO Type *</Label>
            <Select defaultValue={selectedIPO?.type || "Main Board"}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Board">Main Board</SelectItem>
                <SelectItem value="SME">SME</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status *</Label>
            <Select defaultValue={selectedIPO?.status || "Upcoming"}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Listed">Listed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Issue Size *</Label>
            <Input placeholder="e.g., ₹500 Cr" defaultValue={selectedIPO?.issueSize} />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <IndianRupee className="w-4 h-4" /> Pricing Details
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Price Range (Min) *</Label>
            <Input type="number" placeholder="₹ Min price" defaultValue={selectedIPO?.priceRange?.min} />
          </div>
          <div className="space-y-2">
            <Label>Price Range (Max) *</Label>
            <Input type="number" placeholder="₹ Max price" defaultValue={selectedIPO?.priceRange?.max} />
          </div>
          <div className="space-y-2">
            <Label>Lot Size *</Label>
            <Input type="number" placeholder="Enter lot size" defaultValue={selectedIPO?.lotSize} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Minimum Investment</Label>
            <Input placeholder="Auto-calculated" disabled value={selectedIPO ? `₹${(selectedIPO.priceRange?.max * selectedIPO.lotSize).toLocaleString()}` : ""} />
          </div>
          <div className="space-y-2">
            <Label>Face Value</Label>
            <Input type="number" placeholder="₹ Face value" defaultValue="10" />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Important Dates
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bid Start Date *</Label>
            <Input type="date" defaultValue={selectedIPO?.bidDates?.start} />
          </div>
          <div className="space-y-2">
            <Label>Bid End Date *</Label>
            <Input type="date" defaultValue={selectedIPO?.bidDates?.end} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Allotment Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>Refund Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>Listing Date</Label>
            <Input type="date" />
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <Percent className="w-4 h-4" /> Subscription & Reservation
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>QIB Reservation (%)</Label>
            <Input type="number" placeholder="50" defaultValue="50" />
          </div>
          <div className="space-y-2">
            <Label>NII Reservation (%)</Label>
            <Input type="number" placeholder="15" defaultValue="15" />
          </div>
          <div className="space-y-2">
            <Label>Retail Reservation (%)</Label>
            <Input type="number" placeholder="35" defaultValue="35" />
          </div>
        </div>
      </div>

      {/* Documents & Links */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Documents & Links
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>RHP Document URL</Label>
            <Input placeholder="https://..." defaultValue={selectedIPO?.rhpLink} />
          </div>
          <div className="space-y-2">
            <Label>DRHP Document URL</Label>
            <Input placeholder="https://..." />
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label>Company Description</Label>
          <Textarea placeholder="Brief description of the company and its business..." rows={3} />
        </div>
      </div>

      {/* Settings */}
      <div>
        <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4" /> Settings
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Featured IPO</Label>
              <p className="text-xs text-muted-foreground">Show this IPO prominently on the listing page</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Applications</Label>
              <p className="text-xs text-muted-foreground">Allow users to apply for this IPO</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Show GMP Data</Label>
              <p className="text-xs text-muted-foreground">Display Grey Market Premium information</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );

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
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">IPO Management</h1>
              <p className="text-white/70">Create, edit, and manage all Initial Public Offerings</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={handleRefreshData}>
              <RefreshCw className="w-4 h-4" /> Sync Data
            </Button>
            <Button variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-white text-secondary hover:bg-white/90">
                  <Plus className="w-4 h-4" /> Add New IPO
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" /> Add New IPO
                  </DialogTitle>
                </DialogHeader>
                <IPOFormFields />
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={handleAddIPO}>Publish IPO</Button>
                </div>
              </DialogContent>
            </Dialog>
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
              </div>
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{stat.change}</p>
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
                placeholder="Search by company name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Main Board">Main Board</SelectItem>
                <SelectItem value="SME">SME</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Open">Open</TabsTrigger>
                <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="Closed">Closed</TabsTrigger>
                <TabsTrigger value="Listed">Listed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-secondary">{filteredIPOs.length}</span> of {ipoData.length} IPOs
        </p>
      </div>

      {/* IPO Table */}
      <Card className="finease-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary">Company</th>
                  <th className="text-left p-4 font-medium text-secondary">Type</th>
                  <th className="text-left p-4 font-medium text-secondary">Price Range</th>
                  <th className="text-left p-4 font-medium text-secondary">Lot Size</th>
                  <th className="text-left p-4 font-medium text-secondary">Issue Size</th>
                  <th className="text-left p-4 font-medium text-secondary">Bid Dates</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-right p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIPOs.map((ipo) => (
                  <tr key={ipo.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{ipo.companyShortName}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{ipo.companyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={ipo.type === "SME" ? "border-purple-200 text-purple-700" : ""}>
                        {ipo.type}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</td>
                    <td className="p-4">{ipo.lotSize} shares</td>
                    <td className="p-4 font-medium text-primary">{ipo.issueSize}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div>{ipo.bidDates.start}</div>
                      <div className="text-xs">to {ipo.bidDates.end}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(ipo.status)}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => { setSelectedIPO(ipo); setIsViewModalOpen(true); }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => { setSelectedIPO(ipo); setIsEditModalOpen(true); }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDuplicate(ipo)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-600" 
                          onClick={() => handleDelete(ipo.id, ipo.companyShortName)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              {selectedIPO?.companyShortName} - Details
            </DialogTitle>
          </DialogHeader>
          {selectedIPO && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Company Name</p>
                  <p className="font-medium">{selectedIPO.companyName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">IPO Type</p>
                  <Badge variant="outline">{selectedIPO.type}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Price Range</p>
                  <p className="font-medium">₹{selectedIPO.priceRange.min} - ₹{selectedIPO.priceRange.max}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Lot Size</p>
                  <p className="font-medium">{selectedIPO.lotSize} shares</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Issue Size</p>
                  <p className="font-medium text-primary">{selectedIPO.issueSize}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  {getStatusBadge(selectedIPO.status)}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Bid Start</p>
                  <p className="font-medium">{selectedIPO.bidDates.start}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Bid End</p>
                  <p className="font-medium">{selectedIPO.bidDates.end}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="gap-2" asChild>
                  <a href={selectedIPO.rhpLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" /> View RHP
                  </a>
                </Button>
                <Button className="gap-2" onClick={() => { setIsViewModalOpen(false); setIsEditModalOpen(true); }}>
                  <Edit className="w-4 h-4" /> Edit IPO
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Edit IPO - {selectedIPO?.companyShortName}
            </DialogTitle>
          </DialogHeader>
          <IPOFormFields />
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleEditIPO}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {filteredIPOs.length === 0 && (
        <Card className="finease-card">
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No IPOs found matching your criteria.</p>
            <Button className="mt-4 gap-2" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4" /> Add New IPO
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminIPOManagement;