import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Bell,
  Globe,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Download,
  Trash2,
  Key,
  Mail,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    language: "en",
    currency: "INR",
    loginAlerts: true,
    transactionAlerts: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast({
      title: "Settings Updated",
      description: "Your preference has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary">Settings</h1>
        <p className="text-muted">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted">Extra security for your account</p>
              </div>
              <Switch
                checked={settings.twoFactor}
                onCheckedChange={() => handleToggle("twoFactor")}
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>Change Password</Label>
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm new password" />
                <Button className="finease-btn w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Login Alerts</Label>
                <p className="text-sm text-muted">Get notified of new logins</p>
              </div>
              <Switch
                checked={settings.loginAlerts}
                onCheckedChange={() => handleToggle("loginAlerts")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted" />
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted" />
                <div>
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted">Get alerts via SMS</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted" />
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted">Browser push notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Transaction Alerts</Label>
                <p className="text-sm text-muted">Alerts for all transactions</p>
              </div>
              <Switch
                checked={settings.transactionAlerts}
                onCheckedChange={() => handleToggle("transactionAlerts")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={settings.language} onValueChange={(v) => setSettings({ ...settings, language: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="gu">ગુજરાતી</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Currency Display</Label>
              <Select value={settings.currency} onValueChange={(v) => setSettings({ ...settings, currency: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                  <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="finease-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
            <p className="text-xs text-muted">
              Deleting your account will permanently remove all your data. This action cannot be undone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSettings;
