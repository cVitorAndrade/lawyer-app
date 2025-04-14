import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signInOutputSchema = z.object({
  access_token: z.string(),
});
