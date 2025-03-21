import { HTMLAttributes, ReactNode } from "react";

interface FileToUploadTitleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function FileToUploadTitle({ children }: FileToUploadTitleProps) {
return <div>{children}</div>;
}