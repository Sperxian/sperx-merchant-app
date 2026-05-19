"use client";

import { useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { MemberLoyalty } from "@/src/lib/types";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";
import { MemberStampsSection } from "./MemberPointsSection";
import { Alert } from "@/src/components/shared/Alert";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { useShop } from "../../ShopContext";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

type MemberSheetRedeemRewardContent = {
  member?: MemberLoyalty;
  open: boolean;

  onClose: () => void;
};

type SheetState = "TO_REDEEM" | "REDEEMING" | "REDEEMED";

export function MemberSheetRedeemRewardContent({
  member,
  open,
  onClose,
}: MemberSheetRedeemRewardContent) {
  const shop = useShop();
  const loyaltyProgram = useLoyaltyProgram();

  const [rewardCode, setRewardCode] = useState<string>();
  const [state, setState] = useState<SheetState>("TO_REDEEM");

  const rewardOptions = loyaltyProgram.config.availableRewards;
  const selectedReward = rewardOptions.find(({ code }) => code === rewardCode);

  const minPoints = Math.min(
    ...rewardOptions.map((reward) => reward.goalPoints),
  );
  const canRedeem = member?.points && member.points >= minPoints;

  const handleRedeemReward = async () => {
    if (state !== "TO_REDEEM") return;

    try {
      if (!member || !rewardCode) {
        console.log(`Missing member (${member?.id}) or reward (${rewardCode})`);
        return;
      }
      setState("REDEEMING");
      await redeemReward(shop.id, member.id, rewardCode);

      setState("REDEEMED");
    } catch {
      setState("TO_REDEEM");
    }
  };

  function handleReset() {
    setRewardCode(undefined);
    setState("TO_REDEEM");
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
        {!canRedeem && (
          <Alert
            variant="warning"
            message="Insufficient stamps to redeem rewards."
          />
        )}
        {state === "REDEEMED" && (
          <Alert
            variant="success"
            message={`Member redeemed ${selectedReward?.name}.`}
          />
        )}

        {/* Member Points Section */}
        <MemberStampsSection points={member?.points ?? 0} />

        {/* Redeem Rewards Section */}
        <RedeemRewardSection
          selected={rewardCode}
          onSelect={(value) => setRewardCode(value)}
          options={rewardOptions}
          accumulatedPoints={member?.points ?? 0}
        />

        {/* Member Section */}
        {member && <CustomerSection customer={member} />}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center px-4 py-2">
        {state !== "REDEEMED" ? (
          <button
            className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
            onClick={handleRedeemReward}
            disabled={!rewardCode && state !== "REDEEMING"}
          >
            Redeem Reward
          </button>
        ) : (
          <div className="text-center">
            <button
              onClick={handleReset}
              className="text-primary dark:text-primary-lighter text-sm underline underline-offset-2 bg-transparent border-none cursor-pointer"
            >
              Scan another customer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
