import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface MetricCardRootProps extends HTMLAttributes<HTMLDivElement> {}

export default function MetricCardRoot ({
  children,
  className,
}: MetricCardRootProps) {
  return (
    <div 
      className={cn(
        'border-2 p-4 rounded-lg flex flex-col gap-3 shadow-md bg-neutral-900',
        className
      )}
    >
      {children}
    </div>
  )
}