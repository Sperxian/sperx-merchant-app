"use client";

import { useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { MemberLoyalty } from "@/src/lib/types";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

type MemberSheetRedeemRewardContent = {
  member?: MemberLoyalty;
  config: LoyaltyConfig;
  open: boolean;

  onClose: () => void;
};

type SheetState = "TO_REDEEM" | "REDEEMED";

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
  const [rewardCode, setRewardCode] = useState<string>();
  const [state, setState] = useState<SheetState>("TO_REDEEM");
  const rewardOptions = [
    {
      code: "FREE_COFFEE",
      name: "Free Brewed Cofee",
      description: "Any size, any roast - hot or iced",
      goalPoints: 10,
    },
  ];

  const selectedReward = rewardOptions.find(({ code }) => code === rewardCode);

  const handleRedeemReward = async () => {
    if (!member || !rewardCode) {
      console.log(`Missing member (${member?.id}) or reward (${rewardCode})`);
      return;
    }
    await redeemReward(member.id, rewardCode);

    setState("REDEEMED");
  };

  function handleReset() {
    onClose();
  }

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
        <h2 className="text-lg font-semibold">Redeem Reward</h2>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="px-4 flex flex-col flex-grow gap-4">
        {/* Redeem Rewards Section */}
        <RedeemRewardSection
          selected={rewardCode}
          onSelect={(value) => setRewardCode(value)}
          options={rewardOptions}
          accumulatedPoints={member?.points ?? 0}
        />

        {state === "REDEEMED" && (
          <div className="bg-green-800 text-white rounded-xl px-4 py-3 text-sm font-medium text-center mb-2">
            Member redeemed {selectedReward?.name}.
          </div>
        )}

        {/* Member Section */}
        {member && <CustomerSection customer={member} />}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 flex flex-col justify-center px-4 py-2">
        {state === "TO_REDEEM" && (
          <button
            className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
            onClick={handleRedeemReward}
            disabled={!rewardCode}
          >
            Redeem Reward
          </button>
        )}
        {state === "REDEEMED" && (
          <div className="text-center">
            <button
              onClick={handleReset}
              className="text-primary text-sm underline underline-offset-2 bg-transparent border-none cursor-pointer"
            >
              Scan another customer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
