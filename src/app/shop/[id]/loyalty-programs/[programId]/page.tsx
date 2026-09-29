import axios from "axios";
import { notFound } from "next/navigation";
import { CreditCardIcon } from "lucide-react";
import { Breadcrumbs } from "@/src/components/shared/Breadcrumbs";
import type { LoyaltyProgramInput } from "@/src/components/widgets/LoyaltyProgramForm";
import { getLoyaltyProgram } from "@/src/lib/api/loyalty";
import EditLoyaltyProgramPageContent from "./EditLoyaltyProgramPageContent";

export default async function EditLoyaltyProgramPage({
  params,
}: PageProps<"/shop/[id]/loyalty-programs/[programId]">) {
  const { id: shopId, programId } = await params;
  let program: Awaited<ReturnType<typeof getLoyaltyProgram>>;

  try {
    program = await getLoyaltyProgram(shopId, programId);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }
    throw error;
  }

  if (!program) return notFound();

  const reward = program.config.availableRewards[0];
  if (!reward) throw new Error("Loyalty program has no configured reward.");

  const loyaltyProgram: LoyaltyProgramInput = {
    loyaltyProgramName: program.name,
    stampIcon: program.config.stampIcon as LoyaltyProgramInput["stampIcon"],
    goalPoints: reward.goalPoints,
    rewardName: reward.name,
    rewardDescription: reward.description ?? "",
  };

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

      <EditLoyaltyProgramPageContent
        initialValue={loyaltyProgram}
        shopId={shopId}
        programId={programId}
      />
    </div>
  );
}
