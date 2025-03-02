import { Calendar } from "lucide-react";

interface AttachmentCreatedAtProps {
  createdAt: string;
}

export default function AttachmentCreatedAt({
  createdAt,
}: AttachmentCreatedAtProps) {
  return (
    <span className="flex items-center gap-0.5 text-xs text-zinc-500">
      <Calendar size={14} />
      {createdAt}
    </span>
  );
}
