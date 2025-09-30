import { Link } from "react-router-dom";
import { 
  Rocket, 
  Users, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Building2,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Lightbulb,
  CheckCircle2,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse [animation-delay:300ms]" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-green-600/20 blur-3xl animate-pulse [animation-delay:600ms]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-slate-200 mb-6 animate-fade-in">
            <Award className="h-4 w-4 text-blue-400" />
            <span>Empowering entrepreneurs since 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 animate-fade-in [animation-delay:100ms]">
            Built for the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              9% who succeed
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in [animation-delay:200ms]">
            We're on a mission to transform how entrepreneurs manage their business and personal life—
            turning complexity into clarity, chaos into control, and ambition into achievement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in [animation-delay:300ms]">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all">
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link to="/entrepreneur-guide">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                Discover your type
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                To empower entrepreneurs with the tools, systems, and frameworks they need to break free from the 91% failure rate. 
                We believe every ambitious builder deserves a clear path to sustainable success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed">
                A world where entrepreneurs don't just survive—they thrive. Where systematic growth replaces emotional rollercoasters, 
                and every business owner has a clear roadmap to their "Level 7 Life."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
          <p className="text-xl text-slate-300">
            The principles that guide everything we build
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-sm border-blue-500/30 hover:border-blue-500/50 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Clarity Over Complexity</h3>
              <p className="text-slate-300 leading-relaxed">
                We believe in making the complex simple. Every feature is designed to reduce confusion and increase understanding.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur-sm border-purple-500/30 hover:border-purple-500/50 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">User-First Always</h3>
              <p className="text-slate-300 leading-relaxed">
                Every decision is made with our users in mind. We build with you, not for you—listening, adapting, and improving continuously.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-green-600/5 backdrop-blur-sm border-green-500/30 hover:border-green-500/50 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-600/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Systematic Growth</h3>
              <p className="text-slate-300 leading-relaxed">
                We don't believe in luck or hustle culture. We believe in proven frameworks, sustainable systems, and measurable progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why Bami Hustle Exists
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400 font-bold">91%</span>
                      </div>
                      <div>
                        <p className="text-slate-200 font-semibold">The failure rate is too high</p>
                        <p className="text-slate-400 text-sm">91% of businesses fail, and 20% don't make it past year one.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-slate-200 font-semibold">Entrepreneurs are overwhelmed</p>
                        <p className="text-slate-400 text-sm">Managing business and personal life separately creates chaos and burnout.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-slate-200 font-semibold">A better way exists</p>
                        <p className="text-slate-400 text-sm">Proven frameworks like 50/30/20, 4/20/80, and systematic scaling work—when applied correctly.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm border border-white/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-black text-white mb-4">9%</div>
                      <div className="text-2xl font-bold text-blue-400 mb-2">Success Rate</div>
                      <p className="text-slate-300">
                        Join the elite few who build sustainable, profitable businesses
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How We Help You Win</h2>
          <p className="text-xl text-slate-300">
            A systematic approach to building a Level 7 business and life
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-blue-400">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Define Your Number</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Set clear revenue, profit, and valuation targets. Know exactly where you're going before you start the journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Walk the 7 Levels</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Follow our proven roadmap from startup to exit. Each level has specific milestones, metrics, and strategies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-green-400">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Execute with Systems</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Use our tools to manage finances (50/30/20), hiring (4/20/80), time (1/3rd rule), and operations—all in one place.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative container mx-auto px-6 pb-24">
        <Card className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">5+</div>
                <div className="text-slate-300 font-semibold">User Roles</div>
                <div className="text-slate-400 text-sm mt-1">From Owner to Customer</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">3</div>
                <div className="text-slate-300 font-semibold">Core Frameworks</div>
                <div className="text-slate-400 text-sm mt-1">50/30/20, 4/20/80, 1/3rd</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">7</div>
                <div className="text-slate-300 font-semibold">Growth Levels</div>
                <div className="text-slate-400 text-sm mt-1">From Start to Exit</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">∞</div>
                <div className="text-slate-300 font-semibold">Possibilities</div>
                <div className="text-slate-400 text-sm mt-1">Your future is limitless</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-700/40 via-purple-700/30 to-slate-900 backdrop-blur-sm border-white/10 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=60"
                alt="Background pattern"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to join the 9%?
              </h2>
              <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
                Stop being part of the 91% who fail. Build your Level 7 business with proven systems and clear frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-semibold shadow-lg shadow-green-600/30">
                    Build Your Level 7 Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 border-slate-200 font-semibold">
                    I have an account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold">Bami Hustle</div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Empowering entrepreneurs to break the 91% failure rate with systematic growth and proven frameworks.
              </p>
            </div>

            <div>
              <div className="text-sm font-bold mb-4 text-slate-200">Product</div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/product" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/entrepreneur-guide" className="hover:text-white transition-colors">Entrepreneur Guide</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-bold mb-4 text-slate-200">Company</div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="mailto:hello@bamihustle.com" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-bold mb-4 text-slate-200">Stay Connected</div>
              <p className="text-sm text-slate-400 mb-4">
                Get updates on new features and entrepreneurship tips.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-white/10 border-white/20 placeholder:text-slate-500 text-white focus:border-blue-500"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>
              © {new Date().getFullYear()} Bami Hustle. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
