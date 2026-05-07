"use client";

import Image from "next/image";
import { useShop } from "../../ShopContext";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";

export function AppHeader() {
  const shop = useShop();
  const iconLocation = shop.config.iconLocation as string;

  const loyaltyProgram = useLoyaltyProgram();

  return (
    <header className="flex items-center gap-3 bg-primary px-4 py-3 flex-shrink-0">
      <Image
        className="dark:invert bg-white rounded-full object-cover"
        src={iconLocation}
        alt={shop.name}
        width={36}
        height={36}
        priority
      />
      <div>
        <h1 className="text-white text-xl font-medium leading-tight">
          {shop.name}
        </h1>

        <p className="text-white/50 text-xs leading-tight">
          {loyaltyProgram.name}
        </p>
      </div>
    </header>
  );
}
