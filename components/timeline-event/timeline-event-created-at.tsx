import { HTMLAttributes } from "react";

interface TimelineEventCreatedAtProps extends HTMLAttributes<HTMLSpanElement> {
  createdAt: string
}

export default function TimelineEventCreatedAt ({
  createdAt
}: TimelineEventCreatedAtProps) {
  return (
    <span className="text-neutral-500 font-medium text-sm whitespace-nowrap
    ">
      {createdAt}
    </span>
  )
}