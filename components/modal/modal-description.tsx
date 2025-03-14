import { HTMLAttributes } from "react";
import { DialogDescription } from "../ui/dialog";

interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

export default function ModalDescription({ text }: ModalDescriptionProps) {
  return <DialogDescription>{text}</DialogDescription>;
}
