import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { useOnboardVendorMutation } from '@/services/vendorsApi';
import { useGetBusinessTypesQuery } from '@/services/businessTypesApi';
import { toast } from '@/components/ui/use-toast';

export const VendorOnboarding = () => {
    const [open, setOpen] = useState(false);
    const [onboardVendor, { isLoading }] = useOnboardVendorMutation();
    const { data: businessTypesData, isLoading: loadingBusinessTypes } = useGetBusinessTypesQuery({ activeOnly: true });

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [businessTypeId, setBusinessTypeId] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [sendCredentials, setSendCredentials] = useState(true);

    const businessTypes = businessTypesData?.data || [];

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setBusinessTypeId('');
        setBusinessName('');
        setSpecialization('');
        setSendCredentials(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Please enter vendor name',
                variant: 'destructive',
            });
            return;
        }

        if (!email.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Please enter vendor email',
                variant: 'destructive',
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                title: 'Validation Error',
                description: 'Please enter a valid email address',
                variant: 'destructive',
            });
            return;
        }

        try {
            const payload: any = {
                name: name.trim(),
                email: email.trim(),
                sendCredentials,
            };

            if (phone.trim()) payload.phone = phone.trim();
            if (businessTypeId) payload.businessTypeId = businessTypeId;
            if (businessName.trim()) payload.businessName = businessName.trim();
            if (specialization.trim()) payload.specialization = specialization.trim();

            const result = await onboardVendor(payload).unwrap();

            toast({
                title: 'Vendor Onboarded Successfully',
                description: result.message || `${name} has been onboarded. ${sendCredentials ? 'Credentials sent to their email.' : ''}`,
            });

            resetForm();
            setOpen(false);
        } catch (error: any) {
            toast({
                title: 'Failed to Onboard Vendor',
                description: error?.data?.message || 'An error occurred while onboarding the vendor',
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Onboard Vendor
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Onboard New Vendor</DialogTitle>
                    <DialogDescription>
                        Add a new vendor to the system. They will receive login credentials via email.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Required Fields */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g., John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="e.g., vendor@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Optional Fields */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="e.g., 08012345678"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Business Type Dropdown */}
                        <div className="grid gap-2">
                            <Label htmlFor="businessType">Business Type (Optional)</Label>
                            {loadingBusinessTypes ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading business types...
                                </div>
                            ) : (
                                <Select value={businessTypeId} onValueChange={setBusinessTypeId}>
                                    <SelectTrigger id="businessType">
                                        <SelectValue placeholder="Select business type (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessTypes.map((type: any) => (
                                            <SelectItem key={type._id} value={type._id}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {businessTypes.length === 0 && !loadingBusinessTypes && (
                                <p className="text-xs text-muted-foreground">
                                    No business types available. Contact admin to create business types.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="businessName">Business Name (Optional)</Label>
                                <Input
                                    id="businessName"
                                    placeholder="e.g., John's Plumbing"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="specialization">Specialization (Optional)</Label>
                                <Input
                                    id="specialization"
                                    placeholder="e.g., Residential Plumbing"
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Send Credentials Checkbox */}
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="sendCredentials"
                                checked={sendCredentials}
                                onCheckedChange={(checked) => setSendCredentials(checked as boolean)}
                            />
                            <Label
                                htmlFor="sendCredentials"
                                className="text-sm font-normal cursor-pointer"
                            >
                                Send login credentials to vendor's email
                            </Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                resetForm();
                                setOpen(false);
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            {isLoading ? 'Onboarding...' : 'Onboard Vendor'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
