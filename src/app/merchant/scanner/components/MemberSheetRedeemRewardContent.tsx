"use client";

import { useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { MemberLoyalty } from "@/src/lib/types";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

interface MemberSheetRedeemRewardContent {
  member?: MemberLoyalty;
  config: LoyaltyConfig;
  open: boolean;

  onClose: () => void;
}

interface LoyaltyConfig {
  stampsRequired: number;
  rewardLabel: string;
}
export function MemberSheetRedeemRewardContent({
  member,
  config,
  open,
  onClose,
}: MemberSheetRedeemRewardContent) {
  const [selectedReward, setSelectedReward] = useState<string>();
  const rewardOptions = [
    {
      code: "FREE_COFFEE",
      name: "Free Brewed Cofee",
      description: "Any size, any roast - hot or iced",
      goalPoints: 10,
    },
  ];

  const handleRedeemReward = async () => {
    if (!member || !selectedReward) {
      console.log(
        `Missing member (${member?.id}) or reward (${selectedReward})`,
      );
      return;
    }
    const redeemResponse = await redeemReward(member.id, selectedReward);
    console.log({ redeemResponse });
  };

  return (
    <div
      className={[
        "absolute inset-0 bg-background z-11 overflow-y-auto",
        "flex flex-col",
        "transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        open ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Drag handle */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Content */}
        <h2 className="text-lg font-semibold">Redeem Reward</h2>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="px-4 flex flex-col flex-grow gap-4">
        {member?.points}
        <RedeemRewardSection
          selected={selectedReward}
          onSelect={(value) => setSelectedReward(value)}
          options={rewardOptions}
          accumulatedPoints={member?.points ?? 0}
        />

        {member && <CustomerSection customer={member} />}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 flex flex-col justify-center px-4 py-2">
        <button
          className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
          onClick={handleRedeemReward}
          disabled={!selectedReward}
        >
          Redeem Reward
        </button>
      </div>
    </div>
  );
}
