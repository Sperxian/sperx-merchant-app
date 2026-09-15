"use client";

import "@/src/app/globals.css";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserPublicMetadata } from "../types/clerk";
import RedirectingMerchantScanner from "./(splash)/RedirectingMerchantScanner";

export default function LandingPage() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <RedirectingMerchantScanner />;
  }

  const { shops } = user.publicMetadata as UserPublicMetadata;

  if (!shops || shops.length === 0) {
    return redirect(`/setup`);
  }

  //  Redirect to first shop
  //  Currently we don't support multiple shops per user,
  //  but this is a placeholder for that future feature)
  const [{ id: shopId }] = shops;
  return redirect(`/shop/${shopId}/scanner`);
}
