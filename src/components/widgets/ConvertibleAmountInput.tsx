"use client";

import { useState } from "react";

function dollarsToCents(value: string): number | undefined {
  if (!/^\d*(?:\.\d{0,2})?$/.test(value) || value === "" || value === ".") {
    return undefined;
  }

  const [whole = "0", fraction = ""] = value.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

type ConvertibleAmountInputProps = {
  amountCents: number;
  onAmountCentsChange: (amountCents: number) => void;
};

export default function ConvertibleAmountInput({
  amountCents,
  onAmountCentsChange,
}: ConvertibleAmountInputProps) {
  const [amount, setAmount] = useState((amountCents / 100).toFixed(2));

  return (
    <input
      id="convertibleAmountCents"
      name="convertibleAmountCents"
      type="number"
      min="0"
      step="0.50"
      value={amount}
      onChange={(event) => {
        const value = event.target.value;
        if (/^\d*(?:\.\d{0,2})?$/.test(value)) {
          setAmount(value);
        }
      }}
      onBlur={() => {
        const parsedAmountCents = dollarsToCents(amount);
        if (parsedAmountCents === undefined) {
          setAmount((amountCents / 100).toFixed(2));
          return;
        }

        onAmountCentsChange(parsedAmountCents);
        setAmount((parsedAmountCents / 100).toFixed(2));
      }}
      placeholder="Amount convertible to points"
      className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-right text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
    />
  );
}
