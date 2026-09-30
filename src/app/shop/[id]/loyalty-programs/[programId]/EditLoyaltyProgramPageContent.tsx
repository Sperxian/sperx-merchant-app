"use client";

import { useState } from "react";
import { CreditCardIcon, UndoIcon } from "lucide-react";
import { updateLoyaltyProgram } from "@/src/lib/api/loyalty";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import LoyaltyProgramForm, {
  type LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";

function areLoyaltyProgramsEqual(
  first: LoyaltyProgramInput,
  second: LoyaltyProgramInput,
) {
  return (Object.keys(first) as Array<keyof LoyaltyProgramInput>).every(
    (key) => first[key] === second[key],
  );
}

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
  const [savedLoyaltyProgram, setSavedLoyaltyProgram] = useState(initialValue);
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
      setSavedLoyaltyProgram(loyaltyProgram);
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
  const isDirty = !areLoyaltyProgramsEqual(loyaltyProgram, savedLoyaltyProgram);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="mb-4 text-2xl font-semibold text-primary dark:text-primary-lighter">
        <span className="text-xl">Manage </span>
        {loyaltyProgram.loyaltyProgramName}
      </h1>

      <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md:rounded-3xl border border-white/30 p-4 shadow-2xl smz:p-6 gap-4">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        {isDirty ? (
          <>
            <hr className="border-foreground/20" />
            <div className="w-full flex flex-col md:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={() => saveLoyaltyProgram()}
                disabled={isSaving}
                className="bg-primary text-white text-md font-medium p-6 py-2 rounded-lg tracking-wide transition-all active:scale-95 hover:bg-secondary md:order-2"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setLoyaltyProgram(savedLoyaltyProgram)}
                className="w-full inline-flex justify-center gap-2 md:order-1 md:w-fit text-md font-medium p-4 py-2 rounded-lg border border-gray-300"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
