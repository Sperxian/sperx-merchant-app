import "@/src/app/globals.css";
import SplashPageTemplate from "./SplashPageTemplate";

export default function RedirectingMerchantScanner() {
  return (
    <SplashPageTemplate
      defaultSlot={
        <div className="flex flex-col items-center w-[75%] gap-2">
          <span className="text-2xl font-bold text-primary dark:text-primary-lighter capitalize text-center">
            Loading Your Shop
          </span>
          <span className="text-sm font-medium text-foreground/90 text-center">
            {
              "You will be redirected to your shop's stamp card in just a moment."
            }
          </span>
        </div>
      }
      actionSlot={
        <span className="text-sm font-medium text-foreground/80 text-center px-2 mb-4">
          If you see this message for more than a few seconds, please contact
          support.
        </span>
      }
    />
  );
}
