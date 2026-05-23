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
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Sperx Merchant</h1>

        <p className="text-zinc-400 animate-pulse">
          Loading your experience...
        </p>
      </div>
    );
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
