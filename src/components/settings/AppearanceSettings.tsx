import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Globe,
  Eye,
  Type,
  Layout,
  Zap,
  CheckCircle,
  Settings,
  Paintbrush,
  Languages,
  Accessibility
} from "lucide-react";

export const AppearanceSettings = () => {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("NGN");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("24");
  const [numberFormat, setNumberFormat] = useState("1,234.56");
  
  const [displaySettings, setDisplaySettings] = useState({
    compactMode: false,
    showAnimations: true,
    highContrast: false,
    reducedMotion: false,
    showTooltips: true,
    sidebarCollapsed: false,
    showBalances: true,
    hideSmallAmounts: false
  });

  const [accessibility, setAccessibility] = useState({
    fontSize: "medium",
    focusIndicator: true,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindness: "none"
  });

  const handleDisplayChange = (key: keyof typeof displaySettings) => {
    setDisplaySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAccessibilityChange = (key: keyof typeof accessibility, value: string | boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: value }));
  };

  // Preview themes
  const themes = [
    {
      id: "light",
      name: "Light",
      description: "Clean and bright interface",
      icon: Sun,
      preview: "bg-white text-gray-900 border-gray-200"
    },
    {
      id: "dark",
      name: "Dark",
      description: "Easy on the eyes in low light",
      icon: Moon,
      preview: "bg-gray-900 text-gray-100 border-gray-700"
    },
    {
      id: "system",
      name: "System",
      description: "Match your system preference",
      icon: Monitor,
      preview: "bg-gradient-to-r from-gray-100 to-gray-900 text-gray-600 border-gray-400"
    }
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "ha", name: "Hausa", flag: "🇳🇬" },
    { code: "ig", name: "Igbo", flag: "🇳🇬" },
    { code: "yo", name: "Yoruba", flag: "🇳🇬" }
  ];

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Palette className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Appearance & Display</h2>
          <p className="text-muted-foreground">
            Customize the look and feel of your dashboard
          </p>
        </div>
      </div>

      <Tabs defaultValue="theme" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Language & Region
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Display
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            Accessibility
          </TabsTrigger>
        </TabsList>

        {/* Theme Settings */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Color Theme
              </CardTitle>
              <CardDescription>
                Choose your preferred color scheme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
                {themes.map((themeOption) => (
                  <div key={themeOption.id} className="flex items-center space-x-4">
                    <RadioGroupItem value={themeOption.id} id={themeOption.id} />
                    <Label htmlFor={themeOption.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <themeOption.icon className="h-5 w-5" />
                          <div>
                            <div className="font-medium">{themeOption.name}</div>
                            <div className="text-sm text-muted-foreground">{themeOption.description}</div>
                          </div>
                        </div>
                        <div className={`w-16 h-10 rounded border-2 ${themeOption.preview} flex items-center justify-center text-xs font-medium`}>
                          Aa
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-6">
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    Theme changes apply instantly. Your preference is saved automatically.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language & Region */}
        <TabsContent value="language">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Set your preferred language and regional formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Display Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                            {lang.code === "en" && <Badge variant="secondary">Default</Badge>}
                            {["ha", "ig", "yo"].includes(lang.code) && <Badge variant="outline">Local</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Interface language for menus, buttons, and messages
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Primary Currency</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{curr.symbol}</span>
                            <span>{curr.name}</span>
                            <span className="text-muted-foreground">({curr.code})</span>
                            {curr.code === "NGN" && <Badge variant="secondary">Default</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Default currency for displaying amounts and calculations
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Format</Label>
                    <Select value={timeFormat} onValueChange={setTimeFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12-hour (3:30 PM)</SelectItem>
                        <SelectItem value="24">24-hour (15:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Number Format</Label>
                  <Select value={numberFormat} onValueChange={setNumberFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,234.56">1,234.56 (Comma separator)</SelectItem>
                      <SelectItem value="1.234,56">1.234,56 (Dot separator)</SelectItem>
                      <SelectItem value="1 234.56">1 234.56 (Space separator)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Display Preferences
              </CardTitle>
              <CardDescription>
                Customize your dashboard layout and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(displaySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={key} className="text-base cursor-pointer">
                      {key === 'compactMode' && 'Compact Mode'}
                      {key === 'showAnimations' && 'Show Animations'}
                      {key === 'highContrast' && 'High Contrast'}
                      {key === 'reducedMotion' && 'Reduced Motion'}
                      {key === 'showTooltips' && 'Show Tooltips'}
                      {key === 'sidebarCollapsed' && 'Start with Sidebar Collapsed'}
                      {key === 'showBalances' && 'Show Account Balances'}
                      {key === 'hideSmallAmounts' && 'Hide Small Amounts'}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {key === 'compactMode' && 'Use smaller spacing and condensed layouts'}
                      {key === 'showAnimations' && 'Enable smooth transitions and animations'}
                      {key === 'highContrast' && 'Increase contrast for better visibility'}
                      {key === 'reducedMotion' && 'Minimize animations for motion sensitivity'}
                      {key === 'showTooltips' && 'Display helpful tooltips on hover'}
                      {key === 'sidebarCollapsed' && 'Launch with sidebar minimized'}
                      {key === 'showBalances' && 'Display account balances in sidebar and cards'}
                      {key === 'hideSmallAmounts' && 'Hide transactions under ₦100'}
                    </p>
                  </div>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleDisplayChange(key as keyof typeof displaySettings)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility */}
        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Accessibility Options
              </CardTitle>
              <CardDescription>
                Make the dashboard more accessible and easier to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select 
                  value={accessibility.fontSize} 
                  onValueChange={(value) => handleAccessibilityChange('fontSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium (Default)</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adjust the base font size for all text
                </p>
              </div>

              <div className="space-y-2">
                <Label>Color Blindness Support</Label>
                <Select 
                  value={accessibility.colorBlindness} 
                  onValueChange={(value) => handleAccessibilityChange('colorBlindness', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="deuteranopia">Deuteranopia (Red-Green)</SelectItem>
                    <SelectItem value="protanopia">Protanopia (Red-Green)</SelectItem>
                    <SelectItem value="tritanopia">Tritanopia (Blue-Yellow)</SelectItem>
                    <SelectItem value="monochromacy">Monochromacy</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adjust colors and indicators for color vision differences
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="focusIndicator" className="text-base cursor-pointer">
                      Enhanced Focus Indicators
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show clear focus outlines for keyboard navigation
                    </p>
                  </div>
                  <Switch
                    id="focusIndicator"
                    checked={accessibility.focusIndicator}
                    onCheckedChange={(checked) => handleAccessibilityChange('focusIndicator', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screenReader" className="text-base cursor-pointer">
                      Screen Reader Optimizations
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enhanced labels and descriptions for screen readers
                    </p>
                  </div>
                  <Switch
                    id="screenReader"
                    checked={accessibility.screenReader}
                    onCheckedChange={(checked) => handleAccessibilityChange('screenReader', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="keyboardNavigation" className="text-base cursor-pointer">
                      Keyboard Navigation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable full keyboard navigation support
                    </p>
                  </div>
                  <Switch
                    id="keyboardNavigation"
                    checked={accessibility.keyboardNavigation}
                    onCheckedChange={(checked) => handleAccessibilityChange('keyboardNavigation', checked)}
                  />
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  These accessibility features help make the dashboard more inclusive. Changes apply immediately to improve your experience.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};