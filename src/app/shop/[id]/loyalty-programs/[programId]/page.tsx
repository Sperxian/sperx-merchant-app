"use client";

import { useState } from "react";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import LoyaltyStampIconPicker from "@/src/components/widgets/LoyaltyStampIconPicker";
import { IconName } from "@/src/app/shop/[id]/scanner/components/LoyaltyStamp";

type LoyaltyProgramInput = {
  loyaltyProgramName: string;
  stampIcon: IconName;
  goalPoints: number;
  rewardName: string;
  rewardDescription: string;
};

export default function EditLoyaltyProgramPage() {
  const [loyaltyProgram, setLoyaltyProgram] = useState<LoyaltyProgramInput>({
    loyaltyProgramName: "Loyalty Program",
    stampIcon: "star",
    goalPoints: 10,
    rewardName: "Free Item",
    rewardDescription: "You get a free item once you complete the points.",
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-2xl font-semibold text-primary">
        Edit Loyalty Program
      </h1>
      <div className="mx-auto flex flex-col rounded-3xl border border-white/30 p-4 shadow-2xl sm:p-6 lg:p-8">
        <div className="w-full">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full">
              <LoyaltyStampIconPicker
                stampIcon={loyaltyProgram.stampIcon}
                onChange={(icon) =>
                  setLoyaltyProgram((prev) => ({ ...prev, stampIcon: icon }))
                }
              />
              <input
                id="loyaltyProgramName"
                name="loyaltyProgramName"
                type="text"
                placeholder="Your Loyalty Program's Name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-md text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={loyaltyProgram.loyaltyProgramName}
                onChange={(event) =>
                  setLoyaltyProgram((prev) => ({
                    ...prev,
                    loyaltyProgramName: event.target.value,
                  }))
                }
              />
            </div>

            <div className="flex w-full flex-col gap-4 md:mt-8 md:flex-row">
              <div className="flex w-full flex-col gap-4 md:w-2/5">
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
                    className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 text-right text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    value={loyaltyProgram.goalPoints}
                    onChange={(event) =>
                      setLoyaltyProgram((prev) => ({
                        ...prev,
                        goalPoints: Number(event.target.value),
                      }))
                    }
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
                    value={loyaltyProgram.rewardName}
                    onChange={(event) =>
                      setLoyaltyProgram((prev) => ({
                        ...prev,
                        rewardName: event.target.value,
                      }))
                    }
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
                    value={loyaltyProgram.rewardDescription}
                    onChange={(event) =>
                      setLoyaltyProgram((prev) => ({
                        ...prev,
                        rewardDescription: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="w-full md:w-3/5 flex justify-center">
                <div className="max-w-[350px]">
                  <LoyaltyCard
                    current={Math.max(
                      Math.floor(loyaltyProgram.goalPoints * 0.8),
                      1,
                    )}
                    loyaltyProgram={{
                      name: loyaltyProgram.loyaltyProgramName,
                      type: "STAMP_BASED",
                      config: {
                        stampIcon: loyaltyProgram.stampIcon,
                        availableRewards: [
                          {
                            code: "PLACEHOLDER",
                            name: loyaltyProgram.rewardName,
                            description: loyaltyProgram.rewardDescription,
                            goalPoints: loyaltyProgram.goalPoints,
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
