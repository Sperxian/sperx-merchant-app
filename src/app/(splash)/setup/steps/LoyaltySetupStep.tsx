"use client";

import { Dispatch, SetStateAction } from "react";
import { LoyaltyCard } from "@/src/components/widgets/LoyaltyCard";

export type LoyaltyProgramInput = {
  loyaltyProgramName: string;
  goalPoints: number;
  rewardName: string;
  rewardDescription: string;
};

type LoyaltySetupStepProps = {
  loyaltyProgramInput: LoyaltyProgramInput;
  setLoyaltyProgramInput: Dispatch<SetStateAction<LoyaltyProgramInput>>;
};

export function LoyaltySetupStep({
  loyaltyProgramInput,
  setLoyaltyProgramInput,
}: LoyaltySetupStepProps) {
  return (
    <div className="w-full">
      <div className="text-xl font-medium text-foreground w-full mb-4">
        Design Your First Loyalty Program
      </div>

      <span className="text-body text-sm pb-4">
        Most shops use the following default settings for their loyalty program.
        Feel free to customize them base on your business needs. You can always
        adjust these later.
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
            value={loyaltyProgramInput.loyaltyProgramName}
            onChange={(e) =>
              setLoyaltyProgramInput((prev) => ({
                ...prev,
                loyaltyProgramName: e.target.value,
              }))
            }
          />
        </div>

        <div className="w-full flex flex-col gap-4 md:flex-row md:mt-8">
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
                value={loyaltyProgramInput.goalPoints}
                onChange={(e) =>
                  setLoyaltyProgramInput((prev) => ({
                    ...prev,
                    goalPoints: Number(e.target.value),
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
                onChange={(e) =>
                  setLoyaltyProgramInput((prev) => ({
                    ...prev,
                    rewardName: e.target.value,
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
                onChange={(e) =>
                  setLoyaltyProgramInput((prev) => ({
                    ...prev,
                    rewardDescription: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="w-full md:w-3/5">
            <LoyaltyCard
              current={Math.max(
                Math.floor(loyaltyProgramInput.goalPoints * 0.8),
                1,
              )}
              loyaltyProgram={{
                name: loyaltyProgramInput.loyaltyProgramName,
                type: "STAMP_BASED",
                config: {
                  stampIcon: "milk_tea",
                  availableRewards: [
                    {
                      code: "XXXX",
                      name: loyaltyProgramInput.rewardName ?? "",
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
  );
}

export default LoyaltySetupStep;
