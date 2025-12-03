import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Download, Activity, User, 
  Shield, AlertTriangle, Info, CheckCircle,
  Clock, Filter
} from "lucide-react";

const mockLogs = [
  { id: 1, action: "User login", user: "admin@finease.com", type: "auth", level: "info", timestamp: "2024-01-15 14:32:45", ip: "192.168.1.100" },
  { id: 2, action: "IPO added - Aurionpro Solutions", user: "admin@finease.com", type: "cms", level: "success", timestamp: "2024-01-15 14:28:12", ip: "192.168.1.100" },
  { id: 3, action: "KYC approved for user #12345", user: "kyc@finease.com", type: "kyc", level: "success", timestamp: "2024-01-15 14:15:30", ip: "192.168.1.101" },
  { id: 4, action: "Failed login attempt", user: "unknown", type: "auth", level: "warning", timestamp: "2024-01-15 13:45:22", ip: "203.45.67.89" },
  { id: 5, action: "Bond rate updated - HDFC", user: "admin@finease.com", type: "cms", level: "info", timestamp: "2024-01-15 13:30:15", ip: "192.168.1.100" },
  { id: 6, action: "NPS payment processed - ₹50,000", user: "nps@finease.com", type: "payment", level: "success", timestamp: "2024-01-15 13:15:08", ip: "192.168.1.102" },
  { id: 7, action: "User registration - Rahul Sharma", user: "system", type: "user", level: "info", timestamp: "2024-01-15 12:45:33", ip: "182.73.45.123" },
  { id: 8, action: "Security alert - Multiple failed attempts", user: "system", type: "security", level: "error", timestamp: "2024-01-15 12:30:00", ip: "203.45.67.89" },
  { id: 9, action: "FD provider added - Bajaj Finance", user: "admin@finease.com", type: "cms", level: "success", timestamp: "2024-01-15 12:00:45", ip: "192.168.1.100" },
  { id: 10, action: "Settlement batch processed - BATCH-2024-001", user: "nps@finease.com", type: "payment", level: "success", timestamp: "2024-01-15 11:30:22", ip: "192.168.1.102" },
];

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchTerm.toLowerCase());
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
    const styles = {
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      error: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700",
    };
    return styles[level as keyof typeof styles] || styles.info;
  };

  const stats = [
    { label: "Total Logs", value: mockLogs.length, icon: Activity },
    { label: "Success", value: mockLogs.filter(l => l.level === "success").length, color: "text-green-600" },
    { label: "Warnings", value: mockLogs.filter(l => l.level === "warning").length, color: "text-amber-600" },
    { label: "Errors", value: mockLogs.filter(l => l.level === "error").length, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Activity Logs</h1>
          <p className="text-muted-foreground">Monitor all system activities and events</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="finease-card">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color || 'text-secondary'}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
                placeholder="Search logs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Tabs value={levelFilter} onValueChange={setLevelFilter}>
                <TabsList>
                  <TabsTrigger value="all">All Levels</TabsTrigger>
                  <TabsTrigger value="success">Success</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="warning">Warning</TabsTrigger>
                  <TabsTrigger value="error">Error</TabsTrigger>
                </TabsList>
              </Tabs>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
              >
                <option value="all">All Types</option>
                <option value="auth">Authentication</option>
                <option value="cms">CMS</option>
                <option value="kyc">KYC</option>
                <option value="payment">Payment</option>
                <option value="user">User</option>
                <option value="security">Security</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="finease-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary/5">
                  <th className="text-left p-4 font-medium text-secondary">Level</th>
                  <th className="text-left p-4 font-medium text-secondary">Action</th>
                  <th className="text-left p-4 font-medium text-secondary">User</th>
                  <th className="text-left p-4 font-medium text-secondary">Type</th>
                  <th className="text-left p-4 font-medium text-secondary">IP Address</th>
                  <th className="text-left p-4 font-medium text-secondary">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-secondary/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <Badge className={getLevelBadge(log.level)}>{log.level}</Badge>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-secondary">{log.action}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{log.user}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{log.type}</Badge>
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-sm">{log.ip}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{log.timestamp}</span>
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

export default AdminLogs;
