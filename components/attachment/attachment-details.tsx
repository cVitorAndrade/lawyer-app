import { HTMLAttributes, ReactNode } from "react";

interface AttachmentDetailsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function AttachmentDetails({ children }: AttachmentDetailsProps) {
return <div className="flex flex-col gap-1">{children}</div>;
}