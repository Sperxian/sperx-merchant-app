import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { UserPublicMetadata } from "@/src/types/clerk";
import SetupPageContent from "./SetupPageContent";

export default async function SetupPage() {
  const user = await currentUser();
  const shops = (user?.publicMetadata as UserPublicMetadata | undefined)?.shops;

  if (!shops?.length) return <SetupPageContent />;

  const shopId = shops[0].id;

  redirect(`/shop/${shopId}/dashboard`);
}
