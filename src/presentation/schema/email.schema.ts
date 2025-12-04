import { z } from "zod";

export const emailSchema = z.object({
  subject: z.string().min(1, "subject requerido").max(200),
  html: z.string().min(1, "html requerido").max(5000),
});
