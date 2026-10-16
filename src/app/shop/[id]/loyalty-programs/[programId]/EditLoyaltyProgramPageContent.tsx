"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCardIcon } from "lucide-react";
import { updateLoyaltyProgram } from "@/src/lib/api/loyalty";
import { toastError, toastSuccess } from "@/src/lib/toast";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import LoyaltyProgramForm, {
  type LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";
import type { LoyaltyProgram, LoyaltyProgramInfo } from "@/src/types/loyalty";
import QrDialogContent from "./QrDialogContent";
import { PageHeading } from "@/src/components/shared/PageHeading";

function toLoyaltyProgramInput(program: LoyaltyProgram): LoyaltyProgramInput {
  const reward = program.config.availableRewards[0];
  if (!reward) {
    throw new Error("Loyalty program has no configured reward.");
  }

  return {
    loyaltyProgramName: program.name,
    stampIcon: program.config.stampIcon as LoyaltyProgramInput["stampIcon"],
    goalPoints: reward.goalPoints,
    rewardName: reward.name,
    rewardDescription: reward.description ?? "",
  };
}

function areLoyaltyProgramsEqual(
  first: LoyaltyProgramInput,
  second: LoyaltyProgramInput,
) {
  return (Object.keys(first) as Array<keyof LoyaltyProgramInput>).every(
    (key) => first[key] === second[key],
  );
}

type Props = {
  initialValue: LoyaltyProgramInfo;
  shopId: string;
  programId: string;
};

export default function EditLoyaltyProgramPageContent({
  initialValue,
  shopId,
  programId,
}: Props) {
  const [loyaltyProgram, setLoyaltyProgram] = useState(() =>
    toLoyaltyProgramInput(initialValue),
  );
  const [savedLoyaltyProgram, setSavedLoyaltyProgram] = useState(() =>
    toLoyaltyProgramInput(initialValue),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const qrDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = qrDialogRef.current;
    if (!dialog) {
      return;
    }

    if (isQrDialogOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isQrDialogOpen && dialog.open) {
      dialog.close();
    }
  }, [isQrDialogOpen]);

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
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <Breadcrumbs items={breadcrumbItems} />

      <PageHeading
        eyebrow="Engagement"
        title={`Manage ${loyaltyProgram.loyaltyProgramName}`}
        description="Update your program details, reward, and member QR code."
      />

      <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        {!isDirty && (
          <div className="w-full flex justify-end px-2 md:px-6">
            <button
              type="button"
              onClick={() => setIsQrDialogOpen(true)}
              className="w-fit text-sm font-semibold text-primary underline underline-offset-4 transition hover:text-primary-dark dark:text-primary-lighter dark:hover:text-primary-lightest"
            >
              Show QR code
            </button>
          </div>
        )}
        {isDirty ? (
          <>
            <hr className="border-slate-100 dark:border-white/10" />
            <div className="flex w-full flex-col justify-between gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => saveLoyaltyProgram()}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setLoyaltyProgram(savedLoyaltyProgram)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 sm:w-fit"
              >
                Cancel
              </button>
            </div>
          </>
        ) : null}
      </div>

      <dialog
        ref={qrDialogRef}
        aria-labelledby="loyalty-qr-dialog-title"
        onClose={() => setIsQrDialogOpen(false)}
        className="fixed m-auto max-h-[calc(100%-2rem)] w-[min(90vw,64rem)] rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      >
        <QrDialogContent
          loyaltyProgramInfo={initialValue}
          onClose={() => setIsQrDialogOpen(false)}
        />
      </dialog>
    </div>
  );
}
