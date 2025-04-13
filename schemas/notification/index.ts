import { z } from "zod";
import { lawyerSchema } from "../lawyer";
import { caseSchema } from "../case";
import { inviteSchema } from "../invite";

export const InviteNotificationDetailsSchema = z.object({
  caseId: z.string(),
  invitedById: z.string(),
  inviteId: z.string(),
  inviter: lawyerSchema,
  case: caseSchema,
  invite: inviteSchema,
});

export const UploadNotificationDetailsSchema = z.object({
  context: z.enum(["task", "case"]),
  contextId: z.string(),
  uploadedById: z.string(),
  originalname: z.string(),
  fullpath: z.string(),
});

const baseNotificationSchema = z.object({
  id: z.string(),
  lawyerId: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const notificationSchema = z.discriminatedUnion("type", [
  baseNotificationSchema.extend({
    type: z.literal("invite"),
    details: InviteNotificationDetailsSchema,
  }),
  baseNotificationSchema.extend({
    type: z.literal("upload"),
    details: UploadNotificationDetailsSchema,
  }),
]);

export type NotificationType = z.infer<typeof notificationSchema>;
