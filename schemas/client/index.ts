import { z } from "zod";
import { addressSchema } from "../address";
import { dependentSchema } from "../dependents";
import { createCaseOutputSchema } from "../case";

const ClientGenderEnum = z.enum(["FEMININO", "MASCULINO"]);

export const createClientInputSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  birthDate: z.date(),
  telephone: z.string().nonempty(),
  rg: z.string().nonempty(),
  cpf: z.string().nonempty(),
  motherName: z.string().nonempty(),
  gender: ClientGenderEnum,
  maritalStatus: z.string().nonempty(),
  occupation: z.string().nonempty(),
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
  cases: z.array(z.lazy(() =>createCaseOutputSchema)),
  dependents: z.array(dependentSchema),
});

export type CreateClientInputType = z.infer<typeof createClientInputSchema>;
export type CreateClientType = z.infer<typeof createClientSchema>;
export type CreateClientOutputType = z.infer<typeof createClientOutputSchema>;
export type ClientType = z.infer<typeof clientSchema>;
