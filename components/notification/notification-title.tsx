import { HTMLAttributes, ReactNode } from "react";

interface NotificationTitleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function NotificationTitle({
  children,
}: NotificationTitleProps) {
  return <div className="inline">{children}</div>;
}
