import { HTMLAttributes, ReactNode } from "react";

interface SubtaskBody extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function SubtaskBody({ children }: SubtaskBody) {
  return <div>{children}</div>;
}
