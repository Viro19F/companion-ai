import { NextRequest, NextResponse } from "next/server";

// POST /api/agents/[agentId]/chat — Stream agent response
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;

  try {
    const { message, conversationId } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // TODO:
    // 1. Validate auth & subscription to this agent
    // 2. Load agent config from DB (systemPrompt, capabilities, model)
    // 3. Load/create conversation
    // 4. Check usage limits
    // 5. Call Anthropic API with streaming
    // 6. Log tool calls, save messages to DB
    // 7. Track usage

    // Example streaming response with Anthropic SDK:
    // const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    // const stream = await anthropic.messages.stream({
    //   model: agent.model,
    //   max_tokens: agent.maxTokens,
    //   system: agent.systemPrompt,
    //   messages: [...conversationHistory, { role: "user", content: message }],
    //   tools: getAgentTools(agent.capabilities),
    // });
    //
    // return new Response(stream.toReadableStream(), {
    //   headers: { "Content-Type": "text/event-stream" },
    // });

    // Mock streaming response for demo
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const mockResponse = `I'm the AI agent for agent ID: ${agentId}. You said: "${message}"\n\nTo enable real responses, add your ANTHROPIC_API_KEY to .env.local and implement the chat API route.`;

        for (const char of mockResponse) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "content_delta", content: char })}\n\n`
            )
          );
          await new Promise((r) => setTimeout(r, 10));
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "message_end" })}\n\n`)
        );
        controller.close();
      },
    });

    return new Response(stream, {
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
