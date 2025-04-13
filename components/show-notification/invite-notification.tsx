import { acceptCaseInvitation } from "@/actions/invite/accept-case-invitation";
import { Notification } from "@/components/notification";
import { Button } from "@/components/ui/button";
import { NotificationType } from "@/schemas/notification";
import { InviteService } from "@/service/invite.service";
import { HTMLAttributes } from "react";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

interface InviteNotificationProps extends HTMLAttributes<HTMLDivElement> {
  notification: Extract<NotificationType, { type: "invite" }>;
  reloadNotifications: () => Promise<void>;
}

export default function InviteNotification({
  notification,
  reloadNotifications,
  ...props
}: InviteNotificationProps) {
  const { details, message, createdAt } = notification;

  const { execute: executeAccepCaseInvitation } = useServerAction(
    acceptCaseInvitation,
    {
      onError: () => {
        toast.error("Erro ao aceitar convite", {
          description:
            "Ocorreu um erro ao tentar aceitar o convite, Por favor tente novamente mais tarde.",
        });
      },
      onSuccess: () => {
        toast.success("Convite aceito", {
          description: `Você agora faz parte do caso "${details.case.title}". Agora você pode acessa-lo na sua tela de casos.`,
        });
      },
    }
  );

  return (
    <Notification.Root {...props}>
      <Notification.CreatorAvatar
        imageUrl={details.inviter.avatar}
        name={details.inviter.name}
      />

      <Notification.DetailsSection>
        <Notification.Header>
          <Notification.Title>
            <Notification.CreatorName text={details.inviter.name} />{" "}
            <Notification.Message text={message} />{" "}
            <Notification.CaseName name={details.case.title} />
          </Notification.Title>

          <Notification.CreatedAt createdAt={createdAt} />
        </Notification.Header>

        <Notification.Footer>
          {details.invite.status === "pending" ? (
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await InviteService.rejectCaseInvitation(details.invite.id);
                  await reloadNotifications();
                }}
              >
                Rejeitar
              </Button>
              <Button
                size="sm"
                onClick={async () => {
                  await executeAccepCaseInvitation({
                    inviteId: details.invite.id,
                  });
                  await reloadNotifications();
                }}
              >
                Aceitar
              </Button>
            </div>
          ) : (
            <Notification.InviteStatus status={details.invite.status} />
          )}
        </Notification.Footer>
      </Notification.DetailsSection>
    </Notification.Root>
  );
}
