import { HTMLAttributes, ReactNode } from "react";
import { SheetHeader } from "../ui/sheet";

interface ViewTaskHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ViewTaskHeader({ children }: ViewTaskHeaderProps) {
  return <SheetHeader className="gap-4">{children}</SheetHeader>;
}
