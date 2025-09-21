import { Link } from "react-router-dom";
import { Building2, Rocket, Users, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-lg font-semibold tracking-tight">Bami Hustle</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about" className="text-white">About Us</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"><Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Log in</Button></Link>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-500">Create account</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-6 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <Rocket className="h-3.5 w-3.5 text-blue-300" />
              Built for clarity, control and momentum
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              We help builders and operators move faster with confidence
            </h1>
            <p className="mt-4 text-slate-200/85 text-lg max-w-xl">
              Bami Hustle combines personal and business portfolio management into a single, coherent system—
              budgets, assets, roles, operations and growth, all working together.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 border-slate-200">
                  Explore projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-blue-300"><Users className="w-5 h-5" /><span className="font-semibold">Role-aware</span></div>
              <p className="mt-2 text-sm text-slate-300/85">Owners, admins, managers, vendors and customers see exactly what matters to them.</p>
            </div>
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-300"><Target className="w-5 h-5" /><span className="font-semibold">Outcome-driven</span></div>
              <p className="mt-2 text-sm text-slate-300/85">Budgets, goals, KPIs and workflows designed for tangible progress.</p>
            </div>
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-purple-300"><ShieldCheck className="w-5 h-5" /><span className="font-semibold">Secure by design</span></div>
              <p className="mt-2 text-sm text-slate-300/85">Permissions and protected views so teams collaborate safely.</p>
            </div>
            <div className="rounded-xl p-5 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-yellow-300"><Rocket className="w-5 h-5" /><span className="font-semibold">Performance</span></div>
              <p className="mt-2 text-sm text-slate-300/85">Fast, modern UI with delightful details that don’t get in your way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Sections */}
      <section className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <div className="text-sm font-semibold text-slate-200/95">Our Mission</div>
            <p className="mt-2 text-sm text-slate-300/85">Empower builders and operators with clear systems that turn complexity into momentum.</p>
          </div>
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <div className="text-sm font-semibold text-slate-200/95">What We Build</div>
            <p className="mt-2 text-sm text-slate-300/85">Role-based dashboards, smart budgets, and workflows that scale with your goals.</p>
          </div>
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            <div className="text-sm font-semibold text-slate-200/95">Our Values</div>
            <p className="mt-2 text-sm text-slate-300/85">Clarity, ownership, steady improvement. We build with and for our users.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-700/40 via-purple-700/30 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=60"
              alt="Background pattern"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative px-6 py-10 md:px-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold">Ready to get started?</h3>
              <p className="mt-2 text-slate-200/80">Join free in minutes. Upgrade anytime.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-500 font-semibold">Create account</Button>
              </a>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-white text-slate-900 hover:bg-slate-100 border-slate-200">Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (copied from Landing for consistency) */}
      <footer id="contact" className="border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="text-lg font-semibold">Bami Hustle</div>
              </div>
              <p className="mt-3 text-sm text-slate-300/80">
                Manage your life and business portfolios in one place. Built for clarity, control and momentum.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Product</div>
              <ul className="space-y-2 text-sm text-slate-300/80">
                <li><Link to="/" className="hover:text-white/90">Home</Link></li>
                <li><Link to="/projects" className="hover:text-white/90">Projects</Link></li>
                <li><Link to="/about" className="hover:text-white/90">About</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-slate-300/80">
                <li><a href="#" className="hover:text-white/90">Careers</a></li>
                <li><a href="mailto:hello@bamihustle.com" className="hover:text-white/90">Support</a></li>
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
    </div>
  );
};

export default About;
