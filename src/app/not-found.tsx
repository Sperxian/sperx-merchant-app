"use client";

import "@/src/app/globals.css";
import SplashPageTemplate from "./(splash)/SplashPageTemplate";
import { HomeIcon, ShieldQuestionIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionButton } from "@/src/components/shared/ActionButton";

export default function RedirectingMerchantScanner() {
  const router = useRouter();
  
  const goHome = () => {
    router.push("/");
  };

  return (
    <SplashPageTemplate
      defaultSlot={
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex w-full flex-col items-center gap-2">
            <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              You’ve reached an unstamped territory.
            </span>
            <span className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              This page expired before earning its free coffee — or{" "}
              <span className="font-semibold text-primary dark:text-primary-lighter">
                never existed
              </span>{" "}
              in the first place.
            </span>
          </div>
          <ShieldQuestionIcon className="h-[150px] w-[150px] text-primary dark:text-primary-lighter md:h-[200px] md:w-[200px]" />
        </div>
      }
      actionSlot={
        <ActionButton variant="primary" onClick={goHome}>
          <HomeIcon size={18} />
          Return Home
        </ActionButton>
      }
    />
  );
}
