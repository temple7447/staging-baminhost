import React from "react";
import { Grid, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
    images: string[];
    onShowAll?: () => void;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, onShowAll }) => {
    // We need at least 5 images for the grid layout in the design
    const displayImages = images.slice(0, 5);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden group relative">
            {/* Large Main Image */}
            <div className="md:col-span-2 md:row-span-2 relative overflow-hidden">
                <img
                    src={displayImages[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"}
                    alt="Property Main"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Grid of smaller images */}
            {displayImages.slice(1, 5).map((src, idx) => (
                <div key={idx} className="relative overflow-hidden hidden md:block">
                    <img
                        src={src}
                        alt={`Property ${idx + 2}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {idx === 3 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Button
                                onClick={onShowAll}
                                variant="outline"
                                className="bg-slate-700 text-slate-100 border-none hover:bg-slate-600 font-bold flex items-center gap-2 rounded-xl"
                            >
                                <Grid className="h-4 w-4" />
                                Show all photos
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            {/* Mobile only overlay button */}
            <div className="absolute bottom-4 right-4 md:hidden">
                <Button
                    onClick={onShowAll}
                    size="sm"
                    variant="outline"
                    className="bg-white text-slate-900 border-none font-bold rounded-xl flex items-center gap-2 shadow-lg"
                >
                    <Maximize2 className="h-4 w-4" />
                    View All
                </Button>
            </div>
        </div>
    );
};
