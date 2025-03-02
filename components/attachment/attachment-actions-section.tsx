import { HTMLAttributes, ReactNode } from "react";

interface AttachmentActionsSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function AttachmentActionsSection({ children }: AttachmentActionsSectionProps) {
return <div className="flex items-center gap-5">{children}</div>;
}