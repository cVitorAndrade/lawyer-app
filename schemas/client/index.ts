import { z } from "zod";
import { addressSchema } from "../address";

export const createClientInputSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  birthDate: z.date(),
  telephone: z.string().nonempty(),
});

export const createClientSchema = createClientInputSchema;

export const createClientOutputSchema = createClientSchema
  .omit({
    birthDate: true,
  })
  .extend({
    id: z.string(),
    birthDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

export const clientSchema = createClientOutputSchema.extend({
  address: addressSchema,
});

export type CreateClientInputType = z.infer<typeof createClientInputSchema>;
export type CreateClientType = z.infer<typeof createClientSchema>;
export type CreateClientOutputType = z.infer<typeof createClientOutputSchema>;
export type ClientType = z.infer<typeof clientSchema>;
