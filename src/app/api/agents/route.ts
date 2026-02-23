import { NextRequest, NextResponse } from "next/server";

// GET /api/agents — List published agents with filtering & pagination
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");

  try {
    // TODO: Replace with Prisma query
    // const agents = await prisma.agent.findMany({
    //   where: {
    //     status: "PUBLISHED",
    //     ...(category && { category }),
    //     ...(search && {
    //       OR: [
    //         { name: { contains: search, mode: "insensitive" } },
    //         { tagline: { contains: search, mode: "insensitive" } },
    //         { description: { contains: search, mode: "insensitive" } },
    //       ],
    //     }),
    //     ...(priceMin !== null && { priceMonthly: { gte: parseFloat(priceMin) } }),
    //     ...(priceMax !== null && { priceMonthly: { lte: parseFloat(priceMax) } }),
    //   },
    //   orderBy: sort === "popular" ? { totalSubscribers: "desc" }
    //     : sort === "newest" ? { publishedAt: "desc" }
    //     : sort === "rating" ? { avgRating: "desc" }
    //     : { totalSubscribers: "desc" },
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   include: { creator: { select: { displayName: true, verified: true } } },
    // });

    // Mock response for now
    return NextResponse.json({
      agents: [],
      total: 0,
      page,
      pages: 0,
    });
  } catch (error) {
    console.error("GET /api/agents error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/agents — Create new agent (creator only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Validate auth token, check creator role, validate body with Zod, save to DB

    return NextResponse.json({ message: "Agent created" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/agents error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
