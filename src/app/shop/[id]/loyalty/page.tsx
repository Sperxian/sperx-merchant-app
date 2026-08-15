"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "../../../../components/shared/DataTable";
import { useShop } from "../ShopContext";
import { fetchAllMemberPointTransactionsForShop } from "@/src/lib/api/loyalty";
import { LoyaltyTransactionSummary } from "@/src/lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDateTime } from "@/src/lib/utils/date.utils";

const columnHelper = createColumnHelper<LoyaltyTransactionSummary>();

export default function LoyaltyPage() {
  const shop = useShop();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const [loyaltyTransactions, setLoyaltyTransactions] = useState<
    LoyaltyTransactionSummary[]
  >([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("dateCreated", {
        header: "Date",
        cell: (info) => formatDateTime(info.getValue()),
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

  useEffect(() => {
    const fetchLoyaltyTransactions = async () => {
      const data = await fetchAllMemberPointTransactionsForShop(
        shop.id,
        page,
        pageSize,
      );
      setLoyaltyTransactions(data.items);
      setTotalRows(data.total);
    };

    fetchLoyaltyTransactions();
  }, [shop, page, pageSize]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary mb-4">
        Loyalty Transactions
      </h1>

      <DataTable
        columns={columns}
        rows={loyaltyTransactions}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
      />
    </div>
  );
}
