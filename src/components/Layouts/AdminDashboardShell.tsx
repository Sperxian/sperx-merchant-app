"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useShop } from "@/src/app/shop/[id]/ShopContext";
import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "@/src/components/Layouts/Sidebar";

function getPageTitle(pathname: string) {
  if (pathname.endsWith("/scanner")) return "Merchant Scanner";
  if (pathname.startsWith("/charts")) return "Charts";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/pages")) return "Pages";
  return "Dashboard";
}

export function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shop = useShop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("admin-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";

    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const pageTitle = useMemo(() => getPageTitle(pathname ?? "/"), [pathname]);
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

  return (
    <div className={`min-h-screen w-full transition-colors ${shellClasses}`}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          pathname={pathname ?? "/"}
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

        <div className="flex-1">
          <header className={`border-b backdrop-blur ${headerClasses}`}>
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`rounded-xl border p-2 lg:hidden ${isDark ? "border-white/10 bg-white/10 text-slate-200" : "border-slate-200 bg-slate-100 text-slate-700"}`}
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {shop.name}
                  </p>
                  <h1
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    {pageTitle}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`rounded-full border p-2 transition ${isDark ? "border-white/10 bg-white/10 text-slate-200 hover:bg-white/20" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
                <UserButton afterSwitchSessionUrl="/sign-in" />
              </div>
            </div>
          </header>

          <main className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div
              className={`mx-auto w-full rounded-3xl border p-4 shadow-2xl sm:p-6 lg:p-8 ${contentCardClasses}`}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
