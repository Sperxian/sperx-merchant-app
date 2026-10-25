"use client";

import type { LoyaltyProgram } from "@/src/types/loyalty";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import { getLoyaltyPrograms } from "@/src/lib/api/loyalty";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle, PencilIcon, PlusIcon } from "lucide-react";
import { PageHeading } from "@/src/components/shared/PageHeading";
import { ActionButton } from "@/src/components/shared/ActionButton";

export default function LoyaltyProgramPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

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

  const goToCreateLoyaltyProgramPage = () => {
    router.push(`/shop/${params.id}/loyalty-programs/new`);
  };

  const loadingContent = (
    <div
      role="status"
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300"
    >
      <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
      <span>Loading loyalty programs...</span>
    </div>
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <PageHeading
        eyebrow="Engagement"
        title="Loyalty programs"
        description="Create and manage the rewards that keep members coming back."
        action={
          <ActionButton
            onClick={goToCreateLoyaltyProgramPage}
            className="w-fit rounded-xl px-4 py-2.5 text-sm"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>Add New</span>
          </ActionButton>
        }
      />
      <div className="flex flex-wrap items-start gap-5">
        {isLoading ? loadingContent : null}
        {loyaltyCardPrograms.map(({ id, loyaltyProgram }) => (
          <article
            key={id}
            className="h-fit w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(25%-0.9375rem)]"
          >
            <div className="h-[clamp(250px,28vw,250px)]">
              <LoyaltyCard current={3} loyaltyProgram={loyaltyProgram} />
            </div>
            <hr className="my-4 border-slate-100 dark:border-white/10" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{loyaltyProgram.name}</h2>
              <Link
                href={`/shop/${params.id}/loyalty-programs/${id}`}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-primary/5 hover:text-primary dark:text-slate-400 dark:hover:bg-primary-lighter/10 dark:hover:text-primary-lighter"
                aria-label={`Edit ${loyaltyProgram.name}`}
                title={`Edit ${loyaltyProgram.name}`}
              >
                <PencilIcon className="h-5 w-5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
