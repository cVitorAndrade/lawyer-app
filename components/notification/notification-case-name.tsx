import { HTMLAttributes } from "react";
import { Badge } from "../ui/badge";

interface NotificationCaseNameProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

export default function NotificationCaseName({
  name,
}: NotificationCaseNameProps) {
  return (
    <span className="font-medium">
      <Badge variant="secondary">{name}</Badge>
    </span>
  );
}
