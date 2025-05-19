"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import {
  createDependentOutputSchema,
  createDependentSchema,
} from "@/schemas/dependents";

export const createDependent = authenticatedProcedure
  .createServerAction()
  .input(createDependentSchema)
  .output(createDependentOutputSchema)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/dependent", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return await response.json();
  });
