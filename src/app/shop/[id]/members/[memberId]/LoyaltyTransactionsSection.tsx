"use client";

import DataTable from "@/src/components/shared/DataTable";
import { getMemberLoyaltyHistory } from "@/src/lib/api/member";
import { Shop } from "@/src/lib/types";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import { MemberPointTransaction } from "@/src/types/member";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

type Props = {
  shop: Shop;
  memberId: string;
};

const columnHelper = createColumnHelper<MemberPointTransaction>();

export default function LoyaltyTransactionsSection({ shop, memberId }: Props) {
  const pageSize = 20;
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [transactions, setTransactions] = useState<MemberPointTransaction[]>(
    [],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("dateCreated", {
        header: "Date",
        cell: (info) => formatDateTime(info.getValue()),
      }),
      columnHelper.accessor("points", {
        header: "Points",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    [],
  );

  useEffect(() => {
    const fetchMember = async () => {
      const data = await getMemberLoyaltyHistory(
        shop.id,
        memberId,
        page,
        pageSize,
      );

      setPage(data.page);
      setTotalRows(data.total);
      setTransactions(data.items);
    };
    fetchMember();
  }, [shop.id, memberId, page]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary">
        Loyalty Transactions
      </h1>

      <DataTable
        columns={columns}
        rows={transactions}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
      />
    </>
  );
}
