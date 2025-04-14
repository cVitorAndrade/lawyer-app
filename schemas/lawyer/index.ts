import { z } from "zod";

export const LawyerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  username: z.string(),
  telephone: z.string().optional(),
  avatar: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createLawyerSchema = z.object({
  email: z.string().nonempty(),
  name: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  telephone: z.string().optional(),
});

export const lawyerSchema = createLawyerSchema.omit({ password: true }).extend({
  id: z.string(),
  avatar: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getAllLawyersOutputSchema = z.array(lawyerSchema);
export const getLawyerOutputSchema = lawyerSchema;

export type LawyerType = z.infer<typeof LawyerSchema>;
