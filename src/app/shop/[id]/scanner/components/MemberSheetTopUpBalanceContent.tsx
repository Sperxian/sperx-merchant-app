"use client";

import { useState } from "react";
import { WalletIcon } from "lucide-react";
import { ActionButton } from "@/src/components/shared/ActionButton";
import { topUpMemberBalance } from "@/src/lib/api/member";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { formatNumber } from "@/src/lib/utils/numeric.utils";
import type { MemberLoyaltyDto } from "@/src/types/member";
import { useShop } from "../../ShopContext";

const MINIMUM_TOP_UP_PESOS = 300;
const MAXIMUM_TOP_UP_PESOS = 100_000;

type MemberSheetTopUpBalanceContentProps = {
  member: MemberLoyaltyDto;
  note: string;
  onClose: () => void;
  onRefresh: () => void | Promise<void>;
};

function parseAmountCents(amount: string): number | undefined {
  if (!/^\d+(?:\.\d{1,2})?$/.test(amount)) return undefined;

  const [whole, fraction = ""] = amount.split(".");
  const amountCents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(amountCents) ? amountCents : undefined;
}

export function MemberSheetTopUpBalanceContent({
  member,
  note,
  onClose,
  onRefresh,
}: MemberSheetTopUpBalanceContentProps) {
  const shop = useShop();
  const [amount, setAmount] = useState(String(MINIMUM_TOP_UP_PESOS));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const amountCents = parseAmountCents(amount);
  const isAmountValid =
    amountCents !== undefined &&
    amountCents >= MINIMUM_TOP_UP_PESOS * 100 &&
    amountCents <= MAXIMUM_TOP_UP_PESOS * 100;
  const numericAmount = (amountCents ?? 0) / 100;
  const walletBalance = (member.walletBalance ?? 0) / 100;

  const previewBalance = Math.max(
    walletBalance + (isAmountValid ? numericAmount : 0),
    0,
  );

  const handleTopUp = async () => {
    if (isSubmitting || !isAmountValid || amountCents === undefined) return;

    try {
      setIsSubmitting(true);
      await topUpMemberBalance(shop.id, member.id, amountCents, note);
      await onRefresh();
      setAmount(String(MINIMUM_TOP_UP_PESOS));
      toastSuccess("Member wallet balance topped up successfully.");
      onClose();
    } catch (error) {
      toastError(
        error,
        "Unable to top up member wallet balance. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-5 pb-8 md:pb-0">
        <div>
          <p className="text-sm font-medium text-foreground/50 mb-2">
            Wallet Balance
          </p>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-lighter">
              <WalletIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current balance (placeholder)
              </p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                ₱ {formatNumber(walletBalance)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="member-top-up-amount"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Top-up amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ₱
            </span>
            <input
              id="member-top-up-amount"
              type="number"
              min={MINIMUM_TOP_UP_PESOS}
              max={MAXIMUM_TOP_UP_PESOS}
              step="100"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-describedby="member-top-up-hint"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <p
            id="member-top-up-hint"
            className="text-xs text-slate-500 dark:text-slate-400"
          >
            Top-up amount must be between ₱{" "}
            {formatNumber(MINIMUM_TOP_UP_PESOS)} and ₱{" "}
            {formatNumber(MAXIMUM_TOP_UP_PESOS)}. Wallet balance cannot be
            negative.
          </p>
          {amount !== "" && !isAmountValid && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              Enter a top-up amount between ₱{" "}
              {formatNumber(MINIMUM_TOP_UP_PESOS)} and ₱{" "}
              {formatNumber(MAXIMUM_TOP_UP_PESOS)}.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary-lighter/20 dark:bg-primary-lighter/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              New balance preview
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              ₱ {formatNumber(previewBalance)}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          The current wallet balance is a placeholder until balance data is
          available.
        </p>
      </div>

      <div className="min-h-16 sticky bottom-0 border-t bg-slate-50 dark:bg-slate-900 rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <ActionButton
          className="w-full rounded-xl py-3 text-sm"
          disabled={!isAmountValid || isSubmitting}
          onClick={handleTopUp}
        >
          {isSubmitting ? "Topping Up..." : "Top-up Balance"}
        </ActionButton>
      </div>
    </div>
  );
}
