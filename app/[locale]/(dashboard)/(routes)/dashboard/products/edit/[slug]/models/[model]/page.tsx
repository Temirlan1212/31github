"use client";

import { FormSkeleton } from "@/app/skeletons/form-skeleton";
import { Button } from "@/app/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Label } from "@/app/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/ui/select";
import { Separator } from "@/app/ui/separator";
import { IModelSchema, modelSchema } from "@/app/validator-shema/product";
import { currencyList } from "@/helpers/currency-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn, useFieldArray, useForm } from "react-hook-form";

export interface IModelProps {
  slug: string;
  productSlug: string;
}

export default function Page({ params: { model, slug } }: { params: { model: string; slug: string } }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[20px]">
      <Button className="w-[fit-content]" variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="w-[25px] h-[15px]" />
        Назад
      </Button>

      <ModelContent productSlug={slug} slug={model} />
    </div>
  );
}

export const ModelContent: FC<IModelProps> = ({ productSlug, slug }) => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [skeleton, setSkeleton] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<IModelSchema>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      title: "",
      parameteres: [],
      price: { currency: "KG", value: "0" },
    },
    values: data as any,
  });

  const method = slug === "create" ? "create" : "update";

  const childrenFieldArray = useFieldArray({
    control: form.control,
    name: `parameteres`,
  });

  async function onSubmit(data: IModelSchema) {
    setLoading(true);
    const newData = { ...data, productId: productSlug };
    if (method === "update") {
      const res = await fetch(`/api/product/model?id=${slug}`, { method: "PATCH", body: JSON.stringify(newData) });
      if (res.ok && res.status === 200) router.back();
    }
    if (method === "create") {
      const res = await fetch(`/api/product/model`, { method: "POST", body: JSON.stringify(newData) });
      if (res.ok && res.status === 200) router.back();
    }
    setLoading(false);
  }

  useEffect(() => {
    if (method === "update") {
      const fetchData = async () => {
        try {
          setSkeleton(true);
          const res = await fetch(`/api/product/model?id=${slug}`);
          const data = await res.json();
          setData(data);
        } catch (error) {
        } finally {
          setSkeleton(false);
        }
      };
      fetchData();
    }
  }, []);

  if (skeleton) return <FormSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-2">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Название модели" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-nowrap gap-2">
            <FormField
              control={form.control}
              name={`price.value`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Введите цену модели" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`price.currency`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Валюта</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!!value) field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Выберите валюту" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencyList.map(({ label, value }, index) => (
                        <SelectItem key={index} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ModelsInfoContent fieldArray={childrenFieldArray} form={form} />

          <div className="w-full flex justify-end">
            <Button loading={loading} type="submit">
              {method === "update" ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

interface IModelsInfoContentProps {
  form: UseFormReturn<IModelSchema>;
  fieldArray: UseFieldArrayReturn<any, `parameteres`, "id">;
}

export const ModelsInfoContent: FC<IModelsInfoContentProps> = ({ form, fieldArray }) => {
  const { fields, remove, append } = fieldArray;
  return (
    <div className="mt-[30px]">
      <Label className="text-md">Параметры</Label>
      <Separator className="my-[5px]" />
      <div className="max-h-[300px] flex-nowrap overflow-auto p-[5px]">
        {fields.map((field, idx) => (
          <div key={idx}>
            <div key={field.id} className="flex gap-2 flex-nowrap items-end">
              <FormField
                control={form.control}
                name={`parameteres.${idx}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Параметр</FormLabel>
                    <FormControl>
                      <Input placeholder="Имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`parameteres.${idx}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Значение</FormLabel>
                    <FormControl>
                      <Input placeholder="Имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="outline" onClick={() => remove(idx)}>
                <Trash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-[20px] flex-nowrap items-center gap-[10px]">
        <Separator className="w-full shrink-[initial]" />
        <Button
          type="button"
          variant="outline"
          className="rounded-full !h-[45px] !w-[45px] p-[12px]"
          onClick={() => {
            append({ value: "", name: "" });
          }}
        >
          <PlusIcon />
        </Button>
        <Separator className="w-full shrink-[initial]" />
      </div>
    </div>
  );
};
