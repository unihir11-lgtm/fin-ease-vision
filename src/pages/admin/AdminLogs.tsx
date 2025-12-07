import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Download, Activity, User, Shield, AlertTriangle, 
  Info, CheckCircle, Clock, Filter, RefreshCw, Calendar,
  Globe, Monitor, Smartphone, Database, CreditCard, FileText, Sparkles
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockLogs = [
  { id: 1, action: "User login successful", user: "admin@finease.com", type: "auth", level: "success", timestamp: "2024-01-15 14:32:45", ip: "192.168.1.100", device: "Chrome / Windows", location: "Mumbai, IN" },
  { id: 2, action: "IPO added - Aurionpro Solutions", user: "admin@finease.com", type: "cms", level: "success", timestamp: "2024-01-15 14:28:12", ip: "192.168.1.100", device: "Chrome / Windows", location: "Mumbai, IN" },
  { id: 3, action: "KYC approved for user #12345", user: "kyc@finease.com", type: "kyc", level: "success", timestamp: "2024-01-15 14:15:30", ip: "192.168.1.101", device: "Safari / MacOS", location: "Bangalore, IN" },
  { id: 4, action: "Failed login attempt - Invalid credentials", user: "unknown@test.com", type: "auth", level: "warning", timestamp: "2024-01-15 13:45:22", ip: "203.45.67.89", device: "Firefox / Linux", location: "Unknown" },
  { id: 5, action: "Bond rate updated - HDFC Infrastructure", user: "admin@finease.com", type: "cms", level: "info", timestamp: "2024-01-15 13:30:15", ip: "192.168.1.100", device: "Chrome / Windows", location: "Mumbai, IN" },
  { id: 6, action: "NPS payment processed - ₹50,000", user: "nps@finease.com", type: "payment", level: "success", timestamp: "2024-01-15 13:15:08", ip: "192.168.1.102", device: "Edge / Windows", location: "Delhi, IN" },
  { id: 7, action: "New user registration - Rahul Sharma", user: "system", type: "user", level: "info", timestamp: "2024-01-15 12:45:33", ip: "182.73.45.123", device: "Mobile / Android", location: "Pune, IN" },
  { id: 8, action: "Security alert - Multiple failed login attempts", user: "system", type: "security", level: "error", timestamp: "2024-01-15 12:30:00", ip: "203.45.67.89", device: "Unknown", location: "Unknown" },
  { id: 9, action: "FD provider added - Bajaj Finance", user: "admin@finease.com", type: "cms", level: "success", timestamp: "2024-01-15 12:00:45", ip: "192.168.1.100", device: "Chrome / Windows", location: "Mumbai, IN" },
  { id: 10, action: "Settlement batch processed - BATCH-2024-001", user: "nps@finease.com", type: "payment", level: "success", timestamp: "2024-01-15 11:30:22", ip: "192.168.1.102", device: "Edge / Windows", location: "Delhi, IN" },
  { id: 11, action: "Database backup completed", user: "system", type: "system", level: "info", timestamp: "2024-01-15 11:00:00", ip: "192.168.1.1", device: "Server", location: "AWS Mumbai" },
  { id: 12, action: "API rate limit exceeded", user: "api@partner.com", type: "security", level: "warning", timestamp: "2024-01-15 10:45:12", ip: "45.67.89.123", device: "API Client", location: "Singapore" },
];

const activityTrend = [
  { hour: "00:00", logs: 12 },
  { hour: "04:00", logs: 8 },
  { hour: "08:00", logs: 45 },
  { hour: "12:00", logs: 78 },
  { hour: "16:00", logs: 92 },
  { hour: "20:00", logs: 56 },
];

const typeDistribution = [
  { type: "Auth", count: 156, color: "#3b82f6" },
  { type: "CMS", count: 89, color: "#22c55e" },
  { type: "Payment", count: 67, color: "#f59e0b" },
  { type: "KYC", count: 45, color: "#8b5cf6" },
  { type: "Security", count: 23, color: "#ef4444" },
  { type: "System", count: 34, color: "#6b7280" },
];

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.ip.includes(searchTerm);
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    return matchesSearch && matchesLevel && matchesType;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "error": return <Shield className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const styles: Record<string, string> = {
      success: "bg-green-100 text-green-700 border-green-200",
      warning: "bg-amber-100 text-amber-700 border-amber-200",
      error: "bg-red-100 text-red-700 border-red-200",
      info: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return styles[level] || styles.info;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "auth": return <User className="w-3 h-3" />;
      case "cms": return <FileText className="w-3 h-3" />;
      case "payment": return <CreditCard className="w-3 h-3" />;
      case "kyc": return <Shield className="w-3 h-3" />;
      case "security": return <AlertTriangle className="w-3 h-3" />;
      case "system": return <Database className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const stats = {
    total: mockLogs.length,
    success: mockLogs.filter(l => l.level === "success").length,
    warnings: mockLogs.filter(l => l.level === "warning").length,
    errors: mockLogs.filter(l => l.level === "error").length,
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-secondary/95 to-primary/20 p-6 md:p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-['Raleway']">Activity Logs</h1>
              <p className="text-white/70 mt-1">Monitor all system activities, events, and security alerts</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button className="gap-2 bg-white text-primary hover:bg-white/90">
              <Download className="w-4 h-4" /> Export Logs
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Logs (24h)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.success}</p>
                <p className="text-xs text-muted-foreground">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.warnings}</p>
                <p className="text-xs text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-100">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
                <p className="text-xs text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              Activity Trend (24 Hours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityTrend}>
                  <defs>
                    <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="logs" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorLogs)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Filter className="w-4 h-4 text-primary" />
              </div>
              By Event Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeDistribution} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} width={60} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by action, user, or IP address..."
                className="pl-10 h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Tabs value={levelFilter} onValueChange={setLevelFilter}>
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="success" className="text-xs">Success</TabsTrigger>
                  <TabsTrigger value="info" className="text-xs">Info</TabsTrigger>
                  <TabsTrigger value="warning" className="text-xs">Warning</TabsTrigger>
                  <TabsTrigger value="error" className="text-xs">Error</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] h-10">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="cms">CMS Updates</SelectItem>
                  <SelectItem value="kyc">KYC</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              Recent Activity ({filteredLogs.length} logs)
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-secondary text-sm">Level</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Action</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">User</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Type</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Location</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Device</th>
                  <th className="text-left p-4 font-medium text-secondary text-sm">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <Badge className={`text-xs border ${getLevelBadge(log.level)}`}>
                          {log.level}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-secondary text-sm">{log.action}</p>
                      <p className="text-xs text-muted-foreground font-mono">{log.ip}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{log.user}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs gap-1 bg-muted/30">
                        {getTypeIcon(log.type)}
                        {log.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        {log.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {log.device.includes("Mobile") ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        <span className="text-xs">{log.device}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{log.timestamp}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h3 className="font-semibold text-secondary mb-2">No logs found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminLogs;
