import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import { useLoyaltyProgram } from "../../LoyaltyProgramContext";

export type LoyaltyCardSectionProps = {
  current: number;
};

export function LoyaltyCardSection(props: LoyaltyCardSectionProps) {
  const loyaltyProgram = useLoyaltyProgram();

  return (
    <div>
      <p className="text-sm font-medium text-foreground/50 mb-2">
        Loyalty Card
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="h-64 max-h-[360px] w-full md:w-sm">
          <LoyaltyCard
            current={props.current}
            loyaltyProgram={loyaltyProgram}
          />
        </div>
      </div>
    </div>
  );
}
