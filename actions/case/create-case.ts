"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { createCaseOutputSchema, createCaseSchema } from "@/schemas/case";

export const createCase = authenticatedProcedure
  .createServerAction()
  .input(createCaseSchema)
  .output(createCaseOutputSchema)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/case", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return await response.json();
  });
