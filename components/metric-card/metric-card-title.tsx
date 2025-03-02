import { HTMLAttributes } from "react";

interface MetricCardTitleProps extends HTMLAttributes<HTMLHeadElement> {
  title: string
}

export default function MetricCardTitle ({
  title
}: MetricCardTitleProps) {
  return (
    <h3 className='text-sm font-medium text-neutral-300'>
      {title}
    </h3>
  )
}