import { HTMLAttributes } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TaskCardAssignedToItemProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
}

export default function TaskCardAssignedToItem({
  image,
  name,
}: TaskCardAssignedToItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <img
            src={image}
            alt=""
            className="rounded-full cursor-auto w-8 h-8 border-2 border-white transition-transform duration-300 ease-in-out hover:scale-110 hover:opacity-100 hover:z-10"
          />
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
