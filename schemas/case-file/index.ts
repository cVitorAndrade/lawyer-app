import { z } from "zod";

export const uploadCaseFileSchema = z.object({
  caseId: z.string(),
  file: z.instanceof(File),
});
