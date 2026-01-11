import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EstateHero } from "@/components/estate/EstateHero";
import { RentalTabs } from "@/components/estate/RentalTabs";
import { RentalCard } from "@/components/estate/RentalCard";
import { FeaturesSection } from "@/components/estate/FeaturesSection";
import { ReadyToListCta } from "@/components/estate/ReadyToListCta";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Types
interface Rental {
    id: string;
    title: string;
    image: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    type: "apartment" | "house" | "shortlet" | "service";
    isNew?: boolean;
}

// Demo Data Generator
const generateDemoData = (): Rental[] => {
    const types: ("apartment" | "house" | "shortlet" | "service")[] = ["apartment", "house", "shortlet", "service"];
    const locations = ["Lekki Phase 1, Lagos", "Maitama, Abuja", "Victoria Island, Lagos", "Ikeja GRA, Lagos", "Bodija, Ibadan", "Asokoro, Abuja"];
    const titles = [
        "Oceanview Contemporary Villa",
        "Willow Creek Family Estate",
        "Downtown Skyline Apartment",
        "Serene Garden Duplex",
        "Luxury Penthouse Suite",
        "Modern Suburban Home",
        "Cozy Shortlet Studio",
        "Executive Service Apartment"
    ];
    const images = [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=70",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=70",
        "https://images.unsplash.com/photo-1600607687940-4e230007a6d9?auto=format&fit=crop&w=800&q=70",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=70",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=70"
    ];

    return Array.from({ length: 120 }, (_, i) => ({
        id: `rental-${i}`,
        title: titles[i % titles.length] + (i > 7 ? ` ${Math.floor(i / 8) + 1}` : ""),
        image: images[i % images.length],
        price: `₦${(250000 + (i * 15000) % 750000).toLocaleString()}/mo`,
        location: locations[i % locations.length],
        beds: (i % 4) + 1,
        baths: (i % 3) + 1,
        type: types[i % types.length],
        isNew: i < 12
    }));
};

const RENTALS_DATA = generateDemoData();

const EstateMarketplace = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [visibleCount, setVisibleCount] = useState(12);

    // Performance: Memoize filtered rentals
    const filteredRentals = useMemo(() => {
        if (activeTab === "all") return RENTALS_DATA;
        return RENTALS_DATA.filter(rental => rental.type === activeTab);
    }, [activeTab]);

    // Reset visible count when tab changes
    useEffect(() => {
        setVisibleCount(12);
    }, [activeTab]);

    const displayedRentals = useMemo(() => {
        return filteredRentals.slice(0, visibleCount);
    }, [filteredRentals, visibleCount]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar variant="light" />

            <main>
                {/* Hero Section */}
                <EstateHero />

                {/* Filters and Tabs */}
                <div className="container mx-auto px-6 mt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            Featured Rentals
                        </h2>
                        <RentalTabs activeTab={activeTab} onTabChange={setActiveTab} />
                        <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50">
                            View All Rentals <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Rentals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
                        {displayedRentals.map((rental) => (
                            <RentalCard
                                key={rental.id}
                                id={rental.id}
                                title={rental.title}
                                image={rental.image}
                                price={rental.price}
                                location={rental.location}
                                beds={rental.beds}
                                baths={rental.baths}
                                isNew={rental.isNew}
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    {visibleCount < filteredRentals.length && (
                        <div className="flex justify-center pb-20">
                            <Button
                                onClick={loadMore}
                                size="lg"
                                variant="outline"
                                className="rounded-full px-12 py-6 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                            >
                                Load More Apartments
                            </Button>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <FeaturesSection />

                {/* List a Rental CTA */}
                <ReadyToListCta />
            </main>

            <Footer variant="light" />
        </div>
    );
};

export default EstateMarketplace;
