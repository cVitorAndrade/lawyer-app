import { HTMLAttributes, ReactNode } from "react";
import { Dialog } from "../ui/dialog";

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalRoot({ children }: ModalRootProps) {
  return <Dialog></Dialog>;
}
