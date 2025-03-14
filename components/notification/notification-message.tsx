import { HTMLAttributes } from "react";

interface NotificationMessageProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export default function NotificationMessage({
  text,
}: NotificationMessageProps) {
  return <span className="text-zinc-500 text-base inline">{text}</span>;
}
