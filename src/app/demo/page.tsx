"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, ArrowRight, Sparkles, Users, Zap, TrendingUp, Shield, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const DEMO_AGENTS = [
  {
    id: "investorbot",
    name: "InvestorBot Pro",
    icon: "📊",
    category: "Finance",
    tagline: "Your personal AI investment analyst",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
    prompt: "Analyze Apple stock for me",
  },
  {
    id: "writerpro",
    name: "WriterPro",
    icon: "✍️",
    category: "Writing",
    tagline: "Generate blog posts, emails & copy in seconds",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    accent: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
    prompt: "Write a cold email to a VC investor",
  },
  {
    id: "research-ai",
    name: "ResearchAI",
    icon: "🔬",
    category: "Research",
    tagline: "Deep research on any topic in minutes",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    accent: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    prompt: "What is the size of the AI agent market?",
  },
  {
    id: "meeting-prep",
    name: "MeetingPrep AI",
    icon: "📅",
    category: "Productivity",
    tagline: "Auto-prep for every meeting",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    prompt: "Create an agenda for an investor pitch meeting",
  },
];

const TEAM_DEMO = {
  name: "Finance Stack",
  agents: [
    { icon: "📊", name: "InvestorBot", action: "Analyzing AAPL fundamentals..." },
    { icon: "📰", name: "NewsDigest", action: "Pulling latest earnings news..." },
    { icon: "⚖️", name: "TaxHelper", action: "Checking tax implications..." },
  ],
  result: "Complete investment brief ready in 8 seconds",
};

const METRICS = [
  { value: "8s", label: "Avg team response time", sub: "vs 45 min manual research" },
  { value: "80%", label: "Revenue to creators", sub: "Industry-leading split" },
  { value: "1,200+", label: "Agents at launch", sub: "Across 14 categories" },
  { value: "$2M+", label: "Creator earnings potential", sub: "Year one projection" },
];

export default function DemoPage() {
  const [activeTeamStep, setActiveTeamStep] = useState(0);
  const [teamRunning, setTeamRunning] = useState(false);

  const runTeamDemo = async () => {
    setTeamRunning(true);
    setActiveTeamStep(0);
    for (let i = 0; i <= TEAM_DEMO.agents.length; i++) {
      await new Promise((r) => setTimeout(r, 1200));
      setActiveTeamStep(i + 1);
    }
    setTeamRunning(false);
  };

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-950 to-indigo-900 text-white px-4 py-20 text-center">
        <Badge className="mb-6 inline-flex bg-amber-400/20 text-amber-300 border border-amber-400/30 px-4 py-1.5">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Live Interactive Demo
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          See Companion in action
        </h1>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
          Real AI agents, real responses. No mock data. Chat with any agent below or watch the team collaboration demo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/chat/demo">
            <Button size="lg" variant="amber" className="gap-2">
              <Play className="h-4 w-4" />
              Try an agent now
            </Button>
          </Link>
          <a href="#team-demo">
            <Button size="lg" variant="outline" className="border-indigo-400 text-white bg-white/10 hover:bg-white/20 gap-2">
              <Users className="h-4 w-4" />
              See team collaboration
            </Button>
          </a>
        </div>
      </section>

      {/* Live Agent Demo Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Chat with real agents</h2>
            <p className="text-gray-600">Each agent has a specialized system prompt built by domain experts. Click to open a live chat.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {DEMO_AGENTS.map((agent) => (
              <div key={agent.id} className={`rounded-2xl border ${agent.border} ${agent.bg} p-6 hover:shadow-md transition-all`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{agent.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{agent.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${agent.badge}`}>{agent.category}</span>
                    </div>
                    <p className="text-sm text-gray-600">{agent.tagline}</p>
                  </div>
                </div>

                {/* Sample prompt preview */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Example prompt:</p>
                  <p className="text-sm text-gray-700 italic">&ldquo;{agent.prompt}&rdquo;</p>
                </div>

                <Link href={`/chat/${agent.id}`}>
                  <Button className="w-full gap-2 bg-gradient-to-r border-0 text-white" style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                    <Zap className="h-4 w-4" />
                    Open live chat
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Collaboration Demo */}
      <section id="team-demo" className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4">Key Differentiator</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              The power of agent teams
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Individual agents are powerful. Teams are transformative. Watch 3 agents collaborate in real-time to answer one question.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Without Companion:</h3>
              <div className="space-y-3 mb-8">
                {[
                  { time: "15 min", task: "Search for stock data manually" },
                  { time: "20 min", task: "Read through earnings reports" },
                  { time: "10 min", task: "Check tax implications" },
                  { time: "45 min", task: "Total time wasted" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${i === 3 ? "bg-red-50 border border-red-200" : "bg-gray-50"}`}>
                    <span className={`text-sm font-bold w-16 shrink-0 ${i === 3 ? "text-red-600" : "text-gray-500"}`}>{item.time}</span>
                    <span className={`text-sm ${i === 3 ? "text-red-700 font-medium" : "text-gray-600"}`}>{item.task}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">With Companion Finance Stack:</h3>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
                <div className="text-4xl font-bold text-emerald-600">8s</div>
                <div>
                  <p className="font-semibold text-gray-900">Complete investment brief</p>
                  <p className="text-sm text-gray-600">3 agents working in parallel</p>
                </div>
              </div>
            </div>

            {/* Interactive team demo */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white" />
                  <span className="font-semibold text-white">{TEAM_DEMO.name}</span>
                  <Badge className="ml-auto bg-white/20 text-white border-0 text-xs">3 agents</Badge>
                </div>
              </div>

              <div className="p-5">
                <div className="bg-indigo-50 rounded-xl p-3 mb-5 flex gap-2 items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">U</div>
                  <p className="text-sm text-gray-700">&ldquo;Should I buy more Apple stock given the current market?&rdquo;</p>
                </div>

                <div className="space-y-3 mb-5">
                  {TEAM_DEMO.agents.map((agent, i) => (
                    <div key={i} className={`flex items-center gap-3 rounded-xl p-3 border transition-all duration-500 ${
                      activeTeamStep > i
                        ? "border-emerald-200 bg-emerald-50"
                        : activeTeamStep === i
                        ? "border-indigo-200 bg-indigo-50 animate-pulse"
                        : "border-gray-100 bg-gray-50"
                    }`}>
                      <div className="text-xl">{agent.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className={`text-xs truncate transition-all ${activeTeamStep > i ? "text-emerald-600" : "text-gray-400"}`}>
                          {activeTeamStep > i ? "✓ Complete" : activeTeamStep === i ? agent.action : "Waiting..."}
                        </div>
                      </div>
                      {activeTeamStep > i && (
                        <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {activeTeamStep > TEAM_DEMO.agents.length ? (
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="font-semibold">{TEAM_DEMO.result}</p>
                    <p className="text-indigo-200 text-sm mt-1">Based on data from 3 specialized agents</p>
                  </div>
                ) : (
                  <Button
                    onClick={runTeamDemo}
                    disabled={teamRunning}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {teamRunning ? (
                      <>
                        <span className="flex gap-1">
                          {[0,1,2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
                        </span>
                        Agents working...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Run team demo
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traction / Metrics */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">The opportunity</h2>
            <p className="text-gray-400">The AI agent market is a $47B opportunity by 2030. Companion is built to own the marketplace layer.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                <div className="text-4xl font-bold text-amber-400 mb-2">{m.value}</div>
                <div className="text-sm font-medium text-white mb-1">{m.label}</div>
                <div className="text-xs text-gray-500">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Companion wins</h2>
            <p className="text-gray-600">Four unfair advantages that compound over time</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Safe sandbox = creator trust",
                desc: "Creators can customize agents freely within guardrails. No arbitrary code execution risk. This unlocks domain experts who won't build on open platforms.",
                color: "indigo",
              },
              {
                icon: Users,
                title: "Agent teams = deep lock-in",
                desc: "Once a user builds a team of 3-5 agents that works together, switching cost is enormous. No competitor offers this.",
                color: "purple",
              },
              {
                icon: TrendingUp,
                title: "Meta-learning = compounding moat",
                desc: "Aggregated patterns from all creator agents train our Companion Pro agents. The platform gets smarter every day.",
                color: "emerald",
              },
              {
                icon: Zap,
                title: "80% revenue share = creator magnet",
                desc: "Industry best. Domain experts with 10k+ followers will build on Companion first. Network effects follow content.",
                color: "amber",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-2xl border border-gray-200 p-6">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-${color}-100 mb-4`}>
                  <Icon className={`h-5 w-5 text-${color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to invest in the future of AI work?</h2>
        <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
          Companion is raising a seed round. We&apos;re looking for investors who understand the marketplace model and the AI wave.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="mailto:hello@companion.ai">
            <Button size="xl" variant="amber" className="gap-2 w-full sm:w-auto">
              Talk to the team
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button size="xl" variant="outline" className="border-indigo-300 text-white bg-white/10 hover:bg-white/20 w-full sm:w-auto">
              Explore the product
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
