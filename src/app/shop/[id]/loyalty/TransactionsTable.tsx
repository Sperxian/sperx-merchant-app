"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type MemberLoyaltyTransaction = {
  member: string;
  points: number;
  date: Date;
  loyaltyProgram: {
    id: string;
    name: string;
  };
  reward: {
    name: string;
  };
};

type TransactionsTableProps = {
  transactions: MemberLoyaltyTransaction[];
};

const columnHelper = createColumnHelper<MemberLoyaltyTransaction>();

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const columns = useMemo(
    () => [
      columnHelper.accessor("member", {
        header: "Member",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("points", {
        header: "Points",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) =>
          info.getValue().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
      }),
      columnHelper.accessor("loyaltyProgram.name", {
        header: "Program",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("reward.name", {
        header: "Reward",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: transactions,
    state: {},
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-auto rounded-lg border border-foreground/40 shadow-sm">
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
