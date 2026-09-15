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
      <div className="flex h-64 max-h-[360px] cursor-pointer">
        <LoyaltyCard current={props.current} loyaltyProgram={loyaltyProgram} />
      </div>
    </div>
  );
}
