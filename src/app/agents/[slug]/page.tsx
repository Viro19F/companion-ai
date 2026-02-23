import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Zap, CheckCircle, ArrowRight, Shield, MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock data - in production this would come from your DB via params.slug
const AGENT_DATA = {
  id: "1",
  slug: "investorbot",
  name: "InvestorBot Pro",
  tagline: "Real-time stock analysis, portfolio tracking & investment research",
  description: "InvestorBot Pro is a sophisticated AI agent built by a team of ex-Goldman Sachs analysts and machine learning engineers. It monitors your portfolio in real-time, runs deep fundamental analysis, and delivers institutional-quality research in plain English.",
  iconUrl: null,
  category: "finance",
  priceMonthly: 29,
  pricingTiers: [
    { name: "Starter", price: 0, features: ["5 portfolio holdings", "Daily market summary", "Basic alerts"] },
    { name: "Pro", price: 29, features: ["Unlimited holdings", "Real-time analysis", "Earnings call summaries", "Custom watchlists", "Export to CSV"], highlighted: true },
    { name: "Enterprise", price: 99, features: ["Everything in Pro", "API access", "Custom data integrations", "Dedicated support"] },
  ],
  hasFreeTier: false,
  avgRating: 4.9,
  ratingCount: 1240,
  totalSubscribers: 12400,
  creator: { displayName: "FinanceAI Labs", verified: true, bio: "Building the future of AI-powered financial tools." },
  capabilities: [
    "Real-time stock & ETF analysis",
    "Portfolio performance tracking",
    "Earnings call summaries",
    "SEC filing analysis",
    "Custom price & news alerts",
    "Sector rotation insights",
    "Risk scoring & diversification tips",
  ],
  reviews: [
    { author: "Michael R.", rating: 5, text: "Replaced my Bloomberg terminal for 90% of my research needs. Saves me 3+ hours a day." },
    { author: "Sarah K.", rating: 5, text: "The earnings summaries are incredible. It reads the full call and gives me a 3-bullet takeaway instantly." },
    { author: "David L.", rating: 4, text: "Great agent. Wish the free tier was a bit more generous, but the Pro plan is 100% worth it." },
  ],
};

export default function AgentDetailPage({ params }: { params: { slug: string } }) {
  const agent = AGENT_DATA; // In production: fetch by params.slug

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
              {agent.name[0]}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                {agent.creator.verified && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Verified
                  </Badge>
                )}
                <Badge variant="secondary">{agent.category}</Badge>
              </div>
              <p className="text-lg text-gray-600 mb-4">{agent.tagline}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <strong className="text-gray-900">{agent.avgRating}</strong>
                  <span>({agent.ratingCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gray-400" />
                  {agent.totalSubscribers.toLocaleString()} subscribers
                </span>
                <span>by <strong className="text-gray-900">{agent.creator.displayName}</strong></span>
              </div>
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <Link href={`/chat/${agent.id}`}>
                <Button size="lg" className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Start Chatting
                </Button>
              </Link>
              <p className="text-center text-sm text-gray-500">
                {agent.hasFreeTier ? "Free tier available" : `From $${agent.priceMonthly}/mo`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this agent</h2>
              <p className="text-gray-600 leading-relaxed">{agent.description}</p>
            </section>

            {/* Capabilities */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {agent.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5 bg-white rounded-lg border border-gray-200 p-3">
                    <Zap className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span className="text-sm text-gray-700">{cap}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900">{agent.avgRating}</span>
                  <span className="text-gray-500 text-sm">/ 5</span>
                </div>
              </div>
              <div className="space-y-4">
                {agent.reviews.map((review, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.author}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Pricing */}
          <aside className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
            {agent.pricingTiers.map((tier) => (
              <div key={tier.name} className={`rounded-xl border p-5 ${tier.highlighted ? "border-indigo-500 ring-2 ring-indigo-500" : "border-gray-200 bg-white"}`}>
                {tier.highlighted && (
                  <Badge variant="default" className="mb-3">Most Popular</Badge>
                )}
                <div className="mb-1">
                  <span className="text-2xl font-bold text-gray-900">{tier.price === 0 ? "Free" : `$${tier.price}`}</span>
                  {tier.price > 0 && <span className="text-gray-500 text-sm">/mo</span>}
                </div>
                <p className="font-medium text-gray-900 mb-3">{tier.name}</p>
                <ul className="space-y-2 mb-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/chat/${agent.id}`}>
                  <Button variant={tier.highlighted ? "primary" : "outline"} size="md" className="w-full gap-1">
                    Get started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Shield className="h-4 w-4 text-green-500" />
              Cancel anytime. No contracts.
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
