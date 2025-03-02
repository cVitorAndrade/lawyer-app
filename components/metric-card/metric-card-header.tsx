import { HTMLAttributes } from "react";

interface MetricCardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function MetricCardHeader ({
  children
}: MetricCardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {children}
    </div>
  )
}