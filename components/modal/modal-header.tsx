import { HTMLAttributes, ReactNode } from "react";
import { DialogHeader } from "../ui/dialog";

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalHeader({ children }: ModalHeaderProps) {
  return <DialogHeader>{children}</DialogHeader>;
}
