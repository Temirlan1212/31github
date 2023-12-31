"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Delete,
  Edit,
  Edit2,
  Edit3,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "@/app/ui/button";
import { Checkbox } from "@/app/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";
import { Input } from "@/app/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/table";
import { IModelSchema } from "@/app/validator-shema/product";
import { currencyList } from "@/helpers/currency-list";
import { TableSkeleton } from "@/app/skeletons/table-skeleton";
import Link from "next/link";
import { RoutePath } from "@/routes/dashboard-routes";
import { useRouter } from "next/navigation";

export function ProductDataTable({
  data,
  loading,
  slug,
}: {
  slug: string;
  data: Record<string, any>[];
  loading: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<IModelSchema[]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            !!table.getIsAllPageRowsSelected() ||
            !!(table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => <div className="text-right">Название</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">{row.getValue("title")}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionCell row={row} />,
    },
  ];

  const table = useReactTable({
    data: data,
    columns: columns as any,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (!!loading) return <TableSkeleton filterBar={true} rows={4} />;

  return (
    <div className="w-full">
      <div className="flex items-center pb-4 justify-between gap-2 flex-wrap">
        <Input
          placeholder="Поиск по названию модели"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          wrapperclassname="max-w-full w-full md:max-w-sm"
        />

        <div className="flex items-center gap-2 w-full md:w-[fit-content]">
          <Link passHref href={`/${RoutePath["products-edit"]}/${slug}`}>
            <Button variant="outline" className="p-[10px]">
              <Plus className="w-[15px] text-muted-foreground h-auto" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto w-full md:w-[fit-content]"
              >
                Колонки <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нету данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} столбцов выбрано.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Предыдущий
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Следующий
          </Button>
        </div>
      </div>
    </div>
  );
}

const ActionCell = ({ row }: { row: Row<IModelSchema[]> }) => {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const id = (row.original as Record<string, any>)?.["_id"];
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);
    const res = await fetch(`/api/product?id=${id}`, { method: "DELETE" });
    setDeleteLoading(false);
    if (res.ok && res.status === 200) router.refresh();
  };

  if (!id) return <></>;
  return (
    <div className="flex justify-end gap-2">
      <Button
        loading={deleteLoading}
        onClick={() => handleDelete(id)}
        variant="outline"
        className="p-[10px]"
      >
        <Trash className="w-[15px] text-muted-foreground h-[15px]" />
      </Button>
      <Link passHref href={`/${RoutePath["products-edit"]}/${id}`}>
        <Button variant="outline" className="p-[10px]">
          <Edit2 className="w-[15px] text-muted-foreground h-[15px]" />
        </Button>
      </Link>
    </div>
  );
};
