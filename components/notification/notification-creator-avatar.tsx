import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NotificationCreatorAvatarProps {
  imageUrl?: string;
  name: string;
}

export default function NotificationCreatorAvatar({
  imageUrl,
  name,
}: NotificationCreatorAvatarProps) {
  const onGetAvatarFallback = (firstName: string, lastName: string): string => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";

    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="">
      <Avatar>
        <AvatarImage src={imageUrl} alt={`${name} image`} />

        <AvatarFallback>
          {onGetAvatarFallback(name.split(" ")[0], name.split(" ")[1])}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
