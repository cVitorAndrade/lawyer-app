import { z } from "zod";
import { lawyerSchema } from "../lawyer";
import { clientSchema } from "../client";

export const CaseTypeEnum = z.enum(["ADMINISTRATIVE", "JUDICIAL"]);
export const CasePriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const CaseStatusEnum = z.enum([
  "IN_PROGRESS",
  "FINISHED",
  "CANCELED",
  "PAUSED",
]);

export const createCaseInputSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  type: CaseTypeEnum,
  priority: CasePriorityEnum,
});

export const createCaseSchema = createCaseInputSchema.extend({
  status: CaseStatusEnum,
});

export const createCaseOutputSchema = createCaseInputSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string(),
});

export const caseSchema = createCaseOutputSchema.extend({
  lawyers: z.array(lawyerSchema),
  clients: z.array(z.lazy(() => clientSchema)),
});

export type CreateCaseInputType = z.infer<typeof createCaseInputSchema>;
export type CreateCaseType = z.infer<typeof createCaseSchema>;
export type CreateCaseOutputType = z.infer<typeof createCaseOutputSchema>;
export type CaseSchemaType = z.infer<typeof caseSchema>;
