import { HTMLAttributes, ReactNode } from "react";

interface SubtaskRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color: string;
}
export default function SubtaskRoot({ children, color }: SubtaskRootProps) {
  return (
    <div className="px-4 py-3 relative border-t flex flex-col gap-3">
      {children}
      <div
        className="absolute h-full w-0.5 top-0 left-0 rounded-sm rounded-tl-none rounded-bl-none"
        style={{ background: color }}
      ></div>
    </div>
  );
}
