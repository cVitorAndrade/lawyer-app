import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ClientDependentCardRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHighlighted?: boolean;
}

export default function ClientDependentCardRoot({
  children,
  isHighlighted,
  ...props
}: ClientDependentCardRootProps) {
  return (
    <div
      className={cn(
        "flex gap-4 border-b-4 p-2 items-center shadow-md cursor-pointer",
        isHighlighted && "border-b-indigo-600/75 border-b-4"
      )}
      {...props}
    >
      {children}
    </div>
  );
}
