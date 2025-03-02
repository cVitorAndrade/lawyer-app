import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface TaskCardStatsItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  text: string;
}
export default function TaskCardStatsItem({
  icon: Icon,
  text,
}: TaskCardStatsItemProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon /> <span>{text}</span>
    </div>
  );
}
