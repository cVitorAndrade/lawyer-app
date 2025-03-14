import { HTMLAttributes, ReactNode } from "react";
import { DialogContent } from "../ui/dialog";

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalContainer({
  children,
  className,
}: ModalContainerProps) {
  return <DialogContent className={className}>{children}</DialogContent>;
}
