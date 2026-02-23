import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from "@/components/agents/agent-card";
import { ArrowRight, Sparkles, Shield, Zap, Users, Star, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { AgentSummary } from "@/types";

const FEATURED_AGENTS: AgentSummary[] = [
  { id: "1", slug: "investorbot", name: "InvestorBot Pro", tagline: "Real-time stock analysis, portfolio tracking & investment research", iconUrl: null, category: "finance", priceMonthly: 29, hasFreeTier: false, avgRating: 4.9, ratingCount: 1240, totalSubscribers: 12400, creator: { displayName: "FinanceAI Labs", verified: true } },
  { id: "4", slug: "research-ai", name: "ResearchAI", tagline: "Deep-dive research on any topic with citations & summaries", iconUrl: null, category: "research", priceMonthly: 24, hasFreeTier: true, avgRating: 4.9, ratingCount: 912, totalSubscribers: 9100, creator: { displayName: "DeepMind Tools", verified: true } },
  { id: "6", slug: "code-reviewer", name: "CodeReviewer", tagline: "Automated code reviews, bug detection & refactoring suggestions", iconUrl: null, category: "development", priceMonthly: null, hasFreeTier: true, avgRating: 4.8, ratingCount: 1562, totalSubscribers: 15600, creator: { displayName: "DevTools AI", verified: true } },
];

const STATS = [
  { value: "1,200+", label: "AI Agents" },
  { value: "50K+", label: "Active users" },
  { value: "4.9★", label: "Avg rating" },
  { value: "$0", label: "To get started" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Browse the marketplace", description: "Explore 1,200+ agents built by domain experts across finance, legal, writing, and more." },
  { step: "2", title: "Subscribe in one click", description: "Choose a plan that fits your needs. Many agents offer free tiers to try before you buy." },
  { step: "3", title: "Chat & get results", description: "Start chatting immediately. Your agent knows your context and gets smarter over time." },
];

const TRUST_FEATURES = [
  { icon: Shield, title: "Enterprise-grade security", description: "SOC 2 Type II certified. Your data is encrypted at rest and in transit." },
  { icon: Zap, title: "Instant deployment", description: "No setup required. Start using any agent in under 60 seconds." },
  { icon: Users, title: "Built by experts", description: "Every agent is created and maintained by verified domain professionals." },
  { icon: TrendingUp, title: "Continuously improving", description: "Agents learn from feedback and are updated regularly by their creators." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white pt-20 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            1,200+ specialized AI agents now live
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
            Your work, accelerated<br className="hidden sm:block" />
            <span className="text-indigo-600"> by expert AI</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 mb-10 leading-relaxed">
            Subscribe to AI agents built by domain experts. Get institutional-quality analysis, writing, research, and more — all through a simple chat interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="xl" className="gap-2 w-full sm:w-auto">
                Browse agents <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Sign up free
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            {["No credit card required", "Free tier available", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured agents */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured agents</h2>
            <p className="text-gray-600">Top-rated agents trusted by professionals</p>
          </div>
          <Link href="/marketplace" className="hidden sm:flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
        <div className="flex justify-center mt-8 sm:hidden">
          <Link href="/marketplace">
            <Button variant="outline" size="md">View all agents</Button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Up and running in minutes</h2>
            <p className="text-gray-600 max-w-xl mx-auto">No integrations to set up. No prompts to engineer. Just subscribe and chat.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Built for professionals</h2>
          <p className="text-gray-600 max-w-xl mx-auto">The security, reliability, and quality your work demands.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((feature) => (
            <div key={feature.title} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to work smarter?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
            Join 50,000+ professionals already using AI agents to do their best work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="xl" className="bg-white text-indigo-600 hover:bg-indigo-50 gap-2 w-full sm:w-auto font-semibold">
                Browse the marketplace <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="xl" className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                Create free account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
