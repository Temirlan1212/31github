import * as z from "zod";

export const priceSchema = z.object({
  currency: z.string(),
  value: z.number(),
});

export const productFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(2000),
  category: z.array(z.string()),
  price: priceSchema,
  models: z
    .array(
      z
        .object({
          price: priceSchema,
          title: z.string(),
          info: z.array(z.object({ name: z.string(), value: z.string(), description: z.string().min(0).max(50) })),
        })
        .optional()
    )
    .optional(),
});

export type IProductFormSchema = z.infer<typeof productFormSchema>;
