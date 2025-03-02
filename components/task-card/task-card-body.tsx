import { HTMLAttributes, ReactNode } from "react";

interface TaskCardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TaskCardBody({ children }: TaskCardBodyProps) {
  return <div>{children}</div>;
}
