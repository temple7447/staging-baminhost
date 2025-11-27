import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateSuperadminEmailMutation } from "@/services";
import { Loader2, Mail, Lock, CheckCircle2 } from "lucide-react";

interface ChangeEmailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ChangeEmailModal = ({ open, onOpenChange }: ChangeEmailModalProps) => {
    const { toast } = useToast();
    const { user, login } = useAuth();
    const [updateEmail, { isLoading }] = useUpdateSuperadminEmailMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.email.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter a new email address",
                variant: "destructive",
            });
            return;
        }

        if (!formData.password.trim()) {
            toast({
                title: "Validation Error",
                description: "Please enter your current password",
                variant: "destructive",
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Validation Error",
                description: "Please enter a valid email address",
                variant: "destructive",
            });
            return;
        }

        try {
            const result = await updateEmail({
                email: formData.email,
                password: formData.password,
            }).unwrap();

            if (result.success) {
                // Update user context with new email
                const token = localStorage.getItem('token');
                if (token && user) {
                    const updatedUser = { ...user, email: formData.email };
                    login(token, updatedUser);
                }

                toast({
                    title: "✅ Email Updated Successfully!",
                    description: `Your email has been changed to ${formData.email}`,
                });

                // Reset form and close modal
                setFormData({ email: "", password: "" });
                onOpenChange(false);
            }
        } catch (error: any) {
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                "Failed to update email. Please check your password and try again.";

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setFormData({ email: "", password: "" });
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Change Superadmin Email
                    </DialogTitle>
                    <DialogDescription>
                        Update your superadmin email address securely. You'll need to provide your current password to confirm this change.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-email">Current Email</Label>
                        <Input
                            id="current-email"
                            type="email"
                            value={user?.email || ""}
                            disabled
                            className="bg-muted"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="new-email">
                            New Email Address <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="new-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="newemail@example.com"
                                className="pl-10"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Current Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Enter your current password"
                                className="pl-10"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            For security, we need to verify your identity
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Update Email
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
