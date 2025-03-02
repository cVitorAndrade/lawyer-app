import { HTMLAttributes } from "react";

interface MetricCardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export default function MetricCardBody ({
  children
}: MetricCardBodyProps) {
  return (
    <div>
      {children}
    </div>
  )
}