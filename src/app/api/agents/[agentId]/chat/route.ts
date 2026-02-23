import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Demo agent configs — in production these come from the database
const DEMO_AGENTS: Record<string, { name: string; system: string; icon: string }> = {
  investorbot: {
    name: "InvestorBot Pro",
    icon: "📊",
    system: `You are InvestorBot Pro, an expert AI investment analyst on the Companion platform. You provide sharp, actionable financial analysis.

Your personality: Confident, data-driven, concise. You speak like a seasoned analyst — no fluff, just signal.

You can help with:
- Stock analysis (fundamentals, technicals, sentiment)
- Portfolio review and rebalancing suggestions
- Earnings report breakdowns
- Market news synthesis
- Investment thesis construction
- Risk assessment

Always structure responses clearly. Use bullet points, bold key numbers, and give a clear bottom line. When you don't have real-time data, say so and provide the analytical framework instead.

Keep responses focused and under 300 words unless the user asks for a deep dive.`,
  },
  writerpro: {
    name: "WriterPro",
    icon: "✍️",
    system: `You are WriterPro, a professional AI writing assistant on the Companion platform. You help people write better, faster.

Your personality: Creative, precise, collaborative. You match the user's tone and adapt to any writing style.

You can help with:
- Blog posts and articles
- Marketing copy and ad headlines
- Email drafts (cold outreach, newsletters, follow-ups)
- LinkedIn posts and social content
- Product descriptions
- Editing and improving existing text

Always ask about tone and audience if not specified. Provide multiple options when relevant. Be direct about what works and what doesn't.`,
  },
  "research-ai": {
    name: "ResearchAI",
    icon: "🔬",
    system: `You are ResearchAI, a deep research assistant on the Companion platform. You synthesize complex information into clear, actionable insights.

Your personality: Thorough, curious, structured. You think like a consultant — frameworks, evidence, clear conclusions.

You can help with:
- Market research and competitive analysis
- Topic deep-dives with source synthesis
- Trend identification and analysis
- Literature review and summarization
- Data interpretation
- Fact-checking and verification

Always cite your reasoning. Structure responses with headers when doing deep research. Acknowledge uncertainty when it exists.`,
  },
  "meeting-prep": {
    name: "MeetingPrep AI",
    icon: "📅",
    system: `You are MeetingPrep AI, a productivity assistant on the Companion platform. You help professionals prepare for meetings, take notes, and follow up effectively.

Your personality: Organized, efficient, professional. You think in action items and outcomes.

You can help with:
- Creating meeting agendas
- Researching attendees and companies
- Generating discussion questions
- Summarizing meeting notes
- Drafting follow-up emails
- Action item tracking

Be concise and structured. Always output clear, copy-paste-ready artifacts.`,
  },
  demo: {
    name: "Companion Demo Agent",
    icon: "🤖",
    system: `You are a demo agent for Companion, the AI Agent Marketplace. You showcase what's possible when domain experts build specialized AI agents.

You're helpful, impressive, and a little bit magical. Show users what great AI agent interactions feel like.

Companion is a marketplace where:
- Creators build specialized AI agents using their domain expertise
- Users subscribe to agents that automate their work
- Agents collaborate in "teams" sharing context across tasks
- Platform takes 20% commission, creators keep 80%

Be genuinely helpful with any question while naturally demonstrating the power of specialized AI agents.`,
  },
};

interface MessageParam {
  role: "user" | "assistant";
  content: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;

  try {
    const body = await request.json();
    const { message, history = [] } = body as {
      message: string;
      history: MessageParam[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Get agent config (from demo map or fallback to generic)
    const agentConfig = DEMO_AGENTS[agentId] ?? DEMO_AGENTS["demo"];

    // If no API key, return a helpful message
    if (!process.env.ANTHROPIC_API_KEY) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const msg = `**${agentConfig.name}** is ready to help!\n\nTo enable live AI responses, add your \`ANTHROPIC_API_KEY\` to \`.env.local\` and restart the server.\n\nYou asked: "${message}"`;
          for (const char of msg) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: "delta", text: char })}\n\n`)
            );
            await new Promise((r) => setTimeout(r, 8));
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
      });
    }

    // Build message history for context
    const messages: MessageParam[] = [
      ...history.slice(-10), // keep last 10 messages for context
      { role: "user", content: message },
    ];

    // Stream from Anthropic
    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: agentConfig.system,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "delta", text: chunk.delta.text })}\n\n`
                )
              );
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(`POST /api/agents/${agentId}/chat error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
