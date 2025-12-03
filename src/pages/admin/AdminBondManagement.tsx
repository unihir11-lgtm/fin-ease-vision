import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Plus, Edit, Trash2, Eye, Landmark, 
  Download, ChevronRight, Filter
} from "lucide-react";
import { bondsData } from "@/data/bondData";
import { toast } from "@/hooks/use-toast";

const AdminBondManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredBonds = bondsData.filter((bond) => {
    const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || bond.rating.includes(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const ratings = ["all", "AAA", "AA+", "AA", "A+"];

  const stats = [
    { label: "Total Bonds", value: bondsData.length },
    { label: "AAA Rated", value: bondsData.filter(b => b.rating.includes("AAA")).length },
    { label: "Avg Yield", value: `${(bondsData.reduce((a, b) => a + b.currentYield, 0) / bondsData.length).toFixed(1)}%` },
    { label: "Total Value", value: "₹50Cr+" },
  ];

  const handleDelete = (id: string) => {
    toast({ title: "Bond Deleted", description: "The bond has been removed successfully." });
  };

  const handleAddBond = () => {
    toast({ title: "Bond Added", description: "New bond has been added successfully." });
    setIsAddModalOpen(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Bond Management</h1>
          <p className="text-muted-foreground">Manage all corporate and government bonds</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add New Bond
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Bond</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Issuer Name</Label>
                    <Input placeholder="Enter issuer name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Credit Rating</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AAA">AAA</SelectItem>
                        <SelectItem value="AA+">AA+</SelectItem>
                        <SelectItem value="AA">AA</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Coupon Rate (%)</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 7.5" />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Yield (%)</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 8.2" />
                  </div>
                  <div className="space-y-2">
                    <Label>YTM (%)</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 8.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Investment (₹)</Label>
                    <Input type="number" placeholder="e.g., 10000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Maturity Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddBond}>Add Bond</Button>
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

      {/* Filters */}
      <Card className="finease-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search bonds..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by Rating:</span>
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setRatingFilter(rating)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    ratingFilter === rating
                      ? "bg-primary text-white"
                      : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10"
                  }`}
                >
                  {rating === "all" ? "All Ratings" : rating}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonds Grid - Matching Reference UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBonds.map((bond) => (
          <Card key={bond.id} className="finease-card hover:shadow-lg transition-all group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-xl">
                    {bond.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-sm">{bond.issuer}</h3>
                  </div>
                </div>
                <Badge className={
                  bond.rating.includes("AAA") ? "bg-green-100 text-green-700" :
                  bond.rating.includes("AA") ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }>
                  {bond.rating}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline" className="text-xs">
                  Maturity: {formatDate(bond.maturityDate)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Coupon Rate</p>
                  <p className="font-bold text-primary">{bond.couponRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Yield</p>
                  <p className="font-bold text-secondary">{bond.currentYield}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">YTM</p>
                  <p className="font-bold text-secondary">{bond.ytm}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Min Amount</p>
                  <p className="font-bold text-secondary">₹{(bond.minInvestment / 1000).toFixed(0)}K</p>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(bond.id)}>
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

      {filteredBonds.length === 0 && (
        <Card className="finease-card">
          <CardContent className="p-12 text-center">
            <Landmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No bonds found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBondManagement;
