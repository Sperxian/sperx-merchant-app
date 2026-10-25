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
      <div className="mb-4 w-full text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Design Your First Loyalty Program
      </div>

      <span className="pb-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Most shops use the following default settings for their loyalty program.
        Feel free to customize them base on your business needs. You can always
        adjust these later.
      </span>

      <div className="mb-6 mt-4 h-px w-full bg-slate-100 dark:bg-white/10" />

      <LoyaltyProgramForm
        loyaltyProgramInput={loyaltyProgramInput}
        setLoyaltyProgramInput={setLoyaltyProgramInput}
      />
    </div>
  );
}

export default LoyaltySetupStep;
