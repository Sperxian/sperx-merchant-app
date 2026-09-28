"use client";

import type { LoyaltyProgram } from "@/src/lib/types";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon } from "lucide-react";

export default function LoyaltyProgramPage() {
  const params = useParams<{ id: string }>();
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    async function loadLoyaltyPrograms() {
      setIsLoading(true);

      try {
        const programs = await getLoyaltyPrograms(params.id);
        if (isCurrent) setLoyaltyPrograms(programs);
      } catch (error) {
        console.error("Failed to load loyalty programs:", error);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    if (params.id) void loadLoyaltyPrograms();

    return () => {
      isCurrent = false;
    };
  }, [params.id]);

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
            <div className="h-[clamp(250px,28vw,250px)]">
              <LoyaltyCard current={3} loyaltyProgram={loyaltyProgram} />
            </div>
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
        <article className="h-full w-full rounded-3xl border border-dashed border-foreground/40 bg-background/30 p-4 shadow-sm sm:basis-[calc(50%-0.5rem)] lg:basis-[calc(25%-0.75rem)]">
          <div className="h-[clamp(250px,28vw,250px)]">
            <Link
              href={`/shop/${params.id}/loyalty-programs/new`}
              className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl p-4 text-center transition hover:bg-foreground/10"
            >
              <PlusIcon className="h-10 w-10" />
              <h2 className="text-xl font-semibold">Add Loyalty Program</h2>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
