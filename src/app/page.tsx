"use client";

import "@/src/app/globals.css";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserPublicMetadata } from "../types/clerk";
import IncompleteShopConfig from "./(splash)/IncompleteShopConfig";
import RedirectingMerchantScanner from "./(splash)/RedirectingMerchantScanner";

export default function LandingPage() {
  const router = useRouter();

  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <RedirectingMerchantScanner />;
  }

  const { shops } = user.publicMetadata as UserPublicMetadata;

  if (!shops || shops.length === 0) {
    return <IncompleteShopConfig />;
  }

  //  Redirect to first shop
  //  Currently we don't support multiple shops per user,
  //  but this is a placeholder for that future feature)
  const [{ id: shopId }] = shops;
  router.replace(`/shop/${shopId}/scanner`);
}
