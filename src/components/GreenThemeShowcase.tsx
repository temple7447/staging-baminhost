import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Building, 
  Users, 
  Shield,
  CheckCircle,
  AlertCircle,
  PieChart,
  BarChart3,
  Wallet
} from "lucide-react";

export const GreenThemeShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center mb-4">
          <Building className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">🌿 Professional Green + Grey Theme</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Clean, balanced, and professional design perfect for your ₦52.75M portfolio management system
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <Badge className="bg-primary text-primary-foreground">Deep Forest Green #006644</Badge>
          <Badge className="bg-success text-success-foreground">Teal Green #00B894</Badge>
          <Badge className="bg-muted text-muted-foreground">Light Grey #F5F5F5</Badge>
        </div>
      </div>

      {/* Color Palette Demo */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-green-primary">🎨 Color Palette</CardTitle>
          <CardDescription>Your professional green + grey color system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Primary Colors */}
            <div className="space-y-3">
              <div className="font-medium text-sm">Primary Green</div>
              <div className="h-16 w-full rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
                #006644
              </div>
              <div className="text-xs text-muted-foreground">Deep Forest Green</div>
            </div>
            
            {/* Success Colors */}
            <div className="space-y-3">
              <div className="font-medium text-sm">Accent Green</div>
              <div className="h-16 w-full rounded-lg bg-success flex items-center justify-center text-white font-semibold">
                #00B894
              </div>
              <div className="text-xs text-muted-foreground">Teal Green</div>
            </div>
            
            {/* Background Colors */}
            <div className="space-y-3">
              <div className="font-medium text-sm">Background</div>
              <div className="h-16 w-full rounded-lg bg-background border flex items-center justify-center text-foreground font-semibold">
                #FFFFFF
              </div>
              <div className="text-xs text-muted-foreground">Pure White</div>
            </div>
            
            {/* Muted Colors */}
            <div className="space-y-3">
              <div className="font-medium text-sm">Light Grey</div>
              <div className="h-16 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                #F5F5F5
              </div>
              <div className="text-xs text-muted-foreground">Neutral Backdrop</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Showcase */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-green-primary">🔘 Button Styles</CardTitle>
          <CardDescription>Professional green buttons for actions and confirmations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              <CheckCircle className="w-4 h-4 mr-2" />
              Primary Action
            </Button>
            <Button variant="secondary">
              <Users className="w-4 h-4 mr-2" />
              Secondary Action
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button className="bg-success hover:bg-success/90">
              <TrendingUp className="w-4 h-4 mr-2" />
              Confirm Transaction
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <Card className="green-accent-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-primary">Total Portfolio</CardTitle>
            <Wallet className="h-4 w-4 text-green-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-primary">₦52,750,000</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
            <Progress value={75} className="mt-3" />
          </CardContent>
        </Card>

        {/* Business Growth */}
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+24.5%</div>
            <p className="text-xs text-muted-foreground">
              Estate & Equipment performing well
            </p>
            <Progress value={85} className="mt-3" />
          </CardContent>
        </Card>

        {/* Properties Managed */}
        <Card className="financial-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">38 Units</div>
            <p className="text-xs text-muted-foreground">
              32 occupied, 6 available
            </p>
            <Progress value={84} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-green-primary">💡 Usage Guidelines</CardTitle>
          <CardDescription>How to apply the professional green theme effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-primary">✅ Best Practices</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Use <strong>Deep Green (#006644)</strong> for primary actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Use <strong>Teal Green (#00B894)</strong> for success states</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Use <strong>White (#FFFFFF)</strong> for card backgrounds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span>Use <strong>Light Grey (#F5F5F5)</strong> for page backgrounds</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-green-primary">🎯 Application Areas</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-green-accent flex-shrink-0" />
                  <span><strong>Financial dashboards</strong> - professional & trustworthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-accent flex-shrink-0" />
                  <span><strong>Authentication pages</strong> - secure & reliable</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-accent flex-shrink-0" />
                  <span><strong>Reports & analytics</strong> - clear & focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-accent flex-shrink-0" />
                  <span><strong>Transaction interfaces</strong> - confident & stable</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card className="financial-card">
        <CardHeader>
          <CardTitle className="text-green-primary">🚦 Status Indicators</CardTitle>
          <CardDescription>Professional status badges with the new color system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-success text-success-foreground">Active</Badge>
            <Badge className="bg-primary text-primary-foreground">Processing</Badge>
            <Badge variant="outline" className="border-green-200 text-green-accent">Pending</Badge>
            <Badge className="bg-muted text-muted-foreground">Inactive</Badge>
            <Badge className="bg-warning text-warning-foreground">Attention</Badge>
            <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center pt-8 border-t">
        <p className="text-muted-foreground">
          🌿 <strong>Professional Green + Grey Theme</strong> - Fresh, balanced, and trustworthy for your ₦52.75M portfolio system
        </p>
      </div>
    </div>
  );
};