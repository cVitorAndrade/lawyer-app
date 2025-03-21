import { HTMLAttributes } from "react";

interface FileToUploadNameProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export default function FileToUploadName({ text }: FileToUploadNameProps) {
  return <span className="text-sm font-medium text-wrap">{text}</span>;
}
