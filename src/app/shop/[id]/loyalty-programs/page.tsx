import type { LoyaltyProgram } from "@/src/lib/types";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import { PencilIcon } from "lucide-react";

export default function LoyaltyProgramPage() {
  const loyaltyPrograms: LoyaltyProgram[] = [
    {
      id: "stub-coffee-club",
      name: "Coffee Club",
      type: "STAMP_BASED",
      config: {
        stampIcon: "coffee",
        availableRewards: [
          {
            code: "coffee-club-reward",
            name: "Free Coffee",
            goalPoints: 10,
          },
        ],
      },
      shopId: "stub-shop",
      dateCreated: new Date("2026-01-01"),
    },
    {
      id: "stub-rewards-plus",
      name: "Rewards Plus",
      type: "STAMP_BASED",
      config: {
        stampIcon: "star",
        availableRewards: [
          {
            code: "rewards-plus-reward",
            name: "Member Reward",
            goalPoints: 8,
          },
        ],
      },
      shopId: "stub-shop",
      dateCreated: new Date("2026-01-02"),
    },
    {
      id: "stub-member-perks",
      name: "Member Perks",
      type: "STAMP_BASED",
      config: {
        stampIcon: "heart",
        availableRewards: [
          {
            code: "member-perks-reward",
            name: "Perk Unlocked",
            goalPoints: 12,
          },
        ],
      },
      shopId: "stub-shop",
      dateCreated: new Date("2026-01-03"),
    },
  ];

  const loyaltyCardPrograms = loyaltyPrograms.map((program) => ({
    id: program.id,
    loyaltyProgram: {
      name: program.name,
      type: program.type,
      config: program.config,
    },
  }));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold text-primary">
        Loyalty Programs
      </h1>
      <div className="flex flex-wrap items-start gap-4">
        {loyaltyCardPrograms.map(({ id, loyaltyProgram }) => (
          <article
            key={id}
            className="h-fit w-full rounded-3xl border border-foreground/40 bg-background/30 p-4 shadow-sm sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(25%-0.75rem)]"
          >
            <LoyaltyCard current={3} loyaltyProgram={loyaltyProgram} />
            <hr className="my-4 border-foreground/20" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{loyaltyProgram.name}</h2>
              <button
                type="button"
                className="rounded-md p-2 transition hover:bg-foreground/10"
                aria-label={`Edit ${loyaltyProgram.name}`}
                title={`Edit ${loyaltyProgram.name}`}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
