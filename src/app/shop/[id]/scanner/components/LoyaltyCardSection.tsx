import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import type { MemberLoyaltyDto } from "@/src/types/member";

export type LoyaltyCardSectionProps = {
  member: MemberLoyaltyDto;
};

export function LoyaltyCardSection(props: LoyaltyCardSectionProps) {
  const balance = (props.member.walletBalance ?? 0) / 100
  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Loyalty Card
      </p>z
      <div className="w-full flex flex-col items-center">
        <div className="h-64 max-h-[360px] w-full md:w-sm">
          <LoyaltyCard
            current={props.member.points}
            balance={balance}
            loyaltyProgram={props.member.loyaltyProgram}
          />
        </div>
      </div>
    </div>
  );
}
