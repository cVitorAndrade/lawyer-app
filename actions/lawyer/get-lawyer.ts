"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { getLawyerOutputSchema } from "@/schemas/lawyer";

export const getLawyer = authenticatedProcedure
  .createServerAction()
  .output(getLawyerOutputSchema)
  .handler(async ({ ctx }) => {
    try {
      const response = await ctx.fetch("/lawyer");
      if (!response.ok) throw new Error();
      return await response.json();
    } catch (error) {
      console.log("Action - getLawyer: ", error);
    }
  });
