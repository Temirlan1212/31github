"use client";

import { IProductFormSchema, productFormSchema } from "@/app/validator-shema/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export const ProductCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [""],
      price: "",
      models: [{ title: "", info: [] }],
    },
  });

  async function onSubmit(data: IProductFormSchema) {
    setLoading(true);

    setLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input placeholder="Имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>descr</FormLabel>
                <FormControl>
                  <Input id="password" placeholder="password" type="password" color="error" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
