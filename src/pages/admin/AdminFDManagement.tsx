import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Search, Plus, Edit, Trash2, Eye, PiggyBank, 
  Download, Shield, ChevronRight
} from "lucide-react";
import { fdProviders } from "@/data/fdData";
import { toast } from "@/hooks/use-toast";

const AdminFDManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredFDs = fdProviders.filter((fd) =>
    fd.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total FD Providers", value: fdProviders.length },
    { label: "Highest Rate", value: `${Math.max(...fdProviders.map(f => f.interestRate))}%` },
    { label: "DICGC Insured", value: fdProviders.length },
    { label: "Active Users", value: "5,234" },
  ];

  const handleDelete = (id: string) => {
    toast({ title: "FD Provider Deleted", description: "The FD provider has been removed." });
  };

  const handleAddFD = () => {
    toast({ title: "FD Provider Added", description: "New FD provider has been added." });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">FD Management</h1>
          <p className="text-muted-foreground">Manage Fixed Deposit providers and rates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add FD Provider
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New FD Provider</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bank/NBFC Name</Label>
                    <Input placeholder="Enter bank name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Provider Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank">Bank</SelectItem>
                        <SelectItem value="NBFC">NBFC</SelectItem>
                        <SelectItem value="Small Finance Bank">Small Finance Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 8.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Senior Citizen Rate (%)</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 9.0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Deposit (₹)</Label>
                    <Input type="number" placeholder="e.g., 5000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Tenure</Label>
                    <Input placeholder="e.g., 5 Years" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label>DICGC Insured</Label>
                    <p className="text-xs text-muted-foreground">Enable if deposits are insured up to ₹5 Lakh</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddFD}>Add FD Provider</Button>
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
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FD providers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* FD Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFDs.map((fd) => (
          <Card key={fd.id} className="finease-card hover:shadow-lg transition-all group">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {fd.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">{fd.bankName}</h3>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Shield className="w-3 h-3" />
                      DICGC Insured
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Interest Rate</p>
                    <p className="text-3xl font-bold text-primary">{fd.interestRate}%</p>
                    <p className="text-xs text-muted-foreground">per annum</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Sr. Citizen</p>
                    <p className="text-lg font-bold text-secondary">{fd.seniorCitizenRate}%</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground">Min Deposit</p>
                  <p className="font-bold text-secondary">₹{fd.minDeposit.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-secondary/5 rounded-lg">
                  <p className="text-xs text-muted-foreground">Max Tenure</p>
                  <p className="font-bold text-secondary">{fd.maxTenure}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(fd.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFDs.length === 0 && (
        <Card className="finease-card">
          <CardContent className="p-12 text-center">
            <PiggyBank className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No FD providers found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminFDManagement;
