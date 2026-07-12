"use client";

import "@/src/app/globals.css";
import { useState } from "react";
import { AddStampSection } from "./AddStampSection";
import { MemberLoyalty } from "@/src/lib/types";
import { addMemberLoyaltyPoints } from "@/src/lib/api/member";
import { Alert } from "@/src/components/shared/Alert";
import { useShop } from "../../ShopContext";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { toastError } from "@/src/lib/toast";

interface MemberSheetApplyStampContentProps {
  member?: MemberLoyalty;
  onClose: () => void;
  onRefresh: () => void;
}

type SheetState = "IDLE" | "SUBMITTING" | "CONFIRMED";

export function MemberSheetApplyStampContent({
  member,
  onClose,
  onRefresh,
}: MemberSheetApplyStampContentProps) {
  const shop = useShop();
  const loyaltyProgram = useLoyaltyProgram();

  const [state, setState] = useState<SheetState>("IDLE");
  const [stampsToReward, setStampsToReward] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string>();

  const {
    config: {
      availableRewards: [{ name: rewardName, goalPoints }],
    },
  } = loyaltyProgram;

  const handleAddStamp = async () => {
    if (state !== "IDLE") return;

    try {
      setState("SUBMITTING");
      await addMemberLoyaltyPoints(shop.id, member!.id, stampsToReward);
      setSuccessMessage(
        cardPoints + stampsToReward >= goalPoints
          ? `Card complete! Member earned a ${rewardName}!`
          : stampsToReward === 1
            ? "Stamp rewarded!"
            : `${stampsToReward} stamps rewarded!`,
      );

      await onRefresh();
      setState("CONFIRMED");
    } catch (error) {
      toastError(error);
      setState("IDLE");
    }
  };

  function handleReset() {
    onClose();
    setStampsToReward(1);
    setState("IDLE");
  }

  const currentPoints = member?.points ?? 0;
  const cardPoints = currentPoints % goalPoints;

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="px-4 flex flex-col flex-grow gap-4">
        {/* Add stamps — hidden after confirm */}
        {state === "IDLE" && (
          <AddStampSection
            stampsToReward={stampsToReward}
            setStampsToReward={setStampsToReward}
          />
        )}

        {/* Success */}
        {state === "CONFIRMED" && member && (
          <Alert variant="success" message={successMessage ?? ""} />
        )}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center py-2">
        {state !== "CONFIRMED" ? (
          <button
            className="w-full bg-primary dark:bg-primary-lighter text-primary-foreground
            uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all"
            disabled={state === ("SUBMITTING" as SheetState)}
            onClick={handleAddStamp}
          >
            {stampsToReward <= 1
              ? "Add 1 stamp"
              : `Add ${stampsToReward} stamps`}
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
