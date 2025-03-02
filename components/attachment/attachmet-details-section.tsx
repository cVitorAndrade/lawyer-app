import { HTMLAttributes, ReactNode } from "react";

interface AttachmentDetailsSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function AttachmentDetailsSection({ children }: AttachmentDetailsSectionProps) {
return <div className="flex items-center gap-2">{children}</div>;
}