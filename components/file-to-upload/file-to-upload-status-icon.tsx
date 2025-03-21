import { Check, X } from "lucide-react";
import { HTMLAttributes } from "react";

interface FileToUploadStatusIconProps extends HTMLAttributes<HTMLDivElement> {
  status: "success" | "error";
}

export default function FileToUploadStatusIcon({
  status,
}: FileToUploadStatusIconProps) {
  return (
    <div className="self-start">
      <div className="flex justify-center items-center h-6 w-6">
        {status === "success" ? <Check size={16} /> : <X />}
      </div>
    </div>
  );
}
