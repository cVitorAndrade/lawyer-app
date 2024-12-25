import { HTMLAttributes } from "react";

interface TimelineEventRootProps extends HTMLAttributes<HTMLDivElement> {

}

export default function TimelineEventRoot ({
  children
}: TimelineEventRootProps) {
  return (
    <div
      className="border-l-2 relative p-4 pl-8 flex flex-col gap-4"
    >
      {children}
    </div>
  )
}