import { HTMLAttributes, ReactNode } from "react";

interface ViewTaskSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

export default function ViewTaskSection({
  title,
  children,
}: ViewTaskSectionProps) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
