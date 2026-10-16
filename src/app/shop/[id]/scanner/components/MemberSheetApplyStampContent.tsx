"use client";

import "@/src/app/globals.css";
import { useState } from "react";
import { AddStampSection } from "./AddStampSection";
import { addMemberLoyaltyPoints } from "@/src/lib/api/member";
import { useShop } from "../../ShopContext";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { ActionButton } from "@/src/components/shared/ActionButton";
import { MemberLoyaltyDto } from "@/src/types/member";

interface MemberSheetApplyStampContentProps {
  member?: MemberLoyaltyDto;
  onClose: () => void;
  onRefresh: () => void;
}

export function MemberSheetApplyStampContent({
  member,
  onClose,
  onRefresh,
}: MemberSheetApplyStampContentProps) {
  const shop = useShop();
  const loyaltyProgram = useLoyaltyProgram();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stampsToReward, setStampsToReward] = useState(1);

  const {
    config: {
      availableRewards: [{ name: rewardName, goalPoints }],
    },
  } = loyaltyProgram;

  const handleAddStamp = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await addMemberLoyaltyPoints(
        shop.id,
        member!.id,
        stampsToReward,
        "Scanned member QR code by admin",
      );
      const message =
        cardPoints + stampsToReward >= goalPoints
          ? `Card complete! Member earned a ${rewardName}!`
          : stampsToReward === 1
            ? "Stamp rewarded!"
            : `${stampsToReward} stamps rewarded!`;

      await onRefresh();
      toastSuccess(message);
      setStampsToReward(1);
      onClose();
    } catch (error) {
      toastError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPoints = member?.points ?? 0;
  const cardPoints = currentPoints % goalPoints;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-4">
        <AddStampSection
          stampsToReward={stampsToReward}
          setStampsToReward={setStampsToReward}
        />
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 sticky bottom-0 border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        <ActionButton
          className="w-full rounded-xl py-3 text-sm"
          disabled={isSubmitting}
          onClick={handleAddStamp}
        >
          {isSubmitting
            ? "Submitting..."
            : stampsToReward <= 1
              ? "Add 1 stamp"
              : `Add ${stampsToReward} stamps`}
        </ActionButton>
      </div>
    </div>
  );
}
