"use client";

import { useState } from "react";
import { CreditCardIcon, UndoIcon } from "lucide-react";
import { updateLoyaltyProgram } from "@/src/lib/api/loyalty";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import LoyaltyProgramForm, {
  type LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";

export default function EditLoyaltyProgramPageContent({
  initialValue,
  shopId,
  programId,
}: {
  initialValue: LoyaltyProgramInput;
  shopId: string;
  programId: string;
}) {
  const [loyaltyProgram, setLoyaltyProgram] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  async function saveLoyaltyProgram() {
    setIsSaving(true);

    try {
      await updateLoyaltyProgram(shopId, programId, {
        name: loyaltyProgram.loyaltyProgramName,
        type: "STAMP_BASED",
        config: {
          stampIcon: loyaltyProgram.stampIcon,
          availableRewards: [
            {
              name: loyaltyProgram.rewardName,
              description: loyaltyProgram.rewardDescription,
              goalPoints: loyaltyProgram.goalPoints,
            },
          ],
        },
      });
      toastSuccess("Loyalty program saved.");
    } catch (error) {
      toastError(error);
    } finally {
      setIsSaving(false);
    }
  }

  const breadcrumbItems = [
    {
      label: "Loyalty Programs",
      href: `/shop/${shopId}/loyalty-programs`,
      icon: CreditCardIcon,
    },
    { label: loyaltyProgram.loyaltyProgramName },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="mb-4 text-2xl font-semibold text-primary">
        <span className="text-xl">Manage </span>
        {loyaltyProgram.loyaltyProgramName}
      </h1>

      <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md: rounded-3xl border border-white/30 p-4 shadow-2xl sm:p-6 lg:p-8 gap-4">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        <hr className="border-foreground/20" />
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => void saveLoyaltyProgram()}
            disabled={isSaving}
            className="bg-primary text-white text-md font-medium p-6 py-2 rounded-lg tracking-wide transition-all active:scale-95 hover:bg-secondary md:order-2"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setLoyaltyProgram(initialValue)}
            className="w-full inline-flex justify-center gap-2 md:order-1 md:w-fit text-md font-medium p-6 py-2 rounded-lg border border-gray-300"
          >
            <UndoIcon />
            <span>Discard Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
