"use client";

import { Dialog } from "@/src/components/shared/Dialog";
import { MemberSummary } from "@/src/types/member";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddPointsForm from "./AddPointsForm";
import RedeemRewardForm from "./RedeemRewardForm";
import { ActionButton } from "@/src/components/shared/ActionButton";

type TransactionAction = "add-points" | "redeem-reward";

type Props = {
  shopId: string;
  memberId: string;
  memberSummary: MemberSummary;
  onRefresh: () => void;
};

export default function LoyaltyTransactionActions({
  shopId,
  memberId,
  memberSummary,
  onRefresh,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<TransactionAction | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const openDialog = (action: TransactionAction) => {
    setIsMenuOpen(false);
    setActiveDialog(action);
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <ActionButton
          aria-expanded={isMenuOpen}
          aria-controls="loyalty-transaction-actions"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-xl px-4 py-2.5 text-sm"
        >
          Add Transaction
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </ActionButton>

        {isMenuOpen && (
          <div
            id="loyalty-transaction-actions"
            className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={() => openDialog("add-points")}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-primary/5 hover:text-primary dark:text-slate-200 dark:hover:bg-primary-lighter/10 dark:hover:text-primary-lighter"
            >
              Add Points
            </button>
            <button
              type="button"
              onClick={() => openDialog("redeem-reward")}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-primary/5 hover:text-primary dark:text-slate-200 dark:hover:bg-primary-lighter/10 dark:hover:text-primary-lighter"
            >
              Redeem Reward
            </button>
          </div>
        )}
      </div>

      <Dialog
        open={activeDialog !== null}
        onClose={() => setActiveDialog(null)}
        title={activeDialog === "redeem-reward" ? "Redeem Reward" : "Add Points"}
        size="md"
      >
        {activeDialog === "add-points" ? (
          <AddPointsForm
            shopId={shopId}
            memberId={memberId}
            onRefresh={onRefresh}
            onClose={() => setActiveDialog(null)}
          />
        ) : (
          <RedeemRewardForm
            shopId={shopId}
            memberId={memberId}
            memberSummary={memberSummary}
            onRefresh={onRefresh}
            onClose={() => setActiveDialog(null)}
          />
        )}
      </Dialog>
    </>
  );
}
