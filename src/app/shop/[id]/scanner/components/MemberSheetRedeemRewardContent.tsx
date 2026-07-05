"use client";

import { useState } from "react";
import { MemberLoyalty } from "@/src/lib/types";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";
import { MemberStampsSection } from "./MemberPointsSection";
import { Alert } from "@/src/components/shared/Alert";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { useShop } from "../../ShopContext";
import { toastError } from "@/src/lib/toast";
import "@/src/app/globals.css";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

type MemberSheetRedeemRewardContent = {
  member?: MemberLoyalty;
  onClose: () => void;
  onRefresh: () => void;
};

type SheetState = "TO_REDEEM" | "REDEEMING" | "REDEEMED";

export function MemberSheetRedeemRewardContent({
  member,
  onClose,
  onRefresh,
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

      await onRefresh();
      setState("REDEEMED");
    } catch (error) {
      toastError(error);
      setState("TO_REDEEM");
    }
  };

  function handleReset() {
    setRewardCode(undefined);
    setState("TO_REDEEM");
    onClose();
  }

  return (
    <div className="h-full flex flex-col justify-between">
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
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center px-4 py-2">
        {state !== "REDEEMED" ? (
          <button
            className="w-full bg-primary dark:bg-primary-lighter text-primary-foreground
            uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all"
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
