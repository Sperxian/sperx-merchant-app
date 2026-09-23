"use client";

import type { Dispatch, SetStateAction } from "react";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";
import LoyaltyStampIconPicker from "@/src/components/widgets/LoyaltyStampIconPicker";
import type { IconName } from "@/src/app/shop/[id]/scanner/components/LoyaltyStamp";

export type LoyaltyProgramInput = {
  loyaltyProgramName: string;
  stampIcon: IconName;
  goalPoints: number;
  rewardName: string;
  rewardDescription: string;
};

type LoyaltyProgramFormProps = {
  loyaltyProgramInput: LoyaltyProgramInput;
  setLoyaltyProgramInput: Dispatch<SetStateAction<LoyaltyProgramInput>>;
};

export default function LoyaltyProgramForm({
  loyaltyProgramInput,
  setLoyaltyProgramInput,
}: LoyaltyProgramFormProps) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full">
          <LoyaltyStampIconPicker
            stampIcon={loyaltyProgramInput.stampIcon}
            onChange={(icon) =>
              setLoyaltyProgramInput((previous) => ({
                ...previous,
                stampIcon: icon,
              }))
            }
          />
          <input
            id="loyaltyProgramName"
            name="loyaltyProgramName"
            type="text"
            placeholder="Your Loyalty Program's Name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-md text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={loyaltyProgramInput.loyaltyProgramName}
            onChange={(event) =>
              setLoyaltyProgramInput((previous) => ({
                ...previous,
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
                value={loyaltyProgramInput.goalPoints}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) => ({
                    ...previous,
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
                value={loyaltyProgramInput.rewardName}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) => ({
                    ...previous,
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
                value={loyaltyProgramInput.rewardDescription}
                onChange={(event) =>
                  setLoyaltyProgramInput((previous) => ({
                    ...previous,
                    rewardDescription: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex w-full justify-center md:w-3/5">
            <div className="max-w-[350px]">
              <LoyaltyCard
                current={Math.max(
                  Math.floor(loyaltyProgramInput.goalPoints * 0.8),
                  1,
                )}
                loyaltyProgram={{
                  name: loyaltyProgramInput.loyaltyProgramName,
                  type: "STAMP_BASED",
                  config: {
                    stampIcon: loyaltyProgramInput.stampIcon,
                    availableRewards: [
                      {
                        code: "PLACEHOLDER",
                        name: loyaltyProgramInput.rewardName,
                        description: loyaltyProgramInput.rewardDescription,
                        goalPoints: loyaltyProgramInput.goalPoints,
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
  );
}