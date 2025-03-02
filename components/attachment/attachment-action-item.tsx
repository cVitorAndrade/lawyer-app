"use client";
import { LucideIcon } from "lucide-react";

interface AttachmentActionItemProps {
  onClick: () => void;
  icon: LucideIcon;
  text: string;
}

export default function AttachmentActionItem({
  icon: Icon,
  onClick,
  text,
}: AttachmentActionItemProps) {
  return (
    <div onClick={onClick} className="flex items-center gap-1 cursor-pointer">
      <Icon size={14} /> <span className="text-sm">{text}</span>
    </div>
  );
}
