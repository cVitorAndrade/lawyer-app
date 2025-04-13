"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { acceptCaseInvitationSchema } from "@/schemas/invite";

export const acceptCaseInvitation = authenticatedProcedure
  .createServerAction()
  .input(acceptCaseInvitationSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const { inviteId } = input;
      const response = await ctx.fetch(`/invite/accept/${inviteId}`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error();

      return await response.json();
    } catch (error) {
      console.log("Action - acceptCaseInvitation: ", error);
    }
  });
