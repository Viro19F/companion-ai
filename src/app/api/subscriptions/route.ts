import { NextRequest, NextResponse } from "next/server";

// GET /api/subscriptions — List user's subscriptions
export async function GET(request: NextRequest) {
  try {
    // TODO: Auth check, fetch from DB
    // const userId = await getUserIdFromRequest(request);
    // const subscriptions = await prisma.subscription.findMany({
    //   where: { userId, status: { in: ["ACTIVE", "TRIALING"] } },
    //   include: { agent: { include: { creator: true } } },
    // });

    return NextResponse.json({ subscriptions: [] });
  } catch (error) {
    console.error("GET /api/subscriptions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/subscriptions — Subscribe to an agent
export async function POST(request: NextRequest) {
  try {
    const { agentId, tier, trial } = await request.json();

    if (!agentId) {
      return NextResponse.json({ error: "agentId is required" }, { status: 400 });
    }

    // TODO:
    // 1. Auth check
    // 2. Load agent pricing config
    // 3. Check user's subscription tier allows another agent slot
    // 4. If free tier: create subscription directly
    // 5. If paid: create Stripe checkout session and return URL
    // 6. Handle trial period setup

    // Example Stripe checkout:
    // const session = await stripe.checkout.sessions.create({
    //   customer: user.stripeCustomerId,
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   mode: "subscription",
    //   subscription_data: {
    //     trial_period_days: trial ? agent.trialDays : undefined,
    //     application_fee_percent: 20,
    //     transfer_data: { destination: creator.stripeAccountId },
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=${agentId}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/agents/${agent.slug}`,
    // });
    // return NextResponse.json({ checkoutUrl: session.url });

    return NextResponse.json({
      message: "Subscription created",
      subscription: { agentId, tier: tier || "basic", status: "ACTIVE" },
    });
  } catch (error) {
    console.error("POST /api/subscriptions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
