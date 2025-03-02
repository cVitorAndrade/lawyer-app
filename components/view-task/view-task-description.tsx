import { HTMLAttributes } from "react";
import { SheetDescription } from "../ui/sheet";

interface ViewTaskDescriptionProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function ViewTaskDescription({
  text,
}: ViewTaskDescriptionProps) {
  return <SheetDescription className="text-sm">{text}</SheetDescription>;
}
