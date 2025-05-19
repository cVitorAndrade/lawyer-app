import { HTMLAttributes, ReactNode } from "react";

interface ClientDependentCardFooterProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ClientDependentCardFooter({
  children,
}: ClientDependentCardFooterProps) {
  return <div className="text-neutral-500 text-xs flex gap-2">{children}</div>;
}
