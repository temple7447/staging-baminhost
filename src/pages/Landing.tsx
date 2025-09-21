import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  CheckCircle2,
  Quote,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Menu,
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

      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="text-lg font-semibold tracking-tight">Bami Hustle</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#features" className="hover:text-white/90">Features</a>
          <a href="#product" className="hover:text-white/90">Product</a>
          <a href="#how-it-works" className="hover:text-white/90">How it works</a>
          <a href="#testimonials" className="hover:text-white/90">Testimonials</a>
          <a href="#faq" className="hover:text-white/90">FAQ</a>
          <Link to="/projects" className="hover:text-white/90">Projects</Link>
          <Link to="/about" className="hover:text-white/90">About Us</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"><Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Log in</Button></Link>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-500">Create account</Button>
          </a>
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
                <a href="#features" className="block text-sm text-slate-200 hover:text-white">Features</a>
                <a href="#product" className="block text-sm text-slate-200 hover:text-white">Product</a>
                <a href="#how-it-works" className="block text-sm text-slate-200 hover:text-white">How it works</a>
                <a href="#testimonials" className="block text-sm text-slate-200 hover:text-white">Testimonials</a>
                <a href="#faq" className="block text-sm text-slate-200 hover:text-white">FAQ</a>
                <Separator className="my-4 bg-white/10" />
                <Link to="/projects" className="block text-sm text-slate-200 hover:text-white">Projects</Link>
                <Link to="/about" className="block text-sm text-slate-200 hover:text-white">About Us</Link>
                <Separator className="my-4 bg-white/10" />
                <div className="flex flex-col gap-2">
                  <Link to="/login"><Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 border-slate-200 w-full">Log in</Button></Link>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="bg-blue-600 hover:bg-blue-500 w-full">Create account</Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
              <Rocket className="h-3.5 w-3.5 text-blue-300" />
              New: Role-based dashboards and reports
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Manage your life and business portfolios in one place
            </h1>
            <p className="mt-4 text-slate-200/80 text-lg">
              All-in-one platform for budgeting, portfolio tracking, operations and growth.
              Built for clarity, control and momentum.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 transition-transform hover:translate-y-[-1px] active:translate-y-[0]">
                  Get started free
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
              No credit card required. You can upgrade anytime.
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

      {/* Trusted by */}
      <section className="container mx-auto px-6 pb-12">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-300/80">Trusted by builders and operators</div>
          <div className="flex items-center gap-4 sm:gap-6 opacity-80">
            <img src="https://cdn.simpleicons.org/stripe/9ca3af" alt="Stripe" className="h-5 w-auto" loading="lazy" />
            <img src="https://cdn.simpleicons.org/slack/9ca3af" alt="Slack" className="h-5 w-auto" loading="lazy" />
            <img src="https://cdn.simpleicons.org/notion/9ca3af" alt="Notion" className="h-5 w-auto" loading="lazy" />
            <img src="https://cdn.simpleicons.org/airtable/9ca3af" alt="Airtable" className="h-5 w-auto" loading="lazy" />
            <img src="https://cdn.simpleicons.org/intercom/9ca3af" alt="Intercom" className="h-5 w-auto" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="container mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="rounded-xl p-6 bg-white/5 border border-white/10 transition-all hover:bg-white/10">
              <div className="flex items-center gap-2 text-blue-300">
                {f.icon}
                <div className="font-semibold">{f.title}</div>
              </div>
              <div className="mt-2 text-slate-300/80">{f.desc}</div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-300/70">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Included in all plans
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product screenshots */}
      <section id="product" className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">See the product in action</h2>
          <p className="mt-2 text-slate-300/80">A glimpse of dashboards and workflows</p>
        </div>
        <Carousel 
          className="mx-auto max-w-5xl"
          opts={{
            align: "start",
            loop: true,
            
          }}
        >
          <CarouselContent>
            {productShots?.map((src: any, i: number) => (
              <CarouselItem key={i}>
                <Card className="bg-white/5 border-white/10 backdrop-blur">
                  <CardContent className="p-4">
                    <AspectRatio ratio={16/9}>
                      <img src={src} alt={`Product screenshot ${i+1}`} className="h-full w-full object-cover rounded-lg border border-white/10" loading="lazy" />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <p className="mt-2 text-slate-300/80">From setup to results in minutes</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="rounded-xl p-6 bg-white/5 border border-white/10">
              <div className="text-5xl font-black text-white/10">{s.step}</div>
              <div className="mt-2 text-lg font-semibold">{s.title}</div>
              <div className="mt-1 text-slate-300/80">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Loved by operators and creators</h2>
          <p className="mt-2 text-slate-300/80">What our users are saying</p>
        </div>
        <div className="relative">
          <Carousel className="mx-auto max-w-3xl">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <Card className="bg-white/5 border-white/10 backdrop-blur">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center gap-4">
                        <Quote className="h-6 w-6 text-blue-300" />
                        <p className="text-lg text-slate-100">“{t.quote}”</p>
                        <Separator className="bg-white/10" />
                        <div className="text-sm text-slate-300/90 font-medium">{t.name} • {t.title}</div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="container mx-auto px-6 pb-20">
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
              <h3 className="text-2xl md:text-3xl font-bold">Ready to take control of your portfolios?</h3>
              <p className="mt-2 text-slate-200/80">Start free today and upgrade anytime. No credit card required.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-500 font-semibold">Create account</Button>
              </a>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-white text-slate-900 hover:bg-slate-100 border-slate-200">Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Frequently asked questions</h2>
          <p className="mt-2 text-slate-300/80">Everything you need to know</p>
        </div>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="px-4">{f.q}</AccordionTrigger>
              <AccordionContent className="px-4 text-slate-300/90">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
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
                <li><a href="#features" className="hover:text-white/90">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white/90">How it works</a></li>
                <li><a href="#testimonials" className="hover:text-white/90">Testimonials</a></li>
                <li><a href="#faq" className="hover:text-white/90">FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold mb-3">Company</div>
              <ul className="space-y-2 text-sm text-slate-300/80">
                <li><a href="/about" className="hover:text-white/90">About</a></li>
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
              <div className="mt-4 flex items-center gap-3 text-slate-300/80">
                <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="GitHub" className="hover:text-white"><Github className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
                <a href="mailto:hello@bamihustle.com" aria-label="Email" className="hover:text-white"><Mail className="h-4 w-4" /></a>
              </div>
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

export default Landing;
