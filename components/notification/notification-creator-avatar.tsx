import { getAvatarFallback, getAvatarUrl } from "@/hooks/use-avatar-url";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NotificationCreatorAvatarProps {
  imageUrl?: string | null;
  name: string;
}

export default function NotificationCreatorAvatar({
  imageUrl,
  name,
}: NotificationCreatorAvatarProps) {
  return (
    <div className="">
      <Avatar>
        <AvatarImage src={getAvatarUrl(imageUrl)} alt={`${name} image`} />
        <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
