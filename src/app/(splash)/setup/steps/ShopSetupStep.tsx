"use client";

import React from "react";

type SetString = React.Dispatch<React.SetStateAction<string>>;

interface ShopStepProps {
  shopName: string;
  setShopName: SetString;
}

export function ShopStep({ shopName, setShopName }: ShopStepProps) {
  return (
    <div className="w-full">
      <div className="text-xl font-medium w-full mb-4">
        Welcome to{" "}
        <span className="font-medium text-primary dark:text-primary-lighter">
          SperX
        </span>
        !
      </div>

      <span className="text-sm text-slate-500 dark:text-slate-400">
        We&apos;re excited to have you. Let&apos;s get started by setting up
        your shop and loyalty program.
      </span>

      <div className="pt-12 pb-6 flex flex-col items-center">
        <label
          htmlFor="shopName"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          What&apos;s the name of your shop?
        </label>

        <input
          id="shopName"
          name="shopName"
          type="text"
          placeholder="Your Shop's Name"
          className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ShopStep;
