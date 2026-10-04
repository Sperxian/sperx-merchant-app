"use client";

import "@/src/app/globals.css";
import { CreditCardIcon, StoreIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopStep } from "@/src/app/(splash)/setup/steps/ShopSetupStep";
import { LoyaltySetupStep } from "@/src/app/(splash)/setup/steps/LoyaltySetupStep";
import type { LoyaltyProgramInput } from "@/src/components/widgets/LoyaltyProgramForm";
import { MultiStepForm } from "../../../components/shared/MultiStepForm";
import { setupShop } from "@/src/lib/api/shop";
import { LoyaltyProgramType } from "@/src/lib/types";

export default function SetupPageContent() {
  const router = useRouter();
  const stepsMetadata = [
    {
      title: "Shop",
      icon: StoreIcon,
    },
    {
      title: "Loyalty Program",
      icon: CreditCardIcon,
    },
  ];

  const [shopName, setShopName] = useState("");
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgramInput>({
    loyaltyProgramName: "Loyalty Program",
    stampIcon: "star",
    goalPoints: 10,
    rewardName: "Free Item",
    rewardDescription: "You get a free item once you complete the points.",
  });

  const onSubmit = async () => {
    const setupParams = {
      shop: { name: shopName },
      loyaltyProgram: {
        name: loyaltyProgram.loyaltyProgramName,
        type: "STAMP_BASED" as LoyaltyProgramType,
        config: {
          stampIcon: loyaltyProgram.stampIcon,
          availableRewards: [
            {
              name: loyaltyProgram.rewardName,
              description: loyaltyProgram.rewardDescription,
              goalPoints: loyaltyProgram.goalPoints,
            },
          ],
        },
      },
    };

    const { shop } = await setupShop(setupParams);
    router.push(`/shop/${shop.id}/loyalty-programs`);
  };

  return (
    <div className="relative mx-auto flex min-h-dvh w-full flex-col items-center justify-between gap-8 overflow-hidden bg-slate-50 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:pt-8">
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/5" />
      <MultiStepForm stepsMetadata={stepsMetadata} onSubmit={onSubmit}>
        <ShopStep shopName={shopName} setShopName={setShopName} />

        <LoyaltySetupStep
          loyaltyProgramInput={loyaltyProgram}
          setLoyaltyProgramInput={setLoyaltyProgram}
        />
      </MultiStepForm>
    </div>
  );
}
