import { Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

interface FileToUploadRemoveButtonProps
  extends HTMLAttributes<HTMLButtonElement> {}

export default function FileToUploadRemoveButton({
  onClick,
}: FileToUploadRemoveButtonProps) {
  return (
    <div className="self-start">
      <Button onClick={onClick} variant="ghost" className="self-start h-6 w-6" size="icon">
        <Trash2 />
      </Button>
    </div>
  );
}
