import { HTMLAttributes } from "react";

interface TaskCardTitleProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  color: string;
}

export default function TaskCardTitle({ title, color }: TaskCardTitleProps) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="size-4 rounded-full"
        style={{ background: color }}
      ></div>
      <h4 className="font-medium">{title}</h4>
    </div>
  );
}
