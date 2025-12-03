import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  Calendar,
  Banknote,
  Settings,
  Trash2,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Coupon Credit Received",
    message: "₹3,750 coupon from REC Limited Bond has been credited to your account.",
    date: "2024-01-15T10:30:00",
    read: false,
    category: "payment",
  },
  {
    id: 2,
    type: "info",
    title: "New IPO Available",
    message: "TechCorp Ltd IPO is now open for subscription. Apply before Jan 20th.",
    date: "2024-01-14T09:00:00",
    read: false,
    category: "ipo",
  },
  {
    id: 3,
    type: "warning",
    title: "FD Maturity Reminder",
    message: "Your HDFC Bank FD will mature on Feb 15, 2024. Plan your reinvestment.",
    date: "2024-01-12T14:00:00",
    read: true,
    category: "maturity",
  },
  {
    id: 4,
    type: "success",
    title: "Investment Successful",
    message: "Your investment of ₹50,000 in NHAI Bond has been processed successfully.",
    date: "2024-01-10T11:45:00",
    read: true,
    category: "investment",
  },
  {
    id: 5,
    type: "info",
    title: "KYC Verification Complete",
    message: "Your KYC has been verified. You can now invest in all products.",
    date: "2024-01-08T16:20:00",
    read: true,
    category: "kyc",
  },
  {
    id: 6,
    type: "warning",
    title: "Bond Maturity Alert",
    message: "IRFC Bond will mature on Mar 30, 2024. ₹1,00,000 will be credited.",
    date: "2024-01-05T10:00:00",
    read: true,
    category: "maturity",
  },
];

const notificationSettings = [
  { id: "payments", label: "Payment & Credits", description: "Coupon payments, interest credits", enabled: true },
  { id: "maturity", label: "Maturity Alerts", description: "Upcoming bond and FD maturities", enabled: true },
  { id: "ipo", label: "IPO Updates", description: "New IPOs and allotment status", enabled: true },
  { id: "promotions", label: "Offers & Updates", description: "New products and promotional offers", enabled: false },
  { id: "reports", label: "Reports Ready", description: "Monthly statements and tax reports", enabled: true },
];

const DashboardNotifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const [settings, setSettings] = useState(notificationSettings);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Notifications</h1>
          <p className="text-muted">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-primary text-white">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="finease-card">
            <CardContent className="p-0">
              {notifs.length === 0 ? (
                <div className="p-8 text-center">
                  <BellOff className="w-12 h-12 text-muted mx-auto mb-4" />
                  <p className="text-muted">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifs.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
                        !notif.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="mt-1">{getIcon(notif.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${!notif.read ? "text-secondary" : "text-muted-foreground"}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <span className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted mt-1">{notif.message}</p>
                        <p className="text-xs text-muted mt-2">{formatDate(notif.date)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-muted" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card className="finease-card">
            <CardContent className="p-0">
              {notifs.filter((n) => !n.read).length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-muted">All notifications read!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifs
                    .filter((n) => !n.read)
                    .map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors bg-primary/5"
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="mt-1">{getIcon(notif.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-secondary">{notif.title}</p>
                            <span className="w-2 h-2 bg-primary rounded-full" />
                          </div>
                          <p className="text-sm text-muted mt-1">{notif.message}</p>
                          <p className="text-xs text-muted mt-2">{formatDate(notif.date)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="finease-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">{setting.label}</Label>
                    <p className="text-sm text-muted">{setting.description}</p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardNotifications;
