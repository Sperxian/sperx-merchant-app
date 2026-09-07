"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useShop } from "../../ShopContext";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { UserButton } from "@clerk/nextjs";

interface AppHeaderProps {
  style?: CSSProperties;
}

export function AppHeader({ style }: AppHeaderProps) {
  const shop = useShop();
  const iconLocation = shop.config.iconLocation as string;

  const loyaltyProgram = useLoyaltyProgram();

  return (
    <header
      className="flex items-center gap-3 bg-primary px-4 py-3 justify-between"
      style={style}
    >
      <div className="flex items-center gap-3 flex-shrink-0">
        <Image
          className="aspect-square bg-white rounded-full object-scale-down"
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
            {"loyaltyProgram.name"}
          </p>
        </div>
      </div>
      <UserButton afterSwitchSessionUrl="/sign-in" />
    </header>
  );
}
