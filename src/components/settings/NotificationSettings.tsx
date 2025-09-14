import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Mail,
  Smartphone,
  Volume2,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  Users,
  Calendar,
  Shield
} from "lucide-react";

export const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    accountSecurity: true,
    transactionAlerts: true,
    portfolioUpdates: false,
    goalReminders: true,
    weeklyReports: false,
    monthlyStatements: true,
    marketNews: false,
    systemUpdates: true,
    promotions: false,
    socialActivity: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    accountSecurity: true,
    transactionAlerts: true,
    portfolioUpdates: true,
    goalReminders: true,
    priceAlerts: false,
    systemMaintenance: true,
    socialActivity: false
  });

  const [smsNotifications, setSmsNotifications] = useState({
    accountSecurity: true,
    transactionAlerts: false,
    goalDeadlines: true,
    systemAlerts: true
  });

  const [notificationTiming, setNotificationTiming] = useState({
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    timezone: "Africa/Lagos",
    digestFrequency: "daily",
    reminderTiming: "3days"
  });

  const handleEmailChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePushChange = (key: keyof typeof pushNotifications) => {
    setPushNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSmsChange = (key: keyof typeof smsNotifications) => {
    setSmsNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const NotificationRow = ({ 
    title, 
    description, 
    icon: Icon, 
    emailEnabled, 
    pushEnabled, 
    smsEnabled = false, 
    onEmailChange, 
    onPushChange, 
    onSmsChange,
    showSms = false,
    isPremium = false 
  }: {
    title: string;
    description: string;
    icon: any;
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled?: boolean;
    onEmailChange: () => void;
    onPushChange: () => void;
    onSmsChange?: () => void;
    showSms?: boolean;
    isPremium?: boolean;
  }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{title}</h3>
            {isPremium && <Badge variant="secondary" className="text-xs">Premium</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <Switch checked={emailEnabled} onCheckedChange={onEmailChange} />
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <Switch checked={pushEnabled} onCheckedChange={onPushChange} />
        </div>
        {showSms && onSmsChange && (
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Switch checked={smsEnabled} onCheckedChange={onSmsChange} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bell className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          <p className="text-muted-foreground">
            Configure how and when you want to receive notifications
          </p>
        </div>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="timing" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timing
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Channels
          </TabsTrigger>
        </TabsList>

        {/* Notification Preferences */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            {/* Header with legend */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Choose which events trigger notifications</CardDescription>
                <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    SMS
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Security & Account */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <NotificationRow
                  title="Account Security"
                  description="Login attempts, password changes, security events"
                  icon={Shield}
                  emailEnabled={emailNotifications.accountSecurity}
                  pushEnabled={pushNotifications.accountSecurity}
                  smsEnabled={smsNotifications.accountSecurity}
                  onEmailChange={() => handleEmailChange('accountSecurity')}
                  onPushChange={() => handlePushChange('accountSecurity')}
                  onSmsChange={() => handleSmsChange('accountSecurity')}
                  showSms={true}
                />
                <NotificationRow
                  title="System Updates"
                  description="Platform updates, maintenance notifications"
                  icon={Settings}
                  emailEnabled={emailNotifications.systemUpdates}
                  pushEnabled={pushNotifications.systemMaintenance}
                  smsEnabled={smsNotifications.systemAlerts}
                  onEmailChange={() => handleEmailChange('systemUpdates')}
                  onPushChange={() => handlePushChange('systemMaintenance')}
                  onSmsChange={() => handleSmsChange('systemAlerts')}
                  showSms={true}
                />
              </CardContent>
            </Card>

            {/* Financial */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <NotificationRow
                  title="Transaction Alerts"
                  description="Income, expenses, and transfer notifications"
                  icon={DollarSign}
                  emailEnabled={emailNotifications.transactionAlerts}
                  pushEnabled={pushNotifications.transactionAlerts}
                  smsEnabled={smsNotifications.transactionAlerts}
                  onEmailChange={() => handleEmailChange('transactionAlerts')}
                  onPushChange={() => handlePushChange('transactionAlerts')}
                  onSmsChange={() => handleSmsChange('transactionAlerts')}
                  showSms={true}
                />
                <NotificationRow
                  title="Portfolio Updates"
                  description="Investment performance and market changes"
                  icon={TrendingUp}
                  emailEnabled={emailNotifications.portfolioUpdates}
                  pushEnabled={pushNotifications.portfolioUpdates}
                  onEmailChange={() => handleEmailChange('portfolioUpdates')}
                  onPushChange={() => handlePushChange('portfolioUpdates')}
                  isPremium={true}
                />
                <NotificationRow
                  title="Price Alerts"
                  description="Custom price threshold notifications"
                  icon={AlertTriangle}
                  emailEnabled={false}
                  pushEnabled={pushNotifications.priceAlerts}
                  onEmailChange={() => {}}
                  onPushChange={() => handlePushChange('priceAlerts')}
                  isPremium={true}
                />
              </CardContent>
            </Card>

            {/* Goals & Planning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goals & Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <NotificationRow
                  title="Goal Reminders"
                  description="Progress updates and milestone notifications"
                  icon={Target}
                  emailEnabled={emailNotifications.goalReminders}
                  pushEnabled={pushNotifications.goalReminders}
                  smsEnabled={smsNotifications.goalDeadlines}
                  onEmailChange={() => handleEmailChange('goalReminders')}
                  onPushChange={() => handlePushChange('goalReminders')}
                  onSmsChange={() => handleSmsChange('goalDeadlines')}
                  showSms={true}
                />
              </CardContent>
            </Card>

            {/* Reports & Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Reports & Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <NotificationRow
                  title="Weekly Reports"
                  description="Weekly financial summary and insights"
                  icon={Calendar}
                  emailEnabled={emailNotifications.weeklyReports}
                  pushEnabled={false}
                  onEmailChange={() => handleEmailChange('weeklyReports')}
                  onPushChange={() => {}}
                />
                <NotificationRow
                  title="Monthly Statements"
                  description="Comprehensive monthly financial statements"
                  icon={CheckCircle}
                  emailEnabled={emailNotifications.monthlyStatements}
                  pushEnabled={false}
                  onEmailChange={() => handleEmailChange('monthlyStatements')}
                  onPushChange={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timing Settings */}
        <TabsContent value="timing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Notification Timing
              </CardTitle>
              <CardDescription>
                Control when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quiet Hours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Pause non-urgent notifications during specified hours
                    </p>
                  </div>
                  <Switch 
                    checked={notificationTiming.quietHoursEnabled}
                    onCheckedChange={(checked) => 
                      setNotificationTiming(prev => ({ ...prev, quietHoursEnabled: checked }))
                    }
                  />
                </div>

                {notificationTiming.quietHoursEnabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <Label>Start Time</Label>
                      <Select 
                        value={notificationTiming.quietHoursStart}
                        onValueChange={(value) => 
                          setNotificationTiming(prev => ({ ...prev, quietHoursStart: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Select 
                        value={notificationTiming.quietHoursEnd}
                        onValueChange={(value) => 
                          setNotificationTiming(prev => ({ ...prev, quietHoursEnd: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i.toString().padStart(2, '0');
                            return (
                              <SelectItem key={hour} value={`${hour}:00`}>
                                {hour}:00
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select 
                  value={notificationTiming.timezone}
                  onValueChange={(value) => 
                    setNotificationTiming(prev => ({ ...prev, timezone: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Africa/Lagos">West Africa Time (WAT)</SelectItem>
                    <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Digest Frequency */}
              <div className="space-y-2">
                <Label>Email Digest Frequency</Label>
                <Select 
                  value={notificationTiming.digestFrequency}
                  onValueChange={(value) => 
                    setNotificationTiming(prev => ({ ...prev, digestFrequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Group similar notifications into digest emails
                </p>
              </div>

              {/* Reminder Timing */}
              <div className="space-y-2">
                <Label>Goal Reminder Timing</Label>
                <Select 
                  value={notificationTiming.reminderTiming}
                  onValueChange={(value) => 
                    setNotificationTiming(prev => ({ ...prev, reminderTiming: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 day before</SelectItem>
                    <SelectItem value="3days">3 days before</SelectItem>
                    <SelectItem value="1week">1 week before</SelectItem>
                    <SelectItem value="2weeks">2 weeks before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Channels */}
        <TabsContent value="channels">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure your email notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Email notifications are sent to your registered email address. Critical security notifications cannot be disabled.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
                <CardDescription>
                  Real-time notifications on your devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Push notifications require permission in your browser or mobile app. Enable notifications in your device settings if you're not receiving them.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  SMS Notifications
                </CardTitle>
                <CardDescription>
                  Text message alerts for critical events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    SMS notifications are limited to security alerts and critical financial events. Standard messaging rates may apply.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};