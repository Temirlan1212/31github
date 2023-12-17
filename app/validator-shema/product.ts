import * as z from "zod";

export const priceSchema = z.object({
  currency: z.string(),
  value: z.string(),
});

export const modelSchema = z.object({
  price: priceSchema,
  title: z.string().min(1, "Это поле должно содержать не менее 1 символов"),
  parameteres: z.array(z.object({ name: z.string().min(1), value: z.string().min(1), description: z.string().min(0).max(50).optional() })),
});

export const productFormSchema = z.object({
  title: z.string().min(1, "Это поле должно содержать не менее 1 символов").max(50),
  description: z.string().min(1, "Это поле должно содержать не менее 1 символов").max(2000),
  category: z.array(z.string()).min(1, "Массив должен содержать по крайней мере 1 элемент(ы)"),
  price: priceSchema,
});

export type IProductFormSchema = z.infer<typeof productFormSchema>;
export type IModelSchema = z.infer<typeof modelSchema>;
