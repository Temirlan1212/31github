"use client";

import { IProductFormSchema } from "@/app/validator-shema/product";
import { Control } from "react-hook-form";
import { FormField } from "@/app/ui/form";
import MultiSelect from "@/app/ui/multi-select";
import { IOption } from "@/app/stores/dictionary";
import { useEffect, useState } from "react";
import CategoryCreateModal from "@/app/[locale]/components/category-create-modal";

export const CategoryFormField = ({
  control,
}: {
  control: Control<IProductFormSchema>;
}) => {
  const [options, setOptions] = useState<IOption[]>([]);

  const fetchCategory = async () => {
    const res = await fetch("/api/category");
    if (res.ok && res.status === 200) {
      const data = await res.json();
      if (Array.isArray(data)) setOptions(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <CategoryCreateModal onSuccess={setOptions} />
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <MultiSelect
            field={field}
            options={options}
            placeholder="Выберите категории"
          />
        )}
      />
    </div>
  );
};
