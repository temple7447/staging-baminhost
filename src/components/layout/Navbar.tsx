import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Building2, Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="container mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div className="text-lg font-semibold tracking-tight">Bami Hustle</div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
        <Link to="/" className="hover:text-white/90 transition-colors">Home</Link>
        <Link to="/product" className="hover:text-white/90 transition-colors">Product</Link>
        <Link to="/entrepreneur-guide" className="hover:text-white/90 transition-colors">Entrepreneur Guide</Link>
        <Link to="/projects" className="hover:text-white/90 transition-colors">Projects</Link>
        <Link to="/about" className="hover:text-white/90 transition-colors">About Us</Link>
      </nav>
      
      <div className="hidden md:flex items-center gap-3">
        <Link to="/login">
          <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10">
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-blue-600 hover:bg-blue-500">
            Create account
          </Button>
        </Link>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-white/20 text-white bg-white/5 hover:bg-white/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-950 text-white border-l border-white/10">
            <div className="mt-10 space-y-4">
              <Link to="/" className="block text-sm text-slate-200 hover:text-white">Home</Link>
              <Link to="/product" className="block text-sm text-slate-200 hover:text-white">Product</Link>
              <Link to="/entrepreneur-guide" className="block text-sm text-slate-200 hover:text-white">Entrepreneur Guide</Link>
              <Separator className="my-4 bg-white/10" />
              <Link to="/projects" className="block text-sm text-slate-200 hover:text-white">Projects</Link>
              <Link to="/about" className="block text-sm text-slate-200 hover:text-white">About Us</Link>
              <Separator className="my-4 bg-white/10" />
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 border-slate-200 w-full">
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
    </header>
  );
};
