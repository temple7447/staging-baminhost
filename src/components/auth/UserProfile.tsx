import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Bell, 
  Lock, 
  Eye, 
  EyeOff,
  Camera,
  Save,
  LogOut,
  Settings,
  Clock,
  DollarSign,
  Building
} from "lucide-react";

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    transactionAlerts: true,
    paymentReminders: true,
    maintenanceAlerts: true,
    overdueNotifications: true
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    loginAlerts: true,
    deviceTracking: true
  });

  // Get user role details
  const getRoleDetails = (role: string) => {
    switch (role) {
      case 'super_admin':
        return {
          title: 'System Super Admin',
          description: 'Full system access with master control',
          color: 'bg-red-100 text-red-800',
          permissions: ['All Permissions'],
          workHours: '8 hours/day (3 active)',
          allocation: '₦52.75M portfolio'
        };
      case 'big7':
        return {
          title: 'Big 7 Member',
          description: 'Profit sharing and allocation oversight',
          color: 'bg-purple-100 text-purple-800',
          permissions: ['View Allocations', 'Manage Portfolio'],
          workHours: 'Flexible',
          allocation: '15% profit share'
        };
      case 'manager':
        return {
          title: 'Manager',
          description: 'Departmental management and operations',
          color: 'bg-blue-100 text-blue-800',
          permissions: ['Manage Team', 'View Reports', 'Execute Tasks'],
          workHours: '8 hours/day',
          allocation: `₦${user?.hourlyRate?.toLocaleString()}/hour`
        };
      case 'vendor':
        return {
          title: 'Vendor Partner',
          description: 'Service delivery and proof submission',
          color: 'bg-green-100 text-green-800',
          permissions: ['Upload Work', 'View Payments', 'Track Commissions'],
          workHours: 'Project-based',
          allocation: 'Commission-based'
        };
      case 'customer':
        return {
          title: 'Customer',
          description: 'Service consumption and payment management',
          color: 'bg-slate-100 text-slate-800',
          permissions: ['View Account', 'Make Payments', 'Track Projects'],
          workHours: 'N/A',
          allocation: 'Payment plans available'
        };
      default:
        return {
          title: 'User',
          description: 'System user',
          color: 'bg-slate-100 text-slate-800',
          permissions: [],
          workHours: 'N/A',
          allocation: 'N/A'
        };
    }
  };

  const roleDetails = getRoleDetails(user?.role || 'user');

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    // In a real app, this would handle password change
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Profile Overview */}
      <Card className="bg-slate-50 dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0"
              >
                <Camera className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
                <Badge className={roleDetails.color}>{roleDetails.title}</Badge>
              </div>
              <p className="text-slate-500 dark:text-slate-400">{roleDetails.description}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Role Information */}
      <Card className="bg-slate-50 dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
        <CardHeader>
<CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            Role Details
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">Your access level and system permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Work Schedule
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{roleDetails.workHours}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Allocation
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{roleDetails.allocation}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                Department
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {user?.department ? user.department.replace('_', ' ').toUpperCase() : 'N/A'}
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <div className="text-sm font-medium mb-2 text-slate-900 dark:text-white">Permissions</div>
            <div className="flex flex-wrap gap-2">
              {roleDetails.permissions.map((permission, index) => (
                <Badge key={index} variant="outline">{permission}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Card className="bg-slate-50 dark:bg-slate-800 shadow-xl border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
            <Settings className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Personal Information</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={roleDetails.title} disabled />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
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
                          value={formData.newPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handlePasswordChange}>Update Password</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Login Alerts</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Get notified when someone signs into your account
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={() => handleSecurityToggle('loginAlerts')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Device Tracking</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Keep track of devices that access your account
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.deviceTracking}
                        onCheckedChange={() => handleSecurityToggle('deviceTracking')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Communication Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Receive updates via email</div>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">WhatsApp Notifications</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Receive updates via WhatsApp</div>
                      </div>
                      <Switch
                        checked={notifications.whatsappNotifications}
                        onCheckedChange={() => handleNotificationToggle('whatsappNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Receive updates via SMS</div>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Transaction Alerts</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Get notified of all transactions</div>
                      </div>
                      <Switch
                        checked={notifications.transactionAlerts}
                        onCheckedChange={() => handleNotificationToggle('transactionAlerts')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Payment Reminders</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Reminders for due payments</div>
                      </div>
                      <Switch
                        checked={notifications.paymentReminders}
                        onCheckedChange={() => handleNotificationToggle('paymentReminders')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Maintenance Alerts</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Property and equipment maintenance</div>
                      </div>
                      <Switch
                        checked={notifications.maintenanceAlerts}
                        onCheckedChange={() => handleNotificationToggle('maintenanceAlerts')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Dashboard Preferences</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default Dashboard View</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="overview">Overview Dashboard</option>
                        <option value="wallet">Wallet Dashboard</option>
                        <option value="reports">Reports & Analytics</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency Display</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <select className="w-full px-3 py-2 border border-input rounded-md">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};
