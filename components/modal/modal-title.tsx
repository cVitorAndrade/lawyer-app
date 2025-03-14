import { HTMLAttributes } from "react";
import { DialogTitle } from "../ui/dialog";

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function ModalTitle({ text }: ModalTitleProps) {
  return <DialogTitle>{text}</DialogTitle>;
}
