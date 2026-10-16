import "@/src/app/globals.css";
import { SignOutButton } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import SplashPageTemplate from "./SplashPageTemplate";

export default function IncompleteShopConfig() {
  return (
    <SplashPageTemplate
      defaultSlot={
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Good things are being stamped into place.
          </span>
          <span className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {
              "We're still configuring this brand's stamp card. Let us know you stopped by and we'll reach out when it's ready!"
            }
          </span>
        </div>
      }
      actionSlot={
        <SignOutButton redirectUrl="/sign-in">
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-dark"
          >
            <LogOutIcon size={18} />
            Logout <span className="text-white/50">(for now)</span>
          </button>
        </SignOutButton>
      }
    />
  );
}
