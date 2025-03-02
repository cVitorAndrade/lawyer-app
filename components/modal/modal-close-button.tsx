import { HTMLAttributes, ReactNode } from "react";
import { DialogClose } from "../ui/dialog";

interface ModalCloseButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalCloseButton({ children }: ModalCloseButtonProps) {
  return <DialogClose>{children}</DialogClose>;
}
