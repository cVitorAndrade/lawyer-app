import { z } from "zod";

export const createCaseClientSchema = z.object({
  caseId: z.string(),
  clientId: z.string(),
});

export const caseClientSchema = createCaseClientSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});
