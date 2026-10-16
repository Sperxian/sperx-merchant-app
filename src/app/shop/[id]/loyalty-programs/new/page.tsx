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
import { PageHeading } from "@/src/components/shared/PageHeading";

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
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Breadcrumbs items={breadcrumbItems} />

      <PageHeading
        eyebrow="Engagement"
        title="Create a loyalty program"
        description="Set up a reward members can earn with every visit."
      />

      <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        <hr className="border-slate-100 dark:border-white/10" />
        <div className="flex w-full flex-col justify-between gap-3 sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => void saveLoyaltyProgram()}
            disabled={isSaving || !isLoyaltyProgramValid(loyaltyProgram)}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/shop/${shopId}/loyalty-programs`)}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 sm:w-fit"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
