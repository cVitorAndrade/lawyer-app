import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface StepNavigationItemTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  isHighlighted?: boolean;
}

export default function StepNavigationItemTitle({
  text,
  isHighlighted = false,
}: StepNavigationItemTitleProps) {
  return (
    <h3
      className={cn(
        "text-zinc-500 text-sm transition-all",
        isHighlighted ? "text-primary" : ""
      )}
    >
      {text}
    </h3>
  );
}
