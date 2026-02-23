import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AgentCard } from "@/components/agents/agent-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, TrendingUp, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import { AGENT_CATEGORIES } from "@/types";
import type { AgentSummary } from "@/types";

const MOCK_AGENTS: AgentSummary[] = [
  { id: "1", slug: "investorbot", name: "InvestorBot Pro", tagline: "Real-time stock analysis, portfolio tracking & investment research", iconUrl: null, category: "finance", priceMonthly: 29, hasFreeTier: false, avgRating: 4.9, ratingCount: 1240, totalSubscribers: 12400, creator: { displayName: "FinanceAI Labs", verified: true } },
  { id: "2", slug: "writerpro", name: "WriterPro", tagline: "Generate blog posts, marketing copy, emails & more in your voice", iconUrl: null, category: "writing", priceMonthly: 19, hasFreeTier: true, avgRating: 4.8, ratingCount: 876, totalSubscribers: 8700, creator: { displayName: "ContentStack", verified: true } },
  { id: "3", slug: "meeting-prep", name: "MeetingPrep AI", tagline: "Auto-research attendees, create agendas & take meeting notes", iconUrl: null, category: "productivity", priceMonthly: 15, hasFreeTier: false, avgRating: 4.7, ratingCount: 523, totalSubscribers: 5200, creator: { displayName: "ProductivityHub", verified: false } },
  { id: "4", slug: "research-ai", name: "ResearchAI", tagline: "Deep-dive research on any topic with citations & summaries", iconUrl: null, category: "research", priceMonthly: 24, hasFreeTier: true, avgRating: 4.9, ratingCount: 912, totalSubscribers: 9100, creator: { displayName: "DeepMind Tools", verified: true } },
  { id: "5", slug: "tax-helper", name: "TaxHelper", tagline: "Year-round tax strategy, deduction finder & filing prep", iconUrl: null, category: "finance", priceMonthly: 39, hasFreeTier: false, avgRating: 4.6, ratingCount: 382, totalSubscribers: 3800, creator: { displayName: "TaxAI Inc", verified: true } },
  { id: "6", slug: "code-reviewer", name: "CodeReviewer", tagline: "Automated code reviews, bug detection & refactoring suggestions", iconUrl: null, category: "development", priceMonthly: null, hasFreeTier: true, avgRating: 4.8, ratingCount: 1562, totalSubscribers: 15600, creator: { displayName: "DevTools AI", verified: true } },
  { id: "7", slug: "social-manager", name: "SocialManager", tagline: "Schedule posts, generate captions & analyze performance", iconUrl: null, category: "marketing", priceMonthly: 22, hasFreeTier: true, avgRating: 4.5, ratingCount: 445, totalSubscribers: 4400, creator: { displayName: "SocialAI", verified: false } },
  { id: "8", slug: "hr-screener", name: "HR Screener", tagline: "Resume screening, interview question generation & candidate ranking", iconUrl: null, category: "hr", priceMonthly: 49, hasFreeTier: false, avgRating: 4.7, ratingCount: 234, totalSubscribers: 2300, creator: { displayName: "HRTech AI", verified: true } },
  { id: "9", slug: "legal-reviewer", name: "LegalReviewer", tagline: "Contract analysis, red flag detection & plain-English summaries", iconUrl: null, category: "legal", priceMonthly: 59, hasFreeTier: false, avgRating: 4.8, ratingCount: 189, totalSubscribers: 1900, creator: { displayName: "LegalAI Pro", verified: true } },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular", icon: TrendingUp },
  { value: "newest", label: "Newest", icon: Clock },
  { value: "rating", label: "Top Rated", icon: Sparkles },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Marketplace</h1>
          <p className="text-gray-600">Discover 1,200+ agents built by domain experts</p>
          <div className="mt-6 flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search agents by name, category, or capability..." className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <Button variant="outline" size="md" className="gap-2 shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            <Badge variant="default" className="cursor-pointer shrink-0 px-3 py-1.5">All</Badge>
            {AGENT_CATEGORIES.map((cat) => (
              <Badge key={cat.slug} variant="secondary" className="cursor-pointer shrink-0 px-3 py-1.5 hover:bg-indigo-100 transition-colors">
                {cat.icon} {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price</h4>
                  <div className="space-y-2">
                    {["Free", "Under $20/mo", "$20-$50/mo", "$50+/mo"].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                        <span className="text-sm text-gray-600">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Min Rating</h4>
                  <div className="space-y-2">
                    {["4.5+", "4.0+", "3.5+"].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="rating" className="border-gray-300 text-indigo-600" />
                        <span className="text-sm text-gray-600">★ {rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600" />
                    <span className="text-sm text-gray-700 font-medium">Free trial available</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">Showing <span className="font-semibold text-gray-900">{MOCK_AGENTS.length}</span> agents</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <div className="flex gap-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.value} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${opt.value === "popular" ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <opt.icon className="h-3.5 w-3.5" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {MOCK_AGENTS.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg">Load more agents</Button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
