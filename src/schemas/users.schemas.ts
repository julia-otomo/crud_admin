import { z } from "zod";

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
});

export { requestUserSchema };
