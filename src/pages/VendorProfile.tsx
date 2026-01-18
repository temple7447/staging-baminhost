import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
    Star, MapPin, Clock, ShieldCheck,
    ArrowLeft, Info, Calendar as CalendarIcon,
    Send, CheckCircle2, AlertCircle, Loader2
} from "lucide-react";
import { useGetPublicVendorQuery } from "@/services/vendorsApi";
import { cn } from "@/lib/utils";

const services = [
    { id: "s1", name: "General Consultation", price: 5500, desc: "Standard architectural or structural review." },
    { id: "s2", name: "Site Inspection", price: 15000, desc: "Detailed on-site evaluation and reporting." },
    { id: "s3", name: "Technical Drawing Review", price: 8000, desc: "Deep analysis of existing structural plans." },
    { id: "s4", name: "Project Management", price: 25000, desc: "Full coordination of construction phases." }
];

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

const VendorProfile = () => {
    const { id } = useParams();
    const { data: vendorData, isLoading } = useGetPublicVendorQuery(id || "");
    const vendor = vendorData?.data;

    const [selectedServices, setSelectedServices] = useState<string[]>(["s1"]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState("11:00 AM");
    const [quantity, setQuantity] = useState(1);

    const subtotal = useMemo(() => {
        return services
            .filter(s => selectedServices.includes(s.id))
            .reduce((acc, curr) => acc + curr.price, 0) * quantity;
    }, [selectedServices, quantity]);

    const serviceFee = subtotal * 0.1;
    const total = subtotal + serviceFee;

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar variant="light" />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                <Footer variant="dark" />
            </div>
        );
    }

    if (!vendor) return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant="light" />
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h2 className="text-2xl font-bold">Vendor not found</h2>
                <Link to="/marketplace/estate">
                    <Button variant="outline">Back to Marketplace</Button>
                </Link>
            </div>
            <Footer variant="dark" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar variant="light" />

            <div className="container mx-auto px-4 md:px-6 py-8 mt-20">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-hidden whitespace-nowrap">
                    <Link to="/marketplace/estate" className="hover:text-blue-600">Marketplace</Link>
                    <span>/</span>
                    <span className="opacity-60">{vendor.specialization || 'Service Provider'}s</span>
                    <span>/</span>
                    <span className="font-bold text-slate-900 truncate">{vendor.businessName || vendor.name}</span>
                </div>

                <Link to="/marketplace/estate" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Marketplace
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Vendor Header */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                                <div className="w-full h-full rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-4xl uppercase">
                                    {vendor.name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-black text-slate-900">{vendor.businessName || vendor.name}</h1>
                                    <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-none font-black px-3 py-1">
                                        <Star className="w-3 h-3 fill-blue-600 mr-1" /> 4.9 (128 reviews)
                                    </Badge>
                                </div>
                                <p className="text-slate-600 leading-relaxed italic max-w-xl">
                                    {vendor.specialization || 'Authorized service provider dedicated to high-scale estate developments and structural excellence.'}
                                </p>
                                <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500">
                                    <div className="flex items-center gap-2 font-medium">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        <span>{vendor.businessAddress || 'Lagos, Nigeria'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-medium">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-medium">
                                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                                        <span>Verified Pro</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Choose Services */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Info className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Choose Services</h2>
                            </div>
                            <div className="space-y-4">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => {
                                            setSelectedServices(prev =>
                                                prev.includes(service.id)
                                                    ? prev.filter(id => id !== service.id)
                                                    : [...prev, service.id]
                                            );
                                        }}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group",
                                            selectedServices.includes(service.id)
                                                ? "border-blue-600 bg-blue-50/30"
                                                : "border-slate-100 bg-slate-50/30 hover:border-slate-300"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                checked={selectedServices.includes(service.id)}
                                                className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-blue-600"
                                            />
                                            <div className="space-y-1">
                                                <div className="font-bold text-slate-900">{service.name}</div>
                                                <div className="text-xs text-slate-500">{service.desc}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-slate-900 italic">₦{service.price.toLocaleString()}</div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400">Fixed Rate</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date & Time Selection */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Select Date & Time</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-2xl border border-slate-100"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Available Time Slots</div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                onClick={() => setSelectedTime(slot)}
                                                className={cn(
                                                    "py-4 rounded-xl text-sm font-bold border transition-all",
                                                    selectedTime === slot
                                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                                                        : "bg-white border-slate-100 text-slate-600 hover:border-blue-300"
                                                )}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <Send className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Specific Instructions</h2>
                            </div>
                            <Textarea
                                placeholder="State any specific structural needs or site access requirements..."
                                className="min-h-[150px] rounded-2xl border-slate-100 bg-slate-50/50 p-6 focus-visible:ring-blue-600"
                            />
                        </div>
                    </div>

                    {/* Right Column (Summary Sidebar) */}
                    <div className="space-y-6">
                        <Card className="p-0 rounded-[2.5rem] overflow-hidden border-none shadow-2xl sticky top-28">
                            <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                <h3 className="text-2xl font-black italic tracking-tight">Service Summary</h3>
                                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Estimated cost for your booking</p>
                            </div>
                            <div className="p-8 space-y-6 bg-white">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-sm font-bold text-slate-600">Hours/Units</div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black hover:bg-slate-50"
                                        >-</button>
                                        <span className="font-black text-slate-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black hover:bg-blue-500"
                                        >+</button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-bold">Subtotal</span>
                                        <span className="text-slate-900 font-black">₦{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-bold">Service Fee (10%)</span>
                                        <span className="text-slate-900 font-black">₦{serviceFee.toLocaleString()}</span>
                                    </div>
                                    <Separator className="bg-slate-50" />
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Estimated Cost</div>
                                            <div className="text-3xl font-black text-blue-600 italic leading-none">₦{total.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-8 rounded-[1.5rem] text-lg shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95">
                                        <CheckCircle2 className="w-5 h-5 mr-2" /> Confirm Booking
                                    </Button>
                                    <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                                        By confirming, you agree to our <Link to="#" className="text-blue-500 underline">Terms of Service</Link> and payment policies.
                                    </p>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-900 uppercase">Secure Payment</div>
                                            <div className="text-[9px] text-slate-500">Your information is always encrypted.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-900 uppercase">Free Rescheduling</div>
                                            <div className="text-[9px] text-slate-500">Change time or date up to 24h before.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer variant="dark" />
        </div>
    );
};

export default VendorProfile;
