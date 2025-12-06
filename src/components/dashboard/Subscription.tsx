import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Check, AlertCircle, Server, Layout, Mail, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    useGetSubscriptionsQuery,
    useCreateSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    type Subscription
} from "@/services/subscriptionsApi";

export const Subscription = () => {
    const [emailNotification, setEmailNotification] = useState(true);

    // API hooks
    const { data: subscriptionsData, isLoading, error } = useGetSubscriptionsQuery();
    const [createSubscription, { isLoading: isCreating }] = useCreateSubscriptionMutation();
    const [updateSubscription, { isLoading: isUpdating }] = useUpdateSubscriptionMutation();
    const [deleteSubscription, { isLoading: isDeleting }] = useDeleteSubscriptionMutation();

    // Form state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        period: "month" as 'month' | 'year' | 'week' | 'day' | 'one-time',
        description: "",
        features: "",
        icon: "Layout (Frontend)" as 'Layout (Frontend)' | 'Server (Backend)',
        status: "Active" as 'Active' | 'Inactive'
    });

    // Mock data - in a real app this would come from an API
    const subscriptionData = {
        status: "active",
        plan: "Enterprise Bundle",
        startDate: "2024-01-01",
        expirationDate: "2025-01-01",
        daysRemaining: 27,
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

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            period: "month",
            description: "",
            features: "",
            icon: "Layout (Frontend)",
            status: "Active"
        });
        setEditingId(null);
    };

    const handleOpenDialog = (subscription?: Subscription) => {
        if (subscription) {
            setEditingId(subscription._id);
            setFormData({
                name: subscription.name,
                price: subscription.price.toString(),
                period: subscription.billingPeriod,
                description: subscription.description || "",
                features: subscription.features.join("\n"),
                icon: subscription.icon || "Layout (Frontend)",
                status: subscription.status
            });
        } else {
            resetForm();
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        resetForm();
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.name.trim()) {
            toast.error("Please enter a subscription name");
            return;
        }
        if (!formData.price.trim()) {
            toast.error("Please enter a price");
            return;
        }

        const priceNum = parseFloat(formData.price.replace(/[^0-9.]/g, ''));
        if (isNaN(priceNum) || priceNum <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        const featuresString = formData.features.trim();

        try {
            if (editingId) {
                // Update existing subscription
                await updateSubscription({
                    id: editingId,
                    payload: {
                        name: formData.name,
                        price: priceNum,
                        billingPeriod: formData.period,
                        description: formData.description,
                        features: featuresString,
                        icon: formData.icon,
                        status: formData.status
                    }
                }).unwrap();
                toast.success("Subscription updated successfully");
            } else {
                // Add new subscription
                await createSubscription({
                    name: formData.name,
                    price: priceNum,
                    billingPeriod: formData.period,
                    description: formData.description,
                    features: featuresString,
                    icon: formData.icon,
                    status: formData.status
                }).unwrap();
                toast.success("Subscription added successfully");
            }
            handleCloseDialog();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save subscription");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSubscription(id).unwrap();
            toast.success("Subscription deleted successfully");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete subscription");
        }
    };

    const getIcon = (iconType?: 'Layout (Frontend)' | 'Server (Backend)' | null) => {
        if (!iconType || iconType === 'Layout (Frontend)') {
            return <Layout className="w-6 h-6" />;
        }
        return <Server className="w-6 h-6" />;
    };

    const getLargeIcon = (iconType?: 'Layout (Frontend)' | 'Server (Backend)' | null) => {
        if (!iconType || iconType === 'Layout (Frontend)') {
            return <Layout className="w-24 h-24" />;
        }
        return <Server className="w-24 h-24" />;
    };

    const getIconBg = (iconType?: 'Layout (Frontend)' | 'Server (Backend)' | null) => {
        if (!iconType || iconType === 'Layout (Frontend)') {
            return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
        }
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    };

    const normalizeIcon = (icon?: 'Layout (Frontend)' | 'Server (Backend)' | null): 'Layout (Frontend)' | 'Server (Backend)' => {
        if (icon === 'Server (Backend)') {
            return 'Server (Backend)';
        }
        return 'Layout (Frontend)';
    };

    const formatPeriod = (period: string) => {
        if (period === 'one-time') return 'one-time';
        return `/${period}`;
    };

    const subscriptions = subscriptionsData?.data || [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Subscription & Billing</h2>
                    <p className="text-muted-foreground mt-2">Manage your hosting plans and billing preferences.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Subscription
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Subscription" : "Add New Subscription"}</DialogTitle>
                            <DialogDescription>
                                {editingId ? "Update the subscription details below." : "Enter the details for your new subscription."}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Subscription Name *</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Premium Hosting"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <Input
                                        id="price"
                                        placeholder="e.g., 99"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="period">Billing Period</Label>
                                    <Select value={formData.period} onValueChange={(value: any) => setFormData({ ...formData, period: value })}>
                                        <SelectTrigger id="period">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="month">month</SelectItem>
                                            <SelectItem value="year">year</SelectItem>
                                            <SelectItem value="week">week</SelectItem>
                                            <SelectItem value="day">day</SelectItem>
                                            <SelectItem value="one-time">one-time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Brief description of the subscription"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Select value={formData.icon} onValueChange={(value: any) => setFormData({ ...formData, icon: value })}>
                                        <SelectTrigger id="icon">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Layout (Frontend)">Layout (Frontend)</SelectItem>
                                            <SelectItem value="Server (Backend)">Server (Backend)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                                        <SelectTrigger id="status">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="features">Features (one per line)</Label>
                                <Textarea
                                    id="features"
                                    placeholder="Global CDN&#10;Unlimited Bandwidth&#10;DDoS Protection"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    rows={6}
                                />
                                <p className="text-xs text-muted-foreground">Enter each feature on a new line</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleSubmit} disabled={isCreating || isUpdating}>
                                {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingId ? "Update" : "Add"} Subscription
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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

            {/* Subscription List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : error ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                        <p className="text-lg font-medium">Failed to load subscriptions</p>
                        <p className="text-sm text-muted-foreground mt-1">Please try again later</p>
                    </CardContent>
                </Card>
            ) : subscriptions.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                    {subscriptions.map((subscription) => (
                        <Card key={subscription._id} className="relative overflow-hidden transition-all hover:shadow-md">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                {getLargeIcon(subscription.icon)}
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${getIconBg(subscription.icon)}`}>
                                        {getIcon(subscription.icon)}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleOpenDialog(subscription)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(subscription._id)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle className="flex items-center gap-2">
                                    {subscription.name}
                                    <Badge variant={subscription.status === 'Active' ? 'default' : 'secondary'}>
                                        {subscription.status}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>{subscription.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">${subscription.price}</span>
                                    <span className="text-muted-foreground">{formatPeriod(subscription.billingPeriod)}</span>
                                </div>
                                {subscription.features.length > 0 && (
                                    <ul className="space-y-3">
                                        {subscription.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">Manage {subscription.name}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-muted-foreground text-center">
                            <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No subscriptions yet</p>
                            <p className="text-sm mt-1">Click "Add Subscription" to create your first subscription</p>
                        </div>
                    </CardContent>
                </Card>
            )
            }

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
        </div >
    );
};
