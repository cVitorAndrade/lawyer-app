import { HTMLAttributes } from "react";

interface NotificationCreatorNameProps
  extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function NotificationCreatorName({
  text,
}: NotificationCreatorNameProps) {
  return <span className="text-primary font-medium text-base inline">{text}</span>;
}
