import { HTMLAttributes, ReactNode } from "react";

interface TaskCardDetailsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function TaskCardDetails({ children }: TaskCardDetailsProps) {
  return (
    <div className="flex items-center px-4 pb-4 justify-between">
      {children}
    </div>
  );
}
