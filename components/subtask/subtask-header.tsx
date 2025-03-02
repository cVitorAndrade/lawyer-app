import { HTMLAttributes, ReactNode } from "react";

interface SubtaskHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export default function SubtaskHeader({ children }: SubtaskHeaderProps) {
  return <div>{children}</div>;
}
