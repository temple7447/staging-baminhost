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
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 backdrop-blur-sm animate-fade-in">
              <Rocket className="h-4 w-4 text-blue-300" />
              <span>New: Role-based dashboards and reports</span>
            </div>

            {/* Main Question */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent">
                AGREE OR DISAGREE?
              </h2>
              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed">
                <span className="font-bold text-blue-300">STARTING</span> a business is hard, but{" "}
                <span className="font-bold text-blue-300">SCALING</span> a business is even harder.
              </p>
            </div>
            
            {/* Statistics Cards */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-red-900/20 p-6 backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                <div className="relative text-center space-y-3">
                  <p className="text-sm font-semibold text-red-200 uppercase tracking-wide">What % of businesses fail?</p>
                  <div className="text-7xl md:text-8xl font-black bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent">91%</div>
                  <p className="text-sm text-red-200/80">Start-Up & Small Business Failure Rate</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-950/40 to-orange-900/20 p-6 backdrop-blur-sm shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                <div className="relative text-center space-y-3">
                  <p className="text-sm font-semibold text-orange-200 uppercase tracking-wide">First year failure rate?</p>
                  <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">20%</div>
                  <p className="text-sm text-orange-200/80">First Year Small Business Failure Rate</p>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Break the cycle. Build a plan to{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  DOUBLE
                </span>{" "}
                your take-home profit.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                The entrepreneurial journey doesn't have to be an emotional rollercoaster. 
                Our platform helps you manage portfolios, track performance, and scale systematically.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold shadow-lg shadow-green-900/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/60">
                  Build My Level 7 Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link to="/login" className="flex-1">
                <Button size="lg" variant="outline" className="w-full bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm font-semibold transition-all duration-300 hover:scale-105">
                  I already have an account
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              ✨ Join the 9% that succeed. No credit card required.
            </p>

            {/* Quick highlights */}
            <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm text-center transition-all duration-300 hover:scale-105 hover:border-white/20">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">₦52.75M</div>
                <div className="text-xs text-slate-300">Net Worth</div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm text-center transition-all duration-300 hover:scale-105 hover:border-white/20">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">50/30/20</div>
                <div className="text-xs text-slate-300">Split Strategy</div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-sm text-center transition-all duration-300 hover:scale-105 hover:border-white/20">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">7</div>
                <div className="text-xs text-slate-300">Core Categories</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visuals */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Device Mock */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <span className="h-3 w-3 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />
                <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
                <span className="h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
                <div className="ml-3 text-xs text-slate-300 font-medium">bamihustle.com/app</div>
              </div>
              <div className="p-4">
                <AspectRatio ratio={16/10}>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80"
                    alt="Portfolio dashboards overview"
                    className="h-full w-full object-cover rounded-xl border border-white/10 shadow-xl"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
              <div className="relative grid grid-cols-2 gap-4">
                {features.slice(0, 6).map((f, idx) => (
                  <HoverCard key={idx}>
                    <HoverCardTrigger asChild>
                      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-lg cursor-pointer">
                        <div className="space-y-3">
                          <div className="text-blue-300 transition-transform duration-300 group-hover:scale-110">
                            {f.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                            <div className="text-xs text-slate-300/80 line-clamp-2">{f.desc}</div>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-white text-slate-900 shadow-2xl border-slate-200">
                      <p className="text-sm">{f.desc}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
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
