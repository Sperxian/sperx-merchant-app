"use client";

import DataTable from "@/src/components/shared/DataTable";
import { Dialog } from "@/src/components/shared/Dialog";
import { getMemberLoyaltyHistory } from "@/src/lib/api/member";
import { Shop } from "@/src/lib/types";
import { formatDateTime } from "@/src/lib/utils/date.utils";
import { MemberPointTransaction } from "@/src/types/member";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  shop: Shop;
  memberId: string;
};

const columnHelper = createColumnHelper<MemberPointTransaction>();

type TransactionAction = "add-points" | "redeem-reward";

export default function LoyaltyTransactionsSection({ shop, memberId }: Props) {
  const pageSize = 20;
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [transactions, setTransactions] = useState<MemberPointTransaction[]>(
    [],
  );
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<TransactionAction | null>(
    null,
  );
  const actionMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isActionMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !actionMenuRef.current?.contains(event.target)
      ) {
        setIsActionMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActionMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActionMenuOpen]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-primary">
          Loyalty Transactions
        </h1>

        <div ref={actionMenuRef} className="relative">
          <button
            type="button"
            aria-expanded={isActionMenuOpen}
            aria-controls="loyalty-transaction-actions"
            onClick={() => setIsActionMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
          >
            Add Transaction
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>

          {isActionMenuOpen && (
            <div
              id="loyalty-transaction-actions"
              className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-foreground/20 bg-background p-1 shadow-lg"
            >
              <button
                type="button"
                onClick={() => {
                  setIsActionMenuOpen(false);
                  setActiveDialog("add-points");
                }}
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-foreground/10"
              >
                Add Points
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsActionMenuOpen(false);
                  setActiveDialog("redeem-reward");
                }}
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-foreground/10"
              >
                Redeem Reward
              </button>
            </div>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={transactions}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
      />

      <Dialog
        open={activeDialog !== null}
        onClose={() => setActiveDialog(null)}
        title={activeDialog === "redeem-reward" ? "Redeem Reward" : "Add Points"}
        size="md"
      >
        <p className="pb-4 text-sm text-foreground/70">
          {activeDialog === "redeem-reward"
            ? "The Redeem Reward form will be available here."
            : "The Add Points form will be available here."}
        </p>
      </Dialog>
    </>
  );
}
