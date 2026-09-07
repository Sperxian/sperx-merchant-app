"use client";

import "@/src/app/globals.css";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import { CreditCardIcon, StoreIcon } from "lucide-react";
import { useState } from "react";

import { MultiStepForm } from "../../../components/shared/MultiStepForm";

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
  const [loyaltyProgramName, setLoyaltyProgramName] = useState<string>("Loyalty Program");
  const [goalPoints, setGoalPoints] = useState<number>(10);
  const [rewardName, setRewardName] = useState<string>("Free Item");
  const [rewardDescription, setRewardDescription] = useState<string>(
    "You get a free item once you complete the points.",
  );

  const defaultLoyaltyProgramName = `${shopName} Loyalty`;

  return (
    <div className="flex flex-col items-center justify-between gap-8 w-full h-full md:pt-8 m-auto relative">
      <div className="absolute -top-[28px] -right-[28px] w-[120px] h-[120px] rounded-full border-[18px] border-primary/10" />
      <div className="absolute bottom-[-18px] left-[18px] w-[180px] h-[180px] rounded-full border-[20px] border-primary/10" />
      <div className="absolute bottom-[35%] left-[5%] w-[320px] h-[320px] rounded-full border-[12px] border-primary/5" />

      <MultiStepForm
        stepsMetadata={stepsMetadata}
        onSubmit={async (data) => {
          console.log("Submit:", data);
        }}
      >
        <div className="w-full">
          <div className="text-xl font-medium w-full mb-4">
            Welcome to{" "}
            <span className="text-primary dark:text-primary-lighter font-medium">
              SperX
            </span>
            !
          </div>

          <span className="text-body text-sm">
            We&apos;re excited to have you. Let&apos;s get started by setting up
            your shop and loyalty program.
          </span>

          <div className="pt-12 pb-6 flex flex-col items-center">
            <label
              htmlFor="shopName"
              className="mb-2 block text-lg font-medium text-foreground"
            >
              What&apos;s the name of your shop?
            </label>

            <input
              id="shopName"
              name="shopName"
              type="text"
              placeholder="Your Shop's Name"
              className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-xl font-medium text-foreground w-full mb-4">
            Design Your First Loyalty Program
          </div>

          <span className="text-body text-sm pb-4">
            Most shops use the following default settings for their loyalty
            program. Feel free to customize them base on your business needs.
            You can always adjust these later.
          </span>

          <div className="h-px w-full bg-foreground/10 mt-4 mb-6" />

          <div className="flex flex-col w-full items-start gap-4">
            <div className="flex w-full">
              <input
                id="loyaltyProgramName"
                name="loyaltyProgramName"
                type="text"
                placeholder="Your Loyalty Program's Name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-md text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={loyaltyProgramName}
                onChange={(e) => setLoyaltyProgramName(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col gap-4 md:flex-row md:mt-8">
              {/* Loyalty Program Form */}
              <div className="w-full md:w-2/5 flex flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="goalPoints"
                    className="mb-2 block font-medium text-foreground"
                  >
                    How many points to claim reward?
                  </label>

                  <input
                    id="goalPoints"
                    name="goalPoints"
                    type="number"
                    placeholder="Goal Points"
                    className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-right"
                    value={goalPoints}
                    onChange={(e) => setGoalPoints(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="rewardName"
                    className="mb-2 block font-medium text-foreground"
                  >
                    Reward Name
                  </label>

                  <input
                    id="rewardName"
                    name="rewardName"
                    type="text"
                    placeholder="Reward Name"
                    className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={rewardName}
                    onChange={(e) => setRewardName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="rewardDescription"
                    className="mb-2 block font-medium text-foreground"
                  >
                    Reward Description
                  </label>

                  <textarea
                    id="rewardDescription"
                    name="rewardDescription"
                    placeholder="Reward Description"
                    className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={rewardDescription}
                    onChange={(e) => setRewardDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Loyalty Card */}
              <div className="w-full md:w-3/5">
                <LoyaltyCard
                  current={Math.max(Math.floor(goalPoints * 0.8), 1)}
                  loyaltyProgram={{
                    name: loyaltyProgramName ?? defaultLoyaltyProgramName,
                    type: "STAMP_BASED",
                    config: {
                      stampIcon: "milk_tea",
                      availableRewards: [
                        {
                          code: "XXXX",
                          name: rewardName ?? "",
                          description: rewardDescription,
                          goalPoints: goalPoints,
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </MultiStepForm>
    </div>
  );
}
