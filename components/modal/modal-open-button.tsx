import { HTMLAttributes, ReactNode } from "react";
import { DialogTrigger } from "../ui/dialog";

interface ModalOpenButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalOpenButton({ children }: ModalOpenButtonProps) {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
}
