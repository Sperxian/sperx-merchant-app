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
        <span className="text-primary dark:text-primary-lighter font-medium">
          SperX
        </span>
        !
      </div>

      <span className="text-body text-sm">
        We&apos;re excited to have you. Let&apos;s get started by setting up
        your shop and loyalty program.
      </span>

      <div className="pt-12 pb-6 flex flex-col items-center">
        <label
          htmlFor="shopName"
          className="mb-2 block text-lg font-medium text-foreground"
        >
          What&apos;s the name of your shop?
        </label>

        <input
          id="shopName"
          name="shopName"
          type="text"
          placeholder="Your Shop's Name"
          className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ShopStep;
