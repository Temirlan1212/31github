"use client";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import React, { forwardRef, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/app/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/ui/command";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/app/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/ui/popover";
import { Label } from "@/app/ui/label";

export interface IMultiSelectProps {
  options: Record<string, any>[];
  title?: string;
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  valueFieldName?: string;
  labelFieldName?: string;
}

const MultiSelect: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IMultiSelectProps
> = (
  {
    options = [],
    title,
    placeholder,
    field,
    labelFieldName = "label",
    valueFieldName = "value",
  },
  ref
) => {
  const [selectedValues, setSelectedValues] = React.useState(
    () => new Set<string>()
  );

  useEffect(() => {
    if (!!field) setSelectedValues(new Set(field.value));
  }, [field, field.value]);

  return (
    <FormItem ref={ref}>
      {title ? <FormLabel>{title}</FormLabel> : null}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <div className="relative flex min-h-[46px] items-center justify-end rounded-md border data-[state=open]:border-ring">
              <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden px-3 py-2">
                {selectedValues?.size > 0 ? (
                  options &&
                  options
                    .filter((option) =>
                      selectedValues.has(option?.[valueFieldName] ?? "---")
                    )
                    .map((option) => (
                      <Badge
                        key={option?.[valueFieldName] ?? "---"}
                        variant="outline"
                        className="m-[2px] gap-1 pr-0.5"
                      >
                        <span className="">
                          {option?.[labelFieldName] ?? "---"}
                        </span>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedValues((prev) => {
                              const next = new Set(prev);
                              next.delete(option?.[valueFieldName] ?? "---");
                              return next;
                            });
                          }}
                          className="flex items-center rounded-sm px-[1px] hover:bg-accent hover:text-red-500"
                        >
                          <X size={14} />
                        </span>
                      </Badge>
                    ))
                ) : (
                  <Label className="mr-auto text-sm">{placeholder}</Label>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center self-stretch px-1 text-muted-foreground/60">
                {selectedValues?.size > 0 && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedValues(new Set());
                    }}
                    className="flex items-center self-stretch p-2 hover:text-red-500"
                  >
                    <X size={16} />
                  </div>
                )}
                <span className="mx-0.5 my-2 w-[1px] self-stretch bg-border" />
                <div className="flex items-center self-stretch p-2 hover:text-muted-foreground">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Поиск..." className="h-9" />
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => {
                const isSelected = selectedValues.has(
                  option?.[valueFieldName] ?? "---"
                );
                return (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(
                          option?.[valueFieldName] ?? "---"
                        );
                      } else {
                        selectedValues.add(option?.[valueFieldName] ?? "---");
                      }
                      if (!field) setSelectedValues(new Set(selectedValues));
                      if (!!field) field.onChange(Array.from(selectedValues));
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option?.[labelFieldName] ?? "---"}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default forwardRef<HTMLDivElement, IMultiSelectProps>(MultiSelect);
