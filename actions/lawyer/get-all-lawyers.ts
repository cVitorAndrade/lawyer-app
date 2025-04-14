"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { getAllLawyersOutputSchema } from "@/schemas/lawyer";

export const getAllLawyers = authenticatedProcedure
  .createServerAction()
  .output(getAllLawyersOutputSchema)
  .handler(async ({ ctx }) => {
    try {
      const response = await ctx.fetch("/lawyer/all");
      if (!response.ok) throw new Error();

      return await response.json();
    } catch (error) {
      console.log("Action - getAllLawyers: ", error);
    }
  });
