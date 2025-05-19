import { HTMLAttributes, ReactNode } from "react";

interface ClientDependentCardDetailsProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ClientDependentCardDetails({
  children,
}: ClientDependentCardDetailsProps) {
  return <div className="flex flex-col gap-2 w-full">{children}</div>;
}
