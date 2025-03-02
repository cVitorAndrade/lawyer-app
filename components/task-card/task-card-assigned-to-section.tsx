import { HTMLAttributes, ReactNode } from "react";

interface TaskCardAssignedToSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TaskCardAssignedToSection({
  children,
}: TaskCardAssignedToSectionProps) {
  return <div className="flex relative -space-x-2 group">{children}</div>;
}
