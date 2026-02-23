# Companion — AI Agent Marketplace

> **"Shopify meets App Store for AI Agents"**

Companion is a platform where **creators** build and monetize AI agents, and **users** subscribe to agents that automate their work. Agents collaborate in teams, share context, and work together on complex tasks.

---

## What's Built (Phase 1 Foundation)

| Page | Route | Status |
|------|-------|--------|
| Landing Page | `/` | ✅ Complete |
| Marketplace | `/marketplace` | ✅ Complete |
| Agent Detail | `/agents/[slug]` | ✅ Complete |
| My Companions Dashboard | `/dashboard` | ✅ Complete |
| Chat Interface | `/chat/[agentId]` | ✅ Complete |
| Creator Dashboard | `/creator` | ✅ Complete |
| Sign In / Sign Up | `/auth/login`, `/auth/register` | ✅ Complete |
| API: Agents | `/api/agents` | ✅ Scaffolded |
| API: Chat (streaming SSE) | `/api/agents/[id]/chat` | ✅ Scaffolded |
| API: Subscriptions | `/api/subscriptions` | ✅ Scaffolded |
| Database Schema | Prisma | ✅ Complete (20 models) |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS + custom component library |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth v5 (Google + GitHub OAuth) |
| Payments | Stripe + Stripe Connect (creator payouts) |
| AI | Anthropic Claude API (primary), GPT-4 (fallback) |
| Storage | Cloudflare R2 / AWS S3 |
| Vector DB | Pinecone (agent knowledge bases) |
| Cache | Redis / Upstash |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your values (see .env.example for all keys)
```

### 3. Set up the database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── marketplace/                # Agent marketplace grid
│   ├── agents/[slug]/              # Agent detail + reviews
│   ├── dashboard/                  # User's agent management
│   ├── chat/[agentId]/             # Real-time chat interface
│   ├── creator/                    # Creator analytics + tools
│   ├── auth/                       # Login + Register
│   └── api/
│       ├── agents/                 # CRUD + streaming chat
│       └── subscriptions/          # Subscription management
├── components/
│   ├── ui/                         # Button, Badge, Card, Input, Avatar
│   ├── layout/                     # Navbar, Footer
│   └── agents/                     # AgentCard
├── lib/utils.ts                    # cn(), formatPrice(), timeAgo()
└── types/index.ts                  # TypeScript types + constants
prisma/schema.prisma                # Full database schema (20 models)
```

---

## Business Model

| Revenue Stream | Description | Margin |
|----------------|-------------|--------|
| Subscription Commission | 20% of all creator agent subscriptions | 20% |
| Companion Pro Agents | Platform-native agents (built from learning) | 100% |
| Featured Placement | Creators pay for marketplace visibility | 100% |
| Enterprise Tier | Custom agent teams for businesses | High |

**Creators keep 80%** of all subscription revenue via Stripe Connect.

---

## Roadmap

- **Phase 1** (Current): Foundation — auth, marketplace, chat, creator dashboard
- **Phase 2**: Stripe integration, full agent builder, OAuth connections, knowledge bases
- **Phase 3**: Agent teams & collaboration, creator analytics, reviews
- **Phase 4**: Companion Pro agents, mobile app, enterprise features

---

## Deployment

```bash
# Frontend (Vercel)
npx vercel

# Database migrations
npx prisma migrate deploy
```

---

Built with Next.js 14 · Tailwind CSS · Prisma · Anthropic Claude  
© 2026 Companion AI, Inc.
