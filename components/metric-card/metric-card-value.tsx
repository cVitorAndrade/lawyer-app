import { HTMLAttributes } from "react";

interface MetricCardValueProps extends HTMLAttributes<HTMLHeadElement> {
  value: string | number
  displayFormat?: 'default' | 'percentage' | 'monetary'
}

export default function MetricCardValue ({
  value,
  displayFormat = 'default'
}: MetricCardValueProps) {
  const formatedValue = {
    'default': value,
    'percentage': `${value}%`,
    'monetary': `$ ${value}`
  }

  return (
    <h2 className='text-4xl font-semibold text-zinc-50'>
      {formatedValue[displayFormat]}
    </h2>
  )
}