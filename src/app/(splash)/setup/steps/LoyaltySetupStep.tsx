"use client";

import type { Dispatch, SetStateAction } from "react";
import LoyaltyProgramForm from "@/src/components/widgets/LoyaltyProgramForm";
import type { LoyaltyProgramInput } from "@/src/components/widgets/LoyaltyProgramForm";

type LoyaltySetupStepProps = {
  loyaltyProgramInput: LoyaltyProgramInput;
  setLoyaltyProgramInput: Dispatch<SetStateAction<LoyaltyProgramInput>>;
};

export function LoyaltySetupStep({
  loyaltyProgramInput,
  setLoyaltyProgramInput,
}: LoyaltySetupStepProps) {
  return (
    <div className="w-full">
      <div className="text-xl font-medium text-foreground w-full mb-4">
        Design Your First Loyalty Program
      </div>

      <span className="text-body text-sm pb-4">
        Most shops use the following default settings for their loyalty program.
        Feel free to customize them base on your business needs. You can always
        adjust these later.
      </span>

      <div className="h-px w-full bg-foreground/10 mt-4 mb-6" />

      <LoyaltyProgramForm
        loyaltyProgramInput={loyaltyProgramInput}
        setLoyaltyProgramInput={setLoyaltyProgramInput}
      />
    </div>
  );
}

export default LoyaltySetupStep;
