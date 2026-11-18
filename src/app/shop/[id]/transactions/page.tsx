"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "../../../../components/shared/DataTable";
import { useShop } from "../ShopContext";
import { fetchAllMemberPointTransactionsForShop } from "@/src/lib/api/loyalty";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import { PageHeading } from "@/src/components/shared/PageHeading";
import { ShopLoyaltyHistoryTransactionItem } from "@/src/types/member";
import { formatNumber } from "@/src/lib/utils/numeric.utils";

const columnHelper = createColumnHelper<ShopLoyaltyHistoryTransactionItem>();

export default function LoyaltyPage() {
  const shop = useShop();
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [totalRows, setTotalRows] = useState(0);

  const [loyaltyTransactions, setLoyaltyTransactions] = useState<
    ShopLoyaltyHistoryTransactionItem[]
  >([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("transactionDate", {
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
      columnHelper.accessor("balance", {
        header: "Balance",
        cell: (info) => {
          const balance = info.getValue();
          if (!balance) return <span />;

          return (
            <span>
              {balance < 0 ? "-₱" : "₱"}
              {formatNumber(Math.abs(balance) / 100)}
            </span>
          );
        },
      }),
      columnHelper.accessor("loyaltyProgram.name", {
        header: "Program",
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
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeading
        eyebrow="Activity"
        title="Loyalty transactions"
        description="Review points earned and rewards redeemed across your shop."
      />

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
