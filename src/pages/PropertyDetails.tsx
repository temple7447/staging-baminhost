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
    Home
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyGallery } from "@/components/estate/PropertyGallery";
import { PropertyAgentSidebar } from "@/components/estate/PropertyAgentSidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock Data for a single property
const PROPERTY_DATA = {
    id: "modern-penthouse-victoria-island",
    title: "Modern Penthouse in Downtown",
    location: "Victoria Island, Lagos, Nigeria",
    price: "₦4,500,000/mo",
    status: "Available Now",
    beds: 3,
    baths: 2,
    sqft: 1200,
    about: `Experience luxury living at its finest in this breathtaking modern penthouse situated in the heart of Victoria Island. This stunning 3-bedroom residence features floor-to-ceiling windows that flood the open-concept living space with natural light and offer panoramic city views.

The gourmet kitchen is equipped with top-of-the-line stainless steel appliances, marble countertops, and a custom breakfast bar. Each bedroom offers generous closet space, while the master suite includes a private terrace and a spa-like ensuite bathroom.`,
    amenities: [
        { icon: <Wifi className="h-5 w-5" />, label: "High-speed Wi-Fi" },
        { icon: <Car className="h-5 w-5" />, label: "Secure Parking" },
        { icon: <Dog className="h-5 w-5" />, label: "Pet Friendly" },
        { icon: <Dumbbell className="h-5 w-5" />, label: "24/7 Fitness Gym" },
        { icon: <UserCheck className="h-5 w-5" />, label: "Concierge Service" },
        { icon: <Wind className="h-5 w-5" />, label: "Central Cooling" },
        { icon: <Waves className="h-5 w-5" />, label: "Rooftop Pool" },
        { icon: <Square className="h-5 w-5" />, label: "Private Balcony" },
        { icon: <Home className="h-5 w-5" />, label: "In-unit Laundry" },
    ],
    images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687940-4e230007a6d9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    ],
    agent: {
        name: "Jonathan Miller",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        reviews: 42,
        rating: 5,
    }
};

const PropertyDetails = () => {
    const { id } = useParams();

    // In a real app, you'd fetch data based on ID
    const property = PROPERTY_DATA;

    const handleShowAll = () => {
        toast.info("Viewing all 24 photos of this premium penthouse!");
    };

    const handleExploreArea = () => {
        toast.info("Opening neighborhood guide for Victoria Island...");
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <Navbar variant="light" />

            <main className="container mx-auto px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link to="/marketplace/estate" className="hover:text-blue-600 transition-colors">Lagos</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-slate-900">Victoria Island</span>
                </nav>

                {/* Gallery */}
                <div className="mb-10">
                    <PropertyGallery images={property.images} onShowAll={handleShowAll} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-3">
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                    <span>{property.location}</span>
                                </div>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-3xl font-black text-blue-600">{property.price}</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{property.status}</p>
                            </div>
                        </div>

                        {/* Quick Features */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-8">
                            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50">
                                <div className="p-2.5 bg-blue-100 rounded-xl">
                                    <Bed className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bedrooms</p>
                                    <p className="text-base font-bold text-slate-900">{property.beds} Beds</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50">
                                <div className="p-2.5 bg-blue-100 rounded-xl">
                                    <Bath className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bathrooms</p>
                                    <p className="text-base font-bold text-slate-900">{property.baths} Baths</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100/50">
                                <div className="p-2.5 bg-blue-100 rounded-xl">
                                    <Maximize className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Living Area</p>
                                    <p className="text-base font-bold text-slate-900">{property.sqft.toLocaleString()} sqft</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Description */}
                        <section className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900">About this property</h3>
                            <div className="text-slate-500 leading-relaxed font-medium space-y-4">
                                {property.about.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </section>

                        <div className="border-t border-slate-100" />

                        {/* Amenities */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900">What this place offers</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                {property.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                        <span className="text-blue-600">{amenity.icon}</span>
                                        {amenity.label}
                                    </div>
                                ))}
                            </div>
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
                            <PropertyAgentSidebar agent={property.agent} />
                        </div>
                    </aside>
                </div>
            </main>

            <Footer variant="light" />
        </div>
    );
};

export default PropertyDetails;
