import { HTMLAttributes } from "react";

interface TimelineEventTitleProps extends HTMLAttributes<HTMLHeadElement> {
  actor: string
  action: string
  target: string
}

export default function TimelineEventTitle ({
  actor,
  action, 
  target
}: TimelineEventTitleProps) {
  return (
    <h3
      className="font-medium text-sm"
    >
      {actor} <span className="font-normal text-neutral-500">{action}</span> {target}
    </h3>
  )
}