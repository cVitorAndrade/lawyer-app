import { HTMLAttributes, ReactNode } from "react";

interface TaskCardSubtaskSection extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TaskCardSubtaskSection({
  children,
}: TaskCardSubtaskSection) {
  return <div>{children}</div>;
}
