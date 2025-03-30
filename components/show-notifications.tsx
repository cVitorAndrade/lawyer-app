import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Notification } from "./notification";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { NotificationService } from "@/service/notification.service";
import { LawyerService } from "@/service/lawyer.service";
import { InviteService } from "@/service/invite.service";
import { CaseService } from "@/service/case.service";
import { IInvite } from "@/interfaces/IInvite";
import { ICase } from "@/interfaces/ICase";
import { ILawyer } from "@/interfaces/ILawyer";
import { getAvatarUrl } from "@/hooks/use-avatar-url";

interface ShowNotificationsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface NotificationWithDetails extends INotification {
  invite: IInvite;
  caseItem: ICase;
  invitedBy: ILawyer;
}

export default function ShowNotifications({
  children,
}: ShowNotificationsProps) {
  const [allNotifications, setAllNotifications] = useState<
    NotificationWithDetails[]
  >([]);

  const inviteNotifications = allNotifications.filter(
    ({ type }) => type === "invite"
  );

  const [isOpen, setIsOpen] = useState(false);

  const onGetLawyerNotifications = async () => {
    try {
      const notifications =
        await NotificationService.getAllLawyerNotifications();
      const lawyers = await LawyerService.getAllLawyers();
      const invites = await InviteService.getAllLawyerInvites();
      const cases = await CaseService.getAllCases();

      const lawyersMap = new Map(lawyers.map((lawyer) => [lawyer.id, lawyer]));
      const invitesMap = new Map(invites.map((invite) => [invite.id, invite]));
      const casesMap = new Map(
        cases.map((caseItem) => [caseItem.id, caseItem])
      );

      const allInviteNotifications = notifications
        .filter(({ type }) => type === "invite")
        .map((notification) => {
          if (notification.type !== "invite") return notification;
          const details = notification.details as InviteNotificationDetails;

          return {
            ...notification,
            invitedBy: lawyersMap.get(details.invitedById) || null,
            invite: invitesMap.get(details.inviteId) || null,
            caseItem: casesMap.get(details.caseId) || null,
          };
        });

      console.log({ allInviteNotifications });

      setAllNotifications([
        ...(allInviteNotifications as NotificationWithDetails[]),
      ]);
    } catch (error) {
      console.log("ShowNotifications - onGetLawyerNotifications: ", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      onGetLawyerNotifications();
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

          <TabsContent
            value="general"
            className="flex flex-col gap-4"
          ></TabsContent>

          <TabsContent value="invites" className="flex flex-col gap-4">
            {inviteNotifications.map(
              ({ id, message, createdAt, invitedBy, caseItem, invite }) => (
                <Notification.Root key={id}>
                  <Notification.CreatorAvatar
                    name={invitedBy.name}
                    imageUrl={getAvatarUrl(invitedBy.avatar)}
                  />

                  <Notification.DetailsSection>
                    <Notification.Header>
                      <Notification.Title>
                        <Notification.CreatorName text={invitedBy.name} />{" "}
                        <Notification.Message text={message} />{" "}
                        <Notification.CaseName name={caseItem.title} />
                      </Notification.Title>

                      <Notification.CreatedAt createdAt={createdAt} />
                    </Notification.Header>

                    <Notification.Footer>
                      {invite.status === "pending" ? (
                        <div className="flex gap-2 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              await InviteService.rejectCaseInvitation(
                                invite.id
                              );
                              await onGetLawyerNotifications();
                            }}
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={async () => {
                              await InviteService.acceptCaseInvition(invite.id);
                              await onGetLawyerNotifications();
                            }}
                          >
                            Accept
                          </Button>
                        </div>
                      ) : (
                        <Notification.InviteStatus status={invite.status} />
                      )}
                    </Notification.Footer>
                  </Notification.DetailsSection>
                </Notification.Root>
              )
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
