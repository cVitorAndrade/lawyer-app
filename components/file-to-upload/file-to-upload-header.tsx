import { HTMLAttributes, ReactNode } from "react";

interface FileToUploadHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function FileToUploadHeader({
  children,
}: FileToUploadHeaderProps) {
  return <div className="flex justify-between items-center">{children}</div>;
}
