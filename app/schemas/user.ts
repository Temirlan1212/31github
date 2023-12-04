"use client";

import * as z from "zod";

export const userFormSchema = z.object({
  password: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
});

export type IUserFormSchema = z.infer<typeof userFormSchema>;
