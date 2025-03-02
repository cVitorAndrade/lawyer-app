import { HTMLAttributes } from "react";

interface AttachmentTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string
}

export default function AttachmentTitle({ text }: AttachmentTitleProps) {
return <h4 className="text-sm">{text}</h4>;
}