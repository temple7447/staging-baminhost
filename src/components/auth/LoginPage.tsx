import { useState } from "react";
import { Eye, EyeOff, LogIn, Building, Users, Shield, UserCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { DEMO_USERS } from "@/data/demoData";
import { ForgotPassword, ResetPasswordForm, PasswordResetSuccess } from "./PasswordReset";

type AuthView = 'login' | 'forgot-password' | 'reset-password' | 'reset-success';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Login successful",
        description: "Welcome to your portfolio management system!",
      });
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Please check your credentials.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // Enhanced demo credentials from our comprehensive system
  const demoCredentials = [
    { 
      role: "Owner", 
      email: "ebami@eyituoyo.com",
      name: "Ebami Eyituoyo",
      description: "Master control - ₦52.75M portfolio",
      icon: Shield,
      color: "bg-red-100 text-red-800"
    },
    { 
      role: "Big 7", 
      email: "big7@eyituoyo.com",
      name: "Big 7 Member",
      description: "Profit sharing & allocation oversight",
      icon: Building,
      color: "bg-purple-100 text-purple-800"
    },
    { 
      role: "Operations Manager", 
      email: "operations@eyituoyo.com",
      name: "Operations Manager",
      description: "Estate, Filling Station & Equipment",
      icon: Users,
      color: "bg-blue-100 text-blue-800"
    },
    { 
      role: "Marketing Manager", 
      email: "marketing@eyituoyo.com",
      name: "Marketing Manager",
      description: "Business development & growth",
      icon: Users,
      color: "bg-blue-100 text-blue-800"
    },
    { 
      role: "Vendor", 
      email: "vendor@eyituoyo.com",
      name: "Vendor Partner",
      description: "Service delivery & proof upload",
      icon: UserCheck,
      color: "bg-green-100 text-green-800"
    },
    { 
      role: "Customer", 
      email: "customer@eyituoyo.com",
      name: "Customer",
      description: "Payment plans & project tracking",
      icon: User,
      color: "bg-gray-100 text-gray-800"
    },
  ];

  // Handle different auth views
  if (authView === 'forgot-password') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <ForgotPassword onBack={() => setAuthView('login')} />
      </div>
    );
  }

  if (authView === 'reset-password') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <ResetPasswordForm 
          onSuccess={() => setAuthView('reset-success')} 
          onBack={() => setAuthView('login')} 
        />
      </div>
    );
  }

  if (authView === 'reset-success') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <PasswordResetSuccess onContinue={() => setAuthView('login')} />
      </div>
    );
  }

  // Main login view
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Eyituoyo Portfolio System</h1>
          <p className="text-muted-foreground">Complete Business & Personal Portfolio Management</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">₦52.75M Net Worth</Badge>
            <Badge variant="outline" className="text-xs">50/30/20 Split</Badge>
            <Badge variant="outline" className="text-xs">1/3rd Rule</Badge>
          </div>
        </div>

        {/* Login Form */}
        <Card className="financial-card backdrop-blur-md bg-white/90 shadow-2xl border-white/20">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center">
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-sm" 
                  onClick={() => setAuthView('forgot-password')}
                >
                  Forgot your password?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="backdrop-blur-md bg-white/90 shadow-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-lg">Demo User Accounts</CardTitle>
            <CardDescription>
              Choose a user role to explore the system (Password: <code className="bg-muted px-1 rounded">demo123</code>)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoCredentials.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.email}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword("demo123");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{cred.name}</div>
                        <div className="text-sm text-muted-foreground">{cred.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{cred.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cred.color}>{cred.role}</Badge>
                      <Button variant="ghost" size="sm">
                        Login
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* System Features Overview */}
        <Card className="backdrop-blur-md bg-white/90 shadow-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-lg">System Features</CardTitle>
            <CardDescription>What you'll find in this portfolio management system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-foreground">🏢 Business Operations</div>
                <div className="text-muted-foreground">• 38 Estate Properties</div>
                <div className="text-muted-foreground">• Filling Station (4 Tanks)</div>
                <div className="text-muted-foreground">• Equipment Rental (3 Units)</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-foreground">📊 Advanced Features</div>
                <div className="text-muted-foreground">• 50/30/20 Recursive Splits</div>
                <div className="text-muted-foreground">• AI Assistant & WhatsApp</div>
                <div className="text-muted-foreground">• CRM & Library System</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};