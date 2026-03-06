import React from "react";
import { ShieldCheck, Key, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturesSection = () => {
    const features = [
        {
            icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
            title: "Verified Rentals",
            desc: "Every rental on our platform is manually verified to protect you from fraudulent agents and double-listing."
        },
        {
            icon: <Key className="h-8 w-8 text-blue-600" />,
            title: "Instant Viewings",
            desc: "Schedule a walk-through with verified owners at your convenience directly from the app."
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            title: "Digital Agreements",
            desc: "Secure your rental with legally binding digital tenancy agreements and simplified payment terms."
        }
    ];

    return (
        <div className="py-20 bg-slate-800/50">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-3xl p-4">
                            <CardContent className="pt-8 text-center space-y-6">
                                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {feature.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
