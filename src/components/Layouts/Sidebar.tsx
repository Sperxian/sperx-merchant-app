"use client";

import Link from "next/link";
import {
  ChevronRight,
  CreditCardIcon,
  LayoutDashboardIcon,
  ScanIcon,
  XIcon,
  StampIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { useShop } from "@/src/app/shop/[id]/ShopContext";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/scanner", label: "Scanner", icon: ScanIcon },
  {
    href: "/loyalty-programs",
    label: "Loyalty Programs",
    icon: CreditCardIcon,
  },
  { href: "/transactions", label: "Transactions", icon: StampIcon },
  { href: "/members", label: "Members", icon: UsersIcon },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isSidebarOpen, onClose }: SidebarProps) {
  const shop = useShop();
  const pathName = usePathname();
  const iconLocation =
    (shop.config.iconLocation as string) ?? "/sperx-logo.png";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 px-5 py-6 text-slate-800 shadow-2xl backdrop-blur transition-transform duration-300 dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-100 lg:static lg:translate-x-0 ${
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
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              Merchant dashboard
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navigation.map(({ href, label, icon: Icon }) => {
          const isActive = href !== "/" && pathName.endsWith(href);

          return (
            <Link
              key={href}
              href={`/shop/${shop.id}/${href}`}
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
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
        className="mt-8 rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
      >
        <p
          className="font-medium text-slate-900 dark:text-white"
        >
          Need a quick boost?
        </p>
        <p
          className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400"
        >
          Keep your merchant operations moving with a single-view dashboard.
        </p>
      </div>
    </aside>
  );
}
