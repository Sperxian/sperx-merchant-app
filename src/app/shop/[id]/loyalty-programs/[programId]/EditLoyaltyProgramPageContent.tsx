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
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className="mb-4 text-2xl font-semibold text-primary dark:text-primary-lighter">
        <span className="text-xl">Manage </span>
        {loyaltyProgram.loyaltyProgramName}
      </h1>

      <div className="flex flex-col mx-auto md:min-w-3xl rounded-xl md:rounded-3xl border border-white/30 p-4 shadow-2xl gap-4">
        <LoyaltyProgramForm
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
        <div className="w-full flex justify-end px-2 md:px-6">
          <button
            type="button"
            onClick={() => setIsQrDialogOpen(true)}
            className="w-fit text-sm font-medium text-primary underline underline-offset-4 transition hover:text-secondary"
          >
            Show QR code
          </button>
        </div>
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

      <dialog
        ref={qrDialogRef}
        aria-labelledby="loyalty-qr-dialog-title"
        onClose={() => setIsQrDialogOpen(false)}
        className="fixed m-auto max-h-[calc(100%-2rem)] w-[80vw] max-w-5xl rounded-2xl border border-white/30 bg-background p-6 text-foreground shadow-2xl backdrop:bg-black/50"
      >
        <QrDialogContent
          loyaltyProgramName={loyaltyProgram.loyaltyProgramName}
          loyaltyJoinLink={initialValue.memberJoinLink}
          onClose={() => setIsQrDialogOpen(false)}
        />
      </dialog>
    </div>
  );
}
