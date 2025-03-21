import { HTMLAttributes, ReactNode } from "react";
import { Progress } from "../ui/progress";

interface FileToUploadProgressProps extends HTMLAttributes<HTMLDivElement> {
  percentage: number;
}

export default function FileToUploadProgress({
  percentage,
}: FileToUploadProgressProps) {
  return (
    <div className="flex gap-4 items-center">
      <Progress value={percentage} />
      <span className="text-sm">{percentage}%</span>
    </div>
  );
}
