"use client";

import "@/src/app/globals.css";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { UserPublicMetadata } from "../types/clerk";
import RedirectingMerchantScanner from "./(splash)/RedirectingMerchantScanner";

export default function LandingPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const { shops } = user.publicMetadata as UserPublicMetadata;
    if (!shops?.length) {
      router.replace("/setup");
      return;
    }

    router.replace(`/shop/${shops[0].id}/scanner`);
  }, [isLoaded, isSignedIn, user, router]);

  return <RedirectingMerchantScanner />;
}
