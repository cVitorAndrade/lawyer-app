import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface TimelineEventIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
}

export default function TimelineEventIcon ({
  icon: Icon
}: TimelineEventIconProps) {
  return (
    <div
      className="rounded-full absolute size-8 bg-zinc-700 -left-[3.1rem] flex items-center justify-center"
    >
      {<Icon size={18} color="white" />}
    </div>
  )
}