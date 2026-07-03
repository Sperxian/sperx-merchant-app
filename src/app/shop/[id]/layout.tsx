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
import { AdminDashboardShell } from "@/src/components/Layouts/AdminDashboardShell";

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

  const themeVars = theme ? themeCssVars(theme) : undefined;

  return (
    <ShopContextProvider value={shop}>
      <LoyaltyProgramContextProvider value={loyaltyProgram}>
        <AdminDashboardShell>
          <AppHeader style={themeVars} />

          <div
            className="flex-1 flex flex-col relative overflow-hidden w-full"
            style={themeVars}
          >
            {children}
          </div>
        </AdminDashboardShell>
      </LoyaltyProgramContextProvider>
    </ShopContextProvider>
  );
}
