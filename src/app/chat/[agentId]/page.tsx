"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Info, MoreVertical, Paperclip, Mic } from "lucide-react";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm InvestorBot Pro. I can help you with real-time stock analysis, portfolio tracking, earnings summaries, and investment research. What would you like to explore today?",
    timestamp: new Date(),
  },
];

const SUGGESTED_PROMPTS = [
  "Analyze NVDA's recent earnings report",
  "What's happening in the semiconductor sector?",
  "Review my portfolio for diversification",
  "Summarize today's market movers",
];

export default function ChatPage({ params }: { params: { agentId: string } }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1200));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I'm analyzing your request about "${content}". In a production environment, I would connect to live market data, SEC filings, and earnings call transcripts to give you a comprehensive answer. For now, this is a demo response showing the chat interface in action.`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          I
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-gray-900 text-sm">InvestorBot Pro</h1>
          <p className="text-xs text-green-500 font-medium">Online</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Info className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs mr-3 mt-0.5 shrink-0">
                  I
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1.5 ${message.role === "user" ? "text-indigo-200" : "text-gray-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs mr-3 mt-0.5 shrink-0">
                I
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested prompts (show only at start) */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs text-gray-500 mb-2 font-medium">Suggested</p>
            <div className="flex gap-2 flex-wrap">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-200 shrink-0">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 mb-0.5">
              <Paperclip className="h-5 w-5" />
            </button>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask InvestorBot Pro anything..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none max-h-32 leading-relaxed"
              style={{ minHeight: "24px" }}
            />
            <div className="flex items-center gap-1 shrink-0">
              <button className="text-gray-400 hover:text-gray-600 transition-colors mb-0.5">
                <Mic className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AI can make mistakes. Verify important financial information independently.
          </p>
        </div>
      </div>
    </div>
  );
}
