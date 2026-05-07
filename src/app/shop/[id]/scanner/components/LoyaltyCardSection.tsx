import { useLoyaltyProgram } from "../../LoyaltyProgramContext";
import { StampGrid } from "./StampGrid";

export type LoyaltyCardSectionProps = {
  current: number;
  total: number;
  rewardLabel: string;
};

export function LoyaltyCardSection(props: LoyaltyCardSectionProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Loyalty Card
      </p>
      <LoyaltyCard {...props} />
    </div>
  );
}

function LoyaltyCard({
  current,
  total,
  rewardLabel,
}: LoyaltyCardSectionProps) {
  const loyaltyProgram = useLoyaltyProgram();

  const trackingPoints = current % total;
  const remainingPoints = total - trackingPoints;
  const remainingPercent = Math.round((trackingPoints / total) * 100);

  return (
    <div className="h-56 flex-none bg-primary rounded-2xl p-4 relative overflow-hidden flex flex-col">
      {/* Decorative circles */}
      <div className="absolute -top-[28px] -right-[28px] w-[90px] h-[90px] rounded-full border-[18px] border-white/5" />
      <div className="absolute bottom-[-18px] left-[18px] w-[55px] h-[55px] rounded-full border-[11px] border-white/5" />

      <div className="flex items-center justify-between uppercase tracking-widest mb-4">
        <p className="text-xs text-white/50 uppercase">
          {loyaltyProgram.name}
        </p>
        <p className="text-xs text-secondary">
          {Math.trunc(trackingPoints)} / {total}
        </p>
      </div>

      <StampGrid collected={trackingPoints} total={total}  />
      
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