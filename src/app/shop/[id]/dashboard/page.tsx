"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Gift,
  ScanLine,
  Sparkles,
  TicketCheck,
  UsersRound,
} from "lucide-react";
import { useShop } from "../ShopContext";

const metrics = [
  {
    label: "Active members",
    value: "1,284",
    change: "+12.8%",
    trend: "up",
    note: "vs. previous 30 days",
    icon: UsersRound,
    iconStyle: "bg-primary/10 text-primary dark:text-primary-lighter",
  },
  {
    label: "Points issued",
    value: "24,680",
    change: "+8.4%",
    trend: "up",
    note: "vs. previous 30 days",
    icon: Sparkles,
    iconStyle: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    label: "Rewards redeemed",
    value: "186",
    change: "+4.3%",
    trend: "up",
    note: "vs. previous 30 days",
    icon: Gift,
    iconStyle: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  {
    label: "Redemption rate",
    value: "14.5%",
    change: "−1.2%",
    trend: "down",
    note: "of points issued",
    icon: TicketCheck,
    iconStyle: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
] as const;

const weeklyActivity = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 83 },
  { day: "Fri", value: 72 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 58 },
];

const recentActivity = [
  {
    initials: "JM",
    name: "Jamie M.",
    action: "Earned 2 stamps",
    time: "8 min ago",
    tone: "bg-cyan-100 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-200",
  },
  {
    initials: "AL",
    name: "Alex L.",
    action: "Redeemed a free drink",
    time: "24 min ago",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
  },
  {
    initials: "SK",
    name: "Sam K.",
    action: "Joined the loyalty program",
    time: "51 min ago",
    tone: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-200",
  },
  {
    initials: "TR",
    name: "Taylor R.",
    action: "Earned 1 stamp",
    time: "1 hr ago",
    tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  },
];

export default function DashboardPage() {
  const shop = useShop();
  const shopPath = `/shop/${shop.id}`;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary dark:text-primary-lighter">
            Overview
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Good morning, {shop.name}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Here’s how your loyalty program is doing.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Sample dashboard data · Last 30 days
        </div>
      </section>

      <section
        aria-label="Loyalty program metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map(
          ({ label, value, change, trend, note, icon: Icon, iconStyle }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {value}
                  </p>
                </div>
                <span className={`rounded-xl p-2.5 ${iconStyle}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs">
                {trend === "up" ? (
                  <ArrowUpRight
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownRight
                    className="h-4 w-4 text-rose-600 dark:text-rose-400"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={
                    trend === "up"
                      ? "font-semibold text-emerald-700 dark:text-emerald-400"
                      : "font-semibold text-rose-700 dark:text-rose-400"
                  }
                >
                  {change}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {note}
                </span>
              </div>
            </article>
          ),
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Loyalty activity
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Points earned over the last 7 days
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
              This week
            </span>
          </div>
          <div
            className="mt-7 flex h-48 items-end gap-2 sm:gap-4"
            role="img"
            aria-label="Sample weekly activity: Monday 42, Tuesday 65, Wednesday 51, Thursday 83, Friday 72, Saturday 100, Sunday 58"
          >
            {weeklyActivity.map(({ day, value }) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-lg transition-colors ${day === "Sat" ? "bg-primary dark:bg-primary-lighter" : "bg-primary/10 dark:bg-primary-dark/50"}`}
                    style={{ height: `${value}%` }}
                    title={`${day}: ${value} points`}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {day}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total points earned
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              6,420{" "}
              <span className="font-normal text-slate-500 dark:text-slate-400">
                pts
              </span>
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900/70">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Quick actions
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Jump into a common task
          </p>
          <div className="mt-5 grid gap-3">
            <Link
              href={`${shopPath}/scanner`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-primary/10 p-2 text-primary dark:text-primary-lighter">
                <ScanLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Open member scanner
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`${shopPath}/members`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-violet-500/10 p-2 text-violet-700 dark:text-violet-300">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Browse members
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`${shopPath}/loyalty-programs/new`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-amber-500/10 p-2 text-amber-700 dark:text-amber-300">
                <Gift className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Create a loyalty program
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900/70">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Recent activity
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                A quick look at member activity
              </p>
            </div>
            <Link
              href={`${shopPath}/transactions`}
              className="shrink-0 text-sm font-semibold text-primary hover:text-primary-dark dark:text-primary-lighter dark:hover:text-primary-lightest"
            >
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-white/10">
            {recentActivity.map((activity) => (
              <li
                key={`${activity.initials}-${activity.time}`}
                className="flex items-center gap-3 py-3.5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${activity.tone}`}
                >
                  {activity.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    {activity.name}
                  </p>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {activity.action}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900/70">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Quick actions
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Jump into a common task
          </p>
          <div className="mt-5 grid gap-3">
            <Link
              href={`${shopPath}/scanner`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-primary/10 p-2 text-primary dark:text-primary-lighter">
                <ScanLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Open member scanner
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`${shopPath}/members`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-violet-500/10 p-2 text-violet-700 dark:text-violet-300">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Browse members
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
            <Link
              href={`${shopPath}/loyalty-programs/new`}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5"
            >
              <span className="rounded-lg bg-amber-500/10 p-2 text-amber-700 dark:text-amber-300">
                <Gift className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                Create a loyalty program
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-primary-lighter"
                aria-hidden="true"
              />
            </Link>
          </div>
        </article>
      </section>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Metrics and activity shown are sample data for this dashboard preview.
      </p>
    </div>
  );
}
