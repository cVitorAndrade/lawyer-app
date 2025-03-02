import { HTMLAttributes, ReactNode } from "react";

interface ViewTaskDetailsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ViewTaskDetails({ children }: ViewTaskDetailsProps) {
return <div className="flex items-center gap-2">{children}</div>;
}