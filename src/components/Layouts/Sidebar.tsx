"use client";

import Link from "next/link";
import {
  ChevronRight,
  ScanIcon,
  XIcon,
  // LayoutGridIcon,
  // ReceiptTextIcon,
  // BarChart3Icon,
  // SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import { useShop } from "@/src/app/shop/[id]/ShopContext";

const navigation = [
  // { href: "/", label: "Overview", icon: LayoutGridIcon },
  { href: "/scanner", label: "Scanner", icon: ScanIcon },
  // { href: "/pages", label: "Pages", icon: ReceiptTextIcon },
  // { href: "/charts", label: "Charts", icon: BarChart3Icon },
  // { href: "/settings", label: "Settings", icon: SettingsIcon },
];

interface SidebarProps {
  pathname: string;
  isSidebarOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  sidebarClasses: string;
  navItemClasses: (isActive: boolean) => string;
}

export function Sidebar({
  pathname,
  isSidebarOpen,
  onClose,
  isDark,
  sidebarClasses,
  navItemClasses,
}: SidebarProps) {
  const shop = useShop();
  const iconLocation = shop.config.iconLocation as string;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r px-5 py-6 shadow-2xl backdrop-blur transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarClasses} ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500">
            <Image
              className="aspect-square h-8 w-8 object-scale-down"
              src={iconLocation}
              alt={shop.name}
              width={36}
              height={36}
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Sperx Admin</p>
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Merchant dashboard
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`rounded-lg p-2 transition hover:bg-white/10 lg:hidden ${isDark ? "text-slate-300" : "text-slate-600"}`}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navigation.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.endsWith(href));

          return (
            <Link
              key={href}
              href={`/shop/${shop.id}/${href}`}
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${navItemClasses(isActive)}`}
            >
              <span className="flex items-center gap-3">
                {Icon ? <Icon className="h-4 w-4" /> : null}
                {label}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          );
        })}
      </nav>

      <div
        className={`mt-8 rounded-2xl border p-4 text-sm ${isDark ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-600"}`}
      >
        <p
          className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Need a quick boost?
        </p>
        <p
          className={`mt-2 text-xs leading-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          Keep your merchant operations moving with a single-view dashboard.
        </p>
      </div>
    </aside>
  );
}
