"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { MemberSheetApplyStampContent } from "./MemberSheetApplyStampContent";
import { MemberSheetRedeemRewardContent } from "./MemberSheetRedeemRewardContent";
import { MemberSheetTopUpBalanceContent } from "./MemberSheetTopUpBalanceContent";
import { MemberSheetSpendBalanceContent } from "./MemberSheetSpendBalanceContent";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { CustomerSection } from "./CustomerSection";
import { LoyaltyProgramContextProvider } from "../../LoyaltyProgramContext";
import { Alert } from "@/src/components/shared/Alert";
import { Dialog } from "@/src/components/shared/Dialog";
import { MemberLoyaltyDto } from "@/src/types/member";

export type MODE_OPTION =
  | "APPLY_STAMP"
  | "SPEND_BALANCE"
  | "TOP_UP_BALANCE"
  | "REDEEM_REWARD";

const tabs: Array<{ key: MODE_OPTION; label: string }> = [
  { key: "APPLY_STAMP", label: "Apply Stamp" },
  { key: "SPEND_BALANCE", label: "Spend Balance" },
  { key: "TOP_UP_BALANCE", label: "Top-up Balance" },
  { key: "REDEEM_REWARD", label: "Redeem Reward" },
];

interface MemberSheetProps {
  member?: MemberLoyaltyDto;
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
  const [activeTab, setActiveTab] = useState<MODE_OPTION>("APPLY_STAMP");
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActionMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !actionMenuRef.current?.contains(event.target)
      ) {
        setIsActionMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActionMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActionMenuOpen]);

  if (!member) return null;

  const loyaltyProgram = member.loyaltyProgram;

  const {
    config: {
      availableRewards: [{ goalPoints }],
    },
  } = loyaltyProgram;

  const visibleTabs =
    loyaltyProgram.type === "WALLET_BASED"
      ? tabs.filter((tab) => tab.key !== "APPLY_STAMP")
      : tabs.filter(
          (tab) => tab.key !== "TOP_UP_BALANCE" && tab.key !== "SPEND_BALANCE",
        );

  const currentTab = visibleTabs.some((tab) => tab.key === activeTab)
    ? activeTab
    : (visibleTabs[0]?.key ?? "APPLY_STAMP");

  const currentTabLabel =
    visibleTabs.find((tab) => tab.key === currentTab)?.label ?? "Member action";

  const currentPoints = member?.points ?? 0;
  const hasRedeemableReward = currentPoints >= goalPoints;

  return (
    <LoyaltyProgramContextProvider value={loyaltyProgram}>
      <Dialog open={open} onClose={onClose} title="Member Actions" size="xl">
        <div className="h-full flex flex-col sm:flex-row gap-10 sm:gap-6">
          <div className="h-full sm:w-1/2 w-full">
            <div className="flex flex-col gap-4">
              {hasRedeemableReward && (
                <Alert
                  variant="info"
                  message="Customer is eligible to redeem rewards."
                />
              )}

              <LoyaltyCardSection member={member} />

              {member && <CustomerSection customer={member} />}
            </div>
          </div>

          <div className="h-full sm:w-1/2 w-full flex flex-col gap-4">
            <div ref={actionMenuRef} className="relative sm:hidden">
              <div className="inline-flex w-full rounded-xl shadow-sm">
                <span className="inline-flex flex-1 items-center rounded-l-xl border border-r-0 border-slate-200 bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white dark:border-slate-700">
                  {currentTabLabel}
                </span>
                <button
                  type="button"
                  aria-label="Choose member action"
                  aria-expanded={isActionMenuOpen}
                  onClick={() => setIsActionMenuOpen((isOpen) => !isOpen)}
                  className="inline-flex items-center justify-center rounded-r-xl border border-slate-200 bg-primary px-3 text-white transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700"
                >
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={[
                      "h-4 w-4 transition-transform",
                      isActionMenuOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>
              </div>
              {isActionMenuOpen && (
                <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-slate-900">
                  {visibleTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      aria-pressed={tab.key === currentTab}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setIsActionMenuOpen(false);
                      }}
                      className={[
                        "w-full rounded-lg px-3 py-2 text-left text-sm uppercase tracking-wide transition",
                        tab.key === currentTab
                          ? "bg-primary/10 font-semibold text-primary dark:bg-primary-lighter/15 dark:text-primary-lighter"
                          : "text-slate-700 hover:bg-primary/5 hover:text-primary dark:text-slate-200 dark:hover:bg-primary-lighter/10 dark:hover:text-primary-lighter",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden flex-wrap gap-2 sm:flex">
              {visibleTabs.map((tab) => {
                const isActive = tab.key === currentTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={[
                      "rounded-full px-3 py-2 text-sm text-medium transition uppercase tracking-wide",
                      isActive
                        ? "bg-primary text-white font-semibold"
                        : "bg-white/80 text-slate-600 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            {currentTab === "APPLY_STAMP" ? (
              <MemberSheetApplyStampContent
                member={member}
                note="Scanned member QR code by admin"
                onClose={onClose}
                onRefresh={onRefresh}
              />
            ) : currentTab === "REDEEM_REWARD" ? (
              <MemberSheetRedeemRewardContent
                member={member}
                note="Scanned member QR code to redeem reward"
                onClose={onClose}
                onRefresh={onRefresh}
              />
            ) : currentTab === "TOP_UP_BALANCE" ? (
              <MemberSheetTopUpBalanceContent
                member={member}
                note="Scanned member QR code to top-up balance"
                onClose={onClose}
                onRefresh={onRefresh}
              />
            ) : "convertibleAmountCents" in loyaltyProgram.config ? (
              <MemberSheetSpendBalanceContent
                member={member}
                config={loyaltyProgram.config}
                note="Scanned member QR code to spend balance"
                onClose={onClose}
                onRefresh={onRefresh}
              />
            ) : null}
          </div>
        </div>
      </Dialog>
    </LoyaltyProgramContextProvider>
  );
}
