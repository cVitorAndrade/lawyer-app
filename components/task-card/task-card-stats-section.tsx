import { HTMLAttributes, ReactNode } from "react";

interface TaskCardStatsSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export default function TaskCardStatsSection({
  children,
}: TaskCardStatsSectionProps) {
  return <div className="flex gap-2 text-zinc-500">{children}</div>;
}
