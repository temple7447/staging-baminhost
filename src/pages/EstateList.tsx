import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Search, MapPin, SlidersHorizontal,
    ChevronDown, LayoutGrid, List,
    ArrowRight, Home, Building2,
    LandPlot, Sparkles, Filter
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const properties = [
    {
        id: "modern-penthouse-victoria-island",
        title: "The Royal Oak: Atlantic Brand",
        location: "Lekki Phase 1, Lagos",
        price: "₦450M",
        type: "Penthouse",
        image: "/images/estate/estate_exterior_modern_1768390624272.png",
        beds: 4,
        baths: 4.5,
        area: "3,200 sqft",
        badge: "Hot Feature"
    },
    {
        id: "sapphire-heights-maitama",
        title: "Sapphire Heights, Maitama",
        location: "Maitama, Abuja",
        price: "₦850M",
        type: "Villa",
        image: "/images/estate/estate_exterior_modern_1768390624272.png",
        beds: 6,
        baths: 7,
        area: "5,500 sqft",
        badge: "New"
    },
    {
        id: "luxe-gardens-ikoyi",
        title: "Luxe Gardens, Ikoyi",
        location: "Ikoyi, Lagos",
        price: "Contact Sales",
        type: "Apartment",
        image: "/images/estate/estate_interior_living_1768390639037.png",
        beds: 3,
        baths: 3,
        area: "2,100 sqft"
    },
    {
        id: "emerald-estates-ajah",
        title: "Emerald Terrace Estates",
        location: "Ajah, Lekki",
        price: "₦120M",
        type: "Terrace",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        beds: 4,
        baths: 4,
        area: "2,800 sqft"
    },
    {
        id: "zen-condos-banana-island",
        title: "Zen Luxury Condos",
        location: "Banana Island, Lagos",
        price: "₦1.2B",
        type: "Condo",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        beds: 5,
        baths: 5,
        area: "4,200 sqft",
        badge: "Premium"
    },
    {
        id: "harvest-farm-eko",
        title: "Harvest Ridge Farmland",
        location: "Epe, Lagos",
        price: "₦45M",
        type: "Land",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        beds: 0,
        baths: 0,
        area: "10 Acres"
    }
];

const EstateList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [propertyType, setPropertyType] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = propertyType === "all" || p.type.toLowerCase() === propertyType.toLowerCase();
            return matchesSearch && matchesType;
        });
    }, [searchQuery, propertyType]);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar variant="light" />

            <main className="container mx-auto px-4 md:px-6 py-8 mt-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                            <Sparkles className="w-3 h-3" /> BamiHost Properties
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 italic tracking-tighter">Explore Premier Estates</h1>
                        <p className="text-slate-500 font-medium">Find your perfect home or investment across our curated collection.</p>
                    </div>
                    <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
                    <div className="md:col-span-5 relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by area, property name or city..."
                            className="w-full h-16 pl-14 pr-6 rounded-2xl border-slate-100 bg-white shadow-sm focus-visible:ring-blue-600 text-lg font-medium"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger className="w-full h-16 rounded-2xl border-slate-100 bg-white shadow-sm font-bold text-slate-700 px-6">
                                <Building2 className="w-5 h-5 mr-3 text-blue-600" />
                                <SelectValue placeholder="Property Type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100 p-2">
                                <SelectItem value="all" className="rounded-xl font-bold py-3">All Properties</SelectItem>
                                <SelectItem value="apartments" className="rounded-xl font-bold py-3">Apartments</SelectItem>
                                <SelectItem value="villa" className="rounded-xl font-bold py-3">Villas</SelectItem>
                                <SelectItem value="land" className="rounded-xl font-bold py-3">Land Plot</SelectItem>
                                <SelectItem value="penthouse" className="rounded-xl font-bold py-3">Penthouses</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-2">
                        <Button variant="outline" className="w-full h-16 rounded-2xl border-slate-100 bg-white shadow-sm font-bold text-slate-700 hover:bg-slate-50 gap-3">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Lagos, NG
                        </Button>
                    </div>
                    <div className="md:col-span-2">
                        <Button className="w-full h-16 rounded-2xl bg-slate-900 border-none hover:bg-slate-800 text-white font-black gap-3 shadow-xl transform active:scale-95 transition-all">
                            <Filter className="w-5 h-5" />
                            Filters
                        </Button>
                    </div>
                </div>

                <Separator className="mb-10 opacity-50" />

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-slate-500 font-bold">
                        Showing <span className="text-slate-900">{filteredProperties.length}</span> results found
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort By:</span>
                        <Select defaultValue="featured">
                            <SelectTrigger className="w-40 border-none bg-transparent font-black text-blue-600 focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-100">
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Property Grid/List */}
                {filteredProperties.length > 0 ? (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                        {filteredProperties.map((property) => (
                            <div key={property.id} className={`group bg-white rounded-[2rem] overflow-hidden border border-slate-100/50 shadow-sm hover:shadow-2xl transition-all duration-500 ${viewMode === "list" ? "flex flex-col md:flex-row h-auto" : ""}`}>
                                {/* Image Container */}
                                <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-2/5 h-64 md:h-auto" : "h-72"}`}>
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {property.badge && (
                                        <Badge className="absolute top-6 left-6 bg-blue-600 text-white font-black px-4 py-2 border-none rounded-xl shadow-lg">
                                            {property.badge}
                                        </Badge>
                                    )}
                                    <div className="absolute bottom-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
                                            {/* Bookmark icon placeholder */}
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`p-8 flex flex-col justify-between ${viewMode === "list" ? "md:w-3/5" : ""}`}>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">{property.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                            {property.title}
                                        </h3>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 py-2">
                                            {property.beds > 0 && (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">Beds</span>
                                                    <span className="text-sm font-bold text-slate-700">{property.beds}</span>
                                                </div>
                                            )}
                                            {property.baths > 0 && (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">Baths</span>
                                                    <span className="text-sm font-bold text-slate-700">{property.baths}</span>
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Size</span>
                                                <span className="text-sm font-bold text-slate-700">{property.area}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 space-y-6">
                                        <Separator className="bg-slate-50" />
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                                                <span className="text-2xl font-black text-blue-600 tracking-tighter italic">{property.price}</span>
                                            </div>
                                            <Link to={`/marketplace/estate/${property.id}`}>
                                                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-6 rounded-2xl gap-2 transition-all transform active:scale-95 shadow-xl shadow-slate-200">
                                                    Details <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner">
                        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">No properties found</h3>
                            <p className="text-slate-500 font-medium">Try adjusting your filters or search query to find more results.</p>
                        </div>
                        <Button
                            onClick={() => { setSearchQuery(""); setPropertyType("all"); }}
                            variant="link"
                            className="text-blue-600 font-black h-auto p-0"
                        >
                            Reset all filters
                        </Button>
                    </div>
                )}

                {/* Pagination Placeholder */}
                {filteredProperties.length > 0 && (
                    <div className="mt-20 flex justify-center">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="w-12 h-12 rounded-xl border-slate-200 p-0 hover:bg-slate-50 disabled:opacity-30" disabled>
                                1
                            </Button>
                            <Button variant="ghost" className="w-12 h-12 rounded-xl text-slate-400 font-bold hover:text-slate-900">
                                2
                            </Button>
                            <Button variant="ghost" className="w-12 h-12 rounded-xl text-slate-400 font-bold hover:text-slate-900">
                                3
                            </Button>
                            <span className="px-2 text-slate-300">...</span>
                            <Button variant="ghost" className="w-12 h-12 rounded-xl text-slate-400 font-bold hover:text-slate-900">
                                12
                            </Button>
                            <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 font-bold hover:bg-slate-50 text-slate-700">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </main>

            <Footer variant="light" />
        </div>
    );
};

export default EstateList;
