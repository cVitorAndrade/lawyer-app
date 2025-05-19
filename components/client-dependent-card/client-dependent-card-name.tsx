import { HTMLAttributes, ReactNode } from "react";

interface ClientDependentCardNameProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

export default function ClientDependentCardName({
  name,
}: ClientDependentCardNameProps) {
  return <span>{name}</span>;
}
