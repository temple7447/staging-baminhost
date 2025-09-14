import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Settings,
  Lock,
  Unlock,
  History,
  Globe,
  UserX
} from "lucide-react";

export const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    allowDataCollection: false,
    shareAnalytics: true,
    marketingEmails: false,
    thirdPartyIntegrations: true
  });

  // Mock session data
  const activeSessions = [
    { id: 1, device: "MacBook Pro", location: "Lagos, Nigeria", lastActive: "Now", current: true },
    { id: 2, device: "iPhone 14", location: "Lagos, Nigeria", lastActive: "2 hours ago", current: false },
    { id: 3, device: "Chrome - Windows", location: "Abuja, Nigeria", lastActive: "1 day ago", current: false },
  ];

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Password change requested");
    // Reset form
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Security & Privacy</h2>
          <p className="text-muted-foreground">
            Manage your account security and privacy preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="password" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="2fa" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Two-Factor Auth
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Active Sessions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <UserX className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Keep your account secure with a strong password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handlePasswordChange} disabled={
                  !passwordForm.currentPassword || 
                  !passwordForm.newPassword || 
                  !passwordForm.confirmPassword
                }>
                  Update Password
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Use at least 8 characters with a mix of letters, numbers, and symbols for a strong password.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Two-Factor Authentication Tab */}
        <TabsContent value="2fa">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {twoFactorEnabled ? (
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Shield className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">
                      {twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled 
                        ? "Your account is protected with 2FA" 
                        : "Enable 2FA for additional security"
                      }
                    </p>
                  </div>
                </div>
                <Button
                  variant={twoFactorEnabled ? "destructive" : "default"}
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                >
                  {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </Button>
              </div>

              {!twoFactorEnabled && (
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Two-factor authentication adds an extra layer of security by requiring a code from your phone in addition to your password.
                  </AlertDescription>
                </Alert>
              )}

              {twoFactorEnabled && (
                <div className="space-y-4">
                  <h3 className="font-medium">Backup Codes</h3>
                  <p className="text-sm text-muted-foreground">
                    Save these backup codes in a secure location. You can use them to access your account if you lose your phone.
                  </p>
                  <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                    <div>1234-5678</div>
                    <div>9876-5432</div>
                    <div>4567-1234</div>
                    <div>8765-4321</div>
                    <div>2468-1357</div>
                    <div>9753-8642</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Generate New Codes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Sessions Tab */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Manage devices that are currently signed into your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${session.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Globe className={`h-5 w-5 ${session.current ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{session.device}</span>
                          {session.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{session.location}</p>
                        <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Sign Out All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
              <CardDescription>
                Control how your information is shared and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={key} className="text-base cursor-pointer">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {key === 'profileVisibility' && 'Allow others to find and view your profile'}
                      {key === 'showOnlineStatus' && 'Show when you\'re online to other users'}
                      {key === 'allowDataCollection' && 'Allow collection of usage data for improvements'}
                      {key === 'shareAnalytics' && 'Share anonymous analytics to help improve the platform'}
                      {key === 'marketingEmails' && 'Receive emails about new features and promotions'}
                      {key === 'thirdPartyIntegrations' && 'Allow third-party integrations to access your data'}
                    </p>
                  </div>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handlePrivacyChange(key as keyof typeof privacySettings)}
                  />
                </div>
              ))}

              <div className="pt-4 border-t">
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    Changes to privacy settings may take up to 24 hours to take full effect across all systems.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};