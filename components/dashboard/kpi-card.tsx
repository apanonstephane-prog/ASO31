import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "increase" | "decrease" | "neutral";
  description?: string;
  className?: string;
}

export function KPICard({ label, value, delta, deltaType, description, className }: KPICardProps) {
  return (
    <div className={cn("bg-white border border-border rounded-xl p-5", className)}>
      <p className="text-xs font-semibold text-steel-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold text-steel-900 mb-1">{value}</p>
      {delta && (
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          deltaType === "increase" ? "text-critical-600" :
          deltaType === "decrease" ? "text-success-600" :
          "text-steel-500"
        )}>
          {deltaType === "increase" && <TrendingUp className="w-3 h-3" />}
          {deltaType === "decrease" && <TrendingDown className="w-3 h-3" />}
          {deltaType === "neutral" && <Minus className="w-3 h-3" />}
          {delta}
        </div>
      )}
      {description && <p className="text-xs text-steel-400 mt-0.5">{description}</p>}
    </div>
  );
}
