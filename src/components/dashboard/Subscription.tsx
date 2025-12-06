import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Check, AlertCircle, Server, Layout, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Subscription = () => {
    const [emailNotification, setEmailNotification] = useState(true);

    // Mock data - in a real app this would come from an API
    const subscriptionData = {
        status: "active",
        plan: "Enterprise Bundle",
        startDate: "2024-01-01",
        expirationDate: "2025-01-01",
        daysRemaining: 27, // Calculated dynamically in real app
        pricing: {
            frontend: {
                name: "Frontend Hosting",
                price: "$49",
                period: "/month",
                features: ["Global CDN", "Unlimited Bandwidth", "DDoS Protection", "Auto-scaling"]
            },
            backend: {
                name: "Backend Hosting",
                price: "$99",
                period: "/month",
                features: ["High Performance CPU", "32GB RAM", "Daily Backups", "24/7 Support"]
            }
        }
    };

    const handleNotificationChange = (checked: boolean) => {
        setEmailNotification(checked);
        if (checked) {
            toast.success("Email notifications enabled", {
                description: "We'll notify you 3 months before your subscription expires."
            });
        } else {
            toast.info("Email notifications disabled");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Subscription & Billing</h2>
                <p className="text-muted-foreground mt-2">Manage your hosting plans and billing preferences.</p>
            </div>

            {/* Status Card */}
            <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                Current Plan: {subscriptionData.plan}
                                <Badge variant={subscriptionData.status === 'active' ? 'default' : 'destructive'} className="ml-2 bg-green-600 hover:bg-green-700">
                                    {subscriptionData.status.toUpperCase()}
                                </Badge>
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Your next billing date is <span className="font-medium text-foreground">{new Date(subscriptionData.expirationDate).toLocaleDateString()}</span>
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{subscriptionData.daysRemaining}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Days Left</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        <Calendar className="w-4 h-4" />
                        <span>Subscription started on {new Date(subscriptionData.startDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>Expires on {new Date(subscriptionData.expirationDate).toLocaleDateString()}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Frontend Pricing */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Layout className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <Layout className="w-6 h-6" />
                        </div>
                        <CardTitle>{subscriptionData.pricing.frontend.name}</CardTitle>
                        <CardDescription>Optimized for modern web applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">{subscriptionData.pricing.frontend.price}</span>
                            <span className="text-muted-foreground">{subscriptionData.pricing.frontend.period}</span>
                        </div>
                        <ul className="space-y-3">
                            {subscriptionData.pricing.frontend.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Manage Frontend</Button>
                    </CardFooter>
                </Card>

                {/* Backend Pricing */}
                <Card className="relative overflow-hidden transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Server className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                            <Server className="w-6 h-6" />
                        </div>
                        <CardTitle>{subscriptionData.pricing.backend.name}</CardTitle>
                        <CardDescription>Scalable infrastructure for your API</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">{subscriptionData.pricing.backend.price}</span>
                            <span className="text-muted-foreground">{subscriptionData.pricing.backend.period}</span>
                        </div>
                        <ul className="space-y-3">
                            {subscriptionData.pricing.backend.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Manage Backend</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Expiration Notifications
                    </CardTitle>
                    <CardDescription>
                        Configure how you want to be notified about your subscription status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="notifications" className="font-medium">Email Notifications</Label>
                            <span className="text-sm text-muted-foreground">
                                Receive an email alert 3 months before your subscription expires.
                            </span>
                        </div>
                        <Switch
                            id="notifications"
                            checked={emailNotification}
                            onCheckedChange={handleNotificationChange}
                        />
                    </div>

                    <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 rounded-md border border-amber-200 dark:border-amber-800/30">
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                            <p className="font-medium">Important Note</p>
                            <p className="mt-1 opacity-90">
                                Notifications are sent to the company email address on file. Please ensure your contact information is up to date in the Settings page.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
