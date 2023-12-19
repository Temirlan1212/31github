"use client";

import { IProductFormSchema } from "@/app/validator-shema/product";
import { Control } from "react-hook-form";
import { FormField } from "@/app/ui/form";
import MultiSelect from "@/app/ui/multi-select";
import useDictionary, { IOption } from "@/app/stores/dictionary";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CategoryCreateModal from "@/app/[locale]/components/category-create-modal";
import { Edit2, Plus, Trash } from "lucide-react";
import { Button } from "@/app/ui/button";
import { Label } from "@/app/ui/label";
import { FormSkeleton } from "@/app/skeletons/form-skeleton";

export const CategoryFormField = ({
  control,
}: {
  control: Control<IProductFormSchema>;
}) => {
  const [skeleton, setSkeleton] = useState(false);

  const categories = useDictionary((store) => store.categories);
  const setDictionary = useDictionary((store) => store.setDictionary);
  const setCategoreis = (data: IOption[]) => setDictionary("categories", data);

  const fetchCategory = async () => {
    try {
      setSkeleton(true);
      const res = await fetch("/api/category");
      const data = await res.json();
      if (Array.isArray(data)) setDictionary("categories", data);
    } catch (error) {
    } finally {
      setSkeleton(false);
    }
  };

  useEffect(() => {
    if (categories?.length < 1) fetchCategory();
  }, []);

  if (skeleton) return <FormSkeleton rows={1} />;

  return (
    <div className="flex flex-col gap-2">
      <CategoryCreateModal
        onSuccess={setCategoreis}
        slots={{
          trigger: (setOpen) => (
            <div className="flex justify-between items-end">
              <Label>Категории</Label>
              <Button
                type="button"
                variant="outline"
                className="p-[10px]"
                onClick={() => setOpen(true)}
              >
                <Plus className="w-[15px] text-muted-foreground h-[15px]" />
              </Button>
            </div>
          ),
        }}
      />
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <MultiSelect
            slots={{
              actions: (option) => (
                <MultiSelectActions option={option} update={setCategoreis} />
              ),
            }}
            field={field}
            options={categories}
            placeholder="Выберите категории"
          />
        )}
      />
    </div>
  );
};

const MultiSelectActions = ({
  option,
  update,
}: {
  update: (data: IOption[]) => void;
  option: Record<string, any>;
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/category?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (Array.isArray(data)) update(data);
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <CategoryCreateModal
        id={option?._id}
        onSuccess={update}
        slots={{
          trigger: (setOpen) => (
            <Button
              onClick={() => setOpen(true)}
              type="button"
              variant="outline"
              className="p-[10px]"
            >
              <Edit2 className="w-[15px] text-muted-foreground h-[15px]" />
            </Button>
          ),
        }}
      />

      <Button
        loading={deleteLoading}
        onClick={() => !!option?._id && handleDelete(option._id)}
        type="button"
        variant="outline"
        className="p-[10px]"
      >
        <Trash className="w-[15px] text-muted-foreground h-[15px]" />
      </Button>
    </div>
  );
};
