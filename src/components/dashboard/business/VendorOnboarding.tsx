import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2,
    Store,
    Briefcase,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Upload,
    CloudIcon,
    ShieldCheck,
    FileText,
    DollarSign,
    ArrowLeft,
    Loader2,
    Clock,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useOnboardVendorMutation } from '@/services/vendorsApi';
import { toast } from '@/components/ui/use-toast';

type Step = 1 | 2 | 3 | 4;

export const VendorOnboarding: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [onboardVendor] = useOnboardVendorMutation();

    // Form State
    const [formData, setFormData] = useState({
        type: 'service' as 'service' | 'product',
        businessName: '',
        legalName: '',
        cacNumber: '',
        email: '',
        phone: '',
        address: '',
        categories: [] as string[],
        pricingType: 'hourly' as 'hourly' | 'unit' | 'project',
        pricingRate: '',
        description: '',
        idFile: null as File | null,
        certFile: null as File | null
    });

    const steps = [
        { id: 1, label: 'Business Type', icon: Building2 },
        { id: 2, label: 'Business Details', icon: FileText },
        { id: 3, label: 'Catalog & Pricing', icon: DollarSign },
        { id: 4, label: 'Verification', icon: ShieldCheck },
    ];

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as Step);
        else handleSubmit();
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // In a real app, you'd upload files first and get URLs
            await onboardVendor({
                name: formData.legalName,
                email: formData.email,
                phone: formData.phone,
                businessName: formData.businessName,
                cacNumber: formData.cacNumber,
                businessAddress: formData.address,
                specialization: formData.description,
                portfolio: [], // In a real app, this would be the array of uploaded Cloudinary URLs
                sendCredentials: true
                // Note: govId and certification URLs would be sent here after file upload integration
            }).unwrap();

            toast({
                title: "Registration Submitted!",
                description: "Applications are typically reviewed within 24-48 hours."
            });
            navigate('/dashboard/vendor-management');
        } catch (err) {
            toast({
                title: "Registration Failed",
                description: "Please check your inputs and try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Select Business Category</h2>
                <p className="text-slate-500 mt-2">How will you be contributing to the ecosystem?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => setFormData({ ...formData, type: 'service' })}
                    className={cn(
                        "p-8 rounded-3xl border-2 transition-all duration-300 text-left group hover:shadow-xl",
                        formData.type === 'service'
                            ? "border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/10"
                            : "border-slate-100 bg-white hover:border-slate-300"
                    )}
                >
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                        formData.type === 'service' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}>
                        <Briefcase className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Service Provider</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        Maintenance, cleaning, electrical, or consulting services.
                    </p>
                </button>

                <button
                    onClick={() => setFormData({ ...formData, type: 'product' })}
                    className={cn(
                        "p-8 rounded-3xl border-2 transition-all duration-300 text-left group hover:shadow-xl",
                        formData.type === 'product'
                            ? "border-blue-600 bg-blue-50/40 ring-4 ring-blue-500/10"
                            : "border-slate-100 bg-white hover:border-slate-300"
                    )}
                >
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                        formData.type === 'product' ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}>
                        <Store className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Product Seller</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        Industrial parts, construction materials, or office inventory.
                    </p>
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Business Details</h2>
                <p className="text-slate-500 mt-2">Basic information to identify your business entity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="legalName" className="text-sm font-bold text-slate-700">Contact Person (Full Name)</Label>
                    <Input
                        id="legalName"
                        placeholder="e.g. John Doe"
                        className="h-12 bg-slate-50/50 rounded-xl"
                        value={formData.legalName}
                        onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-bold text-slate-700">Display Trading Name</Label>
                    <Input
                        id="businessName"
                        placeholder="e.g. Apex Industrial Solutions Ltd"
                        className="h-12 bg-slate-50/50 rounded-xl"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cacNumber" className="text-sm font-bold text-slate-700">CAC Registration Number</Label>
                    <Input
                        id="cacNumber"
                        placeholder="RC-1234567"
                        className="h-12 bg-slate-50/50 rounded-xl"
                        value={formData.cacNumber}
                        onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold text-slate-700">Business Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="contact@business.com"
                        className="h-12 bg-slate-50/50 rounded-xl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number</Label>
                    <Input
                        id="phone"
                        placeholder="+234 ..."
                        className="h-12 bg-slate-50/50 rounded-xl"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address" className="text-sm font-bold text-slate-700">Registered Office Address</Label>
                    <Textarea
                        id="address"
                        placeholder="Full physical address..."
                        className="bg-slate-50/50 rounded-xl resize-none min-h-[100px]"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Catalog & Pricing</h2>
                <p className="text-slate-500 mt-2">Define what you sell and how you bill.</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700">Primary Categories (Select all that apply)</Label>
                    <div className="flex flex-wrap gap-2">
                        {['Cleaning Services', 'Electrical', 'Retail Inventory', 'Facility Management', 'Logistics'].map((cat) => (
                            <Badge
                                key={cat}
                                variant={formData.categories.includes(cat) ? 'default' : 'outline'}
                                className={cn(
                                    "px-4 py-2 rounded-full cursor-pointer transition-all border-slate-200",
                                    formData.categories.includes(cat)
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-white text-slate-600 hover:bg-slate-50"
                                )}
                                onClick={() => {
                                    const updated = formData.categories.includes(cat)
                                        ? formData.categories.filter(c => c !== cat)
                                        : [...formData.categories, cat];
                                    setFormData({ ...formData, categories: updated });
                                }}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2 border-r border-slate-100 pr-6">
                        <Label className="text-sm font-bold text-slate-700">Pricing Model</Label>
                        <div className="flex items-center gap-3">
                            <Select
                                value={formData.pricingType}
                                onValueChange={(v: any) => setFormData({ ...formData, pricingType: v })}
                            >
                                <SelectTrigger className="w-[140px] h-12 bg-slate-50/50 rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                                    <SelectItem value="unit">Per Unit</SelectItem>
                                    <SelectItem value="project">Fixed Price</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                                <Input
                                    placeholder="Rate"
                                    className="h-12 pl-8 bg-slate-50/50 rounded-xl"
                                    value={formData.pricingRate}
                                    onChange={(e) => setFormData({ ...formData, pricingRate: e.target.value })}
                                />
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-tight">Average Rate for standard tasks</p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-700">Portfolio / Photos</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/30 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                            <CloudIcon className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                            <div className="text-sm font-bold text-slate-600 group-hover:text-blue-700">Drag & drop work images</div>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">PNG, JPG up to 10MB (max 5 files)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Verification</h2>
                <p className="text-slate-500 mt-2">Upload documents to verify your business legitimacy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-slate-200 rounded-3xl bg-white space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                        {formData.idFile ? (
                            <Badge className="bg-green-100 text-green-700 border-0">Selected</Badge>
                        ) : (
                            <Button variant="link" className="text-xs text-blue-600 font-bold p-0">Upload</Button>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Government Issued ID</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Passport, Driver's license or NIN of primary business owner.
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        id="id-upload"
                        onChange={(e) => setFormData({ ...formData, idFile: e.target.files?.[0] || null })}
                    />
                    <Label htmlFor="id-upload" className="w-full block">
                        <div className="h-10 w-full border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                            {formData.idFile ? formData.idFile.name : 'Select PDF or JPG'}
                        </div>
                    </Label>
                </div>

                <div className="p-6 border border-slate-200 rounded-3xl bg-white space-y-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        {formData.certFile ? (
                            <Badge className="bg-green-100 text-green-700 border-0">Selected</Badge>
                        ) : (
                            <Button variant="link" className="text-xs text-blue-600 font-bold p-0">Upload</Button>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Certifications</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Professional certifications (e.g., HSE, COREN, Health & Safety).
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        id="cert-upload"
                        onChange={(e) => setFormData({ ...formData, certFile: e.target.files?.[0] || null })}
                    />
                    <Label htmlFor="cert-upload" className="w-full block">
                        <div className="h-10 w-full border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">
                            {formData.certFile ? formData.certFile.name : 'Select PDF or JPG'}
                        </div>
                    </Label>
                </div>
            </div>

            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3">
                <Upload className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                    By submitting this form, you agree to BusinessHub's <span className="text-blue-600 font-bold underline cursor-pointer">Vendor Terms of Engagement</span> and background verification process.
                </p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    className="gap-2 text-slate-500 hover:text-slate-900 font-bold"
                    onClick={() => navigate('/dashboard/vendor-management')}
                >
                    <ChevronLeft className="w-4 h-4" /> Exit
                </Button>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span>Vendor Portal</span>
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <span>Help Center</span>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Progress */}
                <div className="w-full lg:w-64 space-y-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">Vendor Onboarding</h1>
                        <p className="text-sm text-slate-500 font-medium">Join our ecosystem of trusted partners.</p>
                    </div>

                    <div className="space-y-2">
                        {steps.map((s) => {
                            const Icon = s.icon;
                            const isPast = currentStep > s.id;
                            const isActive = currentStep === s.id;

                            return (
                                <div
                                    key={s.id}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-2xl transition-all",
                                        isActive ? "bg-white shadow-sm ring-1 ring-slate-200" : "opacity-60"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                        isPast ? "bg-green-100 text-green-600" :
                                            isActive ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" :
                                                "bg-slate-100 text-slate-500"
                                    )}>
                                        {isPast ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Step {s.id}</span>
                                        <span className={cn("text-xs font-bold", isActive ? "text-slate-900" : "text-slate-600")}>{s.label}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* User Assistance Card */}
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-none p-5 rounded-3xl overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                        <div className="relative z-10 space-y-3">
                            <h4 className="text-sm font-bold text-white">Need Assistance?</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                Our onboarding specialized team is available 24/7 to help you with the registration process.
                            </p>
                            <Button variant="outline" className="w-full h-8 text-[11px] font-bold bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-all">
                                Contact Support
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Form Area */}
                <div className="flex-1 flex flex-col">
                    <Card className="flex-1 border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-xl">
                        <CardContent className="p-8 md:p-12 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-hide">
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                        </CardContent>

                        {/* Action Bar */}
                        <div className="p-6 md:px-12 bg-white border-t border-slate-100 flex items-center justify-between rounded-b-3xl">
                            <Button
                                variant="ghost"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="gap-2 font-bold text-slate-500"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </Button>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" className="hidden sm:flex font-bold text-slate-400 hover:text-slate-600">
                                    Save Draft
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className={cn(
                                        "min-w-[140px] h-12 rounded-xl font-bold shadow-lg transition-all",
                                        currentStep === 4
                                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                                            : "bg-slate-900 hover:bg-black text-white"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : currentStep === 4 ? (
                                        'Submit Registration'
                                    ) : (
                                        <>Next Step <ChevronRight className="w-4 h-4 ml-2" /></>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
