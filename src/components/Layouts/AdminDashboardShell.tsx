"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronRight,
  LayoutGrid,
  Menu,
  Moon,
  ReceiptText,
  Settings,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/pages", label: "Pages", icon: ReceiptText },
  { href: "/profile", label: "Profile", icon: Users },
  { href: "/charts", label: "Charts", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/charts")) return "Charts";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/pages")) return "Pages";
  return "Dashboard";
}

export function AdminDashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("admin-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : prefersDark ? "dark" : "light";

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
  const badgeClasses = isDark
    ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-300"
    : "border-cyan-500/20 bg-cyan-500/10 text-cyan-700";

  return (
    <div className={`min-h-screen w-full transition-colors ${shellClasses}`}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r px-5 py-6 shadow-2xl backdrop-blur transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarClasses} ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sperx Admin</p>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>Merchant dashboard</p>
              </div>
            </div>
            <button
              type="button"
              className={`rounded-lg p-2 transition hover:bg-white/10 lg:hidden ${isDark ? "text-slate-300" : "text-slate-600"}`}
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            {navigation.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${navItemClasses(isActive)}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>

          <div className={`mt-8 rounded-2xl border p-4 text-sm ${isDark ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-600"}`}>
            <p className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>Need a quick boost?</p>
            <p className={`mt-2 text-xs leading-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Keep your merchant operations moving with a single-view dashboard.
            </p>
          </div>
        </aside>

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
                  <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>Operations</p>
                  <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{pageTitle}</h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`rounded-full border p-2 transition ${isDark ? "border-white/10 bg-white/10 text-slate-200 hover:bg-white/20" : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <div className={`rounded-full border px-3 py-2 text-sm ${badgeClasses}`}>
                  Live overview
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className={`mx-auto w-full max-w-7xl rounded-3xl border p-4 shadow-2xl sm:p-6 lg:p-8 ${contentCardClasses}`}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
