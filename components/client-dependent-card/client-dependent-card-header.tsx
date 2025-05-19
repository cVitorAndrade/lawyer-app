import { HTMLAttributes, ReactNode } from "react";

interface ClientDependenteCardHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ClientDependenteCardHeader({
  children,
}: ClientDependenteCardHeaderProps) {
  return (
    <div className="flex justify-between gap-2 items-center">{children}</div>
  );
}
