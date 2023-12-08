import * as z from "zod";

const emailSchema = z.union([z.literal(""), z.string().email()]);

export const userFormSchema = z.object({
  password: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: emailSchema,
});

export type IUserFormSchema = z.infer<typeof userFormSchema>;
