// ================================
// Companion AI — Core TypeScript Types
// ================================

export type UserRole = "USER" | "CREATOR" | "ADMIN";
export type UserTier = "FREE" | "PLUS" | "PRO" | "TEAM";
export type AgentStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "SUSPENDED";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING";
export type CollaborationMode = "PARALLEL" | "SEQUENTIAL" | "HIERARCHICAL";
export type PricingModel = "FREE" | "SUBSCRIPTION" | "USAGE";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: UserRole;
  subscriptionTier: UserTier;
  createdAt: Date;
}

export interface Creator {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  website: string | null;
  twitter: string | null;
  verified: boolean;
  tier: string;
  totalRevenue: number;
  totalSubscribers: number;
  createdAt: Date;
}

export interface Agent {
  id: string;
  creatorId: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  iconUrl: string | null;
  coverImageUrl: string | null;
  category: string | null;
  tags: string[];
  pricingModel: PricingModel;
  priceMonthly: number | null;
  priceYearly: number | null;
  hasFreeTier: boolean;
  trialDays: number;
  capabilities: string[];
  model: string;
  status: AgentStatus;
  totalSubscribers: number;
  totalConversations: number;
  avgRating: number | null;
  ratingCount: number;
  publishedAt: Date | null;
  createdAt: Date;
  creator?: Creator;
}

export interface AgentSummary {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  iconUrl: string | null;
  category: string | null;
  priceMonthly: number | null;
  hasFreeTier: boolean;
  avgRating: number | null;
  ratingCount: number;
  totalSubscribers: number;
  creator: {
    displayName: string;
    verified: boolean;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  agentId: string;
  status: SubscriptionStatus;
  tier: string | null;
  currentPeriodEnd: Date | null;
  messagesThisPeriod: number;
  lastUsedAt: Date | null;
  agent?: AgentSummary;
}

export interface Conversation {
  id: string;
  userId: string;
  agentId: string | null;
  title: string | null;
  isTeamChat: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  agent?: AgentSummary;
}

export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string | null;
  agentId: string | null;
  toolCalls: ToolCall[] | null;
  toolResults: ToolResult[] | null;
  tokensUsed: number | null;
  modelUsed: string | null;
  latencyMs: number | null;
  createdAt: Date;
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface ToolResult {
  toolCallId: string;
  result: unknown;
  error?: string;
}

export interface AgentTeam {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  leadAgentId: string | null;
  collaborationMode: CollaborationMode;
  sharedContextEnabled: boolean;
  members: AgentTeamMember[];
  createdAt: Date;
}

export interface AgentTeamMember {
  id: string;
  teamId: string;
  agentId: string;
  role: string;
  priority: number;
  agent?: AgentSummary;
}

export interface Review {
  id: string;
  userId: string;
  agentId: string;
  rating: number;
  title: string | null;
  body: string | null;
  verified: boolean;
  helpfulCount: number;
  createdAt: Date;
  user?: { name: string | null; avatarUrl: string | null };
}

export interface AgentCategory {
  name: string;
  slug: string;
  icon: string;
  count?: number;
}

export const AGENT_CATEGORIES: AgentCategory[] = [
  { name: "Finance", slug: "finance", icon: "📊" },
  { name: "Productivity", slug: "productivity", icon: "⚡" },
  { name: "Writing", slug: "writing", icon: "✍️" },
  { name: "Research", slug: "research", icon: "🔬" },
  { name: "Development", slug: "development", icon: "💻" },
  { name: "Marketing", slug: "marketing", icon: "📣" },
  { name: "Sales", slug: "sales", icon: "🎯" },
  { name: "Customer Support", slug: "customer-support", icon: "💬" },
  { name: "HR", slug: "hr", icon: "👥" },
  { name: "Legal", slug: "legal", icon: "⚖️" },
  { name: "Health", slug: "health", icon: "🏃" },
  { name: "Education", slug: "education", icon: "📚" },
  { name: "Creative", slug: "creative", icon: "🎨" },
  { name: "Personal", slug: "personal", icon: "🌟" },
];

export const AGENT_CAPABILITIES = [
  { id: "web_search", label: "Web Search", risk: "low" },
  { id: "web_browse", label: "Web Browsing", risk: "medium" },
  { id: "document_analysis", label: "Document Analysis", risk: "medium" },
  { id: "code_execution", label: "Code Execution", risk: "medium" },
  { id: "email_read", label: "Email Reading", risk: "high" },
  { id: "email_send", label: "Send Emails", risk: "high" },
  { id: "calendar_read", label: "Calendar Access", risk: "high" },
  { id: "calendar_write", label: "Calendar Editing", risk: "high" },
  { id: "file_access", label: "File Access", risk: "high" },
  { id: "api_calls", label: "External API Calls", risk: "high" },
] as const;
