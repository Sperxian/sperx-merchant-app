"use react";

import { LoyaltyStamp } from "./LoyaltyStamp";
import { CircleCheckBigIcon, CircleIcon } from "lucide-react";
import { RewardMetadata } from "@/src/lib/types";

type RedeemRewardSectionProps = {
  selected?: string;
  onSelect: (code: string) => void;
  options: RewardMetadata[];
  accumulatedPoints: number;
};

export function RedeemRewardSection(props: RedeemRewardSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
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
              "group w-full px-4 py-2",
              "text-md font-medium rounded-2xl transition-all",
              "disabled:bg-primary/20 dark:disabled:bg-primary-lighter/20 disabled:text-gray-400",
              isActive
                ? "border-2 border-primary dark:border-primary-lighter shadow"
                : "border-2 border-primary/10 dark:border-primary-lighter/10",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-primary group-disabled:bg-gray-400">
                <LoyaltyStamp filled={true} size={24} />
              </div>

              <div className="flex flex-col text-start font-medium">
                <span className="text-md text-bold text-primary dark:text-primary-lighter">{name}</span>
                <span className="text-xs text-foreground/50 dark:text-foreground/30">
                  {description ?? " ."}
                </span>
                <span className="inline-flex gap-2 text-xs text-primary/80 dark:text-primary-lighter">
                  {claimable && <CircleCheckBigIcon size={16} />}
                  {`${goalPoints} stamps required`}

                  {claimable && `· ${claimableRewards} claimable`}
                </span>
              </div>
              {claimable ? (
                isActive ? (
                  <CircleCheckBigIcon className="ml-auto text-primary dark:text-primary-lighter" />
                ) : (
                  <CircleIcon className="ml-auto text-primary dark:text-primary-lighter xtext-gray-300 xdark:text-gray-700" />
                )
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
