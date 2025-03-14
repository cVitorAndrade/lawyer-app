import { HTMLAttributes, ReactNode } from "react";

interface NotificationRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function NotificationRoot({
  children,
  ...props
}: NotificationRootProps) {
  return (
    <div className="flex gap-5 px-4 pb-4 rounded-lg shadow-md border-x-2 border-b-2 rounded-t-none" {...props}>
      {children}
    </div>
  );
}
