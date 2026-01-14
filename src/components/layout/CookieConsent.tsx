import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CookieSettingsModal } from "./CookieSettingsModal";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsent = (type: "accept" | "reject" | "customize") => {
        if (type === "customize") {
            setIsModalOpen(true);
        } else {
            const settings = {
                essential: true,
                analytical: type === "accept",
                marketing: type === "accept",
            };
            localStorage.setItem("cookie-consent", JSON.stringify(settings));
            setIsVisible(false);
        }
    };

    const handleSaveSettings = (settings: any) => {
        localStorage.setItem("cookie-consent", JSON.stringify(settings));
        setIsVisible(false);
        setIsModalOpen(false);
    };

    if (!isVisible && !isModalOpen) return null;

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-500 max-w-sm w-full px-4 sm:px-0">
                    <Card className="p-6 bg-white/95 backdrop-blur-md border-slate-200 shadow-2xl space-y-4 text-slate-900">
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                                We respect your privacy
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Cookies help us improve your experience, deliver personalized content, and analyze traffic.
                                You can choose which cookies to allow by clicking <span className="text-blue-600 font-semibold">Customize</span>.
                                Click <span className="text-blue-600 font-semibold">Accept All</span> to consent or <span className="text-blue-600 font-semibold">Reject All</span> to decline non-essential cookies.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-slate-300 hover:bg-slate-50 font-medium"
                                onClick={() => handleConsent("customize")}
                            >
                                Customize
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-slate-300 hover:bg-slate-50 font-medium"
                                onClick={() => handleConsent("reject")}
                            >
                                Reject All
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="w-full col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5"
                                onClick={() => handleConsent("accept")}
                            >
                                Accept All
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 pt-2 opacity-60">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Powered by</span>
                            <div className="flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-slate-800" />
                                <span className="text-[11px] font-black text-slate-800 italic">CookieAdmin</span>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <CookieSettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSettings}
            />
        </>
    );
};
