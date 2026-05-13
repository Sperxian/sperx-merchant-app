import { currentUser as getCurrentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserPublicMetadata } from "../types/clerk";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.error("This page should have been unreachable as it is protected!");
    redirect("/sign-in");
  }

  const publicMetadata = currentUser.publicMetadata as UserPublicMetadata;
  const { shops } = publicMetadata;

  if (!shops || shops.length === 0) {
    console.error("User has no shops associated with their account");
    redirect("/under-construction");
  }

  //  Redirect to first shop
  //  Currently we don't support multiple shops per user,
  //  but this is a placeholder for that future feature)
  const [{ id: shopId }] = shops;

  redirect(`/shop/${shopId}/scanner`);
}
