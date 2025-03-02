import { HTMLAttributes } from "react";

interface TaskCardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function TaskCardHeader({ children }: TaskCardHeaderProps) {
  return (
    <div className="flex p-4 justify-between items-center">{children}</div>
  );
}
