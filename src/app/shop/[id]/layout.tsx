"use client";

import "@/src/app/globals.css";
import { getShop } from "@/src/lib/api/shop";
import { ShopContextProvider } from "./ShopContext";
import { themeCssVars } from "@/src/lib/theme";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import { Sidebar, type SidebarMode } from "@/src/components/Layouts/Sidebar";
import { Header } from "@/src/components/Layouts/Header";
import { Shop } from "@/src/lib/types";

const SIDEBAR_MODE_STORAGE_KEY = "admin-sidebar-mode";
const sidebarModeSubscribers = new Set<() => void>();

type Props = {
  children: React.ReactNode;
};

function getSidebarModeSnapshot(): SidebarMode {
  if (typeof window === "undefined") return "HIDDEN";

  const storedSidebarMode = window.localStorage.getItem(
    SIDEBAR_MODE_STORAGE_KEY,
  );
  if (
    storedSidebarMode === "OPEN" ||
    storedSidebarMode === "COLLAPSED" ||
    storedSidebarMode === "HIDDEN"
  ) {
    return storedSidebarMode;
  }

  return "HIDDEN";
}

function subscribeToSidebarMode(subscriber: () => void) {
  sidebarModeSubscribers.add(subscriber);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_MODE_STORAGE_KEY) subscriber();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    sidebarModeSubscribers.delete(subscriber);
    window.removeEventListener("storage", handleStorage);
  };
}

function saveSidebarMode(mode: SidebarMode) {
  window.localStorage.setItem(SIDEBAR_MODE_STORAGE_KEY, mode);
  sidebarModeSubscribers.forEach((subscriber) => subscriber());
}

export default function ShopLayout({ children }: Props) {
  const params = useParams<{ id: string }>();
  const shopId = params?.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const sidebarMode = useSyncExternalStore(
    subscribeToSidebarMode,
    getSidebarModeSnapshot,
    (): SidebarMode => "HIDDEN",
  );

  function closeSidebar() {
    if (window.matchMedia("(min-width: 64rem)").matches) return;
    saveSidebarMode("HIDDEN");
  }

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
            sidebarMode={sidebarMode}
            onClose={closeSidebar}
            onToggleCollapse={() =>
              saveSidebarMode(
                sidebarMode === "COLLAPSED" ? "OPEN" : "COLLAPSED",
              )
            }
          />

          {sidebarMode !== "HIDDEN" ? (
            <button
              type="button"
              className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden"
              onClick={() => saveSidebarMode("HIDDEN")}
              aria-label="Close sidebar overlay"
            />
          ) : null}

          <div className="flex w-full flex-1 flex-col min-h-0">
            <Header
              shopName={shop.name}
              pageTitle={pageTitle}
              onOpenSidebar={() => saveSidebarMode("OPEN")}
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
