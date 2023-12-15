import * as z from "zod";

export const productModelsSchema = z.object({
  description: z.string().min(0).max(50),
  parameters: z.array(z.object({ name: z.string(), value: z.string() })),
});

export const productFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(2000),
  category: z.array(z.string()),
  price: z.string(),
  models: z
    .array(
      z
        .object({
          title: z.string(),
          info: productModelsSchema,
        })
        .optional()
    )
    .optional(),
});

export type IProductFormSchema = z.infer<typeof productFormSchema>;
