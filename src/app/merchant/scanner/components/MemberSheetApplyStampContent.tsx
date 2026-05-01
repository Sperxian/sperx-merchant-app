"use client";

import { useRef, useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { AddStampSection } from "./AddStampSection";
import { MemberLoyalty } from "@/src/lib/types";
import { addMemberLoyaltyPoints } from "@/src/lib/api/member";

interface MemberSheetApplyStampContentProps {
  member?: MemberLoyalty;
  config: LoyaltyConfig;

  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface LoyaltyConfig {
  stampsRequired: number;
  rewardLabel: string;
}
type SheetState = "idle" | "confirmed";

export function MemberSheetApplyStampContent({
  member,
  config,
  open,
  onClose,
  onRefresh,
}: MemberSheetApplyStampContentProps) {
  const [state, setState] = useState<SheetState>("idle");
  const [stampsToReward, setStampsToReward] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleAddStamp = async () => {
    await addMemberLoyaltyPoints(member!.id, stampsToReward);
    setSuccessMessage(
      cardPoints + stampsToReward >= config.stampsRequired
        ? `Card complete! Member earned a ${config.rewardLabel}!`
        : stampsToReward === 1
          ? "Stamp rewarded!"
          : `${stampsToReward} stamps rewarded!`,
    );

    await onRefresh();
    setState("confirmed");
  };

  function handleReset() {
    setStampsToReward(1);
    setState("idle");
    onClose();
  }

  const currentPoints = member?.points ?? 0;
  const cardPoints = currentPoints % config.stampsRequired;

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
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="px-4 flex flex-col flex-grow gap-4">
        {/* Loyalty card */}
        <LoyaltyCardSection
          current={currentPoints}
          total={config.stampsRequired}
          rewardLabel={config.rewardLabel}
        />

        {/* Add stamps — hidden after confirm */}
        {state === "idle" && (
          <AddStampSection
            stampsToReward={stampsToReward}
            setStampsToReward={setStampsToReward}
          />
        )}

        {/* Success */}
        {state === "confirmed" && member && (
          <div className="bg-green-800 text-white rounded-xl px-4 py-3 text-sm font-medium text-center mb-2">
            {successMessage}
          </div>
        )}

        {/* Customer */}
        {member && <CustomerSection customer={member} />}
      </div>

      {/* Fixed footer */}
      <div className="min-h-20 max-h-20 sticky bottom-0 bg-background border-t rounded-sm border-gray-300 flex flex-col justify-center px-4 py-2">
        {state === "idle" && (
          <button
            className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-3 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
            onClick={handleAddStamp}
          >
            {stampsToReward <= 1
              ? "Add 1 stamp"
              : `Add ${stampsToReward} stamps`}
          </button>
        )}
        {state === "confirmed" && (
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
