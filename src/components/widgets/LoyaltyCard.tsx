import type { LoyaltyProgram } from "@/src/types/loyalty";
import { StampLoyaltyCard } from "./StampLoyaltyCard";
import { WalletLoyaltyCard } from "./WalletLoyaltyCard";

type LoyaltyCardProps = {
  current: number;
  balance?: number;
  loyaltyProgram: Omit<LoyaltyProgram, "id" | "shopId" | "dateCreated">;
};

export function LoyaltyCard({
  current,
  balance,
  loyaltyProgram,
}: LoyaltyCardProps) {
  if (loyaltyProgram.type === "STAMP_BASED") {
    return (
      <StampLoyaltyCard loyaltyProgram={loyaltyProgram} current={current} />
    );
  } else if (loyaltyProgram.type === "WALLET_BASED") {
    return (
      <WalletLoyaltyCard
        loyaltyProgram={loyaltyProgram}
        currentPoints={current}
        balance={balance ?? 0}
      />
    );
  }
}
