"use client";

import { useState } from "react";
import { MemberLoyalty } from "@/src/lib/types";
import { MemberSheetApplyStampContent } from "./MemberSheetApplyStampContent";
import { MemberSheetRedeemRewardContent } from "./MemberSheetRedeemRewardContent";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { CustomerSection } from "../CustomerSection";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { Alert } from "@/src/components/shared/Alert";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

const tabs: Array<{ key: MODE_OPTION; label: string }> = [
  { key: "APPLY_STAMP", label: "Apply Stamp" },
  { key: "REDEEM_REWARD", label: "Redeem Reward" },
];

interface MemberSheetProps {
  member?: MemberLoyalty;
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function MemberSheet({
  member,
  open,
  onClose,
  onRefresh,
}: MemberSheetProps) {
  const loyaltyProgram = useLoyaltyProgram();
  const [activeTab, setActiveTab] = useState<MODE_OPTION>("APPLY_STAMP");

  const {
    config: {
      availableRewards: [{ name: rewardName, goalPoints }],
    },
  } = loyaltyProgram;

  const currentPoints = member?.points ?? 0;
  const hasRedeemableReward = currentPoints >= goalPoints;

  function handleReset() {
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col gap-3 px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Member actions</h2>
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row h-full gap-2 px-4">
        <div className="sm:w-1/2 w-full">
          <div className="flex flex-col p-4 gap-4">
            {hasRedeemableReward && (
              <Alert
                variant="info"
                message="Customer is eligible to redeem rewards."
              />
            )}

            <LoyaltyCardSection
              current={currentPoints}
              total={goalPoints}
              rewardLabel={rewardName}
            />

            {member && <CustomerSection customer={member} />}
          </div>
        </div>

        <div className="sm:w-1/2 w-full h-full flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    "rounded-full px-3 py-2 text-sm font-semibold transition",
                    isActive
                      ? "bg-primary text-secondary-foreground"
                      : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {activeTab === "APPLY_STAMP" ? (
            <MemberSheetApplyStampContent
              member={member}
              onClose={onClose}
              onRefresh={onRefresh}
            />
          ) : (
            <MemberSheetRedeemRewardContent
              member={member}
              onClose={onClose}
              onRefresh={onRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}
