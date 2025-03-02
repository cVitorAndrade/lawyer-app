import { Plus } from "lucide-react";
import { HTMLAttributes } from "react";

interface TaskCardAddSubtaskProps extends HTMLAttributes<HTMLDivElement> {}

export default function TaskCardAddSubtask({}: TaskCardAddSubtaskProps) {
  return (
    <div className="flex items-center gap-2 text-zinc-500 cursor-pointer hover:bg-zinc-300/50 p-3 transition-all duration-700">
      <Plus size={20} />
      <span className="uppercase font-medium text-sm">Add subtask</span>
    </div>
  );
}
