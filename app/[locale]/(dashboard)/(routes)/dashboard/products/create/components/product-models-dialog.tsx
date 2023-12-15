"use client";
import { FC } from "react";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";

export interface IProductModelsDialogProps {
  form: UseFormReturn<any>;
  modelsProps: UseFieldArrayReturn<any, any>;
}

export const ProductModelsDialog: FC<IProductModelsDialogProps> = ({
  form,
  modelsProps,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent className="m-[10px] w-[100%] sm:max-w-[500px] max-w-[300px] rounded-[15px]">
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-[10px]"></DialogDescription>
        </DialogHeader>
        <ProductModelsDialogContent modelsProps={modelsProps} form={form} />
      </DialogContent>
    </Dialog>
  );
};

export const ProductModelsDialogContent: FC<IProductModelsDialogProps> = ({
  form,
  modelsProps,
}) => {
  const { fields, append, prepend, remove, swap, move, insert } = modelsProps;

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} className="mt-[40px]">
          <div className="grid gap-2">
            <FormField
              key={field.id}
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

          <ProductModelsDialogInfoContent form={form} index={index} />
        </div>
      ))}
    </div>
  );
};

export const ProductModelsDialogInfoContent: FC<
  Omit<IProductModelsDialogProps, "modelsProps"> & { index: number }
> = ({ form, index }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: `models.${index}.info`,
    }
  );

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index} className="mt-[40px]">
          <div className="grid gap-2">
            <FormField
              key={field.id}
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
        </div>
      ))}
    </div>
  );
};
