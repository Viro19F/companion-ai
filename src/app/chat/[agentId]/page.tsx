"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft, Send, Paperclip, ThumbsUp, ThumbsDown,
  Copy, RotateCcw, Settings, ChevronLeft, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, timeAgo } from "@/lib/utils";
import { use } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AGENT_META: Record<string, { name: string; icon: string; creator: string; category: string; suggested: string[] }> = {
  investorbot: {
    name: "InvestorBot Pro", icon: "📊", creator: "FinanceAI Labs", category: "Finance",
    suggested: ["Analyze Apple stock for me", "What's the best ETF for a beginner?", "Review my portfolio: 60% tech, 20% bonds, 20% cash", "Explain the current interest rate environment"],
  },
  writerpro: {
    name: "WriterPro", icon: "✍️", creator: "ContentStack", category: "Writing",
    suggested: ["Write a LinkedIn post about AI productivity", "Draft a cold email to a potential investor", "Write 3 headline options for a SaaS landing page", "Improve this: 'Our product is really good and helps people'"],
  },
  "research-ai": {
    name: "ResearchAI", icon: "🔬", creator: "DeepMind Tools", category: "Research",
    suggested: ["Research the AI agent market size and growth", "Who are the main competitors to OpenAI?", "What are key trends in SaaS pricing models?", "What is the state of AI regulation in the EU?"],
  },
  "meeting-prep": {
    name: "MeetingPrep AI", icon: "📅", creator: "ProductivityHub", category: "Productivity",
    suggested: ["Create an agenda for a 30-min investor pitch", "What questions should I prepare for a VC meeting?", "Write a follow-up email after a sales call", "Generate action items from our product roadmap discussion"],
  },
  demo: {
    name: "Companion Demo", icon: "🤖", creator: "Companion", category: "Demo",
    suggested: ["What can AI agents do for me?", "How does Companion work?", "What makes agent teams powerful?", "Show me what a great AI agent looks like"],
  },
};

export default function ChatPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = use(params);
  const agent = AGENT_META[agentId] ?? AGENT_META["demo"];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isStreaming) return;
    setInput("");

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

    try {
      abortRef.current = new AbortController();
      const history = messages.map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(`/api/agents/${agentId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "delta" && data.text) {
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: m.content + data.text } : m));
            }
          } catch { /* ignore */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: "Something went wrong. Please try again." } : m));
      }
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, agentId]);

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3 shrink-0">
        <Link href="/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div className="text-2xl">{agent.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 truncate">{agent.name}</span>
            <Badge variant="success" className="text-xs shrink-0">Online</Badge>
          </div>
          <p className="text-xs text-gray-500">{agent.category} · by {agent.creator}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
          <Settings className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col shrink-0">
            <div className="p-3 flex items-center justify-between border-b border-gray-200">
              <span className="text-sm font-medium text-gray-900">Conversations</span>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}><ChevronLeft className="h-4 w-4" /></Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              <div className="text-xs font-medium text-gray-400 px-2 py-1.5">Today</div>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-indigo-50 text-indigo-700 font-medium">Current conversation</button>
              <div className="text-xs font-medium text-gray-400 px-2 py-1.5 mt-2">Previous</div>
              {["Stock analysis deep dive", "Portfolio Q2 review", "Earnings breakdown MSFT"].map((t) => (
                <button key={t} className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-white transition-colors truncate">{t}</button>
              ))}
            </div>
            <div className="p-2 border-t border-gray-200">
              <Button variant="ghost" size="sm" className="w-full gap-2" onClick={() => setMessages([])}>
                <Plus className="h-4 w-4" />New conversation
              </Button>
            </div>
          </aside>
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="text-5xl mb-4">{agent.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h2>
                <p className="text-gray-500 text-sm mb-8 max-w-sm">How can I help you today? Try one of these or ask me anything.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                  {agent.suggested.map((prompt) => (
                    <button key={prompt} onClick={() => sendMessage(prompt)}
                      className="text-left p-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm text-gray-700 hover:text-indigo-700">
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex gap-3 group", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg shrink-0 mt-1">{agent.icon}</div>
                    )}
                    <div className={cn("max-w-[80%]", msg.role === "user" && "items-end flex flex-col")}>
                      <div className={cn("rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-gray-100 text-gray-900 rounded-tl-sm whitespace-pre-wrap")}>
                        {msg.content || (
                          <span className="flex gap-1 items-center py-0.5">
                            {[0,1,2].map((i) => (
                              <span key={i} className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                            ))}
                          </span>
                        )}
                      </div>
                      {msg.role === "assistant" && msg.content && (
                        <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => copyMessage(msg.content, msg.id)} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                            {copied === msg.id ? <span className="text-xs text-emerald-600">Copied!</span> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-emerald-600 transition-colors"><ThumbsUp className="h-3.5 w-3.5" /></button>
                          <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"><ThumbsDown className="h-3.5 w-3.5" /></button>
                          <button onClick={() => { const prev = messages[messages.indexOf(msg)-1]; if(prev) sendMessage(prev.content); }} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"><RotateCcw className="h-3.5 w-3.5" /></button>
                          <span className="text-xs text-gray-400 ml-1">{timeAgo(msg.timestamp)}</span>
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium shrink-0 mt-1">U</div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-3 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <button className="p-1 text-gray-400 hover:text-gray-600 mb-0.5 shrink-0"><Paperclip className="h-4 w-4" /></button>
                <textarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={`Message ${agent.name}...`}
                  className="flex-1 resize-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none min-h-[24px] max-h-40 leading-relaxed"
                  rows={1} disabled={isStreaming} />
                {isStreaming ? (
                  <button onClick={() => abortRef.current?.abort()}
                    className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors shrink-0">
                    <span className="h-3 w-3 rounded-sm bg-gray-600" />
                  </button>
                ) : (
                  <button onClick={() => sendMessage()} disabled={!input.trim()}
                    className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0">
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">{agent.name} can make mistakes. Verify important information.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
