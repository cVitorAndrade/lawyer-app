"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { downloadCaseFileSchema } from "@/schemas/case-file";

export const downloadCaseFile = authenticatedProcedure
  .createServerAction()
  .input(downloadCaseFileSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const { caseFileId } = input;
      const response = await ctx.fetch(
        `/case-file/download/file/${caseFileId}`
      );

      if (!response.ok) throw new Error();

      const buffer = await response.arrayBuffer();
      const contentType =
        response.headers.get("Content-Type") || "application/octet-stream";

      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+?)"/);
      const filename = filenameMatch
        ? filenameMatch[1]
        : "arquivo_desconhecido";

      return { buffer, contentType, filename };
    } catch (error) {
      console.log("Action - downloadCaseFile: ", error);
    }
  });
