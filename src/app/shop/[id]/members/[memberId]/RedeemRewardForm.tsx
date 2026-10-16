"use client";

import { Alert } from "@/src/components/shared/Alert";
import { RedeemRewardSection } from "@/src/app/shop/[id]/scanner/components/RedeemRewardSection";
import { MemberStampsSection } from "@/src/app/shop/[id]/scanner/components/MemberPointsSection";
import { redeemReward } from "@/src/lib/api/member";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { MemberSummary } from "@/src/types/member";
import { useState } from "react";

type Props = {
  shopId: string;
  memberId: string;
  memberSummary: MemberSummary;
  onRefresh: () => void;
  onClose: () => void;
};

export default function RedeemRewardForm({
  shopId,
  memberId,
  memberSummary,
  onRefresh,
  onClose,
}: Props) {
  const [selectedCode, setSelectedCode] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rewardOptions = memberSummary.loyaltyProgram.config.availableRewards;
  const hasRewardToRedeem =
    memberSummary.netPoints >=
    Math.min(...rewardOptions.map((reward) => reward.goalPoints));

  const handleRedeem = async () => {
    if (!selectedCode || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await redeemReward(shopId, memberId, selectedCode, "Manually redeemed by admin.");
      onRefresh();
      toastSuccess("Reward redeemed successfully.");
      onClose();
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[260px] h-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        {!hasRewardToRedeem && (
          <Alert
            variant="warning"
            message="Insufficient points to redeem any reward."
          />
        )}

        <MemberStampsSection points={memberSummary.netPoints} />

        <RedeemRewardSection
          selected={selectedCode}
          onSelect={setSelectedCode}
          options={rewardOptions}
          accumulatedPoints={memberSummary.netPoints}
        />
      </div>

      <button
        type="button"
        onClick={handleRedeem}
        disabled={!selectedCode || isSubmitting}
        className="w-full rounded-xl bg-primary text-white py-3 text-md font-medium uppercase tracking-wide text-primary-foreground transition-all disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Redeeming..." : "Redeem Reward"}
      </button>
    </div>
  );
}
