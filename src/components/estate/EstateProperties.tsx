import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetPublicListingsQuery } from "@/services/estatesApi";

export const EstateProperties = () => {
    const { data: response, isLoading } = useGetPublicListingsQuery({ limit: 3 });
    const properties = response?.data || [];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Portfolio</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Estate Properties & Associates</h2>
                        <p className="text-slate-500 max-w-xl">Curated residential and commercial spaces designed for high-impact living and working environments.</p>
                    </div>
                    <Link to="/marketplace/estate/all">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-6 group">
                            Explore Assets <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Fetching premium properties...</p>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-bold">No public listings available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {properties.map((property, i) => (
                            <div key={property.id || property._id} className="group cursor-pointer">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src={property.images && property.images.length > 0 ? property.images[0] : "/images/estate/estate_exterior_modern_1768390624272.png"}
                                        alt={property.label}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-blue-600 shadow-sm border border-blue-100">Hot Feature</div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{property.label}</h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    <span>{property.streetAddress || "Lagos, Nigeria"}</span>
                                    <span className="text-slate-300 mx-1">•</span>
                                    <span className="font-bold text-blue-600">
                                        {property.monthlyPrice ? `₦${property.monthlyPrice.toLocaleString()}` : "Contact Sales"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="border-blue-100 text-blue-600 font-bold hover:bg-blue-50 py-5">Schedule Tour</Button>
                                    <Link to={`/marketplace/estate/${property.id || property._id}`}>
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5">View Details</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-16">
                    <Link to="/marketplace/estate/all">
                        <Button variant="outline" className="border-slate-200 text-slate-900 font-bold px-12 py-7 rounded-2xl hover:bg-slate-50 transition-all group">
                            See more properties
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
