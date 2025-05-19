import { HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";

interface ClientDependentCardAvatarProps
  extends HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  name: string;
}

export default function ClientDependentCardAvatar({
  imageUrl,
  name,
}: ClientDependentCardAvatarProps) {
  return (
    <div>
      <Avatar>
        <AvatarImage src={getAvatarUrl(imageUrl)} alt={`${name} image`} />
        <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
