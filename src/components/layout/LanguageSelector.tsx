import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Check } from "lucide-react";
import { changeLanguage } from "./GoogleTranslate";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "kk", name: "Kazakh", flag: "🇰🇿" },
];

interface LanguageSelectorProps {
    variant?: "light" | "dark";
    className?: string;
}

export const LanguageSelector = ({ variant = "dark", className }: LanguageSelectorProps) => {
    const [currentLang, setCurrentLang] = useState("en");
    const isLight = variant === "light";

    const handleLanguageChange = (code: string) => {
        setCurrentLang(code);
        changeLanguage(code);
    };

    // Attempt to detect initial language or handle auto-detection sync
    useEffect(() => {
        const interval = setInterval(() => {
            const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (select && select.value) {
                setCurrentLang(select.value);
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const activeLang = languages.find(l => l.code === currentLang) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                        "gap-2 px-3 h-9 rounded-xl font-bold transition-all",
                        isLight 
                            ? "text-slate-600 hover:text-blue-600 hover:bg-slate-100" 
                            : "text-slate-200 hover:text-white hover:bg-white/10",
                        className
                    )}
                >
                    <Globe className="w-4 h-4 opacity-70" />
                    <span className="hidden sm:inline">{activeLang.name}</span>
                    <span className="sm:hidden">{activeLang.flag}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-slate-100 shadow-2xl">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors mb-1 last:mb-0",
                            currentLang === lang.code 
                                ? "bg-blue-50 text-blue-600 font-bold" 
                                : "text-slate-600 hover:bg-slate-50 font-medium"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                        </div>
                        {currentLang === lang.code && <Check className="w-4 h-4" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
