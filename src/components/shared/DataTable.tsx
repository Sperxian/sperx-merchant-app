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
  onClickRow?: (row: T) => void;
};

export default function DataTable<T>({
  columns,
  rows,
  page,
  pageSize,
  totalRows,
  onPageChange,
  onClickRow,
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
    <div className="overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/70">
      <div className="flex items-center justify-end gap-4 border-b border-slate-100 p-4 dark:border-white/10">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
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
            className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-slate-100 dark:divide-white/10">
        <thead className="bg-slate-50 dark:bg-white/[0.03]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="sticky top-0 z-10 p-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
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
        <tbody className="divide-y divide-slate-100 dark:divide-white/10">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`transition-colors ${onClickRow ? "cursor-pointer" : ""} hover:bg-primary/5 dark:hover:bg-primary-lighter/10`}
              onClick={() => onClickRow?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-sm text-slate-700 dark:text-slate-200">
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
