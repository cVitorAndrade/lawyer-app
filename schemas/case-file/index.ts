import { z } from "zod";

export const uploadCaseFileSchema = z.object({
  caseId: z.string(),
  file: z.instanceof(File),
});

export const downloadCaseFileSchema = z.object({
  caseFileId: z.string(),
});
