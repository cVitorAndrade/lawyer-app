import { HTMLAttributes, ReactNode } from "react";
import { Sheet } from "../ui/sheet";

interface ViewTaskRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ViewTaskRoot({ children }: ViewTaskRootProps) {
  return <Sheet>{children}</Sheet>;
}
