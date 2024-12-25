import { HTMLAttributes } from "react";

interface TimelineEventHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function TimelineEventHeader ({
  children
}: TimelineEventHeaderProps) {
  return (
    <div
      className="flex justify-between items-center relative gap-2"
    >
      {children}
    </div>
  )
}