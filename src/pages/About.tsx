import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Building2,
  TrendingUp,
  Award,
  Heart,
  Lightbulb,
  CheckCircle2,
  Target,
  Users,
  Shield,
  Sparkles,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2n02tzF1Yti8ZiwVDhOjnvPpgCKayNZsuxr4vpRF8DY4TLA/viewform?usp=dialog";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Bami Hustle
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We help entrepreneurs break free from the 91% failure rate by providing systematic frameworks, 
            proven strategies, and powerful tools to build sustainable, profitable businesses.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-12">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p className="text-lg">
                    Bami Hustle was born from a simple observation: <span className="text-white font-semibold">91% of businesses fail</span>, 
                    and most entrepreneurs struggle not because they lack ambition, but because they lack systems.
                  </p>
                  <p className="text-lg">
                    We watched countless talented founders burn out, trying to juggle business operations, personal finances, 
                    team management, and growth—all without a clear roadmap or unified platform to manage it all.
                  </p>
                  <p className="text-lg">
                    That's why we built Bami Hustle: <span className="text-white font-semibold">to give entrepreneurs the systematic approach 
                    they need to succeed</span>. We combine proven frameworks (like 50/30/20 budgeting, 4/20/80 hiring, and the 7 Levels of Growth) 
                    with powerful technology to create a platform where business and personal life work in harmony, not conflict.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600/10 to-blue-600/5 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardContent className="p-10">
              <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                To empower 1 million entrepreneurs with the tools, systems, and frameworks they need to build 
                sustainable, profitable businesses—breaking free from the 91% failure statistic.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/10 to-purple-600/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardContent className="p-10">
              <div className="w-14 h-14 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                A world where entrepreneurship is no longer an emotional rollercoaster, but a systematic journey 
                with clear milestones, proven strategies, and achievable success.
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
            The principles that guide everything we build and every decision we make
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">Clarity Over Complexity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simple, clear solutions that actually work in the real world
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">User-First Always</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every feature is designed with real entrepreneur needs in mind
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">Systematic Growth</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Proven frameworks and measurable progress over hustle culture
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all group">
            <CardContent className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-orange-600/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold mb-3">Continuous Innovation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Always evolving to meet the changing needs of entrepreneurs
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Makes Us Different</h2>
          <p className="text-xl text-slate-300">
            We're not just another productivity tool—we're a complete system for entrepreneurial success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Built by Entrepreneurs, for Entrepreneurs</h3>
              <p className="text-slate-300 leading-relaxed">
                We understand the journey because we've lived it. Every feature solves a real problem we've faced.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Frameworks Integrated</h3>
              <p className="text-slate-300 leading-relaxed">
                50/30/20 budgeting, 4/20/80 hiring, 7 Levels of Growth—all in one seamless platform.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Results That Matter</h3>
              <p className="text-slate-300 leading-relaxed">
                We focus on outcomes: increased profit, better time management, and sustainable growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-green-600/10 backdrop-blur-sm border-white/10">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">By the Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">91%</div>
                  <div className="text-slate-400 text-sm">Business Failure Rate</div>
                  <div className="text-slate-500 text-xs mt-1">We're changing this</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">7</div>
                  <div className="text-slate-400 text-sm">Growth Levels</div>
                  <div className="text-slate-500 text-xs mt-1">From start to exit</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">3</div>
                  <div className="text-slate-400 text-sm">Core Frameworks</div>
                  <div className="text-slate-500 text-xs mt-1">Proven strategies</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">∞</div>
                  <div className="text-slate-400 text-sm">Your Potential</div>
                  <div className="text-slate-500 text-xs mt-1">No limits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=60')] opacity-5 bg-cover bg-center" />
            <CardContent className="relative p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Break Free from the 91%?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of entrepreneurs who are building sustainable, profitable businesses with systematic growth strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/product">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 font-semibold">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
