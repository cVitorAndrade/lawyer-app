import { HTMLAttributes, ReactNode } from "react";
import { SheetContent } from "../ui/sheet";

interface ViewTaskContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ViewTaskContent({
  children,
}: ViewTaskContentProps) {
  return <SheetContent className="sm:max-w-2xl w-1/2">{children}</SheetContent>;
}
