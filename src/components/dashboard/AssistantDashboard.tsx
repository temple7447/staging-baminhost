import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bot, 
  MessageSquare, 
  Mic, 
  MicOff,
  Send,
  Brain,
  Zap,
  Bell,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  Lightbulb,
  Settings,
  Wallet,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";
import { TransactionsPanel } from "./TransactionsPanel";

export const AssistantDashboard = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMode, setSelectedMode] = useState("chat");

  // Demo chat history
  const chatHistory = [
    {
      id: '1',
      type: 'user',
      message: 'What is the current occupancy rate of Balado Estate?',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      type: 'assistant',
      message: 'Balado Estate currently has 30 out of 32 units occupied, giving you a 93.75% occupancy rate. This is excellent performance! The 2 vacant units are Unit 31 and Unit 32.',
      timestamp: '10:30 AM',
    },
    {
      id: '3',
      type: 'user',
      message: 'Schedule maintenance for the filling station tanks',
      timestamp: '10:35 AM',
    },
    {
      id: '4',
      type: 'assistant',
      message: 'I\'ve scheduled maintenance for all 4 filling station tanks:\n\n• Kerosene Tank: Due now (urgent)\n• Premium Tank: Due in 3 days\n• Petrol Tank: Due in 5 days\n• Diesel Tank: Due in 1 week\n\nWould you like me to send WhatsApp notifications to the maintenance team?',
      timestamp: '10:35 AM',
    },
    {
      id: '5',
      type: 'user',
      message: 'Yes, send notifications and calculate this month\'s 50/30/20 split',
      timestamp: '10:40 AM',
    },
    {
      id: '6',
      type: 'assistant',
      message: '✅ WhatsApp notifications sent to maintenance team.\n\nYour current month 50/30/20 split:\n• Investment (50%): ₦1,600,000\n• Withdrawals (30%): ₦960,000\n• Operations (20%): ₦640,000\n\nTotal allocated: ₦3,200,000 from monthly income',
      timestamp: '10:40 AM',
    }
  ];

  // Demo tasks
  const activeTasks = [
    {
      id: '1',
      title: 'Send rent reminders to Balado Estate tenants',
      status: 'in_progress',
      type: 'automated',
      estimatedCompletion: '2:00 PM',
    },
    {
      id: '2',
      title: 'Generate quarterly ROI report',
      status: 'pending',
      type: 'manual_approval',
      estimatedCompletion: '5:00 PM',
    },
    {
      id: '3',
      title: 'Process vendor commission payments',
      status: 'completed',
      type: 'automated',
      completedAt: '9:30 AM',
    },
    {
      id: '4',
      title: 'Update fuel tank levels from suppliers',
      status: 'in_progress',
      type: 'automated',
      estimatedCompletion: '1:30 PM',
    }
  ];

  // Demo WhatsApp integration status
  const whatsappStatus = {
    connected: true,
    lastSync: '2 minutes ago',
    pendingMessages: 3,
    todaysSent: 47,
  };

  // Demo notification settings
  const notificationSettings = [
    { type: 'rent_due', enabled: true, method: 'whatsapp' },
    { type: 'low_fuel', enabled: true, method: 'both' },
    { type: 'maintenance_due', enabled: true, method: 'whatsapp' },
    { type: 'payment_received', enabled: false, method: 'sms' },
    { type: 'equipment_available', enabled: true, method: 'whatsapp' },
  ];

  const walletData = {
    balance: 50000,
    transactions: [
      { id: 1, date: "2025-04-28", description: "Task Completion Bonus", type: "deposit", amount: 5000, status: "completed", reference: "BNS-20250428-001" },
      { id: 2, date: "2025-04-25", description: "Transfer to Savings", type: "transfer", amount: 10000, status: "completed", reference: "TRF-20250425-001" },
      { id: 3, date: "2025-04-20", description: "Monthly Stipend", type: "deposit", amount: 50000, status: "completed", reference: "DEP-20250420-001" },
      { id: 4, date: "2025-04-15", description: "Withdrawal", type: "withdraw", amount: 5000, status: "completed", reference: "WD-20250415-001" }
    ]
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // In real app, this would send to AI backend
    setMessage("");
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">
            Your intelligent business companion - {user?.role} mode
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={whatsappStatus.connected ? "default" : "destructive"}>
            <Phone className="h-3 w-3 mr-1" />
            WhatsApp {whatsappStatus.connected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>
      </div>

      {/* Assistant Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTasks.filter(t => t.status !== 'completed').length}</div>
            <div className="text-xs text-muted-foreground">Running processes</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{whatsappStatus.todaysSent}</div>
            <div className="text-xs text-muted-foreground">WhatsApp notifications</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{whatsappStatus.pendingMessages}</div>
            <div className="text-xs text-muted-foreground">Require attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-xs text-green-600">Tasks automated</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Assistant Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Chat Assistant
            </CardTitle>
            <CardDescription>Ask questions, give commands, get insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mode Selector */}
            <div className="flex gap-2">
              <Button
                variant={selectedMode === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMode('chat')}
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-3 w-3" />
                Chat
              </Button>
              <Button
                variant={selectedMode === 'voice' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMode('voice')}
                className="flex items-center gap-1"
              >
                <Mic className="h-3 w-3" />
                Voice
              </Button>
            </div>

            {/* Chat History */}
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-4">
              {chatHistory.map((chat) => (
                <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-lg p-3 ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">{chat.message}</div>
                    <div className="text-xs mt-1 opacity-70">{chat.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your portfolio..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              {selectedMode === 'voice' ? (
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              ) : (
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Check occupancy rates</Button>
              <Button variant="outline" size="sm">Generate reports</Button>
              <Button variant="outline" size="sm">Send rent reminders</Button>
              <Button variant="outline" size="sm">Calculate splits</Button>
            </div>
          </CardContent>
        </Card>

        {/* Task Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Task Automation
            </CardTitle>
            <CardDescription>Monitor and manage automated processes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {getTaskStatusIcon(task.status)}
                    <div>
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {task.status === 'completed' 
                          ? `Completed at ${task.completedAt}`
                          : `ETA: ${task.estimatedCompletion}`
                        }
                      </div>
                    </div>
                  </div>
                  <Badge className={getTaskStatusColor(task.status)}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              <Lightbulb className="h-4 w-4 mr-2" />
              Suggest New Automations
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* WhatsApp Integration & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Communication & Notifications</CardTitle>
          <CardDescription>WhatsApp integration and notification management</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="whatsapp" className="space-y-4">
            <TabsList className="dashboard-tabs-list">
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="whatsapp" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Connection Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>WhatsApp Business</span>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Sync</span>
                      <span className="text-sm text-muted-foreground">{whatsappStatus.lastSync}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Messages Today</span>
                      <span className="font-semibold">{whatsappStatus.todaysSent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pending Responses</span>
                      <span className="font-semibold text-yellow-600">{whatsappStatus.pendingMessages}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Send Rent Reminders
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Bell className="h-4 w-4 mr-2" />
                      Maintenance Notifications
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Equipment Availability Updates
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Payment Confirmations
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-4">
                {notificationSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <div className="font-medium capitalize">
                        {setting.type.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Method: {setting.method === 'both' ? 'WhatsApp & SMS' : setting.method}
                      </div>
                    </div>
                    <Badge variant={setting.enabled ? "default" : "secondary"}>
                      {setting.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Message Templates</h3>
                <p className="text-muted-foreground">
                  Pre-configured message templates for different scenarios
                </p>
                <Button className="mt-4">Manage Templates</Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Messages This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">324</div>
                    <div className="text-xs text-green-600">+12% from last week</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Response Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-xs text-muted-foreground">Average response time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Automation Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-xs text-green-600">Tasks completed automatically</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Transactions */}
      <TransactionsPanel
        formatCurrency={(amount: number) => `₦${amount.toLocaleString()}`}
        formatDate={(date: string) => new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' })}
        getStatusColor={(status: string) => {
          switch (status) {
            case 'completed':
            case 'paid':
              return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
              return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            default:
              return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
          }
        }}
      />
    </div>
  );
};