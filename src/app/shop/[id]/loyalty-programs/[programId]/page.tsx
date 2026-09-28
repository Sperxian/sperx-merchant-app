"use client";

import { getLoyaltyProgram } from "@/src/lib/api/loyalty";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CreditCardIcon, UndoIcon } from "lucide-react";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import LoyaltyProgramForm, {
  LoyaltyProgramInput,
} from "@/src/components/widgets/LoyaltyProgramForm";

export default function EditLoyaltyProgramPage() {
  const params = useParams<{ id: string; programId: string }>();
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgramInput>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadLoyaltyProgram() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const program = await getLoyaltyProgram(params.id, params.programId);
        const reward = program?.config.availableRewards[0];

        if (!program || !reward) {
          throw new Error("Loyalty program was not found.");
        }

        if (isCurrent) {
          setLoyaltyProgram({
            loyaltyProgramName: program.name,
            stampIcon: program.config
              .stampIcon as LoyaltyProgramInput["stampIcon"],
            goalPoints: reward.goalPoints,
            rewardName: reward.name,
            rewardDescription: reward.description ?? "",
          });
        }
      } catch (error) {
        console.error("Failed to load loyalty program:", error);
        if (isCurrent) setLoadError("Unable to load this loyalty program.");
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    if (params.id && params.programId) void loadLoyaltyProgram();

    return () => {
      isCurrent = false;
    };
  }, [params.id, params.programId]);

  if (isLoading) {
    return <p>Loading loyalty program...</p>;
  }

  if (loadError || !loyaltyProgram) {
    return <p>{loadError ?? "Loyalty program was not found."}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs
        items={[
          {
            label: "Loyalty Programs",
            href: `/shop/${params.id}/loyalty-programs`,
            icon: CreditCardIcon,
          },
          { label: loyaltyProgram.loyaltyProgramName },
        ]}
      />

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
            onClick={() => void 0}
            className="bg-primary text-white text-md font-medium p-6 py-2 rounded-lg tracking-wide transition-all active:scale-95 hover:bg-secondary md:order-2"
          >
            Save
          </button>
          <button
            onClick={() => void 0}
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
