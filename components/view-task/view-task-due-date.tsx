import { Clock3 } from "lucide-react";

interface ViewTaskDueDateProps {
  dueDate: string;
}

export default function ViewTaskDueDate({ dueDate }: ViewTaskDueDateProps) {
  return (
    <div className="flex items-center gap-2 border rounded-full text-sm text-zinc-500 py-0.5 px-1">
      <Clock3 size={14} />
      {dueDate}
    </div>
  );
}
