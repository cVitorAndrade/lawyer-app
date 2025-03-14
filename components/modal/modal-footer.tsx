import { HTMLAttributes, ReactNode } from "react";
import { DialogFooter } from "../ui/dialog";

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalFooter({ children }: ModalFooterProps) {
  return <DialogFooter>{children}</DialogFooter>;
}
