import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Plus, Edit, Trash2, Eye, TrendingUp, 
  Calendar, Users, Filter, Download, MoreVertical,
  CheckCircle, Clock, XCircle
} from "lucide-react";
import { ipoData } from "@/data/ipoData";
import { toast } from "@/hooks/use-toast";

const AdminIPOManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredIPOs = ipoData.filter((ipo) => {
    const matchesSearch = ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ipo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total IPOs", value: ipoData.length, icon: TrendingUp, color: "bg-primary/10 text-primary" },
    { label: "Open", value: ipoData.filter(i => i.status === "Open").length, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Upcoming", value: ipoData.filter(i => i.status === "Upcoming").length, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Closed", value: ipoData.filter(i => i.status === "Closed").length, icon: XCircle, color: "bg-red-100 text-red-600" },
  ];

  const handleDelete = (id: string) => {
    toast({ title: "IPO Deleted", description: "The IPO has been removed successfully." });
  };

  const handleAddIPO = () => {
    toast({ title: "IPO Added", description: "New IPO has been added successfully." });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">IPO Management</h1>
          <p className="text-muted-foreground">Manage all Initial Public Offerings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add New IPO
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New IPO</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Name</Label>
                    <Input placeholder="Enter short name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>IPO Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Main Board">Main Board</SelectItem>
                        <SelectItem value="SME">SME</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price Range (Min)</Label>
                    <Input type="number" placeholder="₹ Min price" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price Range (Max)</Label>
                    <Input type="number" placeholder="₹ Max price" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lot Size</Label>
                    <Input type="number" placeholder="Enter lot size" />
                  </div>
                  <div className="space-y-2">
                    <Label>Issue Size</Label>
                    <Input placeholder="e.g., ₹500 Cr" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bid Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bid End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>RHP Document Link</Label>
                  <Input placeholder="Enter document URL" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddIPO}>Add IPO</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
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
                placeholder="Search IPOs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Open">Open</TabsTrigger>
                <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="Closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* IPO Table */}
      <Card className="finease-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary/5">
                  <th className="text-left p-4 font-medium text-secondary">Company</th>
                  <th className="text-left p-4 font-medium text-secondary">Type</th>
                  <th className="text-left p-4 font-medium text-secondary">Price Range</th>
                  <th className="text-left p-4 font-medium text-secondary">Lot Size</th>
                  <th className="text-left p-4 font-medium text-secondary">Dates</th>
                  <th className="text-left p-4 font-medium text-secondary">Status</th>
                  <th className="text-right p-4 font-medium text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIPOs.map((ipo) => (
                  <tr key={ipo.id} className="border-b hover:bg-secondary/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-lg">
                          {ipo.logo}
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{ipo.companyShortName}</p>
                          <p className="text-xs text-muted-foreground">{ipo.companyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{ipo.type}</Badge>
                    </td>
                    <td className="p-4 font-medium">₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}</td>
                    <td className="p-4">{ipo.lotSize}</td>
                    <td className="p-4 text-sm">{ipo.bidDates.start} to {ipo.bidDates.end}</td>
                    <td className="p-4">
                      <Badge className={
                        ipo.status === "Open" ? "bg-green-100 text-green-700" :
                        ipo.status === "Upcoming" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }>
                        {ipo.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(ipo.id)}>
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
    </div>
  );
};

export default AdminIPOManagement;
