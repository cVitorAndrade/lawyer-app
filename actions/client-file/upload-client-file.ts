"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { uploadClientFileSchema } from "@/schemas/client-file";

export const uploadClientFile = authenticatedProcedure
  .createServerAction()
  .input(uploadClientFileSchema)
  .handler(async ({ input, ctx }) => {
    const { clientId, file } = input;
    const formData = new FormData();
    formData.append("file", file);

    const response = await ctx.fetch(`/upload/client/${clientId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer upload");
    }

    return await response.json();
  });
