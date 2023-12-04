import * as z from "zod";

export const userFormSchema = z.object({
  password: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email().optional(),
});

export type IUserFormSchema = z.infer<typeof userFormSchema>;
