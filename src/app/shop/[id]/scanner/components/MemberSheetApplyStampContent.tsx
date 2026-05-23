"use client";

import { useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { AddStampSection } from "./AddStampSection";
import { MemberLoyalty } from "@/src/lib/types";
import { addMemberLoyaltyPoints } from "@/src/lib/api/member";
import { Alert } from "@/src/components/shared/Alert";
import { useShop } from "../../ShopContext";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { toastError } from "@/src/lib/toast";

interface MemberSheetApplyStampContentProps {
  member?: MemberLoyalty;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

type SheetState = "IDLE" | "SUBMITTING" | "CONFIRMED";

export function MemberSheetApplyStampContent({
  member,
  open,
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
    } catch(error) {
      toastError(error);
      setState("IDLE");
    }
  };

  function handleReset() {
    setStampsToReward(1);
    setState("IDLE");
    onClose();
  }

  const currentPoints = member?.points ?? 0;
  const cardPoints = currentPoints % goalPoints;
  const hasRedeemableReward = currentPoints >= goalPoints;

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
        <h2 className="text-lg font-semibold">Apply Stamp</h2>

        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="px-4 flex flex-col flex-grow gap-4">
        {hasRedeemableReward && (
          <Alert
            variant="info"
            message="Customer is eligible to redeem rewards."
          />
        )}

        {/* Loyalty card */}
        <LoyaltyCardSection
          current={currentPoints}
          total={goalPoints}
          rewardLabel={rewardName}
        />

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

        {/* Customer */}
        {member && <CustomerSection customer={member} />}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 dark:border-gray-800 flex flex-col justify-center px-4 py-2">
        {state !== "CONFIRMED" ? (
          <button
            className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
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
