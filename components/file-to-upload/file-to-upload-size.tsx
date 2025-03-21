import { HTMLAttributes } from "react";

interface FileToUploadSizeProps extends HTMLAttributes<HTMLSpanElement> {
  size: string;
}

export default function FileToUploadSize({ size }: FileToUploadSizeProps) {
  return <span className="text-xs text-neutral-500 ml-2">{size}</span>;
}
