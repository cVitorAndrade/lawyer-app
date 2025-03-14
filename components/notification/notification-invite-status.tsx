import { HTMLAttributes, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Check, X } from "lucide-react";

type StatusType = "accepted" | "rejected";
type StatusVariants = "success" | "destructive";

interface NotificationInviteStatusProps
  extends HTMLAttributes<HTMLSpanElement> {
  status: StatusType;
}

export default function NotificationInviteStatus({
  status,
}: NotificationInviteStatusProps) {
  const statusStyle = {
    accepted: {
      icon: <Check size={14} />,
      variant: "success",
    },
    rejected: {
      icon: <X size={14} />,
      variant: "destructive",
    },
  };
  return (
    <span>
      <Badge
        className="gap-1"
        variant={statusStyle[status].variant as StatusVariants}
      >
        {statusStyle[status].icon} {status}
      </Badge>
    </span>
  );
}
