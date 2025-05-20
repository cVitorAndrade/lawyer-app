import { z } from "zod";

export const uploadClientFileSchema = z.object({
  clientId: z.string().nonempty(),
  file: z.instanceof(File),
});
