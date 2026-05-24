import type { Metadata } from "next";
import "@/src/app/globals.css";
import { AppHeader } from "./scanner/components/AppHeader";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";
import { getShop } from "@/src/lib/api/shop";
import { ShopContextProvider } from "./ShopContext";
import { LoyaltyProgramContextProvider } from "./LoyaltyProgramContext";
import { notFound } from "next/navigation";
import { themeCssVars } from "@/src/lib/theme";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

async function loadShopAndLoyaltyProgram(shopId: string) {
  let shop;
  try {
    shop = await getShop(shopId);
  } catch (err) {
    console.error("Failed to load shop:", { err });
    return notFound();
  }

  const { data: loyaltyPrograms } = await getLoyaltyPrograms(shopId);
  const [loyaltyProgram] = loyaltyPrograms;

  return { shop, loyaltyProgram };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: shopId } = await params;
  const { shop, loyaltyProgram } = await loadShopAndLoyaltyProgram(shopId);

  return {
    title: shop.name,
    description: loyaltyProgram.name,
  };
}

export default async function ShopLayout({ children, params }: Props) {
  const { id: shopId } = await params;
  const { shop, loyaltyProgram } = await loadShopAndLoyaltyProgram(shopId);

  const { theme } = shop.config;
  console.log({ theme });

  const themeVars = theme ? themeCssVars(theme) : undefined;

  return (
    <ShopContextProvider value={shop}>
      <LoyaltyProgramContextProvider value={loyaltyProgram}>
          <AppHeader style={themeVars} />

          {/* scroll area wrapper */}
          <div className="flex-1 relative overflow-hidden" style={themeVars}>
            {/* actual scroll container */}
            <main className="h-full overflow-y-auto">{children}</main>

            {/* bottom fade indicator */}
            <div
              className={[
                "pointer-events-none absolute bottom-0 left-0 right-0 h-15",
                "bg-gradient-to-t from-background via-background/75 via-background/30 to-transparent",
              ].join(" ")}
            />
          </div>
      </LoyaltyProgramContextProvider>
    </ShopContextProvider>
  );
}
