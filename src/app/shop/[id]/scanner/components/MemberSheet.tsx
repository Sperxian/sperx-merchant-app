import { MemberLoyalty } from "@/src/lib/types";
import { MemberSheetApplyStampContent } from "./MemberSheetApplyStampContent";
import { MemberSheetRedeemRewardContent } from "./MemberSheetRedeemRewardContent";
import { LoyaltyCardSection } from "./LoyaltyCardSection";
import { CustomerSection } from "../CustomerSection";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { Alert } from "@/src/components/shared/Alert";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

interface MemberSheetProps {
  member?: MemberLoyalty;
  mode: MODE_OPTION;

  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export function MemberSheet({
  member,
  mode,
  open,
  onClose,
  onRefresh,
}: MemberSheetProps) {
  const loyaltyProgram = useLoyaltyProgram();

  const {
    config: {
      availableRewards: [{ name: rewardName, goalPoints }],
    },
  } = loyaltyProgram;

  const currentPoints = member?.points ?? 0;
  const cardPoints = currentPoints % goalPoints;
  const hasRedeemableReward = currentPoints >= goalPoints;

  function handleReset() {
    // alert("TODO");
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
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">TODO</h2>

        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col sm:flex-row h-full gap-2">
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

        <div className="sm:w-1/2 w-full h-full">
          {mode === "APPLY_STAMP" ? (
            <MemberSheetApplyStampContent
              member={member}
              open={open}
              onClose={onClose}
              onRefresh={onRefresh}
            />
          ) : (
            <MemberSheetRedeemRewardContent
              member={member}
              open={open}
              onClose={onClose}
              onRefresh={onRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
}
