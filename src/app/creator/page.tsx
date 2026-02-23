import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Edit,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const MOCK_AGENTS = [
  {
    id: "1",
    name: "InvestorBot Pro",
    icon: "📊",
    status: "PUBLISHED",
    subscribers: 1240,
    revenue: 35960,
    rating: 4.9,
    ratingCount: 1240,
  },
  {
    id: "2",
    name: "TaxHelper",
    icon: "⚖️",
    status: "PUBLISHED",
    subscribers: 380,
    revenue: 11020,
    rating: 4.6,
    ratingCount: 382,
  },
  {
    id: "3",
    name: "Portfolio Tracker",
    icon: "📈",
    status: "DRAFT",
    subscribers: 0,
    revenue: 0,
    rating: null,
    ratingCount: 0,
  },
];

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  DRAFT: "bg-gray-100 text-gray-600",
  REVIEW: "bg-amber-100 text-amber-700",
  SUSPENDED: "bg-red-100 text-red-700",
};

export default function CreatorDashboardPage() {
  const totalRevenue = MOCK_AGENTS.reduce((sum, a) => sum + a.revenue, 0);
  const totalSubscribers = MOCK_AGENTS.reduce((sum, a) => sum + a.subscribers, 0);
  const publishedAgents = MOCK_AGENTS.filter((a) => a.status === "PUBLISHED").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Creator Dashboard</h1>
            <p className="text-gray-600 mt-1">FinanceAI Labs</p>
          </div>
          <Link href="/creator/agents/new">
            <Button>
              <Plus className="h-4 w-4" />
              New Agent
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Revenue",
              value: `$${(totalRevenue / 100).toLocaleString()}`,
              sub: "All time",
              icon: DollarSign,
              color: "emerald",
            },
            {
              label: "Total Subscribers",
              value: totalSubscribers.toLocaleString(),
              sub: "Active",
              icon: Users,
              color: "indigo",
            },
            {
              label: "Published Agents",
              value: publishedAgents.toString(),
              sub: `of ${MOCK_AGENTS.length} total`,
              icon: CheckCircle,
              color: "purple",
            },
            {
              label: "Avg Rating",
              value: "4.8",
              sub: "Across all agents",
              icon: Star,
              color: "amber",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-${stat.color}-100 mb-3`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Revenue Chart placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              Revenue Over Time
            </h2>
            <div className="flex gap-2">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    period === "30d"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-dashed border-indigo-200">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Revenue chart renders with live data
              </p>
              <p className="text-xs text-gray-400">Connect your database to see analytics</p>
            </div>
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">My Agents</h2>
            <Link href="/creator/agents/new">
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
                Create agent
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Agent</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Subscribers</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Revenue</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Rating</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_AGENTS.map((agent) => (
                  <tr key={agent.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{agent.icon}</span>
                        <span className="font-medium text-gray-900 text-sm">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[agent.status]}`}>
                        {agent.status.charAt(0) + agent.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-gray-700">
                      {agent.subscribers.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-medium text-gray-900">
                      ${(agent.revenue / 100).toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right text-sm text-gray-700">
                      {agent.rating ? (
                        <span className="flex items-center justify-end gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {agent.rating}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/creator/agents/${agent.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/creator/agents/${agent.id}/analytics`}>
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-3.5 w-3.5" />
                            Stats
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Ready to pay out</h3>
              <p className="text-indigo-200 text-sm">Your earnings are processed monthly via Stripe Connect</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">$2,847.20</div>
              <p className="text-indigo-200 text-sm">Available balance</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" size="sm">
              Request payout
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              View history
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
