"use client";

import "@/src/app/globals.css";
import { useRouter } from "next/navigation";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { UserPublicMetadata } from "../types/clerk";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
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
    return <MissingShopConfigurationPage />;
  }

  //  Redirect to first shop
  //  Currently we don't support multiple shops per user,
  //  but this is a placeholder for that future feature)
  const [{ id: shopId }] = shops;
  router.replace(`/shop/${shopId}/scanner`);
}

function MissingShopConfigurationPage() {
  return (
    <div
      className="flex flex-col items-center justify-between gap-8
        w-full h-full mt-[64px] py-8 m-auto relative"
    >
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/10" />

      {/* <div className="absolute bottom-[32px] left-1/2  w-[320px] h-[320px] rounded-full border-[12px] border-primary/10 -translate-x-1/2 -translate-y-1/2" /> */}
      {/* <div className="absolute w-[120px] h-[120px] rounded-full border-[18px] border-primary/10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] rounded-full border-[20px] border-primary/10 -translate-x-1/2 -translate-y-1/2" /> */}

      <div className="flex flex-col items-center gap-8">
        <Image
          className="aspect-square object-cover animate-pulse"
          src={"/sperx-logo.png"}
          alt="Sperx"
          width={120}
          height={120}
          priority
        />

        <div className="flex flex-col items-center w-[75%] gap-4">
          <span className="text-2xl font-bold text-primary dark:text-primary-lighter capitalize text-center">
            Good things are being stamped into place.
          </span>
          <span className="text-sm font-medium text-foreground/80 text-justify">
            {
              "We're still configuring this brand's stamp card. Let us know you stopped by and we'll reach out when it's ready!"
            }
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-8 bottom-16">
        <SignOutButton redirectUrl="/sign-in">
          <button
            className="bg-primary hover:bg-primary/80 text-white p-4 rounded-lg 
            w-full inline-flex items-center justify-center gap-2"
          >
            <LogOutIcon size={18} />
            Logout <span className="text-white/50">(for now)</span>
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
