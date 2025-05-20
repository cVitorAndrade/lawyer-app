import { z } from "zod";

export const uploadClientFileSchema = z.object({
  clientId: z.string().nonempty(),
  file: z.instanceof(File),
});

export const clientFileSchema = z.object({
  id: z.string().nonempty(),
  clientId: z.string().nonempty(),
  uploadedById: z.string().nonempty(),
  fullpath: z.string().nonempty(),
  path: z.string().nonempty(),
  mimetype: z.string().nonempty(),
  originalname: z.string().nonempty(),
  size: z.number(),
  createdAt: z.string().nonempty(),
});

export type ClientFileType = z.infer<typeof clientFileSchema>;
