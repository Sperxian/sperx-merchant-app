"use client";

import { useState } from "react";
import { WalletIcon } from "lucide-react";
import { ActionButton } from "@/src/components/shared/ActionButton";

const MINIMUM_TOP_UP = 100;
const CURRENT_BALANCE_PLACEHOLDER = 0;

export function MemberSheetTopUpBalanceContent() {
  const [amount, setAmount] = useState(String(MINIMUM_TOP_UP));
  const numericAmount = Number(amount);
  const isAmountValid =
    Number.isFinite(numericAmount) && numericAmount >= MINIMUM_TOP_UP;
  const previewBalance = Math.max(
    0,
    CURRENT_BALANCE_PLACEHOLDER + (isAmountValid ? numericAmount : 0),
  );

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
                ₱ {CURRENT_BALANCE_PLACEHOLDER.toFixed(2)}
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
              min={MINIMUM_TOP_UP}
              step="0.01"
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
            Minimum top-up: ₱ {MINIMUM_TOP_UP.toFixed(2)}. Wallet balance cannot
            be negative.
          </p>
          {amount !== "" && !isAmountValid && (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              Enter a top-up amount of at least ₱ {MINIMUM_TOP_UP.toFixed(2)}.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary-lighter/20 dark:bg-primary-lighter/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-600 dark:text-slate-300">
              New balance preview
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              ₱ {previewBalance.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Preview only — top-up submission is not connected yet.
        </p>
      </div>

      <div className="min-h-16 sticky bottom-0 border-t bg-slate-50 dark:bg-slate-900 rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <ActionButton
          className="w-full rounded-xl py-3 text-sm"
          disabled
        >
          Top-up Balance Coming Soon
        </ActionButton>
      </div>
    </div>
  );
}
