"use client";

import {
  IProductFormSchema,
  productFormSchema,
} from "@/app/validator-shema/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelectForm from "@/app/ui/multi-select";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/ui/dialog";
import { ProductModelsDialog } from "./product-models-dialog";

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
      models: [{ title: "", info: { parameters: [], description: "" } }],
    },
  });

  const modelsProps = useFieldArray({
    control: form.control,
    name: "models",
  });

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[10px]"
      >
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
                  <Input
                    id="password"
                    placeholder="password"
                    type="password"
                    color="error"
                    {...field}
                  />
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
            render={({ field }) => (
              <MultiSelectForm
                field={field}
                options={options}
                title="categories"
              />
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <Label className="text-md">Models</Label>
          <ProductModelsDialog modelsProps={modelsProps} form={form} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
