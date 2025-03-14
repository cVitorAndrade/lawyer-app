import { HTMLAttributes, ReactNode } from "react";

interface NotificationHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function NotificationHeader({
  children,
}: NotificationHeaderProps) {
  return <div className="flex flex-col gap-0">{children}</div>;
}
