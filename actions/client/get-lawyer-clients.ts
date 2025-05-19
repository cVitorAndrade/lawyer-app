"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { clientSchema } from "@/schemas/client";
import { z } from "zod";

export const getLawyerClients = authenticatedProcedure
  .createServerAction()
  .output(z.array(clientSchema))
  .handler(async ({ ctx }) => {
    const response = await ctx.fetch("/client");
    return await response.json();
  });
