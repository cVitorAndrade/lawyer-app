import { HTMLAttributes, ReactNode } from "react";

interface StepNavigationRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function StepNavigationRoot({
  children,
}: StepNavigationRootProps) {
  return <div className="w-full flex items-start gap-4">{children}</div>;
}
