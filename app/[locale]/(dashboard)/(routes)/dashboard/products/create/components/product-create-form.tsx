"use client";

import { IProductFormSchema, productFormSchema } from "@/app/validator-shema/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelectForm from "@/app/ui/multi-select";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { ProductModelsDialog } from "./product-models-dialog";
import { ProductModelsDataTable } from "./product-models-data-table";

export const ProductCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [""],
      price: {
        currency: "kg",
        value: 0,
      },
      models: [{ title: "", info: [], price: { currency: "kg", value: 0 } }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "models",
  });

  const { fields, append, insert } = fieldArray;

  async function onSubmit(data: IProductFormSchema) {
    setLoading(true);
    console.log(data, "data");
    setLoading(false);
  }

  const options = [
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Tree", label: "Tree" },
    { value: "Four", label: "Four" },
    { value: "Six", label: "Six" },
    { value: "Seven", label: "Seven" },
    { value: "Eight", label: "Eight" },
    { value: "Nine", label: "Nine" },
    { value: "Ten", label: "Ten" },
  ];

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[10px]">
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
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => <MultiSelectForm field={field} options={options} title="categories" />}
          />
        </div>

        <div className="flex justify-between items-center mt-[50px]">
          <Label className="text-md">Модели</Label>
          <ProductModelsDialog fieldArray={fieldArray} form={form} />
        </div>

        <ProductModelsDataTable />

        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};
