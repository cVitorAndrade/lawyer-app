import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useServerAction } from "zsa-react";
import { getNotifications } from "@/actions/notification/get-notifications";
import { NotificationType } from "@/schemas/notification";
import InviteNotification from "./invite-notification";

interface ShowNotificationsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ShowNotifications({
  children,
}: ShowNotificationsProps) {
  const [allNotifications, setAllNotifications] = useState<NotificationType[]>(
    []
  );

  const { execute: executeGetNotifications } =
    useServerAction(getNotifications);

  function isInviteNotification(
    notification: NotificationType
  ): notification is Extract<NotificationType, { type: "invite" }> {
    return notification.type === "invite";
  }

  const inviteNotifications = allNotifications.filter(isInviteNotification);

  const [isOpen, setIsOpen] = useState(false);

  const onGetNotifications = async () => {
    try {
      const [notifications] = await executeGetNotifications();
      setAllNotifications(notifications);
      console.log({ notifications });
    } catch (error) {
      console.log("ShowNotification - onGetNotifications: ", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      onGetNotifications();
    }
  }, [isOpen]);

  return (
    <Sheet onOpenChange={setIsOpen} modal open={isOpen}>
      <SheetTrigger
        asChild
        className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 w-full hover:bg-secondary"
      >
        {children}
      </SheetTrigger>
      <SheetContent className="p-2 flex flex-col gap-4 w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="general" className="flex flex-col gap-4">
          <TabsList className="w-full shadow-md">
            <TabsTrigger value="general" className="flex-1 text-xs md:text-sm">
              General
            </TabsTrigger>
            <TabsTrigger value="archives" className="flex-1 text-xs md:text-sm">
              Archives
            </TabsTrigger>
            <TabsTrigger value="invites" className="flex-1 text-xs md:text-sm">
              Invites
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex-1 text-xs md:text-sm"
            >
              Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="flex flex-col gap-4">
            {allNotifications.map((notification) => {
              switch (notification.type) {
                case "invite":
                  return (
                    <InviteNotification
                      key={notification.id}
                      notification={notification}
                      reloadNotifications={onGetNotifications}
                    />
                  );
                default:
                  return null;
              }
            })}
          </TabsContent>

          <TabsContent value="invites" className="flex flex-col gap-4">
            {inviteNotifications.map((notification) => (
              <InviteNotification
                reloadNotifications={onGetNotifications}
                key={notification.id}
                notification={notification}
              />
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
