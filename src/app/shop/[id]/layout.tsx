"use client";

import "@/src/app/globals.css";
import { getShop } from "@/src/lib/api/shop";
import { ShopContextProvider } from "./ShopContext";
import { themeCssVars } from "@/src/lib/theme";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/src/components/Layouts/Sidebar";
import { Header } from "@/src/components/Layouts/Header";
import { Shop } from "@/src/lib/types";

type Props = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: Props) {
  const params = useParams<{ id: string }>();
  const shopId = params?.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!shopId) return;

    async function loadShopAndLoyaltyProgram() {
      try {
        const shopData = await getShop(shopId);
        setShop(shopData);
      } catch (err) {
        console.error("Failed to load shop data:", err);
      }
    }

    loadShopAndLoyaltyProgram();
  }, [shopId]);

  const pageTitle = useMemo(() => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname.endsWith("/scanner")) return "Merchant Scanner";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.endsWith("/transactions")) return "Transactions";
    return "SperX";
  }, []);

  if (!shop) {
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100" />
    );
  }

  const { theme: shopTheme } = shop.config;
  const themeVars = shopTheme ? themeCssVars(shopTheme) : undefined;

  return (
    <ShopContextProvider value={shop}>
      <div
        className="min-h-dvh w-full bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"
      >
        <div className="flex min-h-dvh flex-col lg:flex-row">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleCollapse={() =>
              setIsSidebarCollapsed((isCollapsed) => !isCollapsed)
            }
          />

          {isSidebarOpen ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar overlay"
            />
          ) : null}

          <div className="flex w-full flex-1 flex-col min-h-0">
            <Header
              shopName={shop.name}
              pageTitle={pageTitle}
              onOpenSidebar={() => setIsSidebarOpen(true)}
            />

            <main
              className="flex-1 min-h-0 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
              style={themeVars}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </ShopContextProvider>
  );
}
