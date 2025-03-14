import { HTMLAttributes, ReactNode } from "react";
import { Dialog } from "../ui/dialog";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ModalRoot({
  children,
  isOpen,
  onOpenChange,
}: ModalRootProps) {
  return (
    <Dialog modal open={isOpen} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
}
