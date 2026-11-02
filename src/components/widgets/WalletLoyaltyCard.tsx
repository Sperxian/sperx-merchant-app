import { ArrowRightIcon, SparklesIcon, WalletCardsIcon } from "lucide-react";
import type { LoyaltyProgram } from "@/src/types/loyalty";

type WalletLoyaltyCardProps = {
  loyaltyProgram: Omit<LoyaltyProgram, "id" | "shopId" | "dateCreated">;
  current: number;
};

export function WalletLoyaltyCard({
  current,
  loyaltyProgram,
}: WalletLoyaltyCardProps) {
  if (!("convertibleAmountCents" in loyaltyProgram.config)) {
    throw new Error("Wallet loyalty card requires wallet-based configuration.");
  }

  const rewardConfig = loyaltyProgram.config.availableRewards[0];
  const total = rewardConfig.goalPoints;
  const points = Number.isFinite(current) ? Math.max(current, 0) : 0;
  const progressPoints = Math.min(points, total);
  const remainingPoints = Math.max(total - points, 0);
  const progressPercent =
    total > 0 ? Math.min((progressPoints / total) * 100, 100) : 0;
  const spendAmount = (
    loyaltyProgram.config.convertibleAmountCents / 100
  ).toFixed(2);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-dark p-5 text-white shadow-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full border-[24px] border-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full border-[20px] border-white/5"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            {loyaltyProgram.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white/90">
            <WalletCardsIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            Wallet rewards
          </div>
        </div>
        <div className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90">
          Goal: {total} pts
        </div>
      </div>

      <div className="relative mt-5 flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-col w-full md:max-w-2/5">
          <p className="text-xs font-medium text-white/70">Points balance</p>
          <p className="mt-0.5 text-3xl font-bold leading-none tracking-tight">
            {Math.trunc(points)}
            <span className="ml-1.5 text-sm font-semibold text-white/70">
              pts
            </span>
          </p>
        </div>
        <div className="flex w-full md:max-w-3/5 items-center justify-center rounded-xl border border-white/10 bg-white/10 px-2.5 py-2 text-right text-xs font-medium leading-tight text-white/90">
          <span>
            Every ₱{spendAmount} spent
          </span>
          <ArrowRightIcon
            className="h-3.5 w-3.5 shrink-0 text-white/60"
            aria-hidden="true"
          />
          <span className="text-secondary">
            +{loyaltyProgram.config.pointsAwarded} pts
          </span>
        </div>
      </div>

      <div className="relative mt-auto pt-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-white/90">
            {remainingPoints > 0
              ? `${remainingPoints} pts to ${rewardConfig.name}`
              : `${rewardConfig.name} earned!`}
          </span>
          <span className="shrink-0 text-white/70">
            {Math.trunc(progressPoints)} / {total} points
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={`Progress toward ${rewardConfig.name}`}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={Math.trunc(progressPoints)}
          className="h-2 overflow-hidden rounded-full bg-black/20"
        >
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-white/65">
          <SparklesIcon className="h-3 w-3" aria-hidden="true" />
          <span>Reward at {total} points</span>
        </div>
      </div>
    </div>
  );
}
