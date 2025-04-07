"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import {
  createClientInputSchema,
  createClientOutputSchema,
} from "@/schemas/client";

export const createClient = authenticatedProcedure
  .createServerAction()
  .input(createClientInputSchema)
  .output(createClientOutputSchema)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/client", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return response.json();
  });
