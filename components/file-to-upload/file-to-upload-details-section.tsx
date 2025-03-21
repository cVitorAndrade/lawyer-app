import { HTMLAttributes, ReactNode } from "react";

interface FileToUploadDetailsSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function FileToUploadDetailsSection({
  children,
}: FileToUploadDetailsSectionProps) {
  return <div className="flex flex-col w-full gap-1">{children}</div>;
}
