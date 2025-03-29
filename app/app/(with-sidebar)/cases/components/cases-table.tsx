"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { DataTablePagination } from "./cases-table-pagination";
import { Settings2 } from "lucide-react";
import { useBreakpoints } from "@/hooks/use-breakpoints";

interface CasesTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function CasesTable<TData, TValue>({
  columns,
  data,
}: CasesTableProps<TData, TValue>) {
  const router = useRouter();

  const onNavigateToCaseDetailsPage = (id: string) => {
    router.push(`/app/cases/${id}`);
  };

  const {
    isAtMostMobile,
    isAtLeastTablet,
    isAtLeastDesktop,
    isAtLeastLargeScreen,
    isAtLeastLargePlusScreen,
    isAtLeastExtraLargeScreen,
  } = useBreakpoints();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    assignedUsers: isAtLeastDesktop,
    createdBy: isAtLeastDesktop,
    type: !isAtMostMobile,
    priority: isAtLeastLargeScreen,
    status: isAtLeastLargeScreen,
    createdAt: isAtLeastLargeScreen,
    updatedAt: isAtLeastLargePlusScreen,
  });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    setColumnVisibility({
      assignedUsers: isAtLeastDesktop,
      createdBy: isAtLeastDesktop,
      type: !isAtMostMobile,
      priority: isAtLeastLargeScreen,
      status: isAtLeastLargeScreen,
      createdAt: isAtLeastLargeScreen,
      updatedAt: isAtLeastLargePlusScreen,
    });
  }, [
    isAtMostMobile,
    isAtLeastTablet,
    isAtLeastDesktop,
    isAtLeastLargeScreen,
    isAtLeastLargePlusScreen,
    isAtLeastExtraLargeScreen,
  ]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={
            (table.getColumn("createdBy")?.getFilterValue() as string) || ""
          }
          onChange={(event) =>
            table.getColumn("createdBy")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 />
              View
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
                  //@ts-ignore
                  onClick={() => onNavigateToCaseDetailsPage(row.original.id)}
                  className="cursor-pointer"
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
