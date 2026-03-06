import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
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

const estateShots = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1920&q=70",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1920&q=70",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=70",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=70",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1920&q=70",
];

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = useMemo(() => [
    {
      image: "/images/hero/hero_business_scaling_1768388722802.png",
      badge: "Scale Systematically",
      title: "While starting a business is hard, SCALING is even harder.",
      description: "Break free from the entrepreneurial flatline. Our systematic approach helps you scale yourself so you can scale your company.",
      cta: "Build My Level 7 Plan",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog"
    },
    {
      image: "/images/hero/hero_financial_freedom_1768388738721.png",
      badge: "Financial Clarity",
      title: "Take back control of your Personal & Business finances.",
      description: "Track assets, budgets, and performance across life and business with 50/30/20 splits and real-time insights.",
      cta: "Get Started Free",
      link: "/register"
    },
    {
      image: "/images/hero/hero_entrepreneur_lifestyle_1768388752631.png",
      badge: "Master Your Time",
      title: "Stronger founders create better teams and healthier families.",
      description: "Our role-based dashboards and reports mean you stay at the helm—without burning out or losing control.",
      cta: "Join 500+ Entrepreneurs",
      link: "/login"
    }
  ], []);

  // Preload images for better performance
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [heroSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleManualSlideChange = useCallback((idx: number) => {
    setCurrentSlide(idx);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Carousel */}
      <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center overflow-hidden">
        {/* Background Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              idx === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.badge}
              className="h-full w-full object-cover scale-105 animate-[ken-burns_20s_ease-in-out_infinite]"
            />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl space-y-8">
            <div
              key={`badge-${currentSlide}`}
              className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 backdrop-blur-sm animate-in fade-in slide-in-from-left-4 duration-700"
            >
              <Rocket className="h-4 w-4 text-blue-300" />
              <span>{heroSlides[currentSlide].badge}</span>
            </div>

            <div key={`content-${currentSlide}`} className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                {heroSlides[currentSlide].title.split("SCALING").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent italic">
                        SCALING
                      </span>
                    )}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-left-12 duration-700 delay-200">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div key={`cta-${currentSlide}`} className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
              {heroSlides[currentSlide].link.startsWith("http") ? (
                <a href={heroSlides[currentSlide].link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-7 text-lg shadow-xl shadow-blue-900/50 transition-all duration-300 hover:scale-105">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              ) : (
                <Link to={heroSlides[currentSlide].link} className="flex-1 sm:flex-none">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-7 text-lg shadow-xl shadow-blue-900/50 transition-all duration-300 hover:scale-105">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-6 z-20 flex gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSlideChange(idx)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                idx === currentSlide ? "w-12 bg-blue-500" : "w-6 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* Estate Renting Focus */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-bold text-sm px-4 py-2 rounded-full">Estate Renting</div>
            <h2 className="text-3xl md:text-4xl font-bold">Find, manage, and rent estates seamlessly</h2>
            <p className="text-slate-300">Showcase your properties with beautiful galleries, manage availability and leads, and streamline tenant communications—all in one place.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard/estate">
                <Button size="lg" className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white">Go to Estate Dashboard</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">Sign in to list a property</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/images/estate/estate_exterior_modern_1768390624272.png" alt="Modern apartment exterior" className="rounded-2xl h-48 w-full object-cover border border-white/10" loading="lazy" />
            <img src="/images/estate/estate_interior_living_1768390639037.png" alt="Cozy living room" className="rounded-2xl h-48 w-full object-cover border border-white/10" loading="lazy" />
            <img src="/images/estate/estate_interior_kitchen_modern_1768390652240.png" alt="Kitchen interior" className="rounded-2xl h-48 w-full object-cover border border-white/10" loading="lazy" />
            <img src="/images/estate/estate_interior_bedroom_luxe_1768390667482.png" alt="Bedroom design" className="rounded-2xl h-48 w-full object-cover border border-white/10" loading="lazy" />
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
              <Button size="lg" variant="outline" className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-slate-600">
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
