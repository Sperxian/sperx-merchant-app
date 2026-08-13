"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface HeaderProps {
  shopName: string;
  pageTitle: string;
  isDark: boolean;
  headerClasses: string;
  onToggleTheme: () => void;
  onOpenSidebar: () => void;
}

export function Header({
  shopName,
  pageTitle,
  isDark,
  headerClasses,
  onToggleTheme,
  onOpenSidebar,
}: HeaderProps) {
  return (
    <header className={`border-b backdrop-blur ${headerClasses}`}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`rounded-xl border p-2 lg:hidden ${isDark ? "border-white/10 bg-white/10 text-slate-200" : "border-slate-200 bg-slate-100 text-slate-700"}`}
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {shopName}
            </p>
            <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`rounded-full border p-2 transition ${isDark ? "border-white/10 bg-white/10 text-slate-200 hover:bg-white/20" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <UserButton afterSwitchSessionUrl="/sign-in" />
        </div>
      </div>
    </header>
  );
}
