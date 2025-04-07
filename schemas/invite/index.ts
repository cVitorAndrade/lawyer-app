import { z } from "zod";
import { LawyerSchema } from "../lawyer";

export const createInviteSchema = z.object({
  caseId: z.string().nonempty(),
  lawyers: z.array(LawyerSchema),
});

const InviteStatusEnum = z.enum(["pending", "accepted", "rejected"]);

export const inviteSchema = z.object({
  id: z.string(),
  invitedById: z.string(),
  invitedId: z.string(),
  status: InviteStatusEnum,
  createdAt: z.string(),
  respondedAt: z.string().nullable().optional(),
});

export const createInviteOutput = z.array(inviteSchema);
