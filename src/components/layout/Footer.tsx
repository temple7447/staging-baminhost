import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-lg font-semibold">Bami Hustle</div>
            </div>
            <p className="text-sm text-slate-300/80">
              Manage your life and business portfolios in one place. Built for clarity, control and momentum.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-slate-300/80">
              <li><Link to="/" className="hover:text-white/90">Home</Link></li>
              <li><Link to="/product" className="hover:text-white/90">Features</Link></li>
              <li><Link to="/entrepreneur-guide" className="hover:text-white/90">Entrepreneur Guide</Link></li>
              <li><Link to="/projects" className="hover:text-white/90">Projects</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm text-slate-300/80">
              <li><Link to="/about" className="hover:text-white/90">About</Link></li>
              <li><a href="mailto:hello@bamihustle.com" className="hover:text-white/90">Support</a></li>
              <li><a href="#" className="hover:text-white/90">Careers</a></li>
              <li><a href="#" className="hover:text-white/90">Blog</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3">Stay up to date</div>
            <p className="text-sm text-slate-300/80 mb-3">Get product updates and tips.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input type="email" placeholder="you@example.com" className="bg-white/10 border-white/10 placeholder:text-slate-300/60 text-white" />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300/70">
          <div>© {new Date().getFullYear()} Bami Hustle. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/90">Privacy</a>
            <a href="#" className="hover:text-white/90">Terms</a>
            <a href="#" className="hover:text-white/90">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
