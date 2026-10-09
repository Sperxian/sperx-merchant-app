import axios from "axios";
import { notFound } from "next/navigation";
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

  return (
    <EditLoyaltyProgramPageContent
      initialValue={program}
      shopId={shopId}
      programId={programId}
    />
  );
}
