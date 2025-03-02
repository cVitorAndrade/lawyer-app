import { HTMLAttributes, ReactNode } from "react";

interface SubtaskDetailsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export default function SubtaskDetails({ children }: SubtaskDetailsProps) {
  return <div className="flex items-center gap-1">{children}</div>;
}
