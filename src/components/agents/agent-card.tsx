import Link from "next/link";
import { Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AgentSummary } from "@/types";

interface AgentCardProps {
  agent: AgentSummary;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
        "hover:shadow-md hover:border-indigo-200 transition-all duration-200",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
          {agent.iconUrl ? (
            <img src={agent.iconUrl} alt={agent.name} className="h-full w-full rounded-xl object-cover" />
          ) : (
            "🤖"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
              {agent.name}
            </h3>
            {agent.creator.verified && (
              <span className="text-indigo-500 text-xs">✓</span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">{agent.creator.displayName}</p>
        </div>
        {agent.hasFreeTier && (
          <Badge variant="success" className="shrink-0">Free tier</Badge>
        )}
      </div>

      {/* Tagline */}
      <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed line-clamp-2">
        {agent.tagline || "AI agent ready to work for you"}
      </p>

      {/* Category */}
      {agent.category && (
        <Badge variant="secondary" className="self-start mb-3 capitalize">
          {agent.category}
        </Badge>
      )}

      {/* Stats */}
      <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
        {agent.avgRating !== null && (
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-700">{agent.avgRating.toFixed(1)}</span>
            <span>({formatNumber(agent.ratingCount)})</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          <span>{formatNumber(agent.totalSubscribers)}</span>
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          {agent.priceMonthly ? (
            <div>
              <span className="text-base font-bold text-gray-900">
                {formatPrice(agent.priceMonthly)}
              </span>
              <span className="text-xs text-gray-500">/mo</span>
            </div>
          ) : (
            <span className="text-base font-bold text-emerald-600">Free</span>
          )}
        </div>
        <Link href={`/agents/${agent.slug}`}>
          <Button size="sm" variant="primary">
            <Zap className="h-3.5 w-3.5" />
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
