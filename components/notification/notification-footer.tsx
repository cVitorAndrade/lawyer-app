import { HTMLAttributes, ReactNode } from "react";

interface NotificationFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function NotificationFooter({
  children,
}: NotificationFooterProps) {
  return <div className="flex justify-end gap-2">{children}</div>;
}
