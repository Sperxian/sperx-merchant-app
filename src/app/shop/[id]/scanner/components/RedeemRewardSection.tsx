"use react";

import { LoyaltyStamp } from "./LoyaltyStamp";
import { CircleCheckBigIcon, CircleIcon, GiftIcon } from "lucide-react";
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
    <div className="flex flex-col gap-2">
      {options.map(({ code, name, description, goalPoints }) => {
        const isActive = code === selected;
        const claimableRewards = Math.trunc(accumulatedPoints / goalPoints);
        const claimable = claimableRewards > 0;

        return (
          <button
            key={code}
            onClick={() => onSelect(code)}
            disabled={!claimable}
            className={[
              "group w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
              "disabled:bg-slate-100 dark:disabled:bg-white/5",
              isActive
                ? "border border-primary/50 bg-primary/5 shadow-sm dark:border-primary-lighter/50 dark:bg-primary-lighter/10"
                : "border border-slate-200 hover:border-primary/30 hover:bg-primary/5 dark:border-white/10 dark:hover:border-primary-lighter/30 dark:hover:bg-primary-lighter/5",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary dark:bg-primary-lighter p-2 text-primary group-disabled:bg-slate-200 dark:text-primary-lighter dark:group-disabled:bg-slate-700">
                <LoyaltyStamp filled size={24} />
              </div>

              <div className="flex flex-col gap-2 text-start text-sm ">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {name}
                  </span>
                  {description && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {description}
                    </span>
                  )}
                </div>
                {claimable ? (
                  <span className="inline-flex items-center gap-2 font-semibold text-primary dark:text-primary-lighter">
                    <GiftIcon size={20} />

                    {`${claimableRewards} claimable`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-primary dark:text-primary-lighter">
                    {`${goalPoints} stamps required`}
                  </span>
                )}
              </div>

              {claimable ? (
                isActive ? (
                  <CircleCheckBigIcon className="ml-auto text-primary dark:text-primary-lighter" />
                ) : (
                  <CircleIcon className="ml-auto text-slate-400 dark:text-slate-500" />
                )
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
