import { z } from "zod";

export const emailSchema = z.object({
  to: z.string().email("email de destino inválido"),
  subject: z.string().min(1, "subject requerido").max(200),
  html: z.string().min(1, "html requerido").max(5000),
});
