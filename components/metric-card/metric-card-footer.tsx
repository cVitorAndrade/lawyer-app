import { HTMLAttributes } from "react";

interface MetricCardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export default function MetricCardFooter ({
  children
}: MetricCardFooterProps) {
  return (
    <div>
      {children}
    </div>
  )
}