import { HTMLAttributes } from "react";

interface MetricCardValueSectionProps extends HTMLAttributes<HTMLDivElement> {}

export default function MetricCardValueSection ({
  children
}: MetricCardValueSectionProps) {
  return (
    <div className="flex gap-2">
      {children}
    </div>
  )
}