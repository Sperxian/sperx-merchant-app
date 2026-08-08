"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LoyaltyTransactionSummary, Paginated } from "@/src/lib/types";

type TransactionsTableProps = {
  transactions: Paginated<LoyaltyTransactionSummary>;
};

const columnHelper = createColumnHelper<LoyaltyTransactionSummary>();

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  console.log({ transactions });
  const columns = useMemo(
    () => [
      columnHelper.accessor("dateCreated", {
        header: "Date",
        cell: (info) =>
          info.getValue()
      }),
      columnHelper.accessor("memberId", {
        header: "Member",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("points", {
        header: "Points",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("loyaltyProgramName", {
        header: "Program",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("rewardName", {
        header: "Reward",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: transactions.items,
    state: {},
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-auto rounded-lg border border-foreground/40 bg-background/30 shadow-sm">
      <h2 className="p-4 font-bold">Transactions</h2>

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
