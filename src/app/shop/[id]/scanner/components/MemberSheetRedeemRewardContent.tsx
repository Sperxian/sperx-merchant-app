"use client";

import { useState } from "react";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";
import { MemberStampsSection } from "./MemberPointsSection";
import { Alert } from "@/src/components/shared/Alert";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { useShop } from "../../ShopContext";
import { toastError, toastSuccess } from "@/src/lib/toast";
import "@/src/app/globals.css";
import { MemberLoyaltyDto } from "@/src/types/member";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

type MemberSheetRedeemRewardContent = {
  member?: MemberLoyaltyDto;
  onClose: () => void;
  onRefresh: () => void;
};

export function MemberSheetRedeemRewardContent({
  member,
  onClose,
  onRefresh,
}: MemberSheetRedeemRewardContent) {
  const shop = useShop();
  const loyaltyProgram = useLoyaltyProgram();

  const [rewardCode, setRewardCode] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rewardOptions = loyaltyProgram.config.availableRewards;
  const selectedReward = rewardOptions.find(({ code }) => code === rewardCode);

  const minPoints = Math.min(
    ...rewardOptions.map((reward) => reward.goalPoints),
  );
  const canRedeem = member?.points && member.points >= minPoints;

  const handleRedeemReward = async () => {
    if (isSubmitting || !member || !rewardCode) return;

    try {
      setIsSubmitting(true);
      await redeemReward(
        shop.id,
        member.id,
        rewardCode,
        "Scanned member QR code to redeem reward",
      );

      await onRefresh();
      toastSuccess(`Member redeemed ${selectedReward?.name}.`);
      onClose();
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-4 pb-4 md:pb-0">
        {!canRedeem && (
          <Alert
            variant="warning"
            message="Insufficient stamps to redeem rewards."
          />
        )}
        {/* Member Points Section */}
        <MemberStampsSection points={member?.points ?? 0} />

        {/* Redeem Rewards Section */}
        <div className="pb-4">
          <RedeemRewardSection
            selected={rewardCode}
            onSelect={(value) => setRewardCode(value)}
            options={rewardOptions}
            accumulatedPoints={member?.points ?? 0}
          />
        </div>
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <button
          className="w-full bg-primary dark:bg-primary-lighter text-primary-foreground
          uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all"
          onClick={handleRedeemReward}
          disabled={!rewardCode || isSubmitting}
        >
          {isSubmitting ? "Redeeming..." : "Redeem Reward"}
        </button>
      </div>
    </div>
  );
}
