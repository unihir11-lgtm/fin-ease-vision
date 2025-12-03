import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, TrendingUp, IndianRupee, PieChart, ArrowUpRight, 
  User, Shield, Bell, CreditCard, Calendar, ChevronRight,
  Edit, Eye, EyeOff, Lock, Smartphone, Mail, MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";

const DashboardNPS = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "+91 98765 43210",
    dob: "1985-06-15",
    gender: "Male",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    riskPreference: "Medium",
  });

  // Contribution state
  const [contribution, setContribution] = useState({
    amount: "",
    type: "one-time",
    recurringAmount: "",
    recurringFrequency: "monthly",
  });

  // Mock data
  const npsData = {
    pran: "1122334455",
    pranStatus: "Active",
    totalCorpus: 450000,
    totalContributed: 400000,
    returns: 50000,
    returnsPercentage: 12.5,
    annualizedReturn: 8.5,
    tier1Balance: 350000,
    tier2Balance: 100000,
    pensionFundManager: "HDFC Pension",
    assetAllocation: {
      equity: 50,
      corporate: 30,
      government: 15,
      alternative: 5,
    },
    fundPerformance: [
      { name: "Equity Fund", return: 10, benchmark: 8 },
      { name: "Corp Bond Fund", return: 7.5, benchmark: 7 },
      { name: "Govt Bond Fund", return: 6, benchmark: 5.5 },
      { name: "Alternative Fund", return: 8, benchmark: 7.5 },
    ],
  };

  const contributionHistory = [
    { date: "15 May 2025", amount: 5000, type: "Monthly", status: "Completed" },
    { date: "15 Apr 2025", amount: 5000, type: "Monthly", status: "Completed" },
    { date: "15 Mar 2025", amount: 5000, type: "Monthly", status: "Completed" },
    { date: "15 Feb 2025", amount: 10000, type: "One-time", status: "Completed" },
    { date: "15 Jan 2025", amount: 5000, type: "Monthly", status: "Completed" },
  ];

  const performanceData = [
    { month: "Jan", value: 380000 },
    { month: "Feb", value: 395000 },
    { month: "Mar", value: 410000 },
    { month: "Apr", value: 425000 },
    { month: "May", value: 450000 },
  ];

  const notifications = [
    { id: 1, type: "contribution", message: "Upcoming Contribution: ₹5,000 due on 15th June 2025", date: "2 days ago" },
    { id: 2, type: "alert", message: "Portfolio Performance has increased by 3% in the last month", date: "1 week ago" },
    { id: 3, type: "regulatory", message: "NPS withdrawal rules updated for FY 2025-26", date: "2 weeks ago" },
  ];

  const pieData = [
    { name: "Equity", value: npsData.assetAllocation.equity, color: "#3B82F6" },
    { name: "Corporate Bonds", value: npsData.assetAllocation.corporate, color: "#22C55E" },
    { name: "Govt Bonds", value: npsData.assetAllocation.government, color: "#EAB308" },
    { name: "Alternative", value: npsData.assetAllocation.alternative, color: "#A855F7" },
  ];

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleContribution = () => {
    toast({
      title: "Contribution Initiated",
      description: `Your contribution of ₹${contribution.amount || contribution.recurringAmount} has been initiated.`,
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-display">National Pension System</h1>
          <p className="text-muted-foreground">Manage your retirement savings with Protean NPS</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
          PRAN: {npsData.pran} • {npsData.pranStatus}
        </Badge>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="contributions" className="text-xs sm:text-sm">Contributions</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
          <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Alerts</TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Corpus</p>
              <p className="text-xl font-bold text-secondary">₹{npsData.totalCorpus.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Contributed</p>
              <p className="text-xl font-bold text-secondary">₹{npsData.totalContributed.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
              <p className="text-xl font-bold text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                ₹{npsData.returns.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Annualized Return</p>
              <p className="text-xl font-bold text-green-600">+{npsData.annualizedReturn}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PRAN & Account Details */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                PRAN & Account Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground text-sm">PRAN Number</span>
                  <span className="font-bold text-secondary">{npsData.pran}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground text-sm">Status</span>
                  <Badge className="bg-green-100 text-green-700">{npsData.pranStatus}</Badge>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground text-sm">Tier 1 Balance</span>
                  <span className="font-bold text-secondary">₹{npsData.tier1Balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground text-sm">Tier 2 Balance</span>
                  <span className="font-bold text-secondary">₹{npsData.tier2Balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground text-sm">Pension Fund Manager</span>
                  <span className="font-bold text-secondary">{npsData.pensionFundManager}</span>
                </div>
              </div>
            </div>

            {/* Asset Allocation Pie Chart */}
            <div className="bg-white rounded-xl p-5 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Asset Allocation
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-bold text-secondary">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Change Allocation</Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button onClick={() => setActiveTab("contributions")} className="h-auto py-4 flex-col gap-2 bg-primary">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Make Contribution</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <span className="font-medium">Download Statement</span>
              <span className="text-xs text-muted-foreground">PDF / Excel format</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <span className="font-medium">Change Fund Manager</span>
              <span className="text-xs text-muted-foreground">Switch your PFM</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <span className="font-medium">Update Nominee</span>
              <span className="text-xs text-muted-foreground">Add or change nominee</span>
            </Button>
          </div>
        </TabsContent>

        {/* Contributions Tab */}
        <TabsContent value="contributions" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Make Contribution */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Make Contribution
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Contribution Type</Label>
                  <Select value={contribution.type} onValueChange={(v) => setContribution({...contribution, type: v})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time Contribution</SelectItem>
                      <SelectItem value="recurring">Recurring Contribution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {contribution.type === "one-time" ? (
                  <div>
                    <Label className="text-sm text-muted-foreground">Amount (₹)</Label>
                    <Input 
                      type="number" 
                      placeholder="Enter amount" 
                      value={contribution.amount}
                      onChange={(e) => setContribution({...contribution, amount: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm text-muted-foreground">Recurring Amount (₹)</Label>
                      <Input 
                        type="number" 
                        placeholder="Enter amount" 
                        value={contribution.recurringAmount}
                        onChange={(e) => setContribution({...contribution, recurringAmount: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Frequency</Label>
                      <Select value={contribution.recurringFrequency} onValueChange={(v) => setContribution({...contribution, recurringFrequency: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <Button onClick={handleContribution} className="w-full bg-primary">
                  Proceed to Pay
                </Button>
              </div>
            </div>

            {/* Contribution Summary */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Contribution Summary
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">Total Contribution</p>
                  <p className="text-2xl font-bold text-primary">₹{npsData.totalContributed.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">This Year</p>
                    <p className="text-lg font-bold text-secondary">₹50,000</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">Last Year</p>
                    <p className="text-lg font-bold text-secondary">₹60,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution History */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Contribution History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contributionHistory.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4 text-sm text-secondary">{item.date}</td>
                      <td className="py-3 px-4 text-sm font-medium text-secondary">₹{item.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.type}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700">{item.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          {/* Returns Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Annualized Return</p>
              <p className="text-xl font-bold text-green-600">+{npsData.annualizedReturn}%</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">1 Year Return</p>
              <p className="text-xl font-bold text-green-600">+12.5%</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">3 Year Return</p>
              <p className="text-xl font-bold text-green-600">+28.4%</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Since Inception</p>
              <p className="text-xl font-bold text-green-600">+45.2%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Growth Chart */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Portfolio Growth
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `₹${(v/1000)}K`} />
                    <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']} />
                    <Line type="monotone" dataKey="value" stroke="#23698e" strokeWidth={2} dot={{ fill: '#23698e' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fund Performance */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Fund Performance vs Benchmark
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={npsData.fundPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value: number) => [`${value}%`]} />
                    <Legend />
                    <Bar dataKey="return" name="Fund Return" fill="#23698e" />
                    <Bar dataKey="benchmark" name="Benchmark" fill="#E5E7EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-bold text-secondary mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm text-muted-foreground">Full Name</Label>
                <Input 
                  value={profile.fullName}
                  onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email Address</Label>
                <Input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Phone Number</Label>
                <Input 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Date of Birth</Label>
                <Input 
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({...profile, dob: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Gender</Label>
                <Select value={profile.gender} onValueChange={(v) => setProfile({...profile, gender: v})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Risk Preference</Label>
                <Select value={profile.riskPreference} onValueChange={(v) => setProfile({...profile, riskPreference: v})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm text-muted-foreground">Address</Label>
                <Input 
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={handleProfileUpdate} className="mt-6 bg-primary">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications & Alerts
            </h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notif.type === 'contribution' ? 'bg-blue-500' :
                    notif.type === 'alert' ? 'bg-amber-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-secondary">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Current Password</Label>
                  <div className="relative mt-1">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-1" />
                </div>
                <Button onClick={handlePasswordChange} className="w-full bg-primary">
                  Update Password
                </Button>
              </div>
            </div>

            {/* 2FA Settings */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Two-Factor Authentication
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">SMS Authentication</p>
                      <p className="text-xs text-muted-foreground">Receive codes via SMS</p>
                    </div>
                  </div>
                  <Switch checked={is2FAEnabled} onCheckedChange={setIs2FAEnabled} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-secondary">Email Authentication</p>
                      <p className="text-xs text-muted-foreground">Receive codes via Email</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <p className="text-xs text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardNPS;