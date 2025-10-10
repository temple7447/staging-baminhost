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
  Star,
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
  { q: "Do you support teams?", a: "Yes, roles include super admin, admin, manager, vendor and customer with tailored dashboards." },
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

            {/* Main Headline */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                While <span className="text-blue-400">starting</span> a business is hard,{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  SCALING
                </span>{" "}
                a business is even harder.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                Break free from the entrepreneurial flatline. Our systematic approach helps you 
                scale <span className="text-green-400 font-semibold">yourself</span> so you can scale 
                <span className="text-green-400 font-semibold">your company</span>—without burning out or losing control.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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

            <p className="text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              ✨ Break through the flatline. No credit card required. Join 500+ entrepreneurs scaling systematically.
            </p>
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
          </div>
        </div>
      </section>

      {/* The Scaling Problem - Enhanced with Lifecycle */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent mb-6">
              The Truth About Business Failure
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8">
              Here's what the data actually shows about <span className="font-bold text-red-400">scaling vs. starting</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/40 to-green-900/20 p-8 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
              <div className="relative text-center space-y-4">
                <p className="text-sm font-semibold text-green-200 uppercase tracking-wide">First Year Survival</p>
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent">80%</div>
                <p className="text-sm text-green-200/80">Most clear the launch hurdle</p>
                <div className="mt-2 text-xs text-green-300 font-medium">✓ If you're here, celebrate!</div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 p-8 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
              <div className="relative text-center space-y-4">
                <p className="text-sm font-semibold text-yellow-200 uppercase tracking-wide">5-Year Mark</p>
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent">50%</div>
                <p className="text-sm text-yellow-200/80">The drop happens during scaling</p>
                <div className="mt-2 text-xs text-yellow-300 font-medium">⚠ The real challenge begins</div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-red-900/20 p-8 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
              <div className="relative text-center space-y-4">
                <p className="text-sm font-semibold text-red-200 uppercase tracking-wide">Eventually Fail</p>
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent">91%</div>
                <p className="text-sm text-red-200/80">Long-term survival is rare</p>
                <div className="mt-2 text-xs text-red-300 font-medium">💔 The scaling wall</div>
              </div>
            </div>
          </div>

          {/* The Entrepreneurial Lifecycle */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">The Entrepreneurial Lifecycle</h3>
              <p className="text-lg text-slate-300">Every founder experiences this emotional rollercoaster</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-6">
                <div className="text-blue-400 font-bold text-lg mb-2">1. Eureka Moment</div>
                <p className="text-sm text-slate-300">"This is going to be easy!" The idea hits—pure excitement and uninformed optimism.</p>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-6">
                <div className="text-purple-400 font-bold text-lg mb-2">2. Launch Drudgery</div>
                <p className="text-sm text-slate-300">"We're all doomed." Reality hits. Feels hopeless, but you push through anyway.</p>
              </div>
              
              <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-6">
                <div className="text-green-400 font-bold text-lg mb-2">3. Initial Traction</div>
                <p className="text-sm text-slate-300">"We might have something!" You make your first buck. 80% reach here—celebrate!</p>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-6">
                <div className="text-yellow-400 font-bold text-lg mb-2">4. Early Growth</div>
                <p className="text-sm text-slate-300">"Finally got it—where's the champagne?" Fun phase. Momentum builds, riches seem imminent.</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-6">
                <div className="text-red-400 font-bold text-lg mb-2">5. The Flatline</div>
                <p className="text-sm text-slate-300">"Why isn't this working anymore?" Peak confidence crashes into stagnation. Growth vanishes.</p>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-6">
                <div className="text-emerald-400 font-bold text-lg mb-2">6. Breakthrough</div>
                <p className="text-sm text-slate-300">"Informed realism." Learn to scale systematically. Put money in your family's account.</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500/20 to-emerald-500/20 rounded-lg p-6 border border-emerald-400/30">
                <p className="text-lg font-semibold text-white mb-2">
                  <span className="text-red-400">The Secret:</span> Most get stuck in the flatline because they don't know how to 
                  <span className="text-emerald-400 font-bold">scale systematically</span>.
                </p>
                <p className="text-slate-300">If you're flatlined, you're not broken—you just need the right roadmap.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-400/30 rounded-full px-6 py-3">
              <span className="text-emerald-300 font-semibold">✨ Join the 9% that break through the flatline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Scale Yourself to Scale Your Company */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-sm px-4 py-2 rounded-full mb-6">
              OUR MISSION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Help entrepreneurs <span className="text-green-400">scale themselves</span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              so they can <span className="text-green-400">scale their companies</span>
            </h3>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Because stronger founders create better teams, healthier families, and thriving economies. 
              You should stay at the helm as long as you want—without burning out or losing control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-400/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="text-blue-300 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-300/80">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Path to Level 7</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Follow our proven 3-step system to build a systematic approach that scales. 
              No more guesswork, no more emotional rollercoaster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                  1
                  <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Define Your Number</h3>
                <p className="text-slate-400">Set your revenue, profit, and valuation targets with clear milestones</p>
              </div>
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-green-500/50 transform translate-y-0 -translate-x-8 z-0" />
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30">
                  2
                  <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Walk the 7 Levels</h3>
                <p className="text-slate-400">Follow our proven roadmap with systematic growth strategies at each level</p>
              </div>
              {/* Connection line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-purple-500/50 transform translate-y-0 -translate-x-8 z-0" />
            </div>
            
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                3
                <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Execute & Scale</h3>
              <p className="text-slate-400">Track progress, optimize performance, and scale systematically</p>
            </div>
          </div>

          {/* Results showcase */}
          <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-3xl border border-white/10 p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">What Breakthrough Looks Like</h3>
            <p className="text-slate-300">Real outcomes from founders who learned to scale systematically</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">2x</div>
              <div className="text-sm text-slate-300">Revenue Growth (Minimum Goal)</div>
              <div className="text-xs text-slate-400 mt-1">Without working more hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">2x</div>
              <div className="text-sm text-slate-300">Take-Home Profit</div>
              <div className="text-xs text-slate-400 mt-1">Money in your family's account</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-purple-400 mb-2">Level 7</div>
              <div className="text-sm text-slate-300">Business Maturity</div>
              <div className="text-xs text-slate-400 mt-1">Your "number" + exit readiness</div>
            </div>
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

      {/* Social Proof - Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Entrepreneurs Are Saying</h2>
            <p className="text-xl text-slate-300">Join hundreds of entrepreneurs who've transformed their business approach</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                <div className="relative">
                  <div className="text-4xl text-blue-300 mb-4">"</div>
                  <p className="text-slate-200 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-xs text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">₦2.1B+</div>
              <div className="text-xs text-slate-400">Assets Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-xs text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-slate-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Types */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Type of Entrepreneur Are You?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover your entrepreneurial journey and get a personalized roadmap to scale systematically.
          </p>
          <Link to="/entrepreneur-guide">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-105">
              Take the Entrepreneur Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300">Everything you need to know about getting started</p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-700/40 via-purple-700/30 to-slate-900 max-w-5xl mx-auto">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=60"
              alt="Background pattern"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative px-6 py-16 md:px-12 md:py-20 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Break Through the Flatline?</h3>
            <p className="text-xl text-slate-200/90 max-w-2xl mx-auto mb-10">
              If you're stuck, burned out, or wondering "what's next?"—you're not broken. 
              You just need the right roadmap. Scale yourself to scale your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold px-8 py-4 text-lg shadow-xl shadow-green-900/50 transition-all duration-300 hover:scale-105">
                  Build My Level 7 Plan
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </a>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105">
                  I already have an account
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-400">
              ✨ No credit card required • Join 500+ entrepreneurs • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
