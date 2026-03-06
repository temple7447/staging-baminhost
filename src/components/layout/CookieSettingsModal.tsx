import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Info } from "lucide-react";

interface CookieSettings {
    essential: boolean;
    analytical: boolean;
    marketing: boolean;
}

interface CookieSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (settings: CookieSettings) => void;
    initialSettings?: CookieSettings;
}

export const CookieSettingsModal = ({
    isOpen,
    onClose,
    onSave,
    initialSettings = { essential: true, analytical: true, marketing: true },
}: CookieSettingsModalProps) => {
    const [settings, setSettings] = useState<CookieSettings>(initialSettings);

    const handleToggle = (key: keyof CookieSettings) => {
        if (key === "essential") return; // Cannot toggle essential
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <ShieldCheck className="w-6 h-6" />
                        <DialogTitle className="text-xl font-bold">Cookie Settings</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-600 text-sm leading-relaxed text-left">
                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Save Preferences", you consent to our use of cookies based on your selections.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Essential */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">Essential Cookies</span>
                                <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Required</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Necessary for the website to function. They provide basic features like security, network management, and accessibility.
                            </p>
                        </div>
                        <Switch checked={true} disabled={true} className="data-[state=checked]:bg-blue-600" />
                    </div>

                    {/* Analytical */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">Analytical Cookies</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                            </p>
                        </div>
                        <Switch
                            checked={settings.analytical}
                            onCheckedChange={() => handleToggle("analytical")}
                            className="data-[state=checked]:bg-blue-600"
                        />
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">Marketing Cookies</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                            </p>
                        </div>
                        <Switch
                            checked={settings.marketing}
                            onCheckedChange={() => handleToggle("marketing")}
                            className="data-[state=checked]:bg-blue-600"
                        />
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto border-slate-200 text-slate-600 font-semibold"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                        onClick={handleSave}
                    >
                        Save Preferences
                    </Button>
                </DialogFooter>

                <div className="flex items-center justify-center gap-1 opacity-40 pt-2">
                    <Info className="w-3 h-3" />
                    <span className="text-[10px]">Your preferences are stored locally in your browser.</span>
                </div>
            </DialogContent>
        </Dialog>
    );
};
