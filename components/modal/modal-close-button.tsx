import { HTMLAttributes, ReactNode } from "react";
import { DialogClose } from "../ui/dialog";

interface ModalCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild: boolean;
}

export default function ModalCloseButton({
  children,
  ...props
}: ModalCloseButtonProps) {
  return <DialogClose {...props}>{children}</DialogClose>;
}
