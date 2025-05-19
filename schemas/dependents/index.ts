import { z } from "zod";
import { addressSchema } from "../address";

const dependentGenderEnum = z.enum(["FEMININO", "MASCULINO"]);

export const createDependentInputSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  birthDate: z.date(),
  telephone: z.string().nonempty(),
  rg: z.string().nonempty(),
  cpf: z.string().nonempty(),
  motherName: z.string().nonempty(),
  gender: dependentGenderEnum,
  maritalStatus: z.string().nonempty(),
  occupation: z.string().nonempty(),
  observation: z.string().nonempty(),
  relationship: z.string().nonempty(),
});

export const createDependentSchema = createDependentInputSchema.extend({
  clientId: z.string().nonempty(),
});

export const createDependentOutputSchema = createDependentSchema
  .omit({
    birthDate: true,
  })
  .extend({
    id: z.string(),
    birthDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

export const dependentSchema = createDependentOutputSchema.extend({
  address: addressSchema,
});

export type CreateDependentInputType = z.infer<
  typeof createDependentInputSchema
>;
export type CreateDependentType = z.infer<typeof createDependentSchema>;
export type CreateDependentOutputType = z.infer<
  typeof createDependentOutputSchema
>;
export type DependentType = z.infer<typeof dependentSchema>;
