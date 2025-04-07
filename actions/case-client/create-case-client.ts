"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import {
  caseClientSchema,
  createCaseClientSchema,
} from "@/schemas/case-client";

export const createCaseClient = authenticatedProcedure
  .createServerAction()
  .input(createCaseClientSchema)
  .output(caseClientSchema)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/case-client", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return await response.json();
  });
