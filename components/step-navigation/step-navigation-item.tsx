import { HTMLAttributes, ReactNode } from "react";

interface StepNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function StepNavigationItem({
  children,
}: StepNavigationItemProps) {
  return (
    <div className="flex flex-1 flex-col gap-1 items-start">{children}</div>
  );
}
