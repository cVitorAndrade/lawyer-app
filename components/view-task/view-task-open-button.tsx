import { HTMLAttributes, ReactNode } from "react";
import { SheetTrigger } from "../ui/sheet";

interface ViewTaskOpenButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ViewTaskOpenButton({
  children,
}: ViewTaskOpenButtonProps) {
  return <SheetTrigger asChild>{children}</SheetTrigger>;
}
