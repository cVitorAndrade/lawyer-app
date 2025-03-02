import { HTMLAttributes, ReactNode } from "react";

interface TaskCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TaskCardFooter({ children }: TaskCardFooterProps) {
  return <div className="rounded-b-lg border-t">{children}</div>;
}
