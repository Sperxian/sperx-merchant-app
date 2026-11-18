"use client";

import { useState } from "react";
import { ReceiptTextIcon } from "lucide-react";
import { ActionButton } from "@/src/components/shared/ActionButton";
import { spendMemberBalance } from "@/src/lib/api/member";
import { toastError, toastSuccess } from "@/src/lib/toast";
import type { MemberLoyaltyDto } from "@/src/types/member";
import type { WalletBasedConfig } from "@/src/types/loyalty";
import { useShop } from "../../ShopContext";
import { formatNumber } from "@/src/lib/utils/numeric.utils";

type MemberSheetSpendBalanceContentProps = {
  member: MemberLoyaltyDto;
  config: WalletBasedConfig;
  note: string;
  onClose: () => void;
  onRefresh: () => void;
};

function parseAmountCents(amount: number): number | undefined {
  if (!Number.isFinite(amount) || amount < 0) return undefined;

  const amountCents = Math.round(amount * 100);
  return Number.isSafeInteger(amountCents) ? amountCents : undefined;
}

export function MemberSheetSpendBalanceContent({
  member,
  config,
  note,
  onClose,
  onRefresh,
}: MemberSheetSpendBalanceContentProps) {
  const shop = useShop();
  const [salesAmount, setSalesAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const salesAmountCents = parseAmountCents(salesAmount);
  const isConfigValid =
    Number.isInteger(config.convertibleAmountCents) &&
    config.convertibleAmountCents > 0 &&
    Number.isInteger(config.pointsAwarded) &&
    config.pointsAwarded > 0;
  const pointsAwarded =
    salesAmountCents !== undefined && isConfigValid
      ? Math.floor(salesAmountCents / config.convertibleAmountCents) *
        config.pointsAwarded
      : 0;
  const hasValidSalesAmount =
    salesAmountCents !== undefined && salesAmountCents > 0;
  const currentBalance = (member.walletBalance ?? 0) / 100;
  const previewBalance =
    ((member.walletBalance ?? 0) - (salesAmountCents ?? 0)) / 100;

  const handleSpendBalance = async () => {
    if (
      isSubmitting ||
      salesAmountCents === undefined ||
      salesAmountCents <= 0 ||
      !isConfigValid
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      await spendMemberBalance(shop.id, member.id, salesAmountCents, note);
      await onRefresh();
      toastSuccess("Member wallet balance spent successfully.");
      setSalesAmount(0);
      onClose();
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-5 pb-8 md:pb-0">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-lighter">
              <ReceiptTextIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Spend Amount to Points
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every ₱{(config.convertibleAmountCents / 100).toFixed(2)} spent
                earns {config.pointsAwarded} points.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="member-sales-amount"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Sales amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                ₱
              </span>
              <input
                id="member-sales-amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={salesAmount}
                onChange={(event) =>
                  setSalesAmount(event.currentTarget.valueAsNumber || 0)
                }
                aria-describedby="member-sales-amount-hint"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <p
              id="member-sales-amount-hint"
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              Enter the total sale amount. Only complete spending increments
              earn points.
            </p>
          </div>
        </div>

        {!isConfigValid && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            This wallet program has an invalid spend-to-points configuration.
          </p>
        )}

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary-lighter/20 dark:bg-primary-lighter/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              Points to award
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {formatNumber(pointsAwarded, 0)}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary-lighter/20 dark:bg-primary-lighter/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              Balance after sale
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              ₱ {formatNumber(previewBalance)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Current balance: ₱ {formatNumber(currentBalance)}
          </p>
        </div>
      </div>

      <div className="min-h-16 sticky bottom-0 border-t bg-slate-50 dark:bg-slate-900 rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <ActionButton
          className="w-full rounded-xl py-3 text-sm"
          disabled={isSubmitting || !hasValidSalesAmount || !isConfigValid}
          onClick={handleSpendBalance}
        >
          {isSubmitting ? "Spending Balance..." : "Spend Balance"}
        </ActionButton>
      </div>
    </div>
  );
}
