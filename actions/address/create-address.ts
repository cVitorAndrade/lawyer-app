"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { addressSchema, createAddressSchema } from "@/schemas/address";

export const createAddress = authenticatedProcedure
  .createServerAction()
  .input(createAddressSchema)
  .output(addressSchema)
  .handler(async ({ input, ctx }) => {
    const response = await ctx.fetch("/address", {
      method: "POST",
      body: JSON.stringify(input),
    });

    return await response.json();
  });
