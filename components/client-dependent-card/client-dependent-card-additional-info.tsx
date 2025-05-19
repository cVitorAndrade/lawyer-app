import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface ClientDependentCardAdditionalInfoProps
  extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  value: string;
}

export default function ClientDependentCardAdditionalInfo({
  icon: Icon,
  value,
}: ClientDependentCardAdditionalInfoProps) {
  return (
    <div className="flex gap-2 items-center">
      <Icon size={14} /> <span>{value}</span>
    </div>
  );
}
