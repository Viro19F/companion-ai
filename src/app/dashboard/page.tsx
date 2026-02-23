import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, TrendingUp, Plus, Clock, Zap } from "lucide-react";
import Link from "next/link";

const SUBSCRIBED_AGENTS = [
  { id: "1", slug: "investorbot", name: "InvestorBot Pro", category: "finance", lastUsed: "2 hours ago", messagesThisMonth: 87, tier: "Pro" },
  { id: "4", slug: "research-ai", name: "ResearchAI", category: "research", lastUsed: "Yesterday", messagesThisMonth: 34, tier: "Free" },
  { id: "2", slug: "writerpro", name: "WriterPro", category: "writing", lastUsed: "3 days ago", messagesThisMonth: 12, tier: "Pro" },
];

const RECENT_CHATS = [
  { agentId: "1", agentName: "InvestorBot Pro", preview: "What's the current P/E ratio for NVDA compared to...", time: "2h ago" },
  { agentId: "4", agentName: "ResearchAI", preview: "Summarize the latest research on transformer architectures...", time: "Yesterday" },
  { agentId: "2", agentName: "WriterPro", preview: "Write a LinkedIn post about our Q4 product launch...", time: "3d ago" },
];

const STATS = [
  { label: "Active agents", value: "3", icon: Zap, color: "text-indigo-600" },
  { label: "Messages this month", value: "133", icon: MessageSquare, color: "text-purple-600" },
  { label: "Avg. time saved/day", value: "2.4h", icon: Clock, color: "text-green-600" },
  { label: "Tasks completed", value: "247", icon: TrendingUp, color: "text-orange-600" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Alex</p>
          </div>
          <Link href="/marketplace">
            <Button size="md" className="gap-2">
              <Plus className="h-4 w-4" />
              Add agent
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className={`inline-flex p-2 rounded-lg bg-gray-50 mb-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Agents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">My Agents</h2>
                <Link href="/marketplace" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Browse more
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {SUBSCRIBED_AGENTS.map((agent) => (
                  <div key={agent.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shrink-0">
                      {agent.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">{agent.name}</span>
                        <Badge variant={agent.tier === "Pro" ? "default" : "secondary"} className="text-xs shrink-0">
                          {agent.tier}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {agent.messagesThisMonth} messages this month · Last used {agent.lastUsed}
                      </p>
                    </div>
                    <Link href={`/chat/${agent.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-100">
                <Link href="/marketplace">
                  <Button variant="outline" size="sm" className="gap-2 w-full">
                    <Plus className="h-4 w-4" />
                    Add a new agent
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent chats */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Chats</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {RECENT_CHATS.map((chat, i) => (
                  <Link key={i} href={`/chat/${chat.agentId}`} className="block px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{chat.agentName}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="mt-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                <span className="font-semibold text-sm">Upgrade to Pro</span>
              </div>
              <p className="text-sm text-indigo-100 mb-4">Unlock unlimited messages, priority support & advanced analytics.</p>
              <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 w-full font-semibold">
                Upgrade now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
