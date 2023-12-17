"use client";

import { IProductFormSchema, productFormSchema } from "@/app/validator-shema/product";
import { Suspense, useEffect, useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelect from "@/app/ui/multi-select";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { ProductModelsDataTable } from "./product-models-data-table";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";
import { useRouter } from "next/navigation";

export const ProductCreateForm = () => {
  const router = useRouter();
  const [tab, setTab] = useState("");
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
      price: {
        currency: "kg",
        value: "",
      },
    },
  });

  async function onSubmit(data: IProductFormSchema) {
    setLoading(true);
    console.log(data, "data");
    setLoading(false);
  }

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    setTab(hash);
    fetchData();
  }, []);

  const handleTab = (value: string) => {
    setTab(value);
    if (value === "main") return router.push("#");
    router.push(`#${value}`);
  };

  const fetchData = async () => {
    try {
      setTableLoading(true);
      const res = await fetch("/api/product/model");
      const data = await res.json();
      setTableData(data);
    } catch (error) {
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[10px]">
        <Tabs onValueChange={handleTab} value={!!tab ? tab : "main"} onChange={(e) => console.log(e)}>
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
            </div>
            <div className="py-4">
              <ProductModelsDataTable data={tableData} loading={tableLoading} />
            </div>
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
