type InviteNotificationDetails = {
  caseId: string;
  invitedById: string;
  inviteId: string;
};

type UploadNotificationDetails = {
  context: "task" | "case";
  contextId: string;
  uploadedById: string;
  originalname: string;
  fullpath: string;
};

type NotificationDetails =
  | UploadNotificationDetails
  | InviteNotificationDetails;

type NotificationType = "upload" | "invite";

interface INotification {
  id: string;
  lawyerId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  details: NotificationDetails;
  createdAt: string;
}
