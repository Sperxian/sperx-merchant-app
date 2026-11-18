"use client";

import { useState } from "react";
import { GiftIcon } from "lucide-react";
import { RedeemRewardSection } from "./RedeemRewardSection";
import { redeemReward } from "@/src/lib/api/member";
import { MemberPointsSection } from "./MemberPointsSection";
import { Alert } from "@/src/components/shared/Alert";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { useShop } from "../../ShopContext";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { ActionButton } from "@/src/components/shared/ActionButton";
import "@/src/app/globals.css";
import { MemberLoyaltyDto } from "@/src/types/member";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

type MemberSheetRedeemRewardContentProps = {
  member?: MemberLoyaltyDto;
  note: string;
  onClose: () => void;
  onRefresh: () => void;
};

export function MemberSheetRedeemRewardContent({
  member,
  note,
  onClose,
  onRefresh,
}: MemberSheetRedeemRewardContentProps) {
  const shop = useShop();
  const loyaltyProgram = useLoyaltyProgram();

  const [rewardCode, setRewardCode] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rewardOptions = loyaltyProgram.config.availableRewards;
  const selectedReward = rewardOptions.find(({ code }) => code === rewardCode);
  const remainingPoints = Math.max(
    (member?.points ?? 0) - (selectedReward?.goalPoints ?? 0),
    0,
  );

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
        note,
      );

      await onRefresh();
      toastSuccess(`Member redeemed ${selectedReward?.name}.`);
      setRewardCode(undefined);
      onClose();
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-5 pb-4 md:pb-0">
        {!canRedeem && (
          <Alert
            variant="warning"
            message="Insufficient stamps to redeem rewards."
          />
        )}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <MemberPointsSection points={member?.points ?? 0} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <RedeemRewardSection
            selected={rewardCode}
            onSelect={(value) => setRewardCode(value)}
            options={rewardOptions}
            accumulatedPoints={member?.points ?? 0}
          />
        </div>
        {selectedReward && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:border-primary-lighter/20 dark:bg-primary-lighter/5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="flex min-w-0 items-center gap-2 text-slate-600 dark:text-slate-300">
                <GiftIcon
                  className="h-4 w-4 shrink-0 text-primary dark:text-primary-lighter"
                  aria-hidden="true"
                />
                <span className="truncate">
                  Points after redeeming {selectedReward.name}
                </span>
              </span>
              <span className="shrink-0 font-semibold text-slate-900 dark:text-slate-100">
                {remainingPoints}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Fixed footer */}
      <div className="min-h-16 sticky bottom-0 border-t bg-slate-50 dark:bg-slate-900 rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <ActionButton
          className="w-full rounded-xl py-3 text-sm uppercase"
          onClick={handleRedeemReward}
          disabled={!rewardCode || isSubmitting}
        >
          {isSubmitting ? "Redeeming..." : "Redeem Reward"}
        </ActionButton>
      </div>
    </div>
  );
}
