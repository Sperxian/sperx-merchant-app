import { StampGrid } from "./StampGrid";

export type LoyaltyCardSectionProps = {
  current: number;
  total: number;
  rewardLabel: string;
  newlyAdded?: number;
};

export function LoyaltyCardSection(props: LoyaltyCardSectionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Loyalty Card
      </p>
      <LoyaltyCard {...props} />
    </div>
  );
}

function LoyaltyCard({ current, total, rewardLabel }: LoyaltyCardSectionProps) {
  const LOYALTY_PROGRAM_NAME = "Member Loyalty Program";

  const trackingPoints = current % total;
  const remainingPoints = total - trackingPoints;
  const remainingPercent = Math.round((trackingPoints / total) * 100);

  return (
    <div className="bg-primary rounded-2xl p-4">
      {/* Header row */}
      <div className="flex items-center justify-between pt-2 pb-4">
        <p className="text-xs text-white/50 uppercase tracking-wide">
          {LOYALTY_PROGRAM_NAME}
        </p>
        <span className="text-xs text-secondary tracking-wide font-medium">
          {trackingPoints} / {total}
        </span>
      </div>

      {/* Stamp grid */}
      <StampGrid collected={trackingPoints} total={total} />

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-secondary/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${remainingPercent}%` }}
          />
        </div>
        <span className="text-xs text-secondary font-bold whitespace-nowrap">
          {remainingPoints > 0
            ? `${remainingPoints} more for ${rewardLabel}`
            : `${rewardLabel} earned!`}
        </span>
      </div>
    </div>
  );
}
