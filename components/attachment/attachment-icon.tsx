import { LucideIcon } from "lucide-react";

interface AttachmentIconProps {
  icon: LucideIcon;
  backgroundColor: string;
}

export default function AttachmentIcon({
  icon: Icon,
  backgroundColor,
}: AttachmentIconProps) {
  return (
    <div className="rounded-lg p-2" style={{ backgroundColor }}>
      <Icon />
    </div>
  );
}
