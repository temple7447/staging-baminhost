import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Upload, MapPin, Info, DollarSign, Bed, Bath, Maximize2, CheckCircle2, X, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCreateEstateUnitMutation, useGetEstateQuery } from "@/services/estatesApi";
import { useUploadImageMutation } from "@/services/uploadApi";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export const AddPropertyPage = () => {
    const { estateId } = useParams();
    const navigate = useNavigate();
    const { data: estate } = useGetEstateQuery(estateId as string, { skip: !estateId });
    const [createUnit, { isLoading: isPublishing }] = useCreateEstateUnitMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Apartment");
    const [listingType, setListingType] = useState("Rent");

    const [monthlyRent, setMonthlyRent] = useState("");
    const [securityDeposit, setSecurityDeposit] = useState("");
    const [cautionFee, setCautionFee] = useState("");
    const [legalFee, setLegalFee] = useState("");
    const [serviceCharge, setServiceCharge] = useState("");
    const [availableDate, setAvailableDate] = useState("");

    const [bedrooms, setBedrooms] = useState("1");
    const [bathrooms, setBathrooms] = useState("1");
    const [area, setArea] = useState("");

    const [amenities, setAmenities] = useState<string[]>([]);
    const [address, setAddress] = useState("");
    const [meterNumber, setMeterNumber] = useState("");
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const amenitiesList = [
        "Wi-Fi", "Pool", "Gym",
        "Parking", "AC", "Security",
        "Pet Friendly", "Balcony", "Laundry"
    ];

    const toggleAmenity = (amenity: string) => {
        setAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        try {
            const response = await uploadImage(file).unwrap();
            if (response.success) {
                setUploadedImages(prev => [...prev, response.data.secure_url]);
                toast({ title: "Image Uploaded", description: "Your property image has been added successfully." });
            }
        } catch (err) {
            toast({ title: "Upload Failed", description: "Failed to upload image. Please try again.", variant: "destructive" });
        }
    };

    const removeImage = (url: string) => {
        setUploadedImages(prev => prev.filter(img => img !== url));
    };

    const handlePublish = async () => {
        if (!title || !monthlyRent) {
            toast({ title: "Validation Error", description: "Please fill in the title and monthly rent.", variant: "destructive" });
            return;
        }

        try {
            await createUnit({
                estateId: estateId as string,
                body: {
                    label: title,
                    monthlyPrice: Number(monthlyRent),
                    serviceChargeMonthly: Number(serviceCharge) || undefined,
                    cautionFee: Number(cautionFee) || undefined,
                    legalFee: Number(legalFee) || undefined,
                    securityDeposit: Number(securityDeposit) || undefined,
                    category: category,
                    listingType: listingType,
                    description: description,
                    availableDate: availableDate,
                    bedrooms: Number(bedrooms) || 0,
                    bathrooms: Number(bathrooms) || 0,
                    area: Number(area) || 0,
                    streetAddress: address,
                    amenities: {
                        wifi: amenities.includes("Wi-Fi"),
                        pool: amenities.includes("Pool"),
                        gym: amenities.includes("Gym"),
                        parking: amenities.includes("Parking"),
                        ac: amenities.includes("AC"),
                        security: amenities.includes("Security"),
                        petFriendly: amenities.includes("Pet Friendly"),
                        balcony: amenities.includes("Balcony"),
                        laundry: amenities.includes("Laundry")
                    },
                    meterNumber: meterNumber || undefined,
                    images: uploadedImages,
                    features: [
                        { name: "Bedrooms", value: bedrooms },
                        { name: "Bathrooms", value: bathrooms },
                        { name: "Area", value: area ? `${area} sqft` : "" }
                    ].filter(f => f.value)
                }
            }).unwrap();

            toast({ title: "Success!", description: "New property unit has been published." });
            navigate(`/dashboard/estate/${estateId}`);
        } catch (err) {
            toast({ title: "Error", description: "Failed to publish listing. Please try again.", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Top Bar */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">List New Property</h1>
                            <p className="text-xs text-slate-500 font-medium">Fill in the details below to publish a new rental listing.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl border-slate-200" onClick={() => navigate(-1)}>Discard</Button>
                        <Button variant="outline" className="rounded-xl border-blue-600 text-blue-600 font-bold hover:bg-blue-50">Save Draft</Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-10 max-w-5xl">
                <div className="grid gap-8">

                    {/* Basic Information */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Info className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Basic Information</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-700 font-bold">Property Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Modern Penthouse in Victoria Island"
                                    className="h-14 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg font-medium"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc" className="text-slate-700 font-bold">Description</Label>
                                <Textarea
                                    id="desc"
                                    placeholder="Describe the property's key features, lifestyle, and unique selling points..."
                                    className="min-h-[150px] rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-base leading-relaxed"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50/50">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100">
                                            <SelectItem value="Apartment">Apartment</SelectItem>
                                            <SelectItem value="Villa">Villa</SelectItem>
                                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                                            <SelectItem value="Condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 font-bold">Listing Type</Label>
                                    <Select value={listingType} onValueChange={setListingType}>
                                        <SelectTrigger className="h-14 rounded-xl border-slate-100 bg-slate-50/50">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100">
                                            <SelectItem value="Rent">Rent</SelectItem>
                                            <SelectItem value="Sale">Sale</SelectItem>
                                            <SelectItem value="Lease">Lease</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing & Availability */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <DollarSign className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Pricing & Availability</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Monthly Rent (₦)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                                    <Input
                                        type="number"
                                        className="h-14 pl-10 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 4,500,000"
                                        value={monthlyRent}
                                        onChange={(e) => setMonthlyRent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Service Charge (₦)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                                    <Input
                                        type="number"
                                        className="h-14 pl-10 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 50,000"
                                        value={serviceCharge}
                                        onChange={(e) => setServiceCharge(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Caution Fee (₦)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                                    <Input
                                        type="number"
                                        className="h-14 pl-10 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 500,000"
                                        value={cautionFee}
                                        onChange={(e) => setCautionFee(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Legal Fee (₦)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                                    <Input
                                        type="number"
                                        className="h-14 pl-10 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 30,000"
                                        value={legalFee}
                                        onChange={(e) => setLegalFee(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Security Deposit (₦)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                                    <Input
                                        type="number"
                                        className="h-14 pl-10 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 500,000"
                                        value={securityDeposit}
                                        onChange={(e) => setSecurityDeposit(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Available Date</Label>
                                <Input
                                    type="date"
                                    className="h-14 rounded-xl border-slate-100 bg-slate-50/50"
                                    value={availableDate}
                                    onChange={(e) => setAvailableDate(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Property Details */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Maximize2 className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Property Details</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Bedrooms</Label>
                                <div className="relative">
                                    <Bed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50/50"
                                        value={bedrooms}
                                        onChange={(e) => setBedrooms(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Bathrooms</Label>
                                <div className="relative">
                                    <Bath className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50/50"
                                        value={bathrooms}
                                        onChange={(e) => setBathrooms(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Area (sqft)</Label>
                                <div className="relative">
                                    <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        className="h-14 pl-12 rounded-xl border-slate-100 bg-slate-50/50"
                                        placeholder="e.g. 1200"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Meter Number</Label>
                                <Input
                                    placeholder="e.g. EN-55443322"
                                    className="h-14 rounded-xl border-slate-100 bg-slate-50/50"
                                    value={meterNumber}
                                    onChange={(e) => setMeterNumber(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Amenities */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <CheckCircle2 className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Amenities</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenitiesList.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => toggleAmenity(item)}
                                        className={cn(
                                            "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                                            amenities.includes(item)
                                                ? "bg-blue-50 border-blue-200 text-blue-700 font-bold"
                                                : "bg-slate-50/50 border-slate-100 text-slate-600 font-medium hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                                            amenities.includes(item) ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300"
                                        )}>
                                            {amenities.includes(item) && <X className="w-3 h-3 text-white" />}
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <MapPin className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Location</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold">Street Address</Label>
                                <Input
                                    placeholder="e.g. 123 Luxury Lane, Victoria Island"
                                    className="h-14 rounded-xl border-slate-100 bg-slate-50/50"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden border border-slate-100 h-64 bg-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                                    alt="Map placeholder"
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-sm">
                                        <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                                        <h4 className="font-bold text-slate-900">Interactive Map Preview</h4>
                                        <p className="text-sm text-slate-500 mt-1">Drag the marker to pinpoint the exact property location.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media Upload */}
                    <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-white border-b border-slate-50 px-8 py-6">
                            <div className="flex items-center gap-2 text-blue-600">
                                <Upload className="w-5 h-5" />
                                <CardTitle className="text-lg font-bold">Media Upload</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/30 hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group"
                            >
                                <input
                                    type="file"
                                    id="image-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                                    {isUploading ? (
                                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                    ) : (
                                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-white" />
                                    )}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900">
                                    {isUploading ? "Uploading image..." : "Drag and drop photos here"}
                                </h4>
                                <p className="text-slate-500 text-sm mt-1">or click to browse from your computer</p>
                                <div className="flex gap-4 mt-6">
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-slate-400 px-3 py-1">JPG, PNG up to 10MB</Badge>
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-slate-400 px-3 py-1">MIN 1200x1200px</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {uploadedImages.map((url, idx) => (
                                    <div key={idx} className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative group">
                                        <img src={url} className="w-full h-full object-cover" alt={`preview-${idx}`} />
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <X className="text-white w-6 h-6 cursor-pointer" onClick={(e) => { e.stopPropagation(); removeImage(url); }} />
                                        </div>
                                    </div>
                                ))}
                                <div
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer group"
                                >
                                    <Plus className="w-8 h-8 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-4 mt-4">
                        <Button variant="outline" className="h-14 px-10 rounded-2xl font-bold text-slate-600 border-slate-100 bg-white shadow-sm" onClick={() => navigate(-1)}>
                            Save as Draft
                        </Button>
                        <Button
                            className="h-14 px-12 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 transition-all active:scale-95"
                            onClick={handlePublish}
                            disabled={isPublishing}
                        >
                            {isPublishing ? "Publishing..." : "Publish Listing"}
                        </Button>
                    </div>

                </div>
            </div>


        </div>
    );
};


