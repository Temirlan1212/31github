"use client";

import {
  IProductFormSchema,
  productFormSchema,
} from "@/app/validator-shema/product";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/app/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";
import { useRouter } from "next/navigation";
import { ProductModelDataTable } from "./product-model-data-table";
import { FormSkeleton } from "@/app/skeletons/form-skeleton";
import { ProductMainInfo } from "./product-main-info";

export const ProductCreateForm = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [tab, setTab] = useState("");
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [tableSkeletonLoading, setTableSkeletonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

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
    values: (data as any) ?? {},
  });
  async function onSubmit(formData: IProductFormSchema) {
    setLoading(true);
    let res: Record<string, any> = {};
    const method = data == null ? "create" : "update";
    if (method === "update") {
      res = await fetch(`/api/product?id=${slug}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
    }
    if (method === "create") {
      res = await fetch(`/api/product`, {
        method: "POST",
        body: JSON.stringify({ ...formData, _id: slug }),
      });
    }

    if (res?.ok && res?.status === 200) {
      router.push("/dashboard/products");
      router.refresh();
    }
    setLoading(false);
  }

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    setTab(hash);
    fetchData();
    fetchTableData();
  }, []);

  const handleTab = (value: string) => {
    setTab(value);
    if (value === "main") return router.push("#");
    router.push(`#${value}`);
  };

  const fetchData = async () => {
    try {
      setSkeleton(true);
      const res = await fetch(`/api/product?id=${slug}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
    } finally {
      setSkeleton(false);
    }
  };

  const fetchTableData = async () => {
    try {
      setTableSkeletonLoading(true);
      const res = await fetch(`/api/product/model?productId=${slug}`);
      const data = await res.json();
      setTableData(data);
    } catch (error) {
    } finally {
      setTableSkeletonLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[10px]"
      >
        <Tabs onValueChange={handleTab} value={!!tab ? tab : "main"}>
          <div className="flex gap-[10px] justify-between">
            <TabsList>
              <TabsTrigger value="main">Главная</TabsTrigger>
              <TabsTrigger value="models">Модели</TabsTrigger>
            </TabsList>
            <Button loading={loading} type="submit" variant="outline">
              Сохранить
            </Button>
          </div>

          <TabsContent value="main" className="py-[20px]">
            {skeleton ? (
              <FormSkeleton />
            ) : (
              <ProductMainInfo control={form.control} />
            )}
          </TabsContent>
          <TabsContent value="models" className="py-[20px]">
            <div className="flex justify-between items-center">
              <Label className="text-md">Модели</Label>
            </div>
            <div className="py-4">
              <ProductModelDataTable
                slug={slug}
                data={tableData}
                loading={tableSkeletonLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};
