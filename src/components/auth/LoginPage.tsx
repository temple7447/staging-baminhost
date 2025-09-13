import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Login successful",
        description: "Welcome back to FinancePro!",
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

  const demoCredentials = [
    { role: "Owner", email: "owner@financepro.com" },
    { role: "Big 7", email: "big7@financepro.com" },
    { role: "Manager", email: "manager@financepro.com" },
    { role: "Vendor", email: "vendor@financepro.com" },
    { role: "Customer", email: "customer@financepro.com" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to FinancePro</h1>
          <p className="text-muted-foreground">Professional Financial Management Platform</p>
        </div>

        {/* Login Form */}
        <Card className="financial-card">
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
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="financial-card">
          <CardHeader>
            <CardTitle className="text-sm">Demo Credentials</CardTitle>
            <CardDescription className="text-xs">
              Use these demo accounts to test different user roles (Password: demo123)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {demoCredentials.map((cred) => (
                <Button
                  key={cred.email}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword("demo123");
                  }}
                >
                  <span className="font-medium">{cred.role}:</span>
                  <span className="ml-2 text-muted-foreground">{cred.email}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};