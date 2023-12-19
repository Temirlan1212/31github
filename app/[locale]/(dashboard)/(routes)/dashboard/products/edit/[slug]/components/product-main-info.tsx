"use client";

import { IProductFormSchema } from "@/app/validator-shema/product";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Textarea } from "@/app/ui/textarea";
import { CategoryFormField } from "@/app/[locale]/fields/category-form-field";

export const ProductMainInfo = ({
  control,
}: {
  control: Control<IProductFormSchema>;
}) => {
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
                <Textarea
                  placeholder="Введите описание"
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
        <CategoryFormField control={control} />
      </div>
    </div>
  );
};
