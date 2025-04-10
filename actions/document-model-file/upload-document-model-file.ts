"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { z } from "zod";

export const uploadDocumentModelFile = authenticatedProcedure
  .createServerAction()
  .input(
    z.object({
      documentModelId: z.string(),
      file: z.instanceof(File),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { documentModelId, file } = input;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await ctx.fetch(
        `/upload/document-model/${documentModelId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  });
