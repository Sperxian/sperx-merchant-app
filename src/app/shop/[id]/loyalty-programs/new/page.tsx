"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CreditCardIcon } from "lucide-react";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import LoyaltyProgramForm, {
  type LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";
import { createLoyaltyProgram } from "@/src/lib/api/loyalty";
import { toastError, toastSuccess } from "@/src/lib/toast";

function isLoyaltyProgramValid(loyaltyProgram: LoyaltyProgramInput) {
  return Boolean(
    loyaltyProgram.loyaltyProgramName.trim() &&
      loyaltyProgram.stampIcon &&
      loyaltyProgram.goalPoints > 0 &&
      loyaltyProgram.rewardName.trim() &&
      loyaltyProgram.rewardDescription.trim(),
  );
}

export default function NewLoyaltyProgramPage() {
  const { id: shopId } = useParams<{ id: string }>();
  const router = useRouter();
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgramInput>({
    loyaltyProgramName: "",
    stampIcon: "star",
    goalPoints: 10,
    rewardName: "",
    rewardDescription: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  async function saveLoyaltyProgram() {
    if (!isLoyaltyProgramValid(loyaltyProgram)) {
      toastError(new Error("Please complete all loyalty program details."));
      return;
    }

    setIsSaving(true);

    try {
      await createLoyaltyProgram(shopId, {
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
      toastSuccess("Loyalty program created.");
      router.push(`/shop/${shopId}/loyalty-programs`);
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
    { label: "New Loyalty Program" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="mb-4 text-xl font-semibold text-primary dark:text-primary-lighter">
        Create New Loyalty Program
      </h1>

      <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md:rounded-3xl border border-white/30 p-4 shadow-2xl smz:p-6 gap-4">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        <hr className="border-foreground/20" />
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => void saveLoyaltyProgram()}
            disabled={isSaving || !isLoyaltyProgramValid(loyaltyProgram)}
            className="bg-primary text-white text-md font-medium p-6 py-2 rounded-lg tracking-wide transition-all active:hover:bg-secondary disabled:opacity-25 md:order-2"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/shop/${shopId}/loyalty-programs`)}
            className="w-full md:w-fit text-md font-medium p-4 py-2 rounded-lg border border-gray-300 md:order-1 inline-flex"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
