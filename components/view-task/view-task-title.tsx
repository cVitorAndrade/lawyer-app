import { HTMLAttributes } from "react";
import { SheetTitle } from "../ui/sheet";
import { SquareKanban } from "lucide-react";

interface ViewTaskTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function ViewTaskTitle({ text }: ViewTaskTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-zinc-500">
        <SquareKanban size={14} />
        <h6 className="text-sm">Task</h6>
      </div>
      <SheetTitle className="text-3xl font-normal">{text}</SheetTitle>
    </div>
  );
}
