"use server";

import { authenticatedProcedure } from "@/lib/zsa-procedures";
import { signInOutputSchema, signInSchema } from "@/schemas/auth";

export const signIn = authenticatedProcedure
  .createServerAction()
  .input(signInSchema)
  .output(signInOutputSchema)
  .handler(async ({ input }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signIn`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();

      console.log({ response });

      return await response.json();
    } catch (error) {
      console.log("Action - SignIn: ", error);
    }
  });
