"use client";

import "@/src/app/globals.css";
import { CreditCardIcon, StoreIcon } from "lucide-react";
import { useState } from "react";
import { ShopStep } from "@/src/app/(splash)/setup/steps/ShopSetupStep";
import {
  LoyaltyProgramInput,
  LoyaltySetupStep,
} from "@/src/app/(splash)/setup/steps/LoyaltySetupStep";
import { MultiStepForm } from "../../../components/shared/MultiStepForm";
import { setupShop } from "@/src/lib/api/shop";
import { LoyaltyProgramType } from "@/src/lib/types";
import { redirect } from "next/navigation";

export default function SetupPage() {
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
    // TODO: Redirect to loyalty screen once made.
    redirect(`/shop/${shop.id}/scanner`);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 w-full h-full md:pt-8 m-auto relative">
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
