import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const vendors = [
    { id: "1", name: "Tayo Adekunle", role: "Structural Engineer", rating: "4.9", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: "2", name: "Mariam Bello", role: "Interior Designer", rating: "5.0", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: "3", name: "John Bassey", role: "Solar Technician", rating: "4.8", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: "4", name: "Peter Okoro", role: "Construction Expert", rating: "4.7", avatar: "https://i.pravatar.cc/150?u=4" }
];

export const VendorGrid = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Our Ecosystem</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Vendor Marketplace & Services</h2>
                <p className="text-slate-500 max-w-2xl mx-auto mb-16">Connect with pre-vetted industry experts and certified service providers handpicked for their dedication to excellence.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vendors.map((vendor, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <img src={vendor.avatar} alt={vendor.name} className="w-full h-full rounded-2xl object-cover" />
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-lg px-2 py-1 shadow-sm border border-slate-100 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-[10px] font-black">{vendor.rating}</span>
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-1">{vendor.name}</h4>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-6">{vendor.role}</p>
                            <Link to={`/marketplace/vendor/${vendor.id}`}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-xl transition-transform active:scale-95">View Profile</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
