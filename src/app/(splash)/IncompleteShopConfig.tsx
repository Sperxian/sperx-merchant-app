import "@/src/app/globals.css";
import { SignOutButton } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";
import SplashPageTemplate from "./SplashPageTemplate";

export default function IncompleteShopConfig() {
  return (
    <SplashPageTemplate
      defaultSlot={
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
      }
      actionSlot={
        <SignOutButton redirectUrl="/sign-in">
          <button
            className="bg-primary hover:bg-primary/80 text-white p-4 rounded-lg 
            w-full inline-flex items-center justify-center gap-2"
          >
            <LogOutIcon size={18} />
            Logout <span className="text-white/50">(for now)</span>
          </button>
        </SignOutButton>
      }
    />
  );
}
