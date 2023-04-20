import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
  active: z.boolean(),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const requestUserSchema = userSchema.omit({ id: true, active: true });

const responseUserSchema = userSchema.omit({ password: true });

export { userSchema, requestUserSchema, responseUserSchema, loginUserSchema };
