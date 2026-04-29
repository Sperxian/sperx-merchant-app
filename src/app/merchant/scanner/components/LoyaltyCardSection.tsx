import { StampGrid } from "./StampGrid";

export type LoyaltyCardSectionProps = {
  current: number;
  total: number;
  rewardLabel: string;
  newlyAdded?: number;
};

export function LoyaltyCardSection({
  current,
  total,
  rewardLabel,
}: LoyaltyCardSectionProps) {
  const LOYALTY_PROGRAM_NAME = "Member Loyalty Program";
  const pct = Math.round((current / total) * 100);
  const remaining = total - current;

  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Loyalty Card
      </p>

      <div className="bg-primary rounded-2xl p-4">
        {/* Header row */}
        <div className="flex items-center justify-between py-4">
          <p className="text-xs text-white/50 uppercase tracking-wide">
            {LOYALTY_PROGRAM_NAME}
          </p>
          <span className="text-xs text-secondary tracking-wide font-medium">
            {current} / {total}
          </span>
        </div>

        {/* Stamp grid */}
        <StampGrid collected={current} total={total} />

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-secondary font-bold whitespace-nowrap">
            {remaining > 0
              ? `${remaining} more for ${rewardLabel}`
              : `${rewardLabel} earned!`}
          </span>
        </div>
      </div>
    </div>
  );
}
