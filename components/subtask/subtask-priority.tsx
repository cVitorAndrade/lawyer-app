import { Flag } from "lucide-react";
import { HTMLAttributes } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type PriorityType = "high" | "medium" | "low";

interface SubtaskPriorityProps extends HTMLAttributes<HTMLDivElement> {
  priority: PriorityType;
}

export default function SubtaskPriority({ priority }: SubtaskPriorityProps) {
  const priorityStyle = {
    high: "#f21245",
    medium: "#FFDE59",
    low: "#00E676",
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className="cursor-default">
          <Flag style={{ color: priorityStyle[priority] }} />
        </TooltipTrigger>
        <TooltipContent className="capitalize">{priority} priority</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
