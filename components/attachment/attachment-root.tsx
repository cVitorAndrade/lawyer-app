import { HTMLAttributes, ReactNode } from "react";

interface AttachmentRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function AttachmentRoot({ children }: AttachmentRootProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}
