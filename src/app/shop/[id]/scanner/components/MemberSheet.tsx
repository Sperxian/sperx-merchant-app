import { MemberLoyalty } from "@/src/lib/types";
import { MemberSheetApplyStampContent } from "./MemberSheetApplyStampContent";
import { MemberSheetRedeemRewardContent } from "./MemberSheetRedeemRewardContent";

export type MODE_OPTION = "APPLY_STAMP" | "REDEEM_REWARD";

interface MemberSheetProps {
  member?: MemberLoyalty;
  config: LoyaltyConfig;
  mode: MODE_OPTION;

  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface LoyaltyConfig {
  stampsRequired: number;
  rewardLabel: string;
}

export function MemberSheet({
  member,
  config,
  mode,
  open,
  onClose,
  onRefresh,
}: MemberSheetProps) {
  return (
    <div
      className={[
        "absolute inset-0 z-[999] transition-colors duration-300",
        open
          ? "bg-black/55 pointer-events-auto"
          : "bg-transparent pointer-events-none",
      ].join(" ")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {mode === "APPLY_STAMP" ? (
        <MemberSheetApplyStampContent
          member={member}
          config={config}
          open={open}
          onClose={onClose}
          onRefresh={onRefresh}
        />
      ) : (
        <MemberSheetRedeemRewardContent
          member={member}
          config={config}
          open={open}
          onClose={onClose}
        />
      )}
    </div>
  );
}
