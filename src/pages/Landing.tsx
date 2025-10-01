import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Building2,
  ShieldCheck,
  PieChart,
  Users,
  ArrowRight,
  Rocket,
  Gauge,
  Wallet,
  BarChart3,
} from "lucide-react";

const features = [
  { icon: <PieChart className="w-5 h-5" />, title: "Personal & Business Portfolios", desc: "Track assets, budgets, and performance across life and business." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Secure by Design", desc: "Auth-protected dashboards with granular permissions." },
  { icon: <Users className="w-5 h-5" />, title: "Team & Roles", desc: "Role-based views for owners, admins, managers, vendors and customers." },
  { icon: <Wallet className="w-5 h-5" />, title: "Wallet & Cashflow", desc: "50/30/20 splits, budgets, expenses and insights." },
  { icon: <BarChart3 className="w-5 h-5" />, title: "Reports & KPIs", desc: "High-level metrics that matter to you and your team." },
  { icon: <Gauge className="w-5 h-5" />, title: "Performance", desc: "Fast, responsive UI with delightful interactions." },
];

const steps = [
  { step: 1, title: "Create your account", desc: "Sign up and set your basic preferences." },
  { step: 2, title: "Add your portfolios", desc: "Connect business units, assets, budgets and goals." },
  { step: 3, title: "Track & grow", desc: "View dashboards, collaborate with roles, and optimize." },
];

const testimonials = [
  {
    quote: "This put my operations and finances in one clear view. I make decisions faster now.",
    name: "Amaka O.",
    title: "Business Owner",
  },
  {
    quote: "The 50/30/20 split and reports helped me get control of spending.",
    name: "Tunde A.",
    title: "Product Manager",
  },
  {
    quote: "Role-based access means my team sees exactly what they need—nothing more.",
    name: "Chidi N.",
    title: "Operations Lead",
  },
];

const faqs = [
  { q: "Is there a free plan?", a: "Yes, you can start free. You can upgrade anytime for advanced features." },
  { q: "Do you support teams?", a: "Yes, roles include owner, admin, manager, vendor and customer with tailored dashboards." },
  { q: "Can I import existing data?", a: "You can import CSVs for budgets, contacts and assets. More connectors are coming." },
  { q: "Is my data secure?", a: "We use token-based auth and follow best practices. You control roles and access." },
];

const productShots = [
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1551281044-8c3f1e82b6df?auto=format&fit=crop&w=1600&q=80",
];

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Decorative animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-48 w-48 md:h-72 md:w-72 rounded-full bg-blue-600/30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 md:h-72 md:w-72 rounded-full bg-purple-600/30 blur-3xl animate-pulse [animation-delay:300ms]" />
        <div className="absolute top-1/3 -right-16 h-24 w-24 md:h-40 md:w-40 rounded-full bg-emerald-500/20 blur-2xl animate-[spin_18s_linear_infinite]" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <Rocket className="h-3.5 w-3.5 text-blue-300" />
              New: Role-based dashboards and reports
            </div>
            <div className="mb-6 text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">
                AGREE OR DISAGREE?
              </div>
              <div className="text-lg md:text-xl text-slate-200">
                <span className="text-blue-400 font-semibold">STARTING</span> a business is hard, but{" "}
                <span className="text-blue-400 font-semibold">SCALING</span> a business is even harder.
              </div>
            </div>
            
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-sm text-slate-300 mb-2">WHAT PERCENTAGE OF BUSINESSES FAIL?</div>
                <div className="text-6xl md:text-7xl font-black text-red-400 mb-2">91%</div>
                <div className="text-sm text-slate-400">Start-Up & Small Business Failure Rate</div>
              </div>
              
              <div className="text-center border-t border-white/20 pt-4">
                <div className="text-sm text-slate-300 mb-2">WHAT PERCENTAGE OF BUSINESSES FAIL IN THE FIRST YEAR?</div>
                <div className="text-5xl md:text-6xl font-black text-orange-400 mb-2">20%</div>
                <div className="text-sm text-slate-400">First Year Small Business Failure Rate</div>
              </div>
            </div>

            <h1 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Break the cycle. Build a plan to <span className="text-green-400">DOUBLE</span> your take-home profit and achieve the "Level 7 Life."
            </h1>
            <p className="mt-4 text-slate-200/80 text-lg">
              The entrepreneurial journey doesn't have to be an emotional rollercoaster. 
              Our platform helps you manage portfolios, track performance, and scale systematically.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 transition-transform hover:translate-y-[-1px] active:translate-y-[0]">
                  Build My Level 7 Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 border-slate-200">
                  I already have an account
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-sm text-slate-300/80">
              Join the 9% that succeed. No credit card required.
            </div>

            {/* Quick highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-md bg-white/5 p-3 border border-white/10">
                <div className="text-lg font-bold">₦52.75M</div>
                <div className="text-slate-300/80">Net Worth</div>
              </div>
              <div className="rounded-md bg-white/5 p-3 border border-white/10">
                <div className="text-lg font-bold">50/30/20</div>
                <div className="text-slate-300/80">Split Strategy</div>
              </div>
              <div className="rounded-md bg-white/5 p-3 border border-white/10">
                <div className="text-lg font-bold">7</div>
                <div className="text-slate-300/80">Core Categories</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Device-style mock with online image */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl">
              <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 text-xs text-slate-300/80">bamihustle.com/app</div>
              </div>
              <div className="p-3">
                <AspectRatio ratio={16/10}>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
                    alt="Portfolio dashboards overview"
                    className="h-full w-full object-cover rounded-lg border border-white/10"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Quick feature tiles */}
            <Card className="bg-white/5 backdrop-blur border-white/10 shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {features.slice(0, 6).map((f, idx) => (
                    <HoverCard key={idx}>
                      <HoverCardTrigger asChild>
                        <div className="rounded-lg border border-white/10 p-4 bg-white/5 transition-transform hover:translate-y-[-2px]">
                          <div className="flex items-center gap-2 text-blue-300">
                            {f.icon}
                            <div className="text-sm font-semibold">{f.title}</div>
                          </div>
                          <div className="mt-2 text-xs text-slate-300/80">{f.desc}</div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-white/95 text-slate-900 w-64 sm:w-72">
                        {f.desc}
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple value proposition */}
      <section className="container mx-auto px-6 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Three Simple Steps to Level 7</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              <h3 className="font-semibold text-slate-200 mb-2">Define Your Number</h3>
              <p className="text-sm text-slate-400">Set your revenue, profit, and valuation targets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              <h3 className="font-semibold text-slate-200 mb-2">Walk the 7 Levels</h3>
              <p className="text-sm text-slate-400">Follow our proven roadmap to systematic growth</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              <h3 className="font-semibold text-slate-200 mb-2">Build Your Plan</h3>
              <p className="text-sm text-slate-400">Create actionable steps to reach your goals</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/product">
              <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 border-slate-200">
                Learn More About Our Platform
              </Button>
            </Link>
            <Link to="/entrepreneur-guide">
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
                Discover Your Entrepreneur Type
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Accidental Entrepreneurs */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What's an "Accidental Entrepreneur?"</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Discover your entrepreneurial journey and learn how to scale systematically.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-700/40 via-purple-700/30 to-slate-900 max-w-4xl mx-auto">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=60"
              alt="Background pattern"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative px-6 py-12 md:px-10 md:py-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to break the 91% failure cycle?</h3>
            <p className="mt-2 text-slate-200/80 max-w-xl mx-auto mb-8">
              Join the 9% of entrepreneurs who succeed by building a systematic approach to scale.  
              Our platform helps you create a Level 7 plan to double your take-home profit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 transition-transform hover:translate-y-[-1px] active:translate-y-[0]">
                  Build My Level 7 Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 border-slate-200">
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
