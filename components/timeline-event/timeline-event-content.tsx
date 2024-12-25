import { HTMLAttributes } from "react";

interface TimelineEventContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function TimelineEventContent ({
  children
}: TimelineEventContentProps) {
  return (
    <div>
      {children}
    </div>
  )
}