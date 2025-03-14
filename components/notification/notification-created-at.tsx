import { HTMLAttributes } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NotificationCreatedAtProps extends HTMLAttributes<HTMLSpanElement> {
  createdAt: string;
}

export default function NotificationCreatedAt({
  createdAt,
}: NotificationCreatedAtProps) {
  const timeAgo = formatDistanceToNow(parseISO(createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  return <span className="text-zinc-500 text-sm">{timeAgo}</span>;
}
