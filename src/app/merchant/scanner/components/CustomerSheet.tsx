"use client";

import { useRef, useState } from "react";
import { CustomerSection } from "../CustomerSection";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { AddStampSection } from "./AddStampSection";
import { MemberLoyalty } from "@/src/lib/types";

interface CustomerSheetProps {
  customer?: MemberLoyalty;
  config: LoyaltyConfig;
  open: boolean;
  onClose: () => void;
}

interface LoyaltyConfig {
  stampsRequired: number;
  rewardLabel: string;
}

type SheetState = "idle" | "confirmed";

export function CustomerSheet({
  customer,
  config,
  open,
  onClose,
}: CustomerSheetProps) {
  const [stamps, setStamps] = useState(customer?.points ?? 0);
  const [newlyAdded, setNewlyAdded] = useState(0);
  const [stampsToReward, setStampsToReward] = useState(1);
  const [state, setState] = useState<SheetState>("idle");
  const sheetRef = useRef<HTMLDivElement>(null);

  function handleAddStamp(newStamps: number) {
    setStamps((s) => s + newStamps);
    setNewlyAdded(newStamps);
    setState("confirmed");
  }

  function handleReset() {
    setStampsToReward(1);
    setState("idle");
    onClose();
  }

  const successMessage = customer
    ? stamps >= config.stampsRequired
      ? `Card complete! ${customer.name} earned a ${config.rewardLabel}!`
      : `${newlyAdded} ${newlyAdded === 1 ? "stamp" : "stamps"} added to ${customer.name}!`
    : null;

  return (
    <div
      className={[
        "absolute inset-0 z-10 transition-colors duration-300",
        open
          ? "bg-black/55 pointer-events-auto"
          : "bg-transparent pointer-events-none",
      ].join(" ")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Sheet */}
      <div
        ref={sheetRef}
        className={[
          "absolute inset-0 bg-background z-11 overflow-y-auto",
          "flex flex-col",
          "transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-3.5">
          <div className="w-9 h-1 bg-primary rounded-full" />
        </div>

        <div className="px-4 pb-24 flex flex-col flex-grow gap-4">
          {/* Customer */}
          {customer && <CustomerSection customer={customer} />}

          {/* Loyalty card */}
          <LoyaltyCardSection
            current={stamps}
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
          {state === "confirmed" && (
            <div className="bg-green-800 text-white rounded-xl px-4 py-3 text-sm font-medium text-center mb-2">
              {successMessage}
            </div>
          )}
        </div>

        {/* Fixed footer */}
        <div className="min-h-24 max-h-24 sticky bottom-0 bg-background border-t rounded-sm border-primary/30 flex flex-col justify-center px-4 py-2">
          {state === "idle" && (
            <button
              className="w-full bg-secondary/80 text-foreground uppercase text-md font-medium py-4 rounded-xl tracking-wide transition-all hover:bg-secondary disabled:opacity-35 disabled:cursor-not-allowed"
              onClick={() => handleAddStamp(stampsToReward)}
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
    </div>
  );
}
