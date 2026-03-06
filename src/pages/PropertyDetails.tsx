import { useParams, Link } from "react-router-dom";
import {
    ChevronRight,
    Bed,
    Bath,
    Maximize,
    Wifi,
    Car,
    Dog,
    Dumbbell,
    UserCheck,
    Wind,
    Waves,
    Square,
    MapPin,
    Compass,
    Home,
    Loader2,
    AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyGallery } from "@/components/estate/PropertyGallery";
import { PropertyAgentSidebar } from "@/components/estate/PropertyAgentSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers/ToastProvider";
import { useGetPublicListingByIdQuery } from "@/services/estatesApi";

const AMENITY_MAP = {
    wifi: { icon: <Wifi className="h-5 w-5" />, label: "High-speed Wi-Fi" },
    parking: { icon: <Car className="h-5 w-5" />, label: "Secure Parking" },
    petFriendly: { icon: <Dog className="h-5 w-5" />, label: "Pet Friendly" },
    gym: { icon: <Dumbbell className="h-5 w-5" />, label: "24/7 Fitness Gym" },
    security: { icon: <UserCheck className="h-5 w-5" />, label: "Concierge Service" },
    ac: { icon: <Wind className="h-5 w-5" />, label: "Central Cooling" },
    pool: { icon: <Waves className="h-5 w-5" />, label: "Rooftop Pool" },
    balcony: { icon: <Square className="h-5 w-5" />, label: "Private Balcony" },
    laundry: { icon: <Home className="h-5 w-5" />, label: "In-unit Laundry" },
};

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: response, isLoading, error } = useGetPublicListingByIdQuery(id || "");
    const property = response?.data;
    const { info } = useToast();

    const handleShowAll = () => {
        info(`Viewing all ${property?.images?.length || 0} photos of this premium property!`);
    };

    const handleExploreArea = () => {
        info(`Opening neighborhood guide for ${property?.streetAddress || property?.label}...`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar variant="light" />
                <div className="flex flex-col items-center justify-center py-40">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold text-xl tracking-tight">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar variant="light" />
                <div className="container mx-auto px-6 py-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">Property Not Found</h2>
                    <p className="text-slate-500 max-w-md mx-auto">We couldn't find the property you're looking for. It may have been moved or is no longer available.</p>
                    <Link to="/marketplace/estate">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-6 rounded-2xl">
                            Back to Marketplace
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Transform amenities object to array
    const propertyAmenities = property.amenities
        ? Object.entries(property.amenities)
            .filter(([_, value]) => value === true)
            .map(([key, _]) => AMENITY_MAP[key as keyof typeof AMENITY_MAP])
            .filter(Boolean)
        : [];

    const displayImages = property.images && property.images.length > 0
        ? property.images
        : ["/images/estate/estate_exterior_modern_1768390624272.png"];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <Navbar variant="light" />

            <main className="container mx-auto px-6 py-8 mt-20">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-400 mb-8">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link to="/marketplace/estate" className="hover:text-blue-600 transition-colors">Marketplace</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-slate-900 truncate max-w-[200px]">{property.label}</span>
                </nav>

                {/* Gallery */}
                <div className="mb-10">
                    <PropertyGallery images={displayImages} onShowAll={handleShowAll} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                    {property.label}
                                </h1>
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span>{property.streetAddress || "Lagos, Nigeria"}</span>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-3xl font-black text-blue-600">
                                    {property.monthlyPrice ? `₦${property.monthlyPrice.toLocaleString()}/mo` : "Contact Sales"}
                                </p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                                    {property.listingType || "Available Now"}
                                </p>
                            </div>
                        </div>

                        {/* Quick Features */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-8">
                            <div className="flex items-center gap-4 bg-slate-700 px-6 py-4 rounded-2xl border border-slate-600">
                                <div className="p-2.5 bg-slate-800 rounded-xl">
                                    <Bed className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bedrooms</p>
                                    <p className="text-base font-bold text-slate-100">{property.bedrooms || 0} Beds</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-700 px-6 py-4 rounded-2xl border border-slate-600">
                                <div className="p-2.5 bg-slate-800 rounded-xl">
                                    <Bath className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bathrooms</p>
                                    <p className="text-base font-bold text-slate-100">{property.bathrooms || 0} Baths</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-700 px-6 py-4 rounded-2xl border border-slate-600">
                                <div className="p-2.5 bg-slate-800 rounded-xl">
                                    <Maximize className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Living Area</p>
                                    <p className="text-base font-bold text-slate-100">
                                        {property.area ? `${property.area.toLocaleString()} sqft` : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Description */}
                        <section className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900">About this property</h3>
                            <div className="text-slate-500 leading-relaxed font-medium space-y-4">
                                {property.description ? (
                                    property.description.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))
                                ) : (
                                    <p>Experience luxury living at its finest in this breathtaking property. Meticulously designed for high-impact living and working environments.</p>
                                )}
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        {/* Amenities */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900">What this place offers</h3>
                            {propertyAmenities.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                    {propertyAmenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                            <span className="text-blue-600">{amenity.icon}</span>
                                            {amenity.label}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 italic">No specific amenities listed.</p>
                            )}
                        </section>

                        <div className="border-t border-slate-100" />

                        {/* Location / Map Placeholder */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900">Location</h3>
                            <div className="relative rounded-3xl overflow-hidden h-[400px] border border-slate-100 shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
                                    alt="Map Placeholder"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />

                                {/* Neighborhood Guide Overlay */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-600 rounded-xl">
                                                <Compass className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h5 className="font-black text-slate-900">Neighborhood Guide</h5>
                                                <p className="text-xs font-bold text-slate-500">Walk score: 92/100 (Walker's Paradise)</p>
                                            </div>
                                        </div>
                                        <Button onClick={handleExploreArea} variant="ghost" className="text-blue-600 font-black hover:bg-blue-50">
                                            Explore Area
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <PropertyAgentSidebar agent={{
                                name: "Jonathan Miller",
                                image: "https://i.pravatar.cc/150?u=jonathan",
                                reviews: 42,
                                rating: 5,
                            }} />
                        </div>
                    </aside>
                </div>
            </main>

            <Footer variant="light" />
        </div>
    );
};

export default PropertyDetails;
