import * as z from "zod";

export const optionSchema = z.object({
  label: z.string().min(1, "Это поле должно содержать не менее 1 символов"),
  value: z.string().min(1, "Это поле должно содержать не менее 1 символов"),
});

export type IOptionFormSchema = z.infer<typeof optionSchema>;
