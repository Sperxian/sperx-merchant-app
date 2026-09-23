"use client";

import { useState } from "react";
import LoyaltyProgramForm, {
  LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";

export default function EditLoyaltyProgramPage() {
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgramInput>({
    loyaltyProgramName: "Loyalty Program",
    stampIcon: "star",
    goalPoints: 10,
    rewardName: "Free Item",
    rewardDescription: "You get a free item once you complete the points.",
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold text-primary">
        Edit Loyalty Program
      </h1>
      <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md: rounded-3xl border border-white/30 p-4 shadow-2xl sm:p-6 lg:p-8">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
      </div>
    </div>
  );
}
