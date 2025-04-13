"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { uploadCaseFileSchema } from "@/schemas/case-file";

export const uploadCaseFile = authenticatedProcedure
  .createServerAction()
  .input(uploadCaseFileSchema)
  .handler(async ({ input, ctx }) => {
    const { caseId, file } = input;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await ctx.fetch(`/upload/case/${caseId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  });
