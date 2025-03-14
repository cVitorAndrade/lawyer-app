import { HTMLAttributes, ReactNode } from "react";

interface NotificationDetailsSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function NotificationDetailsSection({
  children,
}: NotificationDetailsSectionProps) {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
}
