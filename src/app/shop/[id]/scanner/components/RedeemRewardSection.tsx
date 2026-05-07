"use react";

import { LoyaltyStamp } from "./LoyaltyStamp";
import { CircleCheckBigIcon, CircleIcon } from "lucide-react";
import { LoyaltyReward } from "@/src/lib/types";

type RedeemRewardSectionProps = {
  selected?: string;
  onSelect: (code: string) => void;
  options: LoyaltyReward[];
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
              "disabled:bg-gray-200 disabled:text-gray-400",
              isActive
                ? "border-2 border-primary shadow"
                : "border-2 border-primary/10",
            ].join(" ")}
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-primary group-disabled:bg-gray-400">
                <LoyaltyStamp filled={true} size={24} icon="coffee" />
              </div>

              <div className="flex flex-col text-start gap-0s font-medium">
                <span className="text-md text-bold text-primary">{name}</span>
                <span className="text-xs text-primary/80">
                  {description ?? " ."}
                </span>
                <span className="inline-flex gap-2 text-xs text-primary/80">
                  {claimable && <CircleCheckBigIcon size={16} />}
                  {`${goalPoints} stamps required`}

                  {claimable && `· ${claimableRewards} claimable`}
                </span>
              </div>
              {claimable ? (
                isActive ? (
                  <CircleCheckBigIcon className="ml-auto text-primary" />
                ) : (
                  <CircleIcon className="ml-auto text-white" />
                )
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
