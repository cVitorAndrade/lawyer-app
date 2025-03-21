import { HTMLAttributes, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface FileToUploadThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  alt?: string;
}

export default function FileToUploadThumbnail({
  imageUrl,
  alt = "",
}: FileToUploadThumbnailProps) {
  return (
    <Avatar className="rounded-md">
      <AvatarImage src={imageUrl} alt={alt} />
      {/* <AvatarFallback></AvatarFallback> */}
    </Avatar>
  );
}
