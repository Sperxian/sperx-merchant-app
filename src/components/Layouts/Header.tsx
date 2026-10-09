"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "@/src/app/ThemeContext";

interface HeaderProps {
  shopName: string;
  pageTitle: string;
  onOpenSidebar: () => void;
}

export function Header({
  shopName,
  pageTitle,
  onOpenSidebar,
}: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 bg-white/80 text-slate-900 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 lg:hidden"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              {shopName}
            </p>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
            onClick={toggleTheme}
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
