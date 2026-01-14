import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceHero } from "@/components/estate/MarketplaceHero";
import { EstateProperties } from "@/components/estate/EstateProperties";
import { EnergyHubs } from "@/components/estate/EnergyHubs";
import { VendorGrid } from "@/components/estate/VendorGrid";
import { MachinerySection } from "@/components/estate/MachinerySection";
import { FarmLands } from "@/components/estate/FarmLands";
import { ManagedServices } from "@/components/estate/ManagedServices";

const EstateMarketplace = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar variant="light" />

            <main>
                <MarketplaceHero />
                <EstateProperties />
                <EnergyHubs />
                <VendorGrid />
                <MachinerySection />
                <FarmLands />
                <ManagedServices />
            </main>

            <Footer variant="dark" />
        </div>
    );
};

export default EstateMarketplace;
