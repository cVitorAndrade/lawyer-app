import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

type FileStatus = "success" | "pending" | "error";

interface FileToUploadRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  status: FileStatus;
}

export default function FileToUploadRoot({
  children,
  status,
  ...props
}: FileToUploadRootProps) {
  const statusColors: Record<FileStatus, string> = {
    success: "rgba(34, 197, 94, 0.25)",
    pending: "rgba(234, 179, 8, 0.25)",
    error: "rgba(239, 68, 68, 0.25)",
  };

  return (
    <div
      {...props}
      className={cn("rounded-md p-1 flex gap-4 items-center")}
      style={{
        backgroundColor: statusColors[status],
        border: `2px solid ${statusColors[status]}`,
        boxShadow: `0px 4px 10px ${statusColors[status]}`,
      }}
    >
      {children}
    </div>
  );
}
