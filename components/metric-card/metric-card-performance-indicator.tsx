import { cn } from "@/lib/utils";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import { HTMLAttributes } from "react";

interface MetricCardPerformanceIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  value: number
}

export default function MetricCardPerformanceIndicator ({
  value
}: MetricCardPerformanceIndicatorProps) {
  const getIndicator = (value: number) => {
    if (value > 0) return { icon: TrendingUp, color: "text-green-400" };
    if (value < 0) return { icon: TrendingDown, color: "text-red-400" };
    return { icon: MoveRight, color: "text-orange-400" };
  };

  const { icon: Icon, color } = getIndicator(value);

  return (
    <span 
      className={cn(
        `flex items-center gap-1 text-sm font-medium`,
        color
      )}
    >
      {value}% {<Icon size={18} />}
    </span>

  )
}