"use client";

import { Dialog } from "@/src/components/shared/Dialog";
import { MemberSummary, MemberLoyaltyDto } from "@/src/types/member";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LoyaltyProgramContextProvider } from "../../LoyaltyProgramContext";
import { MemberSheetApplyStampContent } from "../../scanner/components/MemberSheetApplyStampContent";
import { MemberSheetRedeemRewardContent } from "../../scanner/components/MemberSheetRedeemRewardContent";
import { MemberSheetSpendBalanceContent } from "../../scanner/components/MemberSheetSpendBalanceContent";
import { MemberSheetTopUpBalanceContent } from "../../scanner/components/MemberSheetTopUpBalanceContent";

type TransactionAction =
  | "apply-stamp"
  | "spend-balance"
  | "top-up-balance"
  | "redeem-reward";

const transactionActions: Array<{
  key: TransactionAction;
  label: string;
}> = [
  { key: "apply-stamp", label: "Apply Stamp" },
  { key: "spend-balance", label: "Spend Balance" },
  { key: "top-up-balance", label: "Top-up Balance" },
  { key: "redeem-reward", label: "Redeem Reward" },
];

type Props = {
  memberId: string;
  memberSummary: MemberSummary;
  onRefresh: () => void;
};

export default function LoyaltyTransactionActions({
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

    const handlePointerDown = (event: PointerEvent) => {
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

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const openDialog = (action: TransactionAction) => {
    setIsMenuOpen(false);
    setActiveDialog(action);
  };
  const { loyaltyProgram } = memberSummary;
  const availableActions =
    loyaltyProgram.type === "WALLET_BASED"
      ? transactionActions.filter((action) => action.key !== "apply-stamp")
      : transactionActions.filter(
          (action) =>
            action.key !== "spend-balance" && action.key !== "top-up-balance",
        );
  const selectedAction = availableActions.find(
    (action) => action.key === activeDialog,
  );
  const member: MemberLoyaltyDto = {
    id: memberId,
    identityId: memberSummary.identityId,
    guestId: memberSummary.guestId,
    loyaltyProgram,
    points: memberSummary.netPoints,
    dateCreated: memberSummary.dateCreated,
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <div className="inline-flex w-full rounded-xl shadow-sm sm:w-auto">
          <span className="inline-flex flex-1 items-center rounded-l-xl border border-r-0 border-slate-200 bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white dark:border-slate-700">
            Member Actions
          </span>
          <button
            type="button"
            aria-label="Choose member action"
            aria-expanded={isMenuOpen}
            aria-controls="loyalty-transaction-actions"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-r-xl border border-slate-200 bg-primary px-3 text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700"
          >
            <ChevronDownIcon
              className={[
                "h-4 w-4 transition-transform",
                isMenuOpen ? "rotate-180" : "",
              ].join(" ")}
              aria-hidden="true"
            />
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="loyalty-transaction-actions"
            className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-slate-900 sm:left-auto sm:right-0 sm:w-48"
          >
            {availableActions.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => openDialog(action.key)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm uppercase tracking-wide text-slate-700 transition hover:bg-primary/5 hover:text-primary dark:text-slate-200 dark:hover:bg-primary-lighter/10 dark:hover:text-primary-lighter"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <LoyaltyProgramContextProvider value={loyaltyProgram}>
        <Dialog
          open={activeDialog !== null}
          onClose={() => setActiveDialog(null)}
          title={selectedAction?.label ?? "Member Action"}
          size="md"
        >
          {activeDialog === "apply-stamp" &&
          loyaltyProgram.type === "STAMP_BASED" ? (
            <MemberSheetApplyStampContent
              member={member}
              onRefresh={onRefresh}
              onClose={() => setActiveDialog(null)}
            />
          ) : activeDialog === "spend-balance" &&
            "convertibleAmountCents" in loyaltyProgram.config ? (
            <MemberSheetSpendBalanceContent
              member={member}
              config={loyaltyProgram.config}
              onRefresh={onRefresh}
              onClose={() => setActiveDialog(null)}
            />
          ) : activeDialog === "top-up-balance" &&
            loyaltyProgram.type === "WALLET_BASED" ? (
            <MemberSheetTopUpBalanceContent />
          ) : activeDialog === "redeem-reward" ? (
            <MemberSheetRedeemRewardContent
              member={member}
              onRefresh={onRefresh}
              onClose={() => setActiveDialog(null)}
            />
          ) : null}
        </Dialog>
      </LoyaltyProgramContextProvider>
    </>
  );
}
