"use client";

import "@/src/app/globals.css";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";
import { getShop } from "@/src/lib/api/shop";
import { ShopContextProvider } from "./ShopContext";
import { LoyaltyProgramContextProvider } from "./LoyaltyProgramContext";
import { themeCssVars } from "@/src/lib/theme";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/src/components/Layouts/Sidebar";
import { Header } from "@/src/components/Layouts/Header";
import type { LoyaltyProgram, Shop } from "@/src/lib/types";

type Props = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: Props) {
  const params = useParams<{ id: string }>();
  const shopId = params?.id;
  const [shop, setShop] = useState<Shop | null>(null);
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgram | null>(
    null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = window.localStorage.getItem("admin-theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("admin-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!shopId) return;

    async function loadShopAndLoyaltyProgram() {
      try {
        const shopData = await getShop(shopId);
        const { data: loyaltyPrograms } = await getLoyaltyPrograms(shopId);
        const [nextLoyaltyProgram] = loyaltyPrograms;

        setShop(shopData);
        setLoyaltyProgram(nextLoyaltyProgram ?? null);
      } catch (err) {
        console.error("Failed to load shop data:", err);
      }
    }

    void loadShopAndLoyaltyProgram();
  }, [shopId]);

  const pageTitle = useMemo(() => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname.endsWith("/scanner")) return "Merchant Scanner";
    if (pathname.startsWith("/charts")) return "Charts";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/pages")) return "Pages";
    return "Dashboard";
  }, []);

  const isDark = theme === "dark";
  const shellClasses = isDark
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-50 text-slate-900";
  const sidebarClasses = isDark
    ? "border-white/10 bg-slate-900/95 text-slate-100"
    : "border-slate-200 bg-white/95 text-slate-800";
  const headerClasses = isDark
    ? "border-white/10 bg-slate-900/70 text-slate-100"
    : "border-slate-200 bg-white/80 text-slate-900";
  const contentCardClasses = isDark
    ? "border-white/10 bg-slate-900/70 shadow-black/20"
    : "border-slate-200 bg-white shadow-slate-200/70";
  const navItemClasses = (isActive: boolean) =>
    isDark
      ? isActive
        ? "bg-cyan-500/15 text-cyan-300"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
      : isActive
        ? "bg-cyan-500/10 text-cyan-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  if (!shop || !loyaltyProgram) {
    return <div className={`min-h-screen w-full ${shellClasses}`} />;
  }

  const { theme: shopTheme } = shop.config;
  const themeVars = shopTheme ? themeCssVars(shopTheme) : undefined;

  return (
    <ShopContextProvider value={shop}>
      <LoyaltyProgramContextProvider value={loyaltyProgram}>
        <div className={`min-h-dvh w-full transition-colors ${shellClasses}`}>
          <div className="flex min-h-dvh flex-col lg:flex-row">
            <Sidebar
              pathname={
                typeof window !== "undefined" ? window.location.pathname : "/"
              }
              isSidebarOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isDark={isDark}
              sidebarClasses={sidebarClasses}
              navItemClasses={navItemClasses}
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
                isDark={isDark}
                headerClasses={headerClasses}
                onToggleTheme={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                onOpenSidebar={() => setIsSidebarOpen(true)}
              />

              <main className="flex-1 min-h-0 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <div
                  className={`mx-auto flex h-full w-full max-w-7xl flex-col rounded-3xl border p-4 shadow-2xl sm:p-6 lg:p-8 ${contentCardClasses}`}
                >
                  {/* <AppHeader style={themeVars} /> */}

                  <div
                    className="flex-1 flex flex-col relative overflow-hidden w-full"
                    style={themeVars}
                  >
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </LoyaltyProgramContextProvider>
    </ShopContextProvider>
  );
}
