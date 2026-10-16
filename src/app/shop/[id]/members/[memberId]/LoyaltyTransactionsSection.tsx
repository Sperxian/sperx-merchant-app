"use client";

import DataTable from "@/src/components/shared/DataTable";
import LoyaltyTransactionActions from "./LoyaltyTransactionActions";
import { getMemberLoyaltyHistory } from "@/src/lib/api/member";
import { Shop } from "@/src/lib/types";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import { MemberPointTransaction } from "@/src/types/member";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toastError } from "@/src/lib/toast";

type Props = {
  shop: Shop;
  memberId: string;
  onMemberRefresh: () => Promise<void>;
};

const columnHelper = createColumnHelper<MemberPointTransaction>();

export default function LoyaltyTransactionsSection({
  shop,
  memberId,
  onMemberRefresh,
}: Props) {
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

  const refreshTransactions = useCallback(async () => {
    const data = await getMemberLoyaltyHistory(
      shop.id,
      memberId,
      page,
      pageSize,
    );

    setPage(data.page);
    setTotalRows(data.total);
    setTransactions(data.items);
  }, [shop.id, memberId, page]);

  useEffect(() => {
    const fetchTransactions = async () => {
      await refreshTransactions();
    };
    void fetchTransactions();
  }, [refreshTransactions]);

  const handlePointsAdded = () => {
    void Promise.all([refreshTransactions(), onMemberRefresh()]).catch(
      toastError,
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-start justify-between gap-2">
        <h1 className="text-2xl font-semibold text-primary">
          Loyalty Transactions
        </h1>

        <LoyaltyTransactionActions
          shopId={shop.id}
          memberId={memberId}
          onPointsAdded={handlePointsAdded}
        />
      </div>

      <DataTable
        columns={columns}
        rows={transactions}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
      />
    </div>
  );
}
