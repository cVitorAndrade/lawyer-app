import { z } from "zod";

export const createAddressInputSchema = z.object({
  postalCode: z.string().nonempty("CEP é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatória"),
  neighborhood: z.string().nonempty("Bairro é obrigatório"),
  state: z.string().nonempty("Estado é obrigatório"),
  street: z.string().nonempty("Rua é obrigatório"),
  number: z.string().nonempty("Número é obrigatório"),
  complement: z.string().optional(),
});

export const createAddressSchema = createAddressInputSchema.extend({
  ownerId: z.string(),
  country: z.string(),
  name: z.string(),
});

export const addressSchema = createAddressSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateAddressInputType = z.infer<typeof createAddressInputSchema>;
export type CreateAddressType = z.infer<typeof createAddressSchema>;
export type AddressType = z.infer<typeof addressSchema>;