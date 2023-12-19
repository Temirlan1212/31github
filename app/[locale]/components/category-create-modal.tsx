"use client";

import { FormSkeleton } from "@/app/skeletons/form-skeleton";
import { IOption } from "@/app/stores/dictionary";
import { Button } from "@/app/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/app/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/form";
import { Input } from "@/app/ui/input";
import { IOptionFormSchema, optionSchema } from "@/app/validator-shema/option";
import { isEmptyObject } from "@/helpers/common";
import { getServerMessage } from "@/helpers/server-messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function CategoryCreateModal({
  onSuccess,
  slots,
  id,
}: {
  onSuccess?: (data: IOption[]) => void;
  slots?: {
    trigger?: (callback: Dispatch<SetStateAction<boolean>>) => React.ReactNode;
  };
  id?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IOption>({ value: "", label: "" });

  const form = useForm<IOptionFormSchema>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      value: "",
      label: "",
    },
    values: data,
  });

  async function onSubmit(formData: IOptionFormSchema) {
    try {
      setLoading(true);
      const method = !!id ? "PATCH" : "POST";
      const url =
        method === "PATCH" ? `/api/category?id=${id}` : "/api/category";

      const res: any = await fetch(url, {
        method: method,
        body: JSON.stringify(formData),
      });

      if (res.ok && res.status === 200) {
        const data = await res.json();
        if (Array.isArray(data)) {
          onSuccess && onSuccess(data);
          form.reset();
          setOpen(false);
        }
      } else {
        const data = await res.json();
        const errors = data?.errors;
        if (!isEmptyObject(errors)) {
          Object.keys(errors)?.map((key: any) => {
            const message = getServerMessage(errors?.[key]);
            form.setError(key, { message: message ?? "" });
          });
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const fetchCategory = async (id: string) => {
    try {
      setSkeleton(true);
      const res = await fetch(`/api/category?id=${id}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
    } finally {
      setSkeleton(false);
    }
  };

  useEffect(() => {
    if (id != null && open) fetchCategory(id);
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {slots?.trigger ? slots.trigger(setOpen) : <Plus />}

      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col gap-[10px]">
            <DialogHeader>
              <DialogDescription className="flex flex-col gap-[10px]">
                Категории
              </DialogDescription>
            </DialogHeader>

            {skeleton ? (
              <FormSkeleton rows={2} />
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="label"
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

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Значение</FormLabel>
                          <FormControl>
                            <Input placeholder="Значение модели" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <Button
                    type="button"
                    loading={loading}
                    onClick={() => onSubmit(form.getValues())}
                  >
                    Создать
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
