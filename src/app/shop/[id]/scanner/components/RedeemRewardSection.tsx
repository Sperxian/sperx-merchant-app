"use react";

import {
  CircleCheckBigIcon,
  CircleIcon,
  GiftIcon,
} from "lucide-react";
import type { RewardMetadata } from "@/src/types/loyalty";

type RedeemRewardSectionProps = {
  selected?: string;
  onSelect: (code: string) => void;
  options: RewardMetadata[];
  accumulatedPoints: number;
};

export function RedeemRewardSection(props: RedeemRewardSectionProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        Available Rewards
      </p>
      <RewardVoucher {...props} />
    </div>
  );
}

function RewardVoucher({
  selected,
  onSelect,
  options,
  accumulatedPoints,
}: RedeemRewardSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map(({ code, name, description, goalPoints }) => {
        const isActive = code === selected;
        const claimableRewards = Math.trunc(accumulatedPoints / goalPoints);
        const claimable = claimableRewards > 0;
        const progressPoints = claimable
          ? goalPoints
          : accumulatedPoints % goalPoints;
        const progressPercent = Math.min(
          (progressPoints / goalPoints) * 100,
          100,
        );

        return (
          <button
            key={code}
            type="button"
            onClick={() => onSelect(code)}
            disabled={!claimable}
            aria-pressed={isActive}
            className={[
              "w-full rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50",
              isActive
                ? "border-primary/50 bg-primary/5 shadow-sm dark:border-primary-lighter/50 dark:bg-primary-lighter/10"
                : "border-slate-200 bg-slate-50 hover:border-primary/30 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-lighter">
                  <GiftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Reward Progress
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {name}
                  </p>
                  {description && (
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {progressPoints} / {goalPoints}
                </span>
                {claimable &&
                  (isActive ? (
                    <CircleCheckBigIcon
                      className="text-primary dark:text-primary-lighter"
                      aria-hidden="true"
                    />
                  ) : (
                    <CircleIcon
                      className="text-slate-400 dark:text-slate-500"
                      aria-hidden="true"
                    />
                  ))}
              </div>
            </div>

            <div
              role="progressbar"
              aria-label={`Progress toward ${name}`}
              aria-valuemin={0}
              aria-valuemax={goalPoints}
              aria-valuenow={progressPoints}
              className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {claimable
                ? `${claimableRewards} claimable`
                : `${goalPoints - progressPoints} more stamps to earn this reward.`}
            </p>
          </button>
        );
      })}
    </div>
  );
}
