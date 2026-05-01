"use react";
import { useState } from "react";
import { LoyaltyStamp } from "./LoyaltyStamp";
import { CircleCheckBigIcon, CircleIcon } from "lucide-react";

export function RedeemRewardSection() {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Available Rewards
      </p>
      <RewardVoucher />
    </div>
  );
}

function RewardVoucher() {
  const rewardName = "Free Coffee";
  const rewardDescription = "Any size, any roast - hot or iced";
  const stampsRequired = 12;
  const claimableRewards = 1;

  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={[
        "w-full px-4 py-2 ",
        "text-md font-medium rounded-2xl transition-all bg-primary/10 text-white",
        isActive
          ? "border border-2 border-primary shadow"
          : "border border-2 border-primary/10",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary p-2">
          <LoyaltyStamp filled={true} size={24} icon="coffee" />
        </div>
        <div className="flex flex-col text-start gap-0s font-medium">
          <span className="text-md text-bold text-primary">{rewardName}</span>
          <span className="text-xs text-primary/80">{rewardDescription}</span>
          <span className="inline-flex gap-2 text-xs text-primary/80">
            <CircleCheckBigIcon size={16} /> {stampsRequired} stamps ·{" "}
            {claimableRewards} claimable
          </span>
        </div>
        {isActive ? (
          <CircleCheckBigIcon className="ml-auto text-primary" />
        ) : (
          <CircleIcon className="ml-auto text-white" />
        )}
      </div>
    </button>
  );
}
