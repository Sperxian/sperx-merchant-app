"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  rows: T[];
  page: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
};

export default function DataTable<T>({
  columns,
  rows,
  page,
  pageSize,
  totalRows,
  onPageChange,
}: Props<T>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  return (
    <div className="overflow-auto rounded-lg border border-foreground/40 bg-background/30 shadow-sm">
      <div className="flex items-center justify-between gap-4 p-4">
        <h2 className="font-bold">Transactions</h2>
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            className="rounded border border-foreground/20 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onPageChange(Math.max(0, page - 1))}
            disabled={page <= 0}
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            className="rounded border border-foreground/20 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-foreground/10">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 z-10 p-4 text-left text-md font-bold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-foreground/10">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-500">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
