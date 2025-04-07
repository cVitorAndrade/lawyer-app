"use server";

import { createInviteOutput, createInviteSchema } from "@/schemas/invite";
import { authenticatedProcedure } from "@/lib/zsa-procedures";

export const createInvite = authenticatedProcedure
  .createServerAction()
  .input(createInviteSchema)
  .output(createInviteOutput)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/invite", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return await response.json();
  });
