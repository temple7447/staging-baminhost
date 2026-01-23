import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Building2, Menu } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "light" | "dark";
}

export const Navbar = ({ variant = "dark" }: NavbarProps) => {
  const isLight = variant === "light";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navContent = (
    <>
      <Link to="/" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>Home</Link>
      <Link to="/marketplace/estate" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>Estate Marketplace</Link>
      <Link to="/product" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>Product</Link>
      <Link to="/entrepreneur-guide" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>Entrepreneur Guide</Link>
      <Link to="/projects" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>Projects</Link>
      <Link to="/about" className={`${isLight ? "text-slate-600 hover:text-blue-600" : "text-slate-200 hover:text-white/90"} transition-colors font-medium`}>About Us</Link>
    </>
  );

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      scrolled
        ? (isLight ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3" : "bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg py-3")
        : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className={`text-lg font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>Bami Hustle</div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navContent}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector variant={variant} />
          <Link to="/login">
            <Button variant="outline" className={isLight ? "border-slate-200 text-slate-900 bg-white hover:bg-slate-50" : "border-white/20 text-white bg-transparent hover:bg-white/10"}>
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-500 font-bold">
              Create account
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={isLight ? "border-slate-200 text-slate-900 bg-white hover:bg-slate-50" : "border-white/20 text-white bg-white/5 hover:bg-white/10"}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={`${isLight ? "bg-white text-slate-900" : "bg-slate-950 text-white"} border-l border-white/10`}>
              <div className="mt-10 space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">Language</span>
                    <LanguageSelector variant={variant} className="bg-white/5 border-white/10" />
                </div>
                <Link to="/" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>Home</Link>
                <Link to="/marketplace/estate" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>Estate Marketplace</Link>
                <Link to="/product" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>Product</Link>
                <Link to="/entrepreneur-guide" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>Entrepreneur Guide</Link>
                <Separator className={`my-4 ${isLight ? "bg-slate-100" : "bg-white/10"}`} />
                <Link to="/projects" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>Projects</Link>
                <Link to="/about" className={`block text-sm ${isLight ? "text-slate-600" : "text-slate-200"} hover:text-blue-600`}>About Us</Link>
                <Separator className={`my-4 ${isLight ? "bg-slate-100" : "bg-white/10"}`} />
                <div className="flex flex-col gap-2">
                  <Link to="/login">
                    <Button variant="outline" className={`${isLight ? "bg-slate-50 border-slate-200 text-slate-900" : "bg-white text-slate-900"} w-full`}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-blue-600 hover:bg-blue-500 w-full">
                      Create account
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
