"use client";
import { FC, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn, useFieldArray } from "react-hook-form";
import { Plus, PlusIcon, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/app/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Separator } from "@/app/ui/separator";
import { Label } from "@/app/ui/label";

export interface IProductModelsDialogProps {
  form: UseFormReturn<any>;
  fieldArray: UseFieldArrayReturn<any, "models", "id">;
}

export const ProductModelsDialog: FC<IProductModelsDialogProps> = ({ form, fieldArray }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent className="m-[10px] w-[100%] sm:max-w-[80%] max-w-[300px] m-[20px] rounded-[15px]">
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-[10px]"></DialogDescription>
        </DialogHeader>
        <ProductModelsDialogContent fieldArray={fieldArray} setOpen={setOpen} form={form} />
      </DialogContent>
    </Dialog>
  );
};

export const ProductModelsDialogContent: FC<IProductModelsDialogProps & { setOpen: any }> = ({ fieldArray: { append, fields }, form, setOpen }) => {
  const index = fields.length - 1;
  const fieldArray = useFieldArray({
    control: form.control,
    name: `models.${index}.info`,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-2">
        <FormField
          control={form.control}
          name={`models.${index}.title`}
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

      <div className="flex flex-nowrap gap-2">
        <FormField
          control={form.control}
          name={`models.${index}.price.value`}
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
          name={`models.${index}.price.currency`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Валюта</FormLabel>
              <FormControl>
                <Input placeholder="Введите валюту модели" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <ProductModelsDialogInfoContent fieldArray={fieldArray} form={form} index={index} />

      <div className="w-full flex justify-end">
        <Button
          onClick={() => {
            append({ title: "", info: fieldArray.fields });
            setOpen(false);
          }}
        >
          Готово
        </Button>
      </div>
    </div>
  );
};

export const ProductModelsDialogInfoContent: FC<
  Pick<IProductModelsDialogProps, "form"> & { index: number; fieldArray: UseFieldArrayReturn<any, `models.${number}.info`, "id"> }
> = ({ form, index, fieldArray }) => {
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
                name={`models.${index}.info.${idx}.name`}
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
                name={`models.${index}.info.${idx}.value`}
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
