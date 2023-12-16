"use client";

import { IProductFormSchema, productFormSchema } from "@/app/validator-shema/product";
import { useEffect, useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelect from "@/app/ui/multi-select";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { ProductModelsDialog } from "./product-models-dialog";
import { ProductModelsDataTable } from "./product-models-data-table";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";

export const ProductCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
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

  async function onSubmit(data: IProductFormSchema) {
    setLoading(true);
    console.log(data, "data");
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[10px]">
        <Tabs defaultValue="main">
          <div className="flex gap-[10px] justify-between">
            <TabsList>
              <TabsTrigger value="main">Главная</TabsTrigger>
              <TabsTrigger value="models">Модели</TabsTrigger>
            </TabsList>
            <Button type="submit" variant="outline">
              Сохранить
            </Button>
          </div>

          <TabsContent value="main" className="py-[20px]">
            <MainTab control={form.control} />
          </TabsContent>
          <TabsContent value="models" className="py-[20px]">
            <div className="flex justify-between items-center">
              <Label className="text-md">Модели</Label>
              <ProductModelsDialog fieldArray={fieldArray} form={form} />
            </div>
            <ProductModelsDataTable form={form} fieldArray={{ ...fieldArray, fields: fieldArray.fields.slice(0, fieldArray.fields.length - 1) }} />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export const MainTab = ({ control }: { control: Control<IProductFormSchema> }) => {
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
    <div className="flex flex-col gap-[10px]">
      <div className="grid gap-2">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Введите название" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-2">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Input placeholder="Введите описание" color="error" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-2">
        <FormField
          control={control}
          name="category"
          render={({ field }) => <MultiSelect field={field} options={options} title="Категории" placeholder="Выберите категории" />}
        />
      </div>
    </div>
  );
};
