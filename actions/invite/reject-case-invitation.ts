"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { rejectCaseInvitationSchema } from "@/schemas/invite";

export const rejectCaseInvitation = authenticatedProcedure
  .createServerAction()
  .input(rejectCaseInvitationSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const { inviteId } = input;
      const response = await ctx.fetch(`/invite/reject/${inviteId}`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error();

      return await response.json();
    } catch (error) {
      console.log("Action - rejectCaseInvitation: ", error);
    }
  });
